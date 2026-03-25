import { PageHeader, Badge } from '@voyado-kth/ui';
import { Users } from 'lucide-react';
import styles from './ComingSoon.module.css';

export function ComingSoon() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Customer Segments"
        subtitle="Segment builder and audience targeting rules"
      >
        <Badge variant="info">Team 3</Badge>
      </PageHeader>
      <div className={styles.emptyState}>
        <div className={styles.iconCircle}>
          <Users size={32} strokeWidth={1.5} />
        </div>
        <h2 className={styles.emptyTitle}>Under Construction</h2>
        <p className={styles.emptyDescription}>
          This module is being built during the workshop. Check back soon!
        </p>
      </div>
    </div>
  );
}
