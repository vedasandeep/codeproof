"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineeringProofSchema = exports.VerificationResultSchema = exports.ObligationSchema = exports.TaskContextSchema = exports.RiskLevel = exports.LifecycleStage = void 0;
const zod_1 = require("zod");
var LifecycleStage;
(function (LifecycleStage) {
    LifecycleStage["BEFORE_CODING"] = "BEFORE_CODING";
    LifecycleStage["DURING_CODING"] = "DURING_CODING";
    LifecycleStage["AFTER_CODING"] = "AFTER_CODING";
    LifecycleStage["VERIFIED"] = "VERIFIED";
})(LifecycleStage || (exports.LifecycleStage = LifecycleStage = {}));
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "LOW";
    RiskLevel["MEDIUM"] = "MEDIUM";
    RiskLevel["HIGH"] = "HIGH";
    RiskLevel["CRITICAL"] = "CRITICAL";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
exports.TaskContextSchema = zod_1.z.object({
    taskId: zod_1.z.string(),
    repositoryId: zod_1.z.string(),
    developerIntent: zod_1.z.string(),
    targetFiles: zod_1.z.array(zod_1.z.string()).default([]),
    riskLevel: zod_1.z.nativeEnum(RiskLevel).default(RiskLevel.MEDIUM),
    createdAt: zod_1.z.string().datetime()
});
exports.ObligationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.enum(['testing', 'security', 'architecture', 'performance', 'documentation']),
    mandatory: zod_1.z.boolean().default(true),
    fulfilled: zod_1.z.boolean().default(false)
});
exports.VerificationResultSchema = zod_1.z.object({
    verificationId: zod_1.z.string(),
    taskId: zod_1.z.string(),
    passed: zod_1.z.boolean(),
    evidenceCount: zod_1.z.number(),
    findings: zod_1.z.array(zod_1.z.object({
        ruleId: zod_1.z.string(),
        message: zod_1.z.string(),
        severity: zod_1.z.enum(['info', 'warning', 'error']),
        location: zod_1.z.string().optional()
    })),
    timestamp: zod_1.z.string()
});
exports.EngineeringProofSchema = zod_1.z.object({
    proofId: zod_1.z.string(),
    taskId: zod_1.z.string(),
    repositoryId: zod_1.z.string(),
    stage: zod_1.z.nativeEnum(LifecycleStage),
    summary: zod_1.z.string(),
    obligationsMet: zod_1.z.array(exports.ObligationSchema),
    verificationResults: zod_1.z.array(exports.VerificationResultSchema),
    producedAt: zod_1.z.string()
});
//# sourceMappingURL=types.js.map