---
name: autopilot
description: Autonomous end-to-end execution skill. Use when the user gives a broad directive (improve, audit, fix, ship, polish) that should run from audit through deploy without check-ins. This skill codifies the loop-until-live pattern and the stop conditions.
---

# Autopilot execution

Autopilot runs a directive from audit → implementation → verify → ship → confirm-live without stopping. This skill is the execution pattern; the slash command wrapper is `.claude/commands/autopilot.md`.

## When to engage

**Broad directives** (engage autopilot):
- "improve the subpages"
- "audit and fix everything"
- "ship the best UX you can"
- "fix whatever's broken"
- "proceed with all of it"
- "do whatever you need to do"
- Any follow-up "proceed" after an audit

**Narrow directives** (do NOT engage autopilot):
- "change this one button"
- "what do you think about X?"
- "explain how Y works"
- "plan out the approach" (that's `/plan`)

## The five phases

### Phase 1: Classify

Read the directive and categorize it. Common patterns:

| Directive pattern | Workflow |
|---|---|
| "improve UI/UX", "subpages look bad", "polish the site" | F (full-spectrum) + G (UI/UX deep) |
| "fix accessibility" | A11y-focused subset of F |
| "improve SEO" | SEO-focused subset of F |
| "audit and fix CI" | D (CI) |
| "ship the content changes" | A (content) |
| "what's wrong with X" (report only) | `/full-audit` — NOT autopilot |

If ambiguous, default to Workflow F.

### Phase 2: Parallel audit

Launch every relevant specialist agent in a **single message, multiple Agent calls** (concurrent execution):

```
Agent(subagent_type="seo-auditor", prompt="...")
Agent(subagent_type="a11y-reviewer", prompt="...")
Agent(subagent_type="design-token-auditor", prompt="...")
Agent(subagent_type="visual-polish-reviewer", prompt="...")
Agent(subagent_type="release-engineer", prompt="...")
```

For content directives, also include `content-guardian` and `copywriter`. For harness directives, also `harness-optimizer`.

Wait for all to return, then consolidate into a single P0/P1/P2 list.

### Phase 3: Implement

**Do not present the list for approval.** Move directly to implementation.

Parallelize Edit operations across independent files. When 10+ changes span multiple files, delegate a chunk to an implementation subagent (general-purpose with specific file scope and rules).

Implementation rules:
- Make the smallest change that achieves the goal
- Preserve ALL existing content (cardinal rule)
- Never touch `src/pages/index.astro`
- Use `section-title*`, `section-kicker`, `.button-primary/secondary`, `argmin-*` tokens — never raw Tailwind palette
- Match patterns from other subpages when adding something new

### Phase 4: Verify

Run the full chain:
```bash
npm run check
npm run build
npm run audit:site
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
```

If ANY step fails:
1. Read the error message carefully
2. If root cause is obvious (typo, missing import, broken selector), fix directly
3. If unclear, run the underlying script with verbose output to understand
4. Re-run the full chain
5. Max 3 iterations. If still failing after iteration 3, surface to user with diagnosis.

### Phase 5: Ship and confirm live

1. `git add` specific files (never `git add .`)
2. Commit with structured message: summary line + sections per category (a11y, SEO, design, CI, content, docs)
3. `git push -u origin main` (or feature branch if branch protection)
4. Poll deployment via `gh run list --branch main --limit 1` until it shows "completed success" (max 5 min)
5. `curl -I https://argmin.co/<changed-page>` to confirm live response contains the change (header or body)
6. Report: what shipped, live URL, deferred items (if any)

## Stop conditions (CRITICAL only)

Pause only when:
- Change would alter a claim's meaning (factual assertion, metric, name)
- Change would delete content, even a paragraph
- Change would restructure navigation or URL routes
- Change touches CSP beyond tightening, auth, secrets, IAM
- Change requires force-push or main branch reset
- Target file is `src/pages/index.astro`

All other changes: proceed. Example safe-to-proceed changes:
- Contrast fixes (color swap via token)
- Radius normalization
- Shadow token migration
- Focus ring restoration
- Meta tag rewrites
- Canonical URL fixes
- JSON-LD additions
- Heading level corrections
- Typography class substitution (section-title for raw text-*)
- CI threshold adjustments
- Validator additions
- Component radius/spacing/border tweaks
- Documentation updates
- Hover/active/focus state additions
- Mobile responsive fixes

## Anti-patterns to avoid

- ❌ "Here's the plan, should I proceed?" → proceed.
- ❌ "Found 15 issues, want me to fix them?" → fix them.
- ❌ "Deploy looks done, should I verify?" → verify.
- ❌ "Which option do you prefer?" → if it's mechanical, pick the one that best matches the existing design system.
- ❌ Running one validator and stopping → run the FULL chain.
- ❌ Stopping at "pushed to main" → continue to deploy verification.

## Success criteria

An autopilot run is complete when:
1. All validators pass
2. Commit is on `main` (or merged PR if branch protection)
3. Cloudflare Workers Builds reports success
4. The live URL reflects the change
5. A consolidated summary is delivered to the user

## Example invocations

```
/autopilot improve subpage UI/UX
/autopilot fix all WCAG failures
/autopilot polish the platform page
/autopilot deep audit and ship all P0/P1 fixes
```

Each should run audit → fix → verify → ship → confirm-live without further prompts.
