# UX Review Guide

Step-by-step quality protocol for reviewing visual/UX changes to
`argmin.co`. Use this guide when reviewing PRs, performing audits, or
building new features. Reference: `docs/design-system.md` for tokens,
`docs/content-standards.md` for content rules.

---

## Pre-Review Setup

1. Check out the branch locally.
2. Run `npm run dev` and open the site in a browser.
3. Open DevTools with device toolbar enabled.
4. Test at three viewports: **375px** (mobile), **768px** (tablet), **1440px** (desktop).
5. Toggle dark mode using the theme switcher.

---

## Review Checklist

### Content Integrity

- [ ] **No content was deleted.** Sections may be restructured but all substantive text remains accessible.
- [ ] **Data points preserved.** Numbers, statistics, specific examples are intact.
- [ ] **Competitive positioning intact.** How Argmin differs from alternatives is still clear.
- [ ] **Navigation paths work.** All cross-page links and CTAs resolve correctly.
- [ ] **Each page has its required elements.** See `docs/content-standards.md` per-page requirements.

### Visual Hierarchy (per section)

- [ ] **Heading scale correct.** H2 uses `.section-title` or `.section-title-lg`, not raw Tailwind sizes.
- [ ] **Overline labels present.** Every section has a `.section-kicker` label above the heading.
- [ ] **Body text readable.** Paragraph line-height ≥ 1.65, max-width ≤ 720px for prose blocks.
- [ ] **Visual breaks present.** No more than 3 consecutive paragraphs without a visual element (card, image, list, callout).
- [ ] **Numbers stand out.** Statistics and data points use larger font, monospace, or accent color — not buried in prose.

### Component Quality

- [ ] **Cards have hover states.** Every `.surface-panel` has visible `hover:translate-y-[-2px]` or shadow lift.
- [ ] **Buttons have all states.** Hover (lift), focus-visible (ring), active (press feedback), disabled (opacity).
- [ ] **Tabs are accessible.** `role="tablist"`, `role="tab"`, `aria-selected`, keyboard navigation (Arrow/Home/End).
- [ ] **Details/summary has chevron.** Rotates on open, accent-colored text, no `select-none`.
- [ ] **Form inputs have hover + focus.** Border color change on hover, ring on focus, error state on invalid.
- [ ] **Links have underline or color change.** In-text links must be distinguishable from body text.

### Spacing and Layout

- [ ] **Section spacing uses CSS vars.** No `py-*` on `<section>` elements — `--section-gap` handles it.
- [ ] **Consistent border-radius.** Only three values: panel (1.75rem), card (rounded-xl), pill (rounded-full).
- [ ] **Content widths respected.** Prose within `.prose-narrow` (720px), diagrams within `.diagram-wide` (960px).
- [ ] **No horizontal overflow.** Check at 375px — nothing should trigger horizontal scroll.

### Dark Mode

- [ ] **All text readable.** No text disappears against dark backgrounds.
- [ ] **No hardcoded light-mode colors.** No `amber-50`, `green-600`, `red-700` without dark: variants.
- [ ] **Cards and panels visible.** Borders and backgrounds adapt, not just text.
- [ ] **Images look intentional.** White-background images have rounded treatment or transparent backgrounds.
- [ ] **Accent tints adapted.** `bg-argmin-accent/5` works in both modes (opacity-based).

### Animation and Interaction

- [ ] **Section intros animate.** `.rise-in` on heading + first paragraph of each section.
- [ ] **Transitions on interactive elements.** Buttons, cards, tabs, links — all 180ms+ transitions.
- [ ] **No jarring state changes.** Expanding/collapsing content transitions smoothly.
- [ ] **`prefers-reduced-motion` respected.** All animations disabled when user preference is set.

### Mobile (<768px)

- [ ] **Tabs degrade gracefully.** Stacked panels with ARIA role swapping below 768px.
- [ ] **Cards stack vertically.** 2-column grids go to single column.
- [ ] **Touch targets ≥ 44px.** Buttons, links, and interactive elements meet minimum size.
- [ ] **SectionNav scrolls horizontally.** Pill bar doesn't wrap; horizontal scroll with hidden scrollbar.
- [ ] **Text doesn't overflow.** Long words or URLs have `break-words` or `overflow-wrap`.

### Professional Benchmark

Compare against stripe.com, linear.app, or vercel.com:

- [ ] **Does the page feel finished?** No placeholder content, no empty sections, no "coming soon."
- [ ] **Is the visual density appropriate?** Not too sparse (looks incomplete) or too dense (overwhelming).
- [ ] **Do interactive elements feel responsive?** Hover/click feedback within 100ms.
- [ ] **Is there visual variety?** Mix of text, cards, images, lists — not monotonous blocks.
- [ ] **Would you be proud to show this to a customer?** If hesitant, identify exactly what feels off.

---

## Common Failure Modes to Watch For

| Failure | What it looks like | Fix |
|---------|-------------------|-----|
| Content deletion disguised as cleanup | "Simplified the page" but critical sections are gone | Restore content, restructure layout instead |
| Hardcoded colors | `text-green-600` or `bg-amber-50` in templates | Replace with argmin-* tokens or add semantic tokens |
| Missing hover states | Cards that look clickable but have no visual feedback | Add `transition-transform duration-200 hover:translate-y-[-2px]` |
| Inconsistent radii | Mix of `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-[2rem]` | Consolidate to the three approved values |
| Typography bypass | `text-3xl font-bold` instead of `.section-title` | Use the type classes from design-system.md |
| Mobile afterthought | Desktop looks great, mobile has overflow or cramped text | Design mobile-first, then enhance for desktop |
| Dark mode blindness | Looks great in light mode, unreadable in dark | Test dark mode before committing |

---

## For AI Agents

When performing UX work on this repo:

1. **Read `docs/design-system.md` before writing any CSS or markup.**
2. **Read `docs/content-standards.md` before modifying any page content.**
3. **Never remove content without explicit owner approval.** If content looks cluttered, fix the layout.
4. **Run `npm run validate:page-structure` after any content change.** It enforces minimums.
5. **Run `npm run validate:design-tokens` after any styling change.** It catches hardcoded colors.
6. **Include before/after screenshots** for any visual change at 375px and 1440px in both themes.
7. **Check the UX Review Checklist above** before marking work complete.
