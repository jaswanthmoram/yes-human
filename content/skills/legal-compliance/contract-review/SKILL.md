---
id: legal-compliance.contract-review
name: Contract Review
version: 1.0.0
domain: legal-compliance
category: legal-compliance.contract-review
purpose: Review contracts for risk identification, clause analysis, and compliance with standard terms playbook.
summary: Contract risk review, clause-by-clause analysis, and standard terms comparison for legal handoff.
triggers:
  - review contract for risks
  - analyze contract clauses
  - compare terms to playbook
  - flag non-standard terms
  - contract risk assessment
aliases:
  - contract review
  - agreement review
negative_keywords:
  - code review
  - performance review
  - design review
inputs:
  - contract_document
  - standard_playbook
  - review_priorities
outputs:
  - clause_analysis
  - risk_flags
  - playbook_comparison
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
Review contracts for risk identification, clause analysis, and compliance with standard terms playbook.

## When To Use
- review contract for risks
- analyze contract clauses
- compare terms to playbook
- flag non-standard terms

## When Not To Use
- code review belongs to a different domain
- performance review belongs to a different domain
- design review belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: contract_document, standard_playbook, review_priorities.
3. Produce the core outputs: clause_analysis, risk_flags, playbook_comparison.
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
- "review contract for risks"
- "analyze contract clauses"
- "compare terms to playbook"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
