import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const cwd = process.cwd();

function read(pathname) {
  return readFileSync(resolve(cwd, pathname), "utf8");
}

const headers = read("public/_headers");
const baseLayout = read("src/layouts/BaseLayout.astro");
const siteScript = read("public/scripts/site.js");
const hero = read("src/components/Hero.astro");
const contact = read("src/components/Contact.astro");

const requiredHeaderSnippets = [
  "Content-Security-Policy:",
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self' https://formspree.io",
  "object-src 'none'",
  "connect-src 'self' https://formspree.io https://plausible.io",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "script-src 'self' https://plausible.io",
  "style-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "upgrade-insecure-requests",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()",
];

for (const snippet of requiredHeaderSnippets) {
  if (!headers.includes(snippet)) {
    throw new Error(`public/_headers is missing: ${snippet}`);
  }
}

if (!baseLayout.includes('src="https://plausible.io/js/script.js"')) {
  throw new Error("src/layouts/BaseLayout.astro must include the Plausible script tag in the head.");
}

if (!baseLayout.includes('src="/scripts/site.js"')) {
  throw new Error("src/layouts/BaseLayout.astro must include the external site enhancement script.");
}

if (baseLayout.includes("is:inline")) {
  throw new Error("src/layouts/BaseLayout.astro must not use inline scripts.");
}

if (!baseLayout.includes('data-domain="argmin.co"')) {
  throw new Error("src/layouts/BaseLayout.astro must bind Plausible to argmin.co.");
}

if (siteScript.includes("document.createElement(\"script\")") || siteScript.includes("window.location.hostname")) {
  throw new Error("public/scripts/site.js must not dynamically bootstrap analytics.");
}

if (siteScript.includes("setupRevealAnimations") || siteScript.includes("data-reveal-delay")) {
  throw new Error("public/scripts/site.js must not include scroll-triggered reveal behavior.");
}

for (const [label, source] of [
  ["src/components/Hero.astro", hero],
  ["src/components/Contact.astro", contact],
  ["src/layouts/BaseLayout.astro", baseLayout],
]) {
  if (/\son[a-z]+=/i.test(source)) {
    throw new Error(`${label} must not use inline DOM event handlers.`);
  }
}

console.log("Security header validation passed.");
