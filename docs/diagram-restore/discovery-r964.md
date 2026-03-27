# Diagram Restore Discovery (`r964`)

## Repo and branch context

- Repo: `argmin-com/landing-page`
- Remote: `https://github.com/argmin-com/landing-page.git`
- Working branch for this restore: `feature/restore-old-diagram-r964`
- Discovery worktree: `/Users/richardmckinney/Documents/landing-page-actions`
- The workspace contains one application repo only; no separate frontend, infra, or design-assets repo was present locally.

## Charlotte attribution verification

- GitHub does not expose Charlotte-authored PR objects for this repo, but Charlotte-authored code is present in commit history.
- The relevant author identity is `floatinglittlerocks <charlotte.wargniez@lincoln.ox.ac.uk>`, which corresponds to the GitHub account `charlottecwargniez`.
- Recent Charlotte commits on the site path include `9fce34b`, `0536778`, `1c9a73c`, `dc2e1af`, `13ac43f`, `5736107`, `0f62767`, and `dbfd6d3`.

## Access and deploy notes

- Discovery access was read-only until the feature branch was created.
- Build commands:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`
  - `npm run deploy`
- Deploy target is Cloudflare via `wrangler`.
- Preview/publish from this environment is currently blocked by Wrangler auth; `wrangler whoami` is not authenticated, so local verification is possible but direct staged deploy is not.

## Historical baseline

- The last non-Charlotte-authoritative `main` snapshot before `0178820` is `9644a60`.
- `0178820` is the explicit cutover commit: `merge origin/main into charlotte; keep Charlotte branch authoritative for site content`.
- The richer attribution card implementation lives in `9644a60`.
- The current hover interaction model lives in the SVG diagram path that appears in `1e5eda3` and remains structurally consistent on current `main`.

## Candidate files

| File | Commit | Purpose | Relevant discovery notes |
| --- | --- | --- | --- |
| `src/components/AttributionFlowDiagram.astro` | current / `1e5eda3` | Current SVG diagram and hover/focus state model | Buttons at lines `156-166`, event handlers at `169-189`, dim/reveal CSS at `273-344` in the pre-port component. |
| `src/components/HowItWorks.astro` | current | Current three-step copy immediately above the diagram | Current simplified copy lives at lines `2-35`; no record card remains. |
| `src/components/HowItWorks.astro` | `9644a60` | Pre-revert section wrapper for the richer attribution UI | Imports `AttributionChain.astro` and positions it beside the steps. |
| `src/components/AttributionChain.astro` | `9644a60` | Old detailed card view | Structure at lines `8-67` contains the attribution graph summary, layered record rows, and intervention card. |
| `src/components/ConfidenceBadge.astro` | `9644a60` | Old confidence badge presentation | Lines `16-22` render `Confidence {value}` badges; old color utilities are no longer available directly on current `main`. |
| `src/content/site.ts` | `9644a60` | Old detail copy/data source | `graphStages`, `attributionLayers`, and `decisionRecord` live at lines `130-173`. |
| `src/styles/global.css` | `9644a60` | Legacy styling primitives used by the old card | `.section-eyebrow` at `112-123`, `.surface-panel` at `249-252`, and graph-specific styling at `522-549`. |

## Assets

- No dedicated SVG, PNG, JSON, or Figma-export assets were found for the old detailed card view.
- The older implementation is composed entirely of Astro markup plus CSS tokens/classes.
- Extraction path created for review: `/tmp/old-diagram-extract/r964/`

## Interaction inventory

- Current diagram behavior to preserve:
  - `mouseenter` and `focus` on `[data-keyword]` set `data-active` to `inputs`, `model`, or `attribution`.
  - `mouseleave` and `blur` reset `data-active` to `none`.
  - SVG dim/reveal transitions use `opacity 160ms ease` and button transitions use `150ms ease`.
- The old detailed card view in `9644a60` has no standalone JavaScript. Its “behavior” is the layered record structure, visible confidence badges, and intervention card layout.

## Extraction output

Copied to `/tmp/old-diagram-extract/r964/`:

- `card-view/src/components/HowItWorks.astro`
- `card-view/src/components/AttributionChain.astro`
- `card-view/src/components/ConfidenceBadge.astro`
- `card-view/src/content/site.ts`
- `card-view/src/styles/global.css`
- `hover-reference/src/components/AttributionFlowDiagram.astro`

## Dependencies and migration notes

- No deprecated third-party packages were required by the older card view.
- The only migration concern is styling: the old `ConfidenceBadge.astro` relied on Tailwind color tokens that are no longer defined on current `main`, so those badge visuals need to be recreated locally instead of reintroducing old theme config.
