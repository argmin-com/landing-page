---
name: content-engine
description: Marketing content creation workflow for argmin.co. Combines brand voice, content standards, and validation into a repeatable process. Use when drafting or editing marketing copy.
---

# Content Engine

End-to-end workflow for creating and editing marketing content on argmin.co. Ensures all copy meets brand voice standards, content governance rules, and CI validation requirements.

## Workflow

### 1. Read brand voice

Load the argmin brand voice skill first:
- Voice axes: technical, specific, confident, present-tense, declarative.
- Banned phrases: check the full list in `.claude/skills/argmin-brand-voice/SKILL.md`.
- Inclusivity: never gate on company size or spend level.
- Specificity: every section needs a concrete referent (named artifact, metric, or role).

### 2. Read content standards

Read `docs/content-standards.md` for:
- Cardinal rule: restructure to present better, never delete to simplify.
- Per-page content requirements (each page has required elements).
- Content change classification (copy edit vs. restructure vs. removal).
- Writing style: imperative, direct, specific over vague, short paragraphs.

### 3. Read existing copy

Before drafting, read the current page content to:
- Understand existing voice and tone.
- Identify content that must be preserved.
- Find the right insertion points for new content.
- Ensure new copy flows naturally with existing text.

### 4. Draft content

Write the draft following these rules:
- Present tense, declarative voice: "Argmin resolves..." not "Argmin can help resolve..."
- Specific over vague: "$357M savings" not "significant savings."
- Short paragraphs (3-4 sentences max).
- Every section needs a "so what" takeaway.
- At least one concrete referent per substantive section.
- Sentence length target: 25 words or fewer.
- Reading level: Flesch ease >= 65 for heroes, >= 55 for body.

### 5. Lint the draft

Run the brand voice lint script:

```bash
node .claude/skills/argmin-brand-voice/lint.mjs <file-or-text>
```

Check for:
- Banned phrases (leverage, seamless, robust, game-changer, etc.)
- Flesch reading ease score
- Sentence length violations

Iterate until the lint passes.

### 6. Validate content structure

After implementing the copy:

```bash
npm run validate:page-structure
```

This enforces per-page content minimums from `docs/content-standards.md`.

### 7. Self-check

Before handing off to the orchestrator, verify:

- [ ] **No content was deleted.** Existing sections and data points preserved.
- [ ] **Brand voice compliant.** No banned phrases. Correct tense and register.
- [ ] **Inclusive framing.** No gating on company size, spend level, or scale.
- [ ] **Concrete referents.** Named artifacts, metrics, or roles in every section.
- [ ] **Lint passes.** Brand voice lint returns clean.
- [ ] **Structure valid.** `validate:page-structure` passes.

## Per-page quick reference

| Page | Purpose | Key requirements |
|---|---|---|
| `/platform` | Technical buyer conviction | Problem framing, control points (4), attribution flow, decision rule, deployment timeline |
| `/use-cases` | Role-based self-selection | 3 personas (Eng, Finance, Security), each with trigger/signals/intervention/outcome |
| `/about` | Credibility in 60 seconds | Belief statements (2+), design partner note |
| `/team` | Domain expertise confidence | Both founders: photo, name, title, LinkedIn, bio (2+ sentences), credentials |
| `/security` | Security reviewer confidence | Principles (4+), data flow (accessed vs. never) |
| `/contact` | Lead capture | Form with name/email/company/message, intent selection, email fallback |
| `/privacy` | Legal compliance | 13 policy sections, jump-to-section nav, contact info |

## Output format

When the skill completes, hand back to the orchestrator:

```
Draft: [the copy]
Lint: [pass/fail + details]
Inclusivity: [self-check result]
Referents: [list of concrete referents used]
Validation: [validate:page-structure result]
```
