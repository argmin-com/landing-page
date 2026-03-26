export const siteConfig = {
  name: "Argmin",
  siteUrl: "https://argmin.co/",
  title: "Argmin | Decision Control for Enterprise AI Spend",
  description:
    "Argmin is embedded infrastructure for enterprise AI cost control. It deploys inside the customer trust boundary and attributes every model call from service and code path to identity, org, and budget so teams can intervene before spend drifts.",
  ogImage: "https://argmin.co/og-image.png",
  contactEmail: "richard@argmin.co",
  hero: {
    wordmark: "argmin",
    eyebrow: "Embedded decision infrastructure for enterprise AI",
    headline: "Control AI cost before it becomes someone else's dashboard.",
    subheadline:
      "Argmin runs inside your trust boundary and connects cloud telemetry, billing, source control, CI/CD, identity, and org context so model usage turns into attributable decisions. The point is not another dashboard. The point is knowing what will cost money, who owns it, and what should happen next.",
    primaryCtaLabel: "See how attribution works",
    secondaryCtaLabel: "View sample output",
    contactCtaLabel: "Talk to a founder",
    proofPoints: [
      { label: "Posture", value: "Embedded infrastructure, not a reporting layer" },
      { label: "Control", value: "Decision points in approvals, CI/CD, and budgets" },
      { label: "Trust", value: "Read-only connectors inside customer boundaries" },
    ],
    decisionMoments: [
      {
        label: "Before merge",
        detail: "Model route change shows projected cost and owning budget.",
      },
      {
        label: "Before deploy",
        detail: "Approvers see service owner, identity, and monthly cost delta.",
      },
      {
        label: "After anomaly",
        detail: "Spend spikes resolve to the exact team, service, and budget path.",
      },
    ],
    decisionOutputs: ["Projected monthly delta", "Owner + budget path", "Visible confidence"],
  },
  problem: {
    title: "Most AI cost tooling starts after the spend lands.",
    intro:
      "Telemetry platforms can show activity. Billing tools can show totals. In a high-complexity enterprise estate, neither is enough. The operational question is not just what happened. It is which decision changed the spend, who owns that decision, and whether you can intervene before the next release or budget cycle.",
    beforeTitle: "Without Argmin",
    before: [
      "Finance gets an invoice without a reliable service, team, or budget owner attached.",
      "Engineering sees traces but not the projected cost impact of a model-route change.",
      "Security sees identities and access paths without cost exposure tied to them.",
      "By the time anyone notices spend drift, the decision is already in production.",
    ],
    afterTitle: "With Argmin",
    after: [
      "Each model call resolves through service, code owner, runtime identity, org unit, and budget.",
      "Approvals inherit cost context before a change reaches production.",
      "Budget drift becomes an operational review with accountable owners, not a month-end surprise.",
      "Confidence remains visible at every hop so teams know what is proven and what still needs review.",
    ],
  },
  controlPointsTitle: "Where Argmin intervenes",
  controlPointsIntro:
    "The product wins when it changes a workflow, not when it adds another chart. These are the control points that matter in enterprise AI operations.",
  controlPoints: [
    {
      label: "01",
      stage: "CI/CD",
      title: "Pre-deploy cost checks",
      description:
        "Surface projected monthly impact when a model route, token ceiling, retry policy, or fallback chain changes in a service release.",
      outcome: "Catch expensive changes before they ship.",
    },
    {
      label: "02",
      stage: "Approvals",
      title: "Budget-aware approvals",
      description:
        "Attach service owner, runtime identity, org unit, and budget path to changes that could materially affect AI spend.",
      outcome: "Move approvals from intuition to accountable evidence.",
    },
    {
      label: "03",
      stage: "Operations",
      title: "Fast owner resolution",
      description:
        "When spend jumps, jump from model usage to the code owner and team that actually control the route.",
      outcome: "Shorter time from anomaly to action.",
    },
    {
      label: "04",
      stage: "Planning",
      title: "Portfolio benchmarks",
      description:
        "Compare model routes, services, and teams across the estate to find where a different model, cache strategy, or policy would actually matter.",
      outcome: "Turn attribution into ongoing cost control.",
    },
  ],
  howItWorksTitle: "The attribution graph, step by step",
  howItWorksIntro:
    "Argmin does not stop at tags or dashboards. It progressively resolves each AI request through the systems already used to ship, secure, and fund software so the result is usable in an operational workflow.",
  steps: [
    {
      number: "01",
      title: "Observe usage",
      description:
        "Read-only connectors collect cloud telemetry, billing signals, source control context, CI/CD metadata, identity events, and org structure inside the customer environment.",
    },
    {
      number: "02",
      title: "Map service and code path",
      description:
        "Model calls resolve to the service that issued them and the code path or team responsible for the behavior change behind the spend.",
    },
    {
      number: "03",
      title: "Resolve identity and org",
      description:
        "Runtime identities, human owners, and org hierarchy are reconciled so each request has an accountable operator and business owner attached.",
    },
    {
      number: "04",
      title: "Attribute cost and trigger action",
      description:
        "The final record ties cost to budget and exposes a next action: review, approve, reroute, or enforce, depending on customer policy.",
    },
  ],
  graphStages: [
    {
      number: "Step 1",
      title: "Model usage",
      description: "Capture the call, model, token volume, and runtime context.",
    },
    {
      number: "Step 2",
      title: "Service mapping",
      description: "Link the request to the service and code path behind the change.",
    },
    {
      number: "Step 3",
      title: "Identity resolution",
      description: "Resolve runtime identity, owner, and org unit with explicit confidence.",
    },
    {
      number: "Step 4",
      title: "Cost attribution",
      description: "Attach budget impact and the next decision to take.",
    },
  ],
  attributionLayers: [
    { label: "Model call", value: "gpt-4.1 / 58k tokens / tier-1 triage", confidence: "0.97", tone: "high" },
    { label: "Service", value: "support-router-prod / release 2026.03.18", confidence: "0.95", tone: "high" },
    { label: "Code owner", value: "Customer Ops Platform / cost center 4421", confidence: "0.91", tone: "high" },
    { label: "Identity", value: "svc-support-router@prod / GitHub Actions deploy", confidence: "0.88", tone: "medium" },
    { label: "Org unit", value: "Customer Operations / Support Automation", confidence: "0.84", tone: "medium" },
    { label: "Budget", value: "FY26 Assistants / projected run-rate +$28.6k", confidence: "0.8", tone: "low" },
  ],
  decisionRecord: {
    title: "Decision triggered",
    heading: "Review the support-router default model change before broad rollout.",
    body:
      "A release shifted low-value triage traffic toward GPT-4.1. Argmin tied the change to the owning service, deployment identity, and budget before the new run rate became a finance surprise.",
    fields: [
      { label: "Current run rate", value: "$91.4k / month" },
      { label: "Suggested action", value: "Route tier-1 intents to GPT-4.1 mini and require approval for fallback expansion" },
    ],
  },
  sampleOutput: {
    title: "Sample output",
    headline: "What a buyer should see is a decision record, not another dashboard screenshot.",
    intro:
      "This example is illustrative, but the artifact is the point: ownership, projected impact, confidence, and the next action live in the same record.",
    scenario:
      "A support assistant release defaults low-value ticket classification to GPT-4.1, expanding coverage to 83% of traffic over a weekend.",
    metrics: [
      { label: "Owning service", value: "support-router-prod" },
      { label: "Primary owner", value: "Customer Ops Platform" },
      { label: "Budget path", value: "FY26 Assistants / Support Automation" },
      { label: "Projected monthly delta", value: "+$28.6k" },
      { label: "Lower-cost route", value: "GPT-4.1 mini for tier-1 intents" },
      { label: "Confidence", value: "0.88 overall / 0.97 at model usage" },
    ],
    recommendation:
      "Approve the deploy only for fallback traffic, shift default tier-1 classification to the lower-cost route, and review the exception with Engineering plus FinOps in the next budget cycle.",
    supportPoints: [
      "Engineering sees which release changed the route.",
      "Finance sees which budget absorbs the new run rate.",
      "Security sees the deploy identity tied to the cost event.",
    ],
    primaryCtaLabel: "Start with a spend spike",
    secondaryCtaLabel: "See deployment path",
    contactTemplate:
      "We have a recent AI spend change and want to see how Argmin would attribute it from model usage to service, owner, identity, and budget.",
  },
  comparison: {
    title: "Why this is not Datadog or CloudZero",
    intro:
      "Those systems are useful. They are adjacent, not equivalent. Argmin sits at the ownership and decision layer between telemetry and budget action.",
    rows: [
      {
        label: "Primary object",
        incumbent: "Metrics, traces, logs, and cost views",
        argmin: "Attributed AI decision records",
      },
      {
        label: "Main question answered",
        incumbent: "What happened in the system?",
        argmin: "Who owns the spend, what changed it, and what should happen next?",
      },
      {
        label: "Decision moment",
        incumbent: "Mostly after runtime behavior or invoice arrival",
        argmin: "Before deploy, during approval, and during budget review",
      },
      {
        label: "Attribution model",
        incumbent: "Service or tag centric",
        argmin: "Model -> service -> code -> identity -> org -> budget",
      },
      {
        label: "Governance posture",
        incumbent: "Observe and report",
        argmin: "Advise first, enforce only by opt-in",
      },
    ],
    quote: "Datadog tells you what happened. Argmin tells you what it cost and what to do next.",
  },
  rolesSection: {
    title: "Start from your operating question",
    intro:
      "Enterprise buyers come in through different doors. The page should make each path explicit instead of forcing everyone through one generic narrative.",
  },
  roles: [
    {
      id: "engineering",
      label: "For Engineering",
      problem: "Which service or release changed the bill, and can we catch that before production?",
      integrations: "Cloud telemetry, source control, CI/CD metadata, service identity, deployment history.",
      outcome: "Pre-deploy visibility into model-route regressions and faster owner resolution when spend spikes.",
    },
    {
      id: "finops",
      label: "For Finance / FinOps",
      problem: "Who owns this spend and which budget actually absorbs it?",
      integrations: "Billing exports, budget hierarchy, org mapping, cost-center ownership, service attribution.",
      outcome: "Move from invoice totals to accountable budget decisions with confidence scores attached.",
    },
    {
      id: "security",
      label: "For Security",
      problem: "Which identities and workflows can create ungoverned model spend inside our environment?",
      integrations: "SSO or IAM, service accounts, approval flows, runtime identity, org controls.",
      outcome: "Tie access and approval decisions to real cost exposure without broad telemetry exfiltration.",
    },
  ],
  deployment: {
    title: "Time to first value should be visible",
    intro:
      "A typical deployment path should feel concrete. Buyers need to know when they get an attributable baseline, when teams can review it, and what has to be connected along the way.",
    phases: [
      {
        label: "Week 1",
        title: "Connect cloud, code, and identity context",
        description:
          "Read-only connectors attach cloud telemetry and billing to source control, CI/CD, identity, and org data inside the customer environment.",
      },
      {
        label: "Week 2",
        title: "Establish the attribution baseline",
        description:
          "Argmin starts resolving model calls to services, owners, and budgets with visible confidence so teams can audit the chain before acting on it.",
      },
      {
        label: "Week 3+",
        title: "Layer decisions into approvals and budget review",
        description:
          "The record becomes operational: projected deltas in change review, budget-aware approvals, and portfolio optimization across services.",
      },
    ],
    notes: [
      "No agents or code instrumentation required.",
      "Read-only connectors by default.",
      "Advisory workflows first, enforcement only by explicit opt-in.",
    ],
  },
  security: {
    title: "Security has to be legible in the UI",
    intro:
      "Argmin is built for organizations that do not want raw operational data sprayed into another vendor just to answer an attribution question.",
    flow: [
      "Cloud telemetry, billing, source control, CI/CD, identity, and org context",
      "Argmin attribution graph inside the customer trust boundary",
      "Scoped decision records and approved outputs",
    ],
    insideBoundary: [
      "Graph resolution and attribution baseline run inside the customer environment.",
      "Connectors stay read-only unless a customer explicitly opts into an enforcement path.",
      "Teams can review evidence and confidence without broad telemetry exfiltration.",
    ],
    notRequired: [
      "No write access to source systems by default.",
      "No fleet-wide agent rollout to start attributing spend.",
      "No requirement to forward raw logs broadly outside the trust boundary.",
      "No automatic blocking or enforcement unless the customer chooses it.",
    ],
  },
  foundersSection: {
    title: "Built by operators who have already carried infrastructure risk",
    copy:
      "The team has built enterprise data, platform, and governance systems at Amazon, Cruise, Salesforce, Oxford, and the European Space Agency. The product point of view comes from environments where trust boundaries, cost ownership, and operational accountability were not optional.",
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
    title: "Start with the decision you need to control",
    intro:
      "You do not need to book a generic demo. Bring the spend spike, release change, budget question, or governance gap you cannot currently explain, and we will start there.",
    quickStarts: [
      {
        label: "Map a spend spike",
        message:
          "We have a recent AI spend spike and want to trace it from model usage to service owner, deploy identity, org unit, and budget.",
      },
      {
        label: "Review deployment fit",
        message:
          "We want to understand what it would take to connect Argmin to our cloud, CI/CD, identity, and budget systems and how long time-to-first-value typically takes.",
      },
      {
        label: "Compare against current tooling",
        message:
          "We already use observability and cost tools. We want to understand where Argmin fits relative to those systems and what decision layer it adds.",
      },
    ],
    submitLabel: "Send the problem",
    unavailableLabel: "Form Unavailable",
    sendingLabel: "Sending...",
    successMessage: "Thank you. We will be in touch shortly.",
    errorMessage: "Submission failed. Please email us directly at",
    unavailableMessage:
      "Form submissions are currently unavailable. Please email",
    details: [
      {
        label: "Best fit",
        value: "Teams with multiple services, shared model usage, and more than one budget or approval owner.",
      },
      {
        label: "Helpful context",
        value: "A recent spend spike, a model-routing change, or a budget question that currently requires manual detective work.",
      },
      {
        label: "Who joins",
        value: "Usually an engineering owner plus finance or FinOps, and sometimes security when identity or access controls matter.",
      },
    ],
  },
  footer: {
    wordmark: "argmin",
    tagline: "Decision control for enterprise AI cost.",
  },
} as const;
