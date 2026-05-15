# Block-1.0 Vertical AI Agent Platform

## Complete 0-to-100 Product, Model, Agent, UI/UX, System Design, and Development Documentation

## Executive Summary

Block-1.0 is the proprietary AI model and agent platform for a vertical legal and compliance AI product. The product should begin as a contract review and compliance copilot for mid-market legal teams, then expand into a full legal and compliance operating system that handles contract review, redlining, policy enforcement, audit evidence, regulatory monitoring, legal research, and workflow automation.

Block-1.0 should not be built as a frontier foundation model from scratch at the beginning. The correct strategy is to build a proprietary domain model stack: a branded model interface, fine-tuned open-weight base models, legal and compliance retrieval, tool-use agents, guardrails, evaluation datasets, user-specific memory, and proprietary workflow data. This is how the company can own Block-1.0 economically and technically while avoiding the impossible cost of training a frontier model from zero on day one.

The product should be designed around one principle: **AI can draft, analyze, classify, recommend, and execute workflow steps, but legal and compliance decisions require traceability, human approval, and audit trails**. This is consistent with the risk-management direction of NIST’s Generative AI Profile, which frames AI governance around mapping, measuring, managing, transparency, testing, and risk controls across the AI lifecycle ([NIST](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)).

## Product Definition

### Product Name

The platform can be named **BlockNexa Legal AI** or **BlockOS Legal**, while the proprietary model layer is named **Block-1.0**.

### Core Product Promise

Block-1.0 turns legal and compliance work from manual document review into controlled agentic workflows. The product reads contracts, policies, regulations, audit evidence, and customer playbooks, then recommends actions, creates redlines, drafts memos, checks compliance obligations, and routes risky decisions to humans.

### Target Users

| User | Job to be done | Main product value |
|---|---|---|
| General Counsel | Control legal risk while supporting business speed | Faster review, consistent decisions, visibility |
| Legal Ops Manager | Standardize legal intake, contracts, and approvals | Workflow automation and reporting |
| Contract Manager | Review and negotiate repetitive agreements | Clause detection, redlines, fallback language |
| Compliance Manager | Prepare for audits and track obligations | Evidence collection and regulatory monitoring |
| Founder or COO | Close deals faster without hiring a large legal team | Lower legal cost and faster revenue cycles |
| External Counsel | Review client documents with consistent playbooks | Productivity and client-specific memory |
| Security or IT Admin | Approve tool usage safely | Access control, logs, data protection |

### Core Product Modules

| Module | Version | Description |
|---|---|---|
| Contract Review Agent | MVP | Reviews NDAs, MSAs, DPAs, SaaS agreements, vendor agreements, and employment templates |
| Redline Agent | MVP | Suggests clause edits using company playbooks and fallback language |
| Legal Memo Agent | MVP | Generates short risk memos with citations to contract clauses |
| Playbook Builder | MVP | Lets legal teams define risk rules, approved language, and escalation paths |
| Intake and Workflow | V1 | Routes legal requests from business users to the right agent and reviewer |
| Compliance Evidence Agent | V1 | Collects and maps evidence for SOC 2, ISO 27001, privacy, vendor risk, and internal policy controls |
| Regulatory Monitor | V2 | Tracks regulatory changes and maps them to internal policies, contracts, and controls |
| Legal Research Agent | V2 | Conducts grounded research using approved legal databases and internal knowledge |
| Negotiation Agent | V2 | Tracks counterparty positions and suggests negotiation strategy |
| GovCon and FedRAMP Suite | V3 | Supports federal contractor compliance, evidence readiness, and authorization workflows |

## Product Behavior

### Behavioral Principles

Block-1.0 must behave like a careful senior legal operations analyst, not like a chatbot trying to sound smart. It must be evidence-first, conservative on legal conclusions, clear about uncertainty, and strict about human approval for high-risk actions.

Core behavior rules:

