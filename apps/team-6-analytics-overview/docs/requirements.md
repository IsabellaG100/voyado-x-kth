# Analytics Overview — Business Requirements

## Overview

The Analytics Overview is an executive-facing dashboard showing key business metrics, revenue trends, campaign performance, and channel breakdowns. It provides a high-level summary of business health with the ability to switch between date ranges. This module represents the reporting and analytics layer of the Voyado Engage platform — helping decision-makers quickly assess performance and spot trends. All data comes from static JSON files; the date range selector switches between pre-computed datasets.

## User Persona

**Johan — Head of Marketing & CRM**
Johan reviews analytics weekly to prepare for leadership meetings. He needs a quick, visual overview: Are revenue and retention trending up? Which campaigns performed best? How is revenue distributed across channels? He doesn't need to drill into individual records — he needs clear KPIs, trends, and comparisons. He often switches between time ranges (7 days vs. 30 days vs. 12 months) to get different perspectives.

## Features

### Feature 1: KPI Row

**Priority:** Must Have

**Description:** A horizontal row of 4 hero KPI cards displayed at the top of the dashboard. Each card shows a key business metric with its current value, previous period value, trend arrow (up/down/flat), and the percentage change between periods. KPIs are color-coded: green for positive trends, red for negative trends. The 4 KPIs are:

1. **Revenue** — Total revenue in the selected period (unit: SEK)
2. **Active Customers** — Number of customers who made a purchase
3. **Average Order Value** — Revenue divided by number of orders (unit: SEK)
4. **Retention Rate** — Percentage of returning customers (unit: %)

**Acceptance Criteria:**
- [ ] Four `KpiCard` components are rendered in a horizontal row using CSS Grid
- [ ] Each card displays: metric label, current value (formatted with thousands separator and unit), trend arrow, and percentage change (e.g., "+8.3%")
- [ ] Positive trends show green styling (`--ess-color-success-bg`) and negative trends show red (`--ess-color-danger-bg`)
- [ ] KPI values update when the date range is changed (Feature 5)
- [ ] Values are formatted appropriately: revenue with "SEK" suffix, retention rate with "%" suffix, counts as whole numbers
- [ ] Data is loaded from `data/kpis.json`

**Component Mapping:**
- Use `KpiCard` from `@voyado-kth/ui` for each metric

---

### Feature 2: Revenue Trend

**Priority:** Must Have

**Description:** A visualization of monthly revenue over the last 12 months. Rendered as a CSS-only bar chart — no chart library needed. Each bar represents a month, with height proportional to the revenue value. Each bar displays the month label and revenue value. This helps Johan spot seasonal patterns and overall revenue trajectory.

**Acceptance Criteria:**
- [ ] 12 months of revenue data are displayed as vertical bars in chronological order
- [ ] Bar height is proportional to the value relative to the maximum value in the dataset
- [ ] Each bar shows the month label (e.g., "Jan", "Feb") below it
- [ ] Hovering over a bar reveals the exact revenue value (via `title` attribute or a tooltip-style label)
- [ ] The highest-value month is visually highlighted (e.g., darker shade or accent color)
- [ ] Data is loaded from `data/revenue-trend.json` which contains a `ChartSeries` or `TimeSeriesDataPoint[]`
- [ ] The chart area has a subtle grid or baseline for visual reference

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui` with a heading
- CSS-only bar chart: use `div` elements with calculated `height` percentages
- Use Essence decorative colors (`--ess-color-aqua`) for bars, highlighted bar in `--ess-color-primary-bg`

---

### Feature 3: Campaign Performance

**Priority:** Must Have

**Description:** A table comparing the performance of recent marketing campaigns. Each row shows: campaign name, channel (email/SMS/push), open rate, click rate, and conversion rate. Rates are displayed as both numbers and visual inline bars to make comparison easy. This helps Johan identify which campaigns are driving the most engagement.

**Acceptance Criteria:**
- [ ] Campaign performance data is displayed in a table with columns: Campaign Name, Channel, Open Rate, Click Rate, Conversion Rate
- [ ] Channel is shown with an icon or label (📧 Email, 💬 SMS, 🔔 Push)
- [ ] Rate values are shown as percentages (e.g., "24.5%")
- [ ] Each rate cell includes a visual bar (CSS `div` with `width` proportional to the rate, max 100%) for easy visual comparison
- [ ] Rows are sorted by conversion rate (highest first) by default
- [ ] Data is loaded from `data/campaign-performance.json`

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui` with a heading
- Use `Badge` for channel indicators
- Build a custom `<table>` with Essence styling tokens
- CSS inline bars: `div` with `background-color` and dynamic `width`

