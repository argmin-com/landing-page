---
description: Refresh repository documentation to match current code state. Delegates to doc-updater subagent.
allowed-tools: Read, Grep, Glob, Agent, Edit, Write, Bash(git diff*), Bash(git log*), Bash(npm run validate:page-structure)
---

Invoke the `doc-updater` subagent to audit all documentation for staleness.

1. Run `doc-updater` with the current diff range (default: `origin/main...HEAD`).
2. Review its PROPOSED_UPDATES list.
3. For each stale doc, apply the update if the proposed change is clearly correct.
4. For ambiguous updates, ask the user.
5. Run `npm run validate:page-structure` to confirm content-standards alignment.
6. Summarize what was updated.
