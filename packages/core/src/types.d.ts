import { z } from 'zod';
export declare enum LifecycleStage {
    BEFORE_CODING = "BEFORE_CODING",
    DURING_CODING = "DURING_CODING",
    AFTER_CODING = "AFTER_CODING",
    VERIFIED = "VERIFIED"
}
export declare enum RiskLevel {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare const TaskContextSchema: any;
export type TaskContext = z.infer<typeof TaskContextSchema>;
export declare const ObligationSchema: any;
export type Obligation = z.infer<typeof ObligationSchema>;
export declare const VerificationResultSchema: any;
export type VerificationResult = z.infer<typeof VerificationResultSchema>;
export declare const EngineeringProofSchema: any;
export type EngineeringProof = z.infer<typeof EngineeringProofSchema>;
//# sourceMappingURL=types.d.ts.map