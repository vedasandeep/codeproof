# CodeProof — Technical Specification

**Document:** Technical Specification
**Product:** CodeProof
**Version:** 1.0
**Status:** Pre-Implementation
**Architecture Style:** Agentic Control Plane + Tool-Orchestration Platform
**Primary Integration:** MCP
**Initial Languages:** TypeScript / JavaScript, Python
**Primary Environment:** Git-based repositories and local development environments

---

# 1. Technical Objective

CodeProof is an **agentic AI engineering harness** that operates alongside AI coding agents.

It must provide three capabilities:

1. **Before coding**

   * understand repository context,
   * understand developer intent,
   * identify engineering obligations,
   * evaluate coding-agent plans.

2. **During coding**

   * observe engineering-significant actions,
   * evaluate decisions,
   * provide contextual interventions,
   * enforce configurable engineering policies.

3. **After coding**

   * execute deterministic verification,
   * analyze architecture/security/testing/change impact,
   * reason over collected evidence,
   * independently verify conclusions,
   * generate an engineering proof.

The system must remain independent of any single coding agent.

The core architecture must support:

```text
Claude Code
OpenCode
IBM Bob
Antigravity
Future Agents
        │
        ├── MCP
        ├── CLI
        ├── SDK
        ├── Hooks
        └── CI
                │
                ▼
          CodeProof Core
```

---

# 2. Core Technical Principles

## 2.1 Agent-Agnostic

The CodeProof core must not depend on:

* Claude,
* Gemini,
* GPT,
* IBM Bob,
* OpenCode,
* Antigravity,
* a particular IDE.

Model and agent integrations must exist behind adapters.

---

## 2.2 Deterministic First

Use deterministic tooling for factual claims.

Examples:

```text
Compiler
Test runner
AST parser
Git
Dependency graph
Static analyzer
Security scanner
Coverage tool
Package manager
```

LLMs should primarily handle:

* interpretation,
* planning,
* contextual reasoning,
* prioritization,
* explanation,
* trade-off analysis,
* orchestration.

---

## 2.3 Evidence First

Every significant conclusion should be traceable to evidence.

```text
Conclusion
    ↓
Evidence
    ↓
Source
    ↓
Verification
```

---

## 2.4 Risk Adaptive

The amount of analysis should depend on task risk.

A CSS change should not trigger the same pipeline as an authentication change.

---

## 2.5 Repository Aware

Generic engineering knowledge must be combined with repository-specific conventions.

```text
Global Engineering Knowledge
+
Repository Engineering Constitution
+
Repository Model
+
Task Context
```

---

## 2.6 Fail Closed for Critical Verification

For critical claims, missing verification must not be represented as success.

Example:

```text
Security:
UNAVAILABLE
```

not:

```text
Security:
PASS
```

---

# 3. High-Level System Architecture

```text
                           ┌───────────────┐
                           │   Developer   │
                           └───────┬───────┘
                                   │
                                   ▼
                         ┌──────────────────┐
                         │   Coding Agent   │
                         │ Claude / Bob /   │
                         │ OpenCode / etc.  │
                         └────────┬─────────┘
                                  │
                       MCP / Hooks / SDK / CLI
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────┐
│                    CODEPROOF CORE                         │
│                                                          │
│  ┌────────────────┐       ┌─────────────────────────┐   │
│  │ Integration    │──────►│ Lifecycle Orchestrator  │   │
│  │ Layer          │       └────────────┬────────────┘   │
│  └────────────────┘                    │                │
│                                        ▼                │
│                            ┌────────────────────────┐   │
│                            │ Engineering Intelligence│   │
│                            └───────────┬────────────┘   │
│                                        │                │
│             ┌──────────────────────────┼────────────┐   │
│             ▼                          ▼            ▼   │
│     Repository Model          Engineering      Task    │
│                               Knowledge        Context  │
│                                                          │
│             ┌──────────────────────────────────────┐    │
│             │ Verification / Evidence Engine       │    │
│             └───────────────────┬──────────────────┘    │
│                                 │                       │
│                                 ▼                       │
│                         Engineering Proof               │
└──────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
                 Git/Test     Scanners       LLMs
                                  │
                                  ▼
                              Evidence
                                  │
                                  ▼
                                UI
```

---

# 4. Major Components

CodeProof consists of the following logical components:

```text
1. Integration Gateway
2. Lifecycle Orchestrator
3. Repository Intelligence Engine
4. Engineering Knowledge Engine
5. Task Intelligence Engine
6. Engineering Guardian
7. Verification Engine
8. Evidence Engine
9. Proof Engine
10. Policy Engine
11. Agent/LLM Gateway
12. Persistence Layer
13. Event System
14. UI/API Layer
15. Security/Sandbox Layer
```

---

# 5. Recommended Technology Stack

The stack should optimize for:

* strong TypeScript ecosystem,
* agent/tool integration,
* AST tooling,
* MCP compatibility,
* API development,
* fast iteration,
* maintainability,
* Python interoperability for specialized analysis.

Recommended architecture:

```text
Frontend:
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui

Backend:
TypeScript
Node.js
Fastify

Agent / orchestration:
TypeScript
custom orchestration layer
MCP SDK

Database:
PostgreSQL

ORM:
Drizzle ORM

Queue:
Redis
BullMQ

Graph:
PostgreSQL + recursive queries initially
Neo4j only if graph complexity justifies it later

Vector / semantic retrieval:
PostgreSQL + pgvector

Object storage:
S3-compatible storage

Execution:
Docker
isolated worker containers

Repository:
Git CLI / libgit2-compatible tooling where appropriate

Testing:
Vitest
Playwright

Python:
Python 3.x for specialized analysis workers where required
```

The project should avoid introducing unnecessary infrastructure before the MVP requires it.

---

# 6. Monorepo Structure

Recommended repository structure:

