# Argmin Landing Page

Marketing site for **Argmin**, an enterprise platform for AI spend attribution, governance, and decision-time control.

This repository powers `argmin.co`: a static Astro site that explains how Argmin helps engineering, finance/FinOps, and security teams trace AI spend to accountable owners, budgets, and deployment decisions before costs compound.

## Product Positioning Reflected in This Site

The current site presents Argmin as:

- a system of record for enterprise AI consumption
- an attribution layer that connects **model → service → code → identity → org → budget**
- a decision layer for pre-deploy review, approvals, and budget control
- an enterprise-first deployment model with **read-only connectors**, **inside-your-environment processing**, and **advisory-first workflows**

This repository contains the public marketing experience for that offering. It does **not** contain the customer product runtime.

## Stack

- Astro 6
- Tailwind CSS 4
- Static output for Cloudflare Pages
- Formspree for contact submissions
- Plausible Analytics for page-view and CTA tracking
- Wrangler for local Cloudflare Pages preview and manual deploys

## Site Map

Current Astro routes in `src/pages/`:

- `/`
- `/about`
- `/contact`
- `/demo`
- `/platform`
- `/privacy`
- `/security`
- `/team`
- `/use-cases`
- `/404`

These pages map to the current product narrative:

- **Home**: problem framing, value proposition, attribution flow, and contact CTA
- **Platform**: attribution model, control points, deployment path, and architectural differentiation
- **Use Cases**: buying context for engineering, finance/FinOps, and security stakeholders
- **Security**: trust boundary, data flow, and deployment posture
- **About**: company point of view and design-partner framing
- **Team**: founders and leadership context
- **Contact / Demo**: conversion paths for inbound interest
- **Privacy**: website privacy policy

## Repository Structure

- `src/layouts/BaseLayout.astro`: metadata, canonical tags, analytics bootstrap, theme boot, shared shell
- `src/components/`: reusable sections, navigation, footer, and shared contact form
- `src/pages/`: public site routes
- `src/content/site.ts`: navigation, footer links, and site summary copy
- `src/lib/contact.ts`: shared contact email constant
- `src/lib/formspree.ts`: Formspree URL validation and sanitization
- `src/styles/global.css`: global theme tokens and shared component styling
- `scripts/validate-contact-fallbacks.mjs`: asserts fail-closed contact behavior against the built site in `dist/`
- `scripts/validate-contact-configured.mjs`: asserts configured contact behavior against the built site in `dist/`
- `public/`: static assets, favicon, images, and Cloudflare Pages headers
- `docs/requirements-matrix.md`: requirements traceability and validation evidence

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

## Validation

Run the standard repository checks from the root:

```bash
npm run check
npm run build
npm run validate:contact-fallbacks
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run build
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
```

Combined local audit:

```bash
npm run audit:site
```

Local Cloudflare Pages preview:

```bash
npm run preview
```

## Environment Contract

Create `.env` from `.env.example` and provide a valid Formspree endpoint for live submissions:

```bash
PUBLIC_FORMSPREE_URL=https://formspree.io/f/<form_id>
```

If `PUBLIC_FORMSPREE_URL` is missing or invalid, the site fails closed: the contact form is disabled and displays a direct email fallback, including no-JavaScript mailto support in the built pages.

## Deployment Contract

Target host: Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `>=22.12.0` (see `.nvmrc` and `package.json`)
- Required environment variable for live submissions: `PUBLIC_FORMSPREE_URL`
- Production domain: `https://argmin.co`

Manual deploy workflow:

- `deploy.yml` runs only on `workflow_dispatch`
- GitHub Actions deploys with `wrangler pages deploy dist --project-name=landing-page`
- `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` must be configured for manual deploys from Actions
- if those secrets are absent, Cloudflare Pages Git integration remains the active deployment path

## CI Quality Gates

The `quality.yml` workflow currently enforces:

- `npm run check`
- `npm run build`
- `npm run validate:contact-fallbacks`
- configured contact build plus `npm run validate:contact-configured`
- Lighthouse median thresholds:
  - Performance: `>= 90`
  - Accessibility: `100`
  - Best Practices: `100`
  - SEO: `100`
  - Largest Contentful Paint: `<= 2500 ms`
  - Total transfer size: `<= 150 KB`

Additional workflows:

- `codeql.yml`: JavaScript/TypeScript static analysis
- `dependency-review.yml`: dependency review on pull requests that change package manifests

## Operational Follow-Up Outside This Repository

- Configure a live Formspree endpoint for production contact flows
- Verify Plausible events on the production domain
- Maintain Cloudflare Pages project, DNS, and TLS settings
