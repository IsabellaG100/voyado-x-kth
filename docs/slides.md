# Workshop Slides — AI-Augmented Development & Hands-On Workshop

---

## PART 1: The Modern SDLC & AI-Augmented Development

---

### Slide 1: From Idea to Production — The Software Development Lifecycle

**How software gets built in a product company**

| Phase | What happens | Who's involved |
|-------|-------------|----------------|
| **Requirements** | Understand the problem, define what to build | PM, Designer, Engineers |
| **Design** | Plan the user experience and technical approach | Designer, Engineers |
| **Planning** | Break work into small, deliverable pieces | Team |
| **Implementation** | Write the code | Engineers |
| **Review** | Peers review the code for quality and correctness | Engineers |
| **Ship** | Merge, build, deploy — code goes live | CI/CD pipeline |

> At Voyado, every feature follows this path — from a customer problem to live code.

---

### Slide 2: Enter AI-Augmented Software Engineering

**AI amplifies every stage of product development.**

The industry calls this **AI-augmented software engineering** (Gartner's term). The idea: AI tools work alongside the team at every stage of the SDLC — not just code completion.

| SDLC Phase | How AI helps |
|------------|-------------|
| Requirements | Analyze documents, extract features, ask clarifying questions |
| Design | Suggest design patterns, map data models, generate UX specs |
| Planning | Break features into stories, estimate complexity, order by dependency |
| Implementation | Write code, follow conventions, use design system tokens |
| Review | Check quality, find issues, auto-fix trivial problems |
| Ship | Suggest commit messages, help with git workflow |

> This is not "vibe coding" (letting AI generate code you never read). This is structured, guided AI collaboration — the AI follows your team's conventions, your design system, your architecture.

---

### Slide 3: The 7 Levels of AI-Native Software Development

**Where are we on the AI autonomy scale?**

| Level | Name | Description | Core Idea |
|-------|------|-------------|-----------|
| **1** | Manual Development | Traditional, fully manual software development with no AI involvement. | Everything is built directly by humans. |
| **2** | AI as Reference & Suggestion | AI is used as an enhanced search engine, documentation assistant, or autocomplete tool. | AI helps answer questions, not execute work. |
| **3** | Snippet Generator (Copy/Paste) | The developer asks AI to generate specific functions or snippets, then copy-pastes and integrates them into the codebase. | AI produces code fragments; the human stitches them together. |
| **4** | Local AI Pair Programmer ★ | AI is embedded in the IDE or CLI and can be instructed to make changes across files. It executes short, scoped tasks autonomously (~10 min) before returning control. | AI actively modifies the codebase under direct human guidance. |
| **5** | Task-Based Delegation | Humans assign complete tasks to AI instead of guiding step-by-step. The workflow becomes: specify task → assign → review. AI runs independently for longer intervals (~30 min). | Humans manage tasks, not individual coding steps. |
| **6** | Initiative-Level Execution | Humans define larger initiatives. AI breaks them down into epics and tasks, executes them, and iterates independently. Systems can run for extended periods (days) without a human in the loop. | Humans define initiatives, AI plans and executes. |
| **7** | Dark Factory | Humans provide vision, values, and strategic goals. AI determines what to build, defines initiatives, and fully implements them end-to-end. | Software development operates as an autonomous system. |

> ★ **Level 4 — Today's workshop.** You give the AI a task to run, it does the heavy lifting, you review and approve.

---

### Slide 4: Form Your Teams (Before Dinner)

**Time to find your crew!**

When you're told to eat, grab your food and walk by the tables in the townhall. Each table has a **team mission card** — read the missions and find the one that excites you.

**Roles to fill:**

On each table there's a sign-up sheet. Choose a role and write your name next to it. These aren't hard-set — it's a position you *try to play well* during the assignment.

| Role | What you do |
|------|-------------|
| **Developer** | Works with the code and AI tools. Needs a laptop. Pushes code to the repository. |
| **Product Manager** | Owns the vision. Prioritizes what to build first. |
| **UX Designer** | Shapes how the feature looks and feels. |
| **QA Engineer** | Tests and validates that the feature works correctly. |

**Important:**
- The **Developer** must fill in their **email address** on the sheet — they'll receive a **ChatGPT guest Pro account** invitation.
- If you're the first person at a table, you're the team lead — welcome and "hire" others who join.
- **Before the next talk starts**, every team must have a Developer selected and ready.

> Grab food. Explore the tables. Pick your mission. Form your team. Be back with a Developer ready!

---

## PART 2: Your Workshop Workflow

---

### Slide 5: Getting Started (After the AI Talk)

**Developer: verify your access first.**

The developer who received the ChatGPT invitation should check that they can log in and the access works.

**Set up your project:**

| Step | What to do |
|------|------------|
| **Install pnpm** | `npm install -g pnpm` (or `brew install pnpm` on macOS) |
| **Clone the repo** | `git clone <repo-url>` |
| **Install dependencies** | `cd voyado-x-kth && pnpm install` |
| **Run the dev server** | `pnpm dev` — opens at `localhost:3000` |

> Once the dev server is running, you should see the shell app with empty module slots — your team will fill one of them.

---

### Slide 6: Branching Strategy

**Why branches matter:** the code lives on GitHub with a default branch called `main`. In a real team, pushing directly to `main` would cause conflicts and break things. A branching strategy is an agreement between team members on how to work in parallel.

**Our agreement:** every team creates a feature branch. All your work goes there. At the end, you merge into `main`.

```
main ─────────────────────────────────────────────────► (always deployable)
  │
  └── feature/team-1 ──► commits ──► Push ──► PR ──► Review ──► Merge ──► Deploy
       (your feature branch)
```

**Create your branch immediately after cloning:**

```bash
git checkout -b feature/team-[team-id]
```

Example: `git checkout -b feature/team-1`, `git checkout -b feature/team-3`

> **This naming format is important — follow it exactly:** `feature/team-[team-id]`

---

### Slide 7: Your AI Toolkit — Workshop Skills

**When you open the AI tool in this repository, a set of workshop skills are already installed.** These skills guide the AI through each SDLC step so it produces quality code that matches your team's mission and business requirements.

**How to discover commands:** type `$` in the message box of your AI tool (Codex VS Code extension, Codex CLI, Codex desktop app, etc.) to see the list of available commands.

| Skill | Command | What it does |
|-------|---------|-------------|
| **Help** | `/voyado-help` | See where you are in the process and what to do next. Run anytime! |
| **PRD** | `/voyado-prd` | Read your requirements and generate a Product Requirements Document |
| **UX** | `/voyado-ux` | *(Optional)* Generate UX design guidelines with Essence design tokens |
| **Plan** | `/voyado-plan` | Break the PRD into epics and implementable stories |
| **Implement** | `/voyado-impl` | Pick up the next story and write the code |
| **Review** | `/voyado-review` | Review your code for quality, conventions, and accessibility |
| **Status** | `/voyado-status` | See your full progress at any time |

**The commands follow a sequence** that mirrors the SDLC workflow. The **help command** (`/voyado-help`) is your compass — it tells you where you are and what step to take next.

> Works in **Codex** (VS Code, CLI, Desktop) and **Claude Code** — same skills, all tools.

---

### Slide 8: The Step-by-Step Workflow

**Follow this sequence. The AI guides you through each step.**

| # | Step | What happens |
|---|------|-------------|
| 1 | **Create branch** | `git checkout -b feature/team-[team-id]` |
| 2 | **Onboard** | Run any command (e.g. `/voyado-help`) — if you haven't onboarded, it will walk you through it. Provide team members' names and email addresses. |
| 3 | **Commit & push** | After onboarding, commit and push. **Every skill requires the previous step's artifacts to be committed before it lets you proceed.** |
| 4 | **Brainstorm** | The team sits together, reads the mission and business requirements. The AI skills guide you through the discussion. |
| 5 | **Create PRD** | `/voyado-prd` — answer a few questions, get a full Product Requirements Document |
| 6 | **Plan Sprint** | `/voyado-plan` — break the PRD into epics and stories |
| 7 | **Implement** | `/voyado-impl` — pick up stories one at a time, write the code |
| 8 | **Review** | `/voyado-review` — check code quality, fix issues |
| 9 | **Ship** | Push your code, create a Pull Request on GitHub, ask for a code review |
| 10 | **Merge** | When the PR is approved, merge into `main` — CI/CD deploys automatically |
| 11 | **Demo!** | Each team presents their module to everyone |

**After each step:** commit and push your work to your branch before moving on.

**Check progress anytime:** run `/voyado-help` or `/voyado-status`.

---

### Slide 9: Let's Build!

**Team assignments:**

| Team | Module | Route | What you build |
|------|--------|-------|---------------|
| Team 1 | Loyalty Dashboard | `/loyalty` | Member stats, tier distribution, points economy |
| Team 2 | Product Catalog | `/products` | Product grid, filters, search, wishlist |
| Team 3 | Customer Segments | `/segments` | Segment builder with targeting rules |
| Team 4 | Campaign Builder | `/campaigns` | Campaign creation wizard with templates |
| Team 5 | Rewards Store | `/rewards` | Reward catalog, point redemption, history |
| Team 6 | Analytics Overview | `/analytics` | KPI charts, metrics, date ranges |

**Don't worry if you get stuck.** You don't need to know git commands, pnpm, or AI tools by heart. Try to figure it out together as a team first. If you're stuck, just raise your hand and we'll be with you shortly.

> Ask each other. Use the AI. Ship code. Have fun. We're here to help.
