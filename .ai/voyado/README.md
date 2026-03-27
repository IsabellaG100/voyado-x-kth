# Voyado — Voyado x KTH Workshop Plugin

AI-driven SDLC workflow management for the Voyado x KTH Medieteknik workshop. Guides student teams through requirements analysis, design, planning, implementation, and code review.

## Workflow

```
/voyado:start → /voyado:prd → /voyado:ux (optional) → /voyado:plan → /voyado:impl → /voyado:review → commit & push → PR
```

## Commands (Claude Code)

| Command | Description | Prerequisite |
|---------|-------------|-------------|
| `/voyado:start` | Onboarding + workflow navigator (start here!) | None |
| `/voyado:status` | Detailed progress report | Onboarding complete |
| `/voyado:prd` | Create PRD from business requirements | Clean git state |
| `/voyado:ux` | Generate UX design guidelines (optional) | PRD exists |
| `/voyado:plan` | Create sprint backlog with epics/stories | PRD exists |
| `/voyado:impl` | Implement next story from backlog | Backlog exists |
| `/voyado:review` | Code review stories in review status | Stories in review |

## Story Status Flow

```
backlog → in_progress → review → done
```

## Workshop.json Step Mapping

| Step | Command | Required |
|------|---------|----------|
| `onboarding` | `/voyado:start` | Yes |
| `requirements` | `/voyado:prd` | Yes |
| `breakdown` | `/voyado:plan` | Yes |
| `implementation` | `/voyado:impl` | Yes |
| `pull-request` | Manual git push + PR | Yes |
| `review` | `/voyado:review` | Yes |
| `merge` | Manual / mentor | Yes |
| `deployed` | Automatic (CI/CD) | — |

## Multi-AI Support

This plugin provides equivalent instructions for multiple AI coding assistants:

| AI Agent | Instructions Location |
|----------|----------------------|
| **Claude Code** | `.ai/voyado/skills/` and `.ai/voyado/agents/` (native plugin) |
| **GitHub Copilot** | `.ai/voyado/copilot/workflow-instructions.md` (referenced from `.github/copilot-instructions.md`) |
| **OpenAI Codex** | `.ai/voyado/codex/AGENTS.md` |

## Generated Artifacts

Each team module produces these files during the workflow:

```
apps/team-{n}-*/docs/
  requirements.md    # BRD (pre-existing)
  prd.md             # Product Requirements Document (from /voyado:prd)
  ux-spec.md         # UX Design Spec (optional, from /voyado:ux)
  epics.md           # Human-readable sprint plan (from /voyado:plan)
  backlog.json       # Structured story backlog (from /voyado:plan)
```

## Installation (Claude Code)

```bash
# From the repo root
claude --plugin-dir .ai/voyado
```

Or add to your Claude Code project settings.

## Directory Structure

```
.ai/voyado/
├── .claude-plugin/
│   └── plugin.json          # Claude Code plugin manifest
├── skills/
│   ├── start/SKILL.md       # /voyado:start — onboarding + workflow navigator
│   ├── status/SKILL.md      # /voyado:status — progress report
│   ├── prd/SKILL.md         # /voyado:prd — PRD generator
│   ├── ux/SKILL.md          # /voyado:ux — UX designer
│   ├── plan/SKILL.md        # /voyado:plan — sprint planner
│   ├── impl/SKILL.md        # /voyado:impl — story implementer
│   └── review/SKILL.md      # /voyado:review — code reviewer
├── agents/
│   ├── prd-writer.md        # PRD generation agent
│   ├── ux-designer.md       # UX specification agent
│   ├── sprint-planner.md    # Epic/story breakdown agent
│   ├── story-implementer.md # Code implementation agent
│   ├── code-reviewer.md     # Code review agent
│   └── workshop-tracker.md  # Workshop.json state manager
├── copilot/
│   └── workflow-instructions.md  # GitHub Copilot instructions
├── codex/
│   └── AGENTS.md            # OpenAI Codex instructions
└── README.md
```
