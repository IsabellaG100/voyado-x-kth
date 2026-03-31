---
name: voyado-status
description: "Shows detailed workshop progress for the current team. Use when a student asks about their status, progress, or wants to see how far they are."
---

# Voyado Workshop Status

Display a comprehensive status report for the current team's workshop progress.

## Workspace Scope

All file operations MUST be limited to the team's app directory as determined by `.onboarding.json` `teamId` (e.g., `team-5` → `apps/team-5-rewards-store/`). You may READ (but not write) shared resources: `packages/`, `docs/`, `workshop.json`, `.onboarding.json`, `CLAUDE.md`. Never modify files outside the team's app folder.

## Response Formatting

Always produce clean, human-friendly, well-formatted output. Use headings, tables, bullet lists, and visual separators to make responses easy to scan. Avoid walls of text.

## Steps

1. **Read `.onboarding.json`** from the repo root to identify the team. If missing, stop: "You haven't onboarded yet. Use the voyado-start skill to get set up."

2. **Read `workshop.json`** to get the team's progress data.

3. **Check for generated artifacts** — look for these files in the team's app directory (`apps/<team-module>/docs/`):
   - `prd.md` — Product Requirements Document
   - `ux-spec.md` — UX Design Specification (optional)
   - `backlog.json` — Epics and stories

4. **If `backlog.json` exists**, parse it and calculate:
   - Total stories count
   - Stories by status: `backlog`, `in_progress`, `review`, `done`
   - Current epic being worked on

5. **Check git state**:
   - Run `git status --porcelain` for uncommitted changes
   - Run `git branch --show-current` for current branch
   - Run `git log --oneline -5` for recent commits

6. **Present the full status report**:

```
## Workshop Status: [Team Name] ([Nickname])

### Workflow Progress
| Step | Status |
|------|--------|
| Onboarding | [completed/pending/in-progress] |
| Requirements (PRD) | [completed/pending/in-progress] |
| Breakdown (Planning) | [completed/pending/in-progress] |
| Implementation | [completed/pending/in-progress] |
| Pull Request | [completed/pending/in-progress] |
| Code Review | [completed/pending/in-progress] |
| Merge | [completed/pending/in-progress] |
| Deployed | [completed/pending/in-progress] |

### Artifacts
- PRD: [exists/missing]
- UX Spec: [exists/missing] (optional)
- Backlog: [exists/missing]

### Story Progress (if backlog exists)
| Epic | Story | Status |
|------|-------|--------|
| E1: ... | S1.1: ... | backlog |
| E1: ... | S1.2: ... | done |

**Summary:** X/Y stories completed

### Git State
- Branch: [branch name]
- Uncommitted changes: [yes/no]
- Recent commits: [list]

### Next Action
[Recommendation based on current state]
```

## Rendering Status Icons

Use these markers for status display:
- `completed` → "completed"
- `in-progress` → "in progress"
- `pending` → "pending"
- `skipped` → "skipped"
