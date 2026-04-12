# Argmin Landing Page

Marketing site for **Argmin**, an enterprise platform for AI spend attribution, governance, and decision-time control.

This repository powers `argmin.co`: a static Astro site that explains how Argmin helps engineering, finance/FinOps, and security teams trace AI spend to accountable owners, budgets, and deployment decisions before costs compound.

## Product Positioning Reflected in This Site

The current site presents Argmin as:

- A system of record for enterprise AI consumption
- An attribution layer that connects **model → service → code → identity → org → budget**
- A decision layer for pre-deploy review, approvals, and budget control
- An enterprise-first deployment model with **read-only connectors**, **inside-your-environment processing**, and **advisory-first workflows**

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

- `/` — Home
- `/about` — Company beliefs and design-partner note
- `/contact` — Unified contact/demo form (intent radio: demo request or question)
- `/platform` — Attribution model, tabbed comparison, control points, decision layer, deployment path
- `/privacy` — Website privacy policy
- `/security` — Trust boundary, data flow, and security principles
- `/team` — Founders and stat-based credibility
- `/use-cases` — Persona tabs (Engineering, Finance/FinOps, Security) with mobile accordion
- `/404` — Not found

**Redirects:** `/demo` → `/contact` (301 via `public/_redirects`)

## Key UX Patterns

- **SectionNav**: Sticky horizontal pill bar with IntersectionObserver-based active highlighting. Applied to `/platform`, `/privacy`, `/use-cases`, and `/security`.
- **Tabbed sections**: `/platform` uses tabs to consolidate Before/After, Comparison, and Why Current Tools Fail into one section. `/use-cases` uses tabs for persona switching (desktop) that collapse to stacked panels on mobile (<768px) with proper ARIA role swapping.
- **Decision Rule collapse**: Mathematical notation hidden behind `<details>/<summary>` on `/platform`, showing plain-English summary by default.
- **ContactForm**: Intent radio (demo/question), essential fields visible, optional qualification fields in collapsible `<details>`.

## Project Structure

- `src/layouts/BaseLayout.astro`: metadata, canonical tags, analytics bootstrap, theme boot, shared shell
- `src/components/`: reusable sections — `SectionNav`, `PageHero`, `Navbar`, `Footer`, `ContactForm`, `DecisionRule`, `AttributionFlowDiagram`
- `src/pages/`: public site routes
- `src/content/site.ts`: navigation (Product, Company dropdowns) and footer links (flat row)
- `src/lib/contact.ts`: shared contact email constant
- `src/lib/formspree.ts`: Formspree URL validation and sanitization
- `src/styles/global.css`: global theme tokens, spacing vars (`--section-gap`, `--subsection-gap`), and shared component styling
- `scripts/`: build-time validators — contact fallbacks, configured contact, navbar z-index, redirect checks
- `public/`: static assets, favicon, images, sitemap, robots.txt, and Cloudflare Pages `_redirects`/`_headers`
- `docs/requirements-matrix.md`: requirements traceability and validation evidence

## Internal Link Graph

### Global navigation

Defined in `src/content/site.ts` and rendered by `Navbar.astro` and `Footer.astro` on every page.

**Nav bar (2 dropdown groups):**

| Group | Links |
| --- | --- |
| Product | `/platform`, `/use-cases` |
| Company | `/about`, `/team`, `/security`, `/contact` |

Brand logo links to `/`. CTA button links to `/contact`.

**Footer (single-row layout):**

Left: wordmark + © 2026. Center: flat link row (Platform, Use Cases, Team, Security, Privacy, Contact). Right: "Request a Demo" → `/contact`.

### Per-page anchors and CTAs

| Page | Route | Anchor sections | Page-body CTAs |
| --- | --- | --- | --- |
| Home | `/` | — | `/contact` |
| About | `/about` | — | `/contact` |
| Contact | `/contact` | — | — |
| Platform | `/platform` | `#landscape`, `#control-points`, `#attribution-flow`, `#decision-layer`, `#deployment-path` | `/contact` |
| Privacy | `/privacy` | `#information-we-collect`, `#how-we-use-data`, `#legal-basis`, `#cookies`, `#sharing`, `#international-transfers`, `#retention`, `#your-rights`, `#ccpa`, `#security`, `#children`, `#contact`, `#changes` | — |
| Security | `/security` | `#security-principles`, `#security-data-flow` | `/contact` |
| Team | `/team` | — | `/contact` |
| Use Cases | `/use-cases` | `#personas`, `#best-fit`, `#engineering`, `#finance-finops`, `#security` | `/contact` |
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
- Lighthouse median thresholds (audited across multiple routes):
  - Performance: `>= 90`
  - Accessibility: `100`
  - Best Practices: `100`
  - SEO: `100`
  - Largest Contentful Paint: `<= 2500 ms`
  - Total transfer size: `<= 150 KB`

Additional workflows:

- `codeql.yml`: JavaScript/TypeScript static analysis
- `dependency-review.yml`: dependency review on pull requests that change package manifests
- `link-check.yml`: lychee-based broken link detection on push/PR + weekly cron

## Operational Follow-Up Outside This Repository

- Configure a live Formspree endpoint for production contact flows
- Verify Plausible events on the production domain
- Maintain Cloudflare Pages project, DNS, and TLS settings