```text
codeproof/
│
├── apps/
│   ├── web/
│   ├── api/
│   └── cli/
│
├── packages/
│   ├── core/
│   ├── mcp/
│   ├── sdk/
│   ├── engine/
│   ├── repository/
│   ├── knowledge/
│   ├── policy/
│   ├── evidence/
│   ├── verification/
│   ├── agents/
│   ├── git/
│   ├── security/
│   ├── architecture/
│   ├── testing/
│   └── shared/
│
├── workers/
│   ├── analysis-worker/
│   ├── verification-worker/
│   └── sandbox-worker/
│
├── knowledge/
│   ├── practices/
│   ├── patterns/
│   └── schemas/
│
├── infrastructure/
│
├── docs/
│
└── tests/
```

The exact package boundaries may change during implementation.

---

# 7. Integration Layer

The integration layer provides interfaces through which external coding agents communicate with CodeProof.

Initial interfaces:

```text
MCP
CLI
HTTP API
```

Future:

```text
SDK
Agent Hooks
Git Hooks
CI
GitHub App
IDE adapters
```

---

# 8. MCP Server

MCP should be the primary MVP integration mechanism.

The MCP server exposes CodeProof capabilities as tools/resources available to compatible coding agents.

Potential tools:

```text
codeproof.repository_context
codeproof.analyze_task
codeproof.evaluate_plan
codeproof.check_action
codeproof.inspect_change
codeproof.verify
codeproof.get_findings
codeproof.get_evidence
codeproof.generate_proof
```

The exact public MCP API should remain versioned.

---

# 9. MCP Session Model

A CodeProof session should associate:

```text
session_id
repository_id
workspace_id
agent_id
task_id
user_id
configuration
created_at
```

A session allows CodeProof to maintain lifecycle context.

Example:

```text
Session
 ↓
Task
 ↓
Plan
 ↓
Agent actions
 ↓
Changes
 ↓
Verification
 ↓
Proof
```

---

# 10. Agent Identity

CodeProof should identify the calling integration.

Conceptual:

```typescript
interface AgentIdentity {
  id: string;
  provider: string;
  version?: string;
  capabilities?: string[];
}
```

Example:

```text
provider = "claude-code"
provider = "opencode"
provider = "ibm-bob"
provider = "antigravity"
```

This should be metadata, not a hard dependency.

---

# 11. Repository Intelligence Engine

The repository intelligence engine constructs a structured model of the repository.

Responsibilities:

```text
Technology detection
Repository indexing
File classification
AST indexing
Dependency discovery
Architecture discovery
Test discovery
Configuration discovery
Git history
Documentation discovery
```

---

# 12. Repository Indexing Pipeline

```text
Repository
    ↓
File Discovery
    ↓
File Classification
    ↓
Language Detection
    ↓
AST Parsing
    ↓
Dependency Extraction
    ↓
Test Discovery
    ↓
Configuration Detection
    ↓
Architecture Inference
    ↓
Repository Model
```

---

# 13. File Classification

Files should be categorized into types such as:

```text
Source
Test
Configuration
Documentation
Generated
Dependency metadata
Infrastructure
Migration
Build
CI/CD
Assets
Unknown
```

Generated files should be excluded from certain analyses where appropriate.

---

# 14. Language Detection

Initial support:

```text
TypeScript
JavaScript
Python
```

Detection should use repository metadata and file analysis rather than extensions alone.

---

# 15. AST Analysis

The system should use AST-based analysis where possible.

For TypeScript/JavaScript:

```text
TypeScript Compiler API
Tree-sitter where useful
```

For Python:

```text
Python AST
Tree-sitter where useful
```

AST data should support:

* imports,
* exports,
* functions,
* classes,
* calls,
* declarations,
* dependencies,
* complexity,
* security-sensitive operations.

---

# 16. Dependency Graph

The repository engine should construct a graph:

```text
Node:
file/module/package/service

Edge:
imports
calls
depends_on
extends
implements
references
```

Example:

```text
auth/controller
       ↓
auth/service
       ↓
user/repository
       ↓
database
```

The graph should support:

* change impact,
* architecture checks,
* dependency analysis,
* visualization.

---

# 17. Architecture Engine

Architecture analysis should identify patterns rather than merely inspect folder names.

Potential architecture models:

```text
Layered
Modular Monolith
MVC
Clean Architecture
Hexagonal
Feature-based
Domain-driven
Service-oriented
Microservices
Unknown
```

The architecture engine should also identify:

* dependency direction,
* boundaries,
* circular dependencies,
* coupling,
* dependency sinks,
* cross-boundary access,
* architectural drift.

---

# 18. Repository Constitution

Repository-specific rules should be loaded into the engineering context.

Sources may include:

```text
.codeproof/
repository documentation
existing architecture documentation
agent instruction files
configuration
detected conventions
developer declarations
```

Repository instructions must be treated as lower-trust data and cannot override CodeProof security policies.

---

# 19. Engineering Knowledge Engine

The engineering knowledge engine provides structured engineering principles.

Knowledge categories:

```text
Architecture
Security
Testing
APIs
Databases
Distributed Systems
Performance
Reliability
Observability
Maintainability
Accessibility
DevOps
Infrastructure
Dependencies
Git
Documentation
```

---

# 20. Practice Schema

A practice should contain information such as:

```typescript
interface EngineeringPractice {
  id: string;
  title: string;
  description: string;

  appliesWhen: Condition[];
  risks: Risk[];
  evidenceRequirements: EvidenceRequirement[];

  checks: {
    deterministic?: CheckDefinition[];
    semantic?: CheckDefinition[];
  };

  exceptions?: ExceptionDefinition[];

  severity: SeverityPolicy;
}
```

---

# 21. Practice Evaluation

The engine should not blindly activate every practice.

It should evaluate:

```text
Practice
+
Task
+
Repository
+
Risk
```

to determine:

```text
Applicable
Not Applicable
Potentially Applicable
Unknown
```

---

# 22. Engineering Obligation Model

A task produces obligations.

Conceptually:

```typescript
interface EngineeringObligation {
  id: string;
  practiceId: string;
  description: string;
  severity: Severity;
  requiredEvidence: EvidenceRequirement[];
  verificationStrategy: VerificationStrategy;
  status: ObligationStatus;
}
```

