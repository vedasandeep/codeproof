# CodeProof Integration — OpenCode

**Target Assistant:** OpenCode (Open-Source CLI Agentic Coding System)  
**Primary Integration Pattern:** Local Stdio MCP Plugin / OpenCode Config (`opencode.json`)  
**Support Level:** Full Interoperability  

---

## 1. Integration Architecture Overview

OpenCode connects to external tooling via standard Model Context Protocol (MCP) definitions in its local project configuration file `opencode.json` or global configuration `~/.config/opencode/config.json`.

```text
OpenCode CLI Terminal
        │
   (MCP Stdio Transport)
        │
        ▼
CodeProof MCP Gateway (@codeproof/mcp)
        │
CodeProof Verification & Proof Engine
```

---

## 2. Step-by-Step Integration Guide

### Step 1: Configure `opencode.json`
Add CodeProof to your repository's root `opencode.json` configuration:

```json
{
  "$schema": "https://opencode.dev/schema.json",
  "mcp": {
    "servers": {
      "codeproof": {
        "type": "stdio",
        "command": "node",
        "args": [
          "./packages/mcp/dist/index.js"
        ]
      }
    }
  }
}
```

### Step 2: Configure System Prompt Instructions
Add the following to `.opencode/instructions.md`:

```markdown
# OpenCode Governance Rules

All automated code generation must adhere to CodeProof quality gates:
- Call `codeproof_analyze_task` on user prompts.
- Call `codeproof_verify_changes` after editing source code.
- Report proof output from `codeproof_generate_proof`.
```
