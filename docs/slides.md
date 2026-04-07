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

> At Voyado, every feature follows this path — from a customer problem to live code serving millions of users.

---

### Slide 2: Enter AI-Augmented Software Engineering

**AI doesn't replace the developer — it amplifies them.**

The industry calls this **AI-augmented software engineering** (Gartner's term). The idea: AI tools work alongside developers at every stage of the SDLC — not just code completion.

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

### Slide 3: The Spectrum — From Copilot to Agent

**Where are we on the AI autonomy scale?**

```
Manual          AI-Assisted          AI-Augmented          AI-Driven
  |                  |                    |                    |
  Write everything   Autocomplete        AI handles full      AI makes
  by hand            & suggestions       workflows with       architectural
                                         human guidance       decisions
                                              ^
                                         You are here today
```

- **AI-Assisted** = Copilot autocomplete, chat Q&A (you drive, AI suggests)
- **AI-Augmented** = AI executes full tasks — generates a PRD, plans a sprint, implements a story — but you review and approve (today's workshop)
- **AI-Driven** = AI makes design decisions autonomously (not quite there yet for production)

> Today you'll experience **AI-augmented development**: you give the AI a skill to run, it does the heavy lifting, you review and approve.

---

### Slide 4: What You'll Do Today

**45 minutes building + 30 minutes Show & Tell. 6 teams. Real code. Deployed to the cloud.**

```
Read Requirements ──► Create PRD ──► Plan Sprint ──► Implement ──► Review ──► Push & Merge ──► Live!  ──► Demo!
     5 min              5 min         5 min         20 min        5 min        5 min              30 min
```

Each team gets:
- A **module** inside a real monorepo (React + TypeScript)
- **Business requirements** describing what to build
- **AI skills** that guide you through every step
- A **feature branch** for your code
- A **CI/CD pipeline** that deploys your code to the cloud when you merge

> At the end, your code will be live at a real URL — just like shipping a feature at Voyado.

---

## PART 2: Your Workshop Workflow — Branching, Skills & Steps

---

### Slide 5: Git Branching — How Your Code Gets to Production

**One rule: never push directly to `main`.**

```
main ─────────────────────────────────────────────────► (always deployable)
  │
  └── team-5/rewards-store ──► commits ──► Push ──► PR ──► Review ──► Merge ──► Deploy
       (your feature branch)
```

**What you do:**

| Step | Command |
|------|---------|
| Create your branch | `git checkout -b team-{n}/feature-name` |
| Work & commit often | `git add . && git commit -m "feat: add reward cards"` |
| Push when ready | `git push -u origin team-{n}/feature-name` |
| Create a Pull Request | On GitHub, target `main` |
| Mentor reviews & approves | On GitHub |
| Merge | GitHub merge button |
| Deployed automatically | CI/CD → Azure Static Web Apps |

> The dashboard updates live — we can see your branch, your PR, and your deployment status in real time.

---

### Slide 6: Your AI Toolkit — Workshop Skills

**We built a set of AI skills for this workshop.** Each skill guides the AI through a specific part of the SDLC. You trigger them with a slash command or just ask in natural language.

| Skill | Command | What it does |
|-------|---------|-------------|
| **Help** | `/voyado-help` | Onboard your team, check progress, see what to do next |
| **PRD** | `/voyado-prd` | Read your requirements and generate a Product Requirements Document |
| **UX** | `/voyado-ux` | *(Optional)* Generate UX design guidelines with Essence design tokens |
| **Plan** | `/voyado-plan` | Break the PRD into epics and implementable stories |
| **Implement** | `/voyado-impl` | Pick up the next story and write the code |
| **Review** | `/voyado-review` | Review your code for quality, conventions, and accessibility |
| **Status** | `/voyado-status` | See your full progress at any time |

**You can also just ask in natural language:**
- "Help me get started" → triggers voyado-help
- "Create my PRD" → triggers voyado-prd
- "Implement the next story" → triggers voyado-impl

> Works in **Claude Code**, **GitHub Copilot**, and **Codex** — same skills, all IDEs.

---

### Slide 7: The Step-by-Step Workshop Flow

**Follow this sequence. The AI guides you through each step.**

| # | Step | Skill | Time | What you do | What AI does |
|---|------|-------|------|-------------|-------------|
| 1 | **Onboard** | `/voyado-help` | 2 min | Answer team questions | Saves your team data, syncs everything |
| 2 | **Understand** | *(read docs)* | 3 min | Read `docs/requirements.md` in your team's folder | — |
| 3 | **Create PRD** | `/voyado-prd` | 5 min | Answer 3-5 interview questions about priorities | Generates a full PRD from your requirements |
| 4 | **Plan Sprint** | `/voyado-plan` | 5 min | Review the proposed stories | Breaks PRD into epics and stories with files, data, components |
| 5 | **Implement** | `/voyado-impl` | 20 min | Review code, run it, iterate | Implements one story at a time, following all conventions |
| 6 | **Review** | `/voyado-review` | 5 min | Fix any blocking issues | Reviews code quality, auto-fixes trivial issues |
| 7 | **Ship** | *(git + GitHub)* | 5 min | Push, create PR, get mentor approval | — |
| 8 | **Demo** | *(Show & Tell)* | 30 min | Each team presents their module to everyone | — |

**After each step:** the AI suggests a commit message. Say "yes" and it commits for you.

**Check progress anytime:** run `/voyado-status` or `/voyado-help` to see where you are and what's next.

---

### Slide 8: Let's Build!

**Your checklist to get started:**

- [ ] Clone the repo and run `pnpm install`
- [ ] Open your AI tool (Claude Code, Copilot, or Codex)
- [ ] Create your feature branch: `git checkout -b team-{n}/your-feature`
- [ ] Run `/voyado-help` to onboard your team
- [ ] Follow the workflow — the AI will guide you

**Team assignments:**

| Team | Module | Route | What you build |
|------|--------|-------|---------------|
| Team 1 | Loyalty Dashboard | `/loyalty` | Member stats, tier distribution, points economy |
| Team 2 | Product Catalog | `/products` | Product grid, filters, search, wishlist |
| Team 3 | Customer Segments | `/segments` | Segment builder with targeting rules |
| Team 4 | Campaign Builder | `/campaigns` | Campaign creation wizard with templates |
| Team 5 | Rewards Store | `/rewards` | Reward catalog, point redemption, history |
| Team 6 | Analytics Overview | `/analytics` | KPI charts, metrics, date ranges |

> Your mentor is here to help. Ask questions. Use the AI. Ship code. Have fun.
