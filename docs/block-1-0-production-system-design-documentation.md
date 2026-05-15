# Block-1.0 Production System Design Documentation

## Vertical Legal and Compliance AI Agent Platform

## Executive Summary

Block-1.0 is a production-grade vertical AI agent platform for legal and compliance teams. The product reviews contracts, generates redlines, creates legal risk memos, manages legal playbooks, maps obligations to compliance controls, collects audit evidence, monitors regulatory changes, and preserves human approval and audit trails for all high-risk AI actions.

This system design is built for enterprise SaaS production. The architecture prioritizes security, tenant isolation, auditability, reliability, model governance, human-in-the-loop control, and scalable AI execution. The design follows cloud production principles from the Azure Well-Architected Framework, which organizes production architecture around reliability, security, cost optimization, operational excellence, and performance efficiency ([Microsoft Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)).

The most important production principle is that Block-1.0 is not just a chatbot. It is a workflow system with agents, tools, documents, approvals, evidence, policies, and immutable logs. AI can draft, classify, recommend, and automate low-risk operations, but the system must require human approval for legally consequential actions.

## Scope

This document defines the production architecture for:

- Multi-tenant SaaS application.
- Legal contract review and redlining.
- Compliance evidence automation.
- Agentic AI workflows.
- Block-1.0 model serving, retrieval, evaluation, and governance.
- Enterprise security, privacy, and audit controls.
- Production deployment, scaling, monitoring, and disaster recovery.

This document does not define visual UI in detail because that is covered in the separate Block-1.0 UI/UX documentation. This document focuses on production engineering and system architecture.

## Production Goals

### Business Goals

| Goal | Production implication |
|---|---|
| Sell to mid-market and enterprise legal teams | Must support SSO, RBAC, audit logs, security review, data retention, and DPA requirements |
| Process sensitive legal and compliance documents | Must isolate tenants, encrypt data, protect privilege, and avoid training on customer data by default |
| Deliver AI-assisted legal workflows | Must ground outputs in documents, playbooks, sources, and approvals |
| Expand from contract review to compliance | Must support flexible workflow, control, evidence, and regulatory data models |
| Support future private deployments | Must avoid hard dependency on one LLM provider or one cloud-only architecture |

### Engineering Goals

| Goal | Target |
|---|---|
| Availability | 99.9% for MVP, 99.95% for enterprise tier |
| Data durability | 99.999999999% object storage durability where supported by cloud provider |
| P95 API latency | Under 300 ms for normal CRUD APIs |
| P95 document upload acknowledgment | Under 2 seconds after storage handoff |
| P95 first AI finding | Under 60 seconds for normal contracts |
| P95 full contract review | Under 5 minutes for contracts under 80 pages |
| Audit log completeness | 100% for high-risk actions |
| AI source grounding | 100% required for legal findings shown as recommendations |
| Human approval | Required for redlines, external sends, legal memos, compliance status changes, and policy updates |

## High-Level Architecture

```text
Client Layer
  Web App, Word Add-in, Admin Console, Public Website, API Clients
        |
Edge Layer
  CDN, WAF, API Gateway, Rate Limiter, Bot Protection
        |
Identity and Tenant Layer
  Auth, SSO/SAML, SCIM, RBAC, Tenant Resolver, Policy Engine
        |
Application Services
  Matter, Contract, Document, Playbook, Review, Redline, Approval,
  Compliance, Evidence, Regulatory, Report, Integration, Billing, Audit
        |
Workflow and Agent Layer
  Temporal Workflows, Block-AgentOS, Agent Router, Tool Gateway,
  Human Approval Service, Guardrail Service
        |
AI Platform Layer
  Model Router, RAG Service, Embedding Service, Model Serving,
  Prompt Registry, Evaluation Service, Feedback Service, AI Observability
        |
Data Layer
  PostgreSQL, Vector DB, Object Storage, Redis, Search Index,
  Event Bus, Data Warehouse, Immutable Audit Store
        |
External Systems
  Microsoft 365, Google Workspace, DocuSign, Slack, Teams,
  Salesforce, Okta, Azure AD, Vanta, Drata, Cloud Providers
```

## Architectural Principles

### Tenant Isolation First

Every request must resolve tenant context before accessing data. Tenant identity must be validated at API gateway, service layer, database query, object storage path, vector index namespace, search index, and audit log level.

### Human Approval for Consequential Actions

AI must not directly send redlines, approve legal positions, file reports, modify compliance status, or communicate externally without human approval. This protects customers and aligns with human-centered AI guidance, which recommends communicating AI capabilities and limits, supporting correction, and allowing user control when AI systems are wrong ([Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)).

### Workflow Over Chat

The system should use deterministic workflows for known business processes and agentic behavior only where dynamic reasoning is useful. Contract review, approval, evidence collection, and audit reporting are durable workflows, not transient chats.

### Source-Grounded AI

All legal and compliance findings must link to source documents, playbooks, clauses, controls, or trusted references. Unsupported AI text must be labeled as draft or general assistance, not legal recommendation.

### Zero Trust Internal Design

Do not assume internal services are safe. Use service identity, network policy, least privilege, scoped tokens, request signing where needed, and complete audit logging.

### Model-Agnostic Architecture

