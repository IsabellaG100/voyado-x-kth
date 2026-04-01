import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, AvatarStack, Loader } from '@voyado-kth/ui';
import type { AvatarMember } from '@voyado-kth/ui';
import { useGitHubWorkshop } from '@voyado-kth/shared';
import type { WorkshopData, Team, TeamBranchInfo } from '@voyado-kth/shared';
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
  Check,
  AlertTriangle,
  RefreshCw,
  GitCommitHorizontal,
} from 'lucide-react';
import fallbackData from '../../../../workshop.json';
import styles from './Welcome.module.css';

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

function getCompletedSteps(team: Team): number {
  return Object.values(team.progress.steps).filter(s => s === 'done' || s === 'completed').length;
}

function getStepLabel(data: WorkshopData, stepId: string): string {
  return data.workflowSteps.find(s => s.id === stepId)?.label ?? stepId;
}

function getStepOrder(data: WorkshopData, stepId: string): number {
  return data.workflowSteps.find(s => s.id === stepId)?.order ?? 0;
}

function getWorkflowSteps(data: WorkshopData) {
  return [...data.workflowSteps]
    .filter(step => !['implementation', 'pull-request', 'deployed'].includes(step.id))
    .sort((a, b) => a.order - b.order);
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

function getEffectiveCurrentStep(
  data: WorkshopData,
  team: Team,
  teamBranchInfo?: TeamBranchInfo,
): string {
  let effectiveOrder = getStepOrder(data, team.progress.currentStep);

  if (team.progress.prUrl || team.progress.prNumber) {
    effectiveOrder = Math.max(effectiveOrder, getStepOrder(data, 'pull-request'));
  }

  if (team.progress.deployedUrl) {
    effectiveOrder = Math.max(effectiveOrder, getStepOrder(data, 'deployed'));
  }

  if (teamBranchInfo?.branch || team.progress.branchName) {
    effectiveOrder = Math.max(effectiveOrder, getStepOrder(data, 'implementation'));
  }

  if (teamBranchInfo?.pullRequests.length) {
    effectiveOrder = Math.max(effectiveOrder, getStepOrder(data, 'review'));
  }

  if (teamBranchInfo?.mergedPRs.length) {
    effectiveOrder = Math.max(effectiveOrder, getStepOrder(data, 'deployed'));
  }

  const visibleSteps = getWorkflowSteps(data);
  const exactMatch = visibleSteps.find(step => step.order === effectiveOrder);

  if (exactMatch) {
    return exactMatch.id;
  }

  if (
    team.progress.currentStep === 'implementation' ||
    effectiveOrder === getStepOrder(data, 'implementation')
  ) {
    return 'breakdown';
  }

  if (team.progress.currentStep === 'pull-request' || effectiveOrder === getStepOrder(data, 'pull-request')) {
    return 'review';
  }

  if (team.progress.currentStep === 'deployed' || effectiveOrder === getStepOrder(data, 'deployed')) {
    return 'merge';
  }

  return visibleSteps
    .slice()
    .reverse()
    .find(step => step.order < effectiveOrder)?.id ?? team.progress.currentStep;
}

export function Welcome() {
  const navigate = useNavigate();
  const github = useGitHubWorkshop({
    pollInterval: 60_000,
    token: import.meta.env.VITE_GITHUB_TOKEN,
  });

  const workshopData: WorkshopData = github.workshopData ?? (fallbackData as unknown as WorkshopData);
  const isLive = github.workshopData !== null;

  const totalSteps = workshopData.workflowSteps.length;

  if (github.loading && !github.workshopData) {
    return (
      <div className={styles.page}>
        <header className={styles.pageHeader}>
          <div className={styles.pageTitleBlock}>
            <h1 className={styles.pageTitle}>Workshop Dashboard</h1>
            <p className={styles.pageSubtitle}>Loading live workshop schedule and team status…</p>
          </div>
        </header>
        <div className={styles.loadingState}>
          <Loader size="large" />
          <p>Fetching live data from GitHub...</p>
        </div>
      </div>
    );
  }

  const eventSubtitle = `${formatEventDate(workshopData.event.date)} · ${workshopData.event.startTime}–${workshopData.event.endTime} · ${workshopData.event.venue}`;
  const workflowSteps = getWorkflowSteps(workshopData);
  const teamsWithStage = workshopData.teams.map(team => {
    const teamBranchInfo = github.teamBranches[team.id];
    const effectiveStepId = getEffectiveCurrentStep(workshopData, team, teamBranchInfo);
    const effectiveStepOrder = getStepOrder(workshopData, effectiveStepId);
    return {
      team,
      teamBranchInfo,
      effectiveStepId,
      effectiveStepOrder,
    };
  });

  const stepCounts = Object.fromEntries(
    workflowSteps.map(step => [
      step.id,
      teamsWithStage.filter(entry => entry.effectiveStepOrder >= step.order).length,
    ]),
  );

  const teamsByStep = Object.fromEntries(
    workflowSteps.map(step => [
      step.id,
      teamsWithStage
        .filter(entry => entry.effectiveStepId === step.id)
        .sort((a, b) => a.team.name.localeCompare(b.team.name)),
    ]),
  );

  const renderTeamCard = (
    team: Team,
    teamBranchInfo: TeamBranchInfo | undefined,
    index: number,
    stackSize: number,
  ) => {
    const color = teamColors[team.id] ?? '#666';
    const completedSteps = getCompletedSteps(team);
    const progressPct = (completedSteps / totalSteps) * 100;
    const { variant: statusVariant, label: statusLabel } = getTeamStatusBadge(completedSteps, totalSteps);
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
    const branchName = teamBranchInfo?.branch.name ?? team.progress.branchName;
    const openPRs = teamBranchInfo?.pullRequests ?? [];
    const currentStepLabel = getStepLabel(workshopData, team.progress.currentStep);

    return (
      <div
        key={team.id}
        className={styles.timelineCardShell}
        style={
          {
            '--team-color': color,
            '--stack-index': index,
            '--stack-depth': stackSize - index,
          } as CSSProperties
        }
      >
        <Card className={styles.timelineCard} hoverable>
          <div
            className={styles.timelineCardInner}
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
            <span className={styles.timelineCardRail}>{team.name}</span>

            <div className={styles.timelineCardHeader}>
              <div className={styles.timelineCardIdentity}>
                <div className={styles.timelineCardIdentityText}>
                  <span className={styles.timelineCardTeamName}>{team.module.title}</span>
                  <strong className={styles.timelineCardProductName}>{team.nickname || team.module.title}</strong>
                  <span className={styles.timelineCardRoute}>{team.module.route}</span>
                </div>
                <div className={styles.timelineCardIcon}>
                  <TeamIcon size={15} strokeWidth={1.8} color="#fff" />
                </div>
              </div>

              <div className={styles.timelineCardMeta}>
                <span className={styles.timelineStagePill}>{currentStepLabel}</span>
                {avatarMembers.length > 0 ? (
                  <AvatarStack members={avatarMembers} maxVisible={4} />
                ) : (
                  <span className={styles.emptyMembers}>No members yet</span>
                )}
                <Badge variant={statusVariant}>{statusLabel}</Badge>
              </div>
            </div>

            <div className={styles.timelineCardStepRow}>
              <span className={styles.timelineCardStepLabel}>Current stage</span>
              <span className={styles.timelineCardStepValue}>
                {currentStepLabel} · {completedSteps}/{totalSteps}
              </span>
            </div>

            <div className={styles.timelineProgressTrack}>
              <div className={styles.timelineProgressFill} style={{ width: `${progressPct}%` }} />
            </div>

            <div className={styles.timelineCardFooter}>
              {branchName && (
                <span className={styles.timelineMetaChip}>
                  <GitBranch size={12} strokeWidth={1.5} />
                  {branchName}
                </span>
              )}
              {openPRs.length > 0 ? (
                openPRs.map(pr => (
                  <a
                    key={pr.number}
                    href={pr.html_url}
                    className={styles.timelineMetaChip}
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
                  className={styles.timelineMetaChip}
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
                <span className={styles.timelineMetaChip}>
                  <GitCommitHorizontal size={12} strokeWidth={1.5} />
                  {teamCommits} commit{teamCommits !== 1 ? 's' : ''}
                </span>
              )}
              <span className={styles.timelineNavHint}>
                <ArrowRight size={12} strokeWidth={1.5} />
                Open
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.pageTitleBlock}>
          <h1 className={styles.pageTitle}>Workshop Dashboard</h1>
          <p className={styles.pageSubtitle}>{eventSubtitle}</p>
        </div>

        <div className={styles.pageStatusBlock}>
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
        </div>
      </header>

      <section className={styles.timelineSection}>
        <div className={styles.timeline}>
          {workflowSteps
            .slice()
            .reverse()
            .map((step, reversedIndex) => {
              const stepTeams = teamsByStep[step.id] ?? [];
              const cumulativeCount = stepCounts[step.id] ?? 0;
              const totalTeams = workshopData.teams.length;
              const isCompleted = totalTeams > 0 && cumulativeCount === totalTeams;
              const isActive = stepTeams.length > 0;
              const showOnLeft = reversedIndex % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={[
                    styles.timelineStep,
                    showOnLeft ? styles.timelineStepLeft : styles.timelineStepRight,
                    isActive ? styles.timelineStepActive : '',
                    isCompleted ? styles.timelineStepCompleted : '',
                  ].filter(Boolean).join(' ')}
                >
                  <div className={styles.timelineCardsColumn}>
                    {showOnLeft && stepTeams.length > 0 && (
                      <div className={styles.teamCardStack}>
                        {stepTeams.map(({ team, teamBranchInfo }, index) =>
                          renderTeamCard(team, teamBranchInfo, index, stepTeams.length),
                        )}
                      </div>
                    )}
                  </div>

                  <div className={styles.timelineNodeColumn}>
                    <div className={styles.timelineNodeGlow} />
                    <div className={styles.timelineNode}>
                      <div className={styles.timelineNodeCount}>
                        {isCompleted ? <Check size={22} strokeWidth={2.6} /> : cumulativeCount || ''}
                      </div>
                      <div className={styles.timelineNodeText}>
                        <span className={styles.timelineNodeLabel}>{step.label}</span>
                        <span className={styles.timelineNodeCaption}>
                          {stepTeams.length > 0
                            ? `${stepTeams.length} team${stepTeams.length !== 1 ? 's' : ''} currently here`
                            : cumulativeCount > 0
                              ? `${cumulativeCount} team${cumulativeCount !== 1 ? 's' : ''} reached this point`
                              : 'No teams here yet'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.timelineCardsColumn}>
                    {!showOnLeft && stepTeams.length > 0 && (
                      <div className={styles.teamCardStack}>
                        {stepTeams.map(({ team, teamBranchInfo }, index) =>
                          renderTeamCard(team, teamBranchInfo, index, stepTeams.length),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
