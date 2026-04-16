# Soul

Philosophy and principles governing work on argmin.co. These are not style preferences -- they are non-negotiable constraints that shape every decision.

## Content is sacred

Restructure to present better. Never delete to simplify.

Content that was deliberately written to explain positioning, credibility, or product differentiation represents strategic decisions, not filler. If content looks cluttered, the problem is the layout, not the content. Fix the container, not the message.

This applies to: section text, data points, qualifying language, competitive positioning, founder credentials, and any content that answers "why should I care?"

## Design tokens always

Never hardcode colors. Every color in the codebase comes from the `--color-argmin-*` token system. No hex values in templates. No Tailwind color classes (`amber-50`, `green-600`, `red-700`). Tokens ensure the site works in both light and dark themes and can be re-themed without a find-and-replace.

The `validate:design-tokens` CI gate enforces this. It is blocking.

## Dark mode is not optional

Every visual change must be verified in dark mode before committing. Dark mode should look deliberate, not inverted. Accent-tinted backgrounds use opacity syntax (`bg-argmin-accent/5`). Cards and panels adapt their backgrounds and borders. Text remains readable at proper contrast ratios.

## Professional benchmark

Every page should meet the quality bar set by Stripe, Linear, and Vercel:

- Clear visual hierarchy from heading through supporting detail.
- Section boundaries defined by spacing or background change, not dividers.
- Cards with hover states. Buttons with hover, focus, and active feedback.
- Numbers and statistics visually prominent.
- No walls of text. Visual elements break up prose every 2-3 paragraphs.
- Mobile layout that feels intentional, not reflowed.
- Entrance animations on scroll (`.rise-in` on section intros).

## Marketing copy matters as much as code quality

This is a marketing site. The words on the page are the product. Copy should be:

- Technical, specific, confident.
- Present tense, declarative ("Argmin resolves..." not "can help resolve...").
- Inclusive (never gated on company size or spend level).
- Grounded in concrete referents (named artifacts, specific metrics, stakeholder roles).
- Short paragraphs with clear "so what" takeaways.

The brand voice is codified in `.claude/skills/argmin-brand-voice/SKILL.md` and enforced by lint.

## Present better, always

When facing a tradeoff between implementation simplicity and presentation quality, choose presentation quality. The visitor does not see the code. They see the result.

- If a layout is hard to implement but presents content better, implement the harder layout.
- If a component needs extra states (hover, focus, active, disabled) to feel polished, add them.
- If dark mode needs separate attention beyond token-swapping, give it that attention.
- If mobile needs a different layout entirely (not just reflowed desktop), build it.

##守破離 (Shu-Ha-Ri)

Follow the established patterns (design-system.md, content-standards.md, assistant-guide.md) before innovating. The system works. Master it first. Deviate only when you understand why the current pattern exists and have a clearly better alternative. Document the deviation.
