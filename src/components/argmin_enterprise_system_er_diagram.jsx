import { useState, useMemo, useCallback } from "react";

/* ═══ SIGNAL TAXONOMY ═══ */
const SIG_COLORS = {
  PRIMARY: "#D97706", SECONDARY: "#3B82F6", TERTIARY: "#64748B",
  DISTRACTOR: "#94A3B8", CONFOUNDER: "#DC2626", CANONICAL: "#7C3AED", CONTROL: "#0891B2",
};
const SIG_LABELS = {
  PRIMARY: "Primary", SECONDARY: "Secondary", TERTIARY: "Tertiary",
  DISTRACTOR: "Distractor", CONFOUNDER: "Confounder", CANONICAL: "Canonical", CONTROL: "Control Plane",
};

/* ═══ TRUST BOUNDARY ZONES ═══ */
const ZONES = [
  { id: "ARGMIN_PLATFORM", label: "Argmin Platform", sub: "Deployed inside customer VPC", color: "#D97706",
    desc: "Normalization, probabilistic reconciliation, attribution graph, decision-time interceptor, and materialized index",
    flow: "Ingests signals from enterprise source systems via read-only connectors" },
  { id: "CUSTOMER_VPC", label: "Enterprise Source Systems", sub: "Customer VPC boundary", color: "#2563EB",
    desc: "The systems Argmin reads from to construct the six-layer attribution chain",
    flow: "Feeds telemetry, billing, identity, and deployment signals into the platform" },
  { id: "VENDOR_CONTROL", label: "Vendor Control Plane", sub: "Outside customer boundary", color: "#DC2626",
    desc: "License validation and opt-in benchmark aggregation; outbound-only, no raw telemetry",
    flow: "Receives only pre-aggregated anonymized summaries under explicit customer consent" },
  { id: "NOISE_BOUNDARY", label: "Noise and Distractor Systems", sub: "Must be recognized and filtered", color: "#94A3B8",
    desc: "High-volume enterprise systems that produce no AI attribution signal",
    flow: "Generates logs that superficially resemble AI activity but carry no attribution value" },
];

