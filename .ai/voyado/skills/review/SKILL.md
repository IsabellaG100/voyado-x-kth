---
description: "Runs code review on stories that are in review status. Use when a student runs /voyado:review or wants feedback on their implemented code."
argument-hint: ""
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent"]
---

# Voyado Code Reviewer

Review implemented stories that have `status: "review"` in the backlog.

## Pre-flight Checks

1. **Read `.onboarding.json`** to identify the team. If missing, stop: "You haven't onboarded yet. Run `/voyado:start` to get set up."

2. **Read `workshop.json`** to check progress:
   - If `implementation` is not `"in-progress"` or `"completed"`, STOP: "No code to review yet. Run `/voyado:impl` first."

3. **Read `backlog.json`** from `apps/<team-module>/docs/backlog.json`. Find all stories with `status: "review"`.
   - If no stories in `review` status, inform: "No stories pending review. Stories in `in_progress` need to be completed first via `/voyado:impl`."

## Execution

4. **For each story in `review` status**, gather the implemented code:
   - Read all files listed in the story's `files` array
   - Read the story's acceptance criteria
   - Read the PRD for the relevant functional requirement

5. **Spawn the `code-reviewer` agent** with all the code and context. The agent reviews against:

   ### Review Checklist
   - **Correctness:** Does the code meet the acceptance criteria?
   - **Data usage:** Is data imported from `data/` files, not hardcoded?
   - **Type safety:** Are `@voyado-kth/shared` types used correctly?
   - **UI components:** Are `@voyado-kth/ui` components used (not custom rebuilds)?
   - **Styling:** CSS Modules with Essence tokens? No raw CSS values?
   - **Structure:** One component per file? Co-located styles?
   - **Exports:** Does `src/index.ts` export correctly for the shell?
   - **Performance:** No unnecessary re-renders? Proper React patterns?
   - **Accessibility:** Semantic HTML? Keyboard navigable?
   - **Clean code:** No unused imports? No console.logs left in?

   ### Review Output Format
   ```markdown
   ## Code Review: [Story ID] — [Story Title]

   ### Summary
   [Brief overall assessment]

   ### Passed
   - [Things done well]

   ### Issues Found
   #### [Issue Category]
   **File:** `path/to/file.tsx`
   **Line:** [line number]
   **Issue:** [description]
   **Fix:** [suggested fix]

   ### Verdict
   [APPROVED / CHANGES REQUESTED]
   ```

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
     - If changes needed: "Fix the issues above, then run `/voyado:review` again."
     - If all stories reviewed and approved:
       > All stories reviewed and approved! Time to commit, push, and create a PR:
       > ```
       > git add .
       > git commit -m "feat: implement [module name]"
       > git push -u origin <branch-name>
       > ```
       > Then create a Pull Request on GitHub targeting `main`.
    - If more stories in backlog: "You still have stories in the backlog. Run `/voyado:impl` to continue, or commit what you have."

## Important Notes

- Review ALL stories in `review` status, not just one
- Auto-fix trivial issues but explain what was changed
- Be constructive and educational — this is a learning workshop
- Focus on workshop conventions, not general best practices
- Story status flow: stories go from `review` → `done` only when approved
