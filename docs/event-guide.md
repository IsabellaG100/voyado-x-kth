# Voyado x KTH Medieteknik — Event Documentation

## Event Overview

| | |
|---|---|
| **Event** | Voyado x KTH Medieteknik Workshop |
| **Host** | Voyado |
| **Partner** | KTH Royal Institute of Technology — Medieteknik program |
| **Venue** | Voyado Office |
| **Attendees** | ~30 students from KTH Medieteknik |
| **Format** | Talks (1h) + Dinner & Team Formation (30min) + Workshop (1.5h) |
| **Total Duration** | 3 hours |

### Purpose

Give KTH Medieteknik students a real-world window into how a product-led tech company builds and ships software. The event moves from inspiration (talks) to action (workshop), letting students experience a professional engineering workflow firsthand — branching, pull requests, CI/CD pipelines, cloud deployment, and AI-assisted development.

---

## Event Agenda

### At a Glance

| Time | Duration | Section | Led By |
|------|----------|---------|--------|
| 18:00 | 20 min | Keynote — Voyado, Empowered Teams & AI Workflow | Voyado Leader |
| 18:20 | 10 min | Product Demo 1 — Bonnie (AI Chat/Agent) | Engineer 1 |
| 18:30 | 10 min | Product Demo 2 — Analytics Dashboards | Engineer 2 |
| 18:40 | 20 min | From Code to Customer: Branching, PRs, CI/CD & Workshop Setup | Engineer(s) |
| 19:00 | 30 min | 🍕 Dinner, Team Formation & Setup | All |
| 19:30 | 75 min | Hands-on Workshop (teams build features) | Mentors |
| 20:45 | 15 min | Show & Tell + Wrap-up | All |

---

## Part 1: Talks (18:00 – 19:00)

### 1.1 Keynote — Voyado, Empowered Teams & AI Workflow (20 min)

**Presenter:** Voyado Engineering Leader

**Goal:** Set the stage — who Voyado is, how modern product teams work, and how AI is transforming engineering workflows. This is the inspirational opener.

**Slide outline:**

| Slide | Title | Content |
|-------|-------|---------|
| 1 | Welcome | Title slide — "Voyado x KTH Medieteknik." Warm welcome, excitement to have students here. |
| 2 | About Voyado | Company overview — mission, customers, offices, scale. "We help brands understand and engage their customers." |
| 3 | Voyado Engage | One-slide product overview: loyalty, CRM, marketing automation — the platform context for today's apps. |
| 4 | What is an Empowered Team? | A team given a problem to solve, not a feature to build. They own the outcome, not just the output. |
| 5 | Team Anatomy | Product Manager + Designer + Engineers = one team. Everyone has context, everyone has input. No "throw it over the wall." |
| 6 | How We Work at Voyado | Shared understanding of the customer problem, autonomy to find the best solution, accountability for results. |
| 7 | AI as a Teammate | We don't just build AI products — we use AI to build. GitHub Copilot, ChatGPT, and other tools are part of our daily toolkit. |
| 8 | AI in Action | Live examples: Copilot autocompleting components, AI-assisted code review, writing docs, breaking down user stories, generating test data. |
| 9 | Prompt Engineering | Specific prompts → useful output. Vague prompts → garbage. Show a bad prompt vs. a good prompt for the same task. |
| 10 | Guardrails | What AI can't do: replace code review, guarantee correctness. "Trust but verify." Students will use AI hands-on in the workshop. |
| 11 | Today's Agenda | What's coming next — two product demos, then dinner, then you build and ship code to the cloud. |

---

### 1.2 Product Demo 1 — Bonnie (AI Chat/Agent) (10 min)

**Presenter:** Engineer 1

**Goal:** Quick, punchy demo of Bonnie — get students excited about AI in production. This is a demo, not a deep-dive.

**What is Bonnie:**
Bonnie is Voyado's AI-powered chat/agent — an intelligent conversational interface that helps brands interact with their customers at scale.

