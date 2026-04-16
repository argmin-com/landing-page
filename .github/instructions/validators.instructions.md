---
applyTo: "scripts/validate-*.mjs"
---
- Validators enforce CI quality gates. Each must exit 0 on success, non-zero on failure.
- Follow the pattern in `scripts/contact-validation.mjs`: `collectFailures()` + `reportFailures()`.
- Validators run against the built `dist/` HTML, not source `.astro` files (exception: `validate-design-tokens.mjs` scans `src/`).
- If a validator is wrong about current code, fix the validator in the same PR as the code change.
- Never weaken a validator's assertions without explicit justification in the commit message.
- New validators must be wired into both `package.json` `scripts` and `.github/workflows/quality.yml`.
- Run `npm run audit:site` to exercise the full validator chain.
