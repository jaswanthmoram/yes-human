---
id: legal-compliance.risk-assessment
name: Risk Assessment
version: 1.0.0
domain: legal-compliance
category: legal-compliance.risk-assessment
purpose: Conduct legal risk assessments, identify exposure areas, and prioritize mitigation strategies.
summary: Legal risk identification, exposure assessment, and mitigation strategy prioritization.
triggers:
  - conduct legal risk assessment
  - identify risk exposure
  - prioritize legal risks
  - risk mitigation planning
  - liability assessment
aliases:
  - risk assessment
  - legal risk assessment
negative_keywords:
  - security risk assessment
  - infrastructure risk
  - deployment risk
inputs:
  - risk_domain
  - assessment_scope
  - risk_criteria
outputs:
  - risk_register
  - exposure_analysis
  - mitigation_priorities
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
Conduct legal risk assessments, identify exposure areas, and prioritize mitigation strategies.

## When To Use
- conduct legal risk assessment
- identify risk exposure
- prioritize legal risks
- risk mitigation planning

## When Not To Use
- security risk assessment belongs to a different domain
- infrastructure risk belongs to a different domain
- deployment risk belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: risk_domain, assessment_scope, risk_criteria.
3. Produce the core outputs: risk_register, exposure_analysis, mitigation_priorities.
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
- "conduct legal risk assessment"
- "identify risk exposure"
- "prioritize legal risks"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