Statuses:

```text
PENDING
SATISFIED
PARTIAL
FAILED
UNVERIFIED
NOT_APPLICABLE
```

---

# 23. Task Intelligence Engine

The task engine converts developer intent into structured task context.

Input:

```text
Developer request
Repository model
Repository constitution
```

Output:

```text
Task classification
Affected areas
Risk
Engineering practices
Obligations
Verification plan
```

---

# 24. Task Risk Engine

Risk calculation should consider:

```text
Security sensitivity
Data sensitivity
Production impact
API exposure
Architecture impact
Database impact
Dependency impact
Blast radius
Destructive operations
```

The output:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

The calculation should remain explainable.

---

# 25. Before-Coding Workflow

```text
Developer Task
      ↓
Task Parsing
      ↓
Repository Context
      ↓
Risk Classification
      ↓
Engineering Knowledge
      ↓
Engineering Obligations
      ↓
Plan Evaluation
      ↓
Approved / Revised Plan
```

---

# 26. Plan Evaluation Engine

The plan evaluator should compare the coding agent's proposed plan against engineering obligations.

Example:

```text
Plan:
Add frontend permission check.

Obligation:
Server-side authorization required.

Result:
FAILED PLAN

Reason:
Client-side checks do not enforce authorization.
```

The engine should produce actionable corrections.

---

# 27. During-Coding Event Model

CodeProof should consume lifecycle events.

Example:

```typescript
interface AgentEvent {
  id: string;
  sessionId: string;
  timestamp: string;

  type:
    | "plan_created"
    | "file_read"
    | "file_created"
    | "file_modified"
    | "file_deleted"
    | "command_executed"
    | "dependency_added"
    | "test_created"
    | "test_deleted"
    | "migration_created";

  payload: unknown;
}
```

---

# 28. Event Filtering

Not every event should trigger deep analysis.

The event pipeline:

```text
Agent Event
    ↓
Event Classifier
    ↓
Engineering Significance
    ↓
Risk Evaluation
    ↓
Intervention Decision
```

---

# 29. Engineering Significance

An event becomes significant when it changes one or more of:

```text
Architecture
Security boundary
Data model
Public API
Dependencies
Behavior
Testing
Infrastructure
Configuration
Concurrency
State
```

---

# 30. Guardian Engine

The guardian is the during-coding reasoning layer.

Responsibilities:

```text
Observe event
Understand change
Compare against obligations
Check repository rules
Evaluate risk
Determine intervention
Generate evidence
```

---

# 31. Guardian Output

```typescript
interface GuardianDecision {
  action:
    | "IGNORE"
    | "INFO"
    | "ADVISE"
    | "WARN"
    | "BLOCK"
    | "REQUIRE_APPROVAL";

  reason: string;
  severity: Severity;
  confidence: number;

  evidence: EvidenceReference[];
  recommendation?: string;
}
```

---

# 32. Intervention Policy

The default policy:

```text
Low-risk / normal:
IGNORE or INFO

Potential issue:
ADVISE

Significant risk:
WARN

Critical violation:
BLOCK / REQUIRE_APPROVAL
```

Developers must be able to configure this behavior.

---

# 33. Action Policy Engine

Dangerous operations require contextual analysis.

Potential policy inputs:

```text
Command
Target
Repository state
Environment
Task risk
User policy
```

Example:

```text
Operation:
database reset

Classification:
DESTRUCTIVE

Result:
REQUIRE_APPROVAL
```

---

# 34. Verification Engine

The verification engine orchestrates deterministic and semantic checks.

Pipeline:

```text
Changed Repository
       ↓
Verification Planner
       ↓
Tool Selection
       ↓
Parallel Verification
       ↓
Evidence Collection
       ↓
AI Interpretation
       ↓
Independent Verification
       ↓
Final Result
```

---

# 35. Verification Tool Registry

Tools should be registered through a common abstraction.

Conceptually:

```typescript
interface VerificationTool {
  id: string;
  name: string;

  capabilities: Capability[];

  supports(context: VerificationContext): boolean;

  execute(
    context: VerificationContext
  ): Promise<ToolResult>;
}
```

This allows CodeProof to add new tools without changing the core engine.

---

# 36. Test Verification

Test verification should support:

```text
Test discovery
Test execution
Coverage
Changed-code coverage
Regression detection
Failure analysis
Test quality reasoning
```

The initial implementation should prioritize:

```text
existing test execution
changed behavior detection
missing test reasoning
```

---

# 37. Security Verification

Security verification may use:

```text
Secret scanning
Dependency vulnerability scanning
SAST
AST analysis
Configuration checks
AI-assisted semantic security analysis
```

Potential tools:

```text
Semgrep
OSV
Trivy
Gitleaks
language-specific analyzers
```

The final tool selection should be validated during implementation.

---

# 38. Dependency Verification

Analyze:

```text
New dependencies
Removed dependencies
Version changes
Known vulnerabilities
License metadata
Dependency age/maintenance
Transitive impact
Bundle/runtime implications where relevant
```

---

# 39. Architecture Verification

Architecture checks should include:

```text
Circular dependencies
Boundary violations
Layer violations
Dependency direction
Coupling
Dependency sinks
Unexpected cross-module dependencies
Architectural drift
```

---

# 40. Change Impact Analysis

The change impact engine should calculate:

```text
Changed files
Affected modules
Downstream dependents
Public APIs
Tests
Security-sensitive components
Data flows
```

Potential output:

```text
3 modules directly changed
7 modules indirectly affected
2 public APIs impacted
1 security boundary affected
```

---

# 41. Git Integration

Git should provide:

```text
Current branch
Base branch
Commit history
Diff
Changed files
Authors
Blame information where appropriate
Historical change frequency
```

Git history should be treated as contextual evidence, not as proof of code quality by itself.

---

# 42. Evidence Engine

The evidence engine normalizes results from all sources.

Evidence sources:

```text
AST
Git
Compiler
Tests
Coverage
Security scanners
Dependency scanners
Architecture graph
Runtime execution
AI reasoning
Repository documentation
```

---

