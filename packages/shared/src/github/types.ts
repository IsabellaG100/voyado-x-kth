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

// ─── Enriched workshop types ──────────────────────────────────────────────────

export interface MemberGitHubData {
  avatarUrl: string | null;
  commits: GitHubCommit[];
  commitCount: number;
  profileUrl: string | null;
}

export interface WorkshopGitHubState {
  workshopData: WorkshopData | null;
  members: Record<string, MemberGitHubData>;
  branches: GitHubBranch[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
