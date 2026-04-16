# Development Context

Load this context when implementing features, fixing bugs, or making visual changes.

## Before writing any code

1. **Read `docs/assistant-guide.md`** for repo invariants and core commands.
2. **Read `docs/design-system.md`** for tokens, typography, spacing, and component patterns.
3. **Read `docs/content-standards.md`** if the change touches any page content.
4. **Read the files you will modify** plus their direct dependencies.

## While implementing

- **Use design tokens.** Never hardcode colors. Use `--color-argmin-*` system exclusively. The `validate:design-tokens` CI gate is blocking.
- **Check dark mode.** Toggle the theme switcher and verify every modified section before committing.
- **Content is sacred.** Restructure to present better. Never delete to simplify. If content looks cluttered, fix the layout.
- **Use typography classes.** `.section-title`, `.section-kicker`, `.page-lede` for headings. No raw Tailwind text sizes on headings.
- **Use section spacing vars.** No `py-*` on `<section>`. Use `--section-gap`.
- **Apply `.rise-in`** to section intros on subpages.
- **Search before creating.** Grep for existing components and patterns. Prefer extending over duplicating.

## Before considering work complete

Run the full audit chain:

```bash
npm run audit:site
```

This covers: typecheck, build, contact fallbacks, page structure, design tokens, and more.

For visual changes, also:
- Capture before/after screenshots at 375px + 1440px in both light and dark themes.
- Run `npm run validate:design-tokens` explicitly.
- Check the UX Review Checklist in `docs/ux-review-guide.md`.

For content changes, also:
- Run `npm run validate:page-structure`.
- Run brand voice lint: `node .claude/skills/argmin-brand-voice/lint.mjs <file>`.

## Key file paths

| File | Purpose |
|---|---|
| `src/styles/global.css` | Design tokens, shared styles |
| `src/layouts/BaseLayout.astro` | Page shell, metadata, analytics |
| `src/components/ContactForm.astro` | Shared contact form |
| `src/content/site.ts` | Navigation + footer config |
| `src/lib/formspree.ts` | Formspree URL validation |
| `src/lib/contact.ts` | Contact email constant |
| `docs/design-system.md` | Token reference |
| `docs/content-standards.md` | Content rules |

## Specialist agents to invoke

| Concern | Agent |
|---|---|
| Content touched | `content-guardian` |
| Styles touched | `design-token-auditor` |
| Visual changes | `ux-reviewer` |
| Copy written | `copywriter` |
| A11y concerns | `a11y-reviewer` |
