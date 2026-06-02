---
id: research.systematic-review
name: Systematic Review
version: 1.0.0
category: research.methodology
summary: Conducts PRISMA-compliant systematic reviews with protocol registration, dual screening, and risk-of-bias assessment.
triggers:
  - systematic review execution
  - PRISMA review process
  - structured evidence review
  - protocol-driven literature review
  - bias assessment study
prerequisites:
  - review_protocol_registered
steps:
  - register review protocol
  - execute systematic search
  - screen titles and abstracts
  - full text screening
  - extract data and assess bias
  - synthesize findings
outputs:
  - prisma_flow_diagram
  - data_extraction_table
  - synthesis_report
budget_band: expanded
rollback:
  - archive screening state for resumption
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a task requires a rigorous, reproducible literature review following PRISMA or equivalent systematic review guidelines.

## Prerequisites
- A registered or documented review protocol (PROSPERO or equivalent).
- Access to academic databases.

## Steps
1. Register or document the review protocol with objectives and eligibility criteria.
2. Execute systematic search across multiple databases with documented strategies.
3. Screen titles and abstracts against inclusion criteria.
4. Perform full-text screening on remaining records.
5. Extract data using standardized forms and assess risk of bias.
6. Synthesize findings narratively or quantitatively.

## Verification
- PRISMA flow diagram accounts for all records.
- Data extraction covers all pre-specified fields.

## Rollback
- Archive screening state so the review can be resumed.

## Common Failures
- Inconsistent application of inclusion criteria across screeners.
- Insufficient reporting of search strategies for reproducibility.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
