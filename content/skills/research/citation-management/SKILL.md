---
id: research.citation-management
name: Citation Management
version: 1.0.0
category: research.writing
summary: Manages research citations with reference formatting, bibliography generation, duplicate detection, and style compliance.
triggers:
  - citation formatting task
  - bibliography generation
  - reference list cleanup
  - citation style conversion
  - duplicate reference detection
prerequisites:
  - reference_data_available
steps:
  - import references from source files
  - detect and merge duplicate entries
  - apply target citation style
  - generate formatted bibliography
  - validate citation completeness
outputs:
  - formatted_bibliography
  - reference_database
  - style_compliance_report
budget_band: micro
rollback:
  - restore previous bibliography version
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task requires formatting, organizing, or converting citations and reference lists.

## Prerequisites
- Reference data in BibTeX, RIS, or structured format.
- Target citation style specified (APA, Chicago, IEEE, etc.).

## Steps
1. Import references from BibTeX, RIS, or other source files.
2. Detect and merge duplicate entries using DOI and title matching.
3. Apply the target citation style formatting rules.
4. Generate a formatted bibliography in the required output format.
5. Validate that all required fields (authors, year, title, source) are present.

## Verification
- All citations follow the target style consistently.
- No duplicate entries remain in the bibliography.

## Rollback
- Restore a previous version of the bibliography.

## Common Failures
- Missing metadata fields causing incomplete citations.
- Inconsistent application of style rules across entries.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
