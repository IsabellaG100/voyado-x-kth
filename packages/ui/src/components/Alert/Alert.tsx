import type { ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Visual style variant */
  variant?: AlertVariant;
  /** Alert title (optional) */
  title?: string;
  /** Alert body content */
  children: ReactNode;
  /** Called when the close button is clicked */
  onClose?: () => void;
}

const variantIcons: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
}: AlertProps) {
  const classNames = [styles.alert, styles[variant]].join(' ');

  return (
    <div className={classNames} role="alert">
      <span className={styles.icon} aria-hidden="true">
        {variantIcons[variant]}
      </span>
      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        <div className={styles.body}>{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close alert"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
