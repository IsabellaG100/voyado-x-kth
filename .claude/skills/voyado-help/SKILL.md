---
name: voyado-help
description: "The main entry point for the Voyado workshop. Use when a student runs /voyado-help, asks how to begin, what to do next, or needs guidance on the workflow. Handles onboarding (if not done), ensures data consistency, and shows progress with next action recommendations."
---

# Voyado Workshop — Help

You are the main entry point for the Voyado x KTH AI-driven SDLC workshop. This skill handles **onboarding**, **data consistency**, and **ongoing navigation**.

## Workspace Scope

All file operations MUST be limited to the team's app directory as determined by `.onboarding.json` `teamId` (e.g., `team-5` → `apps/team-5-rewards-store/`). **Exception:** This skill MUST write to both `.onboarding.json` and `workshop.json` in the repo root during onboarding. You may READ shared resources: `packages/`, `docs/`, `CLAUDE.md`. Never modify files outside the team's app folder other than the two root files listed above.

## Response Formatting

Always produce clean, human-friendly, well-formatted output. Use headings, tables, bullet lists, and visual separators to make responses easy to scan. Avoid walls of text.

## Step 1: Check Onboarding Status

Read `.onboarding.json` from the repo root.

- **If it does NOT exist** → Go to [First-Time Onboarding](#first-time-onboarding)
- **If it exists** → Go to [Workshop Navigator](#workshop-navigator)

---

## First-Time Onboarding

### 1.1 Display Welcome Banner

Print this ASCII art banner EXACTLY as shown, followed by the welcome message:

```
 __      ______  __   __  ___   _____   ____
 \ \    / / __ \ \ \ / / /   \ |  __ \ / __ \
  \ \  / / |  | | \ V / / /_\ \| |  | | |  | |
   \ \/ /| |  | |  \ / / _____ \ |  | | |  | |
    \  / | |__| |  | | / /   \ \| |__| | |__| |
     \/   \____/   |_|/_/     \_\_____/ \____/

  Voyado x KTH Medieteknik Workshop
  AI-Driven Software Development Lifecycle
```

Then say:

> Welcome! Let's get your team set up so you can start building.
> I'll ask a few quick questions to get you onboarded.

### 1.2 Team Selection

Print the full team list so the student can see all options:

```
  1. Loyalty Dashboard — Member overview, points balance, tier distribution
  2. Product Catalog  — Product browsing, filtering, wishlist management
  3. Customer Segments — Segment builder, audience targeting rules
  4. Campaign Builder  — Marketing campaign creation, templates, scheduling
  5. Rewards Store     — Points redemption, reward catalog management
  6. Analytics Overview — KPI charts, engagement metrics, reporting
```

Then ask: **"Which team are you on? (1-6)"**

Wait for the student to reply with a number (1-6).

### 1.3 Team Nickname

Ask: **"Does your team have a nickname?"** (they can skip this)

### 1.4 Team Members

Ask: **"How many members are on your team (including you)?"** (2-5)

Then, for EACH member, ask them to provide their details as free text:

> **Member {N} of {total}:** Enter their details in this format:
> `Name, Role` (minimum) or `Name, GitHub username, Email, Role` (full)
> Examples:
> - `Alice Svensson, Developer`
> - `Bob Eriksson, boberik, bob@kth.se, Tech Lead`
> Common roles: Developer, Designer, Tech Lead, Project Lead

Parse the response:
- **2 fields** (name, role): GitHub and email are optional — set them to empty strings
- **3 fields** (name, github, role): Email is optional — set it to empty string
- **4 fields** (name, github, email, role): All provided
- If parsing fails, ask again with the example format.

**Auto-generate** for each member:
- `initials` — First letter of first name + first letter of last name, uppercase (e.g., "Alice Svensson" → "AS")
- `avatarColor` — Assign from the team's color palette in order (see Color Palette below)

### 1.5 Confirmation

Display a formatted summary:

```
Team: Team {N} — "{Nickname}"
Module: {Module Title} ({Route})

Members:
  1. {Name} ({Role}) — {Email} — @{GitHub}
  2. ...
```

Ask: **"Does this look correct?"** If not, ask what needs to be corrected and loop back.

### 1.6 Save Onboarding Data

**CRITICAL: You MUST complete ALL items in this checklist. Do not skip any step. After writing each file, verify it was written correctly by reading it back.**

#### Checklist — complete every item:

- [ ] **1. Write `.onboarding.json`** to the repo root with this exact structure:

```json
{
  "teamId": "team-{N}",
  "teamName": "Team {N}",
  "teamNickname": "{nickname or empty}",
  "members": [
    {
      "name": "Alice Svensson",
      "email": "alice@kth.se",
      "github": "alicesv",
      "role": "Developer",
      "initials": "AS",
      "avatarColor": "#4790ff"
    }
  ],
  "onboardedAt": "{ISO timestamp}"
}
```

- [ ] **2. Read `.onboarding.json` back** and verify it contains all members.

- [ ] **3. Update `workshop.json`** — read the file, find the team by ID, then apply ALL of these changes:
  - Set `team.nickname` to the nickname (or leave empty)
  - Set `team.members` to the SAME members array written to `.onboarding.json` (copy it exactly — same names, emails, github usernames, roles, initials, avatarColors)
  - Set `team.progress.currentStep` to `"requirements"`
  - Set `team.progress.steps.onboarding` to `"completed"`
  - Set `team.progress.lastActivity` to current ISO timestamp
  - Write back with `JSON.stringify(data, null, 2)` + trailing newline

- [ ] **4. Read `workshop.json` back** and verify:
  - The team's `members` array is NOT empty
  - The team's `members` array matches `.onboarding.json`
  - The team's `progress.steps.onboarding` is `"completed"`
  - If verification fails, fix the file immediately before proceeding.

- [ ] **5. Display completion message:**

```
You're all set! Your team is now onboarded.

Your module: {Module Title}
Your route: {Route}
Your branch: team-{N}/feature (create this when you're ready)

Next step: Use the voyado-prd skill to analyze your business requirements and generate a PRD.

You can use the voyado-help skill anytime to check your progress and see what to do next.
```

4. **Suggest a commit** for the onboarding artifacts:

   > **Suggested commit:**
   > ```
   > git add .onboarding.json workshop.json
   > git commit -m "chore: complete team onboarding"
   > ```
   > Want me to commit these changes for you?

   If the user agrees, run the commit on their behalf.

### Team Color Palette

Assign avatar colors in order as members are added:

| Team | Color 1 | Color 2 | Color 3 | Color 4 | Color 5 |
|------|---------|---------|---------|---------|---------|
| team-1 | `#2d6e6d` | `#3a8584` | `#1f5453` | `#48a09f` | `#165b5a` |
| team-2 | `#4790ff` | `#5c9fff` | `#3281f0` | `#6db0ff` | `#2872d9` |
| team-3 | `#43a584` | `#56b896` | `#339574` | `#68cba8` | `#2a8568` |
| team-4 | `#791A3F` | `#8e2a52` | `#641232` | `#a33d65` | `#530a28` |
| team-5 | `#e8725a` | `#ed886e` | `#e35c42` | `#f09e88` | `#d94a30` |
| team-6 | `#7b61ff` | `#8d77ff` | `#6a4df0` | `#a08fff` | `#5a3ad9` |

### Validation Rules

- **Team ID**: Must be `team-1` through `team-6`
- **Name**: Non-empty string (required)
- **Role**: Non-empty string (required)
- **Email**: Optional (preferably `@kth.se` if provided)
- **GitHub**: Optional, no `@` prefix (strip if provided)
- **Members**: Between 1 and 7 per team
- **Initials**: Exactly 2 uppercase letters, auto-generated
- If `workshop.json` already has members for this team, warn and ask whether to replace or merge

---

## Workshop Navigator

This section runs when the team is already onboarded (`.onboarding.json` exists).

### 2.1 Sync Check (MANDATORY — always runs first)

**Every time** this skill runs and `.onboarding.json` exists, verify that `workshop.json` is in sync:

1. Read `.onboarding.json` to get `teamId`, `teamNickname`, and `members`.
2. Read `workshop.json` and find the matching team by `teamId`.
3. **Compare** the team's data in `workshop.json` against `.onboarding.json`:
   - Does `team.members` match `.onboarding.json` `members`? (same length, same names)
   - Does `team.nickname` match `.onboarding.json` `teamNickname`?
   - Is `team.progress.steps.onboarding` set to `"completed"`?
4. **If anything is out of sync**, fix it silently:
   - Set `team.members` to the members from `.onboarding.json`
   - Set `team.nickname` to the nickname from `.onboarding.json`
   - Set `team.progress.steps.onboarding` to `"completed"`
   - If `team.progress.currentStep` is still `"onboarding"`, set it to `"requirements"`
   - Write `workshop.json` back
   - Tell the user: "Synced workshop.json with your onboarding data."
5. If everything is already in sync, proceed silently (no message needed).

### 2.2 Read Progress

1. Read `workshop.json` and find the matching team. Extract `progress.steps` and `progress.currentStep`.

### 2.3 Check Git Status

Run `git status --porcelain`. If there are uncommitted changes, STOP and tell the student:

> You have uncommitted changes. Please commit and push your work before continuing:
> ```
> git add .
> git commit -m "feat: <describe your changes>"
> git push
> ```

### 2.4 Determine Next Action

Based on the team's step statuses:

| Current State | Next Action | Skill |
|--------------|-------------|-------|
| `requirements` = pending | Create PRD from business requirements | `voyado-prd` |
| `breakdown` = pending | Plan epics and stories (optionally run `voyado-ux` first) | `voyado-plan` |
| `implementation` = pending or in-progress | Implement next story | `voyado-impl` |
| `implementation` = completed | Create PR and push | Manual: `git push` then create PR |
| `pull-request` = pending | Push branch and create PR | Manual git operations |
| `review` = pending | Run code review | `voyado-review` |
| `review` = completed | Merge PR | Manual or mentor action |
| `merge` = completed | Wait for deployment | Automatic via CI/CD |
| `deployed` = completed | Done! Prepare for presentation | Celebrate! |

### 2.5 Check Backlog

If `apps/<team-module>/docs/backlog.json` exists, show a summary:
- Stories by status: `backlog`, `in_progress`, `review`, `done`
- Which story is currently in progress (if any)

### 2.6 Present Recommendation

```
## Workshop Progress: [Team Name]

**Current step:** [step label]
**Status:** [visual progress indicator]

### What's Next
[Clear instruction with the skill to use next]

### Optional Steps
[Any optional actions like voyado-ux]

### Story Progress (if applicable)
[Backlog summary table]
```

## Important Notes

- The UX design step (`voyado-ux`) is ALWAYS optional. Never block progress on it.
- The `breakdown` step requires `requirements` to be completed (PRD must exist).
- The `implementation` step requires `breakdown` to be completed (backlog must exist).
- Always check for uncommitted changes FIRST before any recommendation (in navigator mode).
- The ASCII banner is ONLY shown during first-time onboarding (when `.onboarding.json` is missing).