Block-1.0 should support commercial LLM APIs, fine-tuned open-weight models, private deployments, local inference, and future proprietary models. Model routing must be abstracted behind a model gateway.

## Recommended Production Stack

### Cloud

Primary recommendation: **Azure-first architecture**, because the user already uses Azure and the product targets enterprise legal/compliance buyers that often accept Microsoft ecosystems.

Alternative: AWS for U.S. enterprise and GovCloud expansion.

| Layer | Azure default | AWS equivalent |
|---|---|---|
| Kubernetes | Azure Kubernetes Service | Elastic Kubernetes Service |
| Database | Azure Database for PostgreSQL Flexible Server | Amazon RDS PostgreSQL or Aurora |
| Object storage | Azure Blob Storage | Amazon S3 |
| Queue/event bus | Azure Service Bus or Event Hubs | SQS/SNS or MSK/EventBridge |
| Cache | Azure Cache for Redis | ElastiCache Redis |
| Search | Azure AI Search or OpenSearch | OpenSearch |
| Secrets | Azure Key Vault | AWS Secrets Manager/KMS |
| CDN/WAF | Azure Front Door + WAF | CloudFront + AWS WAF |
| Identity | Entra ID integration | IAM Identity Center/Cognito/Okta |
| Observability | Azure Monitor + managed Prometheus/Grafana | CloudWatch + managed Prometheus/Grafana |

### Application Stack

| Component | Recommended technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, Radix UI |
| Word Add-in | Office.js, TypeScript |
| Public API | NestJS or Fastify, TypeScript |
| AI services | Python FastAPI |
| Workflow engine | Temporal |
| Agent runtime | LangGraph or custom graph runtime |
| Database ORM | Prisma for app services, SQLAlchemy for AI services if needed |
| Validation | Zod for TypeScript, Pydantic for Python |
| Queue workers | BullMQ for MVP, Temporal workers for durable workflows |
| API docs | OpenAPI 3.1 |
| Infrastructure | Terraform, Helm, Kubernetes |
| CI/CD | GitHub Actions |
| Observability | OpenTelemetry, Prometheus, Grafana, Loki, Sentry |

OpenTelemetry is a vendor-neutral observability framework for generating, collecting, and exporting traces, metrics, and logs, which makes it appropriate for a multi-service architecture that may later move across observability backends ([OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)).

## Deployment Topology

### Environments

| Environment | Purpose | Data policy |
|---|---|---|
| Local | Developer work | Synthetic data only |
| Dev | Shared engineering testing | Synthetic and generated fixtures |
| Staging | Production-like validation | Sanitized data only |
| Production | Customer workloads | Real customer data |
| Enterprise Sandbox | Customer pilot testing | Customer-approved pilot data |
| Private Deployment | Dedicated tenant or regulated customer | Customer-specific controls |

### Region Strategy

Initial:

- Primary region: Southeast Asia or U.S. East, depending on first paying customer geography.
- Recommended commercial launch: U.S. East for U.S. customers, Southeast Asia for APAC customers.

Enterprise expansion:

- U.S. region for U.S. legal customers.
- EU region for GDPR-sensitive customers.
- Singapore region for APAC.
- Future GovCloud/FedRAMP environment for federal or GovCon customers.

### Kubernetes Namespace Layout

```text
namespaces/
  block-prod-edge
  block-prod-app
  block-prod-ai
  block-prod-workflows
  block-prod-data-connectors
  block-prod-observability
  block-prod-security
```

### Service Deployment Pattern

Each service should have:

- Deployment.
- Horizontal Pod Autoscaler.
- Pod Disruption Budget.
- NetworkPolicy.
- ServiceAccount with least privilege.
- ConfigMap for non-secret config.
- Secret reference from Key Vault or external secrets operator.
- Readiness and liveness probes.
- Resource requests and limits.

## Service Architecture

### Core Services

| Service | Responsibility | Storage |
|---|---|---|
| API Gateway | Public API routing, auth enforcement, rate limits | None |
| Auth Service | User auth, SSO, SCIM, sessions | PostgreSQL |
| Tenant Service | Tenant metadata, plans, region, isolation policy | PostgreSQL |
| User Service | Users, teams, roles, invitations | PostgreSQL |
| Matter Service | Legal matters and workspaces | PostgreSQL |
| Document Service | Uploads, versions, metadata, file lifecycle | PostgreSQL + object storage |
| Contract Service | Contract metadata, obligations, versions | PostgreSQL + search |
| Clause Service | Clause extraction, clause library, clause metadata | PostgreSQL + vector DB |
| Playbook Service | Playbooks, rules, fallback language, versions | PostgreSQL |
| Review Service | Contract review jobs, findings, risk scores | PostgreSQL |
| Redline Service | Suggested edits, tracked changes, exports | PostgreSQL + object storage |
| Approval Service | Human-in-loop approvals and decisions | PostgreSQL |
| Compliance Service | Frameworks, controls, mappings, posture | PostgreSQL |
| Evidence Service | Evidence requests, files, sufficiency checks | PostgreSQL + object storage |
| Regulatory Service | Regulatory updates, impact mapping | PostgreSQL + vector DB |
| Report Service | PDF/DOCX/CSV/JSON generation | Object storage |
| Integration Service | External connectors and sync jobs | PostgreSQL + queue |
| Notification Service | Email, Slack, Teams, in-app notifications | PostgreSQL + queue |
| Audit Service | Immutable logs and audit exports | Append-only store + warehouse |
| Billing Service | Plans, seats, usage, invoices | PostgreSQL + billing provider |

