# CodeProof Integration — IBM Bob

**Target Assistant:** IBM Bob (IBM Agentic Coding Assistant)  
**Primary Integration Pattern:** Model Context Protocol (MCP) via Stdio Server  
**Support Level:** Full Interoperability  

---

## 1. Integration Architecture Overview

IBM Bob supports local and remote Model Context Protocol (MCP) servers. CodeProof connects to IBM Bob as a local Stdio MCP server, exposing tools across the BEFORE, DURING, and AFTER lifecycle stages.

```text
IBM Bob Coding Agent
        │
   (MCP Protocol / Stdio)
        │
        ▼
CodeProof MCP Gateway (@codeproof/mcp)
        │
   ┌────┴────┐
   ▼         ▼
Guardian   Engine
```

---

## 2. Step-by-Step Integration Guide

### Step 1: Build the CodeProof Monorepo
Ensure the `@codeproof/mcp` package is built locally:

```bash
cd /path/to/codeproof-monorepo
npm run build --workspace=@codeproof/mcp
```

### Step 2: Configure IBM Bob MCP Server Config
Add CodeProof to IBM Bob's MCP configuration file (typically located at `~/.bob/mcp.json` or within project settings):

```json
{
  "mcpServers": {
    "codeproof": {
      "command": "node",
      "args": [
        "/path/to/codeproof-monorepo/packages/mcp/dist/index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

---

## 3. Exposed MCP Tools Available to IBM Bob

| MCP Tool Name | Description | Agent Usage Trigger |
| :--- | :--- | :--- |
| `codeproof_analyze_task` | Analyze developer intent and identify obligations | **BEFORE**: Call prior to generating implementation plan |
| `codeproof_evaluate_plan` | Evaluate proposed plan steps against governance rules | **BEFORE**: Call after formulating plan |
| `codeproof_verify_changes` | Run deterministic unit & static checks | **AFTER**: Call after code modifications |
| `codeproof_generate_proof` | Synthesize verified Engineering Proof document | **AFTER**: Call before finalizing task |

---

## 4. Operational Prompt Constraint for IBM Bob System Prompt

Add the following instructions to IBM Bob's system prompt or workspace context (`.bob/instructions.md`):

```markdown
### CodeProof Engineering Discipline Rules
Before writing any code:
1. Always invoke `codeproof_analyze_task` with developer intent.
2. Invoke `codeproof_evaluate_plan` with your planned steps.

After modifying code:
1. Execute `codeproof_verify_changes`.
2. Generate final evidence using `codeproof_generate_proof`.
```
