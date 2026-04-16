import { collectFailures, readContactPages, reportFailures } from "./contact-validation.mjs";

function extractAttributeUrls(html) {
  const urls = [];
  const attrRegex = /\b(?:action|href|src)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  let match;
  while ((match = attrRegex.exec(html)) !== null) {
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    if (value) urls.push(value);
  }
  return urls;
}

function hasHardcodedFormspreeEndpoint(html) {
  return extractAttributeUrls(html).some((rawUrl) => {
    try {
      const parsed = new URL(rawUrl, "https://example.invalid");
      return parsed.hostname === "formspree.io" && parsed.pathname.startsWith("/f/");
    } catch {
      return false;
    }
  });
}

const pages = readContactPages();

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
    pass: pages.every(({ html }) => /id="submit-btn"[^>]*\sdisabled(?=[\s>])/.test(html)),
  },
  {
    description: "no hardcoded Formspree endpoint ships in the fallback build",
    pass: pages.every(({ html }) => !hasHardcodedFormspreeEndpoint(html)),
  },
  {
    description: "noscript fallback routes to contact@argmin.co on all contact entrypoints",
    pass: pages.every(({ html }) => /<noscript>[\s\S]*mailto:contact@argmin\.co[\s\S]*<\/noscript>/.test(html)),
  },
  {
    description: "legacy richard@argmin.co fallback is absent from the built pages",
    pass: pages.every(({ html }) => !html.includes("richard@argmin.co")),
  },
  // --- Regression guards for removed AI-spend-centric scope ---
  {
    description: "removed field 'Primary cloud' does not appear on contact pages",
    pass: pages.every(({ html }) => !html.includes('name="cloud"') && !html.includes("Primary cloud")),
  },
  {
    description: "removed field 'Monthly AI spend' does not appear on contact pages",
    pass: pages.every(({ html }) => !html.includes('name="ai_spend"') && !html.includes("Monthly AI spend")),
  },
  {
    description: "removed field 'Teams using AI' does not appear on contact pages",
    pass: pages.every(({ html }) => !html.includes('name="teams_using_ai"') && !html.includes("Teams using AI")),
  },
  {
    description: "removed 'Help us prepare' collapsible section is absent",
    pass: pages.every(({ html }) => !html.includes("Help us prepare")),
  },
  {
    description: "contact page uses the broader message placeholder",
    pass: pages
      .filter(({ label }) => label === "contact")
      .every(({ html }) => html.includes("Tell us about the decision, ownership, or governance problem")),
  },
  {
    description: "trust-badge chips are present on the contact page",
    pass: pages
      .filter(({ label }) => label === "contact")
      .every(({ html }) => html.includes("Read-only access") && html.includes("Runs in your environment") && html.includes("No data exfiltration")),
  },
  {
    description: "whitespace-trim validation is wired up (setCustomValidity present)",
    pass: pages
      .filter(({ label }) => label === "contact")
      .every(({ html }) => html.includes("setCustomValidity")),
  },
];

const failures = collectFailures(checks);
reportFailures("Contact fallback validation failed", failures);

console.log("Contact fallback validation passed.");