# 43. Evidence Schema

Conceptual:

```typescript
interface Evidence {
  id: string;

  type:
    | "source"
    | "diff"
    | "test"
    | "coverage"
    | "static_analysis"
    | "security"
    | "dependency"
    | "architecture"
    | "git"
    | "runtime"
    | "reasoning";

  source: string;

  location?: {
    file?: string;
    startLine?: number;
    endLine?: number;
  };

  data: unknown;

  timestamp: string;
}
```

---

# 44. Evidence Provenance

Every evidence item should maintain provenance.

Example:

```text
Finding
 ↓
Evidence ID
 ↓
Tool
 ↓
Execution
 ↓
Repository state
 ↓
Input
```

This enables reproducibility.

---

# 45. Finding Engine

Findings should be generated from:

```text
Engineering obligation
+
Observed implementation
+
Evidence
```

Not simply from an LLM prompt.

---

# 46. Finding Schema

```typescript
interface Finding {
  id: string;

  title: string;
  description: string;

  severity: Severity;
  confidence: number;

  category:
    | "security"
    | "architecture"
    | "testing"
    | "maintainability"
    | "reliability"
    | "performance"
    | "dependency"
    | "change-risk";

  affectedResources: ResourceReference[];

  evidence: EvidenceReference[];

  recommendation?: string;

  verificationStatus: VerificationStatus;
}
```

---

# 47. Confidence

Confidence should represent confidence in the finding, not confidence in the language model.

A finding backed by:

```text
deterministic scanner
+
reproducible test
+
source evidence
```

should have higher confidence than a purely semantic inference.

---

# 48. Verification Status

Supported states:

```text
VERIFIED
PROBABLE
UNCERTAIN
REJECTED
UNAVAILABLE
```

---

# 49. Skeptic Engine

The skeptic should attempt to falsify high-impact findings.

Input:

```text
Finding
Evidence
Repository Context
```

Questions:

```text
Could this be intentional?

Is there another execution path?

Does repository history explain this?

Does an existing abstraction already solve this?

Can the finding be reproduced?

Is the evidence sufficient?
```

---

# 50. Proof Engine

The proof engine transforms:

```text
Task
+
Obligations
+
Implementation
+
Evidence
+
Verification
```

into a structured engineering proof.

---

# 51. Proof Schema

Conceptually:

```typescript
interface EngineeringProof {
  id: string;

  task: TaskSummary;

  obligations: ObligationResult[];

  changes: ChangeSummary[];

  verification: VerificationSummary[];

  findings: FindingSummary[];

  unresolvedRisks: Risk[];

  confidence: ConfidenceLevel;

  generatedAt: string;
}
```

---

# 52. Proof Integrity

A proof must be invalidated or marked stale if its underlying repository state changes.

Example:

```text
Commit A
 ↓
Proof generated
 ↓
Commit B changes authentication
 ↓
Previous proof = STALE
```

---

# 53. Repository State Fingerprint

Every analysis should record a repository state fingerprint.

Potential components:

```text
Git commit SHA
Working tree hash
Configuration version
CodeProof version
Tool versions
Knowledge version
Model version
```

This makes analysis reproducible.

---

# 54. LLM Gateway

All model calls should go through an abstraction layer.

Conceptually:

```typescript
interface ModelProvider {
  generate(request: ModelRequest): Promise<ModelResponse>;
}
```

Providers may include:

```text
OpenAI-compatible
Anthropic
Google
IBM-compatible providers
Local models
Future providers
```

CodeProof should not make the core dependent on one provider.

---

# 55. Model Selection

Different tasks may require different model characteristics.

Examples:

```text
Repository summarization:
fast/cheap model

Architecture reasoning:
strong reasoning model

Security reasoning:
strong reasoning model

Finding explanation:
fast model

Verification challenge:
strong independent model
```

Model routing should be configurable.

---

# 56. Avoiding Model Correlation

For high-value verification, CodeProof should ideally avoid blindly using the same reasoning path twice.

Possible future strategy:

```text
Primary analysis model
        ↓
Independent verifier
        ↓
Deterministic evidence
```

The exact multi-model strategy should be evaluated experimentally.

---

# 57. Context Management

The system must avoid sending entire repositories to an LLM.

Context should be assembled from:

```text
Task
Relevant files
Relevant dependency graph
Relevant history
Applicable engineering practices
Relevant evidence
```

This reduces:

* token cost,
* latency,
* noise,
* prompt injection surface.

---

# 58. Context Retrieval

Repository retrieval should support:

```text
symbol search
AST search
dependency traversal
semantic search
Git history
file relevance
task relevance
```

The retrieval engine should prioritize structurally relevant code before semantic similarity alone.

---

# 59. Vector Search

Vector search may be implemented using:

```text
PostgreSQL
pgvector
```

It should not be the sole repository retrieval mechanism.

Structural retrieval should take priority for code.

---

# 60. Event Architecture

CodeProof should use an internal event model.

Potential events:

```text
RepositoryIndexed
TaskCreated
PlanSubmitted
PlanEvaluated
AgentActionObserved
InterventionIssued
VerificationStarted
VerificationCompleted
FindingCreated
FindingRejected
ProofGenerated
ProofInvalidated
```

---

# 61. Queue Architecture

Long-running operations should execute asynchronously.

Recommended:

```text
Redis
+
BullMQ
```

Example:

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Sandbox
 ↓
Evidence
 ↓
Database
```

---

# 62. Worker Types

Initial workers:

```text
Repository Worker
Verification Worker
Security Worker
Architecture Worker
AI Reasoning Worker
Proof Worker
```

Workers should remain independently scalable.

---

# 63. Sandbox Architecture

Untrusted repository operations should execute inside isolated containers.

Conceptual:

```text
CodeProof API
      ↓
Sandbox Manager
      ↓
Ephemeral Container
      ↓
Repository
      ↓
Tool execution
      ↓
Sanitized result
      ↓
