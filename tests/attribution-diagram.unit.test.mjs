import assert from "node:assert/strict";
import test from "node:test";

import { JSDOM } from "jsdom";

import { bindAttributionDiagram, setDiagramState } from "../src/lib/attribution-diagram.mjs";

const createDiagramDom = () =>
  new JSDOM(
    `
      <figure data-diagram data-active="none">
        <button type="button" data-keyword data-target="inputs" aria-pressed="false">Data Inputs</button>
        <button type="button" data-keyword data-target="model" aria-pressed="false">Model</button>
        <button type="button" data-keyword data-target="attribution" aria-pressed="false">Attribution</button>
      </figure>
    `,
    { pretendToBeVisual: true },
  );

test("setDiagramState keeps aria-pressed in sync with the active target", () => {
  const dom = createDiagramDom();
  const diagram = dom.window.document.querySelector("[data-diagram]");
  const buttons = [...diagram.querySelectorAll("[data-keyword]")];

  setDiagramState(diagram, "attribution");

  assert.equal(diagram.getAttribute("data-active"), "attribution");
  assert.equal(buttons[0].getAttribute("aria-pressed"), "false");
  assert.equal(buttons[1].getAttribute("aria-pressed"), "false");
  assert.equal(buttons[2].getAttribute("aria-pressed"), "true");
});

test("bindAttributionDiagram toggles state for hover and focus events", () => {
  const dom = createDiagramDom();
  const diagram = dom.window.document.querySelector("[data-diagram]");
  const [inputsButton, modelButton] = [...diagram.querySelectorAll("[data-keyword]")];

  bindAttributionDiagram(diagram);

  inputsButton.dispatchEvent(new dom.window.Event("mouseenter", { bubbles: true }));
  assert.equal(diagram.getAttribute("data-active"), "inputs");
  assert.equal(inputsButton.getAttribute("aria-pressed"), "true");

  inputsButton.dispatchEvent(new dom.window.Event("mouseleave", { bubbles: true }));
  assert.equal(diagram.getAttribute("data-active"), "none");
  assert.equal(inputsButton.getAttribute("aria-pressed"), "false");

  modelButton.dispatchEvent(new dom.window.Event("focus", { bubbles: true }));
  assert.equal(diagram.getAttribute("data-active"), "model");
  assert.equal(modelButton.getAttribute("aria-pressed"), "true");

  modelButton.dispatchEvent(new dom.window.Event("blur", { bubbles: true }));
  assert.equal(diagram.getAttribute("data-active"), "none");
  assert.equal(modelButton.getAttribute("aria-pressed"), "false");
});
