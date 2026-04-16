#!/usr/bin/env node
/**
 * argmin-brand-voice lint
 *
 * Usage: node .claude/skills/argmin-brand-voice/lint.mjs <file>
 *        or pipe text via stdin.
 *
 * Checks draft marketing copy against the argmin brand voice:
 * - Banned phrases
 * - Exclusionary framing
 * - Sentence length
 * - Flesch reading ease estimate
 *
 * Exits 0 if clean, 1 if violations found.
 */

import { readFileSync } from "node:fs";

const BANNED = [
  { pattern: /\bleverage(?:s|d|ing)?\b/gi, suggest: "use" },
  { pattern: /\bunlock(?:s|ed|ing)?\b/gi, suggest: "open up / enable / surface" },
  { pattern: /\bseamless(?:ly)?\b/gi, suggest: "in one step / without re-instrumentation" },
  { pattern: /\bfrictionless\b/gi, suggest: "in one step" },
  { pattern: /\brevolutionary\b/gi, suggest: "(delete; show, don't tell)" },
  { pattern: /\bcutting[- ]edge\b/gi, suggest: "(delete)" },
  { pattern: /\bbest[- ]in[- ]class\b/gi, suggest: "(delete)" },
  { pattern: /\bindustry[- ]leading\b/gi, suggest: "(delete)" },
  { pattern: /\brobust(?:ly|ness)?\b/gi, suggest: "specific attribute (fail-open, audited, fault-tolerant)" },
  { pattern: /\bgame[- ]changer\b/gi, suggest: "(delete)" },
  { pattern: /\bnext[- ]gen\b/gi, suggest: "(delete)" },
  { pattern: /\bworld[- ]class\b/gi, suggest: "(delete)" },
  { pattern: /\bsimply\b/gi, suggest: "(delete; understates effort)" },
  { pattern: /\bjust\b/gi, suggest: "(consider deleting; often understates)" },
  { pattern: /\bwe help\b/gi, suggest: "rewrite as 'X does Y with Argmin'" },
];

const EXCLUSIONARY = [
  { pattern: /spending millions on AI/gi, reason: "gates on spend — broaden" },
  { pattern: /\bif you (?:are|'re) already\b/gi, reason: "gates on current state — broaden" },
  { pattern: /\bfor enterprise teams? with\b/gi, reason: "gates on company size" },
  { pattern: /\b(?:large|big) enterprises? only\b/gi, reason: "gates on company size" },
];

function stripMarkdown(text) {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#*_`~\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract visible marketing copy from an Astro/MDX/HTML file.
 * - Strips frontmatter (between --- markers at top of file)
 * - Strips <script> and <style> blocks (including is:inline)
 * - Strips HTML/JSX tags, keeping their inner text
 * - Collapses entities and whitespace
 *
 * The result is passed to the banned-phrase matchers so that code/frontmatter
 * tokens do not produce false-positive violations.
 */
function extractCopy(text) {
  let t = text;

  // Remove Astro/YAML frontmatter at top of file (--- ... ---).
  t = t.replace(/^\s*---\n[\s\S]*?\n---\n?/m, "");

  // Remove <script>...</script> and <style>...</style> blocks (iterative for safety).
  let prev;
  do {
    prev = t;
    t = t.replace(/<script\b[^>]*>[\s\S]*?<\/\s*script[^>]*>/gi, " ");
  } while (t !== prev);
  do {
    prev = t;
    t = t.replace(/<style\b[^>]*>[\s\S]*?<\/\s*style[^>]*>/gi, " ");
  } while (t !== prev);

  // Remove Astro/JSX expressions in braces: {expr}. Conservative single-pass.
  t = t.replace(/\{[^{}]*\}/g, " ");

  // Remove remaining HTML tags, decode a few common entities.
  t = t.replace(/<[^>]*>/g, " ");
  t = t.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

  return t.replace(/\s+/g, " ").trim();
}

function sentences(text) {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function syllableCount(word) {
  // Rough syllable heuristic; good enough for trend-tracking.
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^aeiou])e$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function flesch(text) {
  const sents = sentences(text);
  const words = text.split(/\s+/).filter(Boolean);
  if (!sents.length || !words.length) return null;
  const syllables = words.reduce((s, w) => s + syllableCount(w), 0);
  const asl = words.length / sents.length;
  const asw = syllables / words.length;
  return Math.round(206.835 - 1.015 * asl - 84.6 * asw);
}

function run(text) {
  // Extract visible marketing copy only — strip Astro frontmatter, script/style blocks,
  // JSX expressions, and HTML tags. Code tokens do not count as prose.
  const copy = extractCopy(text);
  const clean = stripMarkdown(copy);
  const findings = [];

  // Banned phrases (matched against extracted copy, not raw file text)
  for (const { pattern, suggest } of BANNED) {
    const hits = [...copy.matchAll(pattern)];
    for (const hit of hits) {
      findings.push({
        kind: "banned",
        match: hit[0],
        at: hit.index,
        suggest,
      });
    }
  }

  // Exclusionary framing
  for (const { pattern, reason } of EXCLUSIONARY) {
    const hits = [...copy.matchAll(pattern)];
    for (const hit of hits) {
      findings.push({
        kind: "exclusionary",
        match: hit[0],
        at: hit.index,
        reason,
      });
    }
  }

  // Sentence length
  const longSentences = sentences(clean).filter((s) => s.split(/\s+/).length > 25);
  for (const s of longSentences) {
    findings.push({
      kind: "long-sentence",
      match: s.slice(0, 80) + (s.length > 80 ? "..." : ""),
      length: s.split(/\s+/).length,
    });
  }

  // Flesch reading ease
  const score = flesch(clean);

  return { findings, flesch: score, wordCount: clean.split(/\s+/).filter(Boolean).length };
}

function main() {
  const arg = process.argv[2];
  let text;
  if (arg && arg !== "-") {
    text = readFileSync(arg, "utf8");
  } else {
    text = readFileSync(0, "utf8");
  }

  const { findings, flesch: score, wordCount } = run(text);

  console.log(`argmin-brand-voice lint: ${wordCount} words, Flesch ${score ?? "n/a"}`);
  if (score !== null && score < 55) {
    console.log(`  ⚠ Flesch score ${score} is below body target (≥ 55). Shorter sentences, simpler words.`);
  }

  if (findings.length === 0) {
    console.log("✓ No violations.");
    process.exit(0);
  }

  for (const f of findings) {
    if (f.kind === "banned") {
      console.log(`  ✗ banned "${f.match}" — swap: ${f.suggest}`);
    } else if (f.kind === "exclusionary") {
      console.log(`  ✗ exclusionary "${f.match}" — ${f.reason}`);
    } else if (f.kind === "long-sentence") {
      console.log(`  ✗ long sentence (${f.length} words): "${f.match}"`);
    }
  }
  process.exit(1);
}

main();
