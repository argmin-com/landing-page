# Argmin Landing Page

Static Astro landing page for `argmin.co`, implemented from the March 24, 2026 PRD and engineering specification.

## Stack

- Astro 6
- Tailwind CSS 4
- Static output for Cloudflare Pages
- Formspree for contact submissions
- Plausible Analytics for page view and event tracking

## Project Structure

- `src/layouts/BaseLayout.astro`: metadata, canonical tags, OG/Twitter tags, Plausible script, dark-mode boot
- `src/components/`: hero, problem, value proposition grid, how-it-works, founders, contact, footer, navbar, theme toggle
- `src/pages/`: eight pages — `index`, `contact`, `platform`, `use-cases`, `team`, `demo`, `security`, `404`
- `src/content/site.ts`: nav and footer link definitions
- `src/lib/formspree.ts`: Formspree URL validation (regex-enforced)
- `src/styles/global.css`: Tailwind directives, CSS custom properties, component styles
- `public/`: favicon, founder images, OG image, Cloudflare Pages security headers (`_headers`)
- `docs/requirements-matrix.md`: requirement traceability, repo evidence, validation map

## Local Development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run check                       # Astro type-check
npm run build                       # production build (outputs to dist/)
npm run validate:contact-fallbacks  # verify contact fallbacks in dist/client/
```

Combined audit (runs all three in sequence):

```bash
npm run audit:site
```

Local preview with Wrangler (builds first):

```bash
npm run preview
```

## Environment

Create `.env` from `.env.example` and provide a real Formspree endpoint:

```bash
PUBLIC_FORMSPREE_URL=https://formspree.io/f/<form_id>
```

Without that value, the form fails closed: the submit button is disabled and the page renders an inline
contact-email fallback instead of shipping a live Formspree endpoint.

## Deployment Contract

Target host: Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist/client`
- Node version: `22` (Astro 6 requires `>=22.12.0`; see `.nvmrc` and `engines` in `package.json`)
- Required environment variable: `PUBLIC_FORMSPREE_URL`
- Custom domain: `argmin.co`
- DNS/TLS: configured in Cloudflare outside this repository

### GitHub Actions

**Quality workflow** (`quality.yml`): runs automatically on push and pull request to `main` (path-filtered). The pipeline runs Astro diagnostics, a production build, contact fallback validation, and a three-run Lighthouse audit with median scoring, then uploads the reports as artifacts. Enforced thresholds:

| Category | Minimum |
|---|---|
| Performance | 90 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Largest Contentful Paint | ≤ 2500 ms |
| Total transfer size | ≤ 105 KB |

**Deploy workflow** (`deploy.yml`): manual trigger only (`workflow_dispatch`). It requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` secrets and skips gracefully if they are absent, in which case Cloudflare Pages Git integration remains the active deployment path. `PUBLIC_FORMSPREE_URL` is passed to the build from a GitHub Actions variable.

## CI Validation

The quality workflow enforces correctness on every push and PR to `main`:

- `npm run check`: zero type errors
- `npm run build`: clean production build
- `npm run validate:contact-fallbacks`: six contact-form assertions against `dist/client/` (no endpoint → disabled button, missing-config message, `noscript` mailto fallback, no hardcoded Formspree URL)
- Lighthouse: three consecutive runs, median scored against the thresholds above
- Build artifacts (Lighthouse reports, HTTP server log) uploaded for each run (retained 7 days)

## Remaining External Steps

- Configure a live Formspree form and set `PUBLIC_FORMSPREE_URL`
- Verify live Plausible data for `cta_click` and `form_submit` on the production domain
- Configure Cloudflare Pages project settings, DNS, and HTTPS redirects
