import { useId, type SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label displayed above the select */
  label?: string;
  /** Available options */
  options: SelectOption[];
  /** Current value */
  value?: string;
  /** Placeholder text for the empty option */
  placeholder?: string;
  /** Error message — triggers error styling when set */
  error?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className,
  id: externalId,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = externalId ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;

  const selectClassNames = [
    styles.select,
    error ? styles.hasError : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          className={selectClassNames}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
