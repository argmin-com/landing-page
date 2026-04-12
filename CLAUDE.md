# CLAUDE.md

Read `docs/assistant-guide.md` before making any changes. It contains the shared repo invariants, architecture map, core commands, and working rules.

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
- `astro.config.mjs` — site URL (`https://argmin.co`), Tailwind Vite plugin
- `public/_headers` — Cloudflare security headers

## Formspree Contract

The contact form requires `PUBLIC_FORMSPREE_URL`. When absent or invalid, the UI must expose a direct email fallback — never a broken submit button. This is validated in CI.

## Active Claude Code Harness

Skills installed globally at `~/.claude/skills/`:
- **GSD** (65+ skills) — planning, execution, code review, verification workflows
- **UI UX Pro Max** — auto-activating design intelligence (styles, palettes, typography)
- **frontend-design** — opinionated visual design workflow (ECC)
- **seo** — technical SEO audit and implementation (ECC)
- **design-system** — generate/audit design tokens and visual consistency (ECC)
- **browser-qa** — automated visual testing and interaction verification (ECC)
- **e2e-testing** — Playwright patterns, POM, CI/CD integration (ECC)
- **security-review** — OWASP checklist, input validation, secrets management (ECC)
- **brand-voice** — source-derived writing style profiles (ECC)

Plugins:
- **Claude Mem** — persistent cross-session memory (MCP search/timeline tools)
- **Superpowers** — structured development workflow (brainstorm, plan, TDD, review)

Hooks (settings.json):
- **Stop** — blocks session end if tree is dirty or commits are unpushed
- **SessionStart** — GSD update check + session state restore
- **Pre/PostToolUse** — GSD guards (prompt, read, workflow, commit validation, context monitor, phase boundary)
- **statusLine** — GSD project status

## Project-Specific Rules

- This is a marketing site. Copy, positioning, and visual design matter as much as code quality.
- Prefer small, reviewable changes over broad refactors.
- Do not change route structure, page copy, or asset selection unless the task requires it.
- Run `npm run audit:site` before considering UI/layout work complete.
- The site must remain statically buildable for Cloudflare Pages at all times.
