import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const CONTACT_EMAIL = "contact@argmin.co";

const CONTACT_PAGE_PATHS = [
  { label: "home", relativePath: "index.html" },
  { label: "contact", relativePath: "contact/index.html" },
  { label: "demo", relativePath: "demo/index.html" },
];

export function readContactPages(rootDirectory = "dist") {
  return CONTACT_PAGE_PATHS.map(({ label, relativePath }) => ({
    label,
    html: readFileSync(resolve(rootDirectory, relativePath), "utf8"),
  }));
}

export function collectFailures(checks) {
  return checks.filter((check) => !check.pass).map((check) => check.description);
}

export function reportFailures(summary, failures) {
  if (failures.length === 0) {
    return;
  }

  console.error(`${summary}:`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}
