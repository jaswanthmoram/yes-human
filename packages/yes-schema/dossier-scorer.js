#!/usr/bin/env node

/**
 * Dossier Scorer - Evaluates source dossiers based on 7 quality dimensions
 *
 * Scoring dimensions:
 * 1. source_count (0-20): Number of unique sources
 * 2. official_docs (0-15): Presence of official documentation
 * 3. github_quality (0-20): Quality of GitHub repositories (stars, activity, maintenance)
 * 4. license_safety (0-15): License compatibility and safety
 * 5. maintenance (0-10): How well sources are maintained
 * 6. pattern_clarity (0-10): Clarity of patterns extracted
 * 7. testability (0-10): How testable the patterns are
 *
 * Total: 0-100 points
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

// Scoring weights and thresholds
const SCORING_CONFIG = {
  source_count: { max: 20, thresholds: [1, 3, 5, 10, 15] },
  official_docs: { max: 15, thresholds: [1, 2, 3] },
  github_quality: { max: 20, thresholds: [50, 100, 500, 1000] },
  license_safety: { max: 15, safe_licenses: ['MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'CC0-1.0'] },
  maintenance: { max: 10, recent_days: 90 },
  pattern_clarity: { max: 10 },
  testability: { max: 10 }
};

/**
 * Score a single source within a dossier
 */
function scoreSource(source) {
  let score = 0;
  const details = {};

  // GitHub quality scoring
  if (source.source_type === 'github_repo') {
    const stars = source.stars || 0;
    if (stars >= 1000) score += 20;
    else if (stars >= 500) score += 15;
    else if (stars >= 100) score += 10;
    else if (stars >= 50) score += 5;
    details.github_quality = score;
  }

  // License safety scoring
  const safeLicenses = SCORING_CONFIG.license_safety.safe_licenses;
  if (source.license && safeLicenses.includes(source.license)) {
    score += 15;
    details.license_safety = 15;
  } else if (source.license) {
    score += 5; // Unknown or restrictive license
    details.license_safety = 5;
  }

  // Official docs scoring
  if (source.source_type === 'official_docs' || source.source_type === 'vendor_docs') {
    score += 15;
    details.official_docs = 15;
  }

  return { score, details };
}

/**
 * Score an entire dossier
 */
export function scoreDossier(dossier) {
  const scores = {
    source_count: 0,
    official_docs: 0,
    github_quality: 0,
    license_safety: 0,
    maintenance: 0,
    pattern_clarity: 0,
    testability: 0,
    total: 0
  };

  if (!dossier.sources || !Array.isArray(dossier.sources)) {
    return scores;
  }

  // Source count scoring
  const sourceCount = dossier.sources.length;
  const thresholds = SCORING_CONFIG.source_count.thresholds;
  if (sourceCount >= thresholds[4]) scores.source_count = 20;
  else if (sourceCount >= thresholds[3]) scores.source_count = 16;
  else if (sourceCount >= thresholds[2]) scores.source_count = 12;
  else if (sourceCount >= thresholds[1]) scores.source_count = 8;
  else if (sourceCount >= thresholds[0]) scores.source_count = 4;

  // Score individual sources
  let totalGithubQuality = 0;
  let totalLicenseSafety = 0;
  let totalOfficialDocs = 0;
  let githubCount = 0;

  for (const source of dossier.sources) {
    const { details } = scoreSource(source);

    if (details.github_quality !== undefined) {
      totalGithubQuality += details.github_quality;
      githubCount++;
    }

    if (details.license_safety !== undefined) {
      totalLicenseSafety += details.license_safety;
    }

    if (details.official_docs !== undefined) {
      totalOfficialDocs += details.official_docs;
    }
  }

  // Average GitHub quality (max 20)
  if (githubCount > 0) {
    scores.github_quality = Math.min(20, Math.round(totalGithubQuality / githubCount));
  }

  // License safety (use best score, max 15)
  scores.license_safety = Math.min(15, totalLicenseSafety);

  // Official docs (max 15)
  scores.official_docs = Math.min(15, totalOfficialDocs);

  // Maintenance scoring (based on recent updates)
  const now = new Date();
  const recentThreshold = new Date(now.getTime() - SCORING_CONFIG.maintenance.recent_days * 24 * 60 * 60 * 1000);
  let recentCount = 0;

  for (const source of dossier.sources) {
    if (source.last_updated) {
      const lastUpdated = new Date(source.last_updated);
      if (lastUpdated >= recentThreshold) {
        recentCount++;
      }
    }
  }

  if (recentCount >= 3) scores.maintenance = 10;
  else if (recentCount >= 2) scores.maintenance = 7;
  else if (recentCount >= 1) scores.maintenance = 4;

  // Pattern clarity (heuristic based on used_for field)
  let clarityScore = 0;
  for (const source of dossier.sources) {
    if (source.used_for && Array.isArray(source.used_for) && source.used_for.length > 0) {
      clarityScore += 2;
    }
  }
  scores.pattern_clarity = Math.min(10, clarityScore);

  // Testability (heuristic based on copy_policy and source types)
  let testabilityScore = 0;
  for (const source of dossier.sources) {
    if (source.copy_policy === 'patterns_only') {
      testabilityScore += 2;
    }
    if (source.source_type === 'github_repo') {
      testabilityScore += 1;
    }
  }
  scores.testability = Math.min(10, testabilityScore);

  // Calculate total
  scores.total = Object.values(scores).reduce((sum, val) => sum + val, 0);

  return scores;
}

