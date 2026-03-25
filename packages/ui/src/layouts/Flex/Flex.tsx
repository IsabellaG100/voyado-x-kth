import type { CSSProperties, ReactNode } from 'react';
import styles from './Flex.module.css';

export interface FlexProps {
  /** Flex direction */
  direction?: CSSProperties['flexDirection'];
  /** Gap between items (CSS value or spacing token) */
  gap?: string | number;
  /** Align items */
  align?: CSSProperties['alignItems'];
  /** Justify content */
  justify?: CSSProperties['justifyContent'];
  /** Whether items should wrap */
  wrap?: boolean;
  /** Child elements */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export function Flex({
  direction = 'row',
  gap,
  align,
  justify,
  wrap = false,
  children,
  className,
}: FlexProps) {
  const style: CSSProperties = {
    flexDirection: direction,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : undefined,
  };

  const classNames = [styles.flex, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}