### AI Platform Services

| Service | Responsibility |
|---|---|
| Model Router | Selects model based on task, tenant policy, cost, latency, and risk |
| RAG Service | Retrieves source clauses, playbooks, policies, controls, and evidence |
| Embedding Service | Generates embeddings and manages chunking/versioning |
| Agent Runtime | Runs specialized agents and handoffs |
| Tool Gateway | Controls which tools agents can call |
| Guardrail Service | Detects unsafe output, unsupported claims, prompt injection, and data leakage |
| Prompt Registry | Versioned prompts, system policies, templates |
| Evaluation Service | Offline and online evals for model quality |
| Feedback Service | Captures human accept/edit/reject signals |
| AI Trace Service | Stores agent traces, model calls, costs, tokens, and source usage |

### Service Communication

Use:

- REST for external APIs.
- gRPC or internal REST for high-throughput internal services.
- Event bus for asynchronous events.
- Temporal for durable business workflows.

## Workflow Architecture

### Why Durable Workflows

Legal and compliance work often waits on humans, counterparty responses, integration syncs, evidence uploads, approvals, and retries. Durable execution is needed because workflows may run for minutes, days, or weeks.

Temporal is recommended for long-running workflows because it preserves workflow state, supports retries, and enables reliable execution across failures. Use Temporal for contract reviews, approval routing, compliance evidence collection, report generation, and regulatory impact workflows.

### Core Workflow: Contract Review

```text
ContractReviewWorkflow
  1. Validate tenant, user, permissions
  2. Store original document
  3. Parse document
  4. OCR if needed
  5. Extract clauses
  6. Select playbook
  7. Retrieve relevant playbook rules
  8. Run Contract Review Agent
  9. Run Guardrail checks
  10. Store findings
  11. Generate draft redlines
  12. Request human approval
  13. Apply reviewer edits
  14. Export redline and memo
  15. Store final decision and audit log
```

### Core Workflow: Compliance Evidence

```text
EvidenceCollectionWorkflow
  1. Select framework and controls
  2. Identify required evidence
  3. Check integrations for existing evidence
  4. Request missing evidence from owners
  5. Validate uploaded evidence
  6. Run AI sufficiency analysis
  7. Request compliance manager approval
  8. Update control status
  9. Generate audit packet
```

### Core Workflow: Regulatory Impact

```text
RegulatoryImpactWorkflow
  1. Ingest regulatory update
  2. Classify jurisdiction and topic
  3. Retrieve affected policies, contracts, controls
  4. Summarize update
  5. Estimate impact
  6. Recommend playbook/control changes
  7. Request legal/compliance review
  8. Create tasks for approved changes
```

## Agent System Design

### Agent Runtime Pattern

```text
User task
  → Intake classifier
  → Workflow selection
  → Agent planner
  → Tool permission check
  → Tool execution
  → Guardrail validation
  → Human approval if required
  → Output persistence
  → Audit event
```

### Agents

| Agent | Responsibilities | Allowed tools |
|---|---|---|
| Intake Agent | Classify request, choose workflow, ask missing questions | Matter lookup, playbook lookup |
| Document Parser Agent | Extract text, sections, clauses, tables | OCR, parser, clause segmenter |
| Contract Review Agent | Identify risks, deviations, missing clauses | RAG, playbook search, clause search |
| Redline Agent | Draft edits and fallback language | Redline generator, clause library |
| Legal Memo Agent | Generate risk memo and business summary | Finding store, citation builder |
| Compliance Mapping Agent | Map obligations to controls | Control library, evidence search |
| Evidence Agent | Check evidence sufficiency and request missing evidence | Integration read tools, notification |
| Regulatory Agent | Monitor updates and map impact | Regulatory source search, policy search |
| Research Agent | Conduct controlled legal research | Approved research sources only |
| Admin Security Agent | Detect suspicious activity | Audit logs, security events |

### Tool Gateway

Agents must not call tools directly. All tool calls pass through Tool Gateway.

Tool Gateway validates:

- Tenant context.
- User permission.
- Agent permission.
- Tool schema.
- Risk level.
- Rate limit.
- Approval requirement.
- Audit logging.

### Tool Definition Example

```json
{
  "name": "generate_redline",
  "description": "Generate suggested tracked changes for a contract section.",
  "input_schema": {
    "type": "object",
    "properties": {
      "tenant_id": {"type": "string"},
      "document_id": {"type": "string"},
      "section_id": {"type": "string"},
      "playbook_rule_id": {"type": "string"},
      "suggested_language": {"type": "string"}
    },
    "required": ["tenant_id", "document_id", "section_id", "playbook_rule_id", "suggested_language"]
  },
  "risk_level": "high",
  "requires_human_approval": true
}
```

The Model Context Protocol describes tool exposure through names, descriptions, metadata, and JSON schemas, which fits this controlled tool gateway design for safe agent execution ([Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)).

