# Diagram Restore Verification (`r964`)

## Automated checks

- `npm run check`
- `npm run test:diagram:unit`
- `npm run build`
- `npm run test:diagram:integration`
- `npm run validate:contact-fallbacks`

All commands passed on `feature/restore-old-diagram-r964`.

## Visual regression artifacts

Local screenshot paths:

- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-baseline-desktop.png`
- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-current-desktop.png`
- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-baseline-mobile.png`
- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-current-mobile.png`
- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-region-baseline-desktop.png`
- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-region-current-desktop.png`
- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-region-baseline-mobile.png`
- `/Users/richardmckinney/Documents/landing-page-actions/output/playwright/r964-region-current-mobile.png`

Diff results:

- Full figure diff at tolerance `2`:
  - desktop: `64.7868%`
  - mobile: `89.4082%`
- Critical shared SVG region diff at tolerance `2`:
  - desktop: `0.0%`
  - mobile: `0.0%`

Investigation note:

- The full figure diff is intentionally large because the restore adds the old attribution detail card below the existing Charlotte SVG. The shared SVG interaction region was checked separately and stays visually unchanged within the antialiasing tolerance.

## Accessibility

- Keyboard hover/focus behavior is covered by:
  - `tests/attribution-diagram.unit.test.mjs`
  - `tests/attribution-diagram.integration.test.mjs`
- Lighthouse accessibility median improved from `96` on the baseline to `97` on the restored build.

## Performance

Lighthouse medians across three runs on local static servers:

- Baseline:
  - performance: `100`
  - accessibility: `96`
  - best-practices: `100`
  - seo: `100`
  - lcp: `1202 ms`
  - transfer: `86.2 KB`
- Current:
  - performance: `100`
  - accessibility: `97`
  - best-practices: `100`
  - seo: `100`
  - lcp: `1352 ms`
  - transfer: `99.9 KB`

Notes:

- The current build remains under the repo CI transfer budget of `100 KB`.
- Performance score stayed flat at `100`.
- LCP increased by about `12.4%` versus baseline while staying well below the existing CI budget of `2500 ms`. Further reduction would require removing visible detail density from the restored panel.
