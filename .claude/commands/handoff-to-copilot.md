---
description: Hand off current work to GitHub Copilot coding agent by creating a labeled issue or requesting review on an existing PR.
allowed-tools: Bash(gh issue*), Bash(gh pr*), Bash(git branch*), Read
argument-hint: "<'issue' | 'pr-review'> <title or PR number>"
---

Hand off work to the GitHub Copilot coding agent.

## Mode 1: Create a Copilot-owned issue

Invoked as `/handoff-to-copilot issue "<issue title>"`

1. Read any draft context the user has provided in the current session.
2. Construct an issue body including:
   - Clear problem statement (2-3 sentences)
   - Acceptance criteria as a checklist of validators that must pass
   - File scope (glob pattern)
   - Non-negotiable constraints (don't modify homepage, content is sacred, use tokens)
   - Reference links to `docs/assistant-guide.md`, `docs/design-system.md`, `docs/content-standards.md`
3. Create the issue:
   ```
   gh issue create --title "<title>" --body "<body>" --label "agent:copilot"
   ```
4. Assign to Copilot:
   ```
   gh issue edit <number> --add-assignee Copilot
   ```
5. Print the issue URL and note that Copilot should open a draft PR within minutes.

## Mode 2: Request Copilot review on an existing PR

Invoked as `/handoff-to-copilot pr-review <PR number>`

1. Verify the PR exists and is not draft: `gh pr view $2 --json isDraft,state,title`.
2. If draft, mark ready: `gh pr ready $2`.
3. Request Copilot review: `gh pr edit $2 --add-reviewer copilot-pull-request-reviewer`.
4. Print confirmation.

## Guardrails

- Always include `docs/content-standards.md` reference in the issue body — Copilot's coding agent must know content is sacred.
- Include `npm run audit:site` as an explicit acceptance criterion so Copilot runs it before pushing.
- If the handoff is for a task involving the homepage, flag this explicitly and require user confirmation first.
- Never hand off ambiguous specs. If the task is fuzzy, run `/plan` first (or ask the user).
