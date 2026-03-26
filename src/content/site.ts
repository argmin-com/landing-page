export const siteConfig = {
  name: "Argmin",
  siteUrl: "https://argmin.co",
  title: "Argmin | AI Consumption Attribution Inside Your Trust Boundary",
  description:
    "Argmin is the enterprise system of record for AI consumption, attributing every model call to the service, identity, team, and budget that owns it.",
  ogImage: "https://argmin.co/og-image.png",
  contactEmail: "contact@argmin.co",
  nav: [
    { label: "Problem", href: "#problem" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Mechanism", href: "#how" },
    { label: "Founders", href: "#founders" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    wordmark: "argmin",
    eyebrow: "Enterprise AI consumption infrastructure",
    headline: "Attribute every AI request before spend becomes waste.",
    subheadline:
      "Deploys inside your trust boundary. Resolves each model invocation through service, code owner, identity, org unit, and budget before the bill arrives.",
    primaryCtaLabel: "Talk to Us",
    secondaryCtaLabel: "See the Mechanism",
    proofPoints: [
      { label: "Deploys", value: "Inside customer trust boundaries" },
      { label: "Confidence", value: "Capped at 0.95 and always visible" },
      { label: "Policy", value: "Advisory by default, hard stops by opt-in" },
    ],
    signalInputs: [
      "Cloud billing",
      "Inference telemetry",
      "Identity",
      "Source control",
      "Org hierarchy",
    ],
    signalOutputs: [
      "Team owner",
      "Budget path",
      "Model route",
      "Confidence score",
    ],
  },
  problem: {
    title: "AI spend arrives as totals, not attribution.",
    body:
      "Enterprise AI adoption is outrunning the operating model around it. Billing systems can tell you what was spent, but they cannot tell you which service initiated the request, which team owns it, or whether the model choice was justified at decision time.",
    constraints: [
      "Cloud invoices show totals, not who initiated the model call.",
      "Budgets and identity data live in separate systems from inference traffic.",
      "Optimization happens after the bill arrives, when the waste is already booked.",
    ],
  },
  valueProps: [
    {
      label: "01",
      title: "Attribution, not allocation",
      description:
        "Cloud bills show totals. Argmin resolves which team called which model, from which service, for what purpose, and at what cost.",
    },
    {
      label: "02",
      title: "Decision-time intervention",
      description:
        "Route to cheaper equivalent models, enforce budgets, and stop avoidable spend before the request executes. Advisory first. Hard stops only by explicit opt-in.",
    },
    {
      label: "03",
      title: "Honest uncertainty",
      description:
        "Enterprise data is fragmented and incomplete. Argmin exposes confidence levels instead of presenting estimates as certainty.",
    },
    {
      label: "04",
      title: "Infrastructure posture",
      description:
        "Read-only connectors, fail-open request handling, and deployment inside customer environments. Useful when needed, quiet when not.",
    },
  ],
  steps: [
    {
      number: "01",
      title: "Measure",
      description:
        "Read-only connectors pull from cloud billing, gateways, identity providers, CI/CD, and org systems. No agents. No write access. No code changes.",
    },
    {
      number: "02",
      title: "Attribute",
      description:
        "A graph-based reconciliation engine resolves each inference call through model, service, code owner, identity, org unit, and budget. Confidence-scored and auditable.",
    },
    {
      number: "03",
      title: "Intervene",
      description:
        "Policy evaluation happens before waste is booked: route to lower-cost equivalents, overlay team budgets, and simulate cost impact before deployment.",
    },
  ],
  attributionLayers: [
    { label: "Model call", value: "gpt-4.1 / 58k tokens", confidence: "0.95", tone: "high" },
    { label: "Service", value: "support-router-prod", confidence: "0.94", tone: "high" },
    { label: "Code owner", value: "Platform ML / cost center 4421", confidence: "0.89", tone: "high" },
    { label: "Identity", value: "svc-support-router@prod", confidence: "0.86", tone: "medium" },
    { label: "Org unit", value: "Customer Operations", confidence: "0.83", tone: "medium" },
    { label: "Budget", value: "FY26 Assistants / remaining 17%", confidence: "0.78", tone: "low" },
  ],
  founders: [
    {
      name: "Charlotte Wargniez",
      title: "CTO",
      alt: "Charlotte Wargniez, CTO",
      webp: "/charlotte.webp",
      jpg: "/charlotte.jpg",
      bio: "University of Oxford DPhil researcher in AI for critical infrastructure. Visiting Researcher at the European Space Agency. Research focus: deep reinforcement learning for adaptive planning and optimization.",
      linkedin: "https://www.linkedin.com/in/charlotte-wargniez",
    },
    {
      name: "Richard McKinney",
      title: "CEO",
      alt: "Richard McKinney, CEO",
      webp: "/richard.webp",
      jpg: "/richard.jpg",
      bio: "Oxford alum. Fourteen years building enterprise infrastructure at Amazon, Cruise/GM, and Salesforce. Built Amazon's greenhouse gas data platform across 94 countries and co-founded the AI Energy Score with Hugging Face.",
      linkedin: "https://www.linkedin.com/in/richardcmckinney",
    },
  ],
  contact: {
    title: "Talk to Us",
    intro:
      "We are working with a limited number of design partners. If your team is already spending on AI inference and cannot explain what it is spending, who is spending it, or whether it is money well spent, we should talk.",
    submitLabel: "Get in Touch",
    unavailableLabel: "Form Unavailable",
    sendingLabel: "Sending...",
    successMessage: "Thank you. We will be in touch shortly.",
    errorMessage: "Submission failed. Please email us directly at",
    unavailableMessage:
      "Form submissions are currently unavailable. Please email",
  },
  footer: {
    tagline: "System of record for AI consumption.",
  },
} as const;
