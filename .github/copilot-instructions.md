# GitHub Copilot Entry Guide

This repository supports multiple coding assistants. GitHub Copilot should use the shared repository guidance in `docs/assistant-guide.md` instead of relying on a Copilot-only rule set.

Before making changes:

1. Read `docs/assistant-guide.md`.
2. Read `README.md` for project and deployment context.
3. Read `docs/design-system.md` before any visual/CSS work.
4. Read `docs/content-standards.md` before any content changes.
5. Read the files you plan to modify and their direct dependencies.
6. Run the relevant validation commands before finishing work.

## Critical Rules

- **Content is sacred.** Restructure to present better — never delete to simplify. See `docs/content-standards.md`.
- **Use design tokens.** Never hardcode colors. See `docs/design-system.md`.
- **Check dark mode.** Every visual change must work in both themes.
- **Run validators.** `npm run validate:page-structure` and `npm run validate:design-tokens` after changes.

If guidance in this file and `codex.md` ever diverges, resolve the drift by updating both entrypoint files to match the shared assistant guide.
