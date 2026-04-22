# Agent Instructions

This repository supports multiple coding assistants. Use this file as the entrypoint, then follow the shared repository guidance in [`docs/assistant-guide.md`](docs/assistant-guide.md).

## Read this first

Before making changes:

1. Read [`docs/assistant-guide.md`](docs/assistant-guide.md).
2. Read [`README.md`](README.md) for product, route, deployment, and validation context.
3. Read [`docs/design-system.md`](docs/design-system.md) before any visual, layout, CSS, or component work.
4. Read [`docs/content-standards.md`](docs/content-standards.md) before any copy, content-structure, or IA change.
5. Read [`docs/ux-review-guide.md`](docs/ux-review-guide.md) before closing any visual task.
6. Read the files you plan to modify and their direct dependencies before editing.

## Core operating rules

- GitHub is the production source of truth.
- Figma is the editable visual specification, not the source of production code.
- Preserve Astro 6, Tailwind CSS 4, static Cloudflare Pages output, and the current route structure unless the task explicitly requires otherwise.
- Preserve the fail-closed Formspree contract.
- Prefer editing existing components and tokens before introducing new abstractions.
- Prefer small, reviewable changes over broad refactors.

## Critical rules

- **Content is sacred.** Restructure to present better. Never delete to simplify. See `docs/content-standards.md`.
- **Use design tokens.** Never hardcode colors. See `docs/design-system.md`.
- **Check dark mode.** Every visual change must work in both themes.
- **Validate before finishing.** Run the required repository checks for the change.
- **Do not weaken guardrails.** Do not bypass hooks, CI checks, or validation commands.

## Figma-driven implementation workflow

When a task starts from Figma:

1. Use the Figma frame or section as the visual specification.
2. Inspect the frame with the available Figma tooling.
3. Map the design change to the existing Astro components, content config, and design tokens.
4. Implement the change in code instead of exporting generated code from Figma.
5. Validate with the repository commands below.
6. Summarize any intentional differences between the Figma frame and the final implementation.

Recommended validation sequence:

```bash
npm install
npm run check
npm run build
npm run validate:contact-fallbacks
npm run validate:page-structure
npm run validate:design-tokens
npm run audit:site
```

For configured contact-form validation when relevant:

```bash
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
```

## Specialist review catalog

Specialist subagents available in this repository. Each runs in an isolated context window and produces a verdict, not code changes. The orchestrator implements their recommendations.

For detailed documentation, workflows, and invocation patterns, see [`docs/agents/README.md`](docs/agents/README.md).

| Agent | Description | Trigger |
|---|---|---|
| `content-guardian` | Verifies content was not silently deleted or weakened. Enforces cardinal rule from content-standards.md. | Any edit to `src/pages/**`, `src/components/**`, or `src/content/**` |
| `design-token-auditor` | Verifies compliance with design-system.md tokens. Catches hardcoded colors, wrong radii, missing hover states. | Any edit to `.astro`, `.css`, or files with style attributes |
| `copywriter` | Writes and edits marketing copy following brand voice and content standards. | Writing or editing marketing copy on subpages |
| `ux-reviewer` | Runs the full ux-review-guide.md checklist. Checks hierarchy, spacing, dark mode, mobile, professional benchmark. | Any visual or layout change |
| `seo-auditor` | Validates meta tags, canonical URLs, JSON-LD, sitemap, Open Graph, Twitter cards. | Meta tags, canonical URLs, sitemap, or structured data changes |
| `a11y-reviewer` | Checks ARIA attributes, keyboard navigation, focus management, contrast, WCAG 2.1 AA compliance. | Interactive component changes |
| `release-engineer` | Diagnoses CI failures, reviews dependency changes, validates deploy config. Runs pre-merge build chain. | Dependencies, CI workflows, deploy config changes, or CI failures |
| `code-reviewer` | Senior code reviewer evaluating security, quality, patterns, and best practices. | Thorough PR review beyond visual/content checks |
| `planner` | Expert planning for complex features and refactoring. Produces structured implementation plans. | Complex feature requests or architectural changes |
| `doc-updater` | Ensures README, assistant-guide, design-system, content-standards stay in sync with code. | After significant changes to code or configuration |
| `harness-optimizer` | Evaluates and improves the assistant harness itself. Identifies gaps and redundancies. | Periodic evaluation or after significant harness changes |
| `directive-router` | Classifies a user directive into the right workflow (A-H) for autopilot. | Start of every autopilot run |
| `visual-polish-reviewer` | UI/UX quality beyond WCAG and tokens: hierarchy, density, whitespace, card design, motion. | Visual quality directives or when the site feels generic |
| `deploy-verifier` | Confirms Cloudflare Workers Builds success and live site reflects the change. | End of every autopilot run |

## Quick reference

| Change type | Required review agents |
|---|---|
| Page content edits | `content-guardian`, `copywriter` |
| Style or visual changes | `design-token-auditor`, `ux-reviewer` |
| New page or section | `content-guardian`, `seo-auditor`, `a11y-reviewer`, `ux-reviewer` |
| Interactive components | `a11y-reviewer`, `ux-reviewer` |
| CI or deploy changes | `release-engineer` |
| Any substantial PR | `code-reviewer` |
| Complex planning | `planner` |
| Broad directive (autopilot) | `directive-router` → all relevant specialists |
