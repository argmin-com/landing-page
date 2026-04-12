import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  outputDir: "./test-results",
  snapshotPathTemplate: "{testDir}/__screenshots__/{testName}/{arg}{ext}",
  fullyParallel: true,
  retries: 1,
  use: {
    baseURL: "http://127.0.0.1:4173",
  },
  projects: [
    {
      name: "mobile",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "tablet",
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
});
