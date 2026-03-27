# Voyado Workshop Workflow — Copilot Instructions

This document defines the AI-driven SDLC workflow for the Voyado x KTH workshop. Follow these steps in order when assisting students.

## Workflow Overview

```
Onboarding → PRD → (optional: UX Design) → Planning → Implementation → Code Review → Commit/Push → PR
```

## Pre-flight Check (EVERY interaction)

Before performing any workflow action:

1. **Check `.onboarding.json`** exists in the repo root. If missing, tell the student: "You haven't onboarded yet. Run `/voyado:start` to get set up."
2. **Check `git status`** — if there are uncommitted changes, STOP and ask the student to commit and push before proceeding.
3. **Read `workshop.json`** to determine the team's current progress.

## Step 1: Create PRD (`requirements` step)

**Prerequisite:** Onboarding completed
**Input:** `apps/<team-module>/docs/requirements.md` (the BRD)
**Output:** `apps/<team-module>/docs/prd.md`

Analyze the Business Requirements Document and produce a Product Requirements Document:
- Extract Functional Requirements (FRs) with user stories and acceptance criteria
- Define Non-Functional Requirements (NFRs): responsive layout, Essence tokens only, type safety, accessibility
- Map data sources (JSON files) to features
- Map UI components from `@voyado-kth/ui`
- Define MVP scope based on BRD priorities

After creating the PRD, update `workshop.json`: set `requirements` to `"completed"`, `currentStep` to `"breakdown"`.

## Step 2: UX Design (OPTIONAL — `design` is not a tracked step)

**Prerequisite:** PRD exists
**Input:** `docs/prd.md` + `docs/essence-knowledge-base.md`
**Output:** `apps/<team-module>/docs/ux-spec.md`

Generate UX design guidelines using Voyado Essence design tokens:
- Layout structure and content hierarchy
- Color palette mapped to `var(--ess-color-*)` tokens
- Typography scale mapped to `var(--ess-font-*)` tokens
- Spacing using `var(--ess-spacing-*)` tokens
- Component specifications per feature
- Interaction and accessibility patterns

This step does NOT update workshop.json step status (it's optional).

## Step 3: Sprint Planning (`breakdown` step)

**Prerequisite:** PRD exists (UX spec is optional)
**Input:** `docs/prd.md` (+ `docs/ux-spec.md` if exists)
**Output:** `apps/<team-module>/docs/backlog.json` + `apps/<team-module>/docs/epics.md`

Break the PRD into epics and stories:
- Group features into epics
- Each story: 10-15 min implementation scope
- Include: acceptance criteria, file paths, data sources, UI components, complexity (S/M/L)
- Order: setup first → MVP features → nice-to-have
- All stories start with status `"backlog"`

`backlog.json` structure:
```json
{
  "teamId": "team-N",
  "createdAt": "ISO",
  "epics": [{
    "id": "E1", "title": "...", "stories": [{
      "id": "S1.1", "title": "...", "status": "backlog",
      "description": "...", "acceptanceCriteria": [...],
      "files": [...], "dataSources": [...], "uiComponents": [...], "complexity": "S"
    }]
  }]
}
```

After creating backlog, update `workshop.json`: set `breakdown` to `"completed"`, `currentStep` to `"implementation"`.

## Step 4: Implementation (`implementation` step)

**Prerequisite:** `backlog.json` exists
**Story status flow:** `backlog` → `in_progress` → `review` → `done`

For each implementation cycle:
1. Find first story with `status: "backlog"` (or a specific story if requested)
2. Set story status to `"in_progress"` in `backlog.json`
3. Implement following project conventions:
   - CSS Modules + Essence tokens (no raw CSS values)
   - Import data from `data/` folder
   - Use `@voyado-kth/ui` components
   - Use `@voyado-kth/shared` types
   - One component per file
4. Run typecheck: `pnpm --filter <package> typecheck`
5. Set story status to `"review"` in `backlog.json`
6. Suggest: implement another story or run code review

Update `workshop.json`: set `implementation` to `"in-progress"`, `currentStep` to `"implementation"`.

## Step 5: Code Review (`review` step)

**Prerequisite:** Stories with `status: "review"` in `backlog.json`

Review all stories in `review` status against:
- Acceptance criteria met?
- Data imported from JSON (not hardcoded)?
- @voyado-kth/shared types used?
- @voyado-kth/ui components used?
- CSS Modules with Essence tokens only?
- One component per file?
- Exports match shell's App.tsx?
- No console.logs, unused imports, type errors?

Auto-fix trivial issues. For blocking issues, explain and request fixes.
When approved, set story status to `"done"`.

When all stories are done, update `workshop.json`: set `implementation` and `review` to `"completed"`, `currentStep` to `"pull-request"`.

Then instruct the student:
```
git add .
git commit -m "feat: implement <module name>"
git push -u origin <branch-name>
```

## Project Conventions Reference

- **Styling:** CSS Modules (`.module.css`) + Essence tokens (`var(--ess-*)`) only
- **Data:** Import from `data/` folder, never hardcode
- **Types:** `@voyado-kth/shared` for data model types
- **UI:** `@voyado-kth/ui` for components (Button, Card, KpiCard, Badge, Chip, Tabs, etc.)
- **Structure:** One component per file, co-located styles
- **Exports:** Page components from `src/index.ts`
- **Branching:** `team-{n}/feature-description` pattern
- **Commits:** Conventional commits (`feat:`, `fix:`, `style:`, `refactor:`)
