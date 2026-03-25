import type { CSSProperties, ReactNode } from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  /** Number of columns, or a CSS grid-template-columns value */
  columns?: number | string;
  /** Gap between items (CSS value) */
  gap?: string | number;
  /** Child elements */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export function Grid({
  columns = 1,
  gap,
  children,
  className,
}: GridProps) {
  const style: CSSProperties = {
    gridTemplateColumns:
      typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
  };

  const classNames = [styles.grid, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}
