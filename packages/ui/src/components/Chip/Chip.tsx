import styles from './Chip.module.css';

export type ChipVariant = 'neutral' | 'colored';

export interface ChipProps {
  /** Text label for the chip */
  label: string;
  /** Called when the remove button is clicked; if omitted, no remove button is shown */
  onRemove?: () => void;
  /** Visual style variant */
  variant?: ChipVariant;
}

export function Chip({ label, onRemove, variant = 'neutral' }: ChipProps) {
  const classNames = [styles.chip, styles[variant]].join(' ');

  return (
    <span className={classNames} role="listitem">
      <span className={styles.label}>{label}</span>
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          onClick={onRemove}
          aria-label={`Remove ${label}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4L10 10M10 4L4 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
