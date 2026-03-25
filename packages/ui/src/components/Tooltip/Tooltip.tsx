import { useState, useRef, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip text content */
  content: string;
  /** Element that triggers the tooltip */
  children: ReactNode;
  /** Position relative to the trigger */
  position?: TooltipPosition;
}

export function Tooltip({
  content,
  children,
  position = 'top',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(false), 100);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {isVisible && (
        <div
          className={[styles.tooltip, styles[position]].join(' ')}
          role="tooltip"
        >
          {content}
          <span className={styles.arrow} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
