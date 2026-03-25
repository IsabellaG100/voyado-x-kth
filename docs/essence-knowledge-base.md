# Essence Design System — Knowledge Base

> **Source:** [essence.voyado.com](https://essence.voyado.com/#/foundations/essence-design-system)
>
> Essence is Voyado's internal design system. The original components are built for Aurelia (`@voyado/essence-components`), but the **design tokens** (`@voyado/essence-tokens`) are framework-agnostic and should be used in this project's React apps to maintain visual consistency with Voyado's product design language.

---

## How to Use Essence in This Project

Since Essence components are Aurelia-native and can't be used directly in React, the workshop apps should:

1. **Use Essence design tokens** as CSS custom properties for colors, spacing, typography, borders, and shadows
2. **Follow the component patterns** described below when building React equivalents
3. **Match the visual language** — same border radii, color palettes, spacing scale, and typography

### Setup

Include Essence tokens as CSS custom properties in your app's global stylesheet:

```css
/* src/styles/essence-tokens.css */
:root {
  /* Colors - Primary */
  --ess-color-primary-bg: #2d6e6d;
  --ess-color-primary-bg-hover: #388988;
  --ess-color-primary-bg-active: #204f4e;
  --ess-color-primary-text: #ffffff;
  --ess-color-primary-border: #2d6e6d;

  /* Colors - Neutral */
  --ess-color-neutral-bg: #f8f8f7;
  --ess-color-neutral-bg-secondary: #f0f0ef;
  --ess-color-neutral-border: #c1c1bd;
  --ess-color-neutral-fg: #21211f;
  --ess-color-neutral-fg-strong: #000000;
  --ess-color-neutral-fg-weak: #797971;

  /* Colors - Danger */
  --ess-color-danger-bg: #bf1100;
  --ess-color-danger-bg-hover: #e41300;
  --ess-color-danger-bg-weak: #ffeeec;
  --ess-color-danger-text: #ffffff;
  --ess-color-danger-icon-weak: #bf1100;

  /* Colors - Success */
  --ess-color-success-bg: #43a584;
  --ess-color-success-bg-hover: #5dbd9d;
  --ess-color-success-bg-weak: #edf8f4;
  --ess-color-success-text: #ffffff;
  --ess-color-success-icon-weak: #348067;

  /* Colors - Warning */
  --ess-color-warning-bg: #f9e688;
  --ess-color-warning-bg-hover: #fbf0b9;
  --ess-color-warning-bg-weak: #fefae6;
  --ess-color-warning-text: #21211f;
  --ess-color-warning-icon-weak: #d8b60c;

  /* Colors - Interactive Controls */
  --ess-color-control-bg: #ffffff;
  --ess-color-control-border: #c0c0bc;
  --ess-color-control-border-hover: #a6a6a0;
  --ess-color-control-border-active: #61615b;
  --ess-color-control-border-error: #e41300;
  --ess-color-control-border-disabled: #c0c0bc;
  --ess-color-control-text: #21211f;
  --ess-color-control-text-disabled: #a6a6a0;
  --ess-color-control-bg-disabled: #f0f0ef;

  /* Colors - Checkbox/Toggle/Radio */
  --ess-color-bool-checked-bg: #43a584;
  --ess-color-bool-checked-border: #348067;
  --ess-color-bool-unchecked-border: #c0c0bc;

  /* Colors - Inverted (dark backgrounds) */
  --ess-color-inverted-bg: #21211f;
  --ess-color-inverted-text: #ffffff;

  /* Colors - Emphasized */
  --ess-color-emphasized-bg: #ffffff;
  --ess-color-emphasized-border: #21211f;

  /* Colors - Backdrop */
  --ess-color-backdrop: rgba(6, 21, 24, 0.2);
  --ess-color-backdrop-medium: rgba(6, 21, 24, 0.7);

  /* Colors - Decorative Palettes (for charts, badges, tags) */
  --ess-color-aqua-bg: #e2efef;
  --ess-color-aqua-fg: #143231;
  --ess-color-aqua-strong: #388988;
  --ess-color-blue-bg: #e7f4ff;
  --ess-color-blue-fg: #03081c;
  --ess-color-blue-strong: #4790ff;
  --ess-color-burgundy-bg: #f2e4eb;
  --ess-color-coral-bg: #fce9e5;
  --ess-color-forest-bg: #e2efef;
  --ess-color-green-bg: #edf8f4;
  --ess-color-purple-bg: #ece7f4;
  --ess-color-sand-bg: #f5f0e8;
  --ess-color-cherry-bg: #fce5ee;
  --ess-color-yellow-bg: #fefae6;
  --ess-color-red-bg: #ffeeec;
  --ess-color-pink-bg: #fce5f2;

  /* Typography */
  --ess-font-family-normal: 'standard-font', sans-serif;
  --ess-font-family-display: 'profile-font', sans-serif;
  --ess-font-weight-normal: normal;
  --ess-font-weight-medium: 500;
  --ess-font-weight-bold: 700;
  --ess-font-line-height-base: 1em;
  --ess-font-line-height-medium: 1.25em;
  --ess-font-line-height-body: 1.5em;
  --ess-font-line-height-heading: 1em;

  /* Font Sizes (base: 16px, scale: 1.125 major second) */
  --ess-font-size-tiny: 11.2px;   /* ~100 */
  --ess-font-size-small: 12.6px;  /* ~200 */
  --ess-font-size-medium: 14.2px; /* ~300 */
  --ess-font-size-large: 16px;    /* 400 = base */
  --ess-font-size-h5: 14.2px;     /* heading-5 */
  --ess-font-size-h4: 16px;       /* heading-4 */
  --ess-font-size-h3: 18px;       /* heading-3 */
  --ess-font-size-h2: 20.3px;     /* heading-2 */
  --ess-font-size-h1: 22.8px;     /* heading-1 */

  /* Spacing (4px base unit) */
  --ess-spacing-100: 4px;
  --ess-spacing-200: 8px;
  --ess-spacing-300: 12px;
  --ess-spacing-400: 16px;
  --ess-spacing-450: 20px;
  --ess-spacing-500: 24px;
  --ess-spacing-600: 32px;
  --ess-spacing-700: 40px;
  --ess-spacing-800: 48px;
  --ess-spacing-900: 56px;
  --ess-spacing-1000: 64px;

  /* Sizing (4px base unit) */
  --ess-size-0: 0px;
  --ess-size-25: 1px;
  --ess-size-50: 2px;
  --ess-size-75: 3px;
  --ess-size-100: 4px;
  --ess-size-200: 8px;
  --ess-size-300: 12px;
  --ess-size-400: 16px;
  --ess-size-450: 20px;
  --ess-size-500: 24px;
  --ess-size-600: 32px;
  --ess-size-700: 40px;
  --ess-size-800: 48px;
  --ess-size-900: 56px;
  --ess-size-1000: 64px;

  /* Border */
  --ess-border-width-small: 1px;
  --ess-border-width-medium: 2px;
  --ess-border-width-large: 4px;
  --ess-border-radius-tiny: 2px;
  --ess-border-radius-small: 4px;
  --ess-border-radius-medium: 8px;
  --ess-border-radius-large: 16px;
  --ess-border-radius-xlarge: 32px;
  --ess-border-radius-round: 100em;

  /* Shadows */
  --ess-shadow-small: 0px 1px 1px -1px rgba(0,0,0,0.04), 0px 2px 2px -1px rgba(0,0,0,0.04), 0px 4px 4px -1px rgba(0,0,0,0.04), 0px 0px 1px rgba(0,0,0,0.1);
  --ess-shadow-medium: 0px 1px 1px -2px rgba(0,0,0,0.05), 0px 2px 2px -2px rgba(0,0,0,0.05), 0px 4px 4px -2px rgba(0,0,0,0.05), 0px 16px 16px -2px rgba(0,0,0,0.05), 0px 0px 2px rgba(0,0,0,0.1);
  --ess-shadow-large: 0px 1px 1px -4px rgba(0,0,0,0.06), 0px 2px 2px -4px rgba(0,0,0,0.06), 0px 4px 4px -4px rgba(0,0,0,0.06), 0px 8px 8px -4px rgba(0,0,0,0.06), 0px 16px 16px -4px rgba(0,0,0,0.06), 0px 32px 32px -4px rgba(0,0,0,0.06), 0px 0px 4px rgba(0,0,0,0.1);

  /* Z-index levels (named metaphorically) */
  --ess-level-seabed: -1000;
  --ess-level-mine: -300;
  --ess-level-sewer: -100;
  --ess-level-ditch: -50;
  --ess-level-pothole: -10;
  --ess-level-pavement: 0;
  --ess-level-curb: 1;
  --ess-level-postbox: 10;
  --ess-level-shed: 50;
  --ess-level-bungalow: 100;
  --ess-level-house: 200;
  --ess-level-building: 500;
  --ess-level-skyscraper: 1000;
  --ess-level-satellite: 5000;

  /* Transitions */
  --ess-duration-instant: 0ms;
  --ess-duration-x-fast: 50ms;
  --ess-duration-fast: 100ms;
  --ess-duration-normal: 200ms;
  --ess-duration-slow: 400ms;
  --ess-duration-x-slow: 800ms;
  --ess-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ess-ease-out: cubic-bezier(0, 0, 0.6, 1);
  --ess-ease-in-out: cubic-bezier(0.4, 0, 0.6, 1);
  --ess-bounce-in: cubic-bezier(0.68, -0.28, 0.83, 0.11);
  --ess-bounce-out: cubic-bezier(0.17, 0.89, 0.32, 1.28);
}
```

---

## Component Reference

### Layout Components

| Component | Essence Name | Use When | React Equivalent |
|-----------|-------------|----------|------------------|
| **Box** | `ui-box` | Generic container with padding/margin. The fundamental building block. | `<div>` with Essence spacing tokens |
| **Flex** | `ui-flex` | Flexbox layout — rows, columns, alignment, gaps | `display: flex` with gap using spacing tokens |
| **Grid** | `ui-grid` | Multi-column grid layouts | CSS Grid with Essence spacing |
| **CSS Grid** | `ui-css-grid` | Complex grid layouts with explicit rows/columns | CSS Grid |
| **Container** | `ui-container` | Page-level content container with max-width | Centered `<div>` with max-width |
| **Main Content** | `ui-main-content` | Primary content area of a page | `<main>` element |

**Example — Flex layout:**
```tsx
<div style={{
  display: 'flex',
  gap: 'var(--ess-spacing-400)',
  alignItems: 'center'
}}>
  {children}
</div>
```

---

### Navigation & Structure

| Component | Essence Name | Use When | React Equivalent |
|-----------|-------------|----------|------------------|
| **Header** | `ui-header` | App or section header bar | Sticky top bar component |
| **Page Header** | `ui-page-header` | Page title + actions area | Title + button row at page top |
| **Breadcrumb** | `ui-breadcrumb` | Show navigation path hierarchy | `Home > Segment > Details` trail |
| **Tabs** | `ui-tabs` | Switch between content panels | Tab bar + conditional rendering |
| **Vertical Tabs** | `ui-vertical-tabs` | Side navigation tabs | Sidebar tabs |
| **Nav Tabs** | `ui-nav-tabs` | Top-level navigation tabs | Route-level tab navigation |
| **Navigation** | `ui-navigation` | Main sidebar navigation | Side nav with links |
| **Toolbar** | `ui-toolbar` | Row of action buttons/tools | Horizontal button bar |
| **Pagination** | `ui-pagination` | Navigate between result pages | Page number controls |

**Example — Tabs:**
```tsx
const [activeTab, setActiveTab] = useState('overview');

<div className="ess-tabs">
  <button
    className={activeTab === 'overview' ? 'active' : ''}
    onClick={() => setActiveTab('overview')}
  >
    Overview
  </button>
  <button
    className={activeTab === 'details' ? 'active' : ''}
    onClick={() => setActiveTab('details')}
  >
    Details
  </button>
</div>
```

**Styling tabs with tokens:**
```css
.ess-tabs button {
  padding: var(--ess-spacing-200) var(--ess-spacing-400);
  border: none;
  border-bottom: var(--ess-border-width-medium) solid transparent;
  background: none;
  color: var(--ess-color-neutral-fg-weak);
  font-size: var(--ess-font-size-medium);
  cursor: pointer;
}

.ess-tabs button.active {
  color: var(--ess-color-neutral-fg);
  border-bottom-color: var(--ess-color-primary-bg);
  font-weight: var(--ess-font-weight-medium);
}

.ess-tabs button:hover {
  color: var(--ess-color-neutral-fg);
}
```

---

### Buttons

| Component | Essence Name | Use When |
|-----------|-------------|----------|
| **Button** | `ui-button` | Primary actions (save, submit, create) |
| **Button Group** | `ui-button-group` | Group related buttons together |
| **Split Button** | `ui-split-button` | Button with dropdown for secondary actions |
| **Menu Button** | `ui-menu-button` | Button that opens a dropdown menu |

**Button variants in Essence:**

| Variant | Background | Text | Border | Use For |
|---------|-----------|------|--------|---------|
| **Primary** | `#2d6e6d` (teal) | White | `#2d6e6d` | Main call-to-action |
| **Danger** | `#bf1100` (red) | White | — | Destructive actions (delete, remove) |
| **Emphasized** | White | Dark | `#21211f` | Important secondary actions |
| **Inverted** | `#21211f` (dark) | White | `#21211f` | On light backgrounds, strong presence |
| **Neutral** | `#f8f8f7` (light gray) | Dark | — | Subtle, low-emphasis actions |
| **Ghost/Weak** | Transparent | Dark | Subtle | Minimal visual weight |

**Example — Button styles:**
```css
.btn-primary {
  background: var(--ess-color-primary-bg);
  color: var(--ess-color-primary-text);
  border: var(--ess-border-width-small) solid var(--ess-color-primary-border);
  border-radius: var(--ess-border-radius-small);
  padding: var(--ess-spacing-200) var(--ess-spacing-400);
  font-weight: var(--ess-font-weight-medium);
  cursor: pointer;
  transition: background var(--ess-duration-fast) var(--ess-ease-out);
}
.btn-primary:hover {
  background: var(--ess-color-primary-bg-hover);
}
.btn-primary:active {
  background: var(--ess-color-primary-bg-active);
}

.btn-danger {
  background: var(--ess-color-danger-bg);
  color: var(--ess-color-danger-text);
}
.btn-danger:hover {
  background: var(--ess-color-danger-bg-hover);
}

.btn-neutral {
  background: var(--ess-color-neutral-bg);
  color: var(--ess-color-neutral-fg);
  border: var(--ess-border-width-small) solid var(--ess-color-neutral-border);
}
```

---

### Data Display

| Component | Essence Name | Use When |
|-----------|-------------|----------|
| **Card** | `ui-card` | Container for grouped content with border/shadow |
| **Horizontal Card** | `ui-horizontal-card` | Card with side-by-side layout (image + content) |
| **Badge** | `ui-badge` | Numeric or status indicator (notification count) |
| **Chip** | `ui-chip` | Tags, labels, filter chips |
| **Label** | `ui-label` | Text labels with optional color coding |
| **State Badge** | `ui-state-badge` | Status indicators (active, paused, draft) |
| **Status Icon** | `ui-status-icon` | Colored dot or icon for status |
| **Function Badge** | `ui-function-badge` | Badge with icon for function/feature type |
| **Ribbon** | `ui-ribbon` | Decorative ribbon on cards |
| **Thumbnail** | `ui-thumbnail` | Small image preview |
| **DL List** | `ui-dl-list` | Definition list (key-value pairs) |
| **List** | `ui-list` | Ordered/unordered lists with consistent styling |
| **Icon Text** | `ui-icon-text` | Icon + text inline combination |

**Example — Card:**
```css
.ess-card {
  background: var(--ess-color-neutral-weak-bg, #ffffff);
  border: var(--ess-border-width-small) solid var(--ess-color-neutral-weak-border);
  border-radius: var(--ess-border-radius-medium);
  padding: var(--ess-spacing-500);
  box-shadow: var(--ess-shadow-small);
}
.ess-card:hover {
  box-shadow: var(--ess-shadow-medium);
}
```

**Example — Badge:**
```css
.ess-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--ess-size-450);
  height: var(--ess-size-450);
  padding: 0 var(--ess-spacing-200);
  border-radius: var(--ess-border-radius-round);
  font-size: var(--ess-font-size-small);
  font-weight: var(--ess-font-weight-bold);
}
.ess-badge-success {
  background: var(--ess-color-success-bg);
  color: var(--ess-color-success-text);
}
.ess-badge-danger {
  background: var(--ess-color-danger-bg);
  color: var(--ess-color-danger-text);
}
```

**Example — Chip:**
```css
.ess-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--ess-spacing-100);
  padding: var(--ess-spacing-100) var(--ess-spacing-300);
  border-radius: var(--ess-border-radius-round);
  font-size: var(--ess-font-size-small);
  background: var(--ess-color-neutral-bg);
  color: var(--ess-color-neutral-fg);
  border: var(--ess-border-width-small) solid var(--ess-color-neutral-border);
}
```

---

### Form Components

| Component | Essence Name | Use When |
|-----------|-------------|----------|
| **Text Input** | `form-input-text` | Single-line text entry |
| **Number Input** | `form-input-number` | Numeric values |
| **Password Input** | `form-input-password` | Password entry |
| **Search Input** | `form-input-search` | Search field with icon |
| **Textarea** | `form-textarea` | Multi-line text |
| **Select** | `form-select` | Single-option dropdown |
| **Multi-select** | `form-multiselect` | Multiple selection dropdown |
| **Checkbox** | `form-checkbox` | Boolean toggle (checked/unchecked) |
| **Checkbox List** | `form-checkbox-list` | Multiple checkbox options |
| **Radio Group** | `form-radio-group` | Mutually exclusive options |
| **Toggle** | `form-toggle` | On/off switch |
| **Toggle Button** | `form-toggle-button` | Button that toggles state |
| **Datepicker** | `form-datepicker` | Date selection |
| **Date Range Picker** | `form-daterangepicker` | Start/end date selection |
| **Datetime Picker** | `form-datetimepicker` | Date and time selection |
| **Time Input** | `form-input-time` | Time selection |
| **Color Input** | `form-input-color` | Color picker |
| **Color List** | `form-color-list` | Color palette selection |
| **File Input** | `form-input-file` | File upload |
| **File Drop** | `form-input-file-drop` | Drag-and-drop file upload |
| **Range Input** | `form-input-range` | Slider input |
| **Autocomplete** | `form-autocomplete` | Search with suggestions |
| **Rich Text** | `form-input-rich-text` | WYSIWYG editor |
| **Code Input** | `form-input-code` | Code/monospace input |
| **Percentage Groups** | `form-percentage-groups` | Distribute percentages across groups |
| **Link Input** | `form-input-link` | URL entry |

**Example — Input field styling:**
```css
.ess-input {
  width: 100%;
  padding: var(--ess-spacing-200) var(--ess-spacing-300);
  border: var(--ess-border-width-small) solid var(--ess-color-control-border);
  border-radius: var(--ess-border-radius-small);
  background: var(--ess-color-control-bg);
  color: var(--ess-color-control-text);
  font-size: var(--ess-font-size-medium);
  font-family: var(--ess-font-family-normal);
  transition: border-color var(--ess-duration-fast) var(--ess-ease-out);
}
.ess-input:hover {
  border-color: var(--ess-color-control-border-hover);
}
.ess-input:focus {
  border-color: var(--ess-color-control-border-active);
  outline: var(--ess-border-width-medium) solid var(--ess-color-primary-bg);
  outline-offset: 1px;
}
.ess-input.error {
  border-color: var(--ess-color-control-border-error);
}
.ess-input:disabled {
  background: var(--ess-color-control-bg-disabled);
  border-color: var(--ess-color-control-border-disabled);
  color: var(--ess-color-control-text-disabled);
  cursor: not-allowed;
}
```

**Example — Toggle/Checkbox:**
```css
.ess-toggle-track {
  width: 36px;
  height: 20px;
  border-radius: var(--ess-border-radius-round);
  background: var(--ess-color-bool-unchecked-border);
  transition: background var(--ess-duration-fast) var(--ess-ease-out);
}
.ess-toggle-track.checked {
  background: var(--ess-color-bool-checked-bg);
}
```

---

### Feedback & Overlays

| Component | Essence Name | Use When |
|-----------|-------------|----------|
| **Alert** | `alert` | Inline banners for info, warning, error, success |
| **Alert Dialog** | `alert-dialog` | Confirmation before destructive actions |
| **Dialog** | `ui-dialog` | Modal overlay for forms, confirmations |
| **Mini Dialog** | `ui-mini-dialog` | Small popover dialog |
| **Notification** | `ui-notification` | Toast notifications (auto-dismiss) |
| **Tooltip** | `ui-tooltip` | Hover info on elements |
| **Infobox** | `ui-infobox` | Inline help/explanation block |
| **Loader** | `ui-loader` | Spinner for loading states |
| **Loading Bar** | `ui-loading-bar` | Top-of-page progress bar |
| **Skeleton** | `ui-skeleton` | Placeholder while content loads |

**Alert colors follow the semantic palette:**

| Alert Type | Background | Icon Color | Use When |
|-----------|-----------|-----------|----------|
| **Info** | `--ess-color-blue-bg` (#e7f4ff) | `--ess-color-blue-strong` | Informational messages |
| **Success** | `--ess-color-success-bg-weak` (#edf8f4) | `--ess-color-success-icon-weak` | Confirming completed actions |
| **Warning** | `--ess-color-warning-bg-weak` (#fefae6) | `--ess-color-warning-icon-weak` | Caution, potential issues |
| **Error/Danger** | `--ess-color-danger-bg-weak` (#ffeeec) | `--ess-color-danger-icon-weak` | Errors, failures |

**Example — Alert:**
```css
.ess-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--ess-spacing-300);
  padding: var(--ess-spacing-400);
  border-radius: var(--ess-border-radius-medium);
}
.ess-alert-info {
  background: var(--ess-color-blue-bg);
  color: var(--ess-color-blue-fg);
}
.ess-alert-success {
  background: var(--ess-color-success-bg-weak);
  color: var(--ess-color-neutral-fg);
}
.ess-alert-warning {
  background: var(--ess-color-warning-bg-weak);
  color: var(--ess-color-neutral-fg);
}
.ess-alert-error {
  background: var(--ess-color-danger-bg-weak);
  color: var(--ess-color-neutral-fg);
}
```

---

### Visualization Components (Charts & KPIs)

These are from `@voyado/essence-visualization` and are particularly relevant for **Team 1 (Loyalty Dashboard)** and **Team 6 (Analytics Overview)**.

| Component | Essence Name | Use When |
|-----------|-------------|----------|
| **Bar Chart** | `ui-chart-bar` | Comparing values across categories |
| **Donut Chart** | `ui-chart-donut` | Part-of-whole distribution (tiers, segments) |
| **Pie Chart** | `ui-chart-pie` | Similar to donut, for proportional data |
| **Multi-line Chart** | `ui-chart-multiline` | Trends over time, multiple series |
| **Mini Chart** | `ui-chart-mini` | Sparkline-style inline trend |
| **KPI Card** | `ui-kpi-card` | Single key metric with label |
| **KPI Hero** | `ui-kpi-hero` | Large featured KPI number |
| **KPI Trend** | `ui-kpi-trend` | KPI with trend indicator (▲/▼) |
| **Stats Bar** | `ui-stats-bar` | Horizontal stacked bar for distribution |
| **Stats Bar Extended** | `ui-stats-bar-extended` | Stats bar with labels and legend |
| **Stats Comparison** | `ui-stats-comparison` | Side-by-side metric comparison |
| **Stats Mini** | `ui-stats-mini` | Compact stats display |
| **Stats Text** | `ui-stats-text` | Text-based statistics |
| **Trend** | `ui-trend` | Trend arrow indicator (up/down/flat) |
| **Delivery Status** | `ui-stats-delivery-status` | Email/SMS delivery status breakdown |

**Chart color palette** — use these for chart series to match Voyado's data visualization:
```css
:root {
  --ess-chart-1: #388988;  /* aqua/teal - primary */
  --ess-chart-2: #4790ff;  /* blue */
  --ess-chart-3: #43a584;  /* green */
  --ess-chart-4: #f9e688;  /* yellow */
  --ess-chart-5: #bf1100;  /* red */
  --ess-chart-6: #791A3F;  /* burgundy/profile */
}
```

**Example — KPI Card:**
```tsx
interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
}

function KpiCard({ label, value, trend, trendValue }: KpiCardProps) {
  return (
    <div className="ess-kpi-card">
      <span className="ess-kpi-label">{label}</span>
      <span className="ess-kpi-value">{value}</span>
      {trend && (
        <span className={`ess-kpi-trend ess-kpi-trend--${trend}`}>
          {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'} {trendValue}
        </span>
      )}
    </div>
  );
}
```

```css
.ess-kpi-card {
  display: flex;
  flex-direction: column;
  gap: var(--ess-spacing-100);
  padding: var(--ess-spacing-500);
  background: white;
  border: var(--ess-border-width-small) solid var(--ess-color-neutral-weak-border);
  border-radius: var(--ess-border-radius-medium);
}
.ess-kpi-label {
  font-size: var(--ess-font-size-small);
  color: var(--ess-color-neutral-fg-weak);
  font-weight: var(--ess-font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.ess-kpi-value {
  font-size: 2rem;
  font-weight: var(--ess-font-weight-bold);
  color: var(--ess-color-neutral-fg-strong);
  line-height: var(--ess-font-line-height-heading);
}
.ess-kpi-trend--up { color: var(--ess-color-success-bg); }
.ess-kpi-trend--down { color: var(--ess-color-danger-bg); }
.ess-kpi-trend--flat { color: var(--ess-color-neutral-fg-weak); }
```

---

### AI Components

Essence includes AI-specific components, relevant for displaying AI features:

| Component | Essence Name | Use When |
|-----------|-------------|----------|
| **AI Blob** | `ai-blob` | Animated AI thinking/processing indicator |
| **AI Button** | `ai-button` | Trigger AI actions (styled differently from regular buttons) |
| **AI Chat Answer** | `ai-chat-answer` | Display AI-generated responses |
| **AI Chat Question** | `ai-chat-question` | Display user questions in chat |
| **AI Chat Separator** | `ai-chat-separator` | Visual separator in chat conversations |
| **AI Sparkles** | `ai-sparkles` | Sparkle icon indicating AI-powered features |

---

### Specialized Components

| Component | Essence Name | Use When |
|-----------|-------------|----------|
| **Accordion** | `ui-accordion` | Collapsible content sections |
| **Entity Builder** | `entity-builder` | Complex rule/entity creation (segments, queries) |
| **Query Builder** | `query-builder` | Build filter queries with rules |
| **List Filter** | `ui-list-filter` | Filter controls for lists |
| **Page Filter** | `ui-page-filter` | Page-level filter bar |
| **Selected List** | `ui-selected-list` | Display selected items with remove option |
| **Menu** | `ui-menu` | Dropdown/context menus |
| **Read More** | `ui-read-more` | Expandable text with "read more" toggle |
| **QR Code** | `ui-qr-code` | Generate QR codes |
| **SMS Bubble** | `ui-sms-bubble` | Chat bubble for SMS preview |
| **Tree View** | `ui-tree-view-item` | Hierarchical tree navigation |
| **Flow Node** | `ui-flow-node` | Node in a workflow/flow diagram |
| **Pretty Scroller** | `ui-pretty-scroller` | Custom styled scrollbar |
| **Color Swatch** | `ui-color-swatch` | Color preview square |

---

### Icons

Essence uses **Font Awesome** icons via the `fa-icon` component, plus custom Voyado-specific icons.

**Custom Voyado icons available:**
- `fa-loyalty-star-bag`, `fa-loyalty-star-card`, `fa-loyalty-star-circle`, `fa-loyalty-star-medal` — loyalty program icons
- `fa-segmenting-tool`, `fa-search-segment`, `fa-recent-segmentations`, `fa-saved-segmentations` — segmentation
- `fa-targeting`, `fa-assistive-targeting` — audience targeting
- `fa-automation-email`, `fa-postal-envelope` — communication channels
- `fa-engagements`, `fa-interactions` — customer engagement
- `fa-onsite`, `fa-webhooks` — integrations
- `fa-data-connection`, `fa-data-connection-off` — data status

For the workshop, use Font Awesome free icons (`@fortawesome/react-fontawesome`) and reference these Voyado icon concepts for inspiration.

---

## Component-to-Team Mapping

Which Essence components each team should focus on:

### Team 1: Loyalty Dashboard
`ui-kpi-card` · `ui-kpi-hero` · `ui-kpi-trend` · `ui-chart-donut` · `ui-chart-multiline` · `ui-stats-bar` · `ui-card` · `ui-tabs` · `ui-badge`

### Team 2: Product Catalog
`ui-card` · `ui-horizontal-card` · `ui-chip` · `ui-grid` · `ui-pagination` · `form-input-search` · `ui-list-filter` · `ui-badge` · `ui-thumbnail`

### Team 3: Customer Segments
`entity-builder` · `query-builder` · `ui-chip` · `form-select` · `form-input-text` · `ui-button-group` · `ui-list` · `ui-badge` · `ui-state-badge`

### Team 4: Campaign Builder
`ui-tabs` (wizard steps) · `ui-card` · `form-input-text` · `form-textarea` · `form-select` · `form-datepicker` · `ui-thumbnail` · `ui-dialog` · `ui-sms-bubble` · `ui-state-badge`

### Team 5: Rewards Store
`ui-card` · `ui-grid` · `ui-chip` · `ui-badge` · `ui-dialog` (confirmation) · `ui-button` · `ui-list-filter` · `ui-thumbnail` · `ui-kpi-card` (points balance)

### Team 6: Analytics Overview
`ui-kpi-card` · `ui-kpi-hero` · `ui-kpi-trend` · `ui-chart-bar` · `ui-chart-donut` · `ui-chart-multiline` · `ui-stats-comparison` · `ui-stats-bar` · `form-daterangepicker` · `ui-tabs`

---

## Quick Reference: Color Semantics

| Purpose | Token | Hex |
|---------|-------|-----|
| Primary action | `--ess-color-primary-bg` | `#2d6e6d` |
| Primary hover | `--ess-color-primary-bg-hover` | `#388988` |
| Page background | `--ess-color-neutral-bg` | `#f8f8f7` |
| Card/surface | `--ess-color-neutral-weak-bg` | `#ffffff` |
| Body text | `--ess-color-neutral-fg` | `#21211f` |
| Secondary text | `--ess-color-neutral-fg-weak` | `#797971` |
| Borders | `--ess-color-neutral-border` | `#c1c1bd` |
| Light borders | `--ess-color-neutral-weak-border` | `#d7d7d4` |
| Success | `--ess-color-success-bg` | `#43a584` |
| Danger/error | `--ess-color-danger-bg` | `#bf1100` |
| Warning | `--ess-color-warning-bg` | `#f9e688` |
| Info | `--ess-color-blue-strong` | `#4790ff` |
| Checked controls | `--ess-color-bool-checked-bg` | `#43a584` |

---

## Quick Reference: Spacing Scale

All spacing is based on a **4px grid**:

| Token | Value | Common Use |
|-------|-------|------------|
| `--ess-spacing-100` | 4px | Tight gaps, icon padding |
| `--ess-spacing-200` | 8px | Button padding, small gaps |
| `--ess-spacing-300` | 12px | Input padding, card gaps |
| `--ess-spacing-400` | 16px | Section gaps, standard padding |
| `--ess-spacing-500` | 24px | Card padding, section spacing |
| `--ess-spacing-600` | 32px | Major section gaps |
| `--ess-spacing-700` | 40px | Page-level spacing |
| `--ess-spacing-800` | 48px | Large page sections |
