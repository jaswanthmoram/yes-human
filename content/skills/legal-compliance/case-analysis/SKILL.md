---
id: legal-compliance.case-analysis
name: Case Analysis
version: 1.0.0
domain: legal-compliance
category: legal-compliance.case-analysis
purpose: Analyze legal cases for precedent value, factual patterns, and applicability to current matters.
summary: Legal case analysis, precedent evaluation, and pattern identification for attorney review.
triggers:
  - analyze legal case
  - evaluate precedent value
  - case pattern analysis
  - compare case holdings
  - case applicability assessment
aliases:
  - case analysis
  - case law analysis
negative_keywords:
  - data analysis
  - business analytics
  - performance analysis
inputs:
  - case_citation
  - analysis_scope
  - current_matter_context
outputs:
  - case_summary
  - precedent_value
  - applicability_assessment
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Performs analysis without naming scope or jurisdiction
  - Presents findings as definitive legal conclusions
  - Omits attorney-review or compliance-owner handoff
verification:
  - Scope and jurisdiction named in output
  - Findings include severity or applicability ratings
  - Attorney-review or compliance-owner handoff included
source_references:
  - ref.github.legal-compliance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Analyze legal cases for precedent value, factual patterns, and applicability to current matters.

## When To Use
- analyze legal case
- evaluate precedent value
- case pattern analysis
- compare case holdings

## When Not To Use
- data analysis belongs to a different domain
- business analytics belongs to a different domain
- performance analysis belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: case_citation, analysis_scope, current_matter_context.
3. Produce the core outputs: case_summary, precedent_value, applicability_assessment.
4. Name the jurisdiction and scope explicitly.
5. Separate findings from recommended next steps.
6. End with attorney-review or compliance-owner handoff.

## Tool Policy
- Use `filesystem.read` to access documents and reference materials.
- Use `filesystem.write` to save analysis outputs and reports.

## Verification
- Scope and jurisdiction named in every output
- Findings include severity or applicability ratings
- Attorney-review or compliance-owner handoff included

## Failure Modes
- Performing analysis without naming scope or jurisdiction
- Presenting findings as definitive legal conclusions
- Omitting attorney-review or compliance-owner handoff

## Example Routes
- "analyze legal case"
- "evaluate precedent value"
- "case pattern analysis"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
