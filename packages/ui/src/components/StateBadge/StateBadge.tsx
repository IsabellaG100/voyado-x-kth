import styles from './StateBadge.module.css';

export type StateBadgeStatus =
  | 'active'
  | 'draft'
  | 'paused'
  | 'sent'
  | 'scheduled';

export interface StateBadgeProps {
  /** Status type */
  status: StateBadgeStatus;
  /** Display label */
  label: string;
}

export function StateBadge({ status, label }: StateBadgeProps) {
  return (
    <span
      className={[styles.badge, styles[status]].join(' ')}
      role="status"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
