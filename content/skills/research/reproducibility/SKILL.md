---
id: research.reproducibility
name: Reproducibility
version: 1.0.0
category: research.quality
summary: Ensures research reproducibility with protocol documentation, code and data sharing, environment specification, and replication verification.
triggers:
  - reproducibility assessment
  - replication verification task
  - research transparency check
  - protocol documentation review
  - open science compliance
prerequisites:
  - research_outputs_available
steps:
  - audit documentation completeness
  - verify code and data availability
  - check environment specification
  - attempt computational reproduction
  - produce reproducibility report
outputs:
  - reproducibility_report
  - gap_analysis
  - remediation_plan
budget_band: standard
rollback:
  - archive audit artifacts
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task requires assessing or improving the reproducibility of published findings, code, or data analyses.

## Prerequisites
- Research outputs (paper, code, data) available for assessment.
- Access to computational environment for replication attempts.

## Steps
1. Audit the completeness of method and analysis documentation.
2. Verify that code and data are publicly available or accessible.
3. Check that the computational environment is fully specified.
4. Attempt computational reproduction of key results.
5. Produce a reproducibility report with gaps and remediation suggestions.

## Verification
- Key results can be reproduced from available materials.
- Environment specification covers all dependencies.

## Rollback
- Archive audit artifacts and intermediate files.

## Common Failures
- Undocumented preprocessing steps preventing reproduction.
- Missing random seeds causing non-deterministic results.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
