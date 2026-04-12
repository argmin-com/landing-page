/**
 * Page Structure Validator
 *
 * Enforces minimum content requirements per page as defined in
 * docs/content-standards.md. Runs against the built HTML in dist/.
 *
 * Fails CI if any page drops below its structural minimums —
 * prevents accidental content deletion.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const DIST = "dist";

function readPage(relativePath) {
  const fullPath = resolve(DIST, relativePath);
  if (!existsSync(fullPath)) {
    return null;
  }
  return readFileSync(fullPath, "utf8");
}

function countOccurrences(html, pattern) {
  const matches = html.match(pattern);
  return matches ? matches.length : 0;
}

function assertContains(html, text, description) {
  if (!html.toLowerCase().includes(text.toLowerCase())) {
    return `MISSING: ${description} (expected text: "${text.slice(0, 80)}...")`;
  }
  return null;
}

function assertMinSections(html, minCount, description) {
  // Count <section elements (with or without id)
  const count = countOccurrences(html, /<section[\s>]/gi);
  if (count < minCount) {
    return `BELOW MINIMUM: ${description} — found ${count} sections, need at least ${minCount}`;
  }
  return null;
}

function assertSectionId(html, id, description) {
  if (!html.includes(`id="${id}"`)) {
    return `MISSING SECTION: ${description} (id="${id}")`;
  }
  return null;
}

function assertMinWordCount(html, minWords, description) {
  // Use a proper iterative approach to strip script/style blocks and tags.
  // This avoids the incomplete regex patterns that CodeQL flags (CWE-20/CWE-116).
  let text = html;

  // Remove script blocks iteratively until none remain
  let prev;
  do {
    prev = text;
    text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, " ");
  } while (text !== prev);

  // Remove style blocks iteratively
  do {
    prev = text;
    text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, " ");
  } while (text !== prev);

  // Remove remaining HTML tags
  text = text.replace(/<[^>]*>/g, " ");
  // Collapse whitespace and decode common entities
  text = text.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  text = text.replace(/\s+/g, " ").trim();

  const wordCount = text.split(" ").filter(Boolean).length;
  if (wordCount < minWords) {
    return `BELOW MINIMUM: ${description} — found ${wordCount} words, need at least ${minWords}`;
  }
  return null;
}

const pages = [
  {
    path: "platform/index.html",
    label: "/platform",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      push(assertMinSections(html, 5, "/platform must have at least 5 sections"));
      push(assertSectionId(html, "landscape", "Landscape / Why Unsolved section"));
      push(assertSectionId(html, "control-points", "Control Points section"));
      push(assertSectionId(html, "attribution-flow", "Attribution Flow section"));
      push(assertSectionId(html, "decision-layer", "Decision Layer section"));
      push(assertSectionId(html, "deployment-path", "Deployment Path section"));
      push(assertContains(html, "competitive-landscape", "Competitive landscape image reference"));
      push(assertContains(html, "support-router-prod", "Example attribution record (support-router-prod)"));
      // Equation renders as arg&nbsp;min in built HTML
      push(assertContains(html, "arg&nbsp;min", "Decision rule equation"));
      push(assertContains(html, "Week 1", "Deployment timeline phase 1"));
      push(assertContains(html, "Week 2", "Deployment timeline phase 2"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 800, "/platform content depth"));

      return failures;
    },
  },
  {
    path: "use-cases/index.html",
    label: "/use-cases",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      push(assertSectionId(html, "personas", "Personas section"));
      push(assertContains(html, "Engineering", "Engineering persona"));
      push(assertContains(html, "Finance", "Finance persona"));
      push(assertContains(html, "Security", "Security persona"));
      push(assertContains(html, "What forces action", "Persona trigger/pain point"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 400, "/use-cases content depth"));

      return failures;
    },
  },
  {
    path: "about/index.html",
    label: "/about",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      push(assertContains(html, "What We Believe", "Belief statements section") ||
           assertContains(html, "believe", "Belief statements section"));
      push(assertContains(html, "design partner", "Design partner mention"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 150, "/about content depth"));

      return failures;
    },
  },
  {
    path: "team/index.html",
    label: "/team",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      push(assertContains(html, "Richard McKinney", "Richard's name"));
      push(assertContains(html, "Charlotte Wargniez", "Charlotte's name"));
      push(assertContains(html, "linkedin.com", "LinkedIn links"));
      push(assertContains(html, "richard", "Richard's photo reference"));
      push(assertContains(html, "charlotte", "Charlotte's photo reference"));
      push(assertContains(html, "Amazon", "Richard's Amazon credential"));
      push(assertContains(html, "Oxford", "Charlotte's Oxford credential"));
      push(assertMinWordCount(html, 200, "/team content depth"));

      return failures;
    },
  },
  {
    path: "security/index.html",
    label: "/security",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      push(assertSectionId(html, "security-principles", "Security Principles section"));
      push(assertSectionId(html, "security-data-flow", "Data Flow section"));
      push(assertContains(html, "Read-only", "Read-only access principle"));
      push(assertContains(html, "inside your environment", "Inside-environment principle") ||
           assertContains(html, "customer trust boundary", "Trust boundary reference"));
      push(assertContains(html, "advisory", "Advisory-by-default principle"));
      push(assertContains(html, "fail-open", "Fail-open principle"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 300, "/security content depth"));

      return failures;
    },
  },
  {
    path: "contact/index.html",
    label: "/contact",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      push(assertContains(html, 'name="name"', "Name form field"));
      push(assertContains(html, 'name="email"', "Email form field"));
      push(assertContains(html, 'name="company"', "Company form field"));
      push(assertContains(html, 'name="message"', "Message form field"));
      push(assertContains(html, 'name="intent"', "Intent radio field"));
      push(assertContains(html, "contact@argmin.co", "Fallback email"));
      push(assertMinWordCount(html, 100, "/contact content depth"));

      return failures;
    },
  },
  {
    path: "privacy/index.html",
    label: "/privacy",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      const requiredSections = [
        "information-we-collect", "how-we-use-data", "legal-basis",
        "cookies", "sharing", "international-transfers", "retention",
        "your-rights", "ccpa", "security", "children", "contact", "changes",
      ];
      for (const id of requiredSections) {
        push(assertSectionId(html, id, `Privacy section: ${id}`));
      }
      push(assertMinWordCount(html, 1500, "/privacy content depth"));

      return failures;
    },
  },
];

// Run all checks
let totalFailures = 0;

for (const page of pages) {
  const html = readPage(page.path);
  if (html === null) {
    console.error(`PAGE MISSING: ${page.label} (${page.path}) does not exist in dist/`);
    totalFailures++;
    continue;
  }

  const failures = page.checks(html);
  if (failures.length > 0) {
    console.error(`\n${page.label}:`);
    for (const f of failures) {
      console.error(`  ✗ ${f}`);
    }
    totalFailures += failures.length;
  } else {
    console.log(`✓ ${page.label} — all structure checks passed`);
  }
}

if (totalFailures > 0) {
  console.error(`\nPage structure validation failed with ${totalFailures} issue(s).`);
  console.error("See docs/content-standards.md for content requirements.");
  process.exit(1);
} else {
  console.log("\nPage structure validation passed.");
}
