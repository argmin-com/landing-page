/**
 * Validates that every built HTML page has a <link rel="canonical"> tag
 * pointing at the correct https://argmin.co route.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve, join, relative } from "node:path";

const SITE = "https://argmin.co";
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

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  const label = relative(distDir, file);

  // Skip redirect stubs (meta-refresh pages like /demo/index.html)
  if (content.includes('http-equiv="refresh"')) continue;

  const match = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  if (!match) {
    failures.push(`${label}: missing <link rel="canonical">`);
    continue;
  }

  const canonical = match[1];
  if (!canonical.startsWith(SITE)) {
    failures.push(`${label}: canonical "${canonical}" does not start with ${SITE}`);
  }
}

if (failures.length > 0) {
  console.error("Canonical URL validation failed:");
  for (const f of failures) {
    console.error(`- ${f}`);
  }
  process.exit(1);
}

console.log(`Canonical URL validation passed (${htmlFiles.length} pages checked).`);
