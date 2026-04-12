# Content Standards

Rules governing the textual content of `argmin.co`. These standards
ensure product narrative integrity across design changes and prevent
high-value content from being silently removed.

---

## Cardinal Rule

> **Restructure to present better. Never delete to simplify.**

If content looks cluttered, the problem is the layout, not the content.
Fix the container, not the message. Content that was deliberately written
to explain positioning, credibility, or product differentiation is
sacred — it represents strategic decisions, not filler.

---

## Content Change Classification

| Change type | Review requirement | CI enforcement |
|-------------|-------------------|----------------|
| **Copy edit** (grammar, typo, tense) | Standard PR review | None |
| **Restructure** (move, re-order, re-style) | PR review + screenshots | `validate-page-structure` |
| **Content removal** (>50 words deleted) | Explicit justification in PR body + owner approval | `validate-page-structure` |
| **Section removal** (entire named section) | Owner sign-off required | `validate-page-structure` fails |
| **New content** | PR review | `validate-page-structure` |

---

## Per-Page Content Requirements

The `scripts/validate-page-structure.mjs` CI script enforces a subset
of these structural minimums against the built HTML in `dist/`. The
full requirements below remain the content standard for each page, but
not every item is currently CI-enforced. If a page drops below the
validator checks implemented in `scripts/validate-page-structure.mjs`,
CI fails; requirements not covered by that script must still be
preserved and are reviewed in PRs.

### /platform

**Purpose:** Convince a technical buyer that Argmin solves a problem
their current stack cannot.

Required elements:
- Hero with product positioning headline
- Problem framing (why existing approaches fail — may be tabbed, accordioned, or standalone, but the content must exist)
- Competitive landscape visual (image)
- Control points section (4 control points)
- Attribution flow diagram
- Example attribution record with concrete values
- Decision rule (formal or collapsed, but present)
- Deployment timeline (3 phases)
- At least one CTA block

### /use-cases

**Purpose:** Let visitors self-select by role and see role-specific value.

Required elements:
- Three persona sections (Engineering, Finance/FinOps, Security)
- Each persona: trigger/pain point, signals/inputs, intervention description, outcome
- Qualifying criteria section ("best fit" or equivalent)
- At least one CTA block

### /about

**Purpose:** Establish credibility and point of view in under 60 seconds.

Required elements:
- Company belief statements (minimum 2)
- Design partner status note
- At least one CTA block

### /team

**Purpose:** Give customers and investors confidence in domain expertise.

Required elements:
- Both founder bios with:
  - Photo
  - Name and title
  - LinkedIn link
  - Bio narrative (minimum 2 sentences)
  - Specific credentials or achievements
- At least one CTA block

### /security

**Purpose:** Give security reviewers confidence about trust boundary.

Required elements:
- Security principles (minimum 4)
- Data flow: what is accessed vs. what is never done
- At least one CTA block

### /contact

**Purpose:** Capture leads with minimal friction.

Required elements:
- Contact form with name, email, company, message fields
- Intent selection (demo vs. question)
- Email fallback when form is unavailable

### /privacy

**Purpose:** Legal compliance.

Required elements:
- All 13 policy sections (validated by section IDs)
- Jump-to-section navigation
- Contact information for privacy inquiries

---

## Content Preservation Checklist (for PR authors)

Before opening any PR that modifies page content:

- [ ] **No section was deleted.** Sections may be restructured (tabbed, collapsed, re-ordered) but their content must remain accessible to the visitor.
- [ ] **No qualifying language was removed.** Phrases that explain "why this matters" or "when this applies" must be preserved.
- [ ] **No specific data points were removed.** Numbers, statistics, timeframes, and concrete examples are high-value.
- [ ] **No navigation paths were broken.** Cross-page links and CTAs must still work.
- [ ] **Competitive positioning is intact.** Any content explaining how Argmin differs from alternatives must remain.
- [ ] **Founder credentials are intact.** Specific achievements, institutions, and experience details must remain.

---

## Writing Style

- Imperative, direct tone. "Argmin resolves..." not "Argmin can help resolve..."
- Specific over vague. "$357M savings" not "significant savings."
- Technical accuracy over marketing polish. The audience is engineers, security reviewers, and FinOps practitioners.
- Short paragraphs (3–4 sentences max). Break long blocks with visual elements.
- Every section needs a "so what" — if the visitor stops reading here, they should have gotten one clear takeaway.
