---
description: Pull a PR diff and run the full UX review checklist + specialist subagent review against it.
allowed-tools: Bash(gh pr view*), Bash(gh pr diff*), Bash(gh pr checks*), Bash(git fetch*), Bash(git checkout*), Bash(npm run audit:site), Bash(npm run validate:*), Bash(npm run check), Bash(npm run build), Read, Grep, Glob, Agent
argument-hint: "<PR number>"
---

Review PR #$1 systematically.

1. **Fetch PR metadata.** `gh pr view $1 --json title,body,files,headRefName,baseRefName,author,labels,state`
2. **Fetch the diff.** `gh pr diff $1`
3. **Fetch CI status.** `gh pr checks $1`
4. **Determine review scope** based on which files changed:

   | Files touched                        | Delegate to                     |
   |--------------------------------------|----------------------------------|
   | `src/pages/**` or `src/components/**`| `content-guardian` + `ux-reviewer` |
   | `src/styles/global.css`              | `design-token-auditor`           |
   | `src/layouts/BaseLayout.astro`       | `seo-auditor`                    |
   | interactive components (tabs/forms)  | `a11y-reviewer`                  |
   | `.github/workflows/**` or `package.json` | `release-engineer`           |
   | copy-only changes (text in .astro)   | `copywriter` for voice review    |

5. **Run the subagents in parallel** using the Agent tool. Each returns a VERDICT block.
6. **Consolidate verdicts** into a single review comment:

```
## Review of PR #$1: <title>

### Summary
<1-2 sentences of the change>

### Specialist verdicts
- content-guardian: PASS | FAIL — <note>
- design-token-auditor: PASS | FAIL — <note>
- ux-reviewer: PASS | FAIL — <note>
- seo-auditor: PASS | FAIL — <note>
- a11y-reviewer: PASS | FAIL — <note>
- release-engineer: PASS | FAIL — <note>

### Blocking issues
- <file>:<line> <issue>

### Non-blocking suggestions
- <suggestion>

### CI status
<summary of gh pr checks>

### Recommendation
APPROVE | REQUEST_CHANGES | COMMENT
```

7. **Do not post the review automatically.** Print the draft and wait for the user to approve posting.

## Guardrails

- Never approve your own PR (GitHub blocks this anyway).
- If the PR touches the homepage (`src/pages/index.astro`), flag it explicitly — the homepage is off-limits by default.
- If the PR has unresolved review threads from other reviewers (gemini-code-assist, Copilot, github-advanced-security), summarize them in the "Blocking issues" section.