## AI and Model Architecture

### Block-1.0 Model Layer

Block-1.0 should be implemented as a model system, not a single model binary.

```text
Block-1.0
  Block-Core model router
  Block-Legal adapter
  Block-Compliance adapter
  Block-RAG retrieval layer
  Block-Guard safety layer
  Block-Eval evaluation system
  Block-Memory tenant memory
  Block-AgentOS workflow agent runtime
```

### Model Routing

Model Router chooses model based on:

- Task type.
- Tenant security policy.
- Document sensitivity.
- Required latency.
- Required reasoning quality.
- Cost budget.
- Data residency.
- Whether external model calls are allowed.

Example routing:

| Task | Default model |
|---|---|
| Clause extraction | Fine-tuned small model |
| Contract risk review | Strong reasoning model + RAG |
| Redline drafting | Strong reasoning model with playbook context |
| Compliance mapping | Medium model + deterministic rules |
| Bulk classification | Small local model |
| Enterprise private tenant | Self-hosted open-weight model |

### RAG Pipeline

```text
Document ingestion
  → Text extraction
  → Structural parsing
  → Clause segmentation
  → Chunk metadata enrichment
  → Embedding generation
  → Vector index storage
  → Search index storage
```

Retrieval query:

```text
User or agent task
  → Query rewriting
  → Tenant-scoped vector search
  → Keyword search
  → Metadata filtering
  → Reranking
  → Source pack construction
  → Model call
  → Citation validation
```

### Chunking Strategy

| Data type | Chunking strategy |
|---|---|
| Contract | Clause-level chunks with section hierarchy |
| Playbook | Rule-level chunks |
| Policy | Heading-aware chunks |
| Compliance evidence | File summary + evidence metadata |
| Regulatory update | Obligation and requirement-level chunks |
| Legal memo | Paragraph-level chunks with source links |

### Prompt Registry

Prompts must be versioned and auditable.

Prompt metadata:

- Prompt ID.
- Version.
- Owner.
- Task type.
- Model compatibility.
- Risk level.
- Date published.
- Evaluation score.
- Rollback version.

### Evaluation System

Block-Eval should run:

- Offline model evals before deployment.
- Regression evals on prompt changes.
- Online sampling of production outputs.
- Human review acceptance tracking.
- Red-team safety evals.
- Tenant-specific quality dashboards.

Evaluation categories:

| Category | Metric |
|---|---|
| Clause extraction | Precision, recall, F1 |
| Risk classification | Accuracy, high-risk false-negative rate |
| Redline quality | Human acceptance rate |
| Source grounding | Unsupported claim rate |
| Compliance mapping | Correct control mapping rate |
| Latency | P50/P95/P99 |
| Cost | Cost per review |
| Safety | Blocked unsafe outputs |

## Data Architecture

### Database Strategy

Use PostgreSQL as the primary system of record. Use a vector database for retrieval, object storage for documents, Redis for cache and short-lived state, search index for keyword and metadata search, and warehouse for analytics.

| Data type | Store |
|---|---|
| Tenants, users, roles | PostgreSQL |
| Matters, contracts, reviews | PostgreSQL |
| Documents and exports | Object storage |
| Clause embeddings | Vector DB |
| Full-text search | OpenSearch or Azure AI Search |
| Workflow state | Temporal persistence store |
| Audit logs | Append-only log store + warehouse |
| Events | Event bus |
| Analytics | Warehouse |

### Core Entity Model

```text
Tenant
  has many Users
  has many Matters
  has many Playbooks
  has many Integrations

Matter
  belongs to Tenant
  has many Documents
  has many Reviews
  has many Approvals

Document
  belongs to Matter
  has many Versions
  has many Clauses
  has many Embeddings

Review
  belongs to Document
  uses PlaybookVersion
  has many Findings
  has many Redlines
  has Approval

ComplianceFramework
  has many Controls
  has many EvidenceRequests

Control
  maps to Evidence
  maps to Policies
  maps to ContractObligations
```

### Primary Tables

```sql
tenants
users
teams
roles
permissions
user_roles
matters
matter_participants
documents
document_versions
document_chunks
clauses
contracts
contract_obligations
playbooks
playbook_versions
playbook_rules
fallback_clauses
reviews
review_findings
redlines
approvals
approval_events
compliance_frameworks
controls
control_mappings
evidence_requests
evidence_artifacts
regulatory_sources
regulatory_updates
agent_runs
tool_calls
model_calls
prompt_versions
eval_runs
audit_events
integration_connections
webhook_events
notifications
usage_events
billing_accounts
```

### Tenant Isolation Patterns

MVP:

- Shared database.
- Every table includes `tenant_id`.
- Row-level security for critical tables.
- Tenant-scoped object storage prefixes.
- Tenant-scoped vector namespaces.

Enterprise:

- Dedicated database option.
- Dedicated object storage container/bucket.
- Dedicated vector index.
- Dedicated encryption keys.
- Optional dedicated Kubernetes namespace.

### Data Retention

