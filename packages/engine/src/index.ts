import { TaskContext, EngineeringProof, LifecycleStage, RiskLevel, VerificationResult } from '@codeproof/core';
import { VerificationRunner } from './verification/runner.js';
import { EngineeringGuardian, PlanEvaluationResult } from './guardian/guardian.js';
import { ProofGenerator } from './proof/generator.js';
import { GitInspector, GitDiffInfo } from './git/inspector.js';
import { PolicyEngine } from './policy/engine.js';
import { ComprehensiveTestingSuite, CodeProofTestSuiteResults } from './testing/suite.js';

export class CodeProofEngine {
  private verificationRunner = new VerificationRunner();
  private guardian = new EngineeringGuardian();
  private proofGenerator = new ProofGenerator();
  private gitInspector = new GitInspector();
  private policyEngine = new PolicyEngine();
  private testingSuite = new ComprehensiveTestingSuite();

  async analyzeTask(developerIntent: string, targetFiles: string[] = []): Promise<TaskContext> {
    const gitInfo = await this.gitInspector.getDiffInfo();
    const allFiles = Array.from(new Set([...targetFiles, ...gitInfo.modifiedFiles]));

    const isHighRisk = developerIntent.toLowerCase().includes('auth') || 
                       developerIntent.toLowerCase().includes('security') ||
                       developerIntent.toLowerCase().includes('migration') ||
                       allFiles.some(f => f.includes('auth') || f.includes('secret'));

    return {
      taskId: `task-${Date.now()}`,
      repositoryId: 'repo-local',
      developerIntent,
      targetFiles: allFiles,
      riskLevel: isHighRisk ? RiskLevel.HIGH : RiskLevel.MEDIUM,
      createdAt: new Date().toISOString()
    };
  }

  async inspectGitDiff(): Promise<GitDiffInfo> {
    return this.gitInspector.getDiffInfo();
  }

  evaluatePlan(task: TaskContext, planSteps: string[]): PlanEvaluationResult {
    return this.guardian.evaluatePlan(task, planSteps);
  }

  evaluatePolicies(task: TaskContext) {
    return this.policyEngine.evaluatePolicies(task, task.targetFiles);
  }

  async runFullTestingSuite(targetDir: string = process.cwd()): Promise<CodeProofTestSuiteResults> {
    return this.testingSuite.runFullTestMatrix(targetDir);
  }

  async verifyChanges(task: TaskContext): Promise<VerificationResult[]> {
    const staticResult = await this.verificationRunner.runStaticAnalysis(task.targetFiles);
    const testResult = await this.verificationRunner.runTests();
    return [staticResult, testResult];
  }

  generateProof(task: TaskContext, planEval: PlanEvaluationResult, results: VerificationResult[]): EngineeringProof {
    return this.proofGenerator.generateProof(task, planEval.obligations, results);
  }

  formatMarkdownProof(proof: EngineeringProof): string {
    return this.proofGenerator.formatMarkdownProof(proof);
  }
}

export * from './verification/runner.js';
export * from './guardian/guardian.js';
export * from './proof/generator.js';
export * from './git/inspector.js';
export * from './policy/engine.js';
export * from './testing/suite.js';