**Slide outline:**

| Slide | Title | Content |
|-------|-------|---------|
| 1 | Meet Bonnie | What Bonnie is — AI chat/agent for customer engagement. Hero screenshot. One-line elevator pitch. |
| 2 | The Problem It Solves | Brands can't have 1:1 conversations with 500,000 customers. Bonnie can. |
| 3 | Live Demo | Show Bonnie in action — a real conversation: greeting → product question → personalized recommendation. The "wow" moment. |
| 4 | What We Learned | "AI is easy to demo, hard to productize." One key engineering challenge (e.g., hallucination management). |

**Tips for presenter:**
- Keep it fast and visual — this is a 10-minute slot, lead with the demo
- One interactive moment: ask students "What would you want an AI shopping assistant to do?"

---

### 1.3 Product Demo 2 — Analytics Dashboards (10 min)

**Presenter:** Engineer 2

**Goal:** Show the intersection of data, design, and frontend — something Medieteknik students will relate to deeply.

**What are the Analytics Dashboards:**
Voyado's analytics dashboards give marketers real-time insights into customer behavior, campaign performance, and loyalty program health.

**Slide outline:**

| Slide | Title | Content |
|-------|-------|---------|
| 1 | Data Tells a Story | Why analytics matters — show a beautiful dashboard screenshot. "Numbers don't speak, dashboards give them a voice." |
| 2 | Design Meets Engineering | How do you decide what goes on a dashboard? Information hierarchy, progressive disclosure. Show before/after: raw data table vs. polished dashboard. |
| 3 | Live Demo | Tour a dashboard — filters, segments, date ranges. Show how a marketer answers a real question: "Why did retention drop 3% last month?" |
| 4 | Why Medieteknik Matters Here | Visual storytelling, interaction design, accessibility — these are the skills that make dashboards great, not just functional. |

**Tips for presenter:**
- Connect to their background — "You understand visual communication better than most engineers"
- Show one chart's journey: raw data → transformation → React component

---

### 1.4 From Code to Customer: Branching, PRs, CI/CD & Workshop Setup (20 min)

**Goal:** The technical core — walk students through the full journey of code from laptop to live URL, then explain the workshop format and the project they'll be working on.

**Slide outline:**

| Slide | Title | Content |
|-------|-------|---------|
| 1 | The Big Picture | Diagram: Developer → Feature Branch → Pull Request → Code Review → Merge → CI/CD → Cloud → Customer. "Every line of code you write today will travel this path." |
| 2 | Branching Strategy | What is `main`? Why don't we code directly on it? Feature branches: `team-1/add-points-display`. Visual: branch tree diagram. |
| 3 | Making Changes | The 5 commands they'll use: `git checkout -b` → write code → `git add` → `git commit` → `git push`. |
| 4 | Pull Requests | What a PR is: "Hey team, I made changes — please review." Show a real PR on GitHub: title, description, diff view. |
| 5 | Code Review | Why we review: catch bugs, share knowledge. Mentor reviews today. Show approving and requesting changes. |
| 6 | CI/CD Pipeline | Walk through `.github/workflows/deploy.yml` (simplified). Trigger → Install deps → Build → Deploy. Show the Actions tab. |
| 7 | Azure Static Web Apps | Your `dist/` folder → Microsoft's cloud → a URL anyone can visit. |
| 8 | The Full Loop (Live Demo) | Make a tiny change → push → PR → merge → watch pipeline → see it live. "You'll do this yourselves after dinner." |
| 9 | The Project | Introduce the monorepo: 6 apps, one per team. Each app is a Voyado Engage feature. Show the repo structure. |
| 10 | Workshop Format | How it works: read requirements → break down with AI → implement → PR → merge → deployed. |
| 11 | What You'll Need | GitHub account, Node.js, pnpm, VS Code + Copilot. Quick setup checklist. |

---

## Part 2: Dinner & Team Formation (19:00 – 19:30)

### Dinner (20 min)

