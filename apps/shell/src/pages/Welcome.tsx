import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, Badge, KpiCard, AvatarStack, Loader } from '@voyado-kth/ui';
import type { AvatarMember } from '@voyado-kth/ui';
import { useGitHubWorkshop } from '@voyado-kth/shared';
import type { WorkshopData, Team } from '@voyado-kth/shared';
import {
  Heart,
  ShoppingBag,
  Users,
  Mail,
  Gift,
  BarChart3,
  ArrowRight,
  GitBranch,
  GitPullRequest,
  CheckCircle2,
  Circle,
  Clock,
  Check,
  AlertTriangle,
  RefreshCw,
  GitCommitHorizontal,
} from 'lucide-react';
import fallbackData from '../../../../workshop.json';
import styles from './Welcome.module.css';

// ─── Constants ───────────────────────────────────────────────────────────────

const teamColors: Record<string, string> = {
  'team-1': '#2d6e6d',
  'team-2': '#4790ff',
  'team-3': '#43a584',
  'team-4': '#791A3F',
  'team-5': '#e8725a',
  'team-6': '#7b61ff',
};

const teamIcons: Record<string, typeof Heart> = {
  'team-1': Heart,
  'team-2': ShoppingBag,
  'team-3': Users,
  'team-4': Mail,
  'team-5': Gift,
  'team-6': BarChart3,
};

// ─── Helper functions ─────────────────────────────────────────────────────────

function getCompletedSteps(team: Team): number {
  return Object.values(team.progress.steps).filter(s => s === 'done' || s === 'completed').length;
}