Evidence store
```

---

# 64. Sandbox Restrictions

Each execution should have:

```text
CPU limit
Memory limit
Timeout
Filesystem boundary
Process limit
Network policy
Credential policy
```

---

# 65. Network Policy

Default analysis should minimize outbound network access.

Network access should only be granted when explicitly required.

Examples:

```text
Package installation
Dependency metadata
External API tests
```

Such operations should be isolated and auditable.

---

# 66. Database Architecture

Recommended:

```text
PostgreSQL
```

Primary entities:

```text
users
workspaces
repositories
sessions
tasks
plans
agent_events
obligations
findings
evidence
verification_runs
proofs
policies
knowledge_versions
decisions
```

---

# 67. Example Relational Model

```text
users
  │
  └── workspaces
          │
          └── repositories
                  │
                  ├── sessions
                  │       └── tasks
                  │
                  ├── architecture_snapshots
                  │
                  └── repository_decisions

tasks
  │
  ├── obligations
  ├── agent_events
  ├── findings
  ├── verification_runs
  └── proofs

findings
  │
  └── evidence
```

---

# 68. Persistence Strategy

Persistent data:

```text
Task metadata
Findings
Evidence metadata
Proofs
Repository metadata
Policies
Engineering decisions
User configuration
```

Ephemeral data:

```text
temporary clones
build artifacts
container state
temporary logs
```

Large artifacts should use object storage rather than PostgreSQL blobs.

---

# 69. Object Storage

Use S3-compatible storage for:

```text
Large logs
Test artifacts
Coverage reports
Build artifacts
Proof bundles
Analysis snapshots
```

---

# 70. API Layer

The API should expose CodeProof functionality independently of the UI.

Potential API domains:

```text
/repositories
/sessions
/tasks
/plans
/events
/findings
/evidence
/verification
/proofs
/policies
```

The API should be versioned.

---

# 71. Authentication

The initial web application may use:

```text
OAuth
```

with GitHub as the primary repository integration.

Authentication architecture should keep identity separate from repository authorization.

---

# 72. Repository Access

CodeProof should support authenticated access to repositories through scoped credentials.

Credentials should:

* be encrypted at rest,
* never appear in LLM context,
* never be included in evidence unnecessarily,
* have minimal permissions.

---

# 73. GitHub Integration

Initial GitHub capabilities may include:

```text
Repository selection
Clone/fetch
Branch information
Pull request diff
Commit metadata
PR status
Proof attachment/report
```

A full GitHub App can be implemented after the core lifecycle works.

---

# 74. CLI Architecture

The CLI should communicate with the CodeProof core through local or HTTP interfaces.

Potential modes:

```text
Local mode
Remote mode
CI mode
```

Example:

```text
codeproof analyze
codeproof verify
codeproof prove
```

---

# 75. Local Development Mode

For developer workflows, CodeProof should eventually be able to operate locally.

Conceptual:

```text
Developer machine
    │
    ├── coding agent
    ├── CodeProof CLI
    └── repository
```

This minimizes data transfer for sensitive repositories.

---

# 76. Cloud Mode

For teams:

```text
Developer
   ↓
Agent
   ↓
CodeProof API
   ↓
Cloud workers
   ↓
Evidence store
```

Cloud mode enables:

* centralized policy,
* history,
* collaboration,
* shared repositories,
* team dashboards.

---

# 77. UI Architecture

Recommended:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
```

Primary screens:

```text
Dashboard
Repository
Task
Live Session
Findings
Evidence
Verification
Proof
Policies
Engineering Constitution
```

---

# 78. Live Session UI

The UI should stream events.

Example:

```text
Agent
→ created authentication service

CodeProof
→ authentication risk detected

CodeProof
→ activated security obligations

Agent
→ added token validation

Verification
→ running security checks
```

WebSocket or Server-Sent Events may be used.

---

# 79. UI Data Model

The UI should consume structured domain objects rather than raw worker logs.

Example:

```text
Task
 ├── Stage
 ├── Risk
 ├── Obligations
 ├── Events
 ├── Findings
 ├── Verification
 └── Proof
```

---

# 80. Observability

CodeProof should instrument:

```text
API latency
Agent events
Queue latency
Worker duration
LLM latency
LLM token usage
Verification duration
Tool failures
Sandbox failures
Finding rates
False-positive feedback
```

Recommended tools:

```text
OpenTelemetry
Prometheus-compatible metrics
structured logging
```

---

# 81. Logging

Use structured logs.

Example fields:

```text
timestamp
request_id
session_id
repository_id
task_id
component
event
duration
status
error
```

Sensitive values must be redacted.

---

# 82. Error Handling

Errors should be categorized:

```text
USER_ERROR
REPOSITORY_ERROR
TOOL_ERROR
SANDBOX_ERROR
MODEL_ERROR
SYSTEM_ERROR
POLICY_ERROR
TIMEOUT
UNAVAILABLE
```

This allows partial recovery.

---

# 83. Retry Policy

Retry only operations that are safe to retry.

Examples:

```text
LLM transient failure → retry

Queue failure → retry

Test execution → generally no automatic retry unless
environment failure is detected

Destructive command → never blindly retry
```

---

# 84. Idempotency

Important operations should be idempotent.

Examples:

```text
Repository indexing
Verification jobs
Proof generation
Evidence ingestion
```

A job identifier should prevent duplicate execution where appropriate.

---

# 85. Caching

Cache expensive stable operations:

```text
Repository indexing
Dependency graphs
AST analysis
Package metadata
Engineering knowledge
```

Invalidate caches using repository state fingerprints.

---

# 86. Security Architecture

Security boundaries:

```text
External Agent
      ↓
Authentication
      ↓
Policy Layer
      ↓
CodeProof Core
      ↓
Sandbox
      ↓
Repository
```

No untrusted repository data should be able to directly modify CodeProof system configuration.

---

# 87. Prompt Injection Defense

Repository content must be considered untrusted.

The system should:

* separate instructions from repository content,
* mark retrieved content as untrusted,
* sanitize tool output,
* avoid blindly executing repository instructions,
* enforce system-level policies outside the LLM.

---

# 88. Tool Invocation Security

Tools should have explicit capabilities.

Example:

