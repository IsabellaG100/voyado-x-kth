# Voyado x KTH Medieteknik Workshop

Workshop monorepo where **6 teams** of KTH Medieteknik students build modules for a simulated [Voyado Engage](https://www.voyado.com/) platform. All modules are rendered inside a shared shell application with an Engage-style sidebar layout — no backend required, all data comes from static JSON files.

## Quick Start

```bash
# Clone the repo
git clone <repo-url>
cd voyado-x-kth

# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Open http://localhost:3000
```

> **Prerequisites:** Node.js ≥ 22 (see `.nvmrc`) and pnpm ≥ 9

## Project Structure

```
voyado-x-kth/
├── apps/
│   ├── shell/                        # Main entry point (Vite + React), Engage-style sidebar layout
│   ├── team-1-loyalty-dashboard/     # Team 1 module — Loyalty Dashboard
│   ├── team-2-product-catalog/       # Team 2 module — Product Catalog
│   ├── team-3-customer-segments/     # Team 3 module — Customer Segments
│   ├── team-4-campaign-builder/      # Team 4 module — Campaign Builder
│   ├── team-5-rewards-store/         # Team 5 module — Rewards Store
│   └── team-6-analytics-overview/    # Team 6 module — Analytics Overview
├── packages/
│   ├── ui/                           # Shared React component library (Essence design tokens)
│   └── shared/                       # Shared TypeScript types
├── docs/
│   ├── event-guide.md                # Workshop event guide
│   └── essence-knowledge-base.md     # Essence design system knowledge base
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

### How it works

The **shell** (`apps/shell`) is the single Vite application that runs the dev server. It provides the sidebar navigation and page layout. Each **team module** (`apps/team-{n}-*`) is a workspace package that exports page components from `src/index.ts`. The shell lazy-loads these components and renders them at their respective routes.

## Team Apps

| Team | App Name | Route | Description |
|------|----------|-------|-------------|
| 1 | `team-1-loyalty-dashboard` | `/loyalty` | Member overview, points balance, tier status |
| 2 | `team-2-product-catalog` | `/products` | Product browsing, filters, wishlist |
| 3 | `team-3-customer-segments` | `/segments` | Segment builder, audience targeting rules |
| 4 | `team-4-campaign-builder` | `/campaigns` | Marketing campaign creation, templates |
| 5 | `team-5-rewards-store` | `/rewards` | Points redemption, reward catalog |
| 6 | `team-6-analytics-overview` | `/analytics` | KPI charts, engagement metrics |

## Commands

```bash
pnpm dev                                         # Start shell dev server (all team modules included)
pnpm build                                       # Build everything
pnpm typecheck                                   # Type check all packages (runs pnpm -r typecheck)
pnpm lint                                        # Lint all packages

pnpm --filter team-1-loyalty-dashboard typecheck  # Type check a specific team package
pnpm --filter @voyado-kth/ui typecheck            # Type check the UI library
```

## For Workshop Participants

1. **Read your team's requirements** in `apps/team-{n}-*/docs/`
2. **Create a feature branch:** `git checkout -b team-{n}/feature-name`
3. **Run the dev server:** `pnpm dev`
4. **Your module loads at:** `http://localhost:3000/{route}` (see route table above)
5. **Use the JSON data** in your team app's `data/` folder — import it in your components
6. **Use shared components** from `@voyado-kth/ui` (Button, Card, KpiCard, Badge, Tabs, and more)
7. **Use shared types** from `@voyado-kth/shared`
8. **When ready,** push your branch and create a Pull Request targeting `main`

### Example: importing shared components

```tsx
import { Card, KpiCard, Badge, Button } from '@voyado-kth/ui';
import type { Customer } from '@voyado-kth/shared';
import customers from '../data/customers.json';
```

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Dev server & build tool |
| [pnpm workspaces](https://pnpm.io/workspaces) | Monorepo management |
| [React Router](https://reactrouter.com/) | Client-side routing |
| CSS Modules | Scoped component styling |
| [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static) | Hosting & CI/CD |

## Documentation

- [`docs/event-guide.md`](docs/event-guide.md) — Workshop schedule and logistics
- [`docs/essence-knowledge-base.md`](docs/essence-knowledge-base.md) — Voyado Essence design system reference
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — Branching strategy, commit conventions, and workflow

## License

This project is for educational workshop purposes only.
