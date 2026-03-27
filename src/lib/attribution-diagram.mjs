export const DIAGRAM_DEFAULT_STATE = "none";
export const DIAGRAM_STATES = ["none", "inputs", "model", "attribution"];

const getSafeState = (value) => (DIAGRAM_STATES.includes(value) ? value : DIAGRAM_DEFAULT_STATE);

export function setDiagramState(diagram, value) {
  const nextState = getSafeState(value);
  diagram.setAttribute("data-active", nextState);

  for (const keyword of diagram.querySelectorAll("[data-keyword]")) {
    const isActive = keyword.getAttribute("data-target") === nextState;
    keyword.setAttribute("aria-pressed", String(isActive));
  }
}

export function bindAttributionDiagram(diagram) {
  if (!diagram || diagram.getAttribute("data-diagram-bound") === "true") {
    return () => {};
  }

  diagram.setAttribute("data-diagram-bound", "true");
  const cleanups = [];

  for (const keyword of diagram.querySelectorAll("[data-keyword]")) {
    const target = keyword.getAttribute("data-target") || DIAGRAM_DEFAULT_STATE;
    const activate = () => setDiagramState(diagram, target);
    const reset = () => setDiagramState(diagram, DIAGRAM_DEFAULT_STATE);

    keyword.addEventListener("mouseenter", activate);
    keyword.addEventListener("focus", activate);
    keyword.addEventListener("mouseleave", reset);
    keyword.addEventListener("blur", reset);

    cleanups.push(() => {
      keyword.removeEventListener("mouseenter", activate);
      keyword.removeEventListener("focus", activate);
      keyword.removeEventListener("mouseleave", reset);
      keyword.removeEventListener("blur", reset);
    });
  }

  setDiagramState(diagram, DIAGRAM_DEFAULT_STATE);

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    diagram.removeAttribute("data-diagram-bound");
    setDiagramState(diagram, DIAGRAM_DEFAULT_STATE);
  };
}

export function initAttributionDiagrams(root = document) {
  return [...root.querySelectorAll("[data-diagram]")].map((diagram) => bindAttributionDiagram(diagram));
}