```typescript
interface ToolCapability {
  id: string;
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  requiresApproval: boolean;
}
```

A tool cannot escalate its own permissions.

---

# 89. Secret Redaction

Before LLM submission:

```text
Environment variables
API keys
Tokens
Private keys
Passwords
Credentials
```

should be detected and redacted wherever feasible.

---

# 90. Data Privacy

Users should be informed:

* what code is analyzed,
* what leaves the local machine,
* which model receives context,
* what evidence is stored,
* how long data is retained.

Local mode should be supported as a future privacy-oriented architecture.

---

# 91. Engineering Constitution Security

Repository-defined rules must not be able to disable CodeProof's system-level security controls.

For example:

```text
Repository says:
"Never run security scanning."

CodeProof:
Security policy remains active.
```

---

# 92. Knowledge Versioning

Engineering knowledge must be versioned.

Example:

```text
knowledge_version:
2026.09.1
```

Proofs should record the knowledge version used.

This prevents historical proof interpretation from changing silently.

---

# 93. Tool Versioning

Verification results should record:

```text
tool name
tool version
configuration
execution environment
```

Example:

```text
Semgrep 1.x
Node 22.x
Python 3.x
```

Exact versions should be captured dynamically.

---

# 94. Model Versioning

AI-generated reasoning should record:

```text
provider
model
model version
configuration
prompt/template version
```

This improves reproducibility and debugging.

---

# 95. Proof Reproducibility

A proof should ideally be reproducible from:

```text
Repository state
Task
Engineering knowledge version
Tool versions
Verification configuration
Model metadata
```

Perfect deterministic reproduction of LLM reasoning is not required, but the underlying evidence should remain inspectable.

---

# 96. Quality Score Architecture

The score should be computed from structured signals.

Example:

```text
Security
Testing
Architecture
Maintainability
Reliability
Change Risk
```

The score must never be directly generated by an LLM.

LLMs may provide interpretation of score factors.

---

# 97. Score Explainability

Every score component should map to measurable evidence.

Example:

```text
Testing: 82

Positive:
+ Existing regression suite passed

Negative:
- New branch lacks regression test
- Coverage decreased

Evidence:
test-run-193
coverage-193
```

---

# 98. Developer Feedback Loop

Users should be able to mark findings:

```text
Useful
Incorrect
Not Applicable
Intentional
Already Resolved
```

Feedback should become engineering decision data.

---

# 99. Decision Memory

Important developer decisions should be persisted.

This allows:

```text
Past decision
 ↓
Future repository analysis
 ↓
Context-aware recommendation
```

The system should not repeatedly flag explicitly accepted architectural exceptions.

---

# 100. Testing Strategy

Testing must exist at multiple levels.

```text
Unit
Integration
Contract
End-to-end
Tool adapter
Agent lifecycle
Security
Sandbox
Evaluation benchmark
```

---

# 101. Unit Testing

Use:

```text
Vitest
```

for:

* policy evaluation,
* risk calculation,
* practice evaluation,
* finding generation,
* evidence normalization,
* proof generation,
* event classification.

---

# 102. Integration Testing

Test:

```text
Repository → Indexer
Indexer → Repository Model
Repository Model → Task Engine
Task Engine → Guardian
Guardian → Verification
Verification → Evidence
Evidence → Proof
```

---

# 103. End-to-End Testing

Use:

```text
Playwright
```

for UI workflows such as:

```text
Create repository
Start task
View plan
Observe intervention
Run verification
Inspect evidence
View proof
```

---

# 104. Sandbox Testing

Security-critical sandbox behavior must have dedicated tests for:

* filesystem escape,
* network restriction,
* resource limits,
* process isolation,
* credential exposure.

---

# 105. Agent Simulation Testing

CodeProof should have simulated coding agents.

Example:

```text
MockAgent
 ↓
Plan
 ↓
File modifications
 ↓
Commands
 ↓
Tests
```

This allows lifecycle testing without depending on an external AI agent.

---

# 106. Benchmark Repositories

Maintain a benchmark collection containing known engineering problems.

Categories:

```text
Security
Architecture
Testing
Reliability
API
Database
Dependencies
Performance
Maintainability
```

Each benchmark should have expected findings and evidence.

---

# 107. Evaluation Metrics

Measure:

```text
Precision
Recall
False positives
False negatives
Verification accuracy
Evidence coverage
Intervention usefulness
Task completion rate
Latency
Token usage
Cost
```

---

# 108. Performance Targets

Initial engineering targets should be established experimentally.

The system should aim for:

### Fast interaction

Plan evaluation should feel interactive.

### Asynchronous deep analysis

Heavy verification should run asynchronously.

### Incremental analysis

Only changed/relevant areas should be reanalyzed where possible.

### Cached repository intelligence

Avoid rebuilding the entire repository for every event.

---

# 109. Incremental Analysis

After an initial repository index:

```text
Change
 ↓
Changed symbols
 ↓
Affected graph nodes
 ↓
Affected tests
 ↓
Affected obligations
 ↓
Targeted verification
```

Full repository analysis should be reserved for cases where required.

---

# 110. Change Impact Algorithm

At a conceptual level:

```text
Changed file
      ↓
Changed symbols
      ↓
Direct dependents
      ↓
Transitive dependents
      ↓
Public interfaces
      ↓
Relevant tests
      ↓
Risk score
```

---

# 111. Architecture Snapshotting

CodeProof should maintain architecture snapshots.

```text
Commit A
 ↓
Architecture Snapshot A

Commit B
 ↓
Architecture Snapshot B
```

The difference can reveal:

```text
New dependency
Removed boundary
Increased coupling
New cycle
```

---

# 112. Dependency Graph Storage

For MVP, a graph does not necessarily require a graph database.

Recommended initial approach:

```text
PostgreSQL relational graph representation
```

Move to Neo4j or another graph database only if actual query complexity requires it.

This prevents premature infrastructure.

---

# 113. Agent Memory

CodeProof should distinguish:

```text
Task memory
Repository memory
Engineering decision memory
Global knowledge
```

