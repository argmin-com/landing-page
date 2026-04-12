# Design System Reference

Design tokens, component patterns, and quality rules for `argmin.co`.
Every visual change to the site must align with this reference. If a
pattern is missing, add it here first, then implement.

---

## Core Principle

**Present content at the highest possible visual quality. Never delete
content to simplify a layout — restructure the layout to present
content better.**

---

## Color Tokens

All colors are defined as space-separated RGB triplets in
`src/styles/global.css` under `:root` (light) and
`html[data-theme="dark"]` (dark). Never hardcode hex values or use
non-token Tailwind colors (e.g., `amber-50`, `green-600`, `red-700`).
Always use the `--color-argmin-*` system.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `argmin-dark` | near-black | near-white | Primary text, headings |
| `argmin-mid` | slate-600 | slate-300 | Body text, descriptions |
| `argmin-light` | slate-500 | slate-400 | Muted text, labels, inactive states |
| `argmin-accent` | blue | light-blue | CTAs, active states, highlights, icons |
| `argmin-accent-ink` | near-black | near-black | Text on accent backgrounds |
| `argmin-accent-hover` | darker-blue | lighter-blue | Hover state for accent elements |
| `argmin-bg` | off-white | near-black | Page background |
| `argmin-surface` | white | dark-navy | Card/panel backgrounds |
| `argmin-surface-alt` | light-gray | darker-navy | Alternating section backgrounds |
| `argmin-border` | light-gray | dark-gray | Borders, dividers |

### When you need a semantic color not in the system

If you need success/warning/error states (green checks, red X marks,
amber alerts), define new token variables:

```css
:root {
  --color-argmin-success: 34 197 94;
  --color-argmin-warning: 245 158 11;
  --color-argmin-danger: 239 68 68;
}
html[data-theme="dark"] {
  --color-argmin-success: 74 222 128;
  --color-argmin-warning: 251 191 36;
  --color-argmin-danger: 248 113 113;
}
```

Do NOT use `text-green-600`, `bg-amber-50`, `text-red-700`, etc.

---

## Typography Scale

All type styles are defined in `global.css`. Use these classes — do not
create one-off font sizes.

| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `.page-title` / `.display-title` | `clamp(2.8rem, 7vw, 5.8rem)` | 650 | Hero headlines only |
| `.section-title-lg` | `clamp(1.75rem, 4vw, 2.5rem)` | 650 | Major section headings |
| `.section-title` | `clamp(1.55rem, 3vw, 2.05rem)` | 600 | Standard section headings |
| `.page-lede` | `clamp(1.05rem, 2vw, 1.35rem)` | 400 | Intro paragraphs below heroes |
| `.section-kicker` | `0.72rem` | 700 | Overline labels (uppercase, tracked) |
| `.page-note-label` | `0.72rem` | 700 | Definition term labels |
| body (default) | `1rem` | 400 | Body text, descriptions |
| `.site-wordmark` | `clamp(1rem, ..., 1.18rem)` | 600 | Brand name in nav/footer |

### Rules

- Every `<h2>` in a page section must use `.section-title` or `.section-title-lg`.
- Every section overline must use `.section-kicker`.
- Do not use raw Tailwind `text-3xl`, `text-5xl`, etc. for headings — use the type classes.
- Exception: card titles and list items can use Tailwind sizes within the body range (text-sm to text-xl).

---

## Spacing

### Section Rhythm

Global CSS vars applied via `main > section { padding-block: var(--section-gap) }`:

| Var | Desktop | Mobile (<768px) |
|-----|---------|-----------------|
| `--section-gap` | `6rem` (96px) | `4rem` (64px) |
| `--subsection-gap` | `3rem` (48px) | `2rem` (32px) |

Do NOT add `py-*` Tailwind classes to `<section>` elements — the global
rule handles vertical padding. Use `px-6` for horizontal gutters only.

### Content Width

| Class | Width | Use |
|-------|-------|-----|
| `.site-shell` | `78rem` (1248px) | Page container |
| `.prose-narrow` | `720px` | Prose-heavy text blocks |
| `.diagram-wide` | `960px` | Diagrams, images, wide cards |
| `max-w-[640px]` | `640px` | Legal/policy long-form text |

---

## Border Radius

Consolidate to these three values:

| Token | Value | Use |
|-------|-------|-----|
| Panel radius | `1.75rem` | `.surface-panel`, `.page-hero-shell`, `.page-cta-shell` |
| Card radius | `0.75rem` (`rounded-xl`) | Inner cards, callout boxes, form inputs |
| Pill radius | `999px` (`rounded-full`) | Buttons, tags, nav pills, quick-links |