/**
 * Load and score all dossiers from the references directory
 */
export function scoreAllDossiers() {
  const referencesDir = path.join(repoRoot, 'references');
  const results = [];

  function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.name.endsWith('.sources.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const dossier = JSON.parse(content);
          const scores = scoreDossier(dossier);

          results.push({
            path: path.relative(repoRoot, fullPath),
            dossier_id: dossier.dossier_id,
            agent_id: dossier.agent_id || dossier.skill_id || dossier.workflow_id,
            domain: dossier.domain,
            scores,
            source_count: dossier.sources?.length || 0
          });
        } catch (error) {
          console.error(`Error processing ${fullPath}:`, error.message);
        }
      }
    }
  }

  processDirectory(referencesDir);
  return results;
}

/**
 * Generate a report of dossier scores
 */
export function generateScoreReport(results) {
  const report = {
    total_dossiers: results.length,
    average_score: 0,
    score_distribution: {
      excellent: 0, // 90-100
      good: 0, // 80-89
      fair: 0, // 70-79
      poor: 0 // <70
    },
    by_domain: {},
    low_scoring: []
  };

  let totalScore = 0;

  for (const result of results) {
    totalScore += result.scores.total;

    // Distribution
    if (result.scores.total >= 90) report.score_distribution.excellent++;
    else if (result.scores.total >= 80) report.score_distribution.good++;
    else if (result.scores.total >= 70) report.score_distribution.fair++;
    else report.score_distribution.poor++;

    // By domain
    const domain = result.domain || 'unknown';
    if (!report.by_domain[domain]) {
      report.by_domain[domain] = { count: 0, total_score: 0, average: 0 };
    }
    report.by_domain[domain].count++;
    report.by_domain[domain].total_score += result.scores.total;

    // Low scoring
    if (result.scores.total < 70) {
      report.low_scoring.push({
        path: result.path,
        agent_id: result.agent_id,
        score: result.scores.total
      });
    }
  }

  report.average_score = Math.round(totalScore / results.length);

  // Calculate domain averages
  for (const domain in report.by_domain) {
    const data = report.by_domain[domain];
    data.average = Math.round(data.total_score / data.count);
  }

  return report;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Scoring all dossiers...\n');

  const results = scoreAllDossiers();
  const report = generateScoreReport(results);

  console.log(`Total dossiers: ${report.total_dossiers}`);
  console.log(`Average score: ${report.average_score}/100\n`);

  console.log('Score distribution:');
  console.log(`  Excellent (90-100): ${report.score_distribution.excellent}`);
  console.log(`  Good (80-89): ${report.score_distribution.good}`);
  console.log(`  Fair (70-79): ${report.score_distribution.fair}`);
  console.log(`  Poor (<70): ${report.score_distribution.poor}\n`);

  console.log('By domain:');
  for (const [domain, data] of Object.entries(report.by_domain).sort((a, b) => b[1].average - a[1].average)) {
    console.log(`  ${domain}: ${data.average}/100 (${data.count} dossiers)`);
  }

  if (report.low_scoring.length > 0) {
    console.log(`\nLow scoring dossiers (<70):`);
    for (const item of report.low_scoring.slice(0, 10)) {
      console.log(`  ${item.path}: ${item.score}/100`);
    }
  }

  // Write detailed results
  const outputPath = path.join(repoRoot, 'reports', 'dossier-scores.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify({ report, results }, null, 2));
  console.log(`\nDetailed results written to: ${outputPath}`);
}