/* ═══ DOMAIN CLUSTERS ═══ */
const CLUSTERS = [
  { id: "canonical", zone: "ARGMIN_PLATFORM", label: "Normalization and Reconciliation", color: "#7C3AED", entities: [
    { id: "SOURCE_SYSTEM", s: "CANONICAL", fc: true, d: "Registered external data source with authoritativeness class" },
    { id: "SOURCE_RECORD", s: "CANONICAL", fc: false, d: "Individual record ingested from a source system" },
    { id: "RECONCILIATION_DECISION", s: "CANONICAL", fc: true, d: "Decision linking two canonical entities with method and status" },
    { id: "CANONICAL_LINK_EVIDENCE", s: "CANONICAL", fc: true, d: "Evidence supporting a reconciliation decision" },
    { id: "CONFIDENCE_SCORE_RECORD", s: "CANONICAL", fc: true, d: "Calibrated confidence (capped at 0.95) for a reconciliation" },
    { id: "ALTERNATE_KEY_CROSSWALK", s: "CANONICAL", fc: false, d: "Maps source-system native keys to canonical surrogate keys" },
    { id: "ACTOR_RESOLUTION_MAP", s: "CANONICAL", fc: false, d: "Maps observed actor identifiers to canonical user identity" },
    { id: "SERVICE_OWNERSHIP_MAP", s: "CANONICAL", fc: false, d: "Service to owning team with effective dating and confidence" },
    { id: "BUDGET_ALLOCATION_MAP", s: "CANONICAL", fc: false, d: "Cost center to budget with confidence and effective dating" },
    { id: "MODEL_ALIAS_MAP", s: "CANONICAL", fc: false, d: "Maps model aliases and display names to canonical model versions" },
    { id: "RETRIEVAL_EVENT", s: "CANONICAL", fc: false, d: "Records a retrieval operation linking AI request to knowledge source" },
    { id: "WORKLOAD", s: "CANONICAL", fc: false, d: "Canonical abstraction of K8s, VM, serverless, or batch workload" },
  ]},
  { id: "decision_time", zone: "ARGMIN_PLATFORM", label: "Decision-Time Interceptor", color: "#DC2626", entities: [
    { id: "INTERCEPTOR_INSTANCE", s: "CANONICAL", fc: true, d: "Fail-open interceptor with 50ms latency budget, hardware-level timeout" },
    { id: "ATTRIBUTION_INDEX", s: "CANONICAL", fc: true, d: "Precomputed O(1) lookup materialized from graph (not live query)" },
    { id: "POLICY", s: "CANONICAL", fc: true, d: "Named governance policy: budget, model, routing, or compliance" },
    { id: "POLICY_EVALUATION", s: "CANONICAL", fc: true, d: "Real-time evaluation of a request against active policies" },
    { id: "SHAPE_DECISION", s: "CANONICAL", fc: false, d: "Advisory decision (default mode): request always proceeds" },
    { id: "GATE_DECISION", s: "CANONICAL", fc: false, d: "Enforcement decision: requires explicit per-workload opt-in" },
    { id: "SHADOW_EVENT", s: "CANONICAL", fc: false, d: "Logged when enrichment cannot complete within latency budget" },
    { id: "COST_LINT_CHECK", s: "CANONICAL", fc: false, d: "Pre-deploy cost linting in CI/CD pipeline" },
  ]},
  { id: "ai_request", zone: "ARGMIN_PLATFORM", label: "Attribution Output", color: "#D97706", entities: [
    { id: "AI_REQUEST", s: "PRIMARY", fc: true, d: "Canonical normalized invocation event" },
    { id: "TOKEN_USAGE", s: "PRIMARY", fc: false, d: "Input, output, and reasoning token counts per request" },
    { id: "LATENCY_EVENT", s: "PRIMARY", fc: false, d: "Time to first token, total latency, queue time" },
    { id: "COST_ALLOCATION", s: "PRIMARY", fc: true, d: "Fractional cost assignment to team, cost center, and product feature" },
    { id: "QUALITY_SIGNAL", s: "PRIMARY", fc: true, d: "Eval score, user feedback, capability equivalence result" },
    { id: "SAFETY_EVENT", s: "SECONDARY", fc: false, d: "Content filter trigger, PII detection, policy violation" },
    { id: "CARBON_ESTIMATE", s: "PRIMARY", fc: true, d: "Estimated kg CO2e with uncertainty percentage" },
    { id: "SECURITY_EVENT", s: "PRIMARY", fc: true, d: "Model misuse, data exfiltration attempt, policy breach" },
    { id: "AUDIT_EVENT", s: "SECONDARY", fc: false, d: "Immutable audit record for compliance replay" },
  ]},
  { id: "app_svc", zone: "CUSTOMER_VPC", label: "Application and Service", color: "#3B82F6", entities: [
    { id: "APPLICATION", s: "PRIMARY", fc: true, d: "Logical application boundary" },
    { id: "SERVICE", s: "PRIMARY", fc: true, d: "Deployable service unit" },
    { id: "API_ENDPOINT", s: "SECONDARY", fc: false, d: "HTTP or gRPC endpoint exposing AI capability" },
    { id: "DATA_PRODUCT", s: "SECONDARY", fc: false, d: "Published data asset consumed by services" },
    { id: "FEATURE_FLAG", s: "TERTIARY", fc: false, d: "Feature gate affecting AI behavior" },
    { id: "WORKFLOW_JOB", s: "SECONDARY", fc: false, d: "Scheduled or triggered automation" },
  ]},
  { id: "identity", zone: "CUSTOMER_VPC", label: "Identity and Access", color: "#7C3AED", entities: [
    { id: "USER_IDENTITY", s: "PRIMARY", fc: true, d: "Canonical person resolved across systems" },
    { id: "USER_ACCOUNT", s: "SECONDARY", fc: false, d: "Account in a specific system" },
    { id: "SERVICE_ACCOUNT", s: "PRIMARY", fc: true, d: "Non-human identity making AI requests" },
    { id: "API_KEY", s: "PRIMARY", fc: false, d: "Credential authenticating to model providers" },
    { id: "IDP_DIRECTORY", s: "SECONDARY", fc: false, d: "Okta, Entra ID, Google Workspace" },
    { id: "DIRECTORY_GROUP", s: "SECONDARY", fc: false, d: "Group membership for RBAC" },
    { id: "RBAC_ROLE", s: "TERTIARY", fc: false, d: "Role granting entitlements" },
    { id: "ENTITLEMENT", s: "TERTIARY", fc: false, d: "Specific permission or access right" },
    { id: "DEVICE", s: "TERTIARY", fc: false, d: "Laptop, phone, or workstation used by identity" },
    { id: "GROUP_MEMBERSHIP", s: "SECONDARY", fc: false, d: "Association between user account and directory group" },
  ]},
  { id: "ai_model", zone: "CUSTOMER_VPC", label: "AI Model and Agent", color: "#DC2626", entities: [
    { id: "MODEL_PROVIDER_ACCOUNT", s: "PRIMARY", fc: false, d: "OpenAI, Anthropic, Azure OpenAI, Bedrock account" },
    { id: "MODEL_ENDPOINT", s: "PRIMARY", fc: false, d: "Specific deployment of a model version" },
    { id: "MODEL_VERSION", s: "PRIMARY", fc: true, d: "Versioned model with pricing (effective-dated)" },
    { id: "MODEL_FAMILY", s: "SECONDARY", fc: false, d: "GPT-4, Claude, Gemini family grouping" },
    { id: "MODEL_PRICING_SCHEDULE", s: "PRIMARY", fc: false, d: "Token pricing with effective dating" },
    { id: "MODEL_GOVERNANCE_POLICY", s: "SECONDARY", fc: false, d: "Approved or restricted model list" },
    { id: "AI_AGENT", s: "PRIMARY", fc: false, d: "Autonomous agent runtime" },
    { id: "AGENT_RUN", s: "PRIMARY", fc: false, d: "Single agent execution with tool calls" },
    { id: "TOOL_CALL", s: "SECONDARY", fc: false, d: "External tool invoked by agent" },
    { id: "PROMPT_TEMPLATE", s: "SECONDARY", fc: false, d: "Versioned prompt used for requests" },
    { id: "MODEL_CAPABILITY", s: "SECONDARY", fc: false, d: "Context window, modality, tool use capabilities" },
    { id: "MEMORY_OBJECT", s: "SECONDARY", fc: false, d: "Persistent memory read/written by agent runs" },
    { id: "AGENT_EVAL_RESULT", s: "SECONDARY", fc: false, d: "Evaluation result for an agent run" },
  ]},
  { id: "enterprise_org", zone: "CUSTOMER_VPC", label: "Organization and Hierarchy", color: "#2563EB", entities: [
    { id: "ENTERPRISE", s: "PRIMARY", fc: false, d: "Top-level tenant" },
    { id: "BUSINESS_UNIT", s: "PRIMARY", fc: true, d: "Organizational division (effective-dated)" },
    { id: "TEAM", s: "PRIMARY", fc: true, d: "Attribution target (effective-dated ownership)" },
    { id: "COST_CENTER", s: "PRIMARY", fc: true, d: "Financial allocation unit" },
    { id: "LEGAL_ENTITY", s: "SECONDARY", fc: false, d: "Legal structure for compliance" },
    { id: "REGION", s: "SECONDARY", fc: false, d: "Geographic region (affects carbon factors)" },
    { id: "ENVIRONMENT", s: "SECONDARY", fc: false, d: "prod, staging, dev, sandbox" },
    { id: "PRODUCT_FEATURE", s: "SECONDARY", fc: false, d: "Product capability consuming AI" },
    { id: "ORG_SNAPSHOT", s: "SECONDARY", fc: false, d: "Point-in-time org hierarchy (temporal model)" },
  ]},
  { id: "source_control", zone: "CUSTOMER_VPC", label: "Source Control and CI/CD", color: "#059669", entities: [
    { id: "REPOSITORY", s: "PRIMARY", fc: true, d: "Code repository with CODEOWNERS" },
    { id: "CODEOWNERS_RULE", s: "PRIMARY", fc: false, d: "File-pattern to team ownership mapping" },
    { id: "CODE_COMMIT", s: "SECONDARY", fc: false, d: "Commit with author identity" },
    { id: "PULL_REQUEST", s: "SECONDARY", fc: false, d: "PR with reviewer identity" },
    { id: "CI_PIPELINE", s: "SECONDARY", fc: false, d: "Build, test, deploy pipeline definition" },
    { id: "CI_RUN", s: "SECONDARY", fc: false, d: "Pipeline execution" },
    { id: "DEPLOYMENT", s: "PRIMARY", fc: true, d: "Release to environment (links code to runtime)" },
    { id: "SBOM", s: "TERTIARY", fc: false, d: "Software bill of materials" },
    { id: "CODE_FILE", s: "TERTIARY", fc: false, d: "Individual file in a repository" },
    { id: "BRANCH", s: "TERTIARY", fc: false, d: "Git branch in a repository" },
    { id: "ISSUE", s: "TERTIARY", fc: false, d: "Issue or work item tracked in repository" },
    { id: "RELEASE_TAG", s: "TERTIARY", fc: false, d: "Version tag on a repository release" },
    { id: "BUILD_ARTIFACT", s: "SECONDARY", fc: false, d: "Artifact produced by CI run" },
    { id: "TEST_RESULT", s: "SECONDARY", fc: false, d: "Test execution result from CI run" },
  ]},
  { id: "cloud", zone: "CUSTOMER_VPC", label: "Cloud Infrastructure", color: "#0891B2", entities: [
    { id: "CLOUD_ACCOUNT", s: "PRIMARY", fc: false, d: "AWS account, Azure subscription, GCP project" },
    { id: "CLOUD_RESOURCE", s: "PRIMARY", fc: true, d: "Generic cloud resource (resource_id, resource_type)" },
    { id: "K8S_CLUSTER", s: "SECONDARY", fc: false, d: "Kubernetes cluster" },
    { id: "K8S_WORKLOAD", s: "PRIMARY", fc: false, d: "Deployment, StatefulSet, DaemonSet" },
    { id: "VM_INSTANCE", s: "SECONDARY", fc: false, d: "Virtual machine" },
    { id: "SERVERLESS_FUNCTION", s: "SECONDARY", fc: false, d: "Lambda, Cloud Function, Azure Function" },
    { id: "GPU_RESOURCE", s: "PRIMARY", fc: false, d: "GPU allocation (key for carbon and cost)" },
    { id: "MANAGED_AI_SERVICE", s: "PRIMARY", fc: false, d: "Bedrock, Azure OpenAI, Vertex AI" },
    { id: "DATABASE_INSTANCE", s: "TERTIARY", fc: false, d: "RDS, Cloud SQL, Cosmos DB" },
    { id: "OBJECT_STORE_BUCKET", s: "TERTIARY", fc: false, d: "S3, GCS, Azure Blob" },
    { id: "API_GATEWAY_ROUTE", s: "SECONDARY", fc: false, d: "Kong, Apigee, API Gateway route" },
    { id: "QUEUE_TOPIC", s: "TERTIARY", fc: false, d: "Kafka topic, SQS queue, Pub/Sub topic" },
    { id: "K8S_NAMESPACE", s: "SECONDARY", fc: false, d: "Namespace within a Kubernetes cluster" },
    { id: "POD", s: "TERTIARY", fc: false, d: "Kubernetes pod running containers" },
    { id: "CONTAINER", s: "TERTIARY", fc: false, d: "Container instance within a pod" },
    { id: "CONTAINER_IMAGE", s: "SECONDARY", fc: false, d: "Container image instantiated by containers" },
    { id: "VM_WORKLOAD", s: "SECONDARY", fc: false, d: "Workload running on a VM instance" },
    { id: "BATCH_JOB", s: "SECONDARY", fc: false, d: "Batch processing job definition" },
    { id: "FUNCTION_INVOCATION", s: "TERTIARY", fc: false, d: "Individual serverless function invocation" },
    { id: "JOB_EXECUTION", s: "TERTIARY", fc: false, d: "Single execution of a batch or workflow job" },
    { id: "PROCESS", s: "TERTIARY", fc: false, d: "OS process running on a VM" },
    { id: "CACHE_CLUSTER", s: "TERTIARY", fc: false, d: "Redis, Memcached, or ElastiCache cluster" },
    { id: "AUDIT_LOG", s: "SECONDARY", fc: false, d: "Cloud audit trail (CloudTrail, Activity Log)" },
    { id: "NETWORK_FLOW", s: "TERTIARY", fc: false, d: "VPC flow log or network telemetry" },
    { id: "MESSAGE", s: "TERTIARY", fc: false, d: "Individual message in a queue or topic" },
  ]},
  { id: "observability", zone: "CUSTOMER_VPC", label: "Observability and Telemetry", color: "#D97706", entities: [
    { id: "REQUEST_TRACE", s: "PRIMARY", fc: true, d: "Distributed trace spanning AI request lifecycle" },
    { id: "SPAN", s: "SECONDARY", fc: false, d: "Individual span within a trace" },
    { id: "LOG_EVENT", s: "SECONDARY", fc: false, d: "Structured log entry" },
    { id: "METRIC_DATAPOINT", s: "SECONDARY", fc: false, d: "Time-series metric observation" },
    { id: "OTEL_PIPELINE", s: "TERTIARY", fc: false, d: "OTel Collector, Fluent Bit pipeline" },
    { id: "TRACE_EVENT", s: "SECONDARY", fc: false, d: "Trace-level event from observability pipeline" },
  ]},
  { id: "financial", zone: "CUSTOMER_VPC", label: "Billing and Financial", color: "#059669", entities: [
    { id: "BILLING_SYSTEM", s: "PRIMARY", fc: false, d: "Cloud billing API, CUR, billing export" },
    { id: "COST_LINE_ITEM", s: "PRIMARY", fc: true, d: "Individual billable line item" },
    { id: "PROVIDER_INVOICE", s: "PRIMARY", fc: false, d: "Invoice from model provider" },
    { id: "GL_ACCOUNT", s: "SECONDARY", fc: false, d: "General ledger account" },
    { id: "BUDGET", s: "SECONDARY", fc: false, d: "Budget allocation (effective-dated)" },
    { id: "ERP_SYSTEM", s: "TERTIARY", fc: false, d: "NetSuite, SAP, Oracle ERP" },
    { id: "FINOPS_PLATFORM", s: "TERTIARY", fc: false, d: "Apptio, CloudHealth, CloudZero" },
    { id: "INVOICE", s: "SECONDARY", fc: false, d: "Internal or external invoice" },
    { id: "FORECAST", s: "SECONDARY", fc: false, d: "Budget or cost forecast" },
    { id: "RECOMMENDATION", s: "TERTIARY", fc: false, d: "Cost optimization recommendation" },
    { id: "DATA_WAREHOUSE", s: "SECONDARY", fc: false, d: "Snowflake, BigQuery, Redshift data warehouse" },
  ]},
  { id: "security", zone: "CUSTOMER_VPC", label: "Security and Compliance", color: "#DC2626", entities: [
    { id: "POLICY_ENGINE", s: "SECONDARY", fc: false, d: "OPA, Cedar, custom policy engine" },
    { id: "POLICY_DECISION", s: "PRIMARY", fc: true, d: "Allow, deny, or flag for request, user, team, model" },
    { id: "SECURITY_FINDING", s: "SECONDARY", fc: false, d: "Vulnerability scan result, posture alert" },
    { id: "SIEM", s: "TERTIARY", fc: false, d: "Splunk ES, Sentinel, Chronicle" },
    { id: "SECRETS_MANAGER", s: "SECONDARY", fc: false, d: "Vault, AWS Secrets Manager" },
    { id: "DATA_ASSET", s: "TERTIARY", fc: false, d: "Classified data object (DSPM)" },
    { id: "DLP_CASB", s: "SECONDARY", fc: false, d: "Data loss prevention and cloud access security broker" },
    { id: "EDR_XDR", s: "SECONDARY", fc: false, d: "Endpoint detection and response platform" },
    { id: "VULN_SCANNER", s: "SECONDARY", fc: false, d: "Vulnerability and posture scanner" },
    { id: "DSPM", s: "TERTIARY", fc: false, d: "Data security posture management" },
    { id: "DATA_GOVERNANCE_POLICY", s: "SECONDARY", fc: false, d: "PII classification, sensitivity, retention rules" },
  ]},
  { id: "knowledge", zone: "CUSTOMER_VPC", label: "Knowledge and Retrieval", color: "#0891B2", entities: [
    { id: "KNOWLEDGE_SOURCE", s: "PRIMARY", fc: true, d: "Document store, wiki, data source for RAG" },
    { id: "VECTOR_INDEX", s: "SECONDARY", fc: false, d: "Embedding index for retrieval" },
    { id: "DOCUMENT_CHUNK", s: "PRIMARY", fc: true, d: "Retrieved chunk grounding an AI response" },
    { id: "ETL_PIPELINE", s: "TERTIARY", fc: false, d: "Data ingestion and refresh pipeline" },
    { id: "DATASET", s: "TERTIARY", fc: false, d: "Structured dataset for training or eval" },
    { id: "DATA_QUALITY_CHECK", s: "TERTIARY", fc: false, d: "Freshness, completeness, drift validation" },
  ]},
  { id: "ent_source", zone: "CUSTOMER_VPC", label: "Enterprise Platforms", color: "#64748B", entities: [
    { id: "HRIS", s: "PRIMARY", fc: false, d: "Workday, Oracle HCM, BambooHR" },
    { id: "CMDB", s: "SECONDARY", fc: false, d: "Configuration management database" },
    { id: "MDM_SYSTEM", s: "SECONDARY", fc: false, d: "Master data management" },
    { id: "PROCUREMENT_SYSTEM", s: "SECONDARY", fc: false, d: "Coupa, Zip, Ironclad" },
    { id: "PRODUCT_ANALYTICS", s: "SECONDARY", fc: false, d: "Amplitude, Mixpanel, Pendo" },
    { id: "CRM_SYSTEM", s: "TERTIARY", fc: false, d: "Salesforce, HubSpot" },
    { id: "ITSM", s: "TERTIARY", fc: false, d: "ServiceNow, Jira Service Management" },
    { id: "SUSTAINABILITY_SYSTEM", s: "TERTIARY", fc: false, d: "Carbon data source" },
  ]},
  { id: "ent_biz", zone: "CUSTOMER_VPC", label: "Business Entities", color: "#475569", entities: [
    { id: "CONTRACT", s: "SECONDARY", fc: false, d: "Vendor contract with pricing terms" },
    { id: "VENDOR", s: "SECONDARY", fc: false, d: "AI model or cloud vendor" },
    { id: "CARBON_FACTOR", s: "SECONDARY", fc: false, d: "Grid carbon intensity by region (effective-dated)" },
    { id: "CUSTOMER_ACCOUNT", s: "TERTIARY", fc: false, d: "End-customer account for revenue attribution" },
    { id: "INCIDENT", s: "TERTIARY", fc: false, d: "Operational incident" },
    { id: "CHANGE_RECORD", s: "TERTIARY", fc: false, d: "ITSM change record" },
    { id: "ASSET_RECORD", s: "TERTIARY", fc: false, d: "CMDB asset" },
    { id: "SUBSCRIPTION", s: "TERTIARY", fc: false, d: "Customer subscription tier" },
    { id: "PRODUCT_EVENT", s: "SECONDARY", fc: false, d: "Product analytics event" },
  ]},
  { id: "human", zone: "CUSTOMER_VPC", label: "Human Activity", color: "#BE185D", entities: [
    { id: "TICKET", s: "TERTIARY", fc: false, d: "Jira, Linear, Asana ticket" },
    { id: "DOCUMENT", s: "TERTIARY", fc: false, d: "Confluence, Notion doc" },
    { id: "CHAT_MESSAGE", s: "TERTIARY", fc: false, d: "Slack or Teams message metadata" },
    { id: "EXPENSE_RECORD", s: "TERTIARY", fc: false, d: "Corporate card data" },
    { id: "SUPPORT_CASE", s: "TERTIARY", fc: false, d: "Customer support case" },
  ]},
  { id: "vendor", zone: "VENDOR_CONTROL", label: "Control Plane and Benchmark", color: "#0891B2", entities: [
    { id: "LICENSE_RECORD", s: "CONTROL", fc: false, d: "License validation (outbound-only from VPC)" },
    { id: "CONFIG_UPDATE", s: "CONTROL", fc: false, d: "Software and config updates from vendor" },
    { id: "BENCHMARK_COHORT", s: "CONTROL", fc: true, d: "Anonymous grouping for peer comparison" },
    { id: "BENCHMARK_SUMMARY", s: "CONTROL", fc: true, d: "Pre-aggregated anonymized summary (customer opt-in only)" },
    { id: "EXPORT_CONSENT", s: "CONTROL", fc: false, d: "Customer-controlled consent for benchmark data export" },
  ]},
  { id: "noise_net", zone: "NOISE_BOUNDARY", label: "Network and Infrastructure", color: "#94A3B8", entities: [
    { id: "DNS_DHCP_LOG", s: "DISTRACTOR", fc: false, d: "Domain resolution and IP assignment logs" },
    { id: "VPN_PROXY_LOG", s: "DISTRACTOR", fc: false, d: "VPN tunnel and proxy access logs" },
    { id: "FIREWALL_WAF_LOG", s: "DISTRACTOR", fc: false, d: "Firewall and WAF rule evaluation logs" },
    { id: "CDN_LOG", s: "DISTRACTOR", fc: false, d: "CDN request and cache logs" },
    { id: "NETWORK_FLOW_LOG", s: "DISTRACTOR", fc: false, d: "VPC flow logs, NetFlow" },
    { id: "LOAD_BALANCER_LOG", s: "DISTRACTOR", fc: false, d: "ALB, NLB, ELB access logs" },
  ]},
  { id: "noise_endpoint", zone: "NOISE_BOUNDARY", label: "Endpoint and Device", color: "#94A3B8", entities: [
    { id: "ENDPOINT_MGMT_EVENT", s: "DISTRACTOR", fc: false, d: "Intune, Jamf, SCCM device telemetry" },
    { id: "EDR_XDR_EVENT", s: "DISTRACTOR", fc: false, d: "CrowdStrike, SentinelOne endpoint events" },
    { id: "BADGE_FACILITIES_EVENT", s: "DISTRACTOR", fc: false, d: "Badge swipe, room booking, facilities" },
    { id: "DEVICE_INVENTORY", s: "DISTRACTOR", fc: false, d: "Hardware asset inventory" },
  ]},
  { id: "noise_biz", zone: "NOISE_BOUNDARY", label: "Business System", color: "#94A3B8", entities: [
    { id: "EMAIL_CALENDAR_EVENT", s: "DISTRACTOR", fc: false, d: "Exchange or Gmail metadata" },
    { id: "TELEPHONY_EVENT", s: "DISTRACTOR", fc: false, d: "Contact center, VoIP logs" },
    { id: "TRAVEL_EXPENSE_EVENT", s: "DISTRACTOR", fc: false, d: "Concur, Navan, Brex travel data" },
    { id: "MARKETING_AUTOMATION_EVENT", s: "DISTRACTOR", fc: false, d: "HubSpot, Marketo campaigns" },
    { id: "LMS_TRAINING_EVENT", s: "DISTRACTOR", fc: false, d: "Learning platform completions" },
    { id: "BI_DASHBOARD_ACCESS", s: "DISTRACTOR", fc: false, d: "Tableau, Looker, Power BI access" },
  ]},
  { id: "noise_ml", zone: "NOISE_BOUNDARY", label: "ML Confounders", color: "#DC2626", entities: [
    { id: "LEGACY_ML_PIPELINE", s: "CONFOUNDER", fc: false, d: "Scikit-learn, XGBoost, SageMaker training (not LLM)" },
    { id: "FEATURE_STORE", s: "CONFOUNDER", fc: false, d: "Feast, Tecton (not LLM inference)" },
    { id: "LEGACY_MODEL_REGISTRY", s: "CONFOUNDER", fc: false, d: "MLflow, Weights and Biases (non-LLM)" },
    { id: "NAMING_COLLISION_SERVICE", s: "CONFOUNDER", fc: false, d: "Services named ai-* or ml-* but not doing LLM inference" },
    { id: "BACKUP_DR_EVENT", s: "DISTRACTOR", fc: false, d: "Backup, restore, disaster recovery logs" },
  ]},
];

