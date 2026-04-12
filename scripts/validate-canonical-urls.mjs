/**
 * Validates that every built HTML page has a <link rel="canonical"> tag
 * pointing at the correct https://argmin.co route, derived from the
 * file's position in the dist/ tree.
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
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = findHtmlFiles(distDir);
const failures = [];

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  const label = relative(distDir, file).replace(/\\/g, "/");

  // Skip redirect stubs (meta-refresh pages like demo/index.html)
  if (content.includes('http-equiv="refresh"')) continue;

  // Skip non-page HTML files: 404.html, generated diagrams/assets in subdirs
  if (label === "404.html") continue;
  if (!label.endsWith("index.html")) continue;

  const match = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  if (!match) {
    failures.push(`${label}: missing <link rel="canonical">`);
    continue;
  }

  // Derive expected canonical from file path:
  // "about/index.html" → "/about/"
  // "index.html" → "/"
  const route = "/" + label.replace(/index\.html$/, "").replace(/\.html$/, "");
  const expectedCanonical = `${SITE}${route}`;

  const canonical = match[1];
  if (canonical !== expectedCanonical) {
    failures.push(`${label}: expected canonical "${expectedCanonical}", found "${canonical}"`);
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
