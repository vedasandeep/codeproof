import { TaskContext, EngineeringProof, LifecycleStage, VerificationResult, Obligation } from '@codeproof/core';

export class ProofGenerator {
  generateProof(
    task: TaskContext,
    obligations: Obligation[],
    verificationResults: VerificationResult[]
  ): EngineeringProof {
    const allPassed = verificationResults.every(v => v.passed);
    const updatedObligations = obligations.map(obl => ({
      ...obl,
      fulfilled: allPassed
    }));

    return {
      proofId: `proof-${Date.now()}`,
      taskId: task.taskId,
      repositoryId: task.repositoryId,
      stage: allPassed ? LifecycleStage.VERIFIED : LifecycleStage.AFTER_CODING,
      summary: allPassed 
        ? `Engineering Proof PASSED: All ${obligations.length} obligations fulfilled with clean verification.`
        : `Engineering Proof FAILED: Verification findings require attention.`,
      obligationsMet: updatedObligations,
      verificationResults,
      producedAt: new Date().toISOString()
    };
  }

  formatMarkdownProof(proof: EngineeringProof): string {
    return `
# CodeProof — Verified Engineering Proof

**Proof ID:** \`${proof.proofId}\`  
**Task ID:** \`${proof.taskId}\`  
**Stage:** \`${proof.stage}\`  
**Status:** ${proof.stage === LifecycleStage.VERIFIED ? '✅ VERIFIED PASS' : '❌ UNVERIFIED / FAIL'}  
**Timestamp:** ${proof.producedAt}  

---

### Summary
> ${proof.summary}

### Engineering Obligations
${proof.obligationsMet.map(o => `- [${o.fulfilled ? 'x' : ' '}] **${o.title}** (${o.category}): ${o.description}`).join('\n')}

### Deterministic Verification Evidence
${proof.verificationResults.map(v => `
#### Verification Pass \`${v.verificationId}\` (${v.passed ? 'PASS' : 'FAIL'})
Findings:
${v.findings.map(f => `- [${f.severity.toUpperCase()}] **${f.ruleId}**: ${f.message}`).join('\n')}
`).join('\n')}
`;
  }
}
