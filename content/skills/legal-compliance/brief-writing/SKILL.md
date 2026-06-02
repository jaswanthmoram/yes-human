---
id: legal-compliance.brief-writing
name: Brief Writing
version: 1.0.0
domain: legal-compliance
category: legal-compliance.brief-writing
purpose: Draft legal briefs with proper structure, argument development, and citation authority for attorney review.
summary: Legal brief drafting, argument structuring, and authority citation for attorney review.
triggers:
  - draft legal brief
  - structure legal argument
  - write appellate brief
  - brief outline creation
  - argument authority research
aliases:
  - brief writing
  - legal brief drafting
negative_keywords:
  - project brief
  - design brief
  - product brief
inputs:
  - brief_type
  - argument_scope
  - citation_requirements
outputs:
  - brief_draft
  - argument_outline
  - authority_table
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
Draft legal briefs with proper structure, argument development, and citation authority for attorney review.

## When To Use
- draft legal brief
- structure legal argument
- write appellate brief
- brief outline creation

## When Not To Use
- project brief belongs to a different domain
- design brief belongs to a different domain
- product brief belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: brief_type, argument_scope, citation_requirements.
3. Produce the core outputs: brief_draft, argument_outline, authority_table.
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
- "draft legal brief"
- "structure legal argument"
- "write appellate brief"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
