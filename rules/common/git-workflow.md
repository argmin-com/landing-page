# Git Workflow

Rules for commits, branches, and pull requests on this repository.

## Commit format

```
type: short description (imperative mood, lowercase after colon)
```

Types: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `test`, `ci`, `perf`.

Examples:
- `feat: add qualifying criteria section to use-cases page`
- `fix: restore email fallback when Formspree URL is missing`
- `style: convert hardcoded hex to argmin-accent token`
- `docs: update design-system.md with new shadow tokens`

Rules:
- Subject line under 72 characters.
- Imperative mood ("add", not "added" or "adds").
- No period at the end of the subject line.
- Body (optional) separated by blank line. Explain "why", not "what".
- Reference issues when applicable: `Fixes #42`.

## Branch naming

- Claude Code branches: `claude/<topic>-<slug>` (e.g., `claude/platform-tab-a11y`).
- Copilot branches: `copilot/<topic>` (e.g., `copilot/fix-lighthouse-score`).
- Human branches: `<username>/<topic>` or `feature/<topic>`.
- Never commit directly to `main`.

## Pull request process

1. **Review the full commit history**, not just the latest commit. Use `git log main..HEAD` and `git diff main...HEAD`.
2. **Write a thorough description:**
   - Summary: 2-3 bullets explaining what changed and why.
   - Content impact: if `src/pages/**` was touched, complete the content preservation checklist from `docs/content-standards.md`.
   - Screenshots: before/after at 375px + 1440px in light + dark themes for visual changes.
   - Test plan: which validators were run, what was manually verified.
3. **Run the full audit** before opening: `npm run audit:site`.
4. **Request specialist review** via subagents when applicable:
   - Content changes: `content-guardian`
   - Style changes: `design-token-auditor` + `ux-reviewer`
   - Copy changes: `copywriter`
5. **CI must pass.** All quality gates in `quality.yml` are blocking.

## Force push

- Never force push to `main`. This is a hard rule.
- Force push to feature branches only when rebasing before merge and only if you are the sole author.
- Prefer creating new commits over amending when collaborating.

## Merge strategy

- Squash merge to `main` via GitHub UI or `gh pr merge --squash`.
- Delete feature branches after merge.
