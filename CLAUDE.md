# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start shell dev server at localhost:3000 (includes all team modules)
pnpm build                # Build all packages and apps
pnpm typecheck            # Type check all packages
pnpm lint                 # Lint all packages
pnpm clean                # Remove dist and node_modules across all packages

# Filter to specific package
pnpm --filter shell dev
pnpm --filter team-1-loyalty-dashboard typecheck
pnpm --filter @voyado-kth/ui typecheck
```

## Architecture

This is a **pnpm workspace monorepo** for a Voyado x KTH workshop. No backend — all data is static JSON.

- **Shell** (`apps/shell/`) — The single Vite + React 19 application. Provides an Engage-style sidebar layout via `ShellLayout.tsx`, defines routes in `App.tsx`, and lazy-loads each team module with `React.lazy()`.
- **Team modules** (`apps/team-{n}-*/`) — Workspace packages (not standalone apps). Each exports page components from `src/index.ts` that the shell imports. Data lives in `data/*.json`.
- **UI library** (`packages/ui/`, `@voyado-kth/ui`) — Shared components styled with Voyado Essence design tokens (CSS custom properties prefixed `--ess-*`). No Tailwind or external CSS frameworks.
- **Shared types** (`packages/shared/`, `@voyado-kth/shared`) — Common TypeScript interfaces (Customer, Product, LoyaltyTier, Campaign, Segment, Reward, Analytics).

### Routing

Routes defined in `apps/shell/src/App.tsx`. Each team module maps to a route:

| Route | Module |
|-------|--------|
| `/loyalty` | team-1-loyalty-dashboard |
| `/products` | team-2-product-catalog |
| `/segments` | team-3-customer-segments |
| `/campaigns` | team-4-campaign-builder |
| `/rewards` | team-5-rewards-store |
| `/analytics` | team-6-analytics-overview |

### Module loading flow

Shell `App.tsx` → `React.lazy(() => import('@voyado-kth/team-{n}-*'))` → team module `src/index.ts` exports → rendered inside `ShellLayout` `<Outlet>`.

If a team module's export name changes, `App.tsx` must be updated to match.

## Conventions

- **Data**: Import JSON from `data/` folder. Never hardcode data in components.
- **Types**: Shared data model types live in `packages/shared/src/types/`. Import from `@voyado-kth/shared`.
- **UI**: Use `@voyado-kth/ui` components instead of building custom versions.
- **Styling**: CSS Modules (`.module.css`) + Essence design tokens. Tokens defined in `packages/ui/src/tokens/essence-tokens.css`.
- **Component structure**: One component per file. Co-locate styles and tests alongside the component.
- **Module exports**: Each team module must export page components from `src/index.ts`.
- **Requirements**: Each team module's `docs/` folder contains business requirements — read before implementing.

## Git Workflow

- Branch naming: `team-{n}/feature-description` (e.g., `team-1/add-kpi-cards`)
- Commit messages: Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`)
- PRs target `main`. CI runs typecheck + build on PR; deploy to Azure Static Web Apps on merge.
- Never commit directly to `main`.

## Onboarding Check

If `.onboarding.json` does not exist in the repo root, tell the user to run `/voyado:start` to get set up before proceeding with any other task.

## Key References

- `docs/essence-knowledge-base.md` — Voyado Essence design system (tokens, component styling)
- `docs/event-guide.md` — Workshop schedule and logistics
- Node version: see `.nvmrc` (>=22), pnpm >=9
