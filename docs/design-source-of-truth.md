# Argmin Landing Page Design Source of Truth

Use this document as the standing reference for future landing-page modifications. Validate design, content, layout, interaction, and deployment decisions against the sources listed here before inheriting patterns from the current code.

## Source Priority

Apply these sources in this order when decisions conflict:

1. Product intent and scope
   - `argmin_landing_prd_v1_2.pdf`
   - `argmin_landing_eng_spec_v1_2.pdf`
   - `argmin_landing_page_deployment_guide.pdf`
2. Brand and design principles
   - `argmin-vision-mission.pdf`
   - `argmin_design_principles.docx`
   - `argmin_style_guide.docx`
3. UI system implementation details
   - `argmin_design_tokens.json`
   - `argmin_ui_kit.html`
   - `argmin_ui_kit_reference.docx`

The product PDFs are the minimum required source set. If the brand and UI-kit files are unavailable in a clone, do not block implementation or review on that absence. Use the product documents first, then this repository's documented color and spacing tokens.

## Non-Negotiable Design Principles

These principles summarize the external design principles and the product documents. They should govern every landing-page update:

- Clarity over cleverness: copy, labels, and CTAs should be immediately understandable.
- Substance before style: visuals should support comprehension, not compete with the message.
- Honest uncertainty: claims should be precise, qualified where needed, and never overstate confidence.
- Progressive depth: lead with the headline value, then allow deeper detail without overwhelming first glance.
- Infrastructure posture: the experience should feel calm, credible, and reliable rather than loud or attention-seeking.

When a design choice is ambiguous, evaluate it in that exact order and let the highest-priority principle decide.

## Brand System Rules

These are the default visual rules for this repository when no newer approved brand assets are available locally.

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

Use light, high-contrast surfaces by default. Inverse navy sections are acceptable only when they materially improve comprehension and do not reintroduce prohibited chrome.

### Typography

- Follow the engineering specification first: prefer the system font stack for the live site to preserve the payload budget and avoid render-blocking font downloads.
- If approved brand font assets are later added to the repository and explicitly approved for production use, document that exception here before enabling them.
- Technical values, IDs, and other code-like labels may use a monospace stack if they materially improve scanning.

Hierarchy defaults:

- Hero/display: 48-80px bold depending on viewport
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
- Focus states should be obvious, accessible, and use the brand interactive color family.
- Do not introduce scroll-triggered animation, carousels, accordions, or navigation chrome prohibited by the PRD.

## Landing-Page Application Rules

For this repository specifically, future requests should follow these working rules:

- Preserve the existing single-page information architecture unless the PRD or engineering spec requires a structural change.
- Keep headline messaging concrete and enterprise-facing; avoid vague AI-marketing language.
- The site should remain attribution-first. Do not broaden the story into generic AI observability, governance, or all-compute positioning without a newer product source.
- Trust-boundary copy must stay precise: read-only integrations, in-environment deployment, and no implication that raw telemetry broadly leaves the customer environment.
- Prefer concise sections with clear proof points over decorative or high-density visual treatments.
- Favor calm, trustworthy layouts over trend-driven landing-page effects.
- Keep accessibility, performance, and static deployability aligned with the engineering spec and deployment guide.
- Do not reintroduce a navbar, sticky header, extra route-based marketing pages, or other UI chrome prohibited by the PRD.

## Change Checklist

Before finalizing any landing-page modification, check:

1. Does it align with the PRD and engineering spec?
2. Does it follow the five design principles in order?
3. Does it stay within the performance budget and deployment posture from the engineering spec?
4. Does it preserve an infrastructure-grade tone: clear, credible, and restrained?
5. Does it remain responsive, accessible, and compatible with the static Astro build?

## Notes For Future Work

- If a future request conflicts with these sources, prefer updating this document or explicitly documenting the exception in the change summary.
- If new brand or product documents are introduced, add them here so the repository keeps a current design reference trail.
- Do not hard-code user-specific absolute filesystem paths in repository docs.
