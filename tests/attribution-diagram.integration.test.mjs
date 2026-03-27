import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { JSDOM } from "jsdom";

import { initAttributionDiagrams } from "../src/lib/attribution-diagram.mjs";

const distIndexPath = new URL("../dist/client/index.html", import.meta.url);

test("built homepage includes the lean attribution summary and live diagram state changes", async () => {
  const html = await readFile(distIndexPath, "utf8");
  const dom = new JSDOM(html, { pretendToBeVisual: true });
  const { document } = dom.window;

  initAttributionDiagrams(document);

  const diagram = document.querySelector("[data-diagram]");
  const buttons = [...document.querySelectorAll("[data-keyword]")];
  const attributionButton = buttons.find((button) => button.textContent?.trim() === "Attribution");
  const detailPanel = document.querySelector("[data-detail-panel]");

  assert.ok(diagram, "expected homepage diagram to render");
  assert.ok(detailPanel, "expected attribution summary panel to exist");
  assert.equal(document.querySelectorAll("[data-summary-chip]").length, 4, "expected four summary chips");
  assert.equal(document.querySelectorAll("[data-summary-row]").length, 3, "expected three summary rows");
  assert.ok(document.querySelector("[data-summary-action]"), "expected action guidance to exist");

  attributionButton.dispatchEvent(new dom.window.Event("focus", { bubbles: true }));

  assert.equal(diagram.getAttribute("data-active"), "attribution");
  assert.equal(attributionButton.getAttribute("aria-pressed"), "true");
});