These should not be merged into one undifferentiated vector database.

---

# 114. Prompt Construction

Prompts should be assembled from structured context.

Example:

```text
System Policy
+
Agent Role
+
Task
+
Repository Context
+
Applicable Practices
+
Evidence
+
Developer Decisions
```

Repository text should be clearly marked as untrusted context.

---

# 115. Agent Communication

Internal agents should communicate using structured objects rather than free-form conversations wherever possible.

Example:

```typescript
interface AnalysisResult {
  status: "success" | "partial" | "failed";
  findings: Finding[];
  evidence: Evidence[];
  recommendations: Recommendation[];
}
```

This makes the system observable and testable.

---

# 116. Avoiding Agent Swarm Complexity

CodeProof should not create many autonomous agents simply for architectural appearance.

Agent roles should be introduced only when they provide measurable value.

Initial roles:

```text
Context Engineer
Engineering Planner
Guardian
Verification Engineer
Skeptic
```

---

# 117. Agent Orchestration

The orchestrator should control:

```text
Which agent runs
When it runs
What context it receives
What tools it can use
What evidence it can access
What output schema it must produce
```

Agents must not freely invoke arbitrary system capabilities.

---

# 118. Tool Permission Model

Each agent role should have allowed capabilities.

Example:

```text
Planner:
read repository
read knowledge
no file modification

Guardian:
read repository
inspect changes
limited verification

Verifier:
run tests
run scanners
read repository

Proof:
read evidence
no repository modification
```

---

# 119. Autonomous Modification

The MVP should not allow CodeProof itself to silently modify user code.

Future autonomous repair may use:

```text
temporary branch
isolated workspace
verification
human approval
```

---

# 120. Autonomous Repair — Future Architecture

```text
Finding
 ↓
Repair Planner
 ↓
Temporary Branch
 ↓
Agent Modification
 ↓
Verification
 ↓
Skeptic
 ↓
Proof
 ↓
Human Approval
```

---

# 121. Configuration

Repository configuration should eventually support:

```text
.codeproof/
    config.yaml
    constitution.yaml
    policies/
```

Potential configuration:

```yaml
strictness: balanced

security:
  enabled: true

architecture:
  enabled: true

testing:
  require_changed_behavior_tests: true

actions:
  destructive_commands: approval
```

Exact schema is implementation-defined.

---

# 122. Configuration Hierarchy

Potential precedence:

```text
System Security Policy
        ↓
Organization Policy
        ↓
Repository Policy
        ↓
Task Policy
        ↓
User Preferences
```

Lower-level configuration must never override higher-level security constraints.

---

# 123. API/Protocol Versioning

All externally consumed interfaces should be versioned.

Examples:

```text
MCP protocol surface
REST API
SDK
Proof schema
Evidence schema
```

Breaking changes require explicit version changes.

---

# 124. Initial Deployment Architecture

For development:

```text
Docker Compose

Next.js
API
Worker
PostgreSQL
Redis
Object Storage
```

Potential production architecture:

```text
Load Balancer
      ↓
API instances
      ↓
Queue
      ↓
Worker pool
      ↓
Sandbox pool

PostgreSQL
Redis
Object Storage
```

---

# 125. MVP Infrastructure

Avoid Kubernetes initially unless deployment requirements demand it.

Recommended MVP:

```text
Docker
PostgreSQL
Redis
S3-compatible storage
Single API service
Worker service
Web application
```

This is enough to validate the product.

---

# 126. Local Development Stack

Recommended:

```text
Node.js
pnpm
Docker Compose
PostgreSQL
Redis
MinIO
```

The exact package manager may be finalized during repository setup.

---

# 127. Environment Separation

Environments:

```text
development
test
staging
production
```

Secrets must be injected through environment/configuration mechanisms and never committed to Git.

---

# 128. CI/CD

CI should run:

```text
Type checking
Linting
Unit tests
Integration tests
E2E tests
Security checks
Build
```

CodeProof itself should eventually dogfood CodeProof.

---

# 129. CodeProof Dogfooding

The CodeProof repository should be analyzed by CodeProof.

This should become a development principle:

> **CodeProof must use CodeProof.**

This provides a continuous internal benchmark.

---

# 130. Documentation Requirements

The repository should include:

```text
README.md
ARCHITECTURE.md
CONTRIBUTING.md
SECURITY.md
docs/
```

Integration documentation should include:

```text
MCP setup
CLI setup
Repository configuration
Engineering Constitution
Troubleshooting
```

---

# 131. Initial API Contract

The first MCP/HTTP lifecycle should support:

```text
Initialize repository
Create session
Analyze task
Evaluate plan
Report agent action
Run verification
Retrieve findings
Retrieve evidence
Generate proof
```

This is the minimum lifecycle contract.

---

# 132. Example Lifecycle

```text
1. Agent connects

2. CodeProof identifies repository

3. Repository model loaded

4. Agent submits task

5. CodeProof returns:
   - task risk
   - engineering obligations
   - relevant context

6. Agent submits plan

7. CodeProof evaluates plan

8. Agent implements

9. Agent/tool events reach CodeProof

10. Guardian evaluates significant decisions

11. Implementation completes

12. Verification pipeline runs

13. Evidence collected

14. Skeptic challenges important findings

15. Proof generated

16. Agent receives result

17. UI displays lifecycle
```

---

# 133. Example MCP Interaction

Conceptual:

```text
Agent:
codeproof.analyze_task(
  task="Add organization-level RBAC"
)

CodeProof:
risk=HIGH

obligations:
- server-side authorization
- tenant isolation
- unauthorized access tests
- database consistency

---

Agent:
codeproof.evaluate_plan(...)

CodeProof:
status=REVISE

reason:
authorization currently enforced only in frontend
```

---

# 134. Example Guardian Interaction

```text
Agent:
create src/utils/auth.ts

CodeProof:
severity=WARNING

reason:
authentication logic bypasses existing identity boundary

recommendation:
use identity/application authorization service
```

---

# 135. Example Verification Result