| Data | Default retention | Configurable |
|---|---:|---|
| Uploaded documents | Customer-controlled | Yes |
| Deleted documents | 30-day recovery then purge | Yes |
| AI traces | 180 days | Yes |
| Audit logs | 7 years for enterprise | Yes |
| Model call payloads | Disabled or redacted by default | Yes |
| Usage events | 3 years | Yes |
| Backups | 35 days operational, longer if enterprise | Yes |

## API Design

### API Style

Use REST with OpenAPI for external APIs and internal service APIs in MVP. Add gRPC for high-volume internal services later.

### API Versioning

```text
/api/v1/...
/api/v2/...
```

Breaking changes require new API version. Non-breaking additions can remain in same version.

### Core Endpoints

```text
POST   /api/v1/documents
GET    /api/v1/documents/:id
GET    /api/v1/documents/:id/versions
POST   /api/v1/documents/:id/review

GET    /api/v1/reviews
GET    /api/v1/reviews/:id
POST   /api/v1/reviews/:id/findings/:findingId/accept
POST   /api/v1/reviews/:id/findings/:findingId/dismiss
POST   /api/v1/reviews/:id/redlines

GET    /api/v1/playbooks
POST   /api/v1/playbooks
POST   /api/v1/playbooks/:id/publish

GET    /api/v1/approvals
POST   /api/v1/approvals/:id/approve
POST   /api/v1/approvals/:id/reject

GET    /api/v1/compliance/frameworks
GET    /api/v1/compliance/controls
POST   /api/v1/compliance/evidence-requests

GET    /api/v1/agents
GET    /api/v1/agents/:id/runs
POST   /api/v1/agents/:id/disable

GET    /api/v1/audit-events
GET    /api/v1/reports
POST   /api/v1/reports
```

### API Security Controls

OWASP API Security Top 10 identifies risks such as broken object-level authorization, broken authentication, broken object property-level authorization, unrestricted resource consumption, broken function-level authorization, and unrestricted access to sensitive business flows ([OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)). Block-1.0 must apply object-level authorization to every tenant-scoped resource and enforce rate limits for compute-heavy AI operations.

Controls:

- Validate tenant access on every object ID.
- Use scoped tokens and session validation.
- Enforce operation-level permissions.
- Prevent mass assignment with explicit DTO schemas.
- Rate limit AI, upload, export, and search endpoints.
- Require idempotency keys for mutation endpoints.
- Use request body size limits.
- Validate webhook signatures.
- Log sensitive business flow access.

## Security Architecture

### Identity and Access

Required:

- Email/password for early MVP.
- SSO/SAML for enterprise.
- SCIM for user provisioning.
- MFA.
- RBAC.
- Team-based access.
- Matter-level permissions.
- External counsel roles.
- Support impersonation with strict audit logging.

### Permission Model

Three permission layers:

1. Page-level access.
2. Operation-level access.
3. Data-level access.

Example:

```text
Role: Contract Reviewer
  can view assigned matters
  can review documents
  can suggest redlines
  cannot approve high-risk redlines
  cannot change tenant security settings
```

### Encryption

| Data state | Control |
|---|---|
| In transit | TLS 1.2 minimum, TLS 1.3 preferred |
| At rest | Cloud-managed encryption with customer-managed key option |
| Secrets | Key Vault or Secrets Manager |
| Object storage | Per-tenant encryption key for enterprise |
| Backups | Encrypted backups |
| Logs | Redaction before storage |

### LLM Security

OWASP’s LLM security guidance highlights risks such as prompt injection, sensitive information disclosure, insecure output handling, excessive agency, and supply-chain vulnerabilities in LLM applications ([OWASP LLM Top 10](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)). Block-1.0 must treat all uploaded documents and external sources as untrusted input.

Controls:

- Documents cannot override system instructions.
- Prompt injection detector on retrieved chunks.
- Tool calls require schema validation.
- External actions require approval.
- Output sanitizer before rendering.
- No secrets in prompts.
- Sensitive data minimization.
- Model call logging with redaction.
- Tenant policy controls for allowed models.

### Audit Logging

Audit every:

- Login.
- Failed login.
- SSO event.
- User invite.
- Role change.
- Document upload/download/delete.
- AI review start.
- AI finding created.
- Redline generated.
- Human approval/rejection.
- External communication.
- Evidence status change.
- Compliance status change.
- Integration connection/disconnection.
- Admin setting change.

Audit event schema:

```json
{
  "event_id": "audit_123",
  "tenant_id": "tenant_123",
  "actor_type": "user|agent|system|integration",
  "actor_id": "user_123",
  "action": "redline.approved",
  "resource_type": "review",
  "resource_id": "review_123",
  "result": "success",
  "ip_address": "203.0.113.1",
  "user_agent": "browser",
  "timestamp": "2026-05-15T15:00:00Z",
  "metadata": {
    "agent_version": "block-1.0",
    "approval_id": "approval_123"
  }
}
```

## Compliance and Governance

### SOC 2 Readiness

Build controls from day one:

- Access control.
- Change management.
- Incident response.
- Vendor management.
- Data retention.
- Encryption.
- Monitoring.
- Backup and recovery.
- Secure SDLC.
- Audit logging.

### Privacy and Legal Data

Default policy:

