export const siteConfig = {
  name: "Argmin",
  siteUrl: "https://argmin.co/",
  title: "Argmin | AI Cost Attribution and Optimization",
  description:
    "Argmin deploys inside your environment with read-only connectors, attributes AI spend to teams and budgets, and intervenes at decision time.",
  ogImage: "https://argmin.co/og-image.png",
  contactEmail: "richard@argmin.co",
  hero: {
    wordmark: "argmin",
    eyebrow: "Enterprise AI consumption infrastructure",
    headline: "Your AI spend is invisible. Argmin makes it attributable.",
    subheadline:
      "Deploys inside your environment with read-only connectors. Connects cloud telemetry, source control, CI/CD, identity, and org context so every inference call resolves to the team and budget that owns it before spend lands.",
    primaryCtaLabel: "Talk to Us",
    secondaryCtaLabel: "See the Mechanism",
    proofPoints: [
      { label: "Deploys", value: "Inside customer trust boundaries" },
      { label: "Confidence", value: "Visible on every attribution edge" },
      { label: "Policy", value: "Advisory first, hard stops by opt-in" },
    ],
    signalInputs: [
      "Cloud billing",
      "Inference telemetry",
      "Source control",
      "Identity",
      "Org hierarchy",
    ],
    signalOutputs: ["Team owner", "Budget path", "Model route", "Confidence score"],
  },
  problem: {
    title: "AI spend arrives as totals, not attribution.",
    body:
      "Enterprise AI adoption is outrunning the operating model around it. The data to answer attribution questions exists, but it is scattered across billing consoles, identity providers, gateways, CI/CD, and source control. Billing systems can tell you what was spent, but they cannot tell you which service initiated the request, which team owns it, or whether the model choice was justified at decision time.",
    constraints: [
      "Cloud invoices show totals, not who initiated the model call.",
      "Budgets and identity data live in separate systems from inference traffic.",
      "Optimization happens after the bill arrives, when the waste is already booked.",
    ],
  },
  valuePropsIntro:
    "Argmin is useful only if it can resolve ownership accurately enough to change decisions before waste lands in the bill.",
  valueProps: [
    {
      label: "01",
      title: "Attribution, not allocation",
      description:
        "Cloud bills show totals. Argmin links each model call to the service, code owner, identity, org unit, and budget responsible for it.",
    },
    {
      label: "02",
      title: "Decision-time intervention",
      description:
        "Act while the request is still actionable: route to lower-cost equivalent models, overlay budgets, and flag avoidable spend before it is booked. Advisory by default; hard stops only by explicit opt-in.",
    },
    {
      label: "03",
      title: "Zero operational risk",
      description:
        "Fail-open request handling with a 50ms latency budget. Read-only connectors. Deploys inside your trust boundary. If Argmin is unavailable, your traffic continues.",
    },
    {
      label: "04",
      title: "Confidence-scored, not assumed",
      description:
        "Enterprise data is fragmented and incomplete. Argmin resolves attribution through heuristic reconciliation without requiring perfect tags and keeps confidence visible instead of hiding uncertainty.",
    },
  ],
  howItWorksTitle: "Measure. Attribute. Intervene.",
  howItWorksIntro:
    "Read-only collection, graph-based reconciliation, and pre-execution policy evaluation stay separate so attribution can be audited and intervention can remain fail-open.",
  steps: [
    {
      number: "01",
      title: "Measure",
      description:
        "Read-only connectors pull from cloud billing, inference gateways, source control, CI/CD, identity providers, and org systems. No agents. No code changes. No write access.",
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
        "Policy evaluation happens before waste is booked: route to lower-cost equivalents, overlay team budgets, and simulate cost impact before deploy. Advisory by default; hard stops only by explicit opt-in.",
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
      "The founding team has built enterprise data and platform systems at Amazon, Cruise, Salesforce, Oxford, and the European Space Agency. The point of view comes from operating inside real cost, reliability, and governance constraints.",
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
    title: "Talk to Us",
    intro:
      "We are working with a limited number of design partners. If your team is spending on AI inference and cannot track what it is spending, who is spending it, or whether it is money well spent, we should talk.",
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
        value: "Enterprise AI attribution, optimization, and intervention at request time.",
      },
      {
        label: "Posture",
        value: "Deploys inside customer trust boundaries with read-only connectors and fail-open defaults.",
      },
      {
        label: "Response",
        value: "We respond directly when there is a real inference attribution problem to solve.",
      },
    ],
  },
  footer: {
    wordmark: "argmin",
  },
} as const;
