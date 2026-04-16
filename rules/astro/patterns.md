# Astro Patterns

Rules specific to Astro 6 component authoring and page construction in this codebase.

## Client-side JavaScript

- Use `is:inline` for all client-side scripts. This keeps them in the HTML output without Astro's module processing.
- Astro renders static HTML. Do not add framework islands (React, Vue, Svelte) unless the task explicitly requires client-side interactivity that cannot be achieved with vanilla JS.
- Common `is:inline` patterns: theme toggle, IntersectionObserver for scroll animations, tab keyboard navigation, mobile menu toggle.

```astro
<script is:inline>
  document.querySelectorAll('[role="tab"]').forEach(tab => {
    tab.addEventListener('keydown', handleTabKeyboard);
  });
</script>
```

## Design tokens only

Never hardcode colors in Astro templates. Use the `--color-argmin-*` token system:

```astro
<!-- Good -->
<p class="text-argmin-mid">Description</p>
<div class="bg-argmin-surface border border-argmin-border">

<!-- Bad — hardcoded Tailwind color or hex -->
<p class="text-slate-600">Description</p>
<div class="bg-white border border-gray-200">
<span style="color: #3b82f6">
```

The `validate:design-tokens` CI gate catches violations. Run it after any styling change.

## Section spacing

Section vertical spacing is handled by `--section-gap` in `global.css`:

```css
main > section { padding-block: var(--section-gap); }
```

Rules:
- Do NOT add `py-*` Tailwind classes to `<section>` elements.
- Use `px-6` for horizontal gutters only.
- Use `--subsection-gap` for spacing between groups within a section.
- For spacing between elements inside a section, use Tailwind gap/margin utilities normally.

## Typography classes

Use the defined typography scale for all headings and prominent text:

| Element | Required class |
|---|---|
| Hero headline | `.page-title` or `.display-title` |
| Section heading (h2) | `.section-title` or `.section-title-lg` |
| Section overline | `.section-kicker` |
| Intro paragraph | `.page-lede` |
| Definition labels | `.page-note-label` |

Do not use raw Tailwind text sizes (`text-3xl`, `text-5xl`) for headings. Card titles and list items may use Tailwind sizes within the body range (`text-sm` to `text-xl`).

## Dark mode verification

Before committing any visual change:

1. Toggle the theme switcher to dark mode.
2. Check every modified section for readability, contrast, and visual coherence.
3. Verify accent-tinted backgrounds use opacity syntax: `bg-argmin-accent/5` not `bg-blue-50`.
4. Verify images with light backgrounds have appropriate treatment.

Dark mode is not optional. The `validate:design-tokens` script catches hardcoded colors, but visual verification catches subtler issues (low contrast, invisible borders, inverted-looking sections).

## Entrance animations

Apply `.rise-in` to section introductions on all pages:

```astro
<section>
  <div class="site-shell">
    <p class="section-kicker rise-in">Label</p>
    <h2 class="section-title rise-in">Heading</h2>
    <p class="page-lede rise-in rise-in-delay-1">Description</p>
  </div>
</section>
```

Rules:
- `.rise-in` on section heading and kicker.
- `.rise-in-delay-1` on the first paragraph or secondary content.
- Do not apply `.rise-in` to every element — just the section introduction.
- All animations respect `prefers-reduced-motion: reduce`.

## Component structure

Standard Astro component layout:

```astro
---
// 1. Imports
import BaseLayout from '@/layouts/BaseLayout.astro';

// 2. Props interface
interface Props {
  title: string;
}

// 3. Props destructuring
const { title } = Astro.props;

// 4. Computed values (keep under 50 lines)
const formattedTitle = title.toUpperCase();
---

<!-- 5. Template markup -->
<div class="surface-panel">
  <h2 class="section-title">{formattedTitle}</h2>
  <slot />
</div>

<!-- 6. Client scripts (if needed) -->
<script is:inline>
  // Minimal client JS
</script>
```

## Page structure

Every page follows this pattern:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title" description="Meta description">
  <main>
    <section> <!-- Hero --> </section>
    <section> <!-- Content sections --> </section>
    <section> <!-- CTA --> </section>
  </main>
</BaseLayout>
```

- All pages use `BaseLayout` for consistent metadata, analytics, and global shell.
- Sections are direct children of `<main>` so `--section-gap` applies.
- Each page needs at least one CTA section (see `docs/content-standards.md`).

## Interactive components

For tabs, details/summary, and other interactive patterns:
- Use semantic HTML and ARIA roles as specified in `docs/design-system.md`.
- Keyboard navigation must be implemented via `is:inline` script.
- Mobile degradation (tabs to accordion below 768px) must be handled.
- Every interactive element needs hover, focus-visible, and active states with transitions.

## Formspree integration

The contact form pattern is defined in `src/components/ContactForm.astro`. Rules:
- Check `src/lib/formspree.ts` for URL validation before rendering submit.
- If URL is invalid or missing, show email fallback from `src/lib/contact.ts`.
- Include the honeypot field. Never remove it.
- Use HTML5 validation attributes on form inputs.
