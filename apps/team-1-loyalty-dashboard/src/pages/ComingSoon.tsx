import { PageHeader, Badge, AvatarStack } from '@voyado-kth/ui';
import { useGitHubWorkshop } from '@voyado-kth/shared';
import { Heart } from 'lucide-react';
import workshopData from '../../../../workshop.json';
import styles from './ComingSoon.module.css';

export function ComingSoon() {
  const github = useGitHubWorkshop({ pollInterval: 60_000, token: import.meta.env.VITE_GITHUB_TOKEN });
  const workshopSource = github.workshopData ?? workshopData;
  const team = workshopSource.teams.find(t => t.id === 'team-1')!;

  return (
    <div className={styles.page}>
      <PageHeader
        title={team.module.title}
        subtitle={team.module.description}
      >
        <div className={styles.teamInfo}>
          <div className={styles.teamMeta}>
            <Badge variant="info">{team.name}</Badge>
            {team.nickname && <span className={styles.teamName}>{team.nickname}</span>}
          </div>
          {team.members.length > 0 && (
            <AvatarStack
              members={team.members.map(m => {
                const ghData = m.github ? github.members[m.github] : undefined;
                return {
                  id: m.email || m.name,
                  name: m.name,
                  role: m.role,
                  initials: m.initials,
                  color: m.avatarColor,
                  avatarUrl: ghData?.avatarUrl ?? undefined,
                };
              })}
            />
          )}
        </div>
      </PageHeader>
      <div className={styles.emptyState}>
        <div className={styles.iconCircle}>
          <Heart size={32} strokeWidth={1.5} />
        </div>
        <h2 className={styles.emptyTitle}>Under Construction</h2>
        <p className={styles.emptyDescription}>
          This module is being built during the workshop. Check back soon!
        </p>
      </div>
    </div>
  );
}
