# Voyado Workshop — PRD Generator

Apply these instructions when a student asks to create a PRD, analyze requirements, or mentions "voyado prd".

Analyze the team's Business Requirements Document (BRD) and produce a structured Product Requirements Document (PRD) with functional and non-functional requirements.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Say 'voyado start' to get set up."

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

9. **Generate the PRD** — a comprehensive PRD that includes:

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

## PRD Writing Guidelines

- **Analyze the BRD** thoroughly — identify every feature, user need, and constraint.
- **Extract Functional Requirements (FRs)** — one FR per feature. Each must have:
  - A clear user story (As a [persona], I want [action], so that [benefit])
  - Measurable acceptance criteria
  - Data source mapping (which JSON files provide the data)
  - UI component mapping (which @voyado-kth/ui components to use)
  - Priority classification (MVP vs. nice-to-have, based on BRD guidance)
- **Define Non-Functional Requirements (NFRs)** — always include:
  - Responsive layout (desktop 1024px+)
  - Essence design system compliance (CSS custom properties only)
  - Type safety (@voyado-kth/shared types)
  - Performance (lazy-loaded module, no heavy deps)
  - Accessibility (semantic HTML, keyboard nav)
  - Code organization (one component per file, CSS Modules, co-located styles)
- **Map the data model** — connect JSON data shapes to TypeScript interfaces.
- **List required UI components** from @voyado-kth/ui.
- **Define MVP scope** — which FRs must be completed in the workshop timeframe.
- **Identify out-of-scope items** — what NOT to build.

## After Generation

10. **Write the PRD** to `apps/<team-module>/docs/prd.md`.

11. **Update `workshop.json`**:
    - Set `progress.steps.requirements` to `"completed"` for this team
    - Set `progress.currentStep` to `"breakdown"`
    - Set `progress.lastActivity` to current ISO timestamp

12. **Present the result** to the student:
    - Summary of FRs and NFRs extracted
    - MVP scope recommendation
    - Next step: "Say 'create plan' to create your sprint backlog, or optionally 'create UX design' for UX design guidelines first."

## Constraints

- Be practical — this is a 1.5-hour workshop, not a production sprint
- Reference REAL files, components, and types from the codebase
- Keep FRs implementable in 10-15 minute increments
- Align priorities with the BRD's own MVP guidance
- Use the exact component names from @voyado-kth/ui
- Use the exact type names from @voyado-kth/shared
