# CodeProof Integration — Antigravity

**Target Assistant:** Google Antigravity (AGY Agentic AI Platform)  
**Primary Integration Pattern:** MCP Sidecar Server & Workspace Rules (`.gemini/rules`)  
**Support Level:** Full Interoperability  

---

## 1. Integration Architecture Overview

Google Antigravity natively supports registering external MCP servers in the global plugin configuration (`~/.gemini/antigravity-cli/mcp_config.json`) or per workspace. CodeProof acts as a sidecar engineering harness.

```text
Antigravity Agentic IDE / CLI
        │
   (MCP Protocol / JSON-RPC)
        │
        ▼
CodeProof MCP Gateway (@codeproof/mcp)
        │
CodeProof Control Engine
```

---

## 2. Step-by-Step Integration Guide

### Step 1: Register CodeProof in Antigravity MCP Config
Add CodeProof to Antigravity's MCP configuration (`~/.gemini/antigravity-cli/mcp_config.json`):

```json
{
  "mcpServers": {
    "codeproof": {
      "command": "node",
      "args": [
        "D:/IBM Hackathon/packages/mcp/dist/index.js"
      ],
      "disabled": false,
      "alwaysAllow": [
        "codeproof_analyze_task",
        "codeproof_evaluate_plan",
        "codeproof_verify_changes",
        "codeproof_generate_proof"
      ]
    }
  }
}
```

### Step 2: Add CodeProof Rule to Project Workspace
Create an Antigravity workspace rule file at `.gemini/rules/codeproof.md`:

```markdown
---
description: Enforce CodeProof engineering discipline across agent execution loops
globs: "**/*"
---

# CodeProof Rule for Antigravity

1. **Before Action**: Every plan formed by Antigravity must be sent to `codeproof_evaluate_plan`.
2. **High-Risk Files**: Modifications to `auth`, `security`, or database migration files must be verified with `codeproof_verify_changes`.
3. **Completion**: A task cannot be marked complete without generating a proof via `codeproof_generate_proof`.
```

---

## 3. Slash Command Extension (`/proof`)

Antigravity slash commands can trigger CodeProof verification directly in the chat window:

```bash
/proof --task="User Password Reset"
```
