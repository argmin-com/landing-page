---
description: Build, validate, commit, push, and open a PR on the current branch. Monitors CI and prompts to fix failures.
allowed-tools: Bash(npm run audit:site), Bash(npm run check), Bash(npm run build), Bash(npm run validate:*), Bash(git status*), Bash(git diff*), Bash(git log*), Bash(git add*), Bash(git commit*), Bash(git push*), Bash(gh pr*), Bash(gh run*)
argument-hint: "<PR title>"
---

Ship the current branch as a PR.

1. **Verify branch.** `git branch --show-current` — we are not on `main`.
2. **Verify tree.** `git status --short` — if dirty, ask whether to stage + commit.
3. **Run audit.** `npm run audit:site`. If any validator fails, stop and report.
4. **Commit** (if uncommitted changes exist):
   - Stage only files you intentionally modified. Never use `git add -A`.
   - Commit message must describe the "why", not the "what". Reference the issue/audit if relevant.
   - Append the Claude Code session URL trailer.
5. **Push.** `git push -u origin <branch>`.
6. **Open PR** with `gh pr create`:
   - Title: $1 if provided, otherwise derive from commit message.
   - Body: fill the PR template sections:
     - Summary (2-3 bullets)
     - Content impact (if `src/pages/**` touched, complete the checklist)
     - Screenshots (placeholder reminder if visual change — note that baselines need to be captured and attached manually)
     - Test plan (checkboxes for the validators you ran)
   - Set base: `main`.
7. **Monitor CI.** Print the PR URL, then fetch `gh pr checks <url>` until completion or timeout (5 min).
8. **On CI failure:** invoke `release-engineer` subagent for root-cause analysis.
9. **On CI success:** print "Ready for review. Approve and merge with `gh pr merge --squash`."

## Guardrails

- Never force-push unless the user explicitly asks.
- Never bypass pre-commit hooks (`--no-verify`).
- If the current branch is `main`, refuse — ask the user to create a feature branch first.
- If `src/pages/index.astro` is in the diff, ask for explicit confirmation before pushing (homepage is off-limits by default).
