# Diagram Restore Mapping (`r964`)

## Old to current mapping

| Old artifact | Current artifact | Migration approach |
| --- | --- | --- |
| `9644a60:src/components/AttributionChain.astro` | `src/components/AttributionFlowDiagram.astro` | Port only the attribution record structure and intervention callout into the current diagram component as a scoped detail panel. |
| `9644a60:src/components/ConfidenceBadge.astro` | `src/components/AttributionFlowDiagram.astro` | Replicate badge semantics locally with prefixed classes; do not reintroduce removed Tailwind theme tokens. |
| `9644a60:src/content/site.ts` (`attributionLayers`, `decisionRecord`) | `src/components/AttributionFlowDiagram.astro` | Inline only the data needed for the restored card so the current multipage content model stays unchanged. |
| `1e5eda3:src/components/AttributionFlowDiagram.astro` | `src/lib/attribution-diagram.mjs` + `src/components/AttributionFlowDiagram.astro` | Lift the existing hover/focus binding into a small module so the behavior can be tested and preserved exactly. |
| `9644a60:src/styles/global.css` (`.surface-panel`, `.section-eyebrow`, graph styles) | `src/components/AttributionFlowDiagram.astro` | Recreate only the relevant visual treatment under the `diagram-v2-restore-r964` prefix; avoid global CSS edits. |

## Preserved interactive behaviors

| Behavior | DOM event(s) | State change | Visual effect |
| --- | --- | --- | --- |
| Highlight input branch | `mouseenter`, `focus` on `Data Inputs` button | `data-active="inputs"` | SVG non-input groups dim; restored detail panel emphasizes read-only input chips. |
| Highlight model branch | `mouseenter`, `focus` on `Model` button | `data-active="model"` | SVG non-model groups dim; restored detail panel emphasizes the model row and model usage pill. |
| Highlight attribution branch | `mouseenter`, `focus` on `Attribution` button | `data-active="attribution"` | SVG non-attribution groups dim; restored detail panel emphasizes attribution rows plus the intervention card. |
| Reset state | `mouseleave`, `blur` on any keyword button | `data-active="none"` | All SVG/detail sections return to neutral emphasis. |

## Timing and curves to preserve

- SVG line/group transitions: `opacity 160ms ease`, `stroke 160ms ease`
- Restored detail panel emphasis: `opacity 160ms ease`, `transform 160ms ease`, `border-color 160ms ease`, `background-color 160ms ease`
- Keyword pill transitions: `border-color 150ms ease`, `color 150ms ease`, `background-color 150ms ease`, `transform 150ms ease`

## DOM mismatch analysis

- Old structure:
  - Standalone HTML card (`AttributionChain.astro`) rendered beside the step list.
  - Confidence rows were plain HTML, independent of diagram state.
- Current structure:
  - SVG-centric figure with shared root state on `[data-diagram]`.
  - Interactivity is driven by keyword buttons and CSS selectors targeting `[data-group]`.

## Migration adaptation

- Keep the current `[data-diagram]` root as the single source of active state.
- Render the restored old-card content as HTML inside the current component.
- Add new selectors based on `data-dr-group`, `data-dr-chip`, and `data-dr-row-group` so the existing root state can drive both SVG and restored card emphasis.
- Preserve keyboard operability by continuing to bind `focus` and `blur`, and by syncing `aria-pressed` on the existing keyword buttons.

## Minimal implementation snippet

```text
[data-diagram]
  -> existing keyword buttons keep setting data-active
  -> existing SVG selectors still dim/reveal by [data-group]
  -> restored HTML rows/pills read the same root state through:
     [data-dr-group], [data-dr-chip], [data-dr-row-group]
```

## Scope guardrails applied

- No legacy global CSS was restored wholesale.
- No removed page sections (`Comparison`, `SampleOutput`, `RolePaths`, etc.) were reintroduced.
- No deprecated dependencies or theme config were added back.
