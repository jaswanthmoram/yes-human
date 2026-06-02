---
id: legal-compliance.contract-drafting
name: Contract Drafting
version: 1.0.0
domain: legal-compliance
category: legal-compliance.contract-drafting
purpose: Draft contract clauses, agreement templates, and commercial terms following legal-compliance review standards.
summary: Contract clause drafting, template creation, and commercial term structuring for legal review.
triggers:
  - draft contract clause
  - create agreement template
  - write commercial terms
  - draft indemnification clause
  - create service agreement
aliases:
  - contract drafting
  - agreement drafting
negative_keywords:
  - code generation
  - UI mockup
  - sales pitch
inputs:
  - clause_type
  - jurisdiction
  - business_context
outputs:
  - draft_clause
  - template_structure
  - review_checklist
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
Draft contract clauses, agreement templates, and commercial terms following legal-compliance review standards.

## When To Use
- draft contract clause
- create agreement template
- write commercial terms
- draft indemnification clause

## When Not To Use
- code generation belongs to a different domain
- UI mockup belongs to a different domain
- sales pitch belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: clause_type, jurisdiction, business_context.
3. Produce the core outputs: draft_clause, template_structure, review_checklist.
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
- "draft contract clause"
- "create agreement template"
- "write commercial terms"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
