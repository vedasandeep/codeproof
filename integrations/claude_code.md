# CodeProof Integration — Claude Code

**Target Assistant:** Claude Code (Anthropic CLI Agentic Assistant)  
**Primary Integration Pattern:** Claude Code Config (`~/.claude.json`) / `claude mcp add` Command  
**Support Level:** Full Interoperability  

---

## 1. Integration Architecture Overview

Claude Code natively consumes MCP tools via standard input/output (stdio) transports. Registering CodeProof with Claude Code empowers Claude to query CodeProof before creating implementation plans and after modifying code.

```text
Claude Code CLI Assistant
        │
   (Claude Code MCP Transport)
        │
        ▼
CodeProof MCP Gateway (@codeproof/mcp)
        │
CodeProof Control Engine
```

---

## 2. Step-by-Step Integration Guide

### Step 1: Add CodeProof via Claude Code CLI
Run the official Claude Code CLI command to register the CodeProof MCP server:

```bash
claude mcp add codeproof -- node /path/to/codeproof-monorepo/packages/mcp/dist/index.js
```

### Step 2: Alternative Configuration via `~/.claude.json`
Alternatively, edit `~/.claude.json` directly:

```json
{
  "mcpServers": {
    "codeproof": {
      "command": "node",
      "args": [
        "/path/to/codeproof-monorepo/packages/mcp/dist/index.js"
      ]
    }
  }
}
```

### Step 3: Configure Project `CLAUDE.md` Guidelines
Add the following discipline guidelines to your project's `CLAUDE.md` file:

```markdown
# Engineering Quality Guidelines (CodeProof)

When working on this codebase:
1. BEFORE coding: Call `codeproof_analyze_task` with the user request.
2. BEFORE implementing: Send proposed plan steps to `codeproof_evaluate_plan`.
3. AFTER coding: Execute `codeproof_verify_changes` to run unit & static analysis verification.
4. BEFORE finishing: Generate the verified proof with `codeproof_generate_proof`.
```
