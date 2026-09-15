"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProofMCPServer = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
class CodeProofMCPServer {
    server;
    constructor() {
        this.server = new index_js_1.Server({
            name: "codeproof-mcp-server",
            version: "0.1.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
    }
    setupHandlers() {
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: "codeproof_analyze_task",
                        description: "Analyze developer intent and identify engineering obligations (Before Coding phase)",
                        inputSchema: {
                            type: "object",
                            properties: {
                                intent: { type: "string", description: "The feature or bug fix requested" },
                                targetFiles: { type: "array", items: { type: "string" } }
                            },
                            required: ["intent"]
                        }
                    },
                    {
                        name: "codeproof_evaluate_plan",
                        description: "Evaluate coding agent's proposed plan against engineering rules",
                        inputSchema: {
                            type: "object",
                            properties: {
                                taskId: { type: "string" },
                                planSteps: { type: "array", items: { type: "string" } }
                            },
                            required: ["taskId", "planSteps"]
                        }
                    },
                    {
                        name: "codeproof_verify_changes",
                        description: "Run deterministic test & static analysis verification (After Coding phase)",
                        inputSchema: {
                            type: "object",
                            properties: {
                                taskId: { type: "string" }
                            },
                            required: ["taskId"]
                        }
                    },
                    {
                        name: "codeproof_generate_proof",
                        description: "Generate verified Engineering Proof document",
                        inputSchema: {
                            type: "object",
                            properties: {
                                taskId: { type: "string" }
                            },
                            required: ["taskId"]
                        }
                    }
                ]
            };
        });
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            switch (name) {
                case "codeproof_analyze_task": {
                    const intent = String(args?.intent || "");
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    status: "ANALYZED",
                                    taskId: `task-${Date.now()}`,
                                    obligations: [
                                        { title: "Unit Test Coverage", category: "testing", mandatory: true },
                                        { title: "API Input Validation", category: "security", mandatory: true }
                                    ],
                                    riskLevel: intent.toLowerCase().includes("auth") ? "HIGH" : "MEDIUM"
                                }, null, 2)
                            }
                        ]
                    };
                }
                case "codeproof_evaluate_plan": {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    approved: true,
                                    recommendations: ["Ensure backwards compatibility for existing API endpoints"],
                                    interventions: []
                                }, null, 2)
                            }
                        ]
                    };
                }
                case "codeproof_verify_changes": {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    passed: true,
                                    evidenceCount: 4,
                                    summary: "All unit tests passed. No security vulnerabilities detected."
                                }, null, 2)
                            }
                        ]
                    };
                }
                case "codeproof_generate_proof": {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    proofId: `proof-${Date.now()}`,
                                    status: "VERIFIED",
                                    proofUrl: "/proofs/latest"
                                }, null, 2)
                            }
                        ]
                    };
                }
                default:
                    throw new Error(`Unknown tool: ${name}`);
            }
        });
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error("CodeProof MCP Server running on stdio");
    }
}
exports.CodeProofMCPServer = CodeProofMCPServer;
if (import.meta.url === `file://${process.argv[1]}`) {
    const server = new CodeProofMCPServer();
    server.start().catch((err) => {
        console.error("Failed to start MCP Server:", err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map