<!--
Thanks for contributing to the Argmin landing page.

Keep PRs small and focused. Read docs/content-standards.md and
docs/design-system.md before making visual or content changes.
-->

## Summary

<!-- 1–3 bullet points describing the "why" of the change, not just the "what". -->

-
-

## Content impact

<!--
MANDATORY for any PR that modifies page content in src/pages/.
If this PR only touches CI, scripts, or config, write "N/A — no content changes."
-->

- [ ] No visible text was removed from any page
- [ ] No page sections were deleted or hidden
- [ ] All navigation paths (CTAs, cross-page links) still work
- [ ] Founder credentials, competitive positioning, and data points are intact

If content WAS removed, explain why:
<!--
Removing content requires explicit justification. "Simplifying" is not
sufficient — explain what replaces the removed content or why it was
genuinely redundant (appeared verbatim on another page).
-->

## Screenshots

<!--
MANDATORY for any PR that changes visual layout, CSS, or page content.
Provide before/after at BOTH viewports and BOTH themes.
If this PR only touches CI, scripts, or config, write "N/A — no visual changes."
-->

### Desktop (1440px)

| Light | Dark |
|-------|------|
| before | before |
| after | after |

### Mobile (375px)

| Light | Dark |
|-------|------|
| before | before |
| after | after |

## Test plan

- [ ] `npm run check` passes with 0 errors / 0 warnings
- [ ] `npm run build` succeeds
- [ ] `npm run validate:contact-fallbacks` passes
- [ ] `npm run validate:page-structure` passes
- [ ] `npm run validate:design-tokens` passes (or violations justified)
- [ ] Manually verified affected page at 375px and ≥1440px
- [ ] Manually verified dark-mode rendering on affected pages
- [ ] No new console errors or 404s on the affected pages
- [ ] Hover states, focus rings, and transitions work on modified elements

## Impact / risk

<!--
Anything that could regress:
- Lighthouse perf / a11y / best-practices / seo scores
- Cloudflare Pages deploy
- Contact form (Formspree endpoint contract)
- SEO (route, canonical, sitemap)
- Analytics events
- Content integrity (see docs/content-standards.md)
-->

## Related

<!-- Link to the issue, audit item, or design this addresses. -->

- Closes #
- Audit ref:
