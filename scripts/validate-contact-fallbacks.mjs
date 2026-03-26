import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pages = [
  {
    label: "home",
    html: readFileSync(resolve("dist/index.html"), "utf8"),
  },
  {
    label: "contact",
    html: readFileSync(resolve("dist/contact/index.html"), "utf8"),
  },
  {
    label: "demo",
    html: readFileSync(resolve("dist/demo/index.html"), "utf8"),
  },
];

const checks = [
  {
    description: "all contact entrypoints are marked unconfigured when PUBLIC_FORMSPREE_URL is absent",
    pass: pages.every(({ html }) => /id="contact-form"[^>]*data-form-configured="false"/.test(html)),
  },
  {
    description: "missing-config message is rendered on all contact entrypoints",
    pass: pages.every(({ html }) => html.includes("Form submissions are currently unavailable. Please email")),
  },
  {
    description: "submit button is disabled when the form endpoint is missing",
    pass: pages.every(({ html }) => /id="submit-btn"[^>]*disabled/.test(html)),
  },
  {
    description: "no hardcoded Formspree endpoint ships in the fallback build",
    pass: pages.every(({ html }) => !html.includes("https://formspree.io/f/")),
  },
  {
    description: "noscript fallback routes to contact@argmin.co on all contact entrypoints",
    pass: pages.every(({ html }) => /<noscript>[\s\S]*mailto:contact@argmin\.co[\s\S]*<\/noscript>/.test(html)),
  },
  {
    description: "legacy richard@argmin.co fallback is absent from the built pages",
    pass: pages.every(({ html }) => !html.includes("richard@argmin.co")),
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
