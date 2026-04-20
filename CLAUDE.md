# CLAUDE.md

Read `docs/assistant-guide.md` before making any changes. It contains the shared repo invariants, architecture map, core commands, and working rules.

**For multi-agent orchestration guidance, read [`docs/agents/README.md`](docs/agents/README.md).** It documents the specialist subagents in `.claude/agents/`, the custom slash commands in `.claude/commands/`, and the standard workflows for coordinating them.

## Cardinal rules (never violate)

1. **Content is sacred.** Restructure to present better — never delete to simplify. See `docs/content-standards.md`.
2. **Use design tokens.** Never hardcode colors. See `docs/design-system.md`. The `validate-design-tokens` CI gate is blocking.
3. **The homepage (`src/pages/index.astro`) is off-limits** unless the user explicitly requests a change. Subpages and components are fair game.
4. **Every visual change needs before/after screenshots** at 375px + 1440px in both light and dark themes.
5. **Never bypass hooks** (`--no-verify`, `core.hooksPath=/dev/null`, etc.).
6. **Check dark mode before committing.**

## Autonomous execution

When the user gives a broad directive ("improve everything", "audit and fix", "proceed"), execute end-to-end using Workflow F in `docs/agents/README.md`. Do not pause for confirmation on mechanical fixes (contrast, radius, heading hierarchy, meta tags, CI thresholds, token compliance). Only pause when a change would alter page copy meaning, delete content, or restructure navigation. Run `/verify` before every commit. Report a consolidated summary when done.

## Tech Stack

Astro 6 + Tailwind CSS 4 + TypeScript 5.9 (strict) on Cloudflare Pages. Static output only (`npm run build` -> `dist/`). Node >= 22.12.0.

## CI Quality Gates (quality.yml)

All PRs and pushes to `main` must pass:

- `npm run check` (Astro diagnostics)
- `npm run build` (static build)
- `npm run validate:contact-fallbacks` (form fallback integrity)
- Lighthouse: Performance >= 90, Accessibility = 100, Best Practices = 100, SEO = 100
- LCP <= 2500ms, total transfer <= 150KB
- CodeQL static analysis
- Dependency review

Run `npm run audit:site` locally to approximate the Lighthouse gate.

## Key Files

- `src/pages/index.astro` — homepage
- `src/layouts/BaseLayout.astro` — shared metadata, analytics, global shell
- `src/components/ContactForm.astro` — shared form (3+ pages, HTML5 validation, honeypot, fail-closed Formspree)
- `src/content/site.ts` — navigation + footer config
- `src/styles/global.css` — theme tokens
- `astro.config.mjs` — site URL (`https://argmin.co`), Tailwind Vite plugin, @astrojs/sitemap
- `public/_headers` — Cloudflare security headers
- `wrangler.jsonc` — Cloudflare Workers config (observability traces enabled)

## Formspree Contract

The contact form requires `PUBLIC_FORMSPREE_URL`. When absent or invalid, the UI must expose a direct email fallback — never a broken submit button. This is validated in CI.

## Active Claude Code Harness

Project-local skills at `.claude/skills/`:
- **argmin-brand-voice** — voice rules, banned phrases, lint script for argmin.co copy
- **content-engine** — end-to-end marketing copy workflow (brand voice → validation → publish)
- **search-first** — pre-implementation codebase search to prevent duplication
- **verification-loop** — verify-fix-verify cycle pattern for CI gate compliance
- **strategic-compact** — context window management (summarize state, suggest compaction)

Skills installed globally at `~/.claude/skills/`:
- **GSD** (65+ skills) — planning, execution, code review, verification workflows
- **UI UX Pro Max** — auto-activating design intelligence (67 styles, 96 palettes, 57 font pairings, 13 tech stacks)
- **frontend-design** — opinionated visual design workflow (ECC, self-contained)
- **seo** — technical SEO audit and implementation (ECC, self-contained)
- **design-system** — generate/audit design tokens and visual consistency (ECC, self-contained)
- **browser-qa** — automated visual testing and interaction verification (ECC, self-contained)
- **e2e-testing** — Playwright patterns, POM, CI/CD integration (ECC, self-contained)
- **security-review** — OWASP checklist, input validation, secrets management (ECC, self-contained)
- **brand-voice** — source-derived writing style profiles (ECC, self-contained)
- **defuddle** — extract clean markdown from web pages, stripping clutter to save tokens

Rules at `~/.claude/rules/`:
- `web/design-quality.md` — anti-template policy; bans generic AI UI patterns (ECC)
- `typescript/patterns.md` — TypeScript idioms and type design (ECC)
- `common/security.md`, `patterns.md`, `testing.md`, `performance.md`, `coding-style.md`, `git-workflow.md` (ECC)

Plugins:
- **Claude Mem** — persistent cross-session memory (MCP search/timeline/corpus tools)
- **Superpowers** — structured development workflow (brainstorm, plan, TDD, review, 14 composable skills)

Hooks (settings.json):
- **Stop** — console.log check + blocks session end if tree is dirty or commits are unpushed
- **SessionStart** — GSD update check + session state restore
- **PreToolUse** — block-no-verify (vendored, blocks `--no-verify`/`core.hooksPath` bypass), config-protection (blocks linter/formatter config weakening), GSD guards (prompt, read, workflow, commit validation)
- **PostToolUse** — GSD context monitor + phase boundary, design-quality-check (warns on generic template drift in `.astro`/`.css`/`.tsx` files)
- **statusLine** — GSD project status

Design system generated at `design-system/argmin/MASTER.md` via UI UX Pro Max.

## Project-Specific Rules

- This is a marketing site. Copy, positioning, and visual design matter as much as code quality.
- Prefer small, reviewable changes over broad refactors.
- Do not change route structure, page copy, or asset selection unless the task requires it.
- Run `npm run audit:site` before considering UI/layout work complete.
- The site must remain statically buildable for Cloudflare Pages at all times.
