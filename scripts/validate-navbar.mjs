/**
 * Validates that every built sub-page has a navbar header with a high
 * z-index stacking context, preventing dropdown panels from falling
 * behind content sections that use backdrop-filter.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const distDir = resolve("dist");

function findHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "_astro") {
      files.push(...findHtmlFiles(full));
    } else if (entry.name === "index.html") {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = findHtmlFiles(distDir);
const failures = [];

// The <header> element must include z-[90] (or equivalent high z-index)
// to prevent the dropdown panel from being occluded by sections below.
const headerPattern = /<header[^>]*class="[^"]*\bz-\[90\]/;

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  // Skip the redirect stub (demo/index.html) — it has no real page markup
  if (content.includes('http-equiv="refresh"')) continue;

  if (!headerPattern.test(content)) {
    const label = file.replace(distDir + "/", "");
    failures.push(`${label}: <header> is missing z-[90] stacking context`);
  }
}

if (failures.length > 0) {
  console.error("Navbar z-index validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Navbar z-index validation passed (${htmlFiles.length} pages checked).`);
