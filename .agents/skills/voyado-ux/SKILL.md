---
name: voyado-ux
description: "Generates UX design guidelines and component specifications from the PRD. This is an OPTIONAL step. Use when a student wants design guidance before implementation."
---

# Voyado UX Designer

Generate UX design guidelines, layout specifications, and component design tokens based on the team's PRD and the Voyado Essence design system.

## Workspace Scope

All file operations MUST be limited to the team's app directory as determined by `.onboarding.json` `teamId` (e.g., `team-5` → `apps/team-5-rewards-store/`). You may READ shared resources: `packages/`, `docs/`, `.onboarding.json`, `CLAUDE.md`. **Exception:** This skill MUST write to `workshop.json` in the repo root to update team progress. Never modify other files outside the team's app folder.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Use the voyado-help skill to get set up."

2. **Read `workshop.json`** to check progress:
   - If `requirements` is not `completed`, STOP: "You need a PRD first. Use the voyado-prd skill."
   - This step is OPTIONAL — inform the student they can skip to sprint planning if they prefer.

3. **Check git status** (`git status --porcelain`). If dirty, STOP and ask to commit/push.

## Execution

4. **Read the PRD** at `apps/<team-module>/docs/prd.md`.

5. **Read the Essence design system knowledge base** at `docs/essence-knowledge-base.md` to understand available tokens, colors, typography, spacing, and component patterns.

6. **Read existing UI components** — scan `packages/ui/src/components/` to understand available building blocks and their styling patterns.

7. **Read the team's data files** to understand the shape of data being displayed.

8. **Generate the UX spec** following the structure and principles below.

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

### Design Principles

- **Engage-style layout**: The shell provides a sidebar; your content fills the main area
- **Card-based UI**: Most content should be organized in cards
- **KPI-first**: Lead with summary metrics when applicable
- **Progressive disclosure**: Show overview first, details on interaction
- **Consistent spacing**: Use the 4px grid (spacing tokens are multiples of 4px)
- **Essence colors**: Primary = teal, Success = green, Danger = red, Warning = yellow

### Essence Token Quick Reference

#### Colors
- Primary: `--ess-color-primary-100` through `--ess-color-primary-900`
- Neutral: `--ess-color-neutral-100` through `--ess-color-neutral-900`
- Interactive: `--ess-color-interactive-controls-*`
- States: `--ess-color-success-*`, `--ess-color-danger-*`, `--ess-color-warning-*`
- Decorative: `--ess-color-decorative-{aqua,blue,burgundy,coral,forest,green,purple,sand}-*`

#### Typography
- Sizes: `--ess-font-size-{tiny,small,medium,large,h5,h4,h3,h2,h1}`
- Weights: `--ess-font-weight-{normal,medium,bold}`

#### Spacing
- Scale: `--ess-spacing-{100,200,300,400,500,600,700,800,900,1000}` (4px to 64px)

## Response Formatting

Always produce clean, human-friendly, well-formatted output. Use headings, tables, bullet lists, and visual separators to make responses easy to scan. Avoid walls of text.

## After Generation

9. **Write the UX spec** to `apps/<team-module>/docs/ux-spec.md`.

10. **Update `workshop.json`**:
    - Set `progress.lastActivity` to current ISO timestamp
    - Note: This does NOT change any step status since it's optional

11. **Present the result**:
    - Summary of design decisions
    - Key Essence tokens to use
    - Next step: "Use the voyado-plan skill to create your sprint backlog."

12. **Suggest a commit** for the generated UX spec:

    > **Suggested commit:**
    > ```
    > git add apps/<team-module>/docs/ux-spec.md workshop.json
    > git commit -m "docs: generate UX spec for <module-name>"
    > ```
    > Want me to commit these changes for you?

    If the user agrees, run the commit on their behalf.

## Constraints

- ONLY use Essence design tokens — never raw CSS values like `#fff` or `16px`
- Reference real @voyado-kth/ui components
- Design for desktop viewport (1024px+)
- Keep it achievable within the workshop timeframe
- Focus on MVP features
- This step is OPTIONAL — never block workflow progress on it
