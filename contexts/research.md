# Research Context

Load this context when investigating options, exploring approaches, or answering technical questions. This is a read-only context -- do not edit files.

## Ground rules

- **Read only.** Do not create, edit, or delete any files.
- **No commits.** Do not stage, commit, or push anything.
- **No builds.** Do not run `npm run build` or other modification commands. Read-only commands (grep, glob, read, git log, git diff) are fine.
- Report findings structured, with file paths and evidence.

## Research workflow

1. **Clarify the question.** What specifically needs to be understood?
2. **Search broadly.** Use Grep and Glob to find relevant files, patterns, and implementations.
3. **Read deeply.** Read the relevant files, their dependencies, and related documentation.
4. **Cross-reference.** Check docs/, design-system.md, content-standards.md, and assistant-guide.md for relevant constraints.
5. **Summarize findings.** Structured report with evidence.

## Output format

Structure findings as:

### Question
> Restate the question being investigated.

### Findings
- **File paths** examined (absolute paths).
- **Current state**: what exists today.
- **Relevant constraints**: from docs, CI gates, design system, content standards.
- **Options** (if applicable): enumerate approaches with tradeoffs.

### Recommendation
- Preferred approach with rationale.
- Risks or blockers to flag.
- Which specialist agents should review implementation.

### Evidence
- Code snippets or configuration excerpts that support the findings.
- Specific line numbers where relevant patterns or constraints are defined.

## Common research tasks

| Task | Where to look |
|---|---|
| How is X implemented? | `src/components/`, `src/pages/`, `src/lib/` |
| What tokens exist? | `src/styles/global.css`, `docs/design-system.md` |
| What content is required? | `docs/content-standards.md`, `scripts/validate-page-structure.mjs` |
| What does CI enforce? | `.github/workflows/quality.yml`, `package.json` scripts |
| What are the deploy constraints? | `astro.config.mjs`, `wrangler.jsonc`, `public/_headers` |
| How does Formspree work? | `src/lib/formspree.ts`, `src/components/ContactForm.astro` |
| What agents/commands exist? | `.claude/agents/`, `.claude/commands/`, `docs/agents/README.md` |
