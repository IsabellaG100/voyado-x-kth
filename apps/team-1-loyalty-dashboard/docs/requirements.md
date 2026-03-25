# Loyalty Dashboard — Business Requirements

## Overview

The Loyalty Dashboard is an internal tool for brand loyalty program managers to monitor the health and performance of their loyalty program at a glance. It provides key performance indicators, member tier distribution, enrollment trends, recent loyalty activity, and a top members leaderboard — all powered by static JSON data. This module lives within the Voyado Engage platform and follows the Essence design system.

## User Persona

**Anna — Loyalty Program Manager**
Anna manages the loyalty program for a mid-size retail brand. She checks the dashboard every morning to understand program health: how many members are active, how points are flowing, and whether enrollment is trending up or down. She needs a clear, scannable overview — not deep analytics. She values quick insights she can share in weekly team meetings.

## Features

### Feature 1: KPI Summary Row

**Priority:** Must Have

**Description:** A horizontal row of 4 KPI cards displayed at the top of the dashboard. Each card shows a key loyalty metric with its current value, the trend direction compared to the previous period (up/down/flat), and the percentage change. The 4 KPIs are:

1. **Total Members** — Total number of enrolled loyalty members
2. **Active Members (30d)** — Members who earned or redeemed points in the last 30 days
3. **Average Points Balance** — Mean points balance across all members
4. **Total Points Issued** — Sum of all points issued in the current period

**Acceptance Criteria:**
- [ ] Four `KpiCard` components are rendered in a horizontal row using CSS Grid or Flexbox
- [ ] Each card displays the metric label, formatted value (e.g., "12,450" with thousands separator), and unit where applicable
- [ ] Each card shows a trend arrow (↑, ↓, or →) with the percentage change (e.g., "+5.2%")
- [ ] Positive trends are styled with `--ess-color-success-bg` (green) and negative trends with `--ess-color-danger-bg` (red)
- [ ] KPI data is loaded from `data/members.json` and computed or read from `data/enrollment-stats.json`
- [ ] The row is responsive: 4 columns on desktop, 2×2 on narrow viewports (stretch goal)

**Component Mapping:**
- Use `KpiCard` from `@voyado-kth/ui` for each metric

---

### Feature 2: Tier Distribution

**Priority:** Must Have

**Description:** A visual breakdown showing how many members belong to each loyalty tier (Bronze, Silver, Gold, Platinum). Displayed as a horizontal stacked bar chart or a series of horizontal bars — one per tier. Each tier shows the tier name, member count, and percentage of total members. Tiers are color-coded using the tier's designated color from the data.

**Acceptance Criteria:**
- [ ] All 4 tiers (Bronze, Silver, Gold, Platinum) are displayed with their respective member counts
- [ ] Each tier shows a percentage of total members (e.g., "Bronze — 4,200 members — 42%")
- [ ] A visual bar (CSS `div` with `width` set to the percentage) represents each tier's proportion
- [ ] Tier bars use the `color` field from each `LoyaltyTierInfo` object for their background color
- [ ] The total member count across all tiers is displayed as a summary
- [ ] Data is loaded from `data/tiers.json`

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui`
- Use `Badge` components with appropriate colors for tier labels
- CSS-only bars (no chart library needed)

---

### Feature 3: Enrollment Trend

**Priority:** Must Have

**Description:** A visualization showing new member enrollments per month over the last 12 months. This can be rendered as a simple CSS bar chart (vertical bars) or as a table with inline visual bars. Each month shows the month label and enrollment count. This helps Anna spot seasonal trends and the impact of marketing campaigns on sign-ups.

**Acceptance Criteria:**
- [ ] 12 months of enrollment data are displayed in chronological order (oldest to newest)
- [ ] Each month shows a label (e.g., "Jan 2024") and the enrollment count as a number
- [ ] A visual bar represents the count, with height/width proportional to the maximum value in the dataset
- [ ] The current month is visually highlighted (e.g., different shade or bold label)
- [ ] Hovering over a bar shows the exact count (via a `title` attribute or `Tooltip`)
- [ ] Data is loaded from `data/enrollment-stats.json`

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui`
- CSS-only bar chart: use `div` elements with dynamic `height` styles
- Use Essence decorative colors (`--ess-color-aqua`, `--ess-color-blue`) for bars

---

### Feature 4: Recent Activity Feed

**Priority:** Must Have

**Description:** A chronological list of the most recent loyalty events, showing what's happening in the program right now. Each entry displays the member name, event type (points earned, points redeemed, tier upgrade), points amount (positive for earned, negative for redeemed), and a human-readable timestamp. The feed shows the 10 most recent events.

