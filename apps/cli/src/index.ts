#!/usr/bin/env node
import { CodeProofEngine } from '@codeproof/engine';

async function run() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  const engine = new CodeProofEngine();

  console.log("-----------------------------------------");
  console.log("🛡️  CodeProof — AI Engineering Harness");
  console.log("-----------------------------------------");

  switch (command) {
    case 'analyze': {
      const intent = args[1] || 'Default intent: user authentication endpoint';
      console.log(`Analyzing developer intent: "${intent}"...`);
      const task = await engine.analyzeTask(intent, ['src/auth/login.ts']);
      console.log("\n[BEFORE] Task Context:");
      console.log(JSON.stringify(task, null, 2));

      const planEval = engine.evaluatePlan(task, ['Create endpoint', 'Add password hash check']);
      console.log("\n[BEFORE] Engineering Plan Evaluation:");
      console.log(JSON.stringify(planEval, null, 2));
      break;
    }
    case 'verify': {
      console.log("Running deterministic verification pass...");
      const task = await engine.analyzeTask("Verification run", ['src/auth/login.ts']);
      const results = await engine.verifyChanges(task);
      console.log("\n[AFTER] Verification Results:");
      console.log(JSON.stringify(results, null, 2));
      break;
    }
    case 'proof': {
      console.log("Synthesizing Full Engineering Proof...");
      const task = await engine.analyzeTask("User Password Reset", ['src/auth/reset.ts']);
      const planEval = engine.evaluatePlan(task, ['Implement password reset', 'Add unit tests']);
      const results = await engine.verifyChanges(task);
      const proof = engine.generateProof(task, planEval, results);

      console.log("\n" + engine.formatMarkdownProof(proof));
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
