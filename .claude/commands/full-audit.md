---
description: Parallel audit of the site by all specialist subagents. Produces a consolidated quality report.
allowed-tools: Bash(npm run audit:site), Bash(npm run build), Bash(npm run check), Bash(npm run validate:*), Bash(git diff*), Bash(git log*), Read, Grep, Glob
---

Run a comprehensive multi-agent audit of the current branch (or main if on main).

1. **Baseline check.** Run `npm run audit:site`. Proceed even if it fails — downstream agents will dig in.

2. **Parallel specialist audit.** Invoke these subagents concurrently in a single message with multiple Agent tool uses:

   - `content-guardian` — verify no content deletion vs `origin/main`
   - `design-token-auditor` — check token compliance, radius consistency, spacing
   - `ux-reviewer` — full UX checklist
   - `seo-auditor` — meta, canonical, JSON-LD, OG, sitemap, GEO
   - `a11y-reviewer` — WCAG AA + pa11y where possible
   - `release-engineer` — workflow health, dependency sanity

3. **Consolidate.** Produce a single quality report:

```
# Argmin Site Audit — <date>

## Scope
- Branch: <branch>
- Files changed vs main: <N>

## Composite verdict
QUALITY SCORE: <N/100>
GATES:
  content       : PASS | FAIL
  design tokens : PASS | FAIL
  ux            : PASS | FAIL
  seo           : PASS | FAIL
  a11y          : PASS | FAIL
  release       : PASS | FAIL

## Blocking issues
<list with file:line>

## Non-blocking polish
<list>

## Next action
<specific recommendation>
```

4. **Score calculation:**
   - Start at 100.
   - Subtract 15 per blocking specialist failure.
   - Subtract 5 per validator failure.
   - Subtract 2 per non-blocking issue, cap at -20 total.

## Guardrails

- **Read-only.** This command never modifies files. Any fixes happen in a subsequent command or PR.
- If the score is < 70 on main, something is seriously wrong — escalate to the user with the full report.