function getOverallProgress(data: WorkshopData): number {
  const total = data.teams.length * data.workflowSteps.length;
  const done = data.teams.reduce((sum, t) => sum + getCompletedSteps(t), 0);
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

function getStepLabel(data: WorkshopData, stepId: string): string {
  return data.workflowSteps.find(s => s.id === stepId)?.label ?? stepId;
}

/** Workshop-based step IDs in order (used for cumulative counting) */
const WORKSHOP_STEP_IDS = ['onboarding', 'requirements', 'breakdown', 'implementation'];

/** Get the order index of a team's current step */
function getStepOrder(data: WorkshopData, stepId: string): number {
  return data.workflowSteps.find(s => s.id === stepId)?.order ?? 0;
}

/**
 * Count teams that have reached or passed a workshop step.
 * A team at "implementation" (order 3) counts toward onboarding (0), requirements (1), breakdown (2), and implementation (3).
 */
function getTeamsAtOrPastStep(data: WorkshopData, stepId: string): number {
  const stepOrder = getStepOrder(data, stepId);
  return data.teams.filter(t => {
    const teamOrder = getStepOrder(data, t.progress.currentStep);
    return teamOrder >= stepOrder;
  }).length;
}

function formatEventDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getTeamStatusBadge(
  completed: number,
  total: number,
): { variant: 'neutral' | 'warning' | 'success'; label: string } {
  if (completed === total) return { variant: 'success', label: 'Complete' };
  if (completed > 0) return { variant: 'warning', label: 'In progress' };
  return { variant: 'neutral', label: 'Not started' };
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Welcome() {
  const navigate = useNavigate();
  const github = useGitHubWorkshop({
    pollInterval: 60_000,
    token: import.meta.env.VITE_GITHUB_TOKEN,
  });

  const workshopData: WorkshopData = github.workshopData ?? (fallbackData as unknown as WorkshopData);
  const isLive = github.workshopData !== null;

  const totalMembers = workshopData.teams.reduce((sum, t) => sum + t.members.length, 0);
  const overallProgress = getOverallProgress(workshopData);
  const totalSteps = workshopData.workflowSteps.length;
  const totalCommits = Object.values(github.members).reduce((sum, m) => sum + m.commitCount, 0);

  if (github.loading && !github.workshopData) {
    return (
      <div className={styles.page}>
        <PageHeader title="Workshop Dashboard" subtitle="Loading..." />
        <div className={styles.loadingState}>
          <Loader size="large" />
          <p>Fetching live data from GitHub...</p>
        </div>
      </div>
    );
  }

  const eventSubtitle = `${formatEventDate(workshopData.event.date)} · ${workshopData.event.startTime}–${workshopData.event.endTime} · ${workshopData.event.venue}`;

  return (
    <div className={styles.page}>
      <PageHeader title="Workshop Dashboard" subtitle={eventSubtitle}>
        <div className={styles.headerStatus}>
          {github.error && (
            <span className={styles.statusWarning}>
              <AlertTriangle size={13} strokeWidth={2} />
              Offline
            </span>
          )}
          {isLive && github.lastUpdated && (
            <span className={styles.statusLive}>
              <span className={styles.liveDot} />
              Live · {timeAgo(github.lastUpdated)}
            </span>
          )}
          {!isLive && !github.loading && (
            <span className={styles.statusFallback}>
              <RefreshCw size={13} strokeWidth={2} />
              Using cached data
            </span>
          )}
        </div>
      </PageHeader>

      <div className={styles.kpiRow}>
        <KpiCard label="Teams" value={workshopData.teams.length} />
        <KpiCard label="Members" value={totalMembers > 0 ? totalMembers : '–'} />
        <KpiCard label="Progress" value={overallProgress} unit="%" />
        <KpiCard label="Commits" value={totalCommits > 0 ? totalCommits : '–'} />
      </div>

      <section className={styles.pipeline}>
        <p className={styles.pipelineTitle}>Workflow Pipeline</p>
        <div className={styles.pipelineTrack}>
          {(() => {
            // Workshop-based steps: cumulative count (teams at or past each step)
            const workshopSteps = WORKSHOP_STEP_IDS.map(id => {
              const step = workshopData.workflowSteps.find(s => s.id === id);
              const doneByAll = workshopData.teams.every(t => t.progress.steps[id] === 'done' || t.progress.steps[id] === 'completed');
              return {
                id,
                label: step?.label ?? id,
                count: getTeamsAtOrPastStep(workshopData, id),
                doneByAll,
              };
            });

            // GitHub-based steps
            const allTeamBranches = Object.values(github.teamBranches);
            const teamsWithOpenPRs = allTeamBranches.filter(t => t.pullRequests.length > 0).length;
            const teamsWithMergedPRs = allTeamBranches.filter(t => t.mergedPRs.length > 0).length;
            // Deployed = merged (CI auto-deploys on merge to main)
            const teamsDeployed = teamsWithMergedPRs;

            const totalTeams = workshopData.teams.length;
            const githubSteps = [
              { id: 'review', label: 'Code Review', count: teamsWithOpenPRs, doneByAll: teamsWithOpenPRs >= totalTeams },
              { id: 'merge', label: 'Merged', count: teamsWithMergedPRs, doneByAll: teamsWithMergedPRs >= totalTeams },
              { id: 'deployed', label: 'Deployed', count: teamsDeployed, doneByAll: teamsDeployed >= totalTeams },
            ];

            const allSteps = [...workshopSteps, ...githubSteps];

            return allSteps.map(step => {
              const isActive = step.count > 0;
              const isCompleted = step.doneByAll;

              const stepClasses = [
                styles.pipelineStep,
                isActive ? styles.pipelineStepActive : '',
                isCompleted ? styles.pipelineStepCompleted : '',
              ].filter(Boolean).join(' ');

              const nodeClasses = [
                styles.pipelineNode,
                isCompleted ? styles.pipelineNodeCompleted
                  : isActive ? styles.pipelineNodeActive : '',
              ].filter(Boolean).join(' ');

              return (
                <div key={step.id} className={stepClasses}>
                  <div
                    className={nodeClasses}
                    title={`${step.count} team${step.count !== 1 ? 's' : ''} at this step`}
                  >
                    {isCompleted ? (
                      <Check size={18} strokeWidth={2.5} />
                    ) : (
                      step.count
                    )}
                    {step.count > 0 && isCompleted && (
                      <span className={styles.pipelineCount}>{step.count}</span>
                    )}
                  </div>
                  <span className={styles.pipelineLabel}>{step.label}</span>
                </div>
              );
            });
          })()}
        </div>
      </section>

      <p className={styles.teamGridTitle}>Teams</p>
      <div className={styles.teamGrid}>
        {workshopData.teams.map(team => {
          const color = teamColors[team.id] ?? '#666';
          const completedSteps = getCompletedSteps(team);
          const progressPct = (completedSteps / totalSteps) * 100;
          const { variant: statusVariant, label: statusLabel } =
            getTeamStatusBadge(completedSteps, totalSteps);
          const TeamIcon = teamIcons[team.id] ?? Heart;

          const avatarMembers: AvatarMember[] = team.members.map(m => {
            const ghData = m.github ? github.members[m.github] : undefined;
            return {
              id: m.email || m.name,
              name: m.name,
              role: m.role,
              initials: m.initials,
              color: m.avatarColor,
              avatarUrl: ghData?.avatarUrl ?? undefined,
            };
          });

          const teamCommits = team.members.reduce((sum, m) => {
            const ghData = m.github ? github.members[m.github] : undefined;
            return sum + (ghData?.commitCount ?? 0);
          }, 0);

          // Auto-detect branch and PRs from GitHub (fallback to workshop.json progress)
          const teamBranchInfo = github.teamBranches[team.id];
          const branchName = teamBranchInfo?.branch.name ?? team.progress.branchName;
          const branchExists = !!teamBranchInfo?.branch;
          const openPRs = teamBranchInfo?.pullRequests ?? [];

          return (
            <Card key={team.id} className={styles.teamCard} hoverable>
              <div
                className={styles.teamCardInner}
                style={{ borderLeftColor: color }}
                role="button"
                tabIndex={0}
                onClick={() => navigate(team.module.route)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(team.module.route);
                  }
                }}
                aria-label={`Navigate to ${team.module.title}`}
              >
                <div className={styles.teamCardHeader}>
                  <div className={styles.teamCardLeft}>
                    <div className={styles.teamCardNameRow}>
                      <div
                        className={styles.teamCardIcon}
                        style={{ backgroundColor: color }}
                      >
                        <TeamIcon size={14} strokeWidth={1.5} color="#fff" />
                      </div>
                      <span className={styles.teamCardName}>{team.name}</span>
                    </div>
                    {team.nickname && (
                      <span className={styles.teamCardNickname}>{team.nickname}</span>
                    )}
                    <span className={styles.teamCardModule}>{team.module.title}</span>
                    <code className={styles.teamCardRoute}>{team.module.route}</code>
                  </div>

                  <div className={styles.teamCardRight}>
                    {avatarMembers.length > 0 ? (
                      <AvatarStack members={avatarMembers} maxVisible={4} />
                    ) : (
                      <span className={styles.emptyMembers}>No members yet</span>
                    )}
                    <Badge variant={statusVariant}>{statusLabel}</Badge>
                    <span className={styles.stepBadge}>
                      {completedSteps === totalSteps ? (
                        <CheckCircle2 size={10} strokeWidth={2} />
                      ) : completedSteps > 0 ? (
                        <Clock size={10} strokeWidth={2} />
                      ) : (
                        <Circle size={10} strokeWidth={2} />
                      )}
                      {getStepLabel(workshopData, team.progress.currentStep)}
                    </span>
                  </div>
                </div>

                <div className={styles.progressBar}>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${progressPct}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                  <span className={styles.progressLabel}>
                    {completedSteps}/{totalSteps}
                  </span>
                </div>

                <div className={styles.teamCardFooter}>
                  {branchName && (
                    <span className={[styles.branchName, branchExists ? styles.branchExists : ''].filter(Boolean).join(' ')}>
                      <GitBranch size={12} strokeWidth={1.5} />
                      {branchName}
                    </span>
                  )}
                  {openPRs.length > 0 ? (
                    openPRs.map(pr => (
                      <a
                        key={pr.number}
                        href={pr.html_url}
                        className={styles.prLink}
                        onClick={e => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pull request #${pr.number}`}
                      >
                        <GitPullRequest size={12} strokeWidth={1.5} />
                        PR #{pr.number}
                      </a>
                    ))
                  ) : team.progress.prUrl ? (
                    <a
                      href={team.progress.prUrl}
                      className={styles.prLink}
                      onClick={e => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pull request #${team.progress.prNumber}`}
                    >
                      <GitPullRequest size={12} strokeWidth={1.5} />
                      PR #{team.progress.prNumber}
                    </a>
                  ) : null}
                  {teamCommits > 0 && (
                    <span className={styles.commitCount}>
                      <GitCommitHorizontal size={12} strokeWidth={1.5} />
                      {teamCommits} commit{teamCommits !== 1 ? 's' : ''}
                    </span>
                  )}
                  <span className={styles.navHint}>
                    <ArrowRight size={12} strokeWidth={1.5} />
                    View module
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
