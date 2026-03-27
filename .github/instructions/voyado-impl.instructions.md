# Voyado Workshop — Story Implementer

Apply these instructions when a student asks to implement a story, start coding, build a feature, or mentions "voyado impl".

Pick up the next story from the backlog and implement it.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Say 'voyado start' to get set up."

2. **Read `workshop.json`** to check progress:
   - If `breakdown` is not `completed`, STOP: "You need a sprint plan first. Say 'create plan'."

3. **Check git status** (`git status --porcelain`). If there are uncommitted changes, STOP:
   > You have uncommitted changes. Please commit and push before starting a new story:
   > ```
   > git add .
   > git commit -m "feat: <describe changes>"
   > git push
   > ```
   > After committing, say "implement next story" again.

## Story Selection

4. **Read `backlog.json`** from `apps/<team-module>/docs/backlog.json`.

5. **Select the story to implement:**
   - If the student specified a story ID (e.g., `S1.2`), find that specific story
   - If no specific story requested, find the first story with `status: "backlog"` (in epic order, then story order)
   - If a story has `status: "in_progress"`, ask the student if they want to continue that story or pick a new one
   - If all stories are `done`, congratulate and suggest running code review if any stories are in `review` status, or moving to PR creation

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

9. **Implement the story** following these conventions:

### Project Conventions (MUST FOLLOW)

1. **Components**: One component per file. Functional components with TypeScript.
2. **Styling**: CSS Modules (`.module.css`) with Essence design tokens (`var(--ess-*)`). Never use inline styles, Tailwind, or raw CSS values.
3. **Data**: Import JSON from the `data/` folder. Never hardcode data in components.
4. **Types**: Import from `@voyado-kth/shared`. Never define local type duplicates.
5. **UI Components**: Use `@voyado-kth/ui` components. Never build custom versions of existing components.
6. **Exports**: Each module exports page components from `src/index.ts`.
7. **File naming**: PascalCase for components (`LoyaltyDashboard.tsx`), kebab-case for styles (`loyalty-dashboard.module.css`).
8. **No additional dependencies**: Only use what's already in the workspace.

### CSS Module Pattern

```css
/* component-name.module.css */
.container {
  padding: var(--ess-spacing-500);
  display: flex;
  flex-direction: column;
  gap: var(--ess-spacing-400);
}

.title {
  font-size: var(--ess-font-size-h3);
  font-weight: var(--ess-font-weight-bold);
  color: var(--ess-color-neutral-900);
}
```

### Component Pattern

```tsx
import styles from './component-name.module.css';
import { Card, Badge } from '@voyado-kth/ui';
import type { SomeType } from '@voyado-kth/shared';
import data from '../../data/some-data.json';

export function ComponentName() {
  const typedData = data as SomeType[];

  return (
    <div className={styles.container}>
      {/* implementation */}
    </div>
  );
}
```

### Code Quality Standards

- Clean, readable code with meaningful variable names
- Proper React patterns (hooks, memoization where appropriate)
- Semantic HTML elements
- Accessible markup (alt text, aria labels, keyboard support)
- No console.logs, commented-out code, or TODOs
- Proper error boundaries for data loading

## After Implementation

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
      - "implement next story" — implement the next story
      - "review code" — review your implemented code
      - Commit and push when ready

    > **Reminder:** You can keep implementing more stories, or say "review code" to review your work. When you're ready, commit and push your changes:
    > ```
    > git add .
    > git commit -m "feat: <describe what you built>"
    > git push
    > ```

## Constraints

- Implement ONLY what the story specifies — no extra features
- Do not modify files outside the team's app directory (unless updating src/index.ts)
- Do not install new packages
- All styles must use Essence tokens
- All data must come from JSON files
- If UX spec exists, follow its design guidance
- One story at a time — complete it before moving to the next
- Always check types compile before marking a story complete
- If the first story involves page setup, make sure to update `src/index.ts` exports
- When updating `src/index.ts`, ensure the export name matches what the shell's `App.tsx` expects
- Story status flow: `backlog` → `in_progress` → `review` → `done`
