export const siteConfig = {
  name: "Argmin",
  siteUrl: "https://argmin.co/",
  title: "Argmin | Application-Level AI Cost Attribution for Enterprise AI",
  description:
    "Argmin deploys inside the customer trust boundary and connects cloud telemetry, billing, source control, CI/CD, identity, and org context so every AI request can be attributed to the team and budget that owns it.",
  ogImage: "https://argmin.co/og-image.png",
  contactEmail: "richard@argmin.co",
  hero: {
    wordmark: "argmin",
    eyebrow: "Application-level AI cost attribution",
    headline: "Know which teams use which AI models, at what cost, and why.",
    subheadline:
      "Argmin deploys inside your trust boundary with read-only connectors. It joins cloud telemetry and billing with source control, CI/CD, identity, and org hierarchy so each AI request resolves to the team, service, and budget that owns it.",
    primaryCtaLabel: "Talk to Us",
    proofPoints: [
      { label: "Deploys", value: "Inside customer trust boundaries" },
      { label: "Access", value: "Read-only connectors only" },
      { label: "Output", value: "Model-to-budget attribution chain" },
    ],
    signalInputs: [
      "Cloud telemetry",
      "Cloud billing",
      "Source control",
      "CI/CD",
      "Identity",
      "Org hierarchy",
    ],
    signalOutputs: ["Team owner", "Service owner", "Budget path", "Confidence score"],
  },
  problem: {
    title: "AI spend arrives as totals, not attribution.",
    body:
      "Enterprise AI spend is showing up as aggregate totals. Finance can see the invoice. Engineering can see some traces. Security can see identity and access. But no one can reliably answer which team used which model, for what purpose, and whether the spend was justified before it hit the bill.",
    constraints: [
      "Cloud invoices show totals, not the application or team that initiated the model call.",
      "Identity, source control, CI/CD, and org hierarchy live in separate systems from usage telemetry.",
      "By the time spend is visible, the model choice and routing decision have already been made.",
    ],
  },
  valuePropsIntro:
    "Argmin is narrow on purpose. It makes each model call attributable before AI spend turns into another blind recurring line item.",
  valueProps: [
    {
      label: "01",
      title: "Connect the attribution chain",
      description:
        "Argmin links cloud telemetry and billing with source control, CI/CD, identity, and org hierarchy so each AI request can be traced through the systems that own it.",
    },
    {
      label: "02",
      title: "Resolve ownership, not just totals",
      description:
        "Cloud bills show spend. Argmin resolves which service made the request, which team owns the code path, which identity executed it, and which budget should absorb the cost.",
    },
    {
      label: "03",
      title: "Keep trust boundaries intact",
      description:
        "Deployment stays inside the customer trust boundary. Connectors are read-only. Raw telemetry and operational data do not need to be broadly exfiltrated for attribution to work.",
    },
    {
      label: "04",
      title: "Use attribution before spend drifts",
      description:
        "The output is useful because it supports action: compare model routes, overlay budgets, and review questionable spend while the decision is still recent. Advisory first, enforcement only by explicit opt-in.",
    },
  ],
  howItWorksTitle: "Collect evidence. Resolve ownership. Show confidence.",
  howItWorksIntro:
    "The workflow is deliberate: gather the operational evidence, reconcile it into an ownership graph, then surface the confidence so finance, engineering, and security can make decisions without guessing.",
  steps: [
    {
      number: "01",
      title: "Collect",
      description:
        "Read-only connectors pull cloud billing, usage telemetry, source control, CI/CD, identity, and org data inside the customer environment. No agents. No code changes. No write access.",
    },
    {
      number: "02",
      title: "Resolve",
      description:
        "A graph-based attribution engine links each AI request to the service, code owner, identity, org unit, and budget that owns it, with visible confidence at each step.",
    },
    {
      number: "03",
      title: "Explain",
      description:
        "Teams can see where spend came from, compare model routes, and review questionable usage before it turns into a larger recurring bill.",
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
  foundersSection: {
    title: "Built by operators who have had to make infrastructure accountable.",
    copy:
      "The team has built enterprise data, platform, and governance systems at Amazon, Cruise, Salesforce, Oxford, and the European Space Agency. The product point of view comes from working inside real cost, reliability, and trust-boundary constraints.",
  },
  founders: [
    {
      name: "Charlotte Wargniez",
      title: "CTO",
      alt: "Charlotte Wargniez, CTO",
      webp: "/charlotte.webp",
      jpg: "/charlotte.jpg",
      bio: "University of Oxford DPhil researcher in AI for critical infrastructure through the Intelligent Earth CDT, with research focused on deep reinforcement learning for adaptive planning and optimization. Visiting Researcher at the European Space Agency and recipient of the Rose Sheinin Award as top woman in science across the University of Toronto's 21,000 graduates.",
      linkedin: "https://www.linkedin.com/in/charlotte-wargniez",
    },
    {
      name: "Richard McKinney",
      title: "CEO",
      alt: "Richard McKinney, CEO",
      webp: "/richard.webp",
      jpg: "/richard.jpg",
      bio: "Oxford alum with 14 years building enterprise infrastructure at Amazon, Cruise/GM, and Salesforce. Built Amazon's greenhouse gas data platform across 94 countries, co-founded the AI Energy Score with Hugging Face, and led product for Salesforce Shield Platform Encryption.",
      linkedin: "https://www.linkedin.com/in/richardcmckinney",
    },
  ],
  contact: {
    title: "Bring us the spend you cannot explain.",
    intro:
      "We are working with a limited number of design partners. If your team is already spending on AI models and cannot tell which service, team, or budget owns that spend, we should talk.",
    submitLabel: "Get in Touch",
    unavailableLabel: "Form Unavailable",
    sendingLabel: "Sending...",
    successMessage: "Thank you. We will be in touch shortly.",
    errorMessage: "Submission failed. Please email us directly at",
    unavailableMessage:
      "Form submissions are currently unavailable. Please email",
    details: [
      {
        label: "Scope",
        value: "Application-level AI cost and usage attribution for enterprise AI.",
      },
      {
        label: "Posture",
        value: "Deploys inside customer trust boundaries with read-only connectors and fail-open defaults.",
      },
      {
        label: "Response",
        value: "We respond directly when there is a concrete attribution or cost-visibility problem to solve.",
      },
    ],
  },
  footer: {
    wordmark: "argmin",
  },
} as const;
