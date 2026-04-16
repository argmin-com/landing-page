# Review Context

Load this context when reviewing pull requests, auditing code quality, or evaluating changes made by other agents.

## Review procedure

1. **Read the full commit history**, not just the latest commit.
   ```bash
   git log main..HEAD --oneline
   git diff main...HEAD
   ```

2. **Run the full audit chain.**
   ```bash
   npm run audit:site
   ```

3. **Run the UX Review Checklist** from `docs/ux-review-guide.md`:
   - Content integrity (no deletions, data points preserved, nav paths work)
   - Visual hierarchy (heading scale, kickers, readable body text, visual breaks)
   - Component quality (hover states, button states, tab a11y, form states)
   - Spacing and layout (section vars, border-radius, content widths, no overflow)
   - Dark mode (all text readable, no hardcoded colors, panels visible)
   - Animation (`.rise-in` on section intros, transitions on interactive elements)
   - Mobile (tabs degrade, cards stack, touch targets >= 44px, no overflow)
   - Professional benchmark (compare to Stripe/Linear/Vercel quality bar)

4. **Invoke specialist agents** in parallel for thorough review:
   ```
   Agent(subagent_type="content-guardian", prompt="...")
   Agent(subagent_type="design-token-auditor", prompt="...")
   Agent(subagent_type="ux-reviewer", prompt="...")
   Agent(subagent_type="a11y-reviewer", prompt="...")
   Agent(subagent_type="code-reviewer", prompt="...")
   ```

5. **Check for screenshots.** Visual changes must have before/after at 375px + 1440px in light + dark themes.

## What to look for

### Content
- Was any content deleted? Sections removed? Qualifying language weakened?
- Does `npm run validate:page-structure` still pass?
- Are per-page content requirements from `docs/content-standards.md` met?

### Design system compliance
- Are all colors from `--color-argmin-*` tokens? No hardcoded hex or Tailwind colors?
- Are headings using typography classes (`.section-title`, etc.)?
- Are sections using `--section-gap` (no `py-*` on `<section>`)?
- Are border-radius values from the three approved tiers?
- Does `npm run validate:design-tokens` pass?

### Security
- No hardcoded secrets or env values?
- Formspree fail-closed contract preserved?
- Honeypot field intact?
- Security headers in `public/_headers` not weakened?

### Performance
- No large images without `<picture>` + WebP?
- No unnecessary dependencies added?
- Total transfer still under budget?

### Accessibility
- ARIA roles correct on interactive components?
- Keyboard navigation implemented?
- Focus management preserved?
- Color contrast sufficient in both themes?

## Verdict format

After review, provide:

1. **PASS / FAIL / PASS WITH NOTES**
2. **Summary** (2-3 bullets on what changed)
3. **Issues found** (if any, with severity: blocker / warning / nit)
4. **Specialist results** (agent verdicts)
5. **Recommendation** (merge, request changes, or needs discussion)
