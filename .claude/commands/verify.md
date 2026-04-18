---
description: Run the complete verification chain — build, typecheck, all validators, contact paths — and report results.
allowed-tools: Bash(npm run check), Bash(npm run build), Bash(npm run validate:*), Bash(npm run audit:site), Bash(npm ci), Bash(PUBLIC_FORMSPREE_URL=https://formspree.io/f/* npm run*)
---

Run the full verification chain (superset of `quality.yml` CI — includes local-only validators):

```bash
npm run check                           # Astro typecheck
npm run build                           # Static build (fallback mode)
npm run validate:contact-fallbacks      # Fail-closed form
npm run validate:page-structure         # Content minimums
npm run validate:design-tokens          # Token compliance
npm run validate:redirects              # /demo → /contact
npm run validate:navbar                 # z-index stacking
npm run validate:canonical              # Canonical URLs
npm run validate:formspree-health       # Endpoint liveness (if set)

# Configured contact path
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run build
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
```

Report each step as PASS or FAIL with the first error line. If all pass, print:

```
VERIFICATION: ALL PASS
Ready for commit.
```

If any fail:
```
VERIFICATION: FAIL
First failure: <validator name>
Error: <first line of error output>
Suggested fix: <what to do>
```
