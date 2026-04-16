# Coding Style

Rules adapted for this Astro 6 + TypeScript 5.9 + Tailwind CSS 4 codebase.

## Immutability

- Prefer `const` over `let`. Never use `var`.
- Use `as const` for literal objects and arrays that should not be mutated.
- Prefer `readonly` on interface properties unless mutation is required.
- Avoid mutating function arguments. Return new values instead.

## File size

- Target: 200-400 lines per file.
- Warning threshold: 400 lines. Consider extracting a component or utility.
- Hard maximum: 800 lines. Files above this must be split before merging.
- Astro page files may exceed 400 lines if they contain substantial markup, but logic sections (frontmatter, inline scripts) must stay under 100 lines each.

## Function size

- Maximum: 50 lines per function or method.
- If a function needs more, extract helper functions with descriptive names.
- Astro frontmatter blocks are effectively functions — keep them under 50 lines.

## Nesting depth

- Maximum: 4 levels of nesting (if/for/while/try).
- Use early returns to flatten conditionals.
- Extract nested logic into named functions.

## Error handling

- Handle errors at boundaries: API calls, env var reads, file I/O, user input.
- Never swallow errors silently. At minimum, log the error context.
- Use TypeScript's type system to make impossible states unrepresentable.
- Formspree integration: fail-closed. If the endpoint is absent or invalid, show the email fallback.

## No console.log in production

- Remove `console.log` before committing. Use it for debugging only.
- Validation scripts and build tools may use `console.log`/`console.error` for output.
- Astro components must never contain `console.log` — the pre-commit hook blocks it.

## Naming

- Files: kebab-case for utilities (`form-helpers.ts`), PascalCase for components (`ContactForm.astro`).
- Variables/functions: camelCase.
- Types/interfaces: PascalCase.
- CSS custom properties: `--color-argmin-*`, `--section-gap`, etc. Follow existing token patterns.
- Constants: UPPER_SNAKE_CASE for true constants (`CONTACT_EMAIL`), camelCase for derived values.

## Imports

- Group imports: Astro/framework first, then libraries, then local modules, then styles.
- Use path aliases when available (`@/lib/`, `@/components/`).
- No circular imports.

## Comments

- Explain "why", not "what". The code should be self-documenting for "what".
- Use JSDoc for exported functions in `.ts` files.
- TODOs must include context: `// TODO(username): reason — tracking issue if applicable`.
