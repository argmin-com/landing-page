# Argmin Landing Page Requirements Matrix

Authoritative sources:
- `argmin_landing_prd_v1_2.pdf`
- `argmin_landing_eng_spec_v1_2.pdf`
- `argmin_landing_page_deployment_guide.pdf`

Repository evidence:
- The production artifact is a static Astro site deployed to Cloudflare Pages.
- The repo intentionally keeps a single application route: `/`.
- Legacy `/contact`, `/demo`, and `/team` links are handled by `public/_redirects` rather than extra page implementations.
- Contact submission depends on `PUBLIC_FORMSPREE_URL`; when absent, the build must fail closed and show the visible email fallback.

Frontend direction:
- Visual thesis: a technical memo rendered as a restrained, credible landing page with one dominant idea per section.
- Content plan: hero, problem statement, value proposition grid, how-it-works sequence, founder credibility, design-partner CTA, minimal footer.
- Interaction thesis: hero CTA scroll, visible focus states, and inline contact-form state transitions only.

## Execution Plan

1. Keep the app surface to the approved single-page structure.
2. Enforce attribution-first copy and trust-boundary accuracy.
3. Preserve static deployability for Cloudflare Pages, including headers and redirects.
4. Validate the no-env fallback, metadata, analytics wiring, and responsive behavior.

## Requirement Matrix

| ID | Source | Requirement | Subsystems | Status | Validation | Risk | Dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-101 | PRD 3.1 | Full-viewport hero with headline, subheadline, CTA, optional attribution diagram | `src/components/Hero.astro`, `src/content/site.ts` | Complete | Build, browser review | Medium | Final founder copy approval |
| FR-102 | PRD 3.1 | Problem narrative section with analytical register and no generic market fluff | `src/components/Problem.astro`, `src/content/site.ts` | Complete | Source review, build | Low | None |
| FR-103 | PRD 3.1 | Exactly four value proposition blocks | `src/components/ValueProps.astro`, `src/content/site.ts` | Complete | Responsive review, build | Low | None |
| FR-104 | PRD 3.1 | Measure / Attribute / Intervene sequence | `src/components/HowItWorks.astro`, `src/content/site.ts` | Complete | Responsive review, build | Low | None |
| FR-105 | PRD 3.1 | Two founder profiles with circular headshots, bios, and LinkedIn links | `src/components/Founders.astro`, `public/*` | Complete | Browser review, asset inspection | Medium | Final headshot approval |
| FR-106 | PRD 3.1 | Contact intro plus four-field form with inline states and visible email fallback | `src/components/Contact.astro`, `src/content/site.ts` | Complete | Build, Playwright review, fallback validator | High | Live Formspree endpoint for production submission |
| FR-107 | PRD 3.1 | Minimal footer with wordmark and copyright only | `src/components/Footer.astro` | Complete | Build, source review | Low | None |
| FR-108 | PRD 3.2 | Hero CTA smooth-scrolls to contact section | `src/components/Hero.astro`, `src/styles/global.css` | Complete | Browser review | Low | None |
| FR-109 | PRD 3.2 | JSON form submission with loading state and inline success/failure handling | `src/components/Contact.astro`, `public/scripts/site.js` | Complete | Playwright review | High | Live Formspree endpoint for production verification |
| FR-110 | PRD 3.2 | Native HTML5 validation on required fields | `src/components/Contact.astro`, `public/scripts/site.js` | Complete | Browser review | Medium | None |
| FR-111 | PRD 3.2 | No extra interactions or UI chrome beyond CTA and contact form | `src/pages/index.astro`, `src/components/*`, `public/scripts/site.js` | Complete | Source review, build | Low | None |
| NFR-01 | PRD 4 | Tight performance budget and static output | `package.json`, `astro.config.mjs`, `src/styles/global.css`, `public/*` | Complete | Build artifact review | Medium | Asset sizes |
| NFR-02 | PRD 4 | Responsive readability across desktop, tablet, and mobile | All user-facing components | Complete | Playwright mobile/desktop review | Medium | None |
| NFR-03 | PRD 4 | WCAG 2.1 AA basics for semantics, contrast, and keyboard access | Layout, components, form | Complete | Source review, browser review | Medium | None |
| NFR-04 | PRD 4 / Eng Spec 5 | Plausible pageview plus `cta_click` and `form_submit` events | `src/layouts/BaseLayout.astro`, `public/scripts/site.js` | Complete | Source review, browser flow review | Medium | Plausible account for live verification |
| NFR-05 | PRD 4 / Eng Spec 3.1 | Title, description, canonical, OG/Twitter tags, robots meta | `src/layouts/BaseLayout.astro`, `src/content/site.ts`, `public/robots.txt` | Complete | Source review | Low | Live social-preview verification |
| NFR-06 | PRD 4 / Eng Spec 6 | HTTPS and redirect behavior on Cloudflare Pages | `public/_redirects`, docs | Blocked (external) | Deployment checklist | Medium | Cloudflare Pages and DNS access |
| NFR-07 | PRD 4 | Same-day deploy discipline with minimal chrome | Entire repo | Complete | Scope review | Low | None |
| ENG-STRUCTURE | Eng Spec 2 | Single-page Astro structure with base layout and section components | `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, `src/components/*` | Complete | File review, build | Low | None |
| ENG-FORM | Eng Spec 4 / 10 | Formspree endpoint via env var, honeypot, fail-closed fallback behavior | `src/lib/formspree.ts`, `src/components/Contact.astro`, `public/scripts/site.js`, `.env.example` | Complete | Build, fallback validator | High | Live Formspree endpoint |
| ENG-ANALYTICS | Eng Spec 5 | Deferred Plausible script and custom event wiring | `src/layouts/BaseLayout.astro`, `public/scripts/site.js` | Complete | Source review | Medium | Plausible account |
| ENG-DEPLOY | Eng Spec 6 | Static Cloudflare Pages build contract with no Cloudflare adapter | `astro.config.mjs`, `package.json`, docs, `public/_headers`, `public/_redirects` | Complete | File review, build | Medium | Cloudflare project settings |
| ENG-STYLE | Eng Spec 8 | Tailwind palette and system-font preference | `tailwind.config.mjs`, `src/styles/global.css` | Complete | File review, build | Low | None |
| ENG-IMAGES | Eng Spec 9 | Founder image and OG/fav asset requirements | `public/*` | Complete | Asset inspection | Medium | Final asset review |
| ENG-FAILSAFE | Eng Spec 10 | Graceful handling when Formspree is unavailable or JavaScript is disabled | `src/components/Contact.astro`, `public/scripts/site.js`, validators | Complete | Build, fallback validator, browser review | High | Live production verification |
| ENG-DRIFT | Repo control | Guard against design and security regression drift | `scripts/validate-design-system.mjs`, `scripts/validate-security-headers.mjs`, `package.json` | Complete | `npm run audit:site` | Medium | CI or disciplined local validation |

## Known External Dependencies

- A real `PUBLIC_FORMSPREE_URL` is required for production submissions.
- Plausible must have `argmin.co` configured to verify live `cta_click` and `form_submit` events.
- Cloudflare Pages and DNS must be configured outside the repo.
- Social preview verification still requires a live production URL.
