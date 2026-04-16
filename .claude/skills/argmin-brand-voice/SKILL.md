---
name: argmin-brand-voice
description: Use whenever writing, rewriting, or reviewing marketing copy for argmin.co. Provides voice rules, banned phrases, a lint script, and reference samples. Use this skill BEFORE delegating to the copywriter subagent — it's the style guide the agent reads.
---

# Argmin brand voice

Copy on `argmin.co` speaks to engineering leaders, FinOps practitioners, security reviewers, and builders earlier in their AI journey. The tone is **technical, specific, confident — never gated on scale or spend**.

## Voice axes

| Axis | Target | Anti-pattern |
|---|---|---|
| Tense | Present, declarative | Future / hypothetical |
| Register | Technical, specific | Marketing bloat |
| Pronouns | "Argmin does X" | "We help you X" |
| Specificity | Named artifacts, numbers | Vague adjectives |
| Inclusivity | Open framing | Gated on spend/scale |
| Sentence length | ≤ 25 words | Run-ons with em-dashes |

## Banned phrases

If any of these appear in a draft, swap before merging:

- `leverage` → `use`
- `unlock` → `open up` / `enable` / `surface`
- `seamless` / `frictionless` → `in one step` / `without re-instrumentation`
- `revolutionary` / `cutting-edge` / `best-in-class` / `industry-leading` → (delete; show, don't tell)
- `robust` → specific attribute (`fault-tolerant`, `fail-open`, `audited`)
- `game-changer` / `next-gen` → (delete)
- `simply` / `just` → (delete; these understate effort)
- `you're already spending millions on AI` → broaden (see "Inclusivity" below)
- `we help X do Y` → `X does Y with Argmin`

## Required in every substantive section

- At least one **concrete referent**: a named artifact (CODEOWNERS, Formspree, Cloudflare, GitHub Advisories), a specific metric (700x, 2500ms, $357M, 50ms latency budget), or a specific stakeholder role (engineering owner, FinOps practitioner, security reviewer).
- A clear **"so what"**: if the reader stops after this paragraph, what did they get?

## Inclusivity (cardinal)

Never gate on company size or current spend. Every subpage should read as relevant to:

- A team running a single AI workload who wants governance before it scales
- A Fortune 500 with dozens of models and multiple cloud accounts
- A compliance-driven team where attribution matters more than cost

**Bad**: "You're already spending millions on AI. Can you explain where it goes?"
**Good**: "AI spend grows fast. Ownership should keep up."

**Bad**: "For enterprise teams with >$1M AI spend."
**Good**: "For teams tracking AI spend to owners and budgets."

## Reading level targets

- Hero: Flesch reading ease ≥ 65 (accessible)
- Body: Flesch reading ease ≥ 55 (professional)

Use `node .claude/skills/argmin-brand-voice/lint.mjs <text-file-or-astro>` to score a draft.

## Tone anchors (approved reference copy)

### Platform hero
> AI spend grows fast. Ownership should keep up.
>
> As teams adopt AI across more services and use cases, the gap between what is spent and who owns it widens. Argmin gives engineering, finance, and security a shared system of record — resolving every model call to a service, owner, and budget before costs compound.

### Use Cases hero
> One platform. Every stakeholder's question answered.
>
> Engineering wants to catch regressions before production. Finance needs spend tied to owners and budgets. Security requires governance without broadening the attack surface. Argmin serves all three from a single attribution layer.

### Contact hero
> Let's talk about what you're building.
>
> Whether you're managing AI spend, building governance workflows, or trying to trace ownership across services — start with one workload. We connect read-only and show the attribution path before you commit further.

## Workflow

When invoked to draft copy:

1. Read `docs/content-standards.md` (cardinal rule: restructure, never delete).
2. Read the existing copy on the page being edited so voice is preserved.
3. Draft replacement/new copy.
4. Run `node .claude/skills/argmin-brand-voice/lint.mjs <draft>` — iterate until all banned phrases cleared and Flesch target hit.
5. Hand back to orchestrator with:
   - The draft
   - Lint results
   - Inclusivity self-check
   - Concrete referents used

Never edit page files directly from this skill — that's the orchestrator's job.
