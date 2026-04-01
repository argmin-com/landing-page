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
npm install --legacy-peer-deps
npm run check
npm run build
npm run validate:contact-fallbacks
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
- `docs/requirements-matrix.md`: implementation traceability and validation evidence

## Repo Invariants

- Preserve the existing Astro, TypeScript, and Tailwind conventions.
- Keep the site statically buildable for Cloudflare Pages.
- Do not hardcode live secrets or production-only environment values.
- Preserve the fail-closed Formspree behavior. If the endpoint is missing or invalid, the UI must expose the direct email fallback instead of enabling submission.
- Do not remove or weaken validation commands in CI without a clear repository-level reason.
- Prefer small, reviewable changes over broad refactors.

## Working Rules

- Read the files you will modify plus their direct dependencies before editing.
- Match the existing style and file organization.
- Do not change route structure, page copy, or asset selection unless the task requires it.
- For non-trivial changes, validate with `npm run audit:site` before considering the work complete.
- Keep tool-specific instruction files thin. If repository guidance changes, update this file first and have entrypoint files reference it.

## Current Validation Baseline

As of April 1, 2026, the repository passes:

- `npm run check`
- `npm run build`
- `npm run validate:contact-fallbacks`
- `npm run audit:site`
- `PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured`
