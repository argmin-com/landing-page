import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/platform", name: "platform" },
  { path: "/use-cases", name: "use-cases" },
  { path: "/contact", name: "contact" },
];

for (const route of routes) {
  test(`${route.name} page renders correctly`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });
    // Wait for animations to settle
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}
