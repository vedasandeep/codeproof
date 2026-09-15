import { describe, it, expect } from 'vitest';
import { CodeProofEngine } from './index.js';

describe('CodeProofEngine Integration Tests', () => {
  const engine = new CodeProofEngine();

  it('should elevate risk level for security-sensitive intent', async () => {
    const task = await engine.analyzeTask('Implement user password reset with auth token');
    expect(task.riskLevel).toBe('HIGH');
  });

  it('should evaluate guardian plan policies', async () => {
    const task = await engine.analyzeTask('Refactor DB query');
    const plan = engine.evaluatePlan(task, ['Modify database query']);
    expect(plan.obligations.length).toBeGreaterThan(0);
  });
});