**Acceptance Criteria:**
- [ ] The 10 most recent activities are displayed in reverse chronological order (newest first)
- [ ] Each activity shows: member full name, event type, points amount, and timestamp
- [ ] Event types are visually distinguished: "earned" shows a green badge, "redeemed" shows a neutral badge, "tier_upgrade" shows a gold/warning badge
- [ ] Points amounts are formatted with a "+" prefix for earned and "−" prefix for redeemed
- [ ] Timestamps are displayed in a relative format (e.g., "2 hours ago") or as a short date/time string
- [ ] Data is loaded from `data/activity.json`

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui`
- Use `Badge` for event type indicators
- Render as a styled list (`<ul>`) with consistent spacing

---

### Feature 5: Top Members Table

**Priority:** Should Have

**Description:** A sortable table showing the top 10 members ranked by points balance. This leaderboard helps Anna identify her most engaged and valuable loyalty members. Columns include member name, tier (with a colored badge), points balance, and last activity date. Clicking a column header sorts the table by that column.

**Acceptance Criteria:**
- [ ] A table displays 10 members, initially sorted by points balance (highest first)
- [ ] Columns: Name (first + last), Tier, Points Balance, Last Activity Date
- [ ] The Tier column uses a `Badge` with color matching the tier (e.g., Gold = warning variant)
- [ ] Clicking a column header sorts the table by that column (toggle ascending/descending)
- [ ] The currently sorted column shows a sort direction indicator (▲/▼)
- [ ] Points balances are formatted with thousands separators
- [ ] Data is loaded from `data/members.json` (take top 10 by points balance)

**Component Mapping:**
- Wrap in a `Card` from `@voyado-kth/ui`
- Use `Badge` for tier display
- Build a custom `<table>` with Essence styling tokens

---

## Data Sources

All data is loaded from static JSON files in the `data/` directory. Import them directly (e.g., `import members from '../data/members.json'`).

| File | Description | Shape |
|------|-------------|-------|
| `data/members.json` | Array of loyalty program members | `Customer[]` |
| `data/tiers.json` | Tier definitions with member counts | `LoyaltyTierInfo[]` |
| `data/activity.json` | Recent loyalty events (earn, redeem, tier upgrade) | `Array<{ id: string; memberName: string; eventType: 'earned' \| 'redeemed' \| 'tier_upgrade'; points: number; timestamp: string }>` |
| `data/enrollment-stats.json` | Monthly enrollment counts + KPI summary | `{ kpis: KpiMetric[]; monthlyEnrollments: TimeSeriesDataPoint[] }` |

## Component Library

Use these components from `@voyado-kth/ui`:

| Component | Used For |
|-----------|----------|
| `KpiCard` | KPI Summary Row — each of the 4 metric cards |
| `Card` | Wrapping each dashboard section (tier distribution, enrollment, activity, top members) |
| `Badge` | Tier labels, event type indicators, count badges |
| `Chip` | Optional: filter chips for activity types |
| `Tabs` | Optional: switching between activity views |

**Import pattern:**
```tsx
import { KpiCard, Card, Badge } from '@voyado-kth/ui';
```

## Shared Types

Import these types from `@voyado-kth/shared`:

```tsx
import type { Customer, LoyaltyTier, LoyaltyTierInfo, KpiMetric, TimeSeriesDataPoint } from '@voyado-kth/shared';
```

| Type | Used For |
|------|----------|
| `Customer` | Member data in the top members table and for computing KPIs |
| `LoyaltyTier` | Tier values: `'Bronze' \| 'Silver' \| 'Gold' \| 'Platinum'` |
| `LoyaltyTierInfo` | Tier distribution data: name, minPoints, color, memberCount |
| `KpiMetric` | KPI card data: label, value, previousValue, unit, trend, trendPercentage |
| `TimeSeriesDataPoint` | Enrollment trend data: date, value, label |

## Design Guidelines

- Use Essence design tokens for all colors, spacing, and typography — import `@voyado-kth/ui/tokens/essence-tokens.css`
- Follow the visual language of the shell app: clean, professional, data-focused
- Use CSS Modules for component-specific styles (e.g., `Dashboard.module.css`)
- Desktop-first layout: the dashboard is a single scrollable page with sections stacked vertically
- Use CSS Grid for the KPI row (4 columns) and the main layout (e.g., 2-column grid for tier + enrollment)
- Mobile-responsive is a stretch goal — desktop-first is fine
- Use `--ess-color-success-bg` for positive trends, `--ess-color-danger-bg` for negative
- Use `--ess-spacing-*` tokens for consistent padding and margins
- Use `--ess-font-size-*` and `--ess-font-weight-*` for typography hierarchy

## Prioritization

If time is limited, build features in this order:

1. **KPI Summary Row** (~8 min) — Highest impact, simplest to implement with `KpiCard`
2. **Tier Distribution** (~8 min) — Clear visual with CSS-only bars
3. **Recent Activity Feed** (~8 min) — Simple list with badges
4. **Enrollment Trend** (~8 min) — CSS bar chart
5. **Top Members Table** (~8 min) — Sortable table (sort logic adds complexity)

**Minimum Viable Dashboard:** Features 1–3 give a meaningful, usable dashboard in ~24 minutes.
