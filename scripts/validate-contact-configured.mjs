import { collectFailures, readContactPages, reportFailures } from "./contact-validation.mjs";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const expectedEndpoint = process.env.PUBLIC_FORMSPREE_URL?.trim() ?? "";

if (!expectedEndpoint) {
  throw new Error("PUBLIC_FORMSPREE_URL must be set to validate the configured contact path.");
}

const pages = readContactPages();
const endpointPattern = new RegExp(
  `id="contact-form"[^>]*action="${escapeRegExp(expectedEndpoint)}"`,
);

const checks = [
  {
    description: "all contact entrypoints are marked configured when PUBLIC_FORMSPREE_URL is present",
    pass: pages.every(({ html }) => /id="contact-form"[^>]*data-form-configured="true"/.test(html)),
  },
  {
    description: "all contact entrypoints use the configured Formspree endpoint",
    pass: pages.every(({ html }) => endpointPattern.test(html)),
  },
  {
    description: "submit button stays enabled when the configured endpoint is present",
    pass: pages.every(({ html }) => !/id="submit-btn"[^>]*\sdisabled(?=[\s>])/.test(html)),
  },
  {
    description: "configured builds keep the fallback message hidden until submission fails",
    pass: pages.every(({ html }) => /id="form-config-error"[^>]*class="[^"]*\bhidden\b[^"]*"/.test(html)),
  },
  {
    description: "configured builds do not ship the Form Unavailable label",
    pass: pages.every(({ html }) => !html.includes("Form Unavailable")),
  },
];

const failures = collectFailures(checks);
reportFailures("Configured contact validation failed", failures);

console.log("Configured contact validation passed.");
