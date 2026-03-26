import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, Badge, KpiCard, AvatarStack } from '@voyado-kth/ui';
import type { AvatarMember } from '@voyado-kth/ui';
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
} from 'lucide-react';
import workshopData from '../../../../workshop.json';
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

type Team = (typeof workshopData.teams)[number];

function getCompletedSteps(team: Team): number {
  return Object.values(team.progress.steps).filter(s => s === 'done').length;
}

function getTotalMembers(): number {
  return workshopData.teams.reduce((sum, t) => sum + t.members.length, 0);
}

function getOverallProgress(): number {
  const total = workshopData.teams.length * workshopData.workflowSteps.length;
  const done = workshopData.teams.reduce((sum, t) => sum + getCompletedSteps(t), 0);
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

function getOpenPRs(): number {
  return workshopData.teams.filter(t => t.progress.prUrl).length;
}

function getStepLabel(stepId: string): string {
  return workshopData.workflowSteps.find(s => s.id === stepId)?.label ?? stepId;
}

function getTeamsAtStep(stepId: string): number {
  return workshopData.teams.filter(t => t.progress.currentStep === stepId).length;
}

function isStepCompletedByAny(stepId: string): boolean {
  return workshopData.teams.some(t => t.progress.steps[stepId] === 'done');
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

// ─── Pre-computed values ──────────────────────────────────────────────────────

const totalMembers = getTotalMembers();
const overallProgress = getOverallProgress();
const openPRs = getOpenPRs();
const totalSteps = workshopData.workflowSteps.length;

// ─── Component ────────────────────────────────────────────────────────────────

export function Welcome() {
  const navigate = useNavigate();

  const eventSubtitle = `${formatEventDate(workshopData.event.date)} · ${workshopData.event.startTime}–${workshopData.event.endTime} · ${workshopData.event.venue}`;

  return (
    <div className={styles.page}>
      {/* ── Section 1: Header ─────────────────────────────────────────────── */}
      <PageHeader title="Workshop Dashboard" subtitle={eventSubtitle} />

      {/* ── Section 2: KPI Summary Row ───────────────────────────────────── */}
      <div className={styles.kpiRow}>
        <KpiCard label="Teams" value={workshopData.teams.length} />
        <KpiCard label="Members" value={totalMembers > 0 ? totalMembers : '–'} />
        <KpiCard label="Progress" value={overallProgress} unit="%" />
        <KpiCard label="PRs Open" value={openPRs} />
      </div>

      {/* ── Section 3: Workflow Pipeline ─────────────────────────────────── */}
      <section className={styles.pipeline}>
        <p className={styles.pipelineTitle}>Workflow Pipeline</p>
        <div className={styles.pipelineTrack}>
          {workshopData.workflowSteps.map(step => {
            const count = getTeamsAtStep(step.id);
            const isActive = count > 0;
            const isCompleted = isStepCompletedByAny(step.id);

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
                  title={`${count} team${count !== 1 ? 's' : ''} on this step`}
                >
                  {isCompleted ? (
                    <Check size={18} strokeWidth={2.5} />
                  ) : (
                    count
                  )}
                  {count > 0 && isCompleted && (
                    <span className={styles.pipelineCount}>{count}</span>
                  )}
                </div>
                <span className={styles.pipelineLabel}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 4: Team Cards Grid ───────────────────────────────────── */}
      <p className={styles.teamGridTitle}>Teams</p>
      <div className={styles.teamGrid}>
        {workshopData.teams.map(team => {
          const color = teamColors[team.id] ?? '#666';
          const completedSteps = getCompletedSteps(team);
          const progressPct = (completedSteps / totalSteps) * 100;
          const members = team.members as unknown as AvatarMember[];
          const { variant: statusVariant, label: statusLabel } =
            getTeamStatusBadge(completedSteps, totalSteps);
          const hasFooter = Boolean(team.progress.branchName || team.progress.prUrl);
          const TeamIcon = teamIcons[team.id] ?? Heart;

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
                {/* Card header: identity + members + status */}
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
                    {members.length > 0 ? (
                      <AvatarStack members={members} maxVisible={4} />
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
                      {getStepLabel(team.progress.currentStep)}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
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

                {/* Footer: branch name + PR link */}
                {hasFooter && (
                  <div className={styles.teamCardFooter}>
                    {team.progress.branchName && (
                      <span className={styles.branchName}>
                        <GitBranch size={12} strokeWidth={1.5} />
                        {team.progress.branchName}
                      </span>
                    )}
                    {team.progress.prUrl && (
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
                    )}
                    {/* Navigation hint */}
                    <span className={styles.navHint}>
                      <ArrowRight size={12} strokeWidth={1.5} />
                      View module
                    </span>
                  </div>
                )}

                {/* No-footer navigation hint */}
                {!hasFooter && (
                  <div className={styles.teamCardFooter}>
                    <span className={styles.navHint}>
                      <ArrowRight size={12} strokeWidth={1.5} />
                      View module
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
