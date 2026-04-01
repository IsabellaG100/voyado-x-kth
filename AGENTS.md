# AGENTS.md

This file provides guidance to AI agents (Codex, etc.) when working with code in this repository.

## Agent Behavior

When a skill is invoked, you MUST:

1. **Read the entire skill** before starting. Understand every step.
2. **Execute every step in order.** Do not skip steps, even if they seem redundant.
3. **Complete all file writes the skill requires.** If a skill says to write to two files, write to both. Verify each write by reading the file back.
4. **Treat checklist items as mandatory.** If a skill contains a checklist, every item must be completed before moving on.
5. **Verify your work.** After writing a file, read it back and confirm the data is correct. If it's wrong, fix it immediately.

Do not take shortcuts. Do not assume a step is unnecessary. Every instruction in a skill exists for a reason.

## Onboarding Check

If `.onboarding.json` does not exist in the repo root, tell the user to run the `voyado-start` skill to get set up before proceeding with any other task.

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start shell dev server at localhost:3000
pnpm build                # Build all packages and apps
pnpm typecheck            # Type check all packages
pnpm lint                 # Lint all packages
```

## Architecture

This is a **pnpm workspace monorepo** for a Voyado x KTH workshop. No backend — all data is static JSON.

- **Shell** (`apps/shell/`) — Single Vite + React 19 app. Sidebar layout, routes, lazy-loads team modules.
- **Team modules** (`apps/team-{n}-*/`) — Workspace packages exporting page components from `src/index.ts`.
- **UI library** (`packages/ui/`, `@voyado-kth/ui`) — Shared components with Voyado Essence design tokens.
- **Shared types** (`packages/shared/`, `@voyado-kth/shared`) — Common TypeScript interfaces.

## Conventions

- **Data**: Import JSON from `data/` folder. Never hardcode data in components.
- **Types**: Import from `@voyado-kth/shared`. Never define local type duplicates.
- **UI**: Use `@voyado-kth/ui` components. Never build custom versions.
- **Styling**: CSS Modules (`.module.css`) + Essence design tokens (`var(--ess-*)`). No Tailwind.
- **Exports**: Each team module exports page components from `src/index.ts`.
- **Requirements**: Read `docs/` folder in each team module before implementing.

## Git Workflow

- Branch naming: `team-{n}/feature-description` (e.g., `team-1/add-kpi-cards`)
- Commit messages: Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`)
- PRs target `main`. Never commit directly to `main`.

## Skills

Skills are defined in `.agents/skills/voyado-*/SKILL.md`. Available skills:

| Skill | Purpose |
|-------|---------|
| `voyado-start` | Onboarding and workshop navigation |
| `voyado-status` | Show workshop progress |
| `voyado-prd` | Generate PRD from business requirements |
| `voyado-ux` | Generate UX design spec (optional) |
| `voyado-plan` | Create sprint plan with epics and stories |
| `voyado-impl` | Implement the next story from the backlog |
| `voyado-review` | Code review on implemented stories |

## Key References

- `docs/essence-knowledge-base.md` — Voyado Essence design system
- `docs/event-guide.md` — Workshop schedule and logistics
