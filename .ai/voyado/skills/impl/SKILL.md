---
description: "Implements the next story from the backlog. Use when a student runs /voyado:impl or is ready to start coding a feature."
argument-hint: "[story-id]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent"]
---

# Voyado Story Implementer

Pick up the next story from the backlog and implement it.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Run `/voyado:start` to get set up."

2. **Read `workshop.json`** to check progress:
   - If `breakdown` is not `completed`, STOP: "You need a sprint plan first. Run `/voyado:plan`."

3. **Check git status** (`git status --porcelain`). If there are uncommitted changes, STOP:
   > You have uncommitted changes. Please commit and push before starting a new story:
   > ```
   > git add .
   > git commit -m "feat: <describe changes>"
   > git push
   > ```
   > After committing, run `/voyado:impl` again.

## Story Selection

4. **Read `backlog.json`** from `apps/<team-module>/docs/backlog.json`.

5. **Select the story to implement:**
   - If a `story-id` argument was provided (e.g., `S1.2`), find that specific story
   - If no argument, find the first story with `status: "backlog"` (in epic order, then story order)
   - If a story has `status: "in_progress"`, ask the student if they want to continue that story or pick a new one
   - If all stories are `done`, congratulate and suggest running `/voyado:review` if any stories are in `review` status, or moving to PR creation

6. **Update the story status** to `"in_progress"` in `backlog.json`.

7. **Update `workshop.json`**:
   - Set `progress.steps.implementation` to `"in-progress"` (if not already)
   - Set `progress.currentStep` to `"implementation"`
   - Set `progress.lastActivity` to current ISO timestamp

## Implementation

8. **Gather full context** before coding:
   - Read the PRD (`docs/prd.md`)
   - Read UX spec if it exists (`docs/ux-spec.md`)
   - Read the story's details from `backlog.json`
   - Read existing source code in the team's `src/` directory
   - Read relevant data files referenced by the story
   - Read the Essence knowledge base (`docs/essence-knowledge-base.md`) for styling
   - Read available UI components from `packages/ui/src/index.ts`
   - Read shared types from `packages/shared/src/index.ts`

9. **Spawn the `story-implementer` agent** with:
   - The story details (description, acceptance criteria, files to create/modify)
   - All context gathered above
   - The team's existing code (to maintain consistency)
   - Project conventions from CLAUDE.md

   The agent must:
   - Create/modify only the files specified in the story
   - Use `@voyado-kth/ui` components — never build custom versions
   - Use `@voyado-kth/shared` types for data
   - Use CSS Modules with Essence design tokens for styling
   - Import data from the `data/` folder, never hardcode
   - Export page components from `src/index.ts`
   - Follow one-component-per-file convention
   - Ensure the module's export in `src/index.ts` matches what `apps/shell/src/App.tsx` imports

10. **After implementation**, update the story status to `"review"` in `backlog.json`.

11. **Run a quick type check** on the team's module:
    ```
    pnpm --filter <package-name> typecheck
    ```
    If it fails, fix the type errors before marking complete.

12. **Present the result**:
    - What was implemented
    - Files created/modified
    - Any issues encountered
    - Next action options:
      - `/voyado:impl` — implement the next story
      - `/voyado:review` — review your implemented code
      - Commit and push when ready

    > **Reminder:** You can keep implementing more stories with `/voyado:impl`, or run `/voyado:review` to review your code. When you're ready, commit and push your changes:
    > ```
    > git add .
    > git commit -m "feat: <describe what you built>"
    > git push
    > ```

## Important Notes

- One story at a time — complete it before moving to the next
- Always check types compile before marking a story complete
- If the first story involves page setup, make sure to update `src/index.ts` exports
- When updating `src/index.ts`, ensure the export name matches what the shell's `App.tsx` expects
- Keep implementations practical for the workshop timeframe
- Story status flow: `backlog` → `in_progress` → `review` → `done`
