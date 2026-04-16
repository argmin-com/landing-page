---
name: search-first
description: Before writing any code, search for existing implementations. Prevents duplication and ensures consistency with established patterns. Use this skill at the start of any implementation task.
---

# Search First

Before writing any new code, search the codebase for existing implementations that can be reused or extended. This prevents duplication, maintains consistency, and leverages patterns that have already been reviewed and validated.

## Search procedure

### Step 1: Search for existing components

```bash
# Search for components with similar names or purposes
grep -r "ComponentName\|similar-keyword" src/components/
ls src/components/
```

If a component exists that does 80% of what you need, extend it rather than creating a new one.

### Step 2: Check the design system

Read `docs/design-system.md` for:
- Color tokens (`--color-argmin-*`)
- Typography classes (`.section-title`, `.section-kicker`, etc.)
- Spacing vars (`--section-gap`, `--subsection-gap`)
- Component patterns (`.surface-panel`, `.button-primary`, `.button-secondary`)
- Border radius values (panel, card, pill)
- Shadow vars (`--page-shadow-soft`, `--page-shadow-strong`)

### Step 3: Check global.css for existing utilities

```bash
grep -n "class-name-you-need\|similar-pattern" src/styles/global.css
```

### Step 4: Check existing pages for patterns

```bash
# How do other pages handle this pattern?
grep -r "pattern-you-need" src/pages/
```

### Step 5: Check lib/ for utilities

```bash
ls src/lib/
grep -r "function-name\|utility-name" src/lib/
```

## Decision tree

```
Need a UI component?
  ├── Exists in src/components/ → USE IT
  ├── Similar exists → EXTEND IT (add prop variant)
  └── Nothing similar → CREATE (using design-system.md patterns)

Need a style?
  ├── Token exists in global.css → USE THE TOKEN
  ├── Pattern exists (.surface-panel, .button-primary) → USE THE PATTERN
  └── New pattern needed → ADD TO global.css FIRST, then use

Need a utility?
  ├── Exists in src/lib/ → IMPORT IT
  ├── Similar exists → EXTEND IT
  └── New utility → CREATE in src/lib/ (kebab-case.ts)

Need page structure?
  ├── Check existing pages for the pattern
  ├── Use BaseLayout
  ├── Use <main> > <section> structure
  └── Apply .site-shell, typography classes, .rise-in
```

## What to report

After searching, document:
- **Found**: existing components/patterns that will be reused.
- **Gaps**: what does not exist and must be created.
- **Tokens**: design system tokens that apply to this task.

## Anti-patterns to avoid

- Creating `CardV2.astro` when `Card.astro` exists and could be extended with a prop.
- Defining a new CSS class for a style that `.surface-panel` already provides.
- Writing a utility function that duplicates logic in `src/lib/`.
- Using raw Tailwind color classes instead of argmin tokens.
- Creating a new button style instead of using `.button-primary` or `.button-secondary`.
