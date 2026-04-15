import type { WorkshopData } from '../types/workshop';
import type {
  GitHubUserInfo,
  GitHubCommit,
  GitHubBranch,
  GitHubPullRequest,
} from './types';

const OWNER = 'MeghdadHadidi'; // TODO: Make this configurable if we want to reuse this client for other repos
const REPO = 'voyado-x-kth';
const API_BASE = 'https://api.github.com';

export class GitHubClient {
  private token: string | undefined;
  private avatarCache = new Map<string, string>();

  constructor(token?: string) {
    this.token = token;
  }

  private headers(): HeadersInit {
    const h: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (this.token) {
      h.Authorization = `Bearer ${this.token}`;
    }
    return h;
  }

  private async get<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: this.headers() });
    if (!res.ok) {
      if (res.status === 404 && !this.token) {
        throw new Error(
          `GitHub API 404: This is likely a private repo. Set VITE_GITHUB_TOKEN in .env.local with a classic PAT that has "repo" scope.`,
        );
      }
      if (res.status === 404) {
        throw new Error(
          `GitHub API 404: Token may lack access. Ensure your PAT has "repo" scope, and if using SSO, authorize it for the "${OWNER}" org. (${url})`,
        );
      }
      throw new Error(`GitHub API ${res.status}: ${res.statusText} (${url})`);
    }
    return res.json() as Promise<T>;
  }

  /** Fetch workshop.json from the main branch */
  async fetchWorkshopJson(): Promise<WorkshopData> {
    const data = await this.get<{ content: string; encoding: string }>(
      `${API_BASE}/repos/${OWNER}/${REPO}/contents/workshop.json?ref=test`,
    );
    const decoded = atob(data.content.replace(/\n/g, ''));
    return JSON.parse(decoded) as WorkshopData;
  }

  /** Fetch a single user's avatar URL (cached) */
  async fetchUserAvatar(username: string): Promise<string | null> {
    if (!username) return null;
    const cached = this.avatarCache.get(username);
    if (cached) return cached;

    try {
      const user = await this.get<GitHubUserInfo>(
        `${API_BASE}/users/${username}`,
      );
      this.avatarCache.set(username, user.avatar_url);
      return user.avatar_url;
    } catch {
      return null;
    }
  }

  /** Batch fetch avatars for multiple usernames */
  async fetchUserAvatars(
    usernames: string[],
  ): Promise<Record<string, string>> {
    const unique = [...new Set(usernames.filter(Boolean))];
    const results = await Promise.allSettled(
      unique.map(async (u) => {
        const url = await this.fetchUserAvatar(u);
        return [u, url] as const;
      }),
    );

    const map: Record<string, string> = {};
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value[1]) {
        map[r.value[0]] = r.value[1];
      }
    }
    return map;
  }

  /** Fetch commits by a specific author in this repo */
  async fetchCommitsByAuthor(author: string): Promise<GitHubCommit[]> {
    if (!author) return [];
    try {
      return await this.get<GitHubCommit[]>(
        `${API_BASE}/repos/${OWNER}/${REPO}/commits?author=${encodeURIComponent(author)}&per_page=100`,
      );
    } catch {
      return [];
    }
  }

  /** Fetch all branches */
  async fetchBranches(): Promise<GitHubBranch[]> {
    try {
      return await this.get<GitHubBranch[]>(
        `${API_BASE}/repos/${OWNER}/${REPO}/branches?per_page=100`,
      );
    } catch {
      return [];
    }
  }

  /** Fetch a specific branch */
  async fetchBranch(name: string): Promise<GitHubBranch | null> {
    try {
      return await this.get<GitHubBranch>(
        `${API_BASE}/repos/${OWNER}/${REPO}/branches/${encodeURIComponent(name)}`,
      );
    } catch {
      return null;
    }
  }

  /** Fetch a JSON file from a specific branch (base64 decoded) */
  async fetchJsonFromBranch<T>(path: string, branch: string): Promise<T | null> {
    try {
      const data = await this.get<{ content: string; encoding: string }>(
        `${API_BASE}/repos/${OWNER}/${REPO}/contents/${path}?ref=${encodeURIComponent(branch)}`,
      );
      const decoded = atob(data.content.replace(/\n/g, ''));
      return JSON.parse(decoded) as T;
    } catch {
      return null;
    }
  }

  /** Fetch all pull requests (open + closed/merged) */
  async fetchAllPRs(): Promise<GitHubPullRequest[]> {
    try {
      return await this.get<GitHubPullRequest[]>(
        `${API_BASE}/repos/${OWNER}/${REPO}/pulls?state=all&per_page=100`,
      );
    } catch {
      return [];
    }
  }
}
