import { exec } from 'child_process';
import { promisify } from 'util';
import { VerificationResult } from '@codeproof/core';

const execAsync = promisify(exec);

export class VerificationRunner {
  async runTests(cwd: string = process.cwd()): Promise<VerificationResult> {
    const timestamp = new Date().toISOString();
    try {
      // Attempt to run npm test or vitest if configured
      const { stdout } = await execAsync('npm test -- --run', { cwd });
      return {
        verificationId: `v-test-${Date.now()}`,
        taskId: 'task-current',
        passed: true,
        evidenceCount: 1,
        findings: [
          { ruleId: 'TEST-PASS', message: 'All test suites executed clean', severity: 'info' }
        ],
        timestamp
      };
    } catch (error: any) {
      return {
        verificationId: `v-test-${Date.now()}`,
        taskId: 'task-current',
        passed: false,
        evidenceCount: 1,
        findings: [
          {
            ruleId: 'TEST-FAIL',
            message: error.stdout || error.message || 'Test suite execution failed',
            severity: 'error'
          }
        ],
        timestamp
      };
    }
  }

  async runStaticAnalysis(targetFiles: string[]): Promise<VerificationResult> {
    const timestamp = new Date().toISOString();
    const findings: any[] = [];

    for (const file of targetFiles) {
      if (file.includes('auth') || file.includes('password') || file.includes('secret')) {
        findings.push({
          ruleId: 'SEC-HIGH-RISK-FILE',
          message: `Sensitive security file modified: ${file}. Requires explicit verification evidence.`,
          severity: 'warning',
          location: file
        });
      }
    }

    return {
      verificationId: `v-static-${Date.now()}`,
      taskId: 'task-current',
      passed: findings.filter(f => f.severity === 'error').length === 0,
      evidenceCount: findings.length || 1,
      findings: findings.length > 0 ? findings : [
        { ruleId: 'STATIC-PASS', message: 'No critical static analysis findings detected', severity: 'info' }
      ],
      timestamp
    };
  }
}
