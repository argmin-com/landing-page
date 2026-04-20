---
description: End-to-end autonomous executor. Takes a broad directive, runs audit → implement → verify → ship → confirm-live without stopping.
argument-hint: "<directive>"
allowed-tools: Read, Grep, Glob, Agent, Edit, Write, Bash(npm*), Bash(npx*), Bash(git*), Bash(gh*), Bash(curl*), WebFetch
---

You are in **autopilot mode**. Execute the user's directive end-to-end, autonomously, until the change is live on https://argmin.co. Do not stop to ask for confirmation on mechanical fixes.

Directive: `$ARGUMENTS`

## Stop conditions (CRITICAL only — all others: proceed)

Pause only when a proposed change would:
- Alter page **copy meaning** (rewriting a claim, not rewording for tone)
- **Delete content** (the cardinal rule in CLAUDE.md)
- **Restructure navigation** (add/remove pages, reorder top-level nav, change URL routes)
- Touch **security-sensitive surfaces** (CSP beyond tightening, auth, secrets, IAM)
- Require **force-push** or **main branch reset**
- Modify **`src/pages/index.astro`** (explicit CLAUDE.md rule)

Everything else — WCAG fixes, meta tags, design tokens, spacing, radius, shadows, typography, component extraction, CI tuning, validator thresholds, documentation — proceed without check-in.

## Execution sequence

1. **Classify the directive.** Invoke `directive-router` to identify the workflow (A-G in `docs/agents/README.md`). If unclear, default to Workflow F (full-spectrum sweep).

2. **Parallel audit.** Launch every relevant specialist agent in parallel (single message, multiple Agent calls). Common default set: `seo-auditor`, `a11y-reviewer`, `design-token-auditor`, `visual-polish-reviewer`, `release-engineer`. Content changes also include `content-guardian`, `copywriter`.

3. **Consolidate findings** into a P0/P1/P2 list. Do not present for approval — move to implementation.

4. **Implement all P0 and P1 fixes.** Use parallel Edit/Write operations where files are independent. Delegate chunks to implementation subagents when >10 changes span multiple files.

5. **Verify.** Run `npm run audit:site` + configured contact path. If any validator fails, diagnose root cause via `release-engineer` and fix. Loop until all validators pass (max 3 iterations; if still failing, surface to user).

6. **Commit and push.** Structured commit message grouped by category (a11y, SEO, design tokens, CI, content). Push to `main` or feature branch per branch protection rules.

7. **Open PR if required.** If branch protection blocks direct push, use `gh pr create` via `ship-pr` pattern.

8. **Confirm deployment.** Invoke `deploy-verifier`:
   - Wait for Cloudflare Workers Builds to complete (poll `gh run list` or Cloudflare dashboard)
   - Fetch live URL with `curl -I` for header changes or `WebFetch` for content changes
   - Compare against expected state

9. **Report final summary.** What shipped, what's live, what was deferred (only if stop condition was hit).

## Feedback loop

After each commit, before the next iteration:
- Re-run the specialist agents that flagged issues to confirm the fix stuck
- If a fix introduced a regression elsewhere, correct immediately before moving on

## Error handling

- **CI failure after push**: `triage-ci` → diagnose → fix → re-push. Do not require user intervention.
- **Deploy failure**: Inspect Cloudflare logs, identify root cause, fix or revert. Surface to user only if revert doesn't restore known-good state.
- **Validator uncertainty**: If a validator's output is ambiguous, read its source (scripts/validate-*.mjs) and re-run with verbose output. Don't guess.

## Outputs

Never produce a plan and wait. Produce changes and verify them. The user sees:
- A brief "Starting autopilot on <directive>" line
- Terse progress markers as phases complete (audit done, P0 shipped, validating, live at <URL>)
- A consolidated final summary
