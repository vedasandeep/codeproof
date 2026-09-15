import { TaskContext, EngineeringProof } from '@codeproof/core';
export declare class CodeProofEngine {
    analyzeTask(developerIntent: string, targetFiles?: string[]): Promise<TaskContext>;
    verifyChanges(taskId: string): Promise<{
        passed: boolean;
        findings: any[];
    }>;
    generateProof(task: TaskContext): Promise<EngineeringProof>;
}
//# sourceMappingURL=index.d.ts.map