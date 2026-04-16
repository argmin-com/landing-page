---
name: verification-loop
description: Pattern for verify-fix-verify cycles. Ensures changes pass all validators before being considered complete. Use this skill whenever implementing changes that must satisfy CI gates.
---

# Verification Loop

A systematic pattern for ensuring changes pass all quality gates. Run validator, identify failure, fix, re-run until green. Never skip validators or declare work complete without a passing run.

## Core loop

```
1. RUN validator(s)
2. IF all pass → DONE
3. ELSE → identify specific failure
4.   READ the failing file + relevant docs
5.   FIX the root cause (not the symptom)
6.   GOTO 1
```

## Validator chain

Run in this order. Fix failures before proceeding to the next validator:

```bash
# 1. Type safety
npm run check

# 2. Build integrity
npm run build

# 3. Contact form contract
npm run validate:contact-fallbacks

# 4. Content structure (if content changed)
npm run validate:page-structure

# 5. Design token compliance (if styles changed)
npm run validate:design-tokens

# 6. Full audit (final pass)
npm run audit:site
```

## Rules

1. **Never skip a validator.** If a validator is slow or inconvenient, that is not a reason to skip it.
2. **Fix the root cause.** If `validate:design-tokens` fails because of a hardcoded color, replace the color with a token. Do not suppress the validator.
3. **Re-run after every fix.** A fix for one failure can introduce another. Always re-validate.
4. **Maximum 5 iterations.** If the loop has not converged after 5 cycles, stop and report the situation. Something structural may be wrong.
5. **Record the final state.** After the loop converges, note which validators passed and what was fixed.

## Common failure patterns

| Validator | Common failure | Fix |
|---|---|---|
| `check` | Type error in frontmatter | Fix the Props interface or import |
| `build` | Missing import, syntax error | Read the error, fix the source |
| `validate:contact-fallbacks` | Submit button visible without valid URL | Check ContactForm.astro conditional rendering |
| `validate:page-structure` | Required section missing | Restore content (never delete to simplify) |
| `validate:design-tokens` | Hardcoded Tailwind color | Replace with `argmin-*` token |

## When to invoke this skill

- After implementing any feature or fix.
- After refactoring components or styles.
- Before opening a PR (final verification pass).
- When a CI gate fails and you need to iterate to green.

## Output

When the loop completes, report:

```
Verification: PASS (N iterations)
- check: pass
- build: pass
- validate:contact-fallbacks: pass
- validate:page-structure: pass (if applicable)
- validate:design-tokens: pass (if applicable)
Fixes applied:
- [list of fixes made during the loop]
```
