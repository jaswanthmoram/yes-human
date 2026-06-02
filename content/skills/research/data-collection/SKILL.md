---
id: research.data-collection
name: Data Collection
version: 1.0.0
category: research.data-collection
summary: Plans and executes research data collection with sampling protocols, instrument deployment, and data quality monitoring.
triggers:
  - data collection planning
  - research data gathering
  - sampling protocol execution
  - field data collection setup
  - data quality monitoring
prerequisites:
  - collection_protocol_approved
steps:
  - finalize sampling frame and recruitment
  - deploy data collection instruments
  - monitor data quality during collection
  - handle incomplete or invalid responses
  - compile and validate final dataset
outputs:
  - collection_log
  - compiled_dataset
  - quality_report
budget_band: expanded
rollback:
  - archive partial collections for audit
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task requires planning or executing primary data collection from human participants, documents, or systems.

## Prerequisites
- An approved data collection protocol with defined instruments.
- Ethics clearance where human participants are involved.

## Steps
1. Finalize the sampling frame and participant recruitment strategy.
2. Deploy data collection instruments (surveys, interviews, observations).
3. Monitor data quality during collection with predefined checks.
4. Handle incomplete or invalid responses using documented rules.
5. Compile and validate the final dataset with quality metrics.

## Verification
- Response rates meet pre-defined thresholds.
- Data quality checks pass for completeness and consistency.

## Rollback
- Archive partial collections for audit trail purposes.

## Common Failures
- Low response rates compromising statistical power.
- Inconsistent data entry across collection sites.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
