import type { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /** Card content */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Adds hover shadow effect */
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false }: CardProps) {
  const classNames = [
    styles.card,
    hoverable ? styles.hoverable : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
