import type { WorkshopData } from '../types/workshop';

// ─── GitHub API response types ────────────────────────────────────────────────

export interface GitHubUserInfo {
  login: string;
  avatar_url: string;
  name: string | null;
  html_url: string;
}

export interface GitHubCommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: GitHubCommitAuthor;
  };
  author: { login: string; avatar_url: string } | null;
}

export interface GitHubBranchCommit {
  sha: string;
  url: string;
}

export interface GitHubBranch {
  name: string;
  protected: boolean;
  commit: GitHubBranchCommit;
}

export interface GitHubPullRequest {
  number: number;
  title: string;
  html_url: string;
  state: string;
  head: { ref: string; sha: string };
  base: { ref: string };
  user: { login: string; avatar_url: string } | null;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
}

// ─── Enriched workshop types ──────────────────────────────────────────────────

export interface MemberGitHubData {
  avatarUrl: string | null;
  commits: GitHubCommit[];
  commitCount: number;
  profileUrl: string | null;
}

/** Branch matched to a team by its name containing the team ID */
export interface TeamBranchInfo {
  branch: GitHubBranch;
  pullRequests: GitHubPullRequest[];
  mergedPRs: GitHubPullRequest[];
  members: string[];
}

export interface WorkshopGitHubState {
  workshopData: WorkshopData | null;
  members: Record<string, MemberGitHubData>;
  branches: GitHubBranch[];
  /** Open PRs from the repo */
  pullRequests: GitHubPullRequest[];
  /** Branches and PRs matched to teams by team ID in branch name */
  teamBranches: Record<string, TeamBranchInfo>;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
