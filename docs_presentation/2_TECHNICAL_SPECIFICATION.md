# CodeProof — Technical Specification & Monorepo Architecture

**Document Type:** Technical System Specification  
**Monorepo Structure:** npm Workspaces (`packages/*`, `apps/*`)  
**Core Technologies:** Node.js, TypeScript 5.4, Fastify 4, Next.js 16, `@modelcontextprotocol/sdk`, Vitest, Playwright, Recharts  

---

## 1. Monorepo Package Hierarchy

```text
D:\IBM Hackathon
├── packages/
│   ├── core/           # Base domain types & Zod schemas (@codeproof/core)
│   ├── engine/         # Verification, Guardian, Git & Policy Engine (@codeproof/engine)
│   └── mcp/            # Stdio MCP Server Protocol Gateway (@codeproof/mcp)
├── apps/
│   ├── api/            # Fastify HTTP Control Plane API (codeproof-api)
│   ├── cli/            # Executable Command Line Interface (codeproof-cli)
│   └── web/            # Next.js Web Control Panel & Dashboard (web)
└── result/             # Verification Screenshots & Evidence Assets
```

---

## 2. Unidirectional Dependency Topology

CodeProof enforces strict loose coupling with zero circular dependencies:

```text
apps/web (Next.js) ──────────┐
apps/cli (CLI Tool) ─────────┼──► @codeproof/engine ──► @codeproof/core (Zod Schemas Root)
apps/api (Fastify API) ──────┤
packages/mcp (MCP Gateway) ──┘
```

- **Coupling Score**: **0.92 / 1.0 (LOOSE)**
- **Circular Dependencies**: **0**

---

## 3. Data Contract Schemas

### `TaskContext` (Schema)
```typescript
{
  taskId: string;
  repositoryId: string;
  developerIntent: string;
  targetFiles: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
}
```

### `EngineeringProof` (Schema)
```typescript
{
  proofId: string;
  taskId: string;
  repositoryId: string;
  stage: 'BEFORE_CODING' | 'DURING_CODING' | 'AFTER_CODING' | 'VERIFIED';
  summary: string;
  obligationsMet: Obligation[];
  verificationResults: VerificationResult[];
  producedAt: string;
}
```
