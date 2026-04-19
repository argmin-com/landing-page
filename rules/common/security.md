# Security

Security rules for this Astro static site deployed on Cloudflare Pages.

## No hardcoded secrets

- Never commit API keys, tokens, passwords, or credentials.
- Files matching `.env`, `.dev.vars`, and `credentials.*` are gitignored. If you create a new sensitive file pattern, add it to `.gitignore` explicitly in the same commit.
- If you need a secret at build time, use environment variables configured in Cloudflare dashboard or CI secrets.

## Environment variables

- Access env vars exclusively via `import.meta.env.PUBLIC_*` (client-safe) or `import.meta.env.*` (build-time only).
- Never use `process.env` in Astro components. Astro uses `import.meta.env`.
- Never interpolate secrets into client-side JavaScript. Only `PUBLIC_` prefixed vars are safe for the browser.

## Formspree fail-closed contract

This is a CI-enforced invariant:

- `PUBLIC_FORMSPREE_URL` must be validated before rendering the form submission button.
- When the URL is absent, empty, or fails the pattern check in `src/lib/formspree.ts`, the UI must:
  1. Hide or disable the submit button.
  2. Display the direct email fallback (`src/lib/contact.ts`).
  3. Never render a button that submits to an invalid endpoint.
- `npm run validate:contact-fallbacks` enforces this in CI. It checks the built HTML.

## Honeypot field

The contact form includes a honeypot field (hidden input not visible to humans). Rules:
- The field must be present in the form markup.
- It must be hidden via CSS (`display: none` or `position: absolute; left: -9999px`), not via `type="hidden"`.
- Server-side (Formspree) rejects submissions where the honeypot is filled.
- Never remove the honeypot field during refactoring.

## Input validation

- Validate all user inputs at the boundary (form fields use HTML5 validation attributes: `required`, `type="email"`, `minlength`, `maxlength`).
- The contact form uses client-side HTML5 validation as a UX convenience. Server-side validation is handled by Formspree.
- Never trust client-side validation alone for security-critical logic.

## Security headers

`public/_headers` defines Cloudflare security headers:
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

Do not weaken these headers without explicit security review. The `code-reviewer` agent should evaluate any proposed changes to security headers.

## Dependency management

- Run `npm audit` periodically. CI runs dependency review on PRs.
- Pin major versions in `package.json`. Use exact versions for critical dependencies.
- CodeQL static analysis runs on every PR via `codeql.yml`.

## When in doubt

Invoke the `code-reviewer` agent for any change that:
- Modifies `public/_headers` or `wrangler.jsonc`
- Adds a new external script or dependency
- Changes form handling logic
- Introduces new environment variable usage
- Modifies CSP or CORS configuration