- **Ground every material answer** in uploaded documents, approved playbooks, internal policies, or connected trusted sources.
- **Separate facts from recommendations** so users can see what the document says versus what the model suggests.
- **Never invent legal authority, clauses, citations, or regulatory obligations**. If evidence is missing, say so.
- **Use confidence levels** for extraction and classification, but do not imply certainty where legal judgment is required.
- **Require human approval** before sending redlines, approving contracts, filing reports, notifying counterparties, or changing compliance status.
- **Preserve privilege and confidentiality** by default through zero-training data policies, access controls, tenant isolation, and audit logging. Clio’s legal AI privacy guidance emphasizes that legal AI tools should protect client data through confidentiality, no model training on client data, enterprise security controls, SOC 2, role-based access control, and zero data retention where possible ([Clio](https://www.clio.com/resources/ai-for-lawyers/ai-data-privacy/)).

### Response Style

Block-1.0 should respond in a professional, concise, structured style.

Preferred output pattern:

1. Short conclusion.
2. Risk rating.
3. Evidence from source document.
4. Recommended action.
5. Draft language or next step.
6. Human approval requirement if needed.

Example:

```text
Conclusion: The limitation of liability clause is high risk because it excludes confidentiality and data protection breaches from liability caps.

Risk: High

Evidence: Section 12.2 caps all damages at fees paid in the prior 3 months and does not carve out confidentiality, IP infringement, data protection, or indemnity obligations.

Recommendation: Request carve-outs for confidentiality, data protection, IP infringement, fraud, and indemnity obligations.

Suggested redline: Notwithstanding the foregoing, the liability cap shall not apply to breaches of confidentiality, data protection obligations, intellectual property infringement, fraud, willful misconduct, or indemnification obligations.

Approval: Legal counsel should review before sending to counterparty.
```

### Block-1.0 Personality

Block-1.0 should be:

- **Precise**: Uses defined terms and references sections.
- **Conservative**: Escalates uncertainty instead of guessing.
- **Evidence-grounded**: Links each conclusion to document text.
- **Workflow-aware**: Knows whether the user wants review, redline, memo, approval, or reporting.
- **Non-authoritative on law unless grounded**: Says “based on the provided materials” unless connected to verified legal research.
- **Collaborative**: Gives options and trade-offs, not absolute answers when judgment is required.

## Block-1.0 Model Strategy

### What “Our Own Model” Means

Block-1.0 should be your own proprietary model layer. It can start from open-weight base models and become proprietary through:

- Domain fine-tuning on legal and compliance instructions.
- Retrieval over client-specific playbooks, contracts, policies, and evidence.
- Custom legal risk taxonomy.
- Proprietary evaluation benchmarks.
- Reinforcement and preference tuning from lawyer feedback.
- Agent orchestration and tool-use policies.
- Redline generation logic and approval workflows.
- Tenant-specific memory and firm-specific legal style.

This approach is realistic because open-source and proprietary models change quickly, while the durable value for a vertical AI company comes from workflow depth, domain data, evaluation quality, and customer-specific memory.

### Model Layers

| Layer | Name | Purpose |
|---|---|---|
| Foundation model | Block-Core | Base model used for reasoning, drafting, and tool calling |
| Legal adapter | Block-Legal Adapter | Fine-tuned LoRA or full fine-tune for contract and legal language |
| Compliance adapter | Block-Compliance Adapter | Fine-tuned adapter for controls, policies, audits, and regulatory mapping |
| Retrieval system | Block-RAG | Retrieves source clauses, playbooks, policies, and evidence |
| Agent runtime | Block-AgentOS | Routes tasks between specialized agents |
| Evaluation suite | Block-Eval | Measures correctness, hallucination, clause detection, and workflow quality |
| Guardrail layer | Block-Guard | Blocks unsafe output, missing citations, privilege risk, and unauthorized actions |

### Recommended Base Models

Use a multi-model strategy rather than betting on one model.

| Use case | Recommended model strategy |
|---|---|
| MVP reasoning and drafting | Use top commercial APIs with zero-retention enterprise settings while Block-1.0 is being built |
| Private deployment | Fine-tune Qwen, Llama, Mistral, or DeepSeek-family open-weight models depending on licensing and benchmark results |
| Contract extraction | Use smaller fine-tuned models for classification and extraction |
| Redline drafting | Use stronger reasoning model with strict playbook retrieval |
| Compliance evidence mapping | Use medium model plus deterministic rules |
| On-prem enterprise | Quantized open-weight model served through vLLM or TGI |

ContractEval found that proprietary models generally outperform open-source models in clause-level legal risk identification, while some open-source models can be competitive in specific categories, which supports using commercial models early and fine-tuning open models only after building strong domain evaluations ([ContractEval](https://arxiv.org/html/2508.03080v1)).

### Block-1.0 Development Stages

| Stage | Timeline | Model capability | Technical approach |
|---|---:|---|---|
| Block-0.1 | Month 1-3 | Prompted model with RAG | Commercial model API, strict retrieval, structured output |
| Block-0.3 | Month 3-6 | Domain behavior | Prompt library, playbook engine, tool-use agents, evals |
| Block-0.5 | Month 6-9 | Fine-tuned classifier/extractor | Fine-tune smaller open model for clause classification |
| Block-0.7 | Month 9-12 | Fine-tuned legal assistant | LoRA or QLoRA on legal instruction data |
| Block-1.0 | Month 12-18 | Proprietary legal-compliance model stack | Domain adapters, RAG, tools, evals, guardrails, router |
| Block-1.5 | Month 18-30 | Enterprise private model | Self-hosted inference, tenant-specific memory, continuous eval |
| Block-2.0 | Year 3+ | Vertical foundation model candidate | Larger training corpus, synthetic data, preference tuning, distillation |

### Training Data Strategy

Data must be sourced legally and ethically.

Allowed data:

- Public contract datasets such as CUAD for research and benchmarking.
- Public SEC agreements and exhibit filings.
- Public regulatory documents.
- Public compliance framework documentation where licensing permits.
- Customer documents only with explicit contractual permission and tenant isolation.
- Lawyer-reviewed synthetic contracts and playbooks.
- Internal annotations from design partners where rights are clearly granted.

Do not train the shared model on customer confidential data by default. Customer-specific learning should remain tenant-scoped unless the customer explicitly opts into anonymized model improvement.

### Model Output Schema

All important outputs should be structured JSON first, then rendered into UI.

```json
{
  "task_type": "contract_review",
  "document_id": "doc_123",
  "risk_summary": {
    "overall_risk": "high",
    "confidence": 0.82,
    "reason": "Liability cap lacks carve-outs for confidentiality and data protection."
  },
  "findings": [
    {
      "clause_type": "limitation_of_liability",
      "section": "12.2",
      "risk_level": "high",
      "source_quote": "Total liability shall not exceed fees paid in the prior three months.",
      "issue": "No carve-outs for confidentiality or data protection.",
      "recommended_action": "Request carve-outs.",
      "suggested_language": "The liability cap shall not apply to...",
      "requires_human_approval": true
    }
  ]
}
```

## Agent Architecture

### Agent Design Philosophy

Use workflows where the path must be deterministic, and use agents where the system must dynamically decide tools or next steps. LangGraph distinguishes workflows as predetermined code paths and agents as dynamic systems that define their own process and tool usage, while supporting persistence, streaming, debugging, and deployment for production systems ([LangChain](https://docs.langchain.com/oss/python/langgraph/workflows-agents)).

### Agent Types

| Agent | Role | Tools | Human approval |
|---|---|---|---|
| Intake Agent | Understands user request and routes workflow | User profile, matter DB, document parser | No |
| Document Parser Agent | Extracts sections, clauses, tables, definitions | OCR, parser, clause segmenter | No |
| Contract Review Agent | Finds legal and commercial risks | Playbook, clause library, contract DB | Yes for final conclusions |
| Redline Agent | Generates proposed edits | Word diff engine, fallback clause library | Yes before export/send |
| Legal Memo Agent | Creates risk memo and business summary | Findings, citations, templates | Yes before sharing |
| Compliance Mapping Agent | Maps obligations to policies and controls | Control library, evidence DB | Yes for compliance status changes |
| Evidence Collection Agent | Requests and organizes audit evidence | Integrations, tickets, file storage | Yes for external requests |
| Regulatory Monitor Agent | Tracks new regulations and impact | Regulatory sources, policy DB | Yes for policy changes |
| Research Agent | Performs legal research | Approved legal DBs, citation checker | Yes for legal advice |
| Negotiation Agent | Tracks counterparty positions | Version history, CRM, contract logs | Yes before counterparty communication |
| Admin Security Agent | Detects suspicious use and policy violations | Audit logs, SIEM, RBAC | Yes for enforcement actions |

### Agent Handoffs

OpenAI’s agent handoff pattern treats delegation between specialized agents as a tool call, where one agent can transfer the task to another specialized agent with context and input filters ([OpenAI Agents SDK](https://openai.github.io/openai-agents-python/handoffs/)). Block-AgentOS should use the same conceptual model.

Example workflow:

```text
User uploads MSA
→ Intake Agent identifies task as contract review
→ Document Parser Agent extracts clauses
→ Contract Review Agent compares clauses against playbook
→ Redline Agent drafts changes
→ Legal Memo Agent summarizes risks
→ Human reviewer approves
→ Export Agent generates Word redline and PDF memo
```

### Agent Memory

| Memory type | Scope | Example |
|---|---|---|
| Short-term memory | Current task | Current contract, uploaded exhibits, chat context |
| Matter memory | Specific legal matter | Negotiation history for one counterparty |
| Organization memory | Tenant-specific | Preferred clauses, risk tolerance, approved fallback language |
| Global model memory | Platform-level | General legal/compliance patterns from permitted data only |
| Audit memory | Immutable logs | Who approved what, when, and why |

### Tool Use

Use MCP-style tool exposure for internal and external tools. MCP allows servers to expose tools with names, metadata, descriptions, and JSON input schemas, enabling language models to discover and invoke tools for databases, APIs, computations, and external systems ([Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)).

Block tools should include:

- `parse_document`
- `extract_clauses`
- `search_playbook`
- `search_contract_repository`
- `generate_redline`
- `create_review_memo`
- `map_clause_to_control`
- `request_human_approval`
- `create_ticket`
- `sync_with_docusign`
- `sync_with_google_drive`
- `sync_with_sharepoint`
- `check_citation`
- `log_audit_event`

### Agent Guardrails

OWASP’s LLM security guidance identifies risks such as prompt injection, sensitive information disclosure, insecure output handling, excessive agency, system prompt leakage, and supply-chain vulnerabilities for LLM applications ([OWASP](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)). Block-1.0 must treat these as core product requirements.

Guardrails:

- Block prompt injection from contracts and external websites.
- Treat uploaded documents as untrusted input.
- Never execute tool calls directly from document text.
- Require explicit user confirmation for external communication.
- Sanitize outputs before rendering.
- Add policy checks before redlines, emails, filings, or compliance status changes.
- Log all tool calls with user, tenant, source, and reason.
- Mask secrets, keys, personal data, and privileged data where appropriate.
- Enforce least-privilege tool access by role.

## System Design

### High-Level Architecture

```text
Client Apps
  Web App, Word Add-in, Admin Console, API
        |
API Gateway and Auth
  SSO, RBAC, tenant routing, rate limits
        |
Application Services
  Matter Service, Document Service, Workflow Service, Playbook Service,
  Contract Service, Compliance Service, Billing Service, Audit Service
        |
AI Orchestration Layer
  Block-AgentOS, Model Router, RAG Service, Tool Gateway, Guardrail Service
        |
Model Layer
  Commercial LLM APIs, Block-1.0 fine-tuned models, embedding models,
  local inference via vLLM or TGI
        |
Data Layer
  Postgres, pgvector or Qdrant, object storage, Redis, event bus,
  warehouse, audit log store
        |
External Integrations
  Microsoft 365, Google Workspace, DocuSign, Slack, Teams, Salesforce,
  Jira, GitHub, Vanta, Drata, AWS, Azure, GCP
```

### Recommended Tech Stack

| Layer | Recommended choice | Reason |
|---|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, Radix UI, shadcn/ui | Fast, modern, composable enterprise UI |
| Word Add-in | Office.js, TypeScript | Native legal workflow integration |
| Backend API | NestJS or Fastify with TypeScript | Strong structure, team-friendly, scalable |
| AI services | Python FastAPI | Best ecosystem for ML, RAG, model serving, evals |
| Workflow engine | Temporal | Reliable long-running workflows and retries |
| Agent orchestration | LangGraph or custom graph runtime | Durable multi-step agents and human-in-loop workflows |
| Queue | NATS, Kafka, or Azure Service Bus | Event-driven document processing |
| Database | PostgreSQL | Reliable transactional system of record |
| Vector DB | pgvector for MVP, Qdrant for scale | Start simple, scale when retrieval grows |
| Cache | Redis | Sessions, rate limits, short-lived workflow state |
| Object storage | Azure Blob or S3 | Secure document storage |
| Search | OpenSearch or Typesense | Contract and clause search |
| Model serving | vLLM, TGI, Triton | Efficient open-weight model inference |
| Observability | OpenTelemetry, Grafana, Prometheus, Sentry | Logs, traces, metrics, errors |
| Infra | Azure AKS or AWS EKS | Enterprise deployment and compliance |
| IaC | Terraform | Reproducible infrastructure |
| CI/CD | GitHub Actions | Fits your GitHub workflow |
| Monorepo | Turborepo or Nx | Shared types, packages, and faster development |

### Repository Structure

```text
block-legal-ai/
  apps/
    web/
    word-addin/
    admin-console/
    docs-site/
  services/
    api-gateway/
    auth-service/
    matter-service/
    document-service/
    contract-service/
    playbook-service/
    compliance-service/
    workflow-service/
    audit-service/
    billing-service/
    notification-service/
  ai/
    agent-runtime/
    model-router/
    rag-service/
    eval-service/
    fine-tuning/
    prompt-registry/
    guardrails/
    datasets/
  packages/
    ui/
    types/
    config/
    auth/
    telemetry/
    policy-engine/
    document-schema/
  infra/
    terraform/
    helm/
    docker/
    k8s/
  tests/
    e2e/
    security/
    load/
    evals/
  docs/
    architecture/
    product/
    security/
    api/
    runbooks/
```

### Database Design

Core tables:

```text
tenants
users
roles
permissions
matters
documents
document_versions
clauses
contract_reviews
review_findings
redlines
playbooks
playbook_rules
fallback_clauses
approvals
compliance_frameworks
controls
control_evidence
regulatory_sources
regulatory_updates
agent_runs
tool_calls
model_outputs
audit_events
billing_accounts
subscriptions
usage_events
```

### Event Architecture

```text
document.uploaded
document.parsed
clauses.extracted
review.started
review.finding.created
redline.generated
approval.requested
approval.completed
memo.generated
control.mapped
evidence.requested
evidence.received
regulatory.update.detected
agent.run.completed
security.policy.violation
```

## UI/UX Design System

### Design Principles

The UI should feel like a serious legal operations command center, not a playful chatbot. Use calm surfaces, high readability, clear hierarchy, and minimal decoration. Every color should encode meaning: risk, status, workflow progress, or action priority.

Default visual direction:

- Background: warm neutral.
- Primary accent: deep teal.
- Risk colors: red for high risk, amber for medium risk, green for accepted/low risk.
- Typography: Satoshi or Inter for web, Calibri/Arial fallback for documents.
- Layout: dense but calm, with side panels, review tables, and document-linked evidence.

### Information Architecture

```text
Dashboard
Matters
Contracts
Review Workspace
Playbooks
Compliance
Regulatory Monitor
Knowledge Base
Agents
Approvals
Reports
Integrations
Admin
Billing
Settings
```

### Page-by-Page UI/UX Specification

| Page | Purpose | Key components | UX rules |
|---|---|---|---|
| Landing Page | Convert visitors | Hero, problem, ROI, workflow demo, security proof, CTA | Speak to GCs and compliance teams, not AI hobbyists |
| Signup and Onboarding | Create workspace | Company setup, role, use case, sample playbook | Get user to first contract review in under 10 minutes |
| Dashboard | Show workload and risk | Review queue, high-risk items, pending approvals, audit readiness | Prioritize actions, not charts |
| Matters | Organize work | Matter list, owner, counterparty, status, documents | Every contract belongs to a matter |
| Contracts | Repository | Search, filters, contract metadata, status, renewals | Fast search and clear ownership |
| Review Workspace | Main AI workbench | Document viewer, findings panel, redline panel, chat, citations | Source document always visible beside AI output |
| Playbooks | Configure legal rules | Clause categories, risk levels, fallback language, approvals | Non-technical legal teams must edit rules safely |
| Compliance | Map obligations | Frameworks, controls, evidence, gaps, owner, status | Treat compliance as workflow, not static checklist |
| Regulatory Monitor | Track changes | Updates feed, impact score, affected policies/contracts | Show why update matters before asking user to act |
| Knowledge Base | Manage internal memory | Templates, policies, prior decisions, approved clauses | Make AI memory visible and editable |
| Agents | Manage agents | Agent list, capabilities, permissions, run logs | Admins control what each agent can do |
| Approvals | Human-in-loop queue | Pending redlines, memos, external actions, risk decisions | One-click approve, reject, request changes |
| Reports | Export outputs | Risk reports, audit reports, contract summaries, board reports | Export to PDF, DOCX, CSV |
| Integrations | Connect tools | Microsoft, Google, DocuSign, Slack, Teams, CRM, cloud | Show permission scope clearly |
| Admin | Security and governance | Users, roles, logs, DPA, retention, model settings | Built for IT/security review |
| Billing | Subscription and usage | Seats, workflows, documents, invoices | Transparent usage and limits |

### Review Workspace Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Top bar: Matter, document, status, export, approve           │
├───────────────────────┬──────────────────────────────────────┤
│ Document viewer       │ AI findings panel                    │
│                       │ - Overall risk                       │
│ Highlighted clauses   │ - Clause findings                    │
│ Inline citations      │ - Recommended redlines               │
│ Version comparison    │ - Questions for user                 │
│                       │ - Approval controls                  │
├───────────────────────┴──────────────────────────────────────┤
│ Bottom panel: chat, activity log, tool traces, comments       │
└──────────────────────────────────────────────────────────────┘
```

### UX Rules for Legal AI

- Always show the source quote beside the AI finding.
- Never hide confidence or uncertainty.
- Redlines must be editable before export.
- Users must be able to see why an agent made a decision.
- Every AI action must have an undo path unless it was only a suggestion.
- High-risk actions require explicit approval.
- Admins must be able to disable agents, tools, and external integrations.

## Core User Flows

### Contract Review Flow

```text
Upload contract
→ Select playbook
→ AI parses document
→ AI extracts clauses
→ AI detects deviations
→ AI assigns risk scores
→ AI suggests redlines
→ Lawyer reviews findings
→ Lawyer approves or edits
→ Export redline and memo
→ Save final decision to memory
```

### Playbook Creation Flow

```text
Choose contract type
→ Import template or use default
→ Define key clauses
→ Set risk rules
→ Add fallback language
→ Define escalation rules
→ Test against sample contract
→ Publish playbook
```

### Compliance Evidence Flow

```text
Select framework
→ Import controls
→ Map policies and contracts
→ Connect systems
→ Agent requests evidence
→ Evidence owner uploads or syncs files
→ AI checks evidence sufficiency
→ Compliance manager approves
→ Audit report generated
```

### Regulatory Update Flow

```text
Monitor trusted sources
→ Detect regulatory change
→ Summarize change
→ Identify affected policies/contracts
→ Estimate impact
→ Recommend action
→ Human approves policy or playbook update
→ Tasks assigned to owners
```

## Security, Privacy, and Compliance

### Security Requirements

Legal AI products must be secure by design because legal work involves confidential client information, privileged material, sensitive commercial terms, personal data, and regulatory evidence. ISO/IEC 42001 defines an AI management system for establishing, implementing, maintaining, and improving responsible AI development and use, including traceability, transparency, reliability, and governance ([ISO](https://www.iso.org/standard/42001)).

P0 controls:

- Tenant isolation.
- Encryption at rest and in transit.
- RBAC and permission boundaries.
- SSO/SAML and MFA.
- Immutable audit logs.
- DPA and sub-processor list.
- No customer data used for model training by default.
- Configurable retention and deletion.
- Data residency options.
- Security questionnaire pack.
- SOC 2 readiness from month 1.

### LLM Security Controls

| Risk | Control |
|---|---|
| Prompt injection | Treat documents as data, never instructions |
| Sensitive data leakage | Mask secrets and restrict tool output |
| Excessive agency | Require approval for external actions |
| Insecure plugins/tools | Tool allowlists, schemas, audit logs |
| Hallucinated citations | Citation checker and source-grounded generation |
| Data poisoning | Separate customer memory from global training |
| Model theft | API auth, rate limits, monitoring |
| System prompt leakage | Never expose internal prompts or chain policies |

### Legal Privilege and Confidentiality

The product must clearly distinguish between consumer AI and protected legal AI. Clio’s AI privacy guidance highlights that legal professionals should avoid tools that retain client data or use it for model training, and should use legal-specific systems with confidentiality protections, zero data retention, encryption, SOC 2 Type 2, and RBAC where possible ([Clio](https://www.clio.com/resources/ai-for-lawyers/ai-data-privacy/)).

Required product policies:

- Customer data is not used to train Block-1.0 by default.
- Customer data is processed only for providing the service.
- Legal users can disable AI processing for sensitive matters.
- Admins can set retention windows by matter or document type.
- All generated legal outputs include human review status.
- External counsel and client access are permission-gated.

## Evaluation and Quality System

### Evaluation Philosophy

Block-1.0 should not be judged only by chatbot preference. It must be evaluated like a legal workflow system: extraction accuracy, risk detection, citation grounding, redline quality, missed-risk rate, false-positive rate, human acceptance, turnaround time, and auditability.

ContractEval shows that clause-level legal risk identification requires fine-grained evaluation across risk categories and that open-source models can lag proprietary models in correctness and output effectiveness, so Block-1.0 needs a strong internal benchmark before replacing commercial models for sensitive workflows ([ContractEval](https://arxiv.org/html/2508.03080v1)).

### Eval Categories

| Eval | Metric |
|---|---|
| Clause extraction | Precision, recall, F1 |
| Risk classification | Accuracy, false-negative rate, severity calibration |
| Redline quality | Lawyer acceptance rate, edit distance after review |
| Citation grounding | Percentage of claims with correct source quotes |
| Hallucination | Unsupported claim rate |
| Compliance mapping | Correct control mapping rate |
| Workflow success | Task completion without human rework |
| Safety | Blocked unsafe action rate |
| Latency | Time to first finding and full review time |
| Cost | Model cost per document and per workflow |

### Human Review Loop

Every reviewed output should become training signal:

```text
AI finding
→ Human accepts, edits, or rejects
→ Reason captured
→ Stored in tenant memory
→ Aggregated into evaluation dataset if permitted
→ Used for prompt, retrieval, model, or playbook improvement
```

## Development Roadmap

### Phase 0: Foundation

Timeline: Weeks 1-4

Build:

- Repo and monorepo setup.
- Auth, tenant, user, role model.
- Document upload and storage.
- Basic parser and OCR pipeline.
- Model router.
- Prompt registry.
- Audit log.
- UI shell and dashboard.

Exit criteria:

- User can upload a document.
- System can parse and store text.
- AI can summarize document with citations.
- Admin can view audit logs.

### Phase 1: MVP Contract Review

Timeline: Months 2-4

Build:

- Clause extraction.
- Contract review workspace.
- NDA and MSA playbooks.
- Risk scoring.
- Review memo generation.
- Word/PDF export.
- Human approval queue.

Exit criteria:

- 5 design partners can review real contracts.
- System detects top 20 contract risks.
- Review memo has source citations.
- Human reviewer can approve or edit findings.

### Phase 2: Redline and Playbook System

Timeline: Months 4-6

Build:

- Redline generation.
- Fallback clause library.
- Playbook builder.
- Version comparison.
- Matter memory.
- Basic Word add-in.

Exit criteria:

- Lawyers can edit playbooks without engineering.
- System exports usable redlines.
- Human acceptance rate reaches target baseline.

### Phase 3: Compliance Layer

Timeline: Months 6-12

Build:

- Compliance framework library.
- Controls and evidence mapping.
- Evidence request workflows.
- Integrations with Google Drive, Microsoft 365, Slack, Jira.
- Audit readiness report.

Exit criteria:

- Customers can map contract obligations to controls.
- Evidence workflows reduce manual audit preparation.
- Compliance manager can approve evidence status.

### Phase 4: Block-1.0 Model Release

Timeline: Months 12-18

Build:

- Fine-tuned clause classifier.
- Fine-tuned legal instruction adapter.
- Model router with eval-based selection.
- Tenant-specific retrieval memory.
- Block-Eval benchmark dashboard.
- Self-hosted inference for selected workflows.

Exit criteria:

- Block-1.0 beats baseline prompts on internal evals.
- Cost per review falls meaningfully.
- Sensitive workflows can run in private deployment mode.

### Phase 5: Enterprise and Regulated Expansion

Timeline: Months 18-36

Build:

- SSO/SAML.
- SCIM.
- Advanced RBAC.
- Data residency.
- SOC 2 Type II.
- ISO 27001 path.
- Regulatory monitor.
- Private cloud deployment.
- Advanced reporting.

Exit criteria:

- Enterprise security review pass rate improves.
- Product supports larger regulated customers.
- Expansion ARR from compliance modules grows.

## Team Structure

### First 6 Months

| Role | Count | Responsibility |
|---|---:|---|
| Founding CEO/Product | 1 | Customer discovery, product direction, sales |
| Founding CTO | 1 | Architecture, infra, engineering quality |
| Full-stack engineer | 1-2 | Web app, backend, integrations |
| AI engineer | 1 | RAG, prompts, evals, model routing |
| Legal advisor | Fractional | Contract review taxonomy and playbooks |
| Security advisor | Fractional | SOC 2, privacy, enterprise readiness |

### Year 1-2

| Role | Count | Responsibility |
|---|---:|---|
| Product design | 1 | UI/UX, workflows, usability |
| Backend engineers | 2-3 | Services, workflow engine, integrations |
| AI/ML engineers | 2-3 | Fine-tuning, evals, RAG, model serving |
| Legal domain experts | 2 | Playbooks, review quality, data labeling |
| DevOps/SRE | 1 | Cloud, observability, security |
| Customer success | 1-2 | Onboarding, adoption, feedback |
| Sales | 1-2 | Founder-led transition to repeatable sales |

## Best Resources

### Engineering and Agents

- LangGraph for graph-based workflows and multi-agent systems ([LangChain](https://docs.langchain.com/oss/python/langgraph/workflows-agents)).
- Model Context Protocol for standardized tool exposure to agents ([Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)).
- OpenAI Agents SDK concepts for handoffs, tracing, and guardrails ([OpenAI Agents SDK](https://openai.github.io/openai-agents-python/handoffs/)).
- OWASP Top 10 for LLM Applications for LLM security design ([OWASP](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)).

### AI Governance and Security

- NIST AI RMF Generative AI Profile for risk management lifecycle thinking ([NIST](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)).
- ISO/IEC 42001 for AI management systems ([ISO](https://www.iso.org/standard/42001)).
- Clio AI privacy guidance for legal confidentiality and privilege considerations ([Clio](https://www.clio.com/resources/ai-for-lawyers/ai-data-privacy/)).

### Legal AI Evaluation

- ContractEval for clause-level legal risk evaluation design ([ContractEval](https://arxiv.org/html/2508.03080v1)).
- CUAD for contract understanding research and benchmark construction.
- Internal lawyer-labeled evaluation sets for real product quality.

## Success Metrics

### Product Metrics

| Metric | Target |
|---|---:|
| Time to first contract review | Under 10 minutes |
| Contract review time reduction | 50%+ after onboarding |
| Human acceptance rate of findings | 70%+ MVP, 85%+ mature |
| Unsupported legal claim rate | Below 2% for grounded review |
| High-risk false-negative rate | Below 5% for supported clause types |
| Weekly active legal users | 60%+ of seats |
| Playbook adoption | 80%+ of reviews use a playbook |
| Expansion from contract to compliance module | 30%+ by year 2 |

### Business Metrics

| Metric | Target |
|---|---:|
| Gross margin | 70%+ by year 3 |
| Net revenue retention | 115%+ by year 3 |
| Logo retention | 90%+ |
| Sales cycle | Under 60 days for mid-market |
| CAC payback | Under 18 months |
| ARR per customer | USD 25k to USD 100k in early mid-market |

## 0-to-100 Build Checklist

### Product

- Define ICP and first contract type.
- Build design partner program.
- Create NDA and MSA playbooks.
- Build review workspace.
- Build approval queue.
- Build export workflows.
- Build compliance module after contract PMF.

### Model

- Start with commercial LLM plus RAG.
- Build eval dataset before fine-tuning.
- Fine-tune clause classifier.
- Fine-tune legal instruction adapter.
- Add model router.
- Add self-hosted inference.
- Release Block-1.0 only after it beats baseline evals.

### Agents

- Build deterministic review workflow first.
- Add specialized agents gradually.
- Add tool gateway.
- Add handoffs.
- Add human approval.
- Add agent observability.
- Add agent permission controls.

### UI/UX

- Build dashboard.
- Build document review workspace.
- Build playbook builder.
- Build matter page.
- Build contracts repository.
- Build compliance workspace.
- Build admin and audit console.
- Build integrations page.

### Security

- Implement tenant isolation.
- Implement RBAC.
- Implement audit logs.
- Implement encryption.
- Implement DPA and data retention controls.
- Start SOC 2 readiness early.
- Add SSO/SAML for enterprise.

### GTM

- Recruit legal advisors.
- Close design partners.
- Create ROI case studies.
- Build founder-led outbound.
- Attend legal and compliance events.
- Create partner channel with auditors and boutique law firms.

## Final Build Recommendation

The best version of this product is not “one AI chatbot for legal.” It is a secure legal and compliance workflow operating system powered by Block-1.0. The wedge should be contract review because it is frequent, document-grounded, measurable, and easier to validate than broad legal research. The moat should be playbooks, review history, customer-specific legal memory, compliance mappings, and audited workflow execution.

The highest-quality execution path is:

1. Build a contract review MVP.
2. Add playbooks and redlines.
3. Add human approval and audit trails.
4. Add compliance evidence automation.
5. Build Block-Eval.
6. Fine-tune Block-1.0 on permitted legal/compliance data.
7. Add private deployment and enterprise security.
8. Expand into regulatory monitoring and GovCon compliance.

Block-1.0 becomes “your own model” when the product owns the domain data, evaluation harness, routing logic, fine-tuned adapters, agent workflows, memory, and governance layer. That is the practical path from 0% to 100%.
