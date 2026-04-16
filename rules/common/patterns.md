# Common Patterns

Reuse-first rules that prevent duplication and keep the codebase coherent.

## Search before creating

Before writing any new component, utility, or style:

1. **Grep the codebase** for existing implementations of similar functionality.
2. **Check `src/components/`** for reusable patterns — most UI needs already have a component.
3. **Check `docs/design-system.md`** for approved tokens, spacing, and component patterns.
4. **Check `src/styles/global.css`** for existing utility classes and CSS custom properties.

If something close exists, extend it rather than duplicating.

## Prefer editing over new files

- Modify an existing file before creating a new one.
- Add a variant to an existing component before creating a parallel component.
- Extend an existing utility before writing a new utility file.
- New files are justified only when they serve a genuinely distinct purpose.

## Reuse existing component patterns

### Surface panel

The standard card pattern. Use `.surface-panel` for any content card:

```html
<div class="surface-panel px-6 py-6">
  <p class="section-kicker">Label</p>
  <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-argmin-dark">Title</h3>
  <p class="mt-3 text-base leading-7 text-argmin-mid">Description</p>
</div>
```

Do not invent new card wrappers. If `.surface-panel` is insufficient, extend it in `global.css`.

### Buttons

Use `.button-primary` for main CTAs and `.button-secondary` for alternative actions. Never create one-off button styles inline.

### Typography classes

Use `.section-title`, `.section-title-lg`, `.section-kicker`, `.page-title`, `.page-lede` for headings and intro text. Do not reach for raw Tailwind text sizes for headings.

### Layout containers

- `.site-shell` (78rem) for page containers.
- `.prose-narrow` (720px) for text-heavy blocks.
- `.diagram-wide` (960px) for diagrams and wide cards.

## Follow the existing file organization

```
src/
  components/     # Reusable Astro components (PascalCase.astro)
  layouts/        # Page layouts (BaseLayout.astro)
  pages/          # File-based routes
  content/        # Shared data (site.ts)
  lib/            # Utilities and helpers (kebab-case.ts)
  styles/         # Global CSS (global.css)
public/           # Static assets
scripts/          # Build/validation scripts (kebab-case.mjs)
docs/             # Project documentation
```

Do not create new top-level directories without discussion. Place new files where existing similar files live.

## Astro component conventions

- Props interface defined at top of frontmatter.
- Destructure props immediately: `const { title, description } = Astro.props;`
- No business logic in templates — compute values in frontmatter.
- Use slots for composable content injection.

## CSS conventions

- Design tokens in `global.css` under `:root` and `html[data-theme="dark"]`.
- Component-specific styles use Tailwind utility classes in markup.
- Shared patterns defined as CSS classes in `global.css` (e.g., `.surface-panel`, `.button-primary`).
- Never use `@apply` for single-use styles. Prefer inline Tailwind classes.
