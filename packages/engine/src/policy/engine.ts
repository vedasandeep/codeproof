import { TaskContext, RiskLevel } from '@codeproof/core';

export interface PolicyRule {
  id: string;
  name: string;
  severity: 'info' | 'warning' | 'error';
  evaluate: (task: TaskContext, modifiedFiles: string[]) => { passed: boolean; message: string };
}

export class PolicyEngine {
  private rules: PolicyRule[] = [
    {
      id: 'POL-001',
      name: 'Mandatory Test File Check',
      severity: 'warning',
      evaluate: (task, files) => {
        const hasTestFile = files.some(f => f.includes('test') || f.includes('spec'));
        return {
          passed: hasTestFile,
          message: hasTestFile 
            ? 'Test file modifications detected.' 
            : 'No test file changes detected alongside code changes.'
        };
      }
    },
    {
      id: 'POL-002',
      name: 'Critical Security Boundary Check',
      severity: 'error',
      evaluate: (task, files) => {
        const hasAuthFile = files.some(f => f.includes('auth') || f.includes('jwt') || f.includes('secret'));
        if (hasAuthFile && task.riskLevel !== RiskLevel.HIGH && task.riskLevel !== RiskLevel.CRITICAL) {
          return {
            passed: false,
            message: 'Auth module modification detected without elevated High/Critical risk classification.'
          };
        }
        return { passed: true, message: 'Security risk classification matches modified files.' };
      }
    }
  ];

  evaluatePolicies(task: TaskContext, modifiedFiles: string[]) {
    return this.rules.map(rule => {
      const res = rule.evaluate(task, modifiedFiles);
      return {
        ruleId: rule.id,
        ruleName: rule.name,
        severity: rule.severity,
        passed: res.passed,
        message: res.message
      };
    });
  }
}
