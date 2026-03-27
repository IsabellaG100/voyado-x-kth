---
description: "Creates a sprint plan with epics and stories from the PRD. Use when a student runs /voyado:plan or needs to break down requirements into implementable tasks."
argument-hint: ""
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent"]
---

# Voyado Sprint Planner

Break down the PRD into epics and implementable user stories with a structured backlog.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Run `/voyado:start` to get set up."

2. **Read `workshop.json`** to check progress:
   - If `requirements` is not `completed`, STOP: "You need a PRD first. Run `/voyado:prd`."
   - If `breakdown` is already `completed`, inform the student and ask if they want to re-plan.
   - UX spec is NOT required — it's optional.

3. **Check git status** (`git status --porcelain`). If dirty, STOP and ask to commit/push.

## Execution

4. **Read the PRD** at `apps/<team-module>/docs/prd.md`.

5. **Optionally read UX spec** at `apps/<team-module>/docs/ux-spec.md` if it exists — use it to inform story details.

6. **Read the team's data files** to understand available data shapes.

7. **Read existing source code** in `apps/<team-module>/src/` to understand current state (likely just a `ComingSoon` placeholder).

8. **Read the project conventions** — CLAUDE.md and CONTRIBUTING.md for coding standards.

9. **Spawn the `sprint-planner` agent** with all context. The agent produces:

   ### Epics & Stories Structure

   Group features from the PRD into epics. Each epic contains stories. Stories should be small enough to implement in 10-15 minutes each.

   **Epic naming:** `E{N}: [Epic Title]`
   **Story naming:** `S{epic}.{story}: [Story Title]`

   Each story must include:
   - Clear title
   - Description of what to build
   - Acceptance criteria (checkboxes)
   - Files to create/modify
   - Data sources to use
   - UI components to use
   - Estimated complexity (S/M/L)

   ### Ordering Rules
   - Infrastructure stories first (types, data loading, page setup)
   - MVP features next (as defined in PRD)
   - Nice-to-have features last
   - Within an epic, order by dependency (foundational → visual → interactive)

10. **Write the backlog** to `apps/<team-module>/docs/backlog.json`:

    ```json
    {
      "teamId": "team-N",
      "createdAt": "ISO timestamp",
      "prdVersion": "1.0",
      "epics": [
        {
          "id": "E1",
          "title": "Epic title",
          "description": "What this epic delivers",
          "stories": [
            {
              "id": "S1.1",
              "title": "Story title",
              "description": "Detailed description of what to implement",
              "acceptanceCriteria": [
                "Criterion 1",
                "Criterion 2"
              ],
              "files": ["src/pages/SomePage.tsx", "src/components/SomeComponent.tsx"],
              "dataSources": ["data/some-data.json"],
              "uiComponents": ["Card", "Badge"],
              "complexity": "S",
              "status": "backlog"
            }
          ]
        }
      ]
    }
    ```

11. **Also write a human-readable version** to `apps/<team-module>/docs/epics.md`:

    ```markdown
    # Sprint Plan: [Module Title]

    ## Epic 1: [Title]
    [Description]

    ### S1.1: [Story Title] [S]
    [Description]
    **Acceptance Criteria:**
    - [ ] Criterion 1
    - [ ] Criterion 2
    **Files:** `src/pages/Page.tsx`, `src/components/Component.tsx`
    **Data:** `data/file.json`
    **Components:** Card, Badge

    ...
    ```

12. **Update `workshop.json`**:
    - Set `progress.steps.breakdown` to `"completed"`
    - Set `progress.currentStep` to `"implementation"`
    - Set `progress.lastActivity` to current ISO timestamp

13. **Present the result**:
    - Total epics and stories created
    - MVP stories highlighted
    - Estimated workflow: "You have X stories. Start implementing with `/voyado:impl`."
    - Remind them stories will be picked up in order

## Important Notes

- Stories should be SMALL — each implementable in 10-15 minutes
- First story should always be project setup/scaffolding
- Always include file paths relative to the team's app directory
- Reference actual @voyado-kth/ui components and @voyado-kth/shared types
- All stories start with status `"backlog"`
