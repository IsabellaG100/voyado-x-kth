import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'success' | 'danger' | 'warning' | 'info';

export interface BadgeProps {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Badge content (text or count) */
  children: ReactNode;
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  const classNames = [styles.badge, styles[variant]].join(' ');

  return (
    <span className={classNames} role="status">
      {children}
    </span>
  );
}
