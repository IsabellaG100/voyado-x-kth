# Copilot Instructions — Voyado x KTH Workshop

## ⚠️ Onboarding Check (Do This First)

Before doing anything else, check if `.onboarding.json` exists in the repository root directory. If it does **not** exist, the team has not been onboarded yet. In that case:

1. Tell the student: "You haven't onboarded yet. Run `/voyado:start` to get set up."
2. Do not proceed with any other task until onboarding is complete

If `.onboarding.json` exists, the team is onboarded — proceed normally.

## Project Overview

Monorepo for a Voyado x KTH Medieteknik workshop. A shell app (Vite + React) serves as the single entry point with an Engage-style sidebar layout. Six teams each own a module package that exports page components, which the shell lazy-loads at dedicated routes. All modules are static (no backend) — data comes from JSON files.

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Shell app**: `apps/shell/` — Vite + React + React Router, Engage-style sidebar layout
- **Team modules**: `apps/team-{n}-*/` — workspace packages exporting React page components
- **UI library**: `packages/ui/` — shared component library (`@voyado-kth/ui`) with Essence design tokens
- **Shared types**: `packages/shared/` — shared TypeScript types (`@voyado-kth/shared`)
- **Data**: Static JSON files in each team module's `data/` folder
- **CI/CD**: GitHub Actions → Azure Static Web Apps
- **Node**: See `.nvmrc` for version (≥ 22)

## Repository Structure

```
apps/
  shell/               # Main Vite entry point — sidebar layout, routing, lazy-loads team modules
  team-{n}-{name}/
    docs/              # Business requirements (markdown)
    data/              # Static JSON data files
    src/
      index.ts         # Exports page components for the shell to consume
      pages/           # Page-level React components
      components/      # Module-specific reusable components
packages/
  ui/                  # Shared component library (@voyado-kth/ui) — Essence design tokens
  shared/              # Shared TypeScript types (@voyado-kth/shared)
docs/                  # Event guide and Essence knowledge base
```

## Commands

```bash
# Install dependencies (from repo root)
pnpm install

# Start the shell dev server (includes all team modules)
pnpm dev

# Build all packages
pnpm build

# Type check all packages
pnpm typecheck

# Type check a specific team module
pnpm --filter team-1-loyalty-dashboard typecheck

# Type check the UI library
pnpm --filter @voyado-kth/ui typecheck

# Lint all
pnpm lint
```

## Architecture

- The **shell** (`apps/shell`) is the single Vite application. It provides the Engage-style sidebar layout, React Router routing, and lazy-loads each team module at its dedicated route.
- Each **team module** (`apps/team-{n}-*`) is a workspace package (not a standalone Vite app). It exports page components from `src/index.ts`, which the shell imports and renders via `React.lazy()`.
- Team module routes: `/loyalty`, `/products`, `/segments`, `/campaigns`, `/rewards`, `/analytics`.
- The **UI library** (`packages/ui`, published as `@voyado-kth/ui`) provides shared React components styled with Voyado's Essence design tokens: Button, Card, Badge, Chip, KpiCard, Alert, Tabs, Input, Select, Toggle, Dialog, Tooltip, PageHeader, Skeleton, Loader, StateBadge, Flex, Grid.
- **Shared types** (`packages/shared`, published as `@voyado-kth/shared`) provide common TypeScript interfaces (Customer, Product, LoyaltyTier, etc.).
- No backend or API calls. Components read from local JSON files in `data/` using standard imports.
- The entire monorepo is deployed as a single Azure Static Web App.

## Conventions

- **Data layer**: Import JSON from the `data/` folder. Never hardcode data in components. If a component needs data, add or extend a JSON file in `data/` and import it.
- **Shared types**: All data model types live in `packages/shared/src/types/`. Team modules should import from `@voyado-kth/shared` rather than defining their own types for shared concepts (e.g., `Customer`, `Product`, `LoyaltyTier`).
- **UI components**: Use components from `@voyado-kth/ui` (Button, Card, KpiCard, Badge, Tabs, etc.) instead of building custom versions. These are styled with Essence design tokens.
- **Module exports**: Each team module must export its page components from `src/index.ts`. The shell lazy-loads these exports — if the export name changes, update the shell's `App.tsx` accordingly.
- **Component structure**: One component per file. Co-locate styles (CSS modules) and tests alongside the component file.
- **Branching strategy**: Create feature branches from `main` using the pattern `team-{n}/feature-description`. Open PRs back to `main`. CI runs on PR; deploy triggers on merge to `main`.
- **Requirements**: Each team module's `docs/` folder contains the business requirements. Read these before implementing — they define what the module should do.

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Triggers on push/PR to `main`
2. Installs pnpm + dependencies
3. Builds the shell app and all packages (`pnpm build`)
4. Deploys the shell's `dist/` to Azure Static Web App

## Team Apps

| App | Route | Description |
|-----|-------|-------------|
| `team-1-loyalty-dashboard` | `/loyalty` | Member overview, points balance, tier status |
| `team-2-product-catalog` | `/products` | Product browsing, filters, wishlist |
| `team-3-customer-segments` | `/segments` | Segment builder, audience targeting rules |
| `team-4-campaign-builder` | `/campaigns` | Marketing campaign creation, templates |
| `team-5-rewards-store` | `/rewards` | Points redemption, reward catalog |
| `team-6-analytics-overview` | `/analytics` | KPI charts, engagement metrics |

## AI-Driven SDLC Workflow

This workshop follows a structured AI-assisted development workflow. Detailed instructions for each step are in `.github/instructions/voyado-*.instructions.md` files. The consolidated workflow reference is in `.agents/voyado/copilot/workflow-instructions.md`.

**Workflow:**
```
Onboarding → PRD → (optional: UX Design) → Planning → Implementation → Code Review → Commit/Push → PR
```

**Available commands** (students can say these or use natural language):

| Action | What to say | Instruction file |
|--------|------------|------------------|
| Onboard & navigate | "voyado start" or "start workshop" | `voyado-start.instructions.md` |
| Check progress | "voyado status" or "show progress" | `voyado-status.instructions.md` |
| Create PRD | "voyado prd" or "create PRD" | `voyado-prd.instructions.md` |
| UX design (optional) | "voyado ux" or "create UX design" | `voyado-ux.instructions.md` |
| Sprint planning | "voyado plan" or "create plan" | `voyado-plan.instructions.md` |
| Implement story | "voyado impl" or "implement next story" | `voyado-impl.instructions.md` |
| Code review | "voyado review" or "review code" | `voyado-review.instructions.md` |

**Story status flow:** `backlog` → `in_progress` → `review` → `done`

Track progress in `workshop.json` (team progress object) and `docs/backlog.json` (story statuses).
