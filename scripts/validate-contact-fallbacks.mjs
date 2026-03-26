import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pages = [
  { path: "dist/index.html", label: "index" },
  { path: "dist/contact/index.html", label: "contact" },
  { path: "dist/demo/index.html", label: "demo" },
];

const failures = [];

for (const page of pages) {
  const html = readFileSync(resolve(page.path), "utf8");

  const checks = [
    {
      description: `[${page.label}] contact form is marked unconfigured when PUBLIC_FORMSPREE_URL is absent`,
      pass: /data-contact-form[^>]*data-form-configured="false"/.test(html),
    },
    {
      description: `[${page.label}] missing-config message is rendered in the built page`,
      pass: html.includes("Form submissions are currently unavailable. Please email"),
    },
    {
      description: `[${page.label}] submit button is disabled when the form endpoint is missing`,
      pass: /id="submit-btn"[^>]*disabled/.test(html),
    },
    {
      description: `[${page.label}] no hardcoded Formspree endpoint ships in the fallback build`,
      pass: !html.includes("https://formspree.io/f/"),
    },
    {
      description: `[${page.label}] noscript fallback routes to contact@argmin.co`,
      pass: /<noscript>[\s\S]*mailto:contact@argmin\.co[\s\S]*<\/noscript>/.test(html),
    },
    {
      description: `[${page.label}] contact@argmin.co fallback is visible in the built page`,
      pass: html.includes("contact@argmin.co"),
    },
    {
      description: `[${page.label}] no hardcoded Formspree endpoint in the fallback build`,
      pass: !html.includes("https://formspree.io/f/"),
    },
  ];

  failures.push(...checks.filter((check) => !check.pass));
}

// Global checks on index only
const indexHtml = readFileSync(resolve("dist/index.html"), "utf8");
const globalChecks = [
  {
    description: "the page references the external enhancement script",
    pass: indexHtml.includes('src="/scripts/site.js"'),
  },
  {
    description: "the build no longer ships the old inline analytics bootstrap",
    pass: !indexHtml.includes("window.location.hostname"),
  },
];
failures.push(...globalChecks.filter((c) => !c.pass));

if (failures.length > 0) {
  console.error("Contact fallback validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure.description}`);
  }
  process.exit(1);
}

console.log(`Contact fallback validation passed (${pages.length} pages checked).`);
