import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const cwd = process.cwd();

function read(pathname) {
  return readFileSync(resolve(cwd, pathname), "utf8");
}

const packageJson = read("package.json");
const astroConfig = read("astro.config.mjs");
const wranglerConfig = read("wrangler.jsonc");
const baseLayout = read("src/layouts/BaseLayout.astro");
const indexPage = read("src/pages/index.astro");
const globalCss = read("src/styles/global.css");
const hero = read("src/components/Hero.astro");
const problem = read("src/components/Problem.astro");
const valueProps = read("src/components/ValueProps.astro");
const howItWorks = read("src/components/HowItWorks.astro");
const founders = read("src/components/Founders.astro");
const contact = read("src/components/Contact.astro");
const assetsIgnore = read("public/.assetsignore");
const redirects = read("public/_redirects");
const siteContent = read("src/content/site.ts");

const prohibitedPaths = [
  "src/components/Navbar.astro",
  "src/components/AttributionFlowDiagram.astro",
  "src/components/DecisionRule.astro",
  "src/pages/contact.astro",
  "src/pages/demo.astro",
  "src/pages/team.astro",
  "public/sitemap.xml",
];

const checks = [
  {
    description: "no prohibited legacy files remain in the repository",
    pass: prohibitedPaths.every((pathname) => !existsSync(resolve(cwd, pathname))),
  },
  {
    description: "the site composition stays single-page with main-content id",
    pass: indexPage.includes('<main id="main-content">'),
  },
  {
    description: "the layout does not render a navbar or sticky route chrome",
    pass: !baseLayout.includes("Navbar") && !baseLayout.includes("<header"),
  },
  {
    description: "the hero CTA scrolls to the contact section",
    pass: hero.includes('href="#contact"') && hero.includes("data-cta-button"),
  },
  {
    description: "the mechanism section renders the attribution chain component",
    pass: howItWorks.includes('import AttributionChain from "./AttributionChain.astro"'),
  },
  {
    description: "the capabilities section uses the canonical capabilities anchor",
    pass: valueProps.includes('id="capabilities"'),
  },
  {
    description: "system fonts are used instead of bundled @fontsource imports",
    pass: !globalCss.includes("@fontsource"),
  },
  {
    description: "decorative monospace usage was removed from narrative sections",
    pass:
      !problem.includes("font-mono") &&
      !valueProps.includes("font-mono") &&
      !contact.includes("font-mono") &&
      !founders.includes("font-mono"),
  },
  {
    description: "the Astro Cloudflare adapter is configured for Workers builds",
    pass: astroConfig.includes("@astrojs/cloudflare") && astroConfig.includes("adapter: cloudflare()"),
  },
  {
    description: "the repository pins the Cloudflare runtime tooling used by Workers Builds",
    pass:
      packageJson.includes('"@astrojs/cloudflare": "12"') &&
      packageJson.includes('"wrangler": "^4.77.0"'),
  },
  {
    description: "wrangler.jsonc targets the generated Astro worker and dist assets",
    pass:
      wranglerConfig.includes('"name": "landing-page"') &&
      wranglerConfig.includes('"main": "dist/_worker.js/index.js"') &&
      wranglerConfig.includes('"directory": "dist"'),
  },
  {
    description: ".assetsignore excludes generated worker internals from static asset upload",
    pass:
      assetsIgnore.includes("_worker.js") &&
      assetsIgnore.includes("_routes.json"),
  },
  {
    description: "redirects map legacy routes to homepage anchors",
    pass:
      redirects.includes("/contact /#contact 301") &&
      redirects.includes("/demo /#contact 301") &&
      redirects.includes("/team /#founders 301"),
  },
  {
    description: "the package audit pipeline includes design-system validation",
    pass:
      packageJson.includes('"validate:design-system": "node scripts/validate-design-system.mjs"') &&
      packageJson.includes("npm run validate:design-system"),
  },
  {
    description: "the repository no longer contains the reverted older hero copy",
    pass:
      !siteContent.includes("Enterprise AI consumption infrastructure") &&
      !siteContent.includes("Your AI spend is invisible. Argmin makes it attributable.") &&
      !siteContent.includes("AI Cost Attribution and Optimization"),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error("Design-system validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure.description}`);
  }
  process.exit(1);
}

console.log("Design-system validation passed.");