---

### Feature 4: Channel Breakdown

**Priority:** Should Have

**Description:** A visual representation of revenue distribution across channels: Web, App, and In-store. Displayed as a horizontal stacked bar, a set of cards with percentages, or a donut-style breakdown. Each channel shows its name, revenue value, and percentage of total revenue. The visualization uses distinct colors for each channel.

**Acceptance Criteria:**
- [ ] Three channels are displayed: Web, App, In-store
- [ ] Each channel shows: name, revenue value (formatted with SEK), and percentage of total
- [ ] A visual distribution bar or set of cards makes the proportions immediately scannable
- [ ] Each channel uses a distinct color from the Essence decorative palette (e.g., Web → `--ess-color-aqua`, App → `--ess-color-blue`, In-store → `--ess-color-coral`)
- [ ] The total revenue across all channels is displayed as a summary
- [ ] Data is loaded from `data/channel-breakdown.json`

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui`
- Use CSS-only bars or colored `div` segments for the distribution visualization
- Use `Badge` or labels for channel names

---

### Feature 5: Date Range Selector

**Priority:** Must Have

**Description:** A control (dropdown, tab bar, or button group) to switch the dashboard's time range. Options: "Last 7 days", "Last 30 days", "Last 90 days", "Last 12 months". Changing the date range updates all KPIs and visualizations with the corresponding dataset. The data file contains pre-computed values for each range — no client-side date filtering is needed.

**Acceptance Criteria:**
- [ ] A date range selector is displayed prominently at the top of the dashboard (next to or below the page heading)
- [ ] Four options are available: "Last 7 days", "Last 30 days", "Last 90 days", "Last 12 months"
- [ ] The default selected range is "Last 30 days"
- [ ] Changing the range updates all KPI values, revenue trend chart, and campaign performance data
- [ ] The active range option is visually highlighted
- [ ] The transition between ranges is smooth (no jarring layout shifts)

**Component Mapping:**
- Use `Tabs` from `@voyado-kth/ui` for the date range options, or use a group of `Button` components with active/inactive states

---

### Feature 6: Metric Comparison

**Priority:** Could Have

**Description:** A visual comparison section showing current period vs. previous period for 3–4 key metrics. Each metric is displayed as two values side-by-side with the difference calculated and color-coded. This reinforces the KPI trend data in a different visual format — useful for presentations and quick comparisons.

**Acceptance Criteria:**
- [ ] 3–4 metrics are displayed in a comparison format: metric name, current value, previous value, and difference
- [ ] The difference is calculated (current − previous) and shown with a "+" or "−" prefix
- [ ] Positive differences are styled in green (`--ess-color-success-bg`), negative in red (`--ess-color-danger-bg`)
- [ ] Each metric row shows a visual indicator (progress bar or arrow) for the direction of change
- [ ] Data is derived from the same `data/kpis.json` (using `value` and `previousValue` fields)
- [ ] The comparison updates when the date range selector changes

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui`
- Use `Badge` for difference indicators
- CSS-only comparison bars: two side-by-side bars or a split bar

---

## Data Sources

All data is loaded from static JSON files in the `data/` directory. The data is pre-computed for each date range — the frontend simply switches between datasets.

| File | Description | Shape |
|------|-------------|-------|
| `data/kpis.json` | KPI metrics keyed by date range | `Record<string, KpiMetric[]>` (keys: `"7d"`, `"30d"`, `"90d"`, `"12m"`) |
| `data/revenue-trend.json` | Monthly revenue time series | `TimeSeriesDataPoint[]` |
| `data/campaign-performance.json` | Campaign metrics: open rate, click rate, conversion rate | `Array<{ name: string; channel: string; openRate: number; clickRate: number; conversionRate: number }>` |
| `data/channel-breakdown.json` | Revenue by channel | `ChannelBreakdown[]` |

