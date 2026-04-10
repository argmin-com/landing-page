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
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Team", href: "/team" },
  { label: "Security", href: "/security" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteSummary = {
  brand: "Argmin",
  description:
    "Decision control for enterprise AI spend, with attribution that reaches from model call to budget owner before costs compound.",
} as const;
