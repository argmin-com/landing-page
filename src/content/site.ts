export interface NavGroup {
  label: string;
  items: { label: string; href: string }[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Product",
    items: [
      { label: "Platform", href: "/platform" },
      { label: "Use Cases", href: "/use-cases" },
    ],
  },
  {
    label: "Architecture",
    items: [
      { label: "Attribution Flow", href: "/platform#attribution-flow" },
      { label: "Decision Layer", href: "/platform#decision-layer" },
      { label: "Deployment", href: "/platform#deployment-path" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Request a Demo", href: "/demo" },
    ],
  },
  {
    title: "Architecture",
    links: [
      { label: "Attribution Flow", href: "/platform#attribution-flow" },
      { label: "Decision Layer", href: "/platform#decision-layer" },
      { label: "Deployment", href: "/platform#deployment-path" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const siteSummary = {
  brand: "Argmin",
  description:
    "Decision control for enterprise AI spend, with attribution that reaches from model call to budget owner before costs compound.",
} as const;