- Customer data is not used for model training by default.
- Customer documents stay tenant-scoped.
- Customer can delete documents.
- Customer can configure retention.
- AI outputs are marked as draft until approved.
- Legal privilege and confidentiality must be protected through contractual, technical, and operational controls.

### AI Governance

NIST’s Generative AI Profile extends AI risk management to generative AI by emphasizing governance, mapping, measuring, and managing risks across the AI lifecycle ([NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)). Block-1.0 should implement AI governance through prompt versioning, model evaluation, human approval, risk registers, red-team testing, and incident review.

AI governance artifacts:

- Model cards.
- Prompt registry.
- Dataset registry.
- Evaluation reports.
- Red-team reports.
- AI incident logs.
- Approved model list.
- Tenant model policy.

## Observability and Monitoring

### Telemetry

Instrument:

- API requests.
- Database queries.
- Queue jobs.
- Workflow executions.
- Agent runs.
- Tool calls.
- Model calls.
- Retrieval latency.
- Token usage.
- Guardrail blocks.
- Export jobs.

Use OpenTelemetry for traces, metrics, and logs because it provides vendor-neutral instrumentation and supports multiple observability backends ([OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)).

### Key Metrics

| Category | Metric |
|---|---|
| API | Request rate, latency, error rate |
| Database | Query latency, connection pool usage, locks |
| Queue | Job age, retries, dead-letter count |
| Workflow | Workflow duration, failure rate, stuck workflows |
| AI | Model latency, token usage, cost, error rate |
| RAG | Retrieval latency, source hit rate, citation validation rate |
| Security | Failed logins, permission denials, suspicious exports |
| Product | Reviews completed, approvals pending, findings accepted |
| Compliance | Evidence overdue, controls failing, audit exports |

### SLOs

| Service | SLO |
|---|---|
| Web app availability | 99.9% |
| API availability | 99.9% |
| Document upload acknowledgment | 99% under 2 seconds |
| Contract review completion | 95% under 5 minutes for normal docs |
| Audit log write | 99.99% success |
| Notification delivery | 99% within 60 seconds |

### Alerts

Page immediately:

- API 5xx above threshold.
- Database unavailable.
- Audit logging failure.
- Object storage write failure.
- Tenant isolation policy failure.
- Authentication outage.
- Model provider outage with no fallback.
- Queue backlog exceeding threshold.

Ticket only:

- Slow background jobs.
- Non-critical integration failures.
- Rising AI cost.
- Evaluation score regression.

## Reliability and Scalability

### Scaling Model

| Component | Scaling strategy |
|---|---|
| Web app | CDN + horizontal pods |
| API services | Horizontal Pod Autoscaler |
| AI workers | Queue depth and GPU/CPU autoscaling |
| Document parser | Worker pool |
| Embedding service | Batch workers |
| Model serving | Separate autoscaling node pool |
| Database | Read replicas, connection pooling |
| Search/vector | Sharding or tenant namespace partitioning |

### Backpressure

AI workflows are expensive and can overload systems. Implement:

- Per-tenant concurrent review limits.
- Per-user upload limits.
- Model call budgets.
- Queue priority by plan.
- Graceful degradation to slower batch processing.
- Circuit breakers for model providers.

### Caching

Cache:

- User permissions.
- Tenant configuration.
- Playbook versions.
- Document parse status.
- Search filters.
- Non-sensitive AI eval metadata.

Do not cache:

- Raw legal documents in shared cache.
- Privileged content without encryption.
- Secrets.
- Full prompt payloads unless explicitly allowed and redacted.

## Disaster Recovery and Backups

### RPO and RTO

| Tier | RPO | RTO |
|---|---:|---:|
| MVP | 24 hours | 24 hours |
| Business | 4 hours | 8 hours |
| Enterprise | 1 hour | 4 hours |
| Regulated enterprise | 15 minutes | 1 hour |

### Backup Strategy

- PostgreSQL point-in-time recovery.
- Daily full backups.
- Object storage versioning.
- Cross-region replication for enterprise.
- Audit log replication.
- Quarterly restore drills.

### Disaster Scenarios

| Scenario | Response |
|---|---|
| Database outage | Failover to replica if configured |
| Model provider outage | Route to fallback model or pause AI workflows |
| Object storage outage | Pause uploads and show status |
| Region outage | Enterprise failover to secondary region |
| Search outage | Degrade to database metadata search |
| Vector DB outage | Pause AI source-grounded tasks |

## CI/CD and Release Engineering

### Branching

```text
main
  production-ready
develop
  integration branch
feature/*
  short-lived feature branches
hotfix/*
  urgent production fixes
```

### Pipeline Stages

1. Lint.
2. Type check.
3. Unit tests.
4. Security scan.
5. Dependency scan.
6. Build.
7. Integration tests.
8. Database migration dry run.
9. Container scan.
10. Deploy to staging.
11. Smoke tests.
12. Approval gate.
13. Canary deploy.
14. Production rollout.

### Deployment Strategy

- Blue-green for web and APIs.
- Canary for AI model and prompt changes.
- Feature flags for new workflows.
- Prompt version rollout by tenant or percentage.
- Automatic rollback on SLO breach.

### Database Migration Rules

- Backward-compatible migrations only.
- Expand-contract pattern.
- No destructive migration without backup and rollback plan.
- Long-running migrations use background jobs.
- Migration tested against production-sized staging snapshot.