/* ═══ FLOW ARROW ═══ */
function FlowArrow({ label, color = "#64748B" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0 2px 20px" }}>
      <svg width="32" height="20" viewBox="0 0 32 20" style={{ flexShrink: 0 }}>
        <line x1="0" y1="10" x2="24" y2="10" stroke={color} strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="24,5 32,10 24,15" fill={color} opacity="0.6" />
      </svg>
      <span style={{ fontSize: 10, color, fontStyle: "italic", lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

/* ═══ ENTITY ROW ═══ */
function EntityRow({ entity }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "3px 0" }}>
      <span style={{
        display: "inline-block", width: 8, height: 8, borderRadius: 2, flexShrink: 0, marginTop: 3,
        backgroundColor: SIG_COLORS[entity.s],
      }} />
      <div style={{ minWidth: 0 }}>
        <span style={{
          fontWeight: entity.fc ? 600 : 400,
          color: entity.fc ? "var(--t1)" : "var(--t2)",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        }}>
          {entity.id.replace(/_/g, " ")}
        </span>
        {entity.fc && <span style={{ fontSize: 8, color: "#D97706", marginLeft: 5, fontWeight: 600 }}>FIRST-CLASS</span>}
        <div style={{ fontSize: 10, color: "var(--t4)", marginTop: 1, lineHeight: 1.35 }}>{entity.d}</div>
      </div>
    </div>
  );
}

/* ═══ CLUSTER CARD ═══ */
function ClusterCard({ cluster, isExpanded, onToggle, elevated }) {
  const [hovered, setHovered] = useState(false);
  const sigCounts = {};
  let fcCount = 0;
  cluster.entities.forEach(e => { sigCounts[e.s] = (sigCounts[e.s] || 0) + 1; if (e.fc) fcCount++; });

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 10,
        padding: isExpanded ? "14px 16px" : "12px 14px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        borderLeft: `3px solid ${cluster.color}`,
        border: `1px solid ${hovered ? cluster.color + "55" : cluster.color + "22"}`,
        borderLeftWidth: 3,
        background: hovered ? `${cluster.color}10` : `${cluster.color}06`,
        boxShadow: hovered ? `0 4px 20px ${cluster.color}12` : "none",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: elevated ? 15 : 13, fontWeight: 600, color: "var(--t1)", lineHeight: 1.3 }}>
            {cluster.label}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "var(--t3)", fontFamily: "'JetBrains Mono', monospace" }}>
              {cluster.entities.length} entities
            </span>
            {fcCount > 0 && (
              <span style={{ fontSize: 9, color: "#D97706", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                {fcCount} first-class
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <div style={{
            width: elevated ? 28 : 24, height: elevated ? 28 : 24, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: cluster.color, fontSize: elevated ? 11 : 10,
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: "#fff",
          }}>
            {cluster.entities.length}
          </div>
          <span style={{
            fontSize: 10, color: "var(--t4)", transition: "transform 0.2s",
            transform: isExpanded ? "rotate(180deg)" : "none",
          }}>&#9660;</span>
        </div>
      </div>
      {isExpanded && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
          {cluster.entities.map(e => <EntityRow key={e.id} entity={e} />)}
        </div>
      )}
    </div>
  );
}

/* ═══ MAIN COMPONENT ═══ */
export default function ArgminArchitecture() {
  const [expanded, setExpanded] = useState(new Set());
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSigs, setActiveSigs] = useState(new Set(Object.keys(SIG_COLORS)));
  const [legendOpen, setLegendOpen] = useState(false);

  const toggle = useCallback((id) => {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const filtered = useMemo(() =>
    CLUSTERS.map(c => ({
      ...c,
      entities: c.entities.filter(e => {
        if (!activeSigs.has(e.s)) return false;
        if (search) {
          const q = search.toLowerCase();
          return e.id.toLowerCase().includes(q.replace(/\s+/g, "_")) || e.d.toLowerCase().includes(q);
        }
        return true;
      })
    })).filter(c => c.entities.length > 0),
  [search, activeSigs]);

  const totalE = CLUSTERS.reduce((a, c) => a + c.entities.length, 0);
  const totalFC = CLUSTERS.reduce((a, c) => a + c.entities.filter(e => e.fc).length, 0);

  const t = dark
    ? { "--bg":"#0F172A","--surface":"#1E293B","--elevated":"#334155","--border":"#475569","--t1":"#F8FAFC","--t2":"#CBD5E1","--t3":"#94A3B8","--t4":"#64748B" }
    : { "--bg":"#F8FAFC","--surface":"#F1F5F9","--elevated":"#E2E8F0","--border":"#E2E8F0","--t1":"#0F172A","--t2":"#475569","--t3":"#64748B","--t4":"#94A3B8" };

  return (
    <div style={{ ...t, background: "var(--bg)", color: "var(--t1)", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ padding: "20px 28px 16px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>
              Argmin Enterprise System Architecture
            </h1>
            <p style={{ fontSize: 12, color: "var(--t3)", margin: "4px 0 0", maxWidth: 680, lineHeight: 1.45 }}>
              How Argmin maps enterprise AI consumption from source systems through probabilistic reconciliation to decision-enabling attribution intelligence.
            </p>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="text" placeholder="Search entities..." value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--surface)", color: "var(--t1)", font: "12px/1.4 'Inter',sans-serif", outline: "none", width: 190 }}
            />
            <button onClick={() => setExpanded(new Set(CLUSTERS.map(c => c.id)))} style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--surface)", color: "var(--t2)", font: "11px 'Inter',sans-serif", cursor: "pointer" }}>Expand All</button>
            <button onClick={() => setExpanded(new Set())} style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--surface)", color: "var(--t2)", font: "11px 'Inter',sans-serif", cursor: "pointer" }}>Collapse</button>
            <button onClick={() => setDark(!dark)} style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--surface)", color: "var(--t2)", font: "11px 'Inter',sans-serif", cursor: "pointer" }}>{dark ? "Light" : "Dark"}</button>
            <button onClick={() => setLegendOpen(!legendOpen)} style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 6, background: legendOpen ? "var(--elevated)" : "var(--surface)", color: "var(--t2)", font: "11px 'Inter',sans-serif", cursor: "pointer" }}>Legend</button>
          </div>
        </div>

        {/* Stats line */}
        <div style={{ fontSize: 10, color: "var(--t4)", fontFamily: "'JetBrains Mono', monospace", marginTop: 8 }}>
          {totalE} entities &middot; {CLUSTERS.length} domains &middot; {totalFC} first-class &middot; 4 trust boundaries &middot; 7 signal classes
        </div>

        {/* Collapsible legend */}
        {legendOpen && (
          <div style={{ marginTop: 10, padding: "10px 14px", background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)", display: "flex", gap: 16, flexWrap: "wrap" }}>
            {Object.entries(SIG_LABELS).map(([sig, label]) => (
              <div key={sig} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--t3)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: SIG_COLORS[sig], flexShrink: 0 }} />
                {label}
                <span style={{ fontSize: 9, color: "var(--t4)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {CLUSTERS.reduce((a, c) => a + c.entities.filter(e => e.s === sig).length, 0)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SIGNAL FILTER ── */}
      <div style={{ padding: "8px 28px", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 9, color: "var(--t4)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>Filter</span>
        {Object.entries(SIG_LABELS).map(([sig, label]) => (
          <button key={sig} onClick={() => setActiveSigs(prev => {
            const n = new Set(prev); n.has(sig) ? n.delete(sig) : n.add(sig); return n;
          })} style={{
            padding: "3px 10px", borderRadius: 12,
            border: activeSigs.has(sig) ? `1px solid ${SIG_COLORS[sig]}88` : "1px solid transparent",
            background: activeSigs.has(sig) ? `${SIG_COLORS[sig]}14` : "transparent",
            color: SIG_COLORS[sig], opacity: activeSigs.has(sig) ? 1 : 0.3,
            font: "10px/1.3 'Inter',sans-serif", cursor: "pointer", transition: "all 0.15s",
          }}>{label}</button>
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ padding: "0 28px 40px", maxHeight: "calc(100vh - 160px)", overflowY: "auto" }}>
        {ZONES.map((zone, zi) => {
          const zoneClusters = filtered.filter(c => c.zone === zone.id);
          if (zoneClusters.length === 0) return null;
          const isPlatform = zone.id === "ARGMIN_PLATFORM";

          return (
            <div key={zone.id}>
              {/* Flow arrow between zones */}
              {zi > 0 && <FlowArrow label={zone.flow} color={zone.color} />}

              {/* Zone header */}
              <div style={{
                marginTop: zi === 0 ? 24 : 12, marginBottom: 14,
                padding: isPlatform ? "12px 16px" : "8px 0",
                background: isPlatform ? `${zone.color}08` : "transparent",
                borderRadius: isPlatform ? 10 : 0,
                border: isPlatform ? `1px solid ${zone.color}20` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: zone.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: isPlatform ? 15 : 13, fontWeight: 600, color: zone.color, letterSpacing: "-0.005em" }}>
                      {zone.label}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--t4)", marginTop: 1 }}>{zone.sub}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 4, paddingLeft: 20, lineHeight: 1.4 }}>
                  {zone.desc}
                </div>
              </div>

              {/* Cluster grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isPlatform ? "repeat(3, 1fr)" : "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 10,
                marginBottom: 8,
              }}>
                {zoneClusters.map(c => (
                  <ClusterCard key={c.id} cluster={c} isExpanded={expanded.has(c.id)}
                    onToggle={() => toggle(c.id)} elevated={isPlatform} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