Do NOT introduce new radius values. If a component needs rounding, use
one of these three.

---

## Shadows

| Var | Use |
|-----|-----|
| `--page-shadow-soft` | Cards, panels, nav bar |
| `--page-shadow-strong` | Hero shell, mobile nav panel, prominent modals |

Do not add inline `box-shadow` values.

---

## Component Patterns

### Surface Panel (`.surface-panel`)

The standard card. Gradient background, border, backdrop-blur, soft shadow.

```html
<div class="surface-panel px-6 py-6">
  <p class="section-kicker">Label</p>
  <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-argmin-dark">Title</h3>
  <p class="mt-3 text-base leading-7 text-argmin-mid">Description</p>
</div>
```

**Rules:**
- Every card hover state: add `transition-transform duration-200 hover:translate-y-[-2px]` minimum.
- Every card must be visually distinguishable from body content (has border + background).
- Cards in a grid should have equal internal padding.

### Buttons

| Style | Class | Use |
|-------|-------|-----|
| Primary | `.button-primary` | Main CTA (dark bg, light text) |
| Secondary | `.button-secondary` | Alternative action (bordered, light bg) |

**Rules:**
- Every button needs `:hover` (translateY -1px or -2px), `:focus-visible` (ring), and `:active` feedback.
- Disabled state: `opacity-50 cursor-not-allowed`.
- Never create one-off button styles. If a new variant is needed, define it in `global.css` first.

### Tabs

Accessible tab pattern used on `/platform` and `/use-cases`.

**Requirements:**
- `role="tablist"`, `role="tab"`, `role="tabpanel"` with proper ARIA.
- Keyboard: Arrow keys cycle, Enter/Space activate, Home/End jump.
- Active state: `border-b-[3px] border-argmin-accent text-argmin-dark`.
- Mobile (<768px): Tabs should degrade to stacked panels (accordion) with proper ARIA role swapping.

### Details/Summary

Used for progressive disclosure (decision rule, optional form fields).

**Requirements:**
- Chevron icon that rotates on open (`group-open:rotate-180`).
- Summary text in accent color, 500 weight.
- No `select-none` on summary (breaks accessibility).
- Smooth expand preferred but not required (CSS grid-row animation).

### SectionNav

Sticky horizontal pill bar for in-page navigation.

**Requirements:**
- Applied to any page with 3+ anchor sections.
- `position: sticky; top: 0; z-index: 20`.
- IntersectionObserver highlights active section.
- Links use Overline style (0.6875rem, 500 weight, uppercase, tracked).
- Active: accent color + accent/10 background pill.

---

## Animation

### Entrance Animations

- Homepage sections use `.rise-in` with staggered delays.
- **Subpage sections should also use `.rise-in`** on section intros and key content blocks.
- Apply `.rise-in` to: section headings, first paragraph, key visuals.
- Apply `.rise-in-delay-1` to secondary content in the same section.

### Transitions

Every interactive element must have a transition:
- Buttons: `transition: transform 180ms ease, background-color 180ms ease`
- Cards: `transition: transform 200ms ease, box-shadow 200ms ease`
- Links: `transition: color 180ms ease`
- Nav items: `transition: background-color 180ms ease, color 180ms ease`

### Reduced Motion

All animations must be disabled when `prefers-reduced-motion: reduce`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Dark Mode

### Mandatory checks before any PR

1. Every page must be visually verified in dark mode.
2. No hardcoded light-theme colors (hex, rgb, or non-token Tailwind classes).
3. Accent-tinted backgrounds must use `/opacity` syntax: `bg-argmin-accent/5` not `bg-blue-50`.
4. Success/warning/error colors must be token-based (see Color Tokens above).
5. Images with white backgrounds need `rounded-lg` treatment or transparent backgrounds.

---

## Professional Quality Benchmark

Every subpage should meet this bar (reference: stripe.com, linear.app, vercel.com):

- [ ] Clear visual hierarchy: heading → subhead → body → supporting detail
- [ ] Section boundaries defined by spacing OR background change, not just dividers
- [ ] Cards have hover states with shadow or translate lift
- [ ] Numbers and statistics are visually prominent (larger font, accent color, monospace)
- [ ] No walls of text — every paragraph is broken by visual elements within 3 paragraphs
- [ ] Interactive elements have visible hover, focus, and active states
- [ ] Entrance animations on scroll (`.rise-in` on section intros)
- [ ] Mobile layout is intentional, not just desktop reflowed
- [ ] Dark mode looks deliberate, not inverted
