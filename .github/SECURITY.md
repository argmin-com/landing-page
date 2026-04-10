# Security Policy

## Supported surface

This repository contains the public marketing site for Argmin (`argmin.co`).
It is a static site built with Astro and deployed to Cloudflare Pages.
The only active version is the `main` branch. There are no released versions.

This repository **does not** contain the Argmin product runtime, customer
attribution graphs, inference decision logic, or any customer data.

## Reporting a vulnerability

If you believe you have found a security issue in this repository or in the
`argmin.co` website, please report it privately. Do **not** open a public
GitHub issue.

**Preferred channel — GitHub Security Advisories (private):**
<https://github.com/argmin-com/landing-page/security/advisories/new>

**Email:** `contact@argmin.co` (please include `[security]` in the subject line).

Please include as much of the following as you can:

- A description of the issue and where it appears (URL, page, feature)
- Steps to reproduce or a proof of concept
- Impact assessment (what data, account state, or integrity is affected)
- Your name and any affiliation, if you would like to be credited

## What to expect

- Acknowledgement of your report within **3 business days**
- A status update within **7 business days** of acknowledgement
- A target remediation window based on severity:
  - **Critical**: within 7 days
  - **High**: within 14 days
  - **Medium**: within 30 days
  - **Low**: next regular release

We will credit reporters in the release notes unless you ask to remain
anonymous. We do not currently run a paid bug bounty program.

## Out of scope

The following findings against the marketing site are generally not
considered security vulnerabilities and will be triaged as `enhancement`
or closed:

- Missing headers on `argmin.co` that do not correspond to an actual exploit
  (e.g., cosmetic differences in `Content-Security-Policy` reporting)
- Self-XSS requiring the victim to paste attacker-controlled content into
  DevTools
- Rate limiting on the public contact form (Formspree owns this contract)
- Vulnerabilities in third-party services we link to (Formspree, Plausible,
  LinkedIn), which should be reported to those vendors directly
- Theoretical issues without a working proof of concept

## Dependency security

- Dependabot is enabled for `npm` and `github-actions` ecosystems
  (`.github/dependabot.yml`).
- CodeQL runs on every pull request and on a weekly schedule
  (`.github/workflows/codeql.yml`).
- Dependency Review runs on every pull request
  (`.github/workflows/dependency-review.yml`).

Thank you for helping keep Argmin and our customers safe.
