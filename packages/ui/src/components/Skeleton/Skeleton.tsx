import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
  /** Width of the skeleton (CSS value) */
  width?: string | number;
  /** Height of the skeleton (CSS value) */
  height?: string | number;
  /** Shape variant */
  variant?: SkeletonVariant;
}

export function Skeleton({
  width,
  height,
  variant = 'text',
}: SkeletonProps) {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const classNames = [styles.skeleton, styles[variant]].join(' ');

  return (
    <span
      className={classNames}
      style={style}
      aria-hidden="true"
      role="presentation"
    />
  );
}
