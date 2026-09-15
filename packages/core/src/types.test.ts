import { describe, it, expect } from 'vitest';
import { TaskContextSchema, RiskLevel } from './types.js';

describe('TaskContextSchema Unit Tests', () => {
  it('should validate valid TaskContext object', () => {
    const valid = {
      taskId: 'task-1',
      repositoryId: 'repo-1',
      developerIntent: 'Add auth',
      targetFiles: ['src/auth.ts'],
      riskLevel: RiskLevel.HIGH,
      createdAt: new Date().toISOString()
    };

    const parsed = TaskContextSchema.parse(valid);
    expect(parsed.taskId).toBe('task-1');
    expect(parsed.riskLevel).toBe(RiskLevel.HIGH);
  });
});
