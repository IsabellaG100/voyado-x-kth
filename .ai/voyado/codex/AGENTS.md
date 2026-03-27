# Voyado Workshop Workflow — Codex / OpenAI Agent Instructions

This document defines the AI-driven SDLC workflow for the Voyado x KTH workshop. When assisting students, follow these steps in order.

## Setup

Before any workflow action:
1. Check `.onboarding.json` exists in repo root (team identity). If missing, tell the student: "Run `/voyado:start` to get set up."
2. Check `git status` — stop if uncommitted changes exist
3. Read `workshop.json` to get team progress

## Workflow Steps

### 1. Create PRD
**When:** `workshop.json` progress `requirements` = `"pending"`
**Input:** `apps/<team-module>/docs/requirements.md`
**Output:** `apps/<team-module>/docs/prd.md`
**Action:** Analyze BRD → extract FRs (with user stories, acceptance criteria, data sources, UI components) and NFRs → write PRD → update workshop.json `requirements` to `"completed"`

### 2. UX Design (Optional)
**When:** PRD exists, student requests it
**Input:** `docs/prd.md` + `docs/essence-knowledge-base.md`
**Output:** `apps/<team-module>/docs/ux-spec.md`
**Action:** Design layout, colors, typography using Essence tokens (`var(--ess-*)`) → does NOT update workshop.json steps

### 3. Sprint Planning
**When:** `workshop.json` progress `breakdown` = `"pending"` AND `requirements` = `"completed"`
**Input:** `docs/prd.md`
**Output:** `apps/<team-module>/docs/backlog.json` + `docs/epics.md`
**Action:** Break PRD into epics/stories → each story has acceptance criteria, file paths, data sources, UI components, complexity → update workshop.json `breakdown` to `"completed"`

### 4. Implementation
**When:** `backlog.json` exists with stories in `"backlog"` status
**Story flow:** `backlog` → `in_progress` → `review` → `done`
**Action:** Pick first `"backlog"` story → implement following conventions → typecheck → set to `"review"` → suggest next story or review

### 5. Code Review
**When:** Stories with `status: "review"` in `backlog.json`
**Action:** Review against acceptance criteria + conventions → auto-fix trivial issues → approve or request changes → set approved stories to `"done"`

### 6. Commit & Push
**When:** After code review approval
**Action:** Student must manually commit and push. Instruct them to run git add/commit/push and create a PR.

## Conventions
- CSS Modules + Essence design tokens only (`var(--ess-*)`)
- Data from `data/` JSON files, never hardcoded
- Types from `@voyado-kth/shared`
- UI components from `@voyado-kth/ui`
- One component per file, co-located `.module.css` styles
- Page components exported from `src/index.ts`
- Branch pattern: `team-{n}/feature-description`

## backlog.json Schema
```json
{
  "teamId": "team-N",
  "createdAt": "ISO",
  "epics": [{
    "id": "E1",
    "title": "...",
    "stories": [{
      "id": "S1.1",
      "title": "...",
      "description": "...",
      "acceptanceCriteria": ["..."],
      "files": ["src/..."],
      "dataSources": ["data/..."],
      "uiComponents": ["Card"],
      "complexity": "S|M|L",
      "status": "backlog|in_progress|review|done"
    }]
  }]
}
```
