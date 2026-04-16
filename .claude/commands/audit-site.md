---
description: Run the full local audit chain (mirrors quality.yml). Fast pre-PR sanity check.
allowed-tools: Bash(npm run audit:site), Bash(npm ci), Bash(npm run check), Bash(npm run build), Bash(npm run validate:*)
---

Run the local audit chain and report results.

1. `npm ci` if `node_modules` is missing or out of date.
2. `npm run audit:site` — this runs: check, build, validate:contact-fallbacks, validate:redirects, validate:navbar, validate:canonical, validate:formspree-health, validate:page-structure, validate:design-tokens.
3. If the fallback path passes, also run the configured path:
   ```
   PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run build
   PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
   ```

Report structure:

```
## Audit Result: PASS | FAIL

### Passed
- <validator name>

### Failed
- <validator name>: <first few lines of failure output>

### Recommended action
<specific next step>
```

If any validator fails and the fix is small (typo in validator, forgotten file staged, etc.), propose the fix but do not apply it without explicit confirmation.

**Never** modify content to make `validate:page-structure` pass. If the page fails structure checks, the fix is to restore content, not to weaken the validator. See `docs/content-standards.md`.
