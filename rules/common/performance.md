# Performance

Performance rules enforced by CI Lighthouse gates and manual review.

## Budget

| Metric | Threshold | CI enforcement |
|---|---|---|
| Lighthouse Performance | >= 90 | Blocking |
| Lighthouse Accessibility | >= 95 | Blocking |
| Lighthouse Best Practices | >= 95 | Blocking |
| Lighthouse SEO | = 100 | Blocking |
| LCP | <= 2500ms | Blocking |
| Total transfer size | <= 250KB | Blocking |

These are CI-enforced blocking thresholds (see `.github/workflows/quality.yml`).

## Images

- Always use `<picture>` with WebP source and fallback format.
- Set explicit `width` and `height` attributes to prevent layout shift.
- Lazy load all images below the fold: `loading="lazy" decoding="async"`.
- Hero images (above the fold): `loading="eager" fetchpriority="high"`.
- Compress images before committing. Target < 50KB for hero, < 30KB for cards.
- Prefer SVG for icons and simple graphics.
- Images with white backgrounds need transparent versions or `rounded-lg` treatment for dark mode.

## Fonts

- Use system font stack or self-hosted fonts. No Google Fonts runtime loading.
- If custom fonts are used, subset them and use `font-display: swap`.
- Preload critical fonts with `<link rel="preload" as="font" crossorigin>`.

## JavaScript

- Astro renders static HTML by default. Keep it that way.
- Use `is:inline` for small client-side scripts (theme toggle, intersection observer).
- Never add a framework island (React, Vue, Svelte) for functionality achievable with vanilla JS.
- No unnecessary third-party dependencies. Every `npm install` must justify its weight.
- Inline critical JS in the `<head>`. Defer everything else.

## CSS

- Tailwind CSS 4 purges unused styles at build time. Do not fight it.
- Avoid `@import` chains that increase critical CSS size.
- Keep `global.css` focused on tokens and shared patterns — not page-specific styles.

## Network

- Minimize HTTP requests. Inline SVG icons rather than loading icon fonts.
- Use Cloudflare's edge caching. `public/_headers` sets cache headers.
- No external API calls at runtime (static site).
- Preconnect to critical origins if external resources are ever added.

## Build output

- `npm run build` must produce a valid `dist/` directory.
- Check `dist/` size after build. If total exceeds 500KB, investigate.
- Each HTML page should be under 50KB uncompressed.

## Monitoring

- Run `npm run audit:site` before any PR to catch regressions.
- If Lighthouse Performance drops below 90, the first suspect is image size or unoptimized assets.
- If total transfer exceeds budget, check for accidentally committed large files or uncompressed images.
