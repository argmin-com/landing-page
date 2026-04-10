<!--
Thanks for contributing to the Argmin landing page.

Keep PRs small and focused. If you are changing the product copy,
visual layout, or the contact form, please include a screenshot or
short clip so the review can happen in one pass.
-->

## Summary

<!-- 1–3 bullet points describing the "why" of the change, not just the "what". -->

-
-

## Screenshots / video

<!--
Attach before/after screenshots for visual changes.
Mobile (375px) + desktop (1280px) is ideal for any layout change.
Delete this section for pure refactors or content copy changes.
-->

## Test plan

- [ ] `npm run check` passes with 0 errors / 0 warnings
- [ ] `npm run build` succeeds
- [ ] `npm run validate:contact-fallbacks` passes
- [ ] Manually verified affected page at 375px and ≥1280px
- [ ] Manually verified dark-mode rendering on affected pages
- [ ] No new console errors or 404s on the affected pages

## Impact / risk

<!--
Anything that could regress:
- Lighthouse perf/a11y/best-practices/seo scores
- Cloudflare Pages deploy
- Contact form (Formspree endpoint contract)
- SEO (route, canonical, sitemap)
- Analytics events
-->

## Related

<!-- Link to the issue, audit item, or design this addresses. -->

- Closes #
- Audit ref:
