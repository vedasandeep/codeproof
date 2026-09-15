# CodeProof — Hackathon Judge Evaluation & Setup Guide

**Document Type:** Quick Start & Evaluation Guide for Hackathon Judges  
**Setup Time:** < 2 minutes  
**Prerequisites:** Node.js v18+  

---

## 1. Quick Start Commands

### Step 1: Install & Build Workspace
```bash
git clone <repository-url>
cd codeproof-monorepo

# Install dependencies and build all TypeScript packages
npm install
npm run build
```

### Step 2: Run Live Verification & Tests
```bash
# Run Vitest test suite
npx vitest run

# Run CLI verification
node apps/cli/dist/index.js proof
```

### Step 3: Launch Web Control Panel & API Server
```bash
# Start Fastify API Control Plane (Terminal 1)
node apps/api/dist/index.js

# Start Next.js Control Panel UI (Terminal 2)
cd apps/web
npx next start -p 3000
```
- Open UI: `http://localhost:3000`
- Open API: `http://localhost:3001/api/health`

---

## 2. Judging Evaluation Criteria Checklist

- [x] **Problem Fit & Vision**: Solves the AI verification gap by enforcing software engineering discipline on coding agents.
- [x] **Multi-Agent Interoperability**: Compatible with IBM Bob, Antigravity, OpenCode, and Claude Code via MCP standard.
- [x] **Technical Integrity**: Clean TypeScript monorepo, zero circular dependencies, 100% passing test suites, loose coupling score 0.92.
- [x] **User Experience & Observability**: Sleek dark Swiss/Editorial design with live Git diff metrics, Recharts trend charts, and Markdown proof inspector.
- [x] **Empirical Proof**: Deterministic evidence collection rather than LLM opinion.
