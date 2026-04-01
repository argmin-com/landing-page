# Argmin Landing Page Requirements Matrix

Authoritative sources:
- `argmin_landing_prd_v1_2.pdf`
- `argmin_landing_eng_spec_v1_2.pdf`

Repository evidence:
- The repo started from a minimal scaffold and now implements the reviewed multi-page marketing site in Astro.
- No live Formspree or deployment credentials are committed to the repository.
- Cloudflare Pages remains the deployment target, but the repository now builds to a plain static `dist/` output with no worker bundle.
- The contact experience is shared across the home, contact, and demo entrypoints through a single `ContactForm.astro` implementation.

Frontend direction:
- Visual thesis: a technical memo rendered as a premium landing page, with precise typography, generous whitespace, and one restrained accent color.
- Content plan: homepage narrative sections plus dedicated platform, use-case, team, security, demo, and contact routes.
- Interaction thesis: restrained hover and focus states, route-based CTAs, homepage reveal staging, and inline contact form state transitions only.

## Execution Plan

1. Bootstrap the Astro + Tailwind project structure defined in the engineering spec.
2. Implement the core marketing narrative plus supporting product, trust, and conversion routes.
3. Add metadata, analytics hooks, shared Formspree integration, and fail-safe handling.
4. Generate the required static assets that can be produced locally and wire deployment-facing config.
5. Validate build, behavior, accessibility, and CI guardrails before shipping changes.

## Requirement Matrix

| ID | Source | Requirement | Subsystems | Status | Validation | Risk | Dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-101 | PRD 3.1 | Full-viewport home hero with premium analytical presentation | `Hero.astro`, `index.astro` | Complete | Build, desktop/mobile browser review | Medium | Final approved copy |
| FR-102 | PRD 3.1 | Problem narrative section with analytical register | `Problem.astro` | Complete | Build, content review | Low | None |
| FR-103 | PRD 3.1 | Four-item value proposition grid | `ValueProps.astro` | Complete | Build, responsive review | Low | None |
| FR-104 | PRD 3.1 | Three-step Measure / Attribute / Intervene section | `HowItWorks.astro` | Complete | Build, responsive review | Low | None |
| FR-105 | PRD 3.1 | Founder section with headshots, bios, LinkedIn links | `Founders.astro`, `public/*` | Complete | Build, browser review, asset inspection | High | Local source images |
| FR-106 | PRD 3.1 | Shared lead-capture form with qualification fields and inline success/error states | `ContactForm.astro`, `Contact.astro`, `contact.astro` | Complete | Fallback/configured HTML assertions, Playwright failure/success validation | High | Live Formspree endpoint for production |
| FR-107 | PRD 3.1 | Minimal footer with navigation and copyright | `Footer.astro`, `site.ts` | Complete | Build, browser review | Low | Optional logo asset |
| FR-108 | PRD 3.2 | Primary CTAs route users to dedicated demo/contact entrypoints without dead ends | `index.astro`, `platform.astro`, `security.astro`, `site.ts` | Complete | Browser navigation review, CTA source inspection | Low | None |
| FR-109 | PRD 3.2 | JS-based JSON form submission with loading state, qualification payload, and inline replacement | `ContactForm.astro` | Complete | Playwright failure path, mocked success path, configured-build validation | High | Live Formspree endpoint for production |
| FR-110 | PRD 3.2 | Native HTML5 validation on required form inputs, including qualification selects | `ContactForm.astro` | Complete | Browser validation UI inspection, source review | Medium | None |
| FR-111 | PRD 3.2 | No extra interactions or complex UI chrome | All page components | Complete | Code review, production build review | Low | None |
| NFR-01 | PRD 4 | Sub-1s load target and tight asset budget | Config, assets, page structure | Complete | Build artifact review, Lighthouse | High | Optimized images |
| NFR-02 | PRD 4 | Responsive design across mobile, tablet, desktop | All page components | Complete | Responsive browser review, layout inspection | Medium | None |
| NFR-03 | PRD 4 | WCAG 2.1 AA basics for semantics, contrast, keyboard access | Layout, components, form | Complete | Lighthouse accessibility, semantic review | Medium | None |
| NFR-04 | PRD 4, Eng Spec 5 | Plausible pageview and custom event tracking, no cookies | `BaseLayout.astro`, `Hero.astro`, `ContactForm.astro` | Complete | Source review, localhost console review | Medium | Plausible site setup for live verification |
| NFR-05 | PRD 4, Eng Spec 3.1 | SEO baseline metadata, canonical URL, OG/Twitter tags | `BaseLayout.astro`, `public/og-image.png` | Complete | Source inspection, Lighthouse SEO | Medium | Live social preview check |
| NFR-06 | PRD 4, Eng Spec 6 | HTTPS on Cloudflare Pages and redirect expectations | Docs/config | Blocked (external) | Deployment checklist | Medium | Cloudflare configuration |
| NFR-07 | PRD 4 | Same-day deploy constraint and minimal design discipline | Entire project | Complete | Scope review, build review | Low | None |
| ENG-STRUCTURE | Eng Spec 2 | Astro project structure, shared layout, reusable page sections, supporting routes | Repo structure | Complete | File review, build | Low | None |
| ENG-FORM | Eng Spec 4, 10 | Shared Formspree contract, honeypot, fail-safe behavior, visible fallback email across all contact entrypoints | `ContactForm.astro`, `.env.example`, validation scripts | Complete | `validate:contact-fallbacks`, `validate:contact-configured`, Playwright failure/success validation | High | Live Formspree endpoint |
| ENG-ANALYTICS | Eng Spec 5 | Plausible script and event wiring | `BaseLayout.astro`, `Hero.astro`, `ContactForm.astro` | Complete | Source review, localhost behavior review | Medium | Plausible site setup |
| ENG-DEPLOY | Eng Spec 6 | Static build contract for Cloudflare Pages plus manual deployment workflow | `package.json`, `deploy.yml`, `README.md` | Complete (repo) | Build review, workflow review | Medium | Cloudflare project and secrets |
| ENG-STYLE | Eng Spec 8 | Tailwind config, palette, system font stack, smooth scroll CSS, restrained motion | `global.css`, component styles | Complete | File review, build | Low | None |
| ENG-IMAGES | Eng Spec 9 | Founder image sizing and OG image/fallback asset requirements | `public/*` | Complete | Asset inspection, build review | High | Local source images |
| ENG-FAILSAFE | Eng Spec 10 | Graceful behavior for Formspree failure, JS disabled, blocked analytics | `ContactForm.astro`, copy | Complete | Fallback validation, Playwright failure validation, semantic review | High | Live Formspree endpoint for production submission |
| ENG-CI | Repo guardrail | CI must exercise both fallback and configured contact form paths and run SAST | `quality.yml`, `codeql.yml`, validation scripts | Complete | Workflow review, local script execution | Medium | GitHub Actions |

## Known External Dependencies

- A real `PUBLIC_FORMSPREE_URL` is required for production form submissions.
- Plausible must have `argmin.co` configured for live analytics validation.
- Cloudflare Pages and DNS must be configured outside the repo.
- A final live social preview check should be done after deployment to verify the production OG image and canonical domain behavior.

## Validation Evidence

- `npm run check`: passed on April 1, 2026 with 0 errors, 0 warnings, 0 hints
- `npm run audit:site`: passed on April 1, 2026 and verified the fail-closed build path
- `PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run build`: passed on April 1, 2026
- `PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured`: passed on April 1, 2026
- Static build review: `dist/` now contains HTML and assets only, with no generated worker bundle