## Repository Structure

```text
block-1-platform/
  apps/
    web/
    word-addin/
    admin-console/
    public-site/
  services/
    api-gateway/
    auth-service/
    tenant-service/
    matter-service/
    document-service/
    contract-service/
    playbook-service/
    review-service/
    redline-service/
    approval-service/
    compliance-service/
    evidence-service/
    regulatory-service/
    report-service/
    integration-service/
    notification-service/
    audit-service/
    billing-service/
  ai/
    model-router/
    rag-service/
    embedding-service/
    agent-runtime/
    tool-gateway/
    guardrails/
    eval-service/
    prompt-registry/
    fine-tuning/
  workers/
    document-parser-worker/
    ocr-worker/
    embedding-worker/
    review-worker/
    report-worker/
    integration-sync-worker/
  packages/
    ui/
    types/
    config/
    auth/
    logger/
    telemetry/
    policy-engine/
    schemas/
  infra/
    terraform/
    helm/
    k8s/
    docker/
    scripts/
  docs/
    architecture/
    api/
    security/
    runbooks/
    adr/
  tests/
    unit/
    integration/
    e2e/
    load/
    security/
    ai-evals/
```

## Production Data Flows

### Contract Upload and Review

```text
User uploads file
  → API Gateway authenticates request
  → Document Service creates document record
  → Object Storage stores encrypted file
  → Event: document.uploaded
  → Parser Worker extracts text
  → Clause Service segments clauses
  → Embedding Service indexes chunks
  → Review Service starts workflow
  → RAG retrieves playbook and contract context
  → Contract Review Agent creates findings
  → Guardrail Service validates output
  → Review findings saved
  → Approval request created if needed
  → Notification sent to reviewer
```

### Redline Export

```text
Reviewer selects findings
  → Redline Service generates draft changes
  → Human approves export
  → Report Service creates DOCX/PDF
  → Object Storage stores export
  → Audit Service logs approval and export
  → User downloads file
```

### Compliance Evidence Sync

```text
Integration sync starts
  → Integration Service retrieves scoped evidence
  → Evidence Service maps artifacts to controls
  → AI sufficiency check runs
  → Compliance manager reviews gaps
  → Approved evidence updates control status
  → Audit log records status change
```

## Production Runbooks

### Model Provider Outage

1. Detect increased model call failures.
2. Model Router marks provider unhealthy.
3. Route to fallback model.
4. If no safe fallback, pause high-risk AI workflows.
5. Notify affected tenants.
6. Create incident report.
7. Backfill paused jobs when provider recovers.

### Audit Log Failure

1. Immediately stop high-risk actions that require audit.
2. Route audit events to backup queue.
3. Alert on-call engineer and security owner.
4. Restore audit writer.
5. Replay queued audit events.
6. Verify event sequence integrity.
7. Produce incident note.

### Tenant Data Access Alert

1. Block suspicious session.
2. Preserve logs.
3. Notify security lead.
4. Investigate tenant scope violation.
5. Rotate affected tokens if needed.
6. Notify customer if data exposure is confirmed.
7. Add regression test.

### Queue Backlog

1. Identify queue and tenant causing backlog.
2. Scale workers.
3. Apply per-tenant backpressure.
4. Prioritize paid enterprise queues.
5. Move poison jobs to dead-letter queue.
6. Review failure cause.

## Cost Architecture

### Major Cost Drivers

| Cost area | Control |
|---|---|
| LLM inference | Model router, caching, small models for extraction |
| Embeddings | Batch embedding, deduplication, chunk reuse |
| Object storage | Lifecycle policies |
| Vector DB | Tenant namespace pruning, archive inactive docs |
| GPUs | Autoscale self-hosted inference |
| Logs/traces | Sampling and retention policies |
| Search | Index lifecycle and shard management |

### Per-Tenant Cost Tracking

Track:

- Documents uploaded.
- Pages processed.
- Tokens used.
- Model calls.
- Embeddings generated.
- Storage used.
- Agent runs.
- Exports generated.
- Integration sync frequency.

## Product Analytics

Events:

```text
user_signed_up
workspace_created
document_uploaded
review_started
review_completed
finding_accepted
finding_edited
finding_dismissed
redline_generated
approval_requested
approval_completed
playbook_created
evidence_uploaded
control_status_changed
report_exported
integration_connected
agent_run_completed
```

Analytics properties:

- tenant_id.
- user_role.
- plan.
- workflow_type.
- document_type.
- risk_level.
- time_to_complete.
- ai_model_used.
- human_action.

## Testing Strategy

### Test Types

| Test type | Coverage |
|---|---|
| Unit tests | Services, validators, policy engine |
| Integration tests | API + database + queues |
| E2E tests | Upload, review, approval, export |
| Security tests | Auth, RBAC, tenant isolation |
| Load tests | Uploads, review workflows, search |
| AI eval tests | Clause detection, risk scoring, redline quality |
| Regression tests | Prompt/model releases |
| Disaster recovery tests | Backup restore and failover |

### Tenant Isolation Tests

Every resource access pattern must have tests proving:

