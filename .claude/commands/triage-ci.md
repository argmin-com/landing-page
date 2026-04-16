---
description: Fetch recent CI failures on main (or a PR) and diagnose root causes.
allowed-tools: Bash(gh run list*), Bash(gh run view*), Bash(gh pr checks*), Bash(gh pr view*)
argument-hint: "[PR number | branch]"
---

Diagnose CI failures.

1. **Scope selection:**
   - If $1 is a number: treat as PR number. Run `gh pr checks $1`.
   - If $1 is a branch: `gh run list --branch $1 --limit 10`.
   - If no arg: `gh run list --branch main --limit 20`.

2. **For each failed run,** fetch logs: `gh run view <id> --log-failed`. Extract the first clear error.

3. **Classify each failure:**

   | Classification | Pattern | Action |
   |---|---|---|
   | Known-external | "Workers Builds: landing-page" with 0-second fail | Skip — Cloudflare dashboard issue |
   | Concurrency cancel | status=cancelled, superseded by newer commit | Skip — working as designed |
   | Validator fail | `validate:*` exit !=0 | Surface the validator name + first error line |
   | Lighthouse threshold | "below 0.XX" in output | Surface route + metric + score |
   | Lychee broken link | "broken" in lychee output | Surface the URL + source file |
   | Build error | Astro compile fail | Surface file:line from error |
   | Type error | `astro check` output | Surface file:line |

4. **Propose fixes** for each non-external failure. Small fixes (typo, stale regex) — offer to apply inline. Larger fixes — delegate to `release-engineer` subagent.

## Output format

```
## CI Triage: <scope>

### Passing checks
<list>

### Failed checks
- <check name> at <run URL>
  Classification: <category>
  Root cause: <one line>
  Proposed fix: <what + which agent>

### Recommended next action
<specific command or delegation>
```

## Guardrails

- Never modify a validator to make a failing test pass. Fix the underlying code.
- Never retry a flaky test more than once without quarantining it with justification.
