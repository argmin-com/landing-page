export const primaryNav = [
  { label: "Platform", href: "/platform" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Security", href: "/security" },
      { label: "Request a Demo", href: "/demo" },
    ],
  },
  {
    title: "Architecture",
    links: [
      { label: "Attribution Flow", href: "/platform#attribution-flow" },
      { label: "Decision Layer", href: "/platform#decision-layer" },
      { label: "Deployment", href: "/platform#deployment-path" },
      { label: "Trust Boundary", href: "/security#trust-boundary" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/argmin-com/landing-page" },
      { label: "Charlotte on LinkedIn", href: "https://www.linkedin.com/in/charlotte-wargniez" },
      { label: "Richard on LinkedIn", href: "https://www.linkedin.com/in/richardcmckinney" },
      { label: "contact@argmin.co", href: "mailto:contact@argmin.co" },
    ],
  },
] as const;

export const siteSummary = {
  brand: "Argmin",
  tagline: "Know which teams use which AI models, at what cost, and why.",
  description:
    "Decision control for enterprise AI spend, with attribution that reaches from model call to budget owner before costs compound.",
} as const;