```text
Verification:

Tests:
PASS

Type checking:
PASS

Security:
PASS

Architecture:
PASS

Dependency:
PASS

Test coverage:
PARTIAL

Unresolved:
cross-tenant negative case not covered
```

---

# 136. Example Proof

```json
{
  "status": "partial",
  "confidence": "high",
  "obligationsSatisfied": 14,
  "obligationsPartial": 1,
  "criticalFailures": 0,
  "unresolvedRisks": [
    "Missing cross-tenant negative test"
  ]
}
```

The actual schema should evolve during implementation.

---

# 137. MVP Technology Boundaries

The MVP should support:

```text
TypeScript / JavaScript
Python

Git repositories

MCP

Local execution

PostgreSQL

Redis

Docker

Web UI
```

Avoid broad platform support until the core lifecycle is proven.

---

# 138. MVP Implementation Phases

## Phase 1 — Core Domain

Build:

```text
Repository model
Task model
Obligation model
Finding model
Evidence model
Proof model
```

No UI complexity yet.

---

## Phase 2 — Repository Intelligence

Implement:

```text
Git
AST
dependency graph
test discovery
technology detection
architecture discovery
```

---

## Phase 3 — Engineering Knowledge

Implement initial practices for:

```text
Security
Testing
Architecture
API
Dependencies
Maintainability
```

---

## Phase 4 — MCP

Implement:

```text
repository_context
analyze_task
evaluate_plan
check_action
verify
generate_proof
```

---

## Phase 5 — Guardian

Implement:

```text
event ingestion
significance detection
risk evaluation
intervention engine
```

---

## Phase 6 — Verification

Integrate:

```text
test runner
type checker
static analysis
security scanner
dependency scanner
architecture analyzer
```

---

## Phase 7 — Proof

Implement:

```text
evidence normalization
verification state
skeptic
proof generation
```

---

## Phase 8 — UI

Implement:

```text
session view
findings
evidence
verification
proof
```

---

# 139. Recommended Initial Engineering Practices

The first knowledge set should prioritize high-value practices rather than trying to cover everything.

### Security

* authentication
* authorization
* input validation
* secrets
* injection
* unsafe dependencies
* cryptographic misuse

### Testing

* changed behavior coverage
* regression tests
* negative cases
* integration boundaries

### Architecture

* dependency direction
* circular dependencies
* boundary violations
* coupling

### API

* validation
* authorization
* error handling
* backwards compatibility
* idempotency where relevant

### Database

* migrations
* constraints
* transactions
* indexes
* consistency

### Reliability

* timeout
* retry
* failure handling
* resource lifecycle

---

# 140. What the MVP Must NOT Do

The implementation must avoid:

```text
Generic "AI code review"
AI authorship detection
Massive multi-agent swarm
Universal language support
Universal framework support
Autonomous production deployment
Automatic code rewriting without approval
Huge knowledge graph before validation
Kubernetes-first architecture
Complex graph database before needed
LLM-generated quality scores without evidence
```

---

# 141. Critical Technical Principle

The architecture must preserve this separation:

```text
┌──────────────────────────┐
│ AI Reasoning             │
│                          │
│ interpretation           │
│ planning                 │
│ contextual judgment      │
│ explanation              │
└─────────────┬────────────┘
              │
              ▼
┌──────────────────────────┐
│ Deterministic Evidence   │
│                          │
│ compiler                 │
│ tests                    │
│ scanners                 │
│ AST                      │
│ Git                      │
│ dependency graph         │
└─────────────┬────────────┘
              │
              ▼
┌──────────────────────────┐
│ Verification             │
│                          │
│ independent challenge    │
│ reproducibility          │
│ confidence               │
└─────────────┬────────────┘
              │
              ▼
        Engineering Proof
```

This separation is fundamental to CodeProof's credibility.

---

# 142. Final Technical Architecture

The final conceptual system is:

```text
                         CODING ECOSYSTEM
 ┌─────────────────────────────────────────────────────┐
 │ Claude Code │ OpenCode │ IBM Bob │ Antigravity │ ...│
 └────────────────────────┬────────────────────────────┘
                          │
                MCP / CLI / SDK / Hooks
                          │
                          ▼
                ┌────────────────────┐
                │ Integration Layer  │
                └─────────┬──────────┘
                          ▼
                ┌────────────────────┐
                │ Lifecycle Engine   │
                └─────────┬──────────┘
                          │
             ┌────────────┼─────────────┐
             ▼            ▼             ▼
        BEFORE          DURING         AFTER
             │            │             │
             ▼            ▼             ▼
        Task/Plan      Guardian     Verification
        Intelligence  Engine        Engine
             │            │             │
             └────────────┼─────────────┘
                          ▼
                ┌────────────────────┐
                │ Engineering Brain  │
                ├────────────────────┤
                │ Knowledge          │
                │ Repository Model   │
                │ Constitution      │
                │ Policies           │
                └─────────┬──────────┘
                          ▼
                ┌────────────────────┐
                │ Evidence Engine    │
                └─────────┬──────────┘
                          ▼
                ┌────────────────────┐
                │ Verification       │
                │ + Skeptic          │
                └─────────┬──────────┘
                          ▼
                ┌────────────────────┐
                │ Engineering Proof  │
                └─────────┬──────────┘
                          │
                 ┌────────┴─────────┐
                 ▼                  ▼
               Agent               UI
```

---

# 143. Final Technical Definition

CodeProof is technically defined as:

> **A model-agnostic, agent-integrated engineering control plane that combines repository intelligence, structured engineering knowledge, deterministic software-analysis tools, contextual AI reasoning, lifecycle-aware intervention, independent verification, and evidence-backed proof generation.**

Its fundamental runtime loop is:

```text
INTENT
  ↓
CONTEXT
  ↓
OBLIGATIONS
  ↓
PLAN
  ↓
GUARD
  ↓
IMPLEMENT
  ↓
VERIFY
  ↓
CHALLENGE
  ↓
PROVE
  ↓
LEARN
```

The architecture must preserve one central distinction:

> **The coding agent writes the software. CodeProof makes the software accountable to engineering evidence.**
