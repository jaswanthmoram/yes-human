---
id: meta-system.dossier-creation
name: Dossier Creation and Source Assembly
version: 1.0.0
domain: meta-system
category: meta-system.dossier
purpose: Create dossiers with proper source provenance, quality scoring, and promotion tracking.
summary: Systematic approach to creating dossiers that meet quality thresholds and staging requirements.
triggers:
  - create dossier
  - assemble source dossier
  - build agent dossier
  - produce workflow dossier
  - dossier source assembly
activation_triggers:
  - dossier creation
  - source dossier assembly
  - dossier building
prerequisites:
  - target agent or workflow identified
  - sources available
  - scoring criteria defined
inputs:
  - target_entity
  - source_list
  - scoring_criteria
steps:
  - Identify target entity and scope
  - Gather candidate sources
  - Validate source provenance
  - Check license compatibility
  - Score source quality
  - Assemble dossier artifact
  - Calculate total dossier score
  - Determine promotion decision
  - Write dossier file
  - Validate with quality gates
outputs:
  - dossier_artifact
  - source_provenance_report
  - quality_score
  - promotion_decision
tools:
  - filesystem.read (read sources and existing dossiers)
  - filesystem.write (write dossier files)
quality_gates:
  - Sources validated for provenance
  - License compatibility checked
  - Quality score calculated
  - Promotion decision grounded
  - Dossier score >= 80
failure_modes:
  - Creating dossiers without provenance checks
  - Ignoring license compatibility
  - Inflating quality scores
  - Promoting below threshold
  - Missing source metadata
handoffs:
  - meta-system.dossier-evaluator (to evaluate dossier quality)
  - meta-system.source-miner (to find additional sources)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.dossier-evaluator
  - meta-system.source-miner
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert dossier file
  - Restore previous dossier version
validators:
  - skill.validator
---

## Trigger
Use this skill when creating dossiers, assembling source dossiers, or building agent/workflow dossiers.

## Prerequisites
- Target agent or workflow identified
- Sources available
- Scoring criteria defined

## Steps
1. **Identify Target**: Define the entity and scope for the dossier.
2. **Gather Sources**: Collect candidate sources with full metadata.
3. **Validate Provenance**: Check source origin, type, and reliability.
4. **Check License**: Verify license compatibility with yes-human (MIT).
5. **Score Quality**: Apply scoring criteria to each source.
6. **Assemble Dossier**: Merge sources into a structured dossier artifact.
7. **Calculate Score**: Compute total dossier score from component scores.
8. **Determine Promotion**: Compare score against threshold (>= 80 for staging).
9. **Write File**: Save the dossier in the references directory.
10. **Validate**: Run through quality gates.

## Verification
- All quality gates passed
- Dossier score >= 80
- Provenance validated
- License compatibility confirmed

## Common Failures
- Creating dossiers without provenance checks
- Ignoring license compatibility
- Inflating quality scores without evidence
