---
id: legal-compliance.privacy-compliance
name: Privacy Compliance
version: 1.0.0
domain: legal-compliance
category: legal-compliance.privacy-compliance
purpose: Assess privacy program compliance across frameworks, conduct DPIAs, and review data processing activities.
summary: Privacy compliance assessment, DPIA methodology, and data processing activity review.
triggers:
  - privacy compliance assessment
  - conduct dpia
  - review data processing
  - privacy program audit
  - consent mechanism review
aliases:
  - privacy compliance
  - data privacy compliance
negative_keywords:
  - code compliance
  - build compliance
  - accessibility compliance
inputs:
  - processing_activities
  - privacy_frameworks
  - data_flows
outputs:
  - compliance_assessment
  - dpia_report
  - remediation_plan
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
Assess privacy program compliance across frameworks, conduct DPIAs, and review data processing activities.

## When To Use
- privacy compliance assessment
- conduct dpia
- review data processing
- privacy program audit

## When Not To Use
- code compliance belongs to a different domain
- build compliance belongs to a different domain
- accessibility compliance belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: processing_activities, privacy_frameworks, data_flows.
3. Produce the core outputs: compliance_assessment, dpia_report, remediation_plan.
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
- "privacy compliance assessment"
- "conduct dpia"
- "review data processing"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
