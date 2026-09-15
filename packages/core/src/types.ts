import { z } from 'zod';

export enum LifecycleStage {
  BEFORE_CODING = 'BEFORE_CODING',
  DURING_CODING = 'DURING_CODING',
  AFTER_CODING = 'AFTER_CODING',
  VERIFIED = 'VERIFIED'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export const TaskContextSchema = z.object({
  taskId: z.string(),
  repositoryId: z.string(),
  developerIntent: z.string(),
  targetFiles: z.array(z.string()).default([]),
  riskLevel: z.nativeEnum(RiskLevel).default(RiskLevel.MEDIUM),
  createdAt: z.string().datetime()
});

export type TaskContext = z.infer<typeof TaskContextSchema>;

export const ObligationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(['testing', 'security', 'architecture', 'performance', 'documentation']),
  mandatory: z.boolean().default(true),
  fulfilled: z.boolean().default(false)
});

export type Obligation = z.infer<typeof ObligationSchema>;

export const VerificationResultSchema = z.object({
  verificationId: z.string(),
  taskId: z.string(),
  passed: z.boolean(),
  evidenceCount: z.number(),
  findings: z.array(z.object({
    ruleId: z.string(),
    message: z.string(),
    severity: z.enum(['info', 'warning', 'error']),
    location: z.string().optional()
  })),
  timestamp: z.string()
});

export type VerificationResult = z.infer<typeof VerificationResultSchema>;

export const EngineeringProofSchema = z.object({
  proofId: z.string(),
  taskId: z.string(),
  repositoryId: z.string(),
  stage: z.nativeEnum(LifecycleStage),
  summary: z.string(),
  obligationsMet: z.array(ObligationSchema),
  verificationResults: z.array(VerificationResultSchema),
  producedAt: z.string()
});

export type EngineeringProof = z.infer<typeof EngineeringProofSchema>;
