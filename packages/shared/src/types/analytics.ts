export interface KpiMetric {
  label: string;
  value: number;
  previousValue?: number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendPercentage?: number;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ChartSeries {
  name: string;
  data: TimeSeriesDataPoint[];
  color?: string;
}

export interface ChannelBreakdown {
  channel: string;
  value: number;
  percentage: number;
  color: string;
}
