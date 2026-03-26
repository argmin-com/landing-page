export const siteConfig = {
  name: "Argmin",
  siteUrl: "https://argmin.co/",
  title: "Argmin | Decision Control for Enterprise AI Spend",
  description:
    "Argmin controls AI spend before it compounds. It runs inside your cloud and ties every model call to service, code, identity, org, and budget so teams can intervene before costs hit the bill.",
  ogImage: "https://argmin.co/og-image.png",
  contactEmail: "richard@argmin.co",
  hero: {
    wordmark: "argmin",
    eyebrow: "Decision control for enterprise AI spend",
    headline: "Control AI spend before it hits your cloud bill.",
    subheadline:
      "Argmin identifies, attributes, and controls AI spend across teams, models, and applications before deployment decisions lock in cost. It runs inside your cloud, links telemetry to code, identity, and budgets, and turns each model call into an accountable decision.",
    primaryCtaLabel: "See how attribution works",
    secondaryCtaLabel: "View sample output",
    contactCtaLabel: "Estimate your AI cost leakage",
    contactTemplate:
      "We want to estimate where AI cost leakage is happening across teams, models, and applications before deployment decisions compound it.",
    proofPoints: [
      { label: "Variance", value: "The same AI model can cost up to 700x more depending on how it is used." },
      { label: "Spend", value: "Enterprise AI programs are already running past $85K per month before ownership is clear." },
      { label: "Gap", value: "Most teams still cannot attribute spend to the team, budget, or outcome that created it." },
    ],
    posterChip: "",
    posterTitle: "Know which team, model, and decision is driving spend before costs compound.",
    posterCopy:
      "Finance sees the bill. Engineering sees the code change. Argmin connects both before the next deploy makes the problem bigger.",
    decisionMoments: [
      {
        label: "Before merge",
        detail: "A model-route change shows projected monthly delta before the PR is approved.",
      },
      {
        label: "Before deploy",
        detail: "Approvers see owner, identity, budget, and lower-cost alternatives before rollout.",
      },
      {
        label: "After anomaly",
        detail: "A spend spike resolves to the exact service, team, and deploy that caused it.",
      },
    ],
    decisionOutputs: ["Projected cost delta", "Owner + budget path", "Recommended next change"],
  },
  problem: {
    title: "The same AI model can cost up to 700x more depending on how it is used.",
    intro:
      "That variance gets expensive fast in a decentralized enterprise. Finance sees a growing bill. Engineering sees a successful release. Security sees valid identities. None of them can answer the same question: which team, model choice, and deployment decision created the spend, and how fast can we change it before it compounds?",
    beforeTitle: "Without Argmin",
    before: [
      "Finance can see the invoice, but not the team or budget that caused it.",
      "Engineering can see traces, but not which model-routing decision changed unit economics.",
      "Security can see access, but not which identities are creating ungoverned spend.",
      "By the time someone asks questions, the expensive route is already in production.",
    ],
    afterTitle: "With Argmin",
    after: [
      "Each model call resolves to service, code owner, runtime identity, org unit, and budget.",
      "Model, retry, and fallback changes show projected cost before deployment.",
      "Budget owners get accountable evidence instead of month-end detective work.",
      "Confidence stays visible so teams know exactly what can be acted on now.",
    ],
  },
  controlPointsTitle: "The job is intervention, not reporting.",
  controlPointsIntro:
    "If the product only helps after the invoice lands, it is too late. Argmin earns its place by changing the approval, deployment, and budgeting workflows that create AI spend.",
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
  howItWorksTitle: "Capture usage. Resolve ownership. Trigger a decision.",
  howItWorksIntro:
    "The system has to be legible in one pass: capture model usage, link it to service and code, resolve the owner, attach budget impact, and surface the next action before the same mistake ships again.",
  steps: [
    {
      number: "01",
      title: "Capture model usage",
      description:
        "Read-only connectors collect cloud telemetry and billing signals inside your environment so the raw spend signal exists before anyone starts guessing.",
    },
    {
      number: "02",
      title: "Link to service and code",
      description:
        "Argmin connects model calls to the service, release, and code path responsible for the change in unit economics.",
    },
    {
      number: "03",
      title: "Resolve ownership",
      description:
        "Runtime identities, human owners, and org hierarchy are reconciled so each cost event has an accountable team and approver attached.",
    },
    {
      number: "04",
      title: "Surface the decision",
      description:
        "The final record shows projected delta, budget owner, confidence, and the recommended action: approve, reroute, review, or enforce.",
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
    title: "Intervention point",
    heading: "Block broad rollout of the support-router model change until route economics are fixed.",
    body:
      "A release shifted low-value triage traffic toward GPT-4.1. Argmin linked the change to the owning service, deploy identity, and budget before the higher run rate rolled across the rest of support.",
    fields: [
      { label: "Current run rate", value: "$91.4k / month if rollout continues" },
      {
        label: "Suggested action",
        value:
          "Default tier-1 intents to GPT-4.1 mini, cap fallback escalation, and require owner approval before broader rollout",
      },
    ],
  },
  sampleOutput: {
    title: "Sample output",
    headline: "What a buyer should see is the intervention before rollout, not a dashboard after the bill lands.",
    intro:
      "The output has to create action. This example shows the artifact that matters: owner, projected impact, lower-cost alternative, confidence, and the next decision in one record.",
    scenario:
      "A support assistant release shifts low-value ticket classification to GPT-4.1 and expands exposure to 83% of traffic over a weekend.",
    metrics: [
      { label: "Owning service", value: "support-router-prod" },
      { label: "Primary owner", value: "Customer Ops Platform" },
      { label: "Budget path", value: "FY26 Assistants / Support Automation" },
      { label: "Projected monthly delta", value: "+$28.6k" },
      { label: "Lower-cost route", value: "GPT-4.1 mini for tier-1 intents" },
      { label: "Confidence", value: "0.88 overall / 0.97 at model usage" },
    ],
    recommendation:
      "Pause the broad rollout, shift default tier-1 classification to the lower-cost route, and review the budget exception with Engineering plus FinOps before wider deployment.",
    supportPoints: [
      "Engineering sees which release to reroute or roll back.",
      "Finance sees which budget owner has to approve the delta.",
      "Security sees which deploy identity triggered the cost event.",
    ],
    primaryCtaLabel: "Bring a spend spike",
    secondaryCtaLabel: "See deployment timeline",
    contactTemplate:
      "We have a recent AI spend change and want to see how Argmin would attribute it from model usage to service, owner, identity, and budget.",
  },
  comparison: {
    title: "Why \"we already have Datadog\" is the wrong answer",
    intro:
      "If you already have telemetry and cost views, the real question is whether they tell you who owns the spend and what to change before the next release. Usually they do not.",
    rows: [
      {
        label: "Primary object",
        incumbent: "Telemetry, traces, logs, and spend totals",
        argmin: "AI cost decisions with accountable ownership",
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
    quote: "Datadog tells you what happened. Argmin tells you what it cost and what to change before it happens again.",
  },
  rolesSection: {
    title: "Three buyers. Three entry points.",
    intro:
      "The page should let each stakeholder enter through their own problem instead of forcing everyone through the same neutral narrative.",
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
    title: "A buyer should know what week one looks like.",
    intro:
      "Complex infrastructure still needs a believable time-to-value story. Buyers need to know when they get an attributable baseline, when teams can review it, and what has to be connected along the way.",
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
      "No rip-and-replace instrumentation required.",
      "Read-only connectors by default.",
      "Advisory workflows first, enforcement only by explicit opt-in.",
    ],
  },
  security: {
    title: "Your data never leaves your environment.",
    intro:
      "Argmin runs inside your cloud with read-only access. We do not need broad telemetry exfiltration, write paths, or agents to resolve AI cost ownership.",
    flow: [
      "Signals stay inside your cloud",
      "Argmin resolves attribution inside the customer trust boundary",
      "Scoped decision records enter approvals and budget workflows",
    ],
    insideBoundary: [
      "Graph resolution and attribution baseline run inside the customer environment.",
      "Connectors stay read-only unless a customer explicitly opts into an enforcement path.",
      "Teams can review evidence and confidence without forwarding raw telemetry broadly outside the trust boundary.",
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
    title: "Bring the spend spike, not a generic demo request.",
    intro:
      "If you already suspect AI spend is outrunning ownership, send the spike, release change, or budget question. We will start with the expensive decision, not a canned pitch.",
    quickStarts: [
      {
        label: "Estimate AI cost leakage",
        message:
          "We want to estimate where AI cost leakage is happening across teams, models, and applications before deployment decisions compound it.",
      },
      {
        label: "Map a spend spike",
        message:
          "We have a recent AI spend spike and want to trace it from model usage to service owner, deploy identity, org unit, and budget.",
      },
      {
        label: "Compare against Datadog / CloudZero",
        message:
          "We already use observability or cost tools and want to understand exactly what decision layer Argmin adds relative to Datadog or CloudZero.",
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
        value: "AI programs with multiple services, multiple budgets, and no reliable owner when spend moves.",
      },
      {
        label: "Helpful context",
        value: "A recent spend spike, model-routing change, or approval process that currently lacks cost context.",
      },
      {
        label: "Who joins",
        value: "Usually an engineering owner plus finance or FinOps, and sometimes security when identity or access controls matter.",
      },
    ],
  },
  footer: {
    wordmark: "argmin",
    tagline: "Control AI spend before it compounds.",
  },
} as const;
