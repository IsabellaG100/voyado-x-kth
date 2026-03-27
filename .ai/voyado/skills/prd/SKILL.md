---
description: "Creates a Product Requirements Document (PRD) from the team's Business Requirements Document (BRD). Use when a student runs /voyado:prd or needs to analyze requirements and extract functional/non-functional requirements."
argument-hint: ""
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent"]
---

# Voyado PRD Generator

Analyze the team's Business Requirements Document (BRD) and produce a structured Product Requirements Document (PRD) with functional and non-functional requirements.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Run `/voyado:start` to get set up."

2. **Read `workshop.json`** to check the team's progress:
   - If `onboarding` is not `completed`, stop: "Complete onboarding first."
   - If `requirements` is already `completed`, inform the student and ask if they want to regenerate the PRD.

3. **Check git status** (`git status --porcelain`). If there are uncommitted changes, STOP:
   > You have uncommitted changes. Please commit and push before running this command.

## Execution

4. **Identify the team's app directory** from `.onboarding.json` `teamId` (e.g., `team-1` → `apps/team-1-loyalty-dashboard/`). Find it by matching the team ID pattern in the `apps/` directory.

5. **Read the BRD** at `apps/<team-module>/docs/requirements.md`. This is the business requirements document.

6. **Read shared types** from `packages/shared/src/types/` to understand available data models.

7. **Read available UI components** — scan `packages/ui/src/index.ts` to know what components exist.

8. **Read the team's data files** in `apps/<team-module>/data/` to understand available data.

9. **Spawn the `prd-writer` agent** with all gathered context to generate the PRD. The agent should produce a comprehensive PRD that includes:

   ### PRD Structure
   ```markdown
   # Product Requirements Document: [Module Title]

   ## 1. Overview
   Brief description of the module and its purpose.

   ## 2. User Persona
   Who is the primary user? (from BRD)

   ## 3. Functional Requirements (FRs)
   For each feature from the BRD:
   ### FR-{N}: [Feature Name]
   - **Description:** What it does
   - **User Story:** As a [persona], I want to [action] so that [benefit]
   - **Acceptance Criteria:**
     - [ ] Criterion 1
     - [ ] Criterion 2
   - **Data Source:** Which JSON file(s) to use
   - **UI Components:** Which @voyado-kth/ui components to use
   - **Priority:** MVP / Nice-to-have

   ## 4. Non-Functional Requirements (NFRs)
   - **NFR-1: Responsive Layout** — Must work on desktop (1024px+)
   - **NFR-2: Design System Compliance** — Use Essence design tokens only
   - **NFR-3: Type Safety** — Use shared types from @voyado-kth/shared
   - **NFR-4: Performance** — Lazy-loaded, no heavy dependencies
   - **NFR-5: Accessibility** — Semantic HTML, keyboard navigation
   - **NFR-6: Code Organization** — One component per file, CSS Modules

   ## 5. Data Model
   Map of JSON data files to TypeScript interfaces.

   ## 6. Component Inventory
   List of UI components needed from @voyado-kth/ui.

   ## 7. Out of Scope
   What is explicitly NOT part of this module.

   ## 8. MVP Definition
   Which FRs constitute the minimum viable product (based on BRD prioritization).
   ```

10. **Write the PRD** to `apps/<team-module>/docs/prd.md`.

11. **Update `workshop.json`**:
    - Set `progress.steps.requirements` to `"completed"` for this team
    - Set `progress.currentStep` to `"breakdown"`
    - Set `progress.lastActivity` to current ISO timestamp

12. **Present the result** to the student:
    - Summary of FRs and NFRs extracted
    - MVP scope recommendation
    - Next step: "Run `/voyado:plan` to create your sprint backlog, or optionally `/voyado:ux` for UX design guidelines first."

## Important Notes

- The PRD should be thorough but practical for a 1.5-hour workshop
- Prioritize features marked as MVP in the BRD
- Always reference actual data files and UI components available in the repo
- Keep NFRs aligned with the project conventions in CLAUDE.md
