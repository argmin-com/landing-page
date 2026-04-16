---
description: Create a comprehensive implementation plan for a feature or change. Delegates to the planner subagent.
allowed-tools: Read, Grep, Glob, Agent
argument-hint: "<feature description>"
---

Invoke the `planner` subagent to create a detailed implementation plan.

1. Pass the user's feature description ($ARGUMENTS or conversation context) to the planner.
2. The planner will:
   - Read relevant docs (assistant-guide, design-system, content-standards)
   - Analyze affected files
   - Produce a phased plan with file paths, risks, and validation strategy
3. Review the plan for alignment with cardinal rules (content sacred, tokens only, homepage off-limits).
4. Present the plan to the user for approval before any implementation begins.

**Never skip planning for multi-file changes.** If the task touches more than 2 files, invoke this command.
