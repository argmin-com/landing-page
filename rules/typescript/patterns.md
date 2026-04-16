# TypeScript Patterns

TypeScript rules for this Astro 6 + TypeScript 5.9 (strict mode) codebase.

## Strict mode

`tsconfig.json` is set to strict. Do not weaken it. Every file must pass `npm run check` with no errors.

## Astro Props interface

Every Astro component that accepts props must define a `Props` interface:

```astro
---
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const { title, description, variant = 'primary' } = Astro.props;
---
```

Rules:
- Export `Props` only if another file needs to reference it.
- Use union types for constrained values (`'primary' | 'secondary'`), not `string`.
- Provide defaults via destructuring, not conditional logic.
- Mark optional props with `?`, never use `| undefined` explicitly.

## No `any`

Never use `any`. Alternatives:

| Instead of | Use |
|---|---|
| `any` | `unknown` (then narrow with type guards) |
| `any[]` | `unknown[]` or a specific tuple/array type |
| `Record<string, any>` | `Record<string, unknown>` or a typed interface |
| `(arg: any) => any` | Generic function `<T>(arg: T) => T` |

If a third-party type is genuinely untyped, use `as unknown as ExpectedType` with a comment explaining why.

## Const assertions

Use `as const` for literal objects and arrays that define configuration:

```typescript
export const NAV_ITEMS = [
  { label: 'Platform', href: '/platform' },
  { label: 'Use Cases', href: '/use-cases' },
] as const;
```

This preserves literal types and makes the array readonly.

## Type-only imports

Use `type` imports for types that are erased at runtime:

```typescript
import type { CollectionEntry } from 'astro:content';
```

Astro enforces this in strict mode. The build fails if a type-only import is used as a value.

## Prefer TypeScript over runtime validation

For internal code (component props, utility functions, shared config):
- Use TypeScript's type system to enforce correctness at build time.
- Do not add runtime type checks for data that is already type-safe.

For boundary code (user input, env vars, external data):
- Validate at the boundary and type-narrow the result.
- The Formspree URL validation in `src/lib/formspree.ts` is the canonical example.

## Discriminated unions

Prefer discriminated unions over optional fields for variant types:

```typescript
// Good
type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; message: string }
  | { status: 'error'; error: string };

// Avoid
interface FormState {
  status: string;
  message?: string;
  error?: string;
}
```

## Utility types

Use built-in utility types where they simplify code:
- `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`
- `Record<K, V>` for typed dictionaries
- `NonNullable<T>` to strip null/undefined
- `ReturnType<typeof fn>` to derive types from functions

## Environment variables

Access via `import.meta.env`:

```typescript
const formspreeUrl = import.meta.env.PUBLIC_FORMSPREE_URL;
```

- `PUBLIC_` prefix: available in client-side code.
- No prefix: build-time only, never sent to browser.
- Type declarations in `src/env.d.ts` if custom env vars need types.

## File conventions

- Utility files: `kebab-case.ts` in `src/lib/`.
- Type-only files: `kebab-case.ts` or co-located with the module they type.
- No barrel files (`index.ts` that re-exports). Import directly from the source module.
