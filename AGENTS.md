# Agent Catalog

Specialist subagents available in this repository. Each runs in an isolated context window and produces a verdict -- not code changes. The orchestrator (Claude Code session) implements their recommendations.

For detailed documentation, workflows, and invocation patterns, see [`docs/agents/README.md`](docs/agents/README.md).

## Subagents

| Agent | Description | Trigger |
|---|---|---|
| `content-guardian` | Verifies content was not silently deleted or weakened. Enforces cardinal rule from content-standards.md. | Any edit to `src/pages/**`, `src/components/**`, or `src/content/**` |
| `design-token-auditor` | Verifies compliance with design-system.md tokens. Catches hardcoded colors, wrong radii, missing hover states. | Any edit to `.astro`, `.css`, or files with style attributes |
| `copywriter` | Writes and edits marketing copy following brand voice and content standards. | Writing or editing marketing copy on subpages |
| `ux-reviewer` | Runs the full ux-review-guide.md checklist. Checks hierarchy, spacing, dark mode, mobile, professional benchmark. | Any visual or layout change |
| `seo-auditor` | Validates meta tags, canonical URLs, JSON-LD, sitemap, Open Graph, Twitter cards. | Meta tags, canonical URLs, sitemap, or structured data changes |
| `a11y-reviewer` | Checks ARIA attributes, keyboard navigation, focus management, contrast, WCAG 2.1 AA compliance. | Interactive component changes (tabs, forms, details/summary, nav) |
| `release-engineer` | Diagnoses CI failures, reviews dependency changes, validates deploy config. Runs pre-merge build chain. | Dependencies, CI workflows, deploy config changes, or CI failures |
| `code-reviewer` | Senior code reviewer evaluating security, quality, patterns, and best practices. | Thorough PR review beyond visual/content checks |
| `planner` | Expert planning for complex features and refactoring. Produces structured implementation plans. | Complex feature requests or architectural changes |
| `doc-updater` | Ensures README, assistant-guide, design-system, content-standards stay in sync with code. | After significant changes to code or configuration |
| `harness-optimizer` | Meta-agent that evaluates and improves the Claude Code harness itself. Identifies gaps and redundancies. | Periodic evaluation or after significant harness changes |

## Invocation

```
Agent(subagent_type="content-guardian", prompt="Check the last 3 commits for content deletions")
```

For parallel review (recommended pre-merge):
```
Agent(subagent_type="content-guardian", prompt="...")
Agent(subagent_type="design-token-auditor", prompt="...")
Agent(subagent_type="ux-reviewer", prompt="...")
```

## Quick reference: which agent for which change

| Change type | Required agents |
|---|---|
| Page content edits | `content-guardian`, `copywriter` |
| Style/visual changes | `design-token-auditor`, `ux-reviewer` |
| New page or section | `content-guardian`, `seo-auditor`, `a11y-reviewer`, `ux-reviewer` |
| Interactive components | `a11y-reviewer`, `ux-reviewer` |
| CI/deploy changes | `release-engineer` |
| Any PR | `code-reviewer` |
| Complex planning | `planner` |
