import type { ReactNode } from 'react';
import { useGitHubWorkshop } from '@voyado-kth/shared';
import type { WorkshopData } from '@voyado-kth/shared';
import { PageHeader } from '../PageHeader/PageHeader';
import { Badge } from '../Badge/Badge';
import { AvatarStack } from '../AvatarStack/AvatarStack';
import styles from './TeamPageLayout.module.css';

export interface TeamPageLayoutProps {
  teamId: string;
  fallbackData: WorkshopData;
  children: ReactNode;
}

export function TeamPageLayout({
  teamId,
  fallbackData,
  children,
}: TeamPageLayoutProps) {
  const github = useGitHubWorkshop({ pollInterval: 60_000 });
  const workshopSource = github.workshopData ?? fallbackData;
  const team = workshopSource.teams.find(t => t.id === teamId)!;

  const members = team.members.map(m => {
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

  return (
    <div className={styles.page}>
      <PageHeader title={team.module.title} subtitle={team.module.description}>
        <div className={styles.teamInfo}>
          <div className={styles.teamMeta}>
            <Badge variant="info">{team.name}</Badge>
            {team.nickname && <span className={styles.teamName}>{team.nickname}</span>}
          </div>
          {members.length > 0 && (
            <AvatarStack members={members} />
          )}
        </div>
      </PageHeader>
      {children}
    </div>
  );
}
