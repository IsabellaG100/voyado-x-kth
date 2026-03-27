---
description: "Generates UX design guidelines and component specifications from the PRD. This is an OPTIONAL step. Use when a student runs /voyado:ux or wants design guidance before implementation."
argument-hint: ""
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent"]
---

# Voyado UX Designer

Generate UX design guidelines, layout specifications, and component design tokens based on the team's PRD and the Voyado Essence design system.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Run `/voyado:start` to get set up."

2. **Read `workshop.json`** to check progress:
   - If `requirements` is not `completed`, STOP: "You need a PRD first. Run `/voyado:prd`."
   - This step is OPTIONAL — inform the student they can skip to `/voyado:plan` if they prefer.

3. **Check git status** (`git status --porcelain`). If dirty, STOP and ask to commit/push.

## Execution

4. **Read the PRD** at `apps/<team-module>/docs/prd.md`.

5. **Read the Essence design system knowledge base** at `docs/essence-knowledge-base.md` to understand available tokens, colors, typography, spacing, and component patterns.

6. **Read existing UI components** — scan `packages/ui/src/components/` to understand available building blocks and their styling patterns.

7. **Read the team's data files** to understand the shape of data being displayed.

8. **Spawn the `ux-designer` agent** with all context. The agent produces:

   ### UX Spec Structure
   ```markdown
   # UX Design Specification: [Module Title]

   ## 1. Design Philosophy
   Brief description of the visual approach and user experience goals.

   ## 2. Layout Structure
   - Page layout description (grid, flex, sidebar arrangement)
   - Responsive behavior notes
   - Content hierarchy and visual flow

   ## 3. Color Palette
   Map features to Essence color tokens:
   - Primary actions: `var(--ess-color-interactive-controls-***)`
   - Status indicators: `var(--ess-color-success-***)`, `var(--ess-color-danger-***)`
   - Backgrounds: `var(--ess-color-neutral-***)`
   - Decorative accents: which decorative palette to use

   ## 4. Typography Scale
   - Page title: `var(--ess-font-size-h2)` with `var(--ess-font-weight-bold)`
   - Section headers: `var(--ess-font-size-h4)`
   - Body text: `var(--ess-font-size-medium)`
   - Labels/captions: `var(--ess-font-size-small)`

   ## 5. Spacing & Layout Tokens
   - Page padding: `var(--ess-spacing-600)`
   - Section gaps: `var(--ess-spacing-500)`
   - Card internal padding: `var(--ess-spacing-400)`
   - Element gaps: `var(--ess-spacing-300)`

   ## 6. Component Specifications
   For each major UI element:
   ### [Component Name]
   - **Base component:** Which @voyado-kth/ui component to extend
   - **Layout:** Flex/grid arrangement
   - **Tokens:** Specific Essence tokens to apply
   - **States:** Hover, active, disabled styling
   - **Content:** What data maps to what visual element

   ## 7. Interaction Patterns
   - Click/tap behaviors
   - Filter/sort interactions
   - Loading states (use Skeleton/Loader)
   - Empty states
   - Error states

   ## 8. Accessibility Notes
   - Color contrast requirements
   - Focus management
   - Screen reader considerations
   - Keyboard navigation flow
   ```

9. **Write the UX spec** to `apps/<team-module>/docs/ux-spec.md`.

10. **Update `workshop.json`**:
    - Set `progress.lastActivity` to current ISO timestamp
    - Note: This does NOT change any step status since it's optional

11. **Present the result**:
    - Summary of design decisions
    - Key Essence tokens to use
    - Next step: "Run `/voyado:plan` to create your sprint backlog."

## Important Notes

- This step is OPTIONAL — never block workflow progress on it
- Always use Essence design tokens, never raw CSS values
- Reference actual components from @voyado-kth/ui
- Keep designs practical for a workshop timeframe
- Focus on the MVP features from the PRD
