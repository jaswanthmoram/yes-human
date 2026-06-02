---
id: legal-compliance.due-diligence
name: Due Diligence
version: 1.0.0
domain: legal-compliance
category: legal-compliance.due-diligence
purpose: Conduct legal due diligence reviews, organize data rooms, and flag transaction risks for attorney review.
summary: Legal due diligence methodology, data room organization, and transaction risk flagging.
triggers:
  - conduct due diligence
  - organize data room
  - transaction risk review
  - diligence checklist
  - acquisition screening
aliases:
  - due diligence
  - legal diligence
negative_keywords:
  - code diligence
  - technical due diligence
  - financial audit
inputs:
  - transaction_type
  - diligence_scope
  - document_inventory
outputs:
  - diligence_report
  - risk_flags
  - document_index
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
Conduct legal due diligence reviews, organize data rooms, and flag transaction risks for attorney review.

## When To Use
- conduct due diligence
- organize data room
- transaction risk review
- diligence checklist

## When Not To Use
- code diligence belongs to a different domain
- technical due diligence belongs to a different domain
- financial audit belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: transaction_type, diligence_scope, document_inventory.
3. Produce the core outputs: diligence_report, risk_flags, document_index.
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
- "conduct due diligence"
- "organize data room"
- "transaction risk review"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
