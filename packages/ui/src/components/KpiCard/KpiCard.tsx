import styles from './KpiCard.module.css';

export type KpiTrend = 'up' | 'down' | 'flat';

export interface KpiCardProps {
  /** KPI label / title */
  label: string;
  /** The main KPI value to display */
  value: string | number;
  /** Trend direction */
  trend?: KpiTrend;
  /** Trend value (e.g. "+12%") */
  trendValue?: string;
  /** Unit label (e.g. "%", "SEK") */
  unit?: string;
}

const trendIcons: Record<KpiTrend, string> = {
  up: '↑',
  down: '↓',
  flat: '→',
};

export function KpiCard({
  label,
  value,
  trend,
  trendValue,
  unit,
}: KpiCardProps) {
  const trendClass = trend ? styles[trend] : undefined;

  return (
    <div className={styles.card} role="group" aria-label={label}>
      <span className={styles.label}>{label}</span>
      <div className={styles.valueRow}>
        <span className={styles.value}>
          {value}
          {unit && <span className={styles.unit}>{unit}</span>}
        </span>
      </div>
      {trend && trendValue && (
        <span className={[styles.trend, trendClass].filter(Boolean).join(' ')}>
          <span aria-hidden="true">{trendIcons[trend]}</span>
          <span>{trendValue}</span>
        </span>
      )}
    </div>
  );
}
