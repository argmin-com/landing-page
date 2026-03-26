import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const html = readFileSync(resolve("dist/index.html"), "utf8");

const checks = [
  {
    description: "contact form is marked unconfigured when PUBLIC_FORMSPREE_URL is absent",
    pass: /data-contact-form[^>]*data-form-configured="false"/.test(html),
  },
  {
    description: "missing-config message is rendered in the built page",
    pass: html.includes("Form submissions are currently unavailable. Please email"),
  },
  {
    description: "submit button is disabled when the form endpoint is missing",
    pass: /id="submit-btn"[^>]*disabled/.test(html),
  },
  {
    description: "no hardcoded Formspree endpoint ships in the fallback build",
    pass: !html.includes("https://formspree.io/f/"),
  },
  {
    description: "noscript fallback routes to contact@argmin.co",
    pass: /<noscript>[\s\S]*mailto:contact@argmin\.co[\s\S]*<\/noscript>/.test(html),
  },
  {
    description: "contact@argmin.co fallback is visible in the built page",
    pass: html.includes("contact@argmin.co"),
  },
  {
    description: "the page references the external enhancement script",
    pass: html.includes('src="/scripts/site.js"'),
  },
  {
    description: "the build no longer ships the old inline analytics bootstrap",
    pass: !html.includes("window.location.hostname"),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error("Contact fallback validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure.description}`);
  }
  process.exit(1);
}

console.log("Contact fallback validation passed.");