Food is served. Students eat, mingle, and talk to Voyado engineers informally. This is intentionally social — let the talks sink in and let students connect with each other before teaming up.

### Team Formation & Setup (10 min)

- Form 6 teams of 5 students
- Assign each team to an app and a mentor
- Hand out team cards (team number, app name, mentor name, repo URL)
- Students clone the repo, run `pnpm install`, and verify their dev server works
- Mentors help troubleshoot setup issues

**Team assignment sheet:**

| Team | App | Mentor |
|------|-----|--------|
| Team 1 | `team-1-loyalty-dashboard` | TBD |
| Team 2 | `team-2-product-catalog` | TBD |
| Team 3 | `team-3-customer-segments` | TBD |
| Team 4 | `team-4-campaign-builder` | TBD |
| Team 5 | `team-5-rewards-store` | TBD |
| Team 6 | `team-6-analytics-overview` | TBD |

---

## Part 3: Hands-on Workshop (19:30 – 20:45)

### Workshop Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    WORKSHOP TIMELINE                        │
├──────────┬──────────────────────────────────────────────────┤
│  0–10min │ Read requirements, explore codebase              │
│ 10–20min │ Break down requirements into tasks using AI      │
│ 20–60min │ Implement features on feature branch             │
│ 60–70min │ Create PR, mentor review, merge                  │
│ 70–75min │ See your code live! 🎉                           │
└──────────┴──────────────────────────────────────────────────┘
```

### Phase 1: Understand the Problem (10 min)

Each team opens their app's `docs/` folder and reads the business requirements together.

**What they should do:**
- Read the requirements as a team
- Discuss what's most important (MVP vs. nice-to-have)
- Identify questions and ask their mentor

### Phase 2: Break Down with AI (15 min)

Teams use AI (GitHub Copilot, ChatGPT, etc.) to break down the requirements.

**Suggested approach:**
- Paste the requirements into an AI chat
- Ask: "Break these requirements into small, implementable tasks for a React app"
- Prioritize: What can we realistically build in 25 minutes?
- Create a quick task list (even on paper)

**Example prompt for students:**
> "Here are the business requirements for a loyalty dashboard app: [paste requirements]. Break these into small frontend tasks for a React + TypeScript app. Data comes from static JSON files. Prioritize the most impactful visual features."

### Phase 3: Build (40 min)

This is where students code. Each team works on their feature branch.

**Workflow they follow:**
1. `git checkout -b team-{n}/feature-name`
2. Write code — use AI for assistance
3. Import data from `data/` JSON files
4. Use shared components from `@voyado-kth/shared` when applicable
5. Run `pnpm --filter team-{n}-app-name dev` to see changes locally
6. Commit frequently: `git add . && git commit -m "feat: add points display"`
7. Push: `git push origin team-{n}/feature-name`

**Mentor role during this phase:**
- Float between team members, answer questions
- Help with git issues (merge conflicts, push errors)
- Encourage use of AI for implementation
- Don't write code for them — guide and unblock

### Phase 4: Ship It (10 min)

Each team creates a pull request on GitHub.

**Steps:**
1. Push final changes to the feature branch
2. Open a PR on GitHub targeting `main`
3. Write a brief PR description (what they built, what works)
4. Mentor reviews — approves or gives quick feedback
5. Merge to `main`
6. Watch the GitHub Actions pipeline run
7. Visit the deployed URL — their code is live!

**This is the magic moment** — students see their code travel from their laptop through a pipeline to a live URL.

---

## Part 4: Show & Tell + Wrap-up (20:45 – 21:00)

### Show & Tell (10 min)

- Each team gets ~1.5 minutes to show what they built
- Pull up the live deployed URL on the big screen
- Celebrate what they accomplished — even if it's small, it's real and deployed

### Wrap-up (5 min)

- Thank students for participating
- Recap what they learned:
  - ✅ Saw real products being built at Voyado
  - ✅ Used AI as a development tool
  - ✅ Experienced an empowered team workflow
  - ✅ Learned branching, PRs, and code review
  - ✅ Shipped code through a CI/CD pipeline to the cloud
- Share links: Voyado careers page, LinkedIn, any follow-up resources
- Invite students to connect and reach out

---

## App Descriptions & Slide Guides

### App 1: Loyalty Dashboard

**Business context:** The loyalty dashboard is the "home screen" for a brand's loyalty program manager. It answers: "How is our loyalty program performing right now?"

**What students build:** A dashboard showing member statistics, points economy, and tier distribution.

**Key data entities:** Members, loyalty tiers (Bronze, Silver, Gold, Platinum), points transactions, enrollment trends.

**Visual components:**
- Summary cards (total members, active members, avg. points balance)
- Tier distribution chart (pie or donut)
- Enrollment trend line chart (members over time)
- Recent member activity feed

**Slide for presentation:**
> *"Imagine you're a brand manager at a fashion retailer. You have 500,000 loyalty members. Are they engaged? Which tier is growing? Are members earning and burning points? The Loyalty Dashboard answers these questions at a glance — and Team 1 is going to build it."*

---

### App 2: Product Catalog

**Business context:** The product catalog is how customers discover and explore a brand's products. It's the foundation of any e-commerce experience.

**What students build:** A browsable product grid with filtering, search, and a wishlist feature.

**Key data entities:** Products (name, price, image URL, category, tags), categories, wishlist items.

**Visual components:**
- Product grid with cards (image, name, price, tag)
- Category/filter sidebar
- Search bar with instant filtering
- Wishlist toggle (heart icon on each product)
- Product detail view (click-through)

**Slide for presentation:**
> *"Every e-commerce site needs a product catalog. But a great one feels effortless — fast filtering, beautiful cards, and a wishlist that remembers what you love. Team 2 will build a catalog that makes browsing feel like window shopping on a sunny day."*

---

### App 3: Customer Segments

**Business context:** Segments are how marketers target the right customers with the right message. Instead of blasting everyone, you define groups: "VIP customers who haven't purchased in 30 days."

**What students build:** A segment builder UI where users define rules to create customer segments.

**Key data entities:** Segments (name, rules, customer count), customers (name, email, tier, last purchase, total spend).

**Visual components:**
- Segment list with customer counts
- Segment builder with rule rows (field + operator + value)
- Add/remove rule buttons
- Preview of matching customers
- Save segment form

**Slide for presentation:**
> *"A brand has 500,000 customers. You can't email all of them the same thing. Segments let marketers say: 'Show me Gold-tier members in Stockholm who spent over 5,000 SEK last quarter.' Team 3 is building the tool that makes that targeting possible."*

---

### App 4: Campaign Builder

**Business context:** Campaigns are how brands communicate — email, SMS, push notifications. A campaign builder lets marketers create, preview, and schedule communications without needing a developer.

**What students build:** A campaign creation interface with template selection, content editing, and a preview mode.

**Key data entities:** Campaigns (name, type, status, scheduled date), templates (layout, placeholder content), channels (email, SMS, push).

**Visual components:**
- Campaign list (name, channel, status, date)
- Create campaign wizard (step-by-step: choose channel → select template → edit content → preview → schedule)
- Template gallery with preview thumbnails
- Content editor with placeholder personalization (e.g., "Hi {{first_name}}")
- Campaign preview (how it looks in an inbox)

**Slide for presentation:**
> *"Every email you get from a brand was built by a marketer using a tool like this. They pick a template, write the message, add personalization ('Hi Sarah!'), preview it, and hit send to 50,000 people. Team 4 is building that tool — the Campaign Builder."*

---

### App 5: Rewards Store

**Business context:** A rewards store lets loyalty members spend their points on rewards — discounts, products, experiences. It's the "fun" part of a loyalty program and a key driver of engagement.

**What students build:** A rewards catalog where members can browse available rewards and "redeem" them with their points.

**Key data entities:** Rewards (name, description, image, points cost, category, availability), member (name, points balance), redemption history.

**Visual components:**
- Reward catalog grid (image, name, points cost)
- Category filters (discounts, products, experiences)
- Member points balance header
- Redeem button with points cost
- Confirmation modal ("Redeem 500 points for 20% off?")
- Redemption history list

**Slide for presentation:**
> *"You've been collecting points all year. Now you want to spend them. The Rewards Store is where loyalty becomes tangible — 'I have 2,000 points, I can get a free coffee or a 30% discount.' Team 5 is building the store where points turn into real value."*

---

### App 6: Analytics Overview

**Business context:** Analytics turns raw customer data into insights. Marketers and managers need to understand trends, measure campaign effectiveness, and track KPIs — all without writing SQL.

**What students build:** An analytics dashboard with interactive charts showing key business metrics.

**Key data entities:** KPIs (revenue, active customers, avg. order value, retention rate), time series data, campaign performance metrics, channel breakdown.

**Visual components:**
- KPI cards (revenue, active customers, avg. order value, retention rate)
- Line chart: revenue or active customers over time
- Bar chart: campaign performance comparison
- Donut chart: revenue by channel (web, app, in-store)
- Date range selector
- Metric comparison (this period vs. last period with ▲/▼ indicators)

**Slide for presentation:**
> *"Numbers don't lie, but they don't speak either. Analytics dashboards give numbers a voice. 'Revenue is up 12%, but retention dropped 3% — why?' Team 6 is building the dashboard that helps marketers ask and answer these questions visually."*

---

## Prerequisites & Setup

### For Organizers (Before the Event)

- [ ] Create the GitHub repository and invite all mentors as collaborators
- [ ] Set up Azure Static Web Apps (6 apps, one per team)
- [ ] Configure GitHub Actions secrets for Azure deployment
- [ ] Set up branch protection on `main` (require PR review)
- [ ] Test the full flow end-to-end: branch → PR → merge → deploy
- [ ] Prepare Wi-Fi credentials and share with students
- [ ] Print team assignment cards (team number, app name, mentor name, repo URL)
- [ ] Ensure all mentor laptops have the repo cloned and working

### For Students (Day Of)

- [ ] GitHub account (create one before arriving if possible)
- [ ] Node.js installed (LTS version, see `.nvmrc`)
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] Git installed and configured (`git config user.name` / `user.email`)
- [ ] Code editor (VS Code recommended, with GitHub Copilot extension)
- [ ] Clone the repository: `git clone <repo-url>`
- [ ] Install dependencies: `pnpm install`
- [ ] Verify it works: `pnpm --filter team-1-loyalty-dashboard dev`

---

## Mentor Guide

### Your Role

You are a guide, not a doer. Help students think through problems, unblock them when they're stuck, but let them write the code (with AI help).

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Git says I can't push" | They probably need to set upstream: `git push -u origin branch-name` |
| Merge conflicts | Help them through `git pull origin main` and resolving conflicts in the editor |
| "My app won't start" | Check they're in the right directory. Run `pnpm install` again. Check Node version. |
| "I don't know where to start" | Point them to `docs/` in their app. Suggest starting with the simplest visual component. |
| "Copilot isn't helping" | Help them write better prompts. Be specific about what component, what data, what behavior. |
| "We won't finish everything" | That's fine! Ship what works. A deployed half-app is better than a perfect local app. |

### Timeline Checkpoints

- **10 min in:** Teams should have read requirements and started planning
- **25 min in:** Teams should have their first component rendering
- **50 min in:** Nudge teams to start wrapping up and preparing their PR
- **60 min in:** All teams should be pushing and creating PRs
- **70 min in:** Merging and watching deployments

---

## Post-Event

- Share the deployed URLs with students so they can show friends/family
- Keep the repo public for a period so students can reference it
- Collect feedback: What did they enjoy? What was confusing? What would they change?
- Consider inviting standout students for internship conversations
- Share photos/recap on Voyado social media (with student consent)
