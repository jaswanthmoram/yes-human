---
id: legal-compliance.trademark-search
name: Trademark Search
version: 1.0.0
domain: legal-compliance
category: legal-compliance.trademark-search
purpose: Conduct trademark clearance searches, analyze conflicting marks, and assess registration risks.
summary: Trademark clearance search methodology, conflict analysis, and registration risk assessment.
triggers:
  - trademark clearance search
  - search for conflicting marks
  - trademark conflict analysis
  - mark similarity assessment
  - registration risk check
aliases:
  - trademark search
  - mark search
negative_keywords:
  - web search
  - code search
  - file search
inputs:
  - proposed_mark
  - goods_services
  - jurisdiction_set
outputs:
  - search_results
  - conflict_analysis
  - registration_risk
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
Conduct trademark clearance searches, analyze conflicting marks, and assess registration risks.

## When To Use
- trademark clearance search
- search for conflicting marks
- trademark conflict analysis
- mark similarity assessment

## When Not To Use
- web search belongs to a different domain
- code search belongs to a different domain
- file search belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: proposed_mark, goods_services, jurisdiction_set.
3. Produce the core outputs: search_results, conflict_analysis, registration_risk.
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
- "trademark clearance search"
- "search for conflicting marks"
- "trademark conflict analysis"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
