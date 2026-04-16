---
name: strategic-compact
description: Context window management skill. When conversation context is growing long, use this to summarize state, capture decisions, and suggest compaction. Prevents context overflow during complex multi-step tasks.
---

# Strategic Compact

Manage context window usage during long implementation sessions. When context is getting long, summarize key state so the session can continue effectively or be handed off cleanly.

## When to invoke

- After completing a major implementation step in a long session.
- When the conversation has exceeded ~50 tool calls.
- Before starting a new phase of work that requires fresh context.
- When asked to compact or summarize session state.

## Compaction procedure

### 1. Capture current state

Summarize in this format:

```
## Session State

### Task
[One-line description of the overall goal]

### Completed
- [Step 1: what was done, key files touched]
- [Step 2: what was done, key files touched]

### In Progress
- [Current step and its status]

### Remaining
- [Step N: what still needs to happen]

### Key Decisions
- [Decision 1: what was decided and why]
- [Decision 2: what was decided and why]

### Files Modified
- [/absolute/path/to/file.ext] — [what changed]

### Validation State
- check: [pass/fail/not-run]
- build: [pass/fail/not-run]
- validate:contact-fallbacks: [pass/fail/not-run]
- validate:page-structure: [pass/fail/not-run]
- validate:design-tokens: [pass/fail/not-run]
- audit:site: [pass/fail/not-run]

### Blockers
- [Any unresolved issues or questions]
```

### 2. Identify what can be dropped

Context that is no longer needed:
- File contents that have been read and acted upon.
- Intermediate validation output from passing runs.
- Exploration paths that were abandoned.
- Verbose tool output that has been summarized.

### 3. Suggest next action

Based on the remaining work, suggest either:
- **Continue**: the next specific step to take.
- **New session**: if the remaining work benefits from a fresh context with the summary carried forward.
- **Handoff**: if the remaining work should go to a different agent or workflow.

## Rules

- Never discard information about failing validators or unresolved issues.
- Always include absolute file paths for modified files.
- Always include validation state so the next action knows what has been verified.
- Keep the summary under 100 lines. Brevity is the point.
- If decisions were made that deviate from standard patterns, explain why — the next session needs that context.

## Usage pattern

When context is long, the orchestrator can request:

```
Use the strategic-compact skill to summarize session state.
```

The skill produces the summary, which can then be used to:
1. Continue the current session with reduced context overhead.
2. Start a new session by pasting the summary as initial context.
3. Hand off to another agent or human with full state awareness.
