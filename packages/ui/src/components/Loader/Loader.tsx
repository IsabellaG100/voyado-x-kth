import styles from './Loader.module.css';

export type LoaderSize = 'small' | 'medium' | 'large';

export interface LoaderProps {
  /** Size of the loader */
  size?: LoaderSize;
}

export function Loader({ size = 'medium' }: LoaderProps) {
  return (
    <span
      className={[styles.loader, styles[size]].join(' ')}
      role="status"
      aria-label="Loading"
    >
      <svg viewBox="0 0 24 24" fill="none" className={styles.spinner}>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className={styles.track}
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
          className={styles.indicator}
        />
      </svg>
    </span>
  );
}
