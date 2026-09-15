import { TaskContext, RiskLevel, Obligation } from '@codeproof/core';

export interface PlanEvaluationResult {
  approved: boolean;
  riskLevel: RiskLevel;
  obligations: Obligation[];
  warnings: string[];
}

export class EngineeringGuardian {
  evaluatePlan(task: TaskContext, planSteps: string[]): PlanEvaluationResult {
    const warnings: string[] = [];
    const obligations: Obligation[] = [
      {
        id: 'obl-unit-tests',
        title: 'Automated Unit Verification',
        description: 'New or modified logic must have corresponding unit test coverage.',
        category: 'testing',
        mandatory: true,
        fulfilled: false
      }
    ];

    const planText = planSteps.join(' ').toLowerCase();

    if (task.riskLevel === RiskLevel.HIGH || planText.includes('auth') || planText.includes('database')) {
      obligations.push({
        id: 'obl-security-review',
        title: 'Security Boundary Verification',
        description: 'Ensure inputs are sanitized and tokens are securely generated and handled.',
        category: 'security',
        mandatory: true,
        fulfilled: false
      });
    }

    if (!planText.includes('test') && !planText.includes('spec')) {
      warnings.push('Proposed plan does not explicitly mention adding or running tests.');
    }

    return {
      approved: warnings.length === 0,
      riskLevel: task.riskLevel,
      obligations,
      warnings
    };
  }
}
