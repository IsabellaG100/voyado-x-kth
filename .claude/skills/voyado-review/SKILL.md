---
name: voyado-review
description: "Runs code review on stories that are in review status. Use when a student wants feedback on their implemented code or needs a quality check."
---

# Voyado Code Reviewer

Review implemented stories that have `status: "review"` in the backlog.

## Workspace Scope

All file operations MUST be limited to the team's app directory as determined by `.onboarding.json` `teamId` (e.g., `team-5` → `apps/team-5-rewards-store/`). You may READ shared resources: `packages/`, `docs/`, `.onboarding.json`, `CLAUDE.md`. **Exception:** This skill MUST write to `workshop.json` in the repo root to update team progress. Never modify other files outside the team's app folder.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Use the voyado-help skill to get set up."

2. **Read `workshop.json`** to check progress:
   - If `implementation` is not `"in-progress"` or `"completed"`, STOP: "No code to review yet. Use the voyado-impl skill first."

3. **Read `backlog.json`** from `apps/<team-module>/docs/backlog.json`. Find all stories with `status: "review"`.
   - If no stories in `review` status, inform: "No stories pending review. Stories in `in_progress` need to be completed first via voyado-impl."

## Execution

4. **For each story in `review` status**, gather the implemented code:
   - Read all files listed in the story's `files` array
   - Read the story's acceptance criteria
   - Read the PRD for the relevant functional requirement

5. **Review against the checklist below:**

### Review Checklist

#### Data Handling
- [ ] Data imported from `data/` folder (not hardcoded)
- [ ] Proper type casting with `@voyado-kth/shared` types
- [ ] No raw `any` types

#### UI Components
- [ ] Using `@voyado-kth/ui` components (not custom rebuilds)
- [ ] Proper props passed to UI components
- [ ] Components imported from package, not relative paths

#### Styling
- [ ] CSS Modules used (`.module.css` files)
- [ ] Only Essence design tokens (`var(--ess-*)`)
- [ ] No inline styles
- [ ] No raw CSS values (no `#fff`, no `16px`, no `red`)
- [ ] No Tailwind or other CSS frameworks

#### Code Quality
- [ ] One component per file
- [ ] Functional components with TypeScript
- [ ] Meaningful variable and function names
- [ ] No unused imports or variables
- [ ] No `console.log` statements
- [ ] No commented-out code
- [ ] No TODO comments
- [ ] Proper React patterns (hooks rules, dependency arrays)

#### Structure
- [ ] Page components exported from `src/index.ts`
- [ ] Export names match shell's `App.tsx` imports
- [ ] Files in correct directories (pages/, components/)
- [ ] Styles co-located with components

#### Accessibility
- [ ] Semantic HTML elements used
- [ ] Images have alt text
- [ ] Interactive elements are keyboard accessible
- [ ] Proper heading hierarchy

#### TypeScript
- [ ] No type errors (run `pnpm --filter <package> typecheck`)
- [ ] Shared types used from `@voyado-kth/shared`
- [ ] No `as any` or `@ts-ignore`

### Issue Severity

- **Blocking**: Must fix before approval (type errors, broken functionality, missing acceptance criteria)
- **Non-blocking**: Should fix but won't block approval (naming, minor style issues, accessibility improvements)
- **Auto-fixable**: Will fix automatically (unused imports, trailing whitespace)

### Review Report Format

For each story, produce:

```markdown
## Code Review: [Story ID] — [Story Title]

### Summary
[1-2 sentence overall assessment]

### Passed
- [Thing done well 1]
- [Thing done well 2]

### Issues
#### Blocking
- **[File]:[Line]** — [Issue description]. **Fix:** [suggestion]

#### Non-blocking
- **[File]:[Line]** — [Issue description]. **Fix:** [suggestion]

#### Auto-fixed
- **[File]:[Line]** — [What was fixed]

### Verdict: [APPROVED / CHANGES REQUESTED]
```

## After Review

6. **If issues are found:**
   - Apply automatic fixes for trivial issues (unused imports, formatting)
   - List remaining issues that need student attention
   - Keep the story status as `"review"`

7. **If approved (no blocking issues):**
   - Update the story status to `"done"` in `backlog.json`
   - Check if all stories are done:
     - If yes, update `workshop.json`:
       - Set `progress.steps.implementation` to `"completed"`
       - Set `progress.steps.review` to `"completed"`
       - Set `progress.currentStep` to `"pull-request"`
     - If no, keep `implementation` as `"in-progress"`
   - Set `progress.lastActivity` to current ISO timestamp

8. **Run typecheck** after any fixes:
   ```
   pnpm --filter <package-name> typecheck
   ```

9. **Present the review result**:
   - Summary of review per story
   - Issues found and fixed vs. remaining
   - Next steps:
     - If changes needed: "Fix the issues above, then use the voyado-review skill again."
     - If all stories reviewed and approved:
       > All stories reviewed and approved! Time to commit, push, and create a PR:
       > ```
       > git add .
       > git commit -m "feat: implement [module name]"
       > git push -u origin <branch-name>
       > ```
       > Then create a Pull Request on GitHub targeting `main`.
    - If more stories in backlog: "You still have stories in the backlog. Use the voyado-impl skill to continue, or commit what you have."

## Response Formatting

Always produce clean, human-friendly, well-formatted output. Use headings, tables, bullet lists, and visual separators to make responses easy to scan. Avoid walls of text.

## Commit After Review

After completing the review (and any auto-fixes), suggest a commit:

> **Suggested commit:**
> ```
> git add apps/<team-module>/
> git commit -m "fix(<team-module>): address code review feedback"
> ```
> Want me to commit these changes for you?

If the user agrees, run the commit on their behalf. If ALL stories are approved and done, suggest a final commit message instead:

> ```
> git commit -m "feat(<team-module>): complete implementation — all stories reviewed"
> ```

## Tone

- Be constructive and educational — these are students learning
- Explain WHY something is an issue, not just WHAT
- Praise good patterns and decisions
- Keep blocking issues to genuine problems, not style preferences
- Remember this is a workshop with time constraints — be pragmatic
- Review ALL stories in `review` status, not just one
- Auto-fix trivial issues but explain what was changed
- Story status flow: stories go from `review` → `done` only when approved
