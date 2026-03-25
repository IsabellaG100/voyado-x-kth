import { useId, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label displayed above the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Error message — triggers error styling when set */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** HTML input type */
  type?: 'text' | 'number' | 'search' | 'password';
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
  className,
  id: externalId,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = externalId ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  const inputClassNames = [
    styles.input,
    error ? styles.hasError : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={inputClassNames}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...rest}
      />
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
