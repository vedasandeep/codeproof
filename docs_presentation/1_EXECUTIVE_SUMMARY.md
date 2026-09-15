# CodeProof — Executive Summary & Product Architecture

**Document Type:** Hackathon Judge Presentation Documentation  
**Product:** CodeProof (Agentic AI Engineering Harness)  
**Repository:** `D:\IBM Hackathon`  
**Status:** Monorepo Production MVP  

---

## 1. Executive Summary

AI coding systems (Claude Code, IBM Bob, OpenCode, Antigravity) are accelerating software generation by orders of magnitude. However, **producing code quickly is not equivalent to producing trustworthy software**.

CodeProof is an **Agentic Software Engineering Control Plane** that sits between developers/AI coding agents and codebases to enforce engineering discipline across three lifecycle stages:

```text
BEFORE CODING
Developer Intent → Repository Intelligence → Plan Evaluation → Engineering Obligations

DURING CODING
Observe Actions → Evaluate Decisions → Guardian Interventions → Risk Management

AFTER CODING
Deterministic Verification → AST Analysis → Policy Evaluation → Engineering Proof Synthesis
```

> **Core Value Proposition**: *Vibe code freely. CodeProof supplies the engineering discipline.*

---

## 2. Core Architectural Pillars

### Pillar A: Model Context Protocol (MCP) Integration Gateway
- **Package**: `@codeproof/mcp`
- **Mechanism**: Stdio Server exposing 4 core tools (`codeproof_analyze_task`, `codeproof_evaluate_plan`, `codeproof_verify_changes`, `codeproof_generate_proof`).
- **Target Assistants**: IBM Bob, Antigravity, OpenCode, Claude Code.

### Pillar B: Engineering Guardian & Policy Engine
- **Package**: `@codeproof/engine`
- **Guardian**: Analyzes intent and target files; automatically elevates risk levels to `HIGH` for security-sensitive modules (`auth`, `jwt`, `secret`, `migration`).
- **Policy Engine**: Evaluates governance policies (`POL-001`: Mandatory Test File Check, `POL-002`: Security Boundary Verification).

### Pillar C: Deterministic Verification & Testing Suite
- **Verification Runner**: Executes static security checks and unit test runners.
- **Testing Suite**: Operates across 5 testing dimensions: Unit Tests, Module Boundaries, Black Box REST API, White Box AST Coverage, and Coupling Architecture.

### Pillar D: Web Control Panel & Visual Inspector
- **Application**: `apps/web` (Next.js App Router, Tailwind CSS, Recharts).
- **Control Features**: Live Git Branch & Diff Metrics bar, System Verification Matrix cards, Recharts Quality Trend charts, Monorepo Dependency Topology map, and Real-Time Markdown Engineering Proof viewer.
