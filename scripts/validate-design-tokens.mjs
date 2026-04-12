/**
 * Design Token Validator
 *
 * Scans source .astro files for hardcoded color values that bypass the
 * design token system. Fails CI if non-token colors are found in
 * component or page markup.
 *
 * See docs/design-system.md for the approved token palette.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SRC_DIR = "src";

// Patterns that indicate hardcoded colors bypassing the token system.
// These should be replaced with argmin-* token classes or CSS variables.
const FORBIDDEN_PATTERNS = [
  // Hardcoded Tailwind color classes (non-argmin), including fill/stroke/decoration/etc.
  { pattern: /\b(?:text|bg|border|ring|from|to|via|fill|stroke|decoration|accent|caret|outline)-(?:(?:amber|green|red|blue|yellow|orange|purple|pink|indigo|teal|cyan|emerald|lime|rose|fuchsia|violet|sky|slate|gray|zinc|neutral|stone)-\d{2,3}|black|white|transparent)\b/g,
    message: "Hardcoded Tailwind color class — use argmin-* tokens instead",
    // border-transparent is a Tailwind utility for invisible borders, not a color
    allowlist: ["border-transparent"],
  },
  // Inline hex colors in style attributes (HTML string or JSX object syntax)
  { pattern: /style=(?:"[^"]*|\{\{[^}]*)(?:#[0-9a-fA-F]{3,8}|rgb\s*\(|rgba\s*\(|hsl\s*\()/g,
    message: "Inline hardcoded color in style attribute — use CSS variable",
    allowlist: [],
  },
  // Hardcoded color values in Tailwind arbitrary value syntax
  { pattern: /\b(?:text|bg|border|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/g,
    message: "Hardcoded hex in Tailwind arbitrary value — use token class",
    allowlist: [],
  },
];

// Files/paths to skip
const SKIP_PATHS = [
  "src/styles/global.css", // Token definitions themselves
  "src/components/argmin_enterprise_system_er_diagram.jsx", // Legacy reference
];

function collectFiles(dir, ext) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full, ext));
    } else if (ext.includes(extname(full))) {
      results.push(full);
    }
  }
  return results;
}

const files = collectFiles(SRC_DIR, [".astro", ".tsx", ".jsx", ".ts"])
  .filter((f) => !SKIP_PATHS.some((skip) => f.endsWith(skip)));

const violations = [];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];

    // Skip HTML comments and CSS variable definitions
    // Skip comment lines and CSS variable definition lines (--color-argmin-*: value)
    const trimmed = line.trim();
    if (trimmed.startsWith("<!--") || trimmed.startsWith("/*") || trimmed.startsWith("//") || /^\s*--color-argmin/.test(line)) {
      continue;
    }

    for (const rule of FORBIDDEN_PATTERNS) {
      const matches = line.matchAll(rule.pattern);
      for (const match of matches) {
        const matchText = match[0];
        // Check allowlist
        if (rule.allowlist.some((a) => matchText.includes(a))) {
          continue;
        }
        violations.push({
          file: file,
          line: lineNum + 1,
          match: matchText,
          message: rule.message,
        });
      }
    }
  }
}

if (violations.length > 0) {
  console.error("Design token violations found:\n");
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`    "${v.match}" — ${v.message}\n`);
  }
  console.error(`\n${violations.length} violation(s). See docs/design-system.md.`);
  console.error("Replace hardcoded colors with argmin-* token classes or add");
  console.error("semantic tokens (--color-argmin-success, etc.) to global.css.");
  process.exit(1);
} else {
  console.log("Design token validation passed — no hardcoded colors found.");
}
