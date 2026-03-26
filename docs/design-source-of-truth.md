# Argmin Landing Page Design Source of Truth

Use this document as the standing reference for any future landing-page modifications. When we make design, content, layout, interaction, or implementation changes in this repository, we should validate them against the sources listed here and cite them in change notes when relevant.

## Source Priority

Apply these sources in this order when decisions conflict:

1. Product intent and scope
   - `/Users/wargniez/Documents/Argmin/argmin_landing_prd_v1_2.pdf`
   - `/Users/wargniez/Documents/Argmin/argmin_landing_eng_spec_v1_2.pdf`
   - `/Users/wargniez/Documents/Argmin/argmin_landing_page_deployment_guide.pdf`
2. Brand and design principles
   - `/Users/wargniez/Documents/Argmin/argmin-vision-mission.pdf`
   - `/Users/wargniez/Documents/Argmin/argmin_design_principles.docx`
   - `/Users/wargniez/Documents/Argmin/argmin_style_guide.docx`
3. UI system implementation details
   - `/Users/wargniez/Documents/Argmin/argmin_design_tokens.json`
   - `/Users/wargniez/Documents/Argmin/argmin_ui_kit.html`
   - `/Users/wargniez/Documents/Argmin/argmin_ui_kit_reference.docx`

## Non-Negotiable Design Principles

These principles come from `argmin_design_principles.docx` and should govern every landing-page update:

- Clarity over cleverness: copy, labels, navigation, and CTAs should be immediately understandable.
- Substance before style: visuals should support comprehension, not compete with the message.
- Honest uncertainty: claims should be precise, qualified where needed, and never overstate confidence.
- Progressive depth: lead with the headline value, then allow deeper detail without overwhelming first glance.
- Infrastructure posture: the experience should feel calm, credible, and reliable rather than loud or attention-seeking.

When a design choice is ambiguous, evaluate it in that exact order and let the highest-priority principle decide.

## Brand System Rules

These are the default visual rules pulled from `argmin_style_guide.docx`, `argmin_design_tokens.json`, `argmin_ui_kit_reference.docx`, and `argmin_ui_kit.html`.

### Color

- Primary brand navy: `#0F2B46`
- Primary interactive azure: `#2D6A9F`
- Hover/focus sky: `#4A9FD9`
- Accent ice: `#E8F4FD`
- Primary text: `#111827`
- Body text: `#374151`
- Secondary text: `#6B7280`
- Borders/dividers: `#D1D5DB`
- Secondary surface: `#F3F4F6`

Use light, high-contrast surfaces by default. Inverse navy sections are appropriate for hero, footer, and other deliberate emphasis zones.

### Typography

- Headings and navigation: `Plus Jakarta Sans`
- Body copy, labels, buttons, forms: `DM Sans`
- Technical values, IDs, code-like data: `JetBrains Mono`

Hierarchy defaults:

- Hero/display: 48px bold
- H1: 30px bold
- H2: 24px semibold
- H3: 20px semibold
- Body: 16px regular
- Caption: 12px medium

Keep body copy to a readable measure of about `72ch` max.

### Spacing and Layout

- Base spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128px
- Card radius: 8px default
- Grid gap: 16px
- Desktop content width: 960px standard, up to 1280px on wide layouts
- Buttons should generally use 32px, 40px, or 48px heights

### Motion and Interaction

- Default motion should feel restrained and utility-driven.
- UI kit default transition timing is `150ms ease-out`.
- Focus states should be obvious, accessible, and use the brand interactive color family.

## Landing-Page Application Rules

For this repository specifically, future requests should follow these working rules:

- Preserve the existing single-page information architecture unless the PRD or engineering spec requires a structural change.
- Keep headline messaging concrete and enterprise-facing; avoid vague AI-marketing language.
- Prefer concise sections with clear proof points over decorative or high-density visual treatments.
- Use design tokens and UI kit patterns before inventing new colors, radii, shadows, or component variants.
- Favor calm, trustworthy layouts over trend-driven landing-page effects.
- Treat charts, diagrams, confidence statements, and product claims as evidence-bearing content, not decoration.
- Keep accessibility, performance, and static deployability aligned with the engineering spec and deployment guide.

## Change Checklist

Before finalizing any landing-page modification, check:

1. Does it align with the PRD and engineering spec?
2. Does it follow the five design principles in order?
3. Does it use the Argmin brand tokens, typography, and spacing system?
4. Does it preserve an infrastructure-grade tone: clear, credible, and restrained?
5. Does it remain responsive, accessible, and compatible with the static Astro build?

## Notes For Future Work

- If a future request conflicts with these sources, prefer updating this document or explicitly documenting the exception in the change summary.
- If new brand or product documents are introduced, add them here so the repository keeps a current design reference trail.
