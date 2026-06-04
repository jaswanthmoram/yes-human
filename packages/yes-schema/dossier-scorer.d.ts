#!/usr/bin/env node
/**
 * Score an entire dossier
 */
export function scoreDossier(dossier: any): {
    source_count: number;
    official_docs: number;
    github_quality: number;
    license_safety: number;
    maintenance: number;
    pattern_clarity: number;
    testability: number;
    total: number;
};
/**
 * Load and score all dossiers from the references directory
 */
export function scoreAllDossiers(): any[];
/**
 * Generate a report of dossier scores
 */
export function generateScoreReport(results: any): {
    total_dossiers: any;
    average_score: number;
    score_distribution: {
        excellent: number;
        good: number;
        fair: number;
        poor: number;
    };
    by_domain: {};
    low_scoring: never[];
};
//# sourceMappingURL=dossier-scorer.d.ts.map