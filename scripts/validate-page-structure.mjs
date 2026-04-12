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

/** Passes if at least one of the given texts is present (case-insensitive). */
function assertContainsAny(html, texts, description) {
  const lower = html.toLowerCase();
  const found = texts.some((t) => lower.includes(t.toLowerCase()));
  if (!found) {
    return `MISSING: ${description} (expected one of: ${texts.map((t) => `"${t}"`).join(", ")})`;
  }
  return null;
}

function assertMinSections(html, minCount, description) {
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

/**
 * Extract content inside <main> to scope word count to page body,
 * excluding nav/footer. Falls back to full document if no <main>.
 */
function extractMainContent(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/\s*main[^>]*>/i);
  return match ? match[1] : html;
}

function assertMinWordCount(html, minWords, description) {
  let text = extractMainContent(html);

  // Remove script blocks iteratively (satisfies CodeQL CWE-116).
  let prev;
  do {
    prev = text;
    text = text.replace(/<script\b[^>]*>[\s\S]*?<\/\s*script[^>]*>/gi, " ");
  } while (text !== prev);

  // Remove style blocks iteratively.
  do {
    prev = text;
    text = text.replace(/<style\b[^>]*>[\s\S]*?<\/\s*style[^>]*>/gi, " ");
  } while (text !== prev);

  // Remove remaining HTML tags.
  text = text.replace(/<[^>]*>/g, " ");
  // Collapse whitespace (skip entity decoding to avoid CodeQL
  // double-unescape findings — word count doesn't need decoded text).
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
      push(assertContains(html, "arg&nbsp;min", "Decision rule equation"));
      push(assertContains(html, "Week 1", "Deployment timeline phase 1"));
      push(assertContains(html, "Week 2", "Deployment timeline phase 2"));
      push(assertContains(html, "Week 3", "Deployment timeline phase 3"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 600, "/platform content depth"));

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
      push(assertContainsAny(html, ["best-fit", "best fit", "Is Argmin right for you"], "Qualifying criteria section"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 300, "/use-cases content depth"));

      return failures;
    },
  },
  {
    path: "about/index.html",
    label: "/about",
    checks(html) {
      const failures = [];
      const push = (r) => { if (r) failures.push(r); };

      push(assertContainsAny(html, ["What We Believe", "believe", "point of view"], "Belief statements section"));
      push(assertContains(html, "design partner", "Design partner mention"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 120, "/about content depth"));

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
      push(assertContainsAny(html, ["Request a Demo", "Contact Us", "Get in touch", "/contact"], "CTA or contact link"));
      push(assertMinWordCount(html, 150, "/team content depth"));

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
      push(assertContainsAny(html, ["inside your environment", "customer trust boundary"], "Trust boundary reference"));
      push(assertContains(html, "advisory", "Advisory-by-default principle"));
      push(assertContains(html, "fail-open", "Fail-open principle"));
      push(assertContains(html, "Request a Demo", "CTA button"));
      push(assertMinWordCount(html, 250, "/security content depth"));

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
      push(assertMinWordCount(html, 80, "/contact content depth"));

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