### Sample KPIs Shape (keyed by range)

```json
{
  "7d": [
    { "label": "Revenue", "value": 245000, "previousValue": 231000, "unit": "SEK", "trend": "up", "trendPercentage": 6.1 },
    { "label": "Active Customers", "value": 1820, "previousValue": 1750, "trend": "up", "trendPercentage": 4.0 },
    { "label": "Avg Order Value", "value": 485, "previousValue": 510, "unit": "SEK", "trend": "down", "trendPercentage": -4.9 },
    { "label": "Retention Rate", "value": 68.5, "previousValue": 65.2, "unit": "%", "trend": "up", "trendPercentage": 5.1 }
  ],
  "30d": [ ... ],
  "90d": [ ... ],
  "12m": [ ... ]
}
```

### Sample Revenue Trend Shape

```json
[
  { "date": "2024-02", "value": 820000, "label": "Feb" },
  { "date": "2024-03", "value": 945000, "label": "Mar" },
  ...
]
```

### Sample Channel Breakdown Shape

```json
[
  { "channel": "Web", "value": 4200000, "percentage": 52, "color": "#388988" },
  { "channel": "App", "value": 2400000, "percentage": 30, "color": "#4790ff" },
  { "channel": "In-store", "value": 1450000, "percentage": 18, "color": "#e8725a" }
]
```

## Component Library

Use these components from `@voyado-kth/ui`:

| Component | Used For |
|-----------|----------|
| `KpiCard` | KPI Row — each of the 4 hero metric cards |
| `Card` | Wrapping each dashboard section (revenue trend, campaign performance, channel breakdown, metric comparison) |
| `Badge` | Channel indicators in campaign table, difference labels in metric comparison |
| `Tabs` | Date range selector |
| `Button` | Alternative date range selector (button group) |

**Import pattern:**
```tsx
import { KpiCard, Card, Badge, Tabs } from '@voyado-kth/ui';
```

## Shared Types

Import these types from `@voyado-kth/shared`:

```tsx
import type { KpiMetric, TimeSeriesDataPoint, ChartSeries, ChannelBreakdown } from '@voyado-kth/shared';
```

| Type | Used For |
|------|----------|
| `KpiMetric` | KPI card data: label, value, previousValue, unit, trend, trendPercentage |
| `TimeSeriesDataPoint` | Revenue trend data points: date, value, label |
| `ChartSeries` | Optional: named series with data points and color |
| `ChannelBreakdown` | Channel revenue data: channel, value, percentage, color |

## Design Guidelines

- Use Essence design tokens for all colors, spacing, and typography
- Dashboard layout: use CSS Grid with a 2-column layout for the main content (revenue trend + campaign performance side by side, channel breakdown + metric comparison below)
- KPI row: 4 equal-width columns using CSS Grid
- Revenue bars: use `--ess-color-aqua` as the default bar color, `--ess-color-primary-bg` for the highlighted (max) bar
- Campaign performance table: use zebra striping with `--ess-color-neutral-bg` for alternating rows
- Channel breakdown: use the `color` field from the data for each channel's visual representation
- Use CSS Modules for component-specific styles
- Desktop-first layout; mobile-responsive is a stretch goal
- Ensure numeric values are formatted with thousands separators (e.g., "1 245 000 SEK")
- Rate percentages: show 1 decimal place (e.g., "24.5%")

## Prioritization

If time is limited, build features in this order:

1. **KPI Row** (~7 min) — Highest impact, uses `KpiCard` component directly
2. **Date Range Selector** (~5 min) — Simple control using `Tabs`, enables range switching
3. **Revenue Trend** (~10 min) — CSS bar chart, visually impressive
4. **Campaign Performance** (~8 min) — Data table with inline visual bars
5. **Channel Breakdown** (~5 min) — Simple distribution visualization
6. **Metric Comparison** (~5 min) — Derived from existing KPI data, nice-to-have

**Minimum Viable Dashboard:** Features 1–3 give a compelling executive dashboard with KPIs, date range switching, and a revenue chart in ~22 minutes.
