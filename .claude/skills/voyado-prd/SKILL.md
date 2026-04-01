---
name: voyado-prd
description: "Creates a Product Requirements Document (PRD) from the team's Business Requirements Document (BRD). Use when a student needs to analyze requirements and extract functional/non-functional requirements."
---

# Voyado PRD Generator

Analyze the team's Business Requirements Document (BRD) and produce a structured Product Requirements Document (PRD) with functional and non-functional requirements.

## Workspace Scope

All file operations MUST be limited to the team's app directory as determined by `.onboarding.json` `teamId` (e.g., `team-5` → `apps/team-5-rewards-store/`). You may READ shared resources: `packages/`, `docs/`, `.onboarding.json`, `CLAUDE.md`. **Exception:** This skill MUST write to `workshop.json` in the repo root to update team progress. Never modify other files outside the team's app folder.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Use the voyado-help skill to get set up."

2. **Read `workshop.json`** to check the team's progress:
   - If `onboarding` is not `completed`, stop: "Complete onboarding first."
   - If `requirements` is already `completed`, inform the student and ask if they want to regenerate the PRD.

3. **Check git status** (`git status --porcelain`). If there are uncommitted changes, STOP:
   > You have uncommitted changes. Please commit and push before running this command.

## Discovery

4. **Identify the team's app directory** from `.onboarding.json` `teamId` (e.g., `team-1` → `apps/team-1-loyalty-dashboard/`). Find it by matching the team ID pattern in the `apps/` directory.

5. **Read the BRD** at `apps/<team-module>/docs/requirements.md`. This is the business requirements document.

6. **Read shared types** from `packages/shared/src/types/` to understand available data models.

7. **Read available UI components** — scan `packages/ui/src/index.ts` to know what components exist.

8. **Read the team's data files** in `apps/<team-module>/data/` to understand available data.

## Requirements Interview

9. **Interview the user** before writing the PRD. After reading the BRD, data, types, and components, ask the user targeted questions to clarify requirements and priorities. This is a critical step — do NOT skip it.

   **How to interview:**
   - Present a brief summary of what you understood from the BRD.
   - Then ask **3–5 focused questions** tailored to the team's module. Questions should cover:
     - **Prioritization:** Which features matter most to them? What does their ideal MVP look like?
     - **User experience:** How do they envision the main user flow? Any specific interactions or layouts they have in mind?
     - **Data usage:** Are there specific data points or metrics they want to highlight?
     - **Constraints or preferences:** Any features they explicitly want to skip or defer? Any design preferences?
     - **Edge cases:** How should the UI handle empty states, large datasets, or missing data?
   - Adapt questions to the specific module context (e.g., for a rewards store ask about filtering/sorting preferences; for analytics ask about which KPIs matter most).
   - **Wait for the user's answers** before proceeding. Do NOT generate the PRD until the user has responded.
   - If the user's answers reveal new requirements or changed priorities, incorporate them into the PRD.

10. **After receiving answers**, proceed to generate the PRD incorporating the user's input alongside the BRD.

## PRD Generation

11. **Generate the PRD** — a comprehensive PRD that includes:

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

## Response Formatting

Always produce clean, human-friendly, well-formatted output. Use headings, tables, bullet lists, and visual separators to make responses easy to scan. Avoid walls of text. When presenting the PRD summary, use a table for FRs and clearly highlight MVP vs. nice-to-have.

## After Generation

12. **Write the PRD** to `apps/<team-module>/docs/prd.md`.

13. **Update `workshop.json`**:
    - Set `progress.steps.requirements` to `"completed"` for this team
    - Set `progress.currentStep` to `"breakdown"`
    - Set `progress.lastActivity` to current ISO timestamp

14. **Present the result** to the student:
    - Summary of FRs and NFRs extracted (use a table)
    - MVP scope recommendation
    - Next step: "Use the voyado-plan skill to create your sprint backlog, or optionally the voyado-ux skill for UX design guidelines first."

15. **Suggest a commit** for the generated PRD:

    > **Suggested commit:**
    > ```
    > git add apps/<team-module>/docs/prd.md workshop.json
    > git commit -m "docs: generate PRD for <module-name>"
    > ```
    > Want me to commit these changes for you?

    If the user agrees, run the commit on their behalf.

## Constraints

- Be practical — this is a 1.5-hour workshop, not a production sprint
- Reference REAL files, components, and types from the codebase
- Keep FRs implementable in 10-15 minute increments
- Align priorities with the BRD's own MVP guidance
- Use the exact component names from @voyado-kth/ui
- Use the exact type names from @voyado-kth/shared
