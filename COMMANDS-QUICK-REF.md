# Slash Commands Quick Reference

All available slash commands grouped by category. For detailed docs, see [`docs/agents/README.md`](docs/agents/README.md).

## Core Workflow

| Command | Description |
|---|---|
| `/plan <description>` | Create a structured implementation plan for a feature or change. Delegates to planner subagent. |
| `/ship-pr <title>` | Build, validate, commit, push, and open a PR. Monitors CI and prompts to fix failures. |
| `/verify` | Run the complete verification chain: build, typecheck, all validators, both contact paths. |

## Quality

| Command | Description |
|---|---|
| `/audit-site` | Run the full local audit chain. Fast pre-PR sanity check with broader validation coverage than the CI gates in quality.yml. |
| `/full-audit` | Parallel audit by all specialist subagents. Produces a consolidated quality report with scores. |

## Review

| Command | Description |
|---|---|
| `/review-pr <N>` | Pull a PR diff and run the full UX review checklist plus specialist subagent review. |

## CI/CD

| Command | Description |
|---|---|
| `/triage-ci [PR or branch]` | Fetch recent CI failures and diagnose root causes with classification. |
| `/handoff-to-copilot <type> <ref>` | Create a labeled issue or request Copilot review on an existing PR. Types: `issue`, `pr-review`. |

## Meta/Harness

| Command | Description |
|---|---|
| `/evolve` | Evaluate and improve the Claude Code harness itself. Delegates to harness-optimizer subagent. |
| `/update-docs` | Refresh repository documentation to match current code state. Delegates to doc-updater. |

## Content

| Command | Description |
|---|---|
| Brand voice lint | `node .claude/skills/argmin-brand-voice/lint.mjs <file>` (not a slash command, but a key content tool) |

## npm scripts (not slash commands, but frequently used)

```bash
npm run check              # Astro type diagnostics
npm run build              # Static site build
npm run audit:site         # Full audit chain (check + build + all validators)
npm run validate:contact-fallbacks    # Form fail-closed integrity
npm run validate:page-structure       # Per-page content minimums
npm run validate:design-tokens        # No hardcoded colors
npm run validate:navbar               # Navigation consistency
npm run validate:canonical            # Canonical URL correctness
npm run validate:redirects            # Redirect rules
npm run validate:formspree-health     # Formspree endpoint check
```
