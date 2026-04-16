# Multi-Agent Orchestration

This document explains how AI coding agents (Claude Code, Codex, Copilot) are coordinated on this repo. The architecture is designed so that **any agent can work independently** on a task while **specialist subagents provide focused review** before changes ship.

---

## Architecture overview

```
User request
    ↓
CLAUDE.md (entry point — reads cardinal rules + agent catalog)
    ↓
Orchestrator (Claude Code session)
    ├── delegates to subagents for review/audit
    ├── invokes slash commands for common workflows
    ├── uses skills for domain expertise (brand voice, design tokens)
    └── hands off to Copilot via labeled issues when appropriate
    ↓
PR → CI quality gates → merge
```

The **orchestrator** is the Claude Code session (or Copilot coding agent, or Codex). It reads CLAUDE.md, decides what needs doing, and delegates specialist work to subagents.

---

## Subagents (`.claude/agents/`)

Specialist agents that run in isolated context windows. They produce verdicts, not code changes. The orchestrator implements their recommendations.

| Agent | File | Trigger |
|---|---|---|
| `content-guardian` | `.claude/agents/content-guardian.md` | Any edit to `src/pages/**`, `src/components/**`, or `src/content/**` |
| `design-token-auditor` | `.claude/agents/design-token-auditor.md` | Any edit to `.astro`, `.css`, or files with style attributes |
| `copywriter` | `.claude/agents/copywriter.md` | Writing or editing marketing copy |
| `ux-reviewer` | `.claude/agents/ux-reviewer.md` | Any visual/layout change (pre-commit sanity) |
| `seo-auditor` | `.claude/agents/seo-auditor.md` | Meta tags, canonical URLs, JSON-LD, sitemap |
| `a11y-reviewer` | `.claude/agents/a11y-reviewer.md` | Interactive components, ARIA, focus management |
| `release-engineer` | `.claude/agents/release-engineer.md` | Dependencies, CI workflows, deploy config |

### How to invoke

In Claude Code, use the `Agent` tool with `subagent_type` set to the agent name:

```
Agent(subagent_type="content-guardian", prompt="Check if the last 3 commits deleted any content from src/pages/")
```

For parallel review (recommended pre-merge):
```
Agent(subagent_type="content-guardian", prompt="...")
Agent(subagent_type="design-token-auditor", prompt="...")
Agent(subagent_type="ux-reviewer", prompt="...")
```
(Send all three in one message for concurrent execution.)

---

## Slash commands (`.claude/commands/`)

One-keystroke workflows the orchestrator can invoke:

| Command | File | What it does |
|---|---|---|
| `/audit-site` | `.claude/commands/audit-site.md` | Runs `npm run audit:site` + configured contact build |
| `/ship-pr` | `.claude/commands/ship-pr.md` | Build, validate, commit, push, open PR, monitor CI |
| `/review-pr <N>` | `.claude/commands/review-pr.md` | Pull PR diff + parallel specialist review |
| `/full-audit` | `.claude/commands/full-audit.md` | All 6 specialist agents in parallel → consolidated score |
| `/triage-ci` | `.claude/commands/triage-ci.md` | Diagnose CI failures with root-cause classification |
| `/handoff-to-copilot` | `.claude/commands/handoff-to-copilot.md` | Create labeled issue or request Copilot review |

---

## Skills (`.claude/skills/`)

Deep domain knowledge bundles with embedded tools:

| Skill | Path | Purpose |
|---|---|---|
| `argmin-brand-voice` | `.claude/skills/argmin-brand-voice/` | Voice rules, banned phrases, lint script, tone anchors |

The brand voice skill includes a runnable lint script:
```bash
node .claude/skills/argmin-brand-voice/lint.mjs src/pages/platform.astro
```

---

## Hooks (`.claude/hooks/`)

Automated guardrails that fire on tool use:

| Hook | File | Trigger | Effect |
|---|---|---|---|
| `pre-write-design-tokens` | `.claude/hooks/pre-write-design-tokens.sh` | Before any Write/Edit to `.astro`/`.css` | Blocks hardcoded Tailwind colors or hex literals |

---

## Copilot integration

### Setup steps
`.github/copilot-setup-steps.yml` ensures the Copilot coding agent sandbox can run validators:
- Installs Node from `.nvmrc`
- Runs `npm ci`
- Warms Astro cache with `npm run check`

### Path-scoped instructions
`.github/instructions/*.instructions.md` provide file-pattern-specific rules:
- `astro-components.instructions.md` — token, typography, spacing rules for `.astro` files
- `styles.instructions.md` — token system rules for CSS
- `validators.instructions.md` — patterns for validation scripts

### Cross-agent handoff
Use `/handoff-to-copilot` to create an issue with `agent:copilot` label. Copilot's coding agent picks up labeled issues and opens draft PRs.

---

## Standard workflows

### A: Content change (safest path)
1. Orchestrator plans the change
2. `copywriter` drafts copy (respecting brand voice skill)
3. Orchestrator implements the edit
4. `content-guardian` verifies no content was lost
5. `ux-reviewer` checks visual impact
6. `/ship-pr` to push + PR + CI

### B: Visual/design change
1. Orchestrator implements using design-system.md tokens
2. `design-token-auditor` + `ux-reviewer` run in parallel
3. Before/after screenshots attached to PR body
4. `/ship-pr`

### C: New subpage or section
1. `content-guardian` confirms no duplication
2. `copywriter` drafts content
3. `seo-auditor` validates meta + canonical + sitemap
4. `a11y-reviewer` checks structural accessibility
5. Orchestrator implements
6. `/full-audit` for comprehensive check
7. `/ship-pr`

### D: CI fix or dependency update
1. `release-engineer` diagnoses the issue
2. Orchestrator applies the fix
3. `/audit-site` to verify
4. `/ship-pr`

---

## Quality gates (what CI enforces)

Every PR is gated by:

| Gate | Workflow | Blocking? |
|---|---|---|
| Astro typecheck | `quality.yml` | Yes |
| Static build | `quality.yml` | Yes |
| Contact fallbacks | `quality.yml` | Yes |
| Page structure | `quality.yml` | Yes |
| Design tokens | `quality.yml` | Yes |
| Lighthouse (5 routes) | `quality.yml` | Yes |
| pa11y WCAG AA | `quality.yml` | Warning |
| CodeQL SAST | `codeql.yml` | Yes |
| Dependency review | `dependency-review.yml` | Yes |
| Link check | `link-check.yml` | Yes |
| Visual regression | `visual-regression.yml` | Warning |
| Workers Builds deploy | External | Informational |

---

## Adding a new subagent

1. Create `.claude/agents/<name>.md` with frontmatter:
   ```yaml
   ---
   name: <name>
   description: <one line — this is what the orchestrator sees when deciding whether to invoke you>
   tools: Read, Grep, Glob, Bash
   model: sonnet
   ---
   ```
2. Define the agent's procedure, output format, and rules.
3. Add the agent to the catalog table in `CLAUDE.md`.
4. Add it to this README.
5. If the agent should run on every PR, add it to `/full-audit` command.

## Adding a new slash command

1. Create `.claude/commands/<name>.md` with frontmatter:
   ```yaml
   ---
   description: <short description shown in command list>
   allowed-tools: <comma-separated list of tool patterns>
   argument-hint: "<usage hint>"
   ---
   ```
2. Write the workflow steps.
3. Add to the command table in `CLAUDE.md` and this README.
