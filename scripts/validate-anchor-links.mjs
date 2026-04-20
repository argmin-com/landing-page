#!/usr/bin/env node

/**
 * Validates that all in-page anchor links (#id) in the built HTML
 * reference target IDs that actually exist on the same page.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const DIST = "dist";
const errors = [];

function walkDir(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walkDir(DIST);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");

  const idMatches = [...html.matchAll(/\bid=["']([^"']+)["']/g)];
  const ids = new Set(idMatches.map((m) => m[1]));

  const anchorMatches = [...html.matchAll(/href=["']#([^"']+)["']/g)];
  for (const [, anchor] of anchorMatches) {
    if (!ids.has(anchor)) {
      const route = file.replace(DIST, "").replace(/\/index\.html$/, "/") || "/";
      errors.push(`${route}: broken anchor #${anchor} (no matching id="${anchor}")`);
    }
  }
}

if (errors.length > 0) {
  console.error("Anchor link validation failed:\n");
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  console.error(`\n${errors.length} broken anchor(s) found.`);
  process.exit(1);
} else {
  console.log(
    `Anchor link validation passed (${htmlFiles.length} pages checked).`
  );
}
