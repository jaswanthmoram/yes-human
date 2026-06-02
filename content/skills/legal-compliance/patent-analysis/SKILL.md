---
id: legal-compliance.patent-analysis
name: Patent Analysis
version: 1.0.0
domain: legal-compliance
category: legal-compliance.patent-analysis
purpose: Analyze patent landscapes, evaluate patentability, and identify freedom-to-operate risks.
summary: Patent landscape analysis, patentability evaluation, and freedom-to-operate assessment.
triggers:
  - patent landscape analysis
  - evaluate patentability
  - freedom to operate search
  - prior art search
  - patent claim analysis
aliases:
  - patent analysis
  - patent research
negative_keywords:
  - code analysis
  - data analysis
  - performance analysis
inputs:
  - technology_area
  - patent_scope
  - jurisdiction_set
outputs:
  - landscape_report
  - patentability_assessment
  - fto_analysis
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
Analyze patent landscapes, evaluate patentability, and identify freedom-to-operate risks.

## When To Use
- patent landscape analysis
- evaluate patentability
- freedom to operate search
- prior art search

## When Not To Use
- code analysis belongs to a different domain
- data analysis belongs to a different domain
- performance analysis belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: technology_area, patent_scope, jurisdiction_set.
3. Produce the core outputs: landscape_report, patentability_assessment, fto_analysis.
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
- "patent landscape analysis"
- "evaluate patentability"
- "freedom to operate search"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
