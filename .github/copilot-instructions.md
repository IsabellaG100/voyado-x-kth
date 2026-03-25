# Copilot Instructions — Voyado x KTH Workshop

## Project Overview

Monorepo for a Voyado x KTH Medieteknik workshop. Six teams of students each own a React app themed around Voyado's e-commerce/loyalty platform. All apps are static (no backend) — data comes from JSON files.

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Apps**: React + Vite + TypeScript (under `apps/`)
- **Shared code**: `packages/shared/` — shared types, utils, UI components
- **Data**: Static JSON files in each app's `data/` folder
- **CI/CD**: GitHub Actions → Azure Static Web Apps
- **Node**: See `.nvmrc` for version

## Repository Structure

```
apps/
  team-{n}-{name}/
    docs/          # Business requirements (markdown)
    data/          # Static JSON data files
    src/           # React application source
    public/        # Static assets
packages/
  shared/          # Shared types, utilities, components
```

## Commands

```bash
# Install dependencies (from repo root)
pnpm install

# Dev server for a specific app
pnpm --filter team-1-loyalty-dashboard dev

# Build all apps
pnpm -r build

# Build a specific app
pnpm --filter team-3-customer-segments build

# Lint all
pnpm -r lint

# Lint one app
pnpm --filter team-2-product-catalog lint

# Type check
pnpm -r typecheck
```

## Architecture

- Each app under `apps/` is an independent React SPA with its own Vite config, routes, and `data/` folder.
- Apps import shared types and components from `@voyado-kth/shared` via pnpm workspace protocol.
- No backend or API calls. Components read from local JSON files in `data/` using standard imports or fetch from the public directory.
- Each app is deployed independently as an Azure Static Web App.

## Conventions

- **Data layer**: Import JSON from the `data/` folder. Never hardcode data in components. If a component needs data, add or extend a JSON file in `data/` and import it.
- **Shared types**: All data model types live in `packages/shared/src/types/`. Apps should import from `@voyado-kth/shared` rather than defining their own types for shared concepts (e.g., `Customer`, `Product`, `LoyaltyTier`).
- **Component structure**: One component per file. Co-locate styles (CSS modules) and tests alongside the component file.
- **Branching strategy**: Create feature branches from `main` using the pattern `team-{n}/feature-description`. Open PRs back to `main`. CI runs on PR; deploy triggers on merge to `main`.
- **Requirements**: Each app's `docs/` folder contains the business requirements. Read these before implementing — they define what the app should do.

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Triggers on push/PR to `main`
2. Installs pnpm + dependencies
3. Builds all apps (`pnpm -r build`)
4. Deploys each app's `dist/` to its Azure Static Web App

## Team Apps

| App | Description |
|-----|-------------|
| `team-1-loyalty-dashboard` | Member overview, points balance, tier status |
| `team-2-product-catalog` | Product browsing, filters, wishlist |
| `team-3-customer-segments` | Segment builder, audience targeting rules |
| `team-4-campaign-builder` | Marketing campaign creation, templates |
| `team-5-rewards-store` | Points redemption, reward catalog |
| `team-6-analytics-overview` | KPI charts, engagement metrics |
