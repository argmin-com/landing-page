/**
 * Validates that the /demo → /contact redirect is correctly configured
 * and that no source files still reference /demo as a link target.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

const failures = [];

// 1. public/_redirects must exist and contain the three redirect rules
const redirectsPath = resolve("public/_redirects");
if (!existsSync(redirectsPath)) {
  failures.push("public/_redirects file does not exist");
} else {
  const content = readFileSync(redirectsPath, "utf8");
  const required = ["/demo       /contact 301", "/demo/      /contact 301", "/demo/*     /contact 301"];
  for (const rule of required) {
    if (!content.includes(rule.trim().replace(/\s+/g, " "))) {
      // Normalize whitespace for comparison
      const normalized = content.replace(/\s+/g, " ");
      const normalizedRule = rule.replace(/\s+/g, " ");
      if (!normalized.includes(normalizedRule)) {
        failures.push(`public/_redirects is missing rule: ${rule.trim()}`);
      }
    }
  }
}

// 2. No .astro source file should contain href="/demo"
function walkAstroFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== "dist") {
      files.push(...walkAstroFiles(full));
    } else if (entry.name.endsWith(".astro") || entry.name.endsWith(".ts") || entry.name.endsWith(".mjs")) {
      files.push(full);
    }
  }
  return files;
}

const srcFiles = walkAstroFiles(resolve("src"));
const siteFiles = [resolve("src/content/site.ts")];
const allFiles = [...new Set([...srcFiles, ...siteFiles])];

for (const file of allFiles) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, "utf8");
  if (/href=["']\/demo["']/.test(content) || /href:\s*["']\/demo["']/.test(content)) {
    failures.push(`${file} contains a link to /demo — should point to /contact`);
  }
}

if (failures.length > 0) {
  console.error("Redirect validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Redirect validation passed.");
