/**
 * Pure promotion check: decides whether a dossier qualifies for a target quality gate.
 * Production is the strict gate; staging only requires a valid dossier with sources.
 */
export function evaluatePromotion(dossier: any, opts?: {}): {
    allowed: boolean;
    blockers: string[];
    warnings: string[];
};
/**
 * Stricter gate for staging/production dossiers tied to active agents and workflows.
 */
export function evaluateStagingDossier(dossier: any, opts?: {}): {
    allowed: boolean;
    blockers: string[];
    warnings: string[];
    computed_scores: {
        source_count: number;
        official_docs: number;
        github_quality: number;
        license_safety: number;
        maintenance: number;
        pattern_clarity: number;
        testability: number;
        total: number;
    };
};
/** Resolve a dossier path from an agent id, e.g. engineering.code-reviewer. */
export function dossierPathForAgent(repoRoot: any, agentId: any): any;
/** Load registry + dossier from disk and evaluate. */
export function checkAgentPromotion(repoRoot: any, agentId: any, opts?: {}): {
    allowed: boolean;
    blockers: string[];
    warnings: string[];
};
export function dossierPathForSkill(repoRoot: any, skillId: any): any;
export function checkSkillPromotion(repoRoot: any, skillId: any, opts?: {}): {
    allowed: boolean;
    blockers: string[];
    warnings: string[];
};
export const MIN_PRODUCTION_SCORE: 80;
export const MIN_STAGING_SOURCES: 5;
export const STAGING_SCORE_TOLERANCE: 5;
export const SELF_REF_URL_FRAGMENT: "github.com/yes-human/yes-human";
//# sourceMappingURL=promotion.validator.d.ts.map