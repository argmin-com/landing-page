import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";

const distDir = resolve("dist");
const rootHtmlPath = resolve(distDir, "index.html");
const redirectsPath = resolve(distDir, "_redirects");
const siteScriptPath = resolve(distDir, "scripts/site.js");

function collectHtmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      return collectHtmlFiles(absolutePath);
    }

    return entry.isFile() && absolutePath.endsWith(".html") ? [absolutePath] : [];
  });
}

const htmlPaths = collectHtmlFiles(distDir);
const rootHtml = readFileSync(rootHtmlPath, "utf8");
const allHtml = htmlPaths.map((pathname) => readFileSync(pathname, "utf8"));
const siteScript = readFileSync(siteScriptPath, "utf8");
const redirects = readFileSync(redirectsPath, "utf8");

const checks = [
  {
    description: "only the homepage HTML is generated for the static site",
    pass: htmlPaths.length === 1 && relative(distDir, htmlPaths[0]) === "index.html",
  },
  {
    description: "contact form is marked unconfigured when PUBLIC_FORMSPREE_URL is absent",
    pass: /data-contact-form[^>]*data-form-configured="false"/.test(rootHtml),
  },
  {
    description: "missing-config message is rendered in the built page",
    pass: rootHtml.includes("Form submissions are currently unavailable. Please email"),
  },
  {
    description: "submit button is disabled when the form endpoint is missing",
    pass: /id="submit-btn"[^>]*disabled/.test(rootHtml),
  },
  {
    description: "submit button remains type=button to avoid hosted redirects",
    pass: /id="submit-btn"[^>]*type="button"/.test(rootHtml),
  },
  {
    description: "contact form does not ship a default form action",
    pass: !/<form[^>]*action=/.test(rootHtml),
  },
  {
    description: "no hardcoded Formspree endpoint ships in the fallback build",
    pass: allHtml.every((html) => !html.includes("https://formspree.io/f/")),
  },
  {
    description: "noscript fallback routes to richard@argmin.co",
    pass: /<noscript>[\s\S]*mailto:richard@argmin\.co[\s\S]*<\/noscript>/.test(rootHtml),
  },
  {
    description: "richard@argmin.co fallback is visible in the built page",
    pass: rootHtml.includes("richard@argmin.co"),
  },
  {
    description: "the page references the external enhancement script",
    pass: rootHtml.includes('src="/scripts/site.js"'),
  },
  {
    description: "the enhancement script records successful form submissions",
    pass: siteScript.includes('trackEvent("form_submit")'),
  },
  {
    description: "the enhancement script submits the form data via FormData",
    pass: siteScript.includes("new FormData(form)"),
  },
  {
    description: "the built artifact includes the legacy anchor redirects",
    pass:
      redirects.includes("/contact /#contact 301") &&
      redirects.includes("/demo /#contact 301") &&
      redirects.includes("/team /#founders 301"),
  },
  {
    description: "legacy route output is not generated as standalone pages",
    pass:
      !existsSync(resolve("dist/contact")) &&
      !existsSync(resolve("dist/demo")) &&
      !existsSync(resolve("dist/team")),
  },
  {
    description: "the contact form enhancement script is emitted as a static file",
    pass: existsSync(siteScriptPath) && statSync(siteScriptPath).isFile(),
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
