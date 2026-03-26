# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Email:** [richard@argmin.co](mailto:richard@argmin.co)

Please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Any potential impact

We will acknowledge receipt as soon as practical. Do not publish a vulnerability before giving the maintainers a reasonable chance to investigate and mitigate it.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest on `main` | Yes |

## Security Measures

- **Static deployment:** the site is built as a static Astro project for Cloudflare Pages.
- **Response headers:** `public/_headers` defines a restrictive CSP plus referrer, frame, and permissions policies.
- **Form endpoint handling:** Formspree configuration is injected via `PUBLIC_FORMSPREE_URL`; when absent, the page fails closed and shows a direct email fallback instead of shipping a placeholder endpoint.
- **Script posture:** the site uses an external Plausible script plus one local enhancement script. No inline scripts are allowed by the repository validators.
