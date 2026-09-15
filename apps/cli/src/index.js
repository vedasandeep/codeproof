#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("@codeproof/engine");
async function run() {
    const args = process.argv.slice(2);
    const command = args[0] || 'help';
    const engine = new engine_1.CodeProofEngine();
    console.log("-----------------------------------------");
    console.log("🛡️  CodeProof — AI Engineering Harness");
    console.log("-----------------------------------------");
    switch (command) {
        case 'analyze': {
            const intent = args[1] || 'Default intent: code modification';
            console.log(`Analyzing developer intent: "${intent}"...`);
            const task = await engine.analyzeTask(intent);
            console.log("Task Analysis Result:", JSON.stringify(task, null, 2));
            break;
        }
        case 'verify': {
            console.log("Running deterministic verification pass...");
            const result = await engine.verifyChanges("task-latest");
            console.log("Verification Result:", JSON.stringify(result, null, 2));
            break;
        }
        case 'proof': {
            console.log("Generating Engineering Proof...");
            const task = await engine.analyzeTask("Verified changes proof");
            const proof = await engine.generateProof(task);
            console.log("Engineering Proof Generated:\n", JSON.stringify(proof, null, 2));
            break;
        }
        default:
            console.log(`
Usage: codeproof <command> [options]

Commands:
  analyze <intent>   Analyze task intent & establish engineering obligations (Before)
  verify             Run test & static analysis verification (After)
  proof              Synthesize and print verified Engineering Proof document
`);
            break;
    }
}
run().catch((err) => {
    console.error("CLI Execution Error:", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map