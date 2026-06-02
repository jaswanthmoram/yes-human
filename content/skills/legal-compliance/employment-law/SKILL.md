---
id: legal-compliance.employment-law
name: Employment Law
version: 1.0.0
domain: legal-compliance
category: legal-compliance.employment-law
purpose: Review employment agreements, workplace policies, and labor compliance with HR-legal coordination.
summary: Employment agreement review, workplace policy analysis, and labor compliance assessment.
triggers:
  - review employment agreement
  - analyze workplace policy
  - labor compliance check
  - employee handbook review
  - termination clause analysis
aliases:
  - employment law
  - labor law review
negative_keywords:
  - code review
  - product review
  - design review
inputs:
  - agreement_type
  - jurisdiction
  - policy_documents
outputs:
  - agreement_analysis
  - policy_flags
  - compliance_assessment
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
Review employment agreements, workplace policies, and labor compliance with HR-legal coordination.

## When To Use
- review employment agreement
- analyze workplace policy
- labor compliance check
- employee handbook review

## When Not To Use
- code review belongs to a different domain
- product review belongs to a different domain
- design review belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: agreement_type, jurisdiction, policy_documents.
3. Produce the core outputs: agreement_analysis, policy_flags, compliance_assessment.
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
- "review employment agreement"
- "analyze workplace policy"
- "labor compliance check"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
