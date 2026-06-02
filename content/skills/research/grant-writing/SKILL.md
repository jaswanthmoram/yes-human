---
id: research.grant-writing
name: Grant Writing
version: 1.0.0
category: research.planning
summary: Prepares grant applications with funder-aligned narratives, budget justification, impact statements, and compliance documentation.
triggers:
  - grant application drafting
  - funding proposal writing
  - grant budget preparation
  - impact statement creation
  - funder compliance check
prerequisites:
  - funder_guidelines_obtained
steps:
  - analyze funder priorities and guidelines
  - align research narrative to funder mission
  - prepare detailed budget justification
  - draft impact and dissemination plan
  - compile compliance documentation
outputs:
  - grant_application
  - budget_justification
  - impact_statement
budget_band: expanded
rollback:
  - archive application drafts
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a task requires preparing a grant application or funding proposal for a research project.

## Prerequisites
- Funder guidelines and evaluation criteria obtained.
- A developed research proposal or concept.

## Steps
1. Analyze the funder priorities, evaluation criteria, and submission guidelines.
2. Align the research narrative to the funder mission and strategic goals.
3. Prepare a detailed budget with justification for each line item.
4. Draft an impact statement covering academic, societal, and economic impact.
5. Compile all required compliance documents (ethics, data management, CVs).

## Verification
- Application addresses all evaluation criteria.
- Budget items are justified and within funder limits.

## Rollback
- Archive application drafts and supporting documents.

## Common Failures
- Misalignment between research goals and funder priorities.
- Budget items lacking clear justification.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
