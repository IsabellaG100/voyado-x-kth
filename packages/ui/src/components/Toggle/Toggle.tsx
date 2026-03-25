import { useId } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  /** Whether the toggle is on */
  checked: boolean;
  /** Called when the toggle is clicked */
  onChange: (checked: boolean) => void;
  /** Label for the toggle */
  label?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
}: ToggleProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={[styles.wrapper, disabled ? styles.disabled : undefined]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label && !label ? label : undefined}
        className={[styles.track, checked ? styles.checked : undefined]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onChange(!checked)}
        disabled={disabled}
      >
        <span className={styles.thumb} />
      </button>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
