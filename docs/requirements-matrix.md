# Argmin Landing Page Requirements Matrix

Authoritative sources:
- `argmin_landing_prd_v1_2.pdf`
- `argmin_landing_eng_spec_v1_2.pdf`

Repository evidence:
- The repo only contained `README.md` and Git metadata at project start.
- There was no prior application structure, CI pipeline, or deployment config to preserve.
- No Formspree or related deployment environment variables were present locally.
- No founder headshots were stored in the repository.

Frontend direction:
- Visual thesis: a technical memo rendered as a premium landing page, with precise typography, generous whitespace, and one restrained accent color.
- Content plan: hero, problem statement, value proposition grid, how-it-works sequence, founder credibility, design-partner CTA, minimal footer.
- Interaction thesis: smooth-scroll hero CTA, restrained hover/focus states, and inline contact form state transitions only.

## Execution Plan

1. Bootstrap the Astro + Tailwind project structure defined in the engineering spec.
2. Implement the seven required sections with approved copy and responsive behavior.
3. Add metadata, analytics hooks, Formspree integration, and fail-safe handling.
4. Generate the required static assets that can be produced locally and wire deployment-facing config.
5. Validate build, behavior, accessibility, and performance proxies, then commit and push validated increments.

## Requirement Matrix

| ID | Source | Requirement | Subsystems | Status | Validation | Risk | Dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-101 | PRD 3.1 | Full-viewport hero with headline, subheadline, CTA, optional attribution diagram | `Hero.astro`, `index.astro` | Complete | Build, desktop/mobile browser review | Medium | Final approved copy |
| FR-102 | PRD 3.1 | Problem narrative section with analytical register | `Problem.astro` | Complete | Build, content review | Low | None |
| FR-103 | PRD 3.1 | Four-item value proposition grid | `ValueProps.astro` | Complete | Build, responsive review | Low | None |
| FR-104 | PRD 3.1 | Three-step Measure / Attribute / Intervene section | `HowItWorks.astro` | Complete | Build, responsive review | Low | None |
| FR-105 | PRD 3.1 | Founder section with headshots, bios, LinkedIn links | `Founders.astro`, `public/*` | Complete | Build, browser review, asset inspection | High | Local source images |
| FR-106 | PRD 3.1 | Contact CTA text plus four-field form with inline success/error states | `Contact.astro` | Complete | Build, Playwright failure/success validation | High | Live Formspree endpoint for production |
| FR-107 | PRD 3.1 | Minimal footer with wordmark/logo and copyright | `Footer.astro` | Complete | Build, browser review | Low | Optional logo asset |
| FR-108 | PRD 3.2 | CTA smooth-scroll to contact | `Hero.astro`, `global.css` | Complete | Playwright hash/scroll validation | Low | None |
| FR-109 | PRD 3.2 | JS-based JSON form submission with loading state and inline replacement | `Contact.astro` | Complete | Playwright failure path + mocked success path | High | Live Formspree endpoint for production |
| FR-110 | PRD 3.2 | Native HTML5 validation on required inputs | `Contact.astro` | Complete | Browser validation UI inspection | Medium | None |
| FR-111 | PRD 3.2 | No extra interactions or complex UI chrome | All page components | Complete | Code review, production build review | Low | None |
| NFR-01 | PRD 4 | Sub-1s load target and tight asset budget | Config, assets, page structure | Complete | Build artifact review, Lighthouse | High | Optimized images |
| NFR-02 | PRD 4 | Responsive design across mobile, tablet, desktop | All page components | Complete | Responsive browser review, layout inspection | Medium | None |
| NFR-03 | PRD 4 | WCAG 2.1 AA basics for semantics, contrast, keyboard access | Layout, components, form | Complete | Lighthouse accessibility, semantic review | Medium | None |
| NFR-04 | PRD 4, Eng Spec 5 | Plausible pageview and custom event tracking, no cookies | `BaseLayout.astro`, `Hero.astro`, `Contact.astro` | Complete | Source review, localhost console review | Medium | Plausible site setup for live verification |
| NFR-05 | PRD 4, Eng Spec 3.1 | SEO baseline metadata, canonical URL, OG/Twitter tags | `BaseLayout.astro`, `public/og-image.png` | Complete | Source inspection, Lighthouse SEO | Medium | Live social preview check |
| NFR-06 | PRD 4, Eng Spec 6 | HTTPS on Cloudflare Pages and redirect expectations | Docs/config | Blocked (external) | Deployment checklist | Medium | Cloudflare configuration |
| NFR-07 | PRD 4 | Same-day deploy constraint and minimal design discipline | Entire project | Complete | Scope review, build review | Low | None |
| ENG-STRUCTURE | Eng Spec 2 | Astro project structure, single page, base layout, section components | Repo structure | Complete | File review, build | Low | None |
| ENG-FORM | Eng Spec 4, 10 | Formspree contract, honeypot, fail-safe behavior, visible fallback email | `Contact.astro`, `.env.example` | Complete | Playwright failure/success validation | High | Live Formspree endpoint |
| ENG-ANALYTICS | Eng Spec 5 | Plausible script and event wiring | `BaseLayout.astro`, `Hero.astro`, `Contact.astro` | Complete | Source review, localhost behavior review | Medium | Plausible site setup |
| ENG-DEPLOY | Eng Spec 6 | Cloudflare Pages build settings and deploy contract | `package.json`, docs | Blocked (external) | Build review, deploy notes | Medium | Cloudflare project |
| ENG-STYLE | Eng Spec 8 | Tailwind config, palette, system font stack, smooth scroll CSS | `tailwind.config.mjs`, `global.css` | Complete | File review, build | Low | None |
| ENG-IMAGES | Eng Spec 9 | Founder image sizing and OG image/fallback asset requirements | `public/*` | Complete | Asset inspection, build review | High | Local source images |
| ENG-FAILSAFE | Eng Spec 10 | Graceful behavior for Formspree failure, JS disabled, blocked analytics | `Contact.astro`, copy | Complete | Playwright failure validation, semantic review | High | Live Formspree endpoint for production submission |

## Known External Dependencies

- A real `PUBLIC_FORMSPREE_URL` is required for production form submissions.
- Plausible must have `argmin.co` configured for live analytics validation.
- Cloudflare Pages and DNS must be configured outside the repo.
- A final live social preview check should be done after deployment to verify the production OG image and canonical domain behavior.

## Validation Evidence

- `npm run check`: passed on March 24, 2026 with 0 errors, 0 warnings, 0 hints
- `npm run build`: passed on March 24, 2026
- Dist size review: `dist/` totals about 36 KB on disk; Lighthouse reported about 47.8 KB transfer weight
- Lighthouse against the static build: 100 performance / 100 accessibility / 100 best practices / 100 SEO
- Playwright CLI browser validation:
  - desktop hero renders correctly with the optional attribution diagram
  - mobile viewport `390x844` has no horizontal overflow and all multi-column sections collapse to one column
  - CTA scroll updates the hash to `#contact` and positions the contact section near the top of the viewport
  - placeholder endpoint path renders the required fallback submission message
  - mocked 200 response replaces the form with `Thank you. We will be in touch shortly.`
