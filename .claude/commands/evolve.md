---
description: Evaluate and improve the Claude Code harness itself. Delegates to harness-optimizer subagent.
allowed-tools: Read, Grep, Glob, Agent
---

Invoke the `harness-optimizer` subagent to audit the current harness and propose improvements.

1. Run the harness optimizer — it inventories agents, commands, skills, hooks, rules, validators.
2. Review its IMPROVEMENT_PROPOSALS.
3. For high-impact, low-effort proposals: implement them.
4. For medium/high-effort proposals: present to user for approval.
5. After changes, run `doc-updater` to keep docs in sync.
6. Commit harness improvements separately from application code changes.
