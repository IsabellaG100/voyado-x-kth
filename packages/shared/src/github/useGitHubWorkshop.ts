import { useState, useEffect, useRef, useCallback } from 'react';
import { GitHubClient } from './client';
import type { WorkshopGitHubState, MemberGitHubData } from './types';

const DEFAULT_POLL_INTERVAL = 60_000; // 60 seconds

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

      // 2. Collect all unique github usernames from all teams
      const allMembers = workshopData.teams.flatMap((t) => t.members);
      const usernames = [
        ...new Set(allMembers.map((m) => m.github).filter(Boolean)),
      ];

      // 3. Parallel fetch: avatars + commits + branches
      const [avatarMap, commitsByUser, branches] = await Promise.all([
        client.fetchUserAvatars(usernames),
        fetchAllCommits(client, usernames),
        client.fetchBranches(),
      ]);

      if (!isMounted.current) return;

      // 4. Build member data map keyed by github username
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
        workshopData,
        members,
        branches,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      if (!isMounted.current) return;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch data',
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
    // Vite exposes env vars via import.meta.env
    return (import.meta as unknown as { env?: Record<string, string> }).env
      ?.VITE_GITHUB_TOKEN;
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
