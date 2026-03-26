# Argmin Landing Page

Static Astro landing page for `argmin.co`, aligned to the March 24, 2026 PRD, engineering specification, and deployment guide.

## Design Source Of Truth

Future modifications in this repository should use the source documents as the governing reference, not the current implementation.

- Repo reference: `docs/design-source-of-truth.md`
- External product sources:
  - `argmin_landing_prd_v1_2.pdf`
  - `argmin_landing_eng_spec_v1_2.pdf`
  - `argmin_landing_page_deployment_guide.pdf`
- Supplementary brand sources, when available:
  - `argmin-vision-mission.pdf`
  - `argmin_design_principles.docx`
  - `argmin_style_guide.docx`
  - `argmin_design_tokens.json`
  - `argmin_ui_kit.html`
  - `argmin_ui_kit_reference.docx`

When the supplementary brand files are absent in a clone, the three product PDFs above plus the repo docs are the minimum required reference set.

## Stack

- Astro 5
- Tailwind CSS 3
- Astro Cloudflare adapter targeting Cloudflare Workers Builds
- Formspree for contact submissions
- Plausible Analytics for page view and event tracking

## Project Structure

- `src/layouts/BaseLayout.astro`: metadata, canonical tags, OG/Twitter tags, Plausible script
- `src/components/`: hero, problem, value grid, how-it-works, founders, contact, footer
- `src/pages/index.astro`: single-page composition in the approved order
- `src/content/site.ts`: approved copy and metadata content model
- `public/_headers`: response headers served by the Cloudflare asset layer
- `public/.assetsignore`: prevents Astro's generated worker internals from being treated as static assets
- `public/_redirects`: legacy path redirects to homepage anchors
- `wrangler.jsonc`: Cloudflare Worker service configuration for production deploys
- `scripts/validate-contact-fallbacks.mjs`: build-time check for the missing-env contact fallback
- `scripts/validate-design-system.mjs`: repo-level check for the single-page design and Worker deployment contract
- `scripts/validate-security-headers.mjs`: repo-level check for headers and script posture

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
npm run validate:design-system
npm run validate:security-headers
npm run audit:site
```

## Environment

Create `.env` from `.env.example` and provide a real Formspree endpoint:

```bash
PUBLIC_FORMSPREE_URL=https://formspree.io/f/<form_id>
```

Without that value, the form fails closed: the submit button is disabled, no live Formspree endpoint is shipped, and the page renders the visible `richard@argmin.co` fallback.

## Deployment Contract

Target host: Cloudflare Workers Builds for the `landing-page` Worker service

- Build command: `npm run build`
- Worker entrypoint: `dist/_worker.js/index.js`
- Static asset directory: `dist`
- Recommended Node version: `18`
- Required environment variable: `PUBLIC_FORMSPREE_URL`
- Custom domain: `argmin.co`
- Legacy redirects: `_redirects` handles `/contact`, `/demo`, and `/team`
- Security headers: `_headers` defines the CSP, referrer policy, and related browser protections
- Worker config: `wrangler.jsonc`
- DNS/TLS/build triggers: configured in Cloudflare outside this repository

## Source Constraints

- Single-page only. No navbar, no hamburger menu, no sticky header, no route-based marketing pages.
- Hero CTA scrolls to `#contact`.
- Contact form submits via JSON fetch, never via hosted Formspree redirect.
- Raw telemetry and operational data must not be described as leaving the customer environment.
- Integrations are read-only unless a source document explicitly says otherwise.
- No sitemap requirement for this site.

## Remaining External Configuration

- Configure a live Formspree form and set `PUBLIC_FORMSPREE_URL`
- Verify live Plausible data for `cta_click` and `form_submit` on the production domain
- Configure Cloudflare Worker service settings, DNS, and HTTPS redirects
