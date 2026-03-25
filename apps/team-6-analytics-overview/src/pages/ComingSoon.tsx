import { PageHeader, Badge, AvatarStack } from '@voyado-kth/ui';
import { BarChart3 } from 'lucide-react';
import teamData from '../../data/team.json';
import styles from './ComingSoon.module.css';

export function ComingSoon() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Analytics Overview"
        subtitle="KPI charts, engagement metrics, and reporting"
      >
        <div className={styles.teamInfo}>
          <div className={styles.teamMeta}>
            <Badge variant="info">Team 6</Badge>
            <span className={styles.teamName}>{teamData.teamName}</span>
          </div>
          <AvatarStack members={teamData.members} />
        </div>
      </PageHeader>
      <div className={styles.emptyState}>
        <div className={styles.iconCircle}>
          <BarChart3 size={32} strokeWidth={1.5} />
        </div>
        <h2 className={styles.emptyTitle}>Under Construction</h2>
        <p className={styles.emptyDescription}>
          This module is being built during the workshop. Check back soon!
        </p>
      </div>
    </div>
  );
}
