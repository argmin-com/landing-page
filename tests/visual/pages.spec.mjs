import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/platform", name: "platform" },
  { path: "/use-cases", name: "use-cases" },
  { path: "/contact", name: "contact" },
  { path: "/about", name: "about" },
  { path: "/team", name: "team" },
  { path: "/security", name: "security" },
  { path: "/privacy", name: "privacy" },
];

for (const route of routes) {
  test(`${route.name} page renders correctly`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });
    // Disable all animations and transitions for deterministic screenshots
    await page.addStyleTag({
      content:
        "*, *::before, *::after { animation: none !important; transition: none !important; }",
    });
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}
