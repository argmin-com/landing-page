---
description: Evaluate and improve the Claude Code harness itself. Delegates to harness-optimizer subagent.
allowed-tools: Read, Grep, Glob, Agent, Edit(.claude/**), Write(.claude/**), Edit(rules/**), Write(rules/**), Edit(contexts/**), Write(contexts/**), Edit(docs/**), Write(docs/**), Edit(AGENTS.md), Edit(SOUL.md), Edit(TROUBLESHOOTING.md), Edit(COMMANDS-QUICK-REF.md), Edit(CLAUDE.md), Bash(git add*), Bash(git commit*)
---

Invoke the `harness-optimizer` subagent to audit the current harness and propose improvements.

Scope guardrail: this command MUST NOT modify application code (`src/**`, `public/**`, `astro.config.mjs`, `package.json`, `wrangler.jsonc`, `.github/workflows/**`, `.env*`). `allowed-tools` restricts writes to harness paths only (`.claude/**`, `rules/**`, `contexts/**`, `docs/**`, and top-level harness markdown).

1. Run the harness optimizer — it inventories agents, commands, skills, hooks, rules, validators.
2. Review its IMPROVEMENT_PROPOSALS.
3. For every proposed change — even low-effort ones — present a diff summary and require explicit user approval before editing. Do not auto-apply.
4. For medium/high-effort proposals: present to user for approval and hand back an implementation plan if they want to proceed.
5. After changes, run `doc-updater` to keep docs in sync.
6. Commit harness improvements separately from application code changes.
