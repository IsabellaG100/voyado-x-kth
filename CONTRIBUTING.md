# Contributing — Voyado x KTH Workshop

Welcome! This guide covers the branching strategy, workflow, and conventions for the workshop. Follow these steps to collaborate smoothly across all six teams.

## Branching Strategy

- **`main`** is the production branch — **never commit directly to `main`**
- Create feature branches using the naming pattern: **`team-{n}/feature-description`**
- Use lowercase, hyphen-separated descriptions

### Branch name examples

```
team-1/add-kpi-cards
team-2/product-filter-ui
team-3/segment-builder-ui
team-4/campaign-template-list
team-5/reward-catalog-grid
team-6/engagement-chart
```

## Workflow

```bash
# 1. Start from an up-to-date main
git checkout main && git pull

# 2. Create your feature branch
git checkout -b team-{n}/feature-name

# 3. Make changes and commit (see commit message conventions below)
git add .
git commit -m "feat: add loyalty tier chart"

# 4. Push your branch
git push -u origin team-{n}/feature-name

# 5. Open a Pull Request on GitHub targeting `main`
```

6. A mentor reviews and approves your PR
7. Merge → CI builds → Deployed automatically to Azure Static Web Apps

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>
```

### Types

| Type | When to use |
|------|------------|
| `feat` | Adding a new feature or component |
| `fix` | Fixing a bug |
| `style` | Visual/CSS changes (no logic changes) |
| `refactor` | Restructuring code without changing behavior |
| `docs` | Documentation updates |
| `chore` | Config, dependencies, tooling |

### Examples

```
feat: add loyalty tier chart
feat: implement product filter sidebar
fix: correct points calculation for gold tier
style: update card spacing and border radius
refactor: extract customer list into separate component
docs: add usage examples to README
```

## Code Organization

Each team app follows this structure:

```
apps/team-{n}-*/
├── data/              # Static JSON data files
│   ├── customers.json
│   └── ...
├── docs/              # Business requirements
├── src/
│   ├── index.ts       # Exports page components (entry point for the shell)
│   ├── pages/         # Page-level components (routed by the shell)
│   └── components/    # Reusable components specific to your module
└── tsconfig.json
```

### Guidelines

- **Pages** go in `src/pages/` — these are the top-level components rendered at your route
- **Reusable components** go in `src/components/`
- **Import data** from the `data/` folder — never hardcode data in components
- **Import shared types** from `@voyado-kth/shared`
- **Import UI components** from `@voyado-kth/ui`
- **Export page components** from `src/index.ts` so the shell can lazy-load them

### Example: exporting from your module

```ts
// src/index.ts
export { LoyaltyDashboardPage } from './pages/LoyaltyDashboardPage';
```

### Example: using shared packages

```tsx
import { Card, KpiCard, Badge, Tabs } from '@voyado-kth/ui';
import type { Customer, LoyaltyTier } from '@voyado-kth/shared';
import customers from '../data/customers.json';
```

## Available UI Components

The `@voyado-kth/ui` package provides these ready-to-use components styled with Voyado's Essence design tokens:

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, and ghost button variants |
| `Card` | Content container with optional header |
| `Badge` | Status labels and counters |
| `Chip` | Filterable tag elements |
| `KpiCard` | Key performance indicator display with trend |
| `Alert` | Info, success, warning, and error messages |
| `Tabs` | Tab navigation for content sections |
| `Input` | Text input field |
| `Select` | Dropdown select |
| `Toggle` | On/off toggle switch |
| `Dialog` | Modal dialog |
| `Tooltip` | Hover tooltip |
| `PageHeader` | Page title with optional actions |
| `Skeleton` | Loading placeholder |
| `Loader` | Spinner/loading indicator |
| `StateBadge` | Status indicator badge |
| `Flex` | Flexbox layout helper |
| `Grid` | CSS Grid layout helper |

## Getting Help

- **Ask your team mentor** — they're here to help unblock you
- **Use AI tools** (GitHub Copilot, ChatGPT, Claude) for implementation help
- **Check the docs:**
  - [`docs/essence-knowledge-base.md`](docs/essence-knowledge-base.md) — Component styling guidance and design tokens
  - [`docs/event-guide.md`](docs/event-guide.md) — Workshop schedule and logistics
- **Look at other team apps** for patterns and examples

## Pull Request Checklist

Before opening a PR, make sure:

- [ ] Your code builds without errors (`pnpm build`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Your module renders correctly at its route
- [ ] You're exporting page components from `src/index.ts`
- [ ] No hardcoded data — all data comes from JSON files in `data/`
- [ ] Commit messages follow the conventional commits format
