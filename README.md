# Argmin Landing Page

Static Astro landing page for `argmin.co`, implemented from the March 24, 2026 PRD and engineering specification.

## Stack

- Astro 5
- Tailwind CSS 3
- Static output for Cloudflare Pages
- Formspree for contact submissions
- Plausible Analytics for page view and event tracking

## Project Structure

- `src/layouts/BaseLayout.astro`: metadata, canonical tags, OG/Twitter tags, Plausible script
- `src/components/`: hero, problem, value proposition grid, how-it-works, founders, contact, footer
- `src/pages/index.astro`: single-page composition in the required order
- `src/styles/global.css`: Tailwind directives plus smooth-scroll behavior
- `public/`: favicon, founder images, OG image
- `docs/requirements-matrix.md`: requirement traceability, repo evidence, validation map

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
- Output directory: `dist`
- Recommended Node version: `20` in Cloudflare Pages (see `.nvmrc` and `engines` in `package.json`)
- Required environment variable: `PUBLIC_FORMSPREE_URL`
- Custom domain: `argmin.co`
- DNS/TLS: configured in Cloudflare outside this repository

## Validation Evidence

Local validation completed on March 24, 2026:

- `npm run check`: passed with 0 errors, 0 warnings, 0 hints
- `npm run build`: passed
- `npm run validate:contact-fallbacks`: passes against the no-env build and verifies the inline config-missing fallback plus the no-JavaScript contact path
- Dist artifact size: `dist/` includes static HTML pages plus Cloudflare worker assets
- Lighthouse against the built static output: 100 performance / 100 accessibility / 100 best practices / 100 SEO
- Browser validation via Playwright CLI:
  - hero CTA updates the URL hash to `#contact` and scrolls the contact section near the top of the viewport
  - failure path shows `Submission failed. Please email us directly at contact@argmin.co.`
  - mocked success path replaces the form with `Thank you. We will be in touch shortly.`
  - mobile pass at `390x844` showed no horizontal overflow and single-column layout for the multi-column sections

## Remaining External Steps

- Configure a live Formspree form and set `PUBLIC_FORMSPREE_URL`
- Verify live Plausible data for `cta_click` and `form_submit` on the production domain
- Configure Cloudflare Pages project settings, DNS, and HTTPS redirects
