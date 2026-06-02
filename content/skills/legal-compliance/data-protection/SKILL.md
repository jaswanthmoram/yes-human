---
id: legal-compliance.data-protection
name: Data Protection
version: 1.0.0
domain: legal-compliance
category: legal-compliance.data-protection
purpose: Evaluate data protection measures, review processing agreements, and assess cross-border transfer mechanisms.
summary: Data protection assessment, processing agreement review, and cross-border transfer evaluation.
triggers:
  - data protection assessment
  - review processing agreement
  - cross-border transfer evaluation
  - data protection audit
  - safeguard adequacy review
aliases:
  - data protection
  - data safeguarding
negative_keywords:
  - data backup
  - data encryption code
  - database protection
inputs:
  - data_categories
  - transfer_mechanisms
  - processing_agreements
outputs:
  - protection_assessment
  - transfer_analysis
  - safeguard_recommendations
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
Evaluate data protection measures, review processing agreements, and assess cross-border transfer mechanisms.

## When To Use
- data protection assessment
- review processing agreement
- cross-border transfer evaluation
- data protection audit

## When Not To Use
- data backup belongs to a different domain
- data encryption code belongs to a different domain
- database protection belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: data_categories, transfer_mechanisms, processing_agreements.
3. Produce the core outputs: protection_assessment, transfer_analysis, safeguard_recommendations.
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
- "data protection assessment"
- "review processing agreement"
- "cross-border transfer evaluation"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
