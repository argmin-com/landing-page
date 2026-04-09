# Argmin Landing Page

Static Astro marketing site for `argmin.co`, implemented from the March 24, 2026 PRD and engineering specification, with the current multi-page UX/UI review updates integrated.

## Stack

- Astro 6
- Tailwind CSS 4
- Static output for Cloudflare Pages
- Formspree for contact submissions
- Plausible Analytics for page view and event tracking
- Wrangler for local Cloudflare Pages preview and manual deploys

## Project Structure

- `src/layouts/BaseLayout.astro`: metadata, canonical tags, OG/Twitter tags, Plausible bootstrap, theme boot, shared shell
- `src/components/`: hero, value proposition, founders, nav, shared contact section, shared contact form, footer
- `src/pages/`: ten routes — `index`, `about`, `contact`, `demo`, `platform`, `privacy`, `security`, `team`, `use-cases`, `404`
- `src/content/site.ts`: nav and footer link definitions
- `src/lib/contact.ts`: shared contact email constant
- `src/lib/formspree.ts`: Formspree URL validation
- `src/styles/global.css`: Tailwind directives, CSS custom properties, component styles
- `scripts/validate-contact-fallbacks.mjs`: fallback assertions against the built site in `dist/`
- `scripts/validate-contact-configured.mjs`: configured-endpoint assertions against the built site in `dist/`
- `public/`: favicon, founder images, OG image, Cloudflare Pages security headers (`_headers`)
- `docs/requirements-matrix.md`: requirement traceability, repo evidence, validation map

## Internal Link Graph

Source-defined internal link structure derived from `src/content/site.ts` and each page's markup.

### Global navigation

Defined in `src/content/site.ts` and rendered by `Navbar.astro` and `Footer.astro` on every page.

**Nav bar:**

| Group | Links |
| --- | --- |
| Product | `/platform`, `/use-cases` |
| Architecture | `/platform#attribution-flow`, `/platform#decision-layer`, `/platform#landscape`, `/platform#deployment-path` |
| Company | `/about`, `/team`, `/security`, `/contact` |

Brand logo links to `/`. CTA button links to `/demo`.

**Footer:**

| Group | Links |
| --- | --- |
| Product | `/platform`, `/use-cases`, `/demo` |
| Architecture | `/platform#attribution-flow`, `/platform#decision-layer`, `/platform#landscape`, `/platform#deployment-path` |
| Company | `/about`, `/team`, `/security`, `/contact`, `/privacy` |

Footer CTA buttons link to `/demo` and `/contact`.

### Per-page anchors and CTAs

| Page | Route | Anchor sections | Page-body CTAs |
| --- | --- | --- | --- |
| Home | `/` | — | `/demo` |
| About | `/about` | — | `/demo`, `/contact` |
| Contact | `/contact` | — | — |
| Demo | `/demo` | — | — |
| Platform | `/platform` | `#control-points`, `#landscape`, `#attribution-flow`, `#decision-layer`, `#deployment-path` | `/demo`, `/contact` |
| Privacy | `/privacy` | `#information-we-collect`, `#how-we-use-data`, `#legal-basis`, `#cookies`, `#sharing`, `#international-transfers`, `#retention`, `#your-rights`, `#ccpa`, `#security`, `#children`, `#contact`, `#changes` | — |
| Security | `/security` | `#security-principles`, `#security-comparison`, `#security-data-flow` | `/demo`, `/platform` |
| Team | `/team` | — | — |
| Use Cases | `/use-cases` | `#problem`, `#personas`, `#best-fit`, `#engineering`, `#finance-finops`, `#security` | `/contact`, `/platform` |
| 404 | `/404` | — | `/`, `/contact` |

## Local Development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run check
npm run build
npm run validate:contact-fallbacks
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run build
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
```

Combined fallback audit:

```bash
npm run audit:site
```

Local Cloudflare Pages preview:

```bash
npm run preview
```

## Environment

Create `.env` from `.env.example` and provide a real Formspree endpoint:

```bash
PUBLIC_FORMSPREE_URL=https://formspree.io/f/<form_id>
```

Without that value, the form fails closed: the submit button is disabled and the page renders an inline contact-email fallback instead of shipping a live Formspree endpoint.

## Deployment Contract

Target host: Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22` (Astro 6 requires `>=22.12.0`; see `.nvmrc` and `engines` in `package.json`)
- Required environment variable for live submissions: `PUBLIC_FORMSPREE_URL`
- Custom domain: `argmin.co`
- DNS/TLS: configured in Cloudflare outside this repository

### GitHub Actions

**Quality workflow** (`quality.yml`): runs automatically on push and pull request to `main` with path filters that include source, workflow, environment-contract, and documentation files. The pipeline runs Astro diagnostics, a fallback build plus fallback assertions, a configured build plus configured-path assertions, and a three-run Lighthouse audit with median scoring. Reports and the static server log are uploaded as artifacts.

| Category | Minimum |
| --- | --- |
| Performance | 90 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Largest Contentful Paint | ≤ 2500 ms |
| Total transfer size | ≤ 150 KB |

**CodeQL workflow** (`codeql.yml`): runs JavaScript/TypeScript static analysis on pushes and pull requests to `main`, plus a weekly scheduled scan.

**Dependency review workflow** (`dependency-review.yml`): reviews dependency changes on pull requests that touch `package.json` or `package-lock.json`.

**Deploy workflow** (`deploy.yml`): manual trigger only (`workflow_dispatch`). It requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` secrets and skips gracefully if they are absent, in which case Cloudflare Pages Git integration remains the active deployment path. `PUBLIC_FORMSPREE_URL` is passed to the build from a GitHub Actions variable.

## CI Validation

The current CI contract enforces:

- `npm run check`: zero Astro diagnostics
- `npm run build`: clean static production build to `dist/`
- `npm run validate:contact-fallbacks`: missing-endpoint assertions across home, contact, and demo entrypoints
- `PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured`: configured-endpoint assertions across the same entrypoints
- Lighthouse: three consecutive runs with median scoring against the thresholds above
- CodeQL JavaScript/TypeScript analysis on repository changes and weekly schedule

## Validation Evidence

Local validation completed on April 1, 2026:

- `npm run check`: passed with 0 errors, 0 warnings, 0 hints
- `npm run audit:site`: passed end to end
- `PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run build`: passed
- `PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured`: passed
- Built output is static `dist/` content only, with no generated Cloudflare worker bundle

## Remaining External Steps

- Configure a live Formspree form and set `PUBLIC_FORMSPREE_URL`
- Verify live Plausible data for `cta_click` and `form_submit` on the production domain
- Configure Cloudflare Pages project settings, DNS, and HTTPS redirects
