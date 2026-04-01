import { useState, useEffect, useRef, useCallback } from 'react';
import { GitHubClient } from './client';
import type { WorkshopData } from '../types/workshop';
import type { WorkshopGitHubState, MemberGitHubData, TeamBranchInfo, GitHubBranch, GitHubPullRequest } from './types';

const DEFAULT_POLL_INTERVAL = 60_000; // 60 seconds

/** Match a branch name to a team ID (e.g., "feature/team-5-rewards" → "team-5") */
function matchTeamId(branchName: string): string | null {
  const match = branchName.match(/team-(\d+)/);
  return match ? `team-${match[1]}` : null;
}

/** Build a map of teamId → { branch, pullRequests, mergedPRs } from branches and all PRs */
function buildTeamBranches(
  branches: GitHubBranch[],
  allPRs: GitHubPullRequest[],
): Record<string, TeamBranchInfo> {
  const result: Record<string, TeamBranchInfo> = {};

  for (const branch of branches) {
    const teamId = matchTeamId(branch.name);
    if (!teamId) continue;
    if (!result[teamId]) {
      result[teamId] = { branch, pullRequests: [], mergedPRs: [], members: [] };
    }
  }

  for (const pr of allPRs) {
    const teamId = matchTeamId(pr.head.ref);
    if (!teamId) continue;

    if (!result[teamId]) {
      const fakeBranch: GitHubBranch = {
        name: pr.head.ref,
        protected: false,
        commit: { sha: pr.head.sha, url: '' },
      };
      result[teamId] = { branch: fakeBranch, pullRequests: [], mergedPRs: [], members: [] };
    }

    if (pr.merged_at) {
      result[teamId].mergedPRs.push(pr);
    } else if (pr.state === 'open') {
      result[teamId].pullRequests.push(pr);
    }
  }

  return result;
}

/**
 * Merge team data from a feature branch's workshop.json into the main workshop data.
 * The feature branch's team entry (matched by teamId) overrides the main branch's entry.
 */
function mergeTeamData(
  mainData: WorkshopData,
  teamId: string,
  branchData: WorkshopData,
): WorkshopData {
  const branchTeam = branchData.teams.find(t => t.id === teamId);

  console.log(`[useGitHubWorkshop] Merging data for team "${teamId}" from branch. Found team in branch: ${!!branchTeam}`);
  if (!branchTeam) return mainData;

  console.log(`[useGitHubWorkshop] Merging data for ${teamId} from branch "${branchTeam.module.title}"`, mainData.teams);

  return {
    ...mainData,
    teams: mainData.teams.map(t => (t.id === teamId ? branchTeam : t)),
  };
}

export interface UseGitHubWorkshopOptions {
  pollInterval?: number;
  token?: string;
}

export function useGitHubWorkshop(
  options: UseGitHubWorkshopOptions = {},
): WorkshopGitHubState {
  const { pollInterval = DEFAULT_POLL_INTERVAL } = options;

  // Resolve token: explicit option > env var
  const token = options.token ?? getEnvToken();

  const clientRef = useRef<GitHubClient>(new GitHubClient(token));
  const isMounted = useRef(true);

  const [state, setState] = useState<WorkshopGitHubState>({
    workshopData: null,
    members: {},
    branches: [],
    pullRequests: [],
    teamBranches: {},
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchData = useCallback(async () => {
    const client = clientRef.current;

    try {
      // 1. Fetch workshop.json from main branch
      const workshopData = await client.fetchWorkshopJson();

      if (!isMounted.current) return;

      // 2. Fetch branches + all PRs (needed before merge)
      const [branches, pullRequests] = await Promise.all([
        client.fetchBranches(),
        client.fetchAllPRs(),
      ]);

      if (!isMounted.current) return;

      // 3. Match branches and PRs to teams
      const teamBranches = buildTeamBranches(branches, pullRequests);

      // 4. Fetch workshop.json from each team's feature branch and merge
      let mergedWorkshopData = workshopData;
      const branchFetches = Object.entries(teamBranches).map(
        async ([teamId, info]) => {
          const branchWs = await client.fetchJsonFromBranch<WorkshopData>(
            'workshop.json',
            info.branch.name,
          );
          return { teamId, branchWs };
        },
      );
      const branchResults = await Promise.all(branchFetches);

      if (!isMounted.current) return;

      for (const { teamId, branchWs } of branchResults) {
        if (branchWs) {
          mergedWorkshopData = mergeTeamData(mergedWorkshopData, teamId, branchWs);
        }
      }

      console.log('[useGitHubWorkshop] Final merged workshop data:', mergedWorkshopData);

      // 5. Collect usernames from MERGED data (includes feature branch members)
      const allMembers = mergedWorkshopData.teams.flatMap((t) => t.members);
      const usernames = [
        ...new Set(allMembers.map((m) => m.github).filter(Boolean)),
      ];

      // 6. Fetch avatars + commits for all members
      const [avatarMap, commitsByUser] = await Promise.all([
        client.fetchUserAvatars(usernames),
        fetchAllCommits(client, usernames),
      ]);

      if (!isMounted.current) return;

      // 7. Build member data map keyed by github username
      const members: Record<string, MemberGitHubData> = {};
      for (const username of usernames) {
        const commits = commitsByUser[username] ?? [];
        members[username] = {
          avatarUrl: avatarMap[username] ?? null,
          commits,
          commitCount: commits.length,
          profileUrl: username ? `https://github.com/${username}` : null,
        };
      }

      setState({
        workshopData: mergedWorkshopData,
        members,
        branches,
        pullRequests,
        teamBranches,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      if (!isMounted.current) return;
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
      console.warn('[useGitHubWorkshop]', message);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchData();

    const interval = setInterval(fetchData, pollInterval);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [fetchData, pollInterval]);

  return state;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getEnvToken(): string | undefined {
  try {
    return import.meta.env?.VITE_GITHUB_TOKEN as string | undefined;
  } catch {
    return undefined;
  }
}

async function fetchAllCommits(
  client: GitHubClient,
  usernames: string[],
): Promise<Record<string, Awaited<ReturnType<GitHubClient['fetchCommitsByAuthor']>>>> {
  const entries = await Promise.all(
    usernames.map(async (u) => {
      const commits = await client.fetchCommitsByAuthor(u);
      return [u, commits] as const;
    }),
  );
  return Object.fromEntries(entries);
}