- User from tenant A cannot access tenant B object by ID.
- Search results are tenant-scoped.
- Vector retrieval is tenant-scoped.
- Object storage URLs are tenant-scoped and time-limited.
- Audit events are tenant-scoped.

## Production Readiness Checklist

### Application

- Health checks implemented.
- Graceful shutdown.
- Idempotent mutations.
- API rate limits.
- Request validation.
- Background job retries.
- Dead-letter queues.
- Feature flags.
- Rollback plan.

### Security

- SSO/SAML for enterprise.
- MFA.
- RBAC.
- Tenant isolation tests.
- Encryption.
- Secrets management.
- Audit logs.
- Security headers.
- Webhook signature validation.
- Dependency scanning.
- Container scanning.

### AI

- Prompt registry.
- Model routing.
- Source grounding.
- Guardrails.
- Human approval gates.
- AI traces.
- Token/cost tracking.
- Eval suite.
- Fallback model.
- Prompt injection testing.

### Data

- Backups.
- Restore test.
- Migration rollback.
- Data retention policies.
- Object lifecycle rules.
- Vector index rebuild procedure.
- Data deletion workflow.

### Operations

- Dashboards.
- Alerts.
- Runbooks.
- On-call rotation.
- Incident process.
- Status page.
- Customer notification templates.
- SLOs.

## MVP Production Architecture

For the first production version, avoid overengineering but keep the security foundation.

### MVP Services

Start with:

- Web app.
- API gateway.
- Auth/tenant service.
- Document service.
- Review service.
- Playbook service.
- Approval service.
- Audit service.
- AI orchestration service.
- Worker service.

Use modular monolith internally if the team is small, but define service boundaries clearly so extraction to microservices is easy later.

### MVP Infrastructure

```text
Azure Front Door + WAF
  → AKS or Azure Container Apps
  → PostgreSQL Flexible Server
  → Azure Blob Storage
  → Azure Cache for Redis
  → Qdrant or pgvector
  → Azure Service Bus
  → Key Vault
  → Grafana/Sentry/OpenTelemetry
```

### MVP Cut List

Do not build in MVP:

- Full workflow canvas.
- Multi-region active-active.
- FedRAMP environment.
- Dedicated tenant databases.
- On-prem deployment.
- Full legal research engine.
- Advanced regulatory monitoring.

Keep architecture ready for these, but do not spend MVP time on them.

## Scale Architecture

At scale, split into:

- Dedicated AI worker pools.
- Dedicated document parsing pipeline.
- Dedicated vector/search cluster.
- Dedicated audit log pipeline.
- Dedicated enterprise tenant plane.
- Regional data plane.
- Control plane for tenancy, billing, and admin.

```text
Global Control Plane
  tenants, billing, global admin, feature flags

Regional Data Plane
  documents, reviews, vectors, workflows, audit logs

Enterprise Dedicated Plane
  dedicated DB, storage, model serving, keys, network policy
```

## Build Sequence

### Phase 1: Secure MVP

Build:

- Multi-tenant auth.
- Document upload.
- Contract review workflow.
- AI findings.
- Playbook rules.
- Human approval.
- Audit logs.
- Basic observability.

### Phase 2: Production Hardening

Build:

- SSO/SAML.
- SCIM.
- Strong RBAC.
- Rate limits.
- Feature flags.
- SOC 2 evidence collection.
- CI/CD canary.
- Eval suite.

### Phase 3: Compliance Platform

Build:

- Controls.
- Evidence requests.
- Integrations.
- Compliance dashboard.
- Audit packet export.
- Regulatory update ingestion.

### Phase 4: Enterprise Scale

Build:

- Dedicated tenant option.
- Data residency.
- Private model serving.
- Advanced audit exports.
- SIEM integration.
- DLP integration.
- Enterprise SLA.

## Key Design Decisions

| Decision | Recommendation | Reason |
|---|---|---|
| Cloud | Azure-first | Fits user background and enterprise Microsoft ecosystem |
| Architecture | Modular services with possible modular monolith early | Faster MVP without losing future scale |
| Workflow engine | Temporal | Durable long-running legal/compliance workflows |
| Database | PostgreSQL | Strong relational consistency for legal data |
| Vector DB | pgvector MVP, Qdrant scale | Start simple, scale later |
| Agent runtime | LangGraph/custom graph | Explicit workflow state and human-in-loop control |
| Observability | OpenTelemetry | Vendor-neutral traces, logs, metrics |
| AI model | Model router, not one hardcoded model | Cost, quality, data residency, and fallback flexibility |
| Security | Tenant isolation and audit first | Enterprise legal buyer requirement |

## Final Recommendation

Block-1.0 should be built as a secure, workflow-first legal and compliance AI platform. The production system must prioritize tenant isolation, source-grounded AI, human approval, auditability, and durable workflows before flashy agent autonomy. The correct architecture is a multi-tenant SaaS control plane with document processing, AI orchestration, RAG, model routing, approval workflows, compliance evidence automation, and immutable audit logging.

The MVP should be simple enough to ship fast but architected with production boundaries from day one. Start with contract review, playbooks, AI findings, redlines, approvals, and audit logs. Then expand into compliance evidence, integrations, regulatory monitoring, private model serving, and enterprise deployments.
