# Assistant Guide

Shared repository instructions for coding assistants working in this project.

## Project Summary

- Product: static marketing site for `argmin.co`
- Framework: Astro 6 with Tailwind CSS 4
- Deployment target: Cloudflare Pages
- Form handling: Formspree, fail-closed when `PUBLIC_FORMSPREE_URL` is absent or invalid

## Core Commands

Run these from the repository root:

```bash
npm install
npm run check
npm run build
npm run validate:contact-fallbacks
npm run validate:page-structure
npm run validate:design-tokens
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
npm run audit:site
```

## Architecture Map

- `src/layouts/BaseLayout.astro`: shared metadata, analytics bootstrap, global shell
- `src/components/`: reusable page sections, navigation, and shared contact form
- `src/pages/`: site routes
- `src/content/site.ts`: shared navigation and footer content
- `src/lib/contact.ts`: shared contact email constant
- `src/lib/formspree.ts`: Formspree URL sanitization
- `src/styles/global.css`: global theme tokens and shared styling primitives
- `public/`: static assets
- `docs/design-system.md`: design tokens, component patterns, quality rules
- `docs/content-standards.md`: content governance, per-page requirements
- `docs/ux-review-guide.md`: step-by-step UX quality review protocol
- `docs/requirements-matrix.md`: implementation traceability and validation evidence

## Repo Invariants

- Preserve the existing Astro, TypeScript, and Tailwind conventions.
- Keep the site statically buildable for Cloudflare Pages.
- Do not hardcode live secrets or production-only environment values.
- Preserve the fail-closed Formspree behavior. If the endpoint is missing or invalid, the UI must expose the direct email fallback instead of enabling submission.
- Do not remove or weaken validation commands in CI without a clear repository-level reason.
- Prefer small, reviewable changes over broad refactors.

## Content Governance (CRITICAL)

**Cardinal rule: Restructure to present better. Never delete to simplify.**

- Do not remove page sections, paragraphs, data points, or qualifying language unless the task explicitly requires it AND the removal is justified in the PR.
- Do not change route structure, page copy, or asset selection unless the task requires it.
- If content looks cluttered, fix the layout — not the content.
- Run `npm run validate:page-structure` after any content change. It enforces per-page minimums.
- Read `docs/content-standards.md` before modifying any page content.

## Design System Rules (CRITICAL)

- Read `docs/design-system.md` before writing any CSS or markup.
- Use `--color-argmin-*` tokens. Never hardcode hex colors or use non-token Tailwind colors (amber-50, green-600, etc.).
- Use the type scale classes (`.section-title`, `.section-kicker`, etc.). Do not create one-off font sizes for headings.
- Use the three approved border-radius values: panel (1.75rem), card (rounded-xl), pill (rounded-full).
- Do not add `py-*` to `<section>` elements. Section spacing is handled by `--section-gap` CSS var.
- Run `npm run validate:design-tokens` after any styling change. It catches hardcoded colors.
- Every interactive element needs hover, focus-visible, and active states.
- Check dark mode before committing.

## UX Quality Rules

- Apply `.rise-in` entrance animations to section headings and key content blocks on subpages.
- Cards (`.surface-panel`) must have hover state (translate-y or shadow lift).
- Before/after screenshots at 375px and 1440px in both themes are required for visual changes.
- Read `docs/ux-review-guide.md` and check the review checklist before marking work complete.

## Working Rules

- Read the files you will modify plus their direct dependencies before editing.
- Match the existing style and file organization.
- For non-trivial changes, validate with `npm run audit:site` before considering the work complete.
- Keep tool-specific instruction files thin. If repository guidance changes, update this file first and have entrypoint files reference it.

## Current Validation Baseline

As of April 12, 2026, the repository passes:

- `npm run check`
- `npm run build`
- `npm run validate:contact-fallbacks`
- `npm run validate:page-structure`
- `npm run validate:design-tokens`
- `npm run audit:site`
- `PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured`
