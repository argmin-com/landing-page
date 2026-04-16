# Testing

Validation and testing rules for this project. There is no unit test suite — quality is enforced through structural validators, Lighthouse audits, and visual regression.

## Before every PR

Run the full audit chain:

```bash
npm run audit:site
```

This executes in sequence:
1. `npm run check` — Astro type diagnostics
2. `npm run build` — static site build
3. `npm run validate:contact-fallbacks` — form fail-closed integrity
4. `npm run validate:redirects` — redirect rules
5. `npm run validate:navbar` — navigation consistency
6. `npm run validate:canonical` — canonical URL correctness
7. `npm run validate:formspree-health` — Formspree endpoint validation
8. `npm run validate:page-structure` — per-page content minimums
9. `npm run validate:design-tokens` — no hardcoded colors

If any step fails, stop and fix before opening the PR.

## When to run specific validators

| Change type | Required validators |
|---|---|
| Content (pages, components, copy) | `validate:page-structure`, `validate:contact-fallbacks` |
| Styles (CSS, Tailwind classes) | `validate:design-tokens` |
| Navigation (site.ts, nav components) | `validate:navbar`, `validate:redirects` |
| Form changes | `validate:contact-fallbacks`, `validate:contact-configured` |
| SEO (meta, canonical, sitemap) | `validate:canonical` |
| Any change | `npm run check` + `npm run build` (always) |

## Formspree contact path

Test both states:

```bash
# Without Formspree (fallback mode)
npm run build && npm run validate:contact-fallbacks

# With Formspree (configured mode)
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
```

## Lighthouse (CI gate)

CI runs Lighthouse on 5 routes with these thresholds:
- Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO = 100
- LCP <= 2500ms
- Total transfer <= 250KB

Run `npm run audit:site` locally to approximate. For full Lighthouse, use browser DevTools or `npx lighthouse`.

## Accessibility

- pa11y runs WCAG 2.1 AA checks in CI (warning, not blocking).
- The `a11y-reviewer` agent checks ARIA attributes, keyboard navigation, focus management, and contrast.
- Every interactive component (tabs, forms, details/summary) must have proper ARIA roles.

## Visual regression

- CI runs visual regression via `visual-regression.yml` (warning, not blocking).
- For local visual testing, use Playwright:
  ```bash
  npx playwright test
  ```
- Before/after screenshots at 375px + 1440px in light + dark themes are required for visual changes.

## Validation script patterns

When writing new validators in `scripts/`:
- Read the built HTML from `dist/` (not source files).
- Exit with code 0 on success, non-zero on failure.
- Print clear pass/fail output with file paths and line numbers.
- See `.github/instructions/validators.instructions.md` for Copilot-specific validator patterns.
