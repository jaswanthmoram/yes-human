---
id: research.research-data-management
name: Research Data Management
version: 1.0.0
category: research.governance
summary: Plans and implements research data management with FAIR principles, data management plans, metadata standards, and preservation strategies.
triggers:
  - data management plan creation
  - FAIR data compliance check
  - research data preservation
  - metadata standard setup
  - data sharing preparation
prerequisites:
  - research_data_exists
steps:
  - assess current data management practices
  - create data management plan
  - apply FAIR metadata standards
  - configure data storage and backup
  - prepare data for sharing and preservation
outputs:
  - data_management_plan
  - metadata_schema
  - sharing_readiness_report
budget_band: standard
rollback:
  - restore previous data management configuration
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task requires planning data management, creating a DMP, or preparing data for sharing and long-term preservation.

## Prerequisites
- Research data exists or is being collected.
- Funder or institutional data management requirements identified.

## Steps
1. Assess current data management practices against FAIR principles.
2. Create a data management plan covering collection, storage, and sharing.
3. Apply FAIR-compliant metadata standards to all datasets.
4. Configure secure data storage with backup and version control.
5. Prepare data for sharing with appropriate licenses and documentation.

## Verification
- DMP addresses all funder and institutional requirements.
- Datasets have sufficient metadata for discovery and reuse.

## Rollback
- Restore previous data management configuration.

## Common Failures
- Inadequate metadata preventing data reuse.
- Missing consent for data sharing in human subjects research.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
