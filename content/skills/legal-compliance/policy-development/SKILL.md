---
id: legal-compliance.policy-development
name: Policy Development
version: 1.0.0
domain: legal-compliance
category: legal-compliance.policy-development
purpose: Develop internal policies, compliance procedures, and governance frameworks with stakeholder review.
summary: Internal policy creation, compliance procedure drafting, and governance framework development.
triggers:
  - develop internal policy
  - draft compliance procedure
  - create governance framework
  - policy template creation
  - procedure documentation
aliases:
  - policy development
  - policy creation
negative_keywords:
  - product policy
  - cache policy
  - security policy code
inputs:
  - policy_domain
  - stakeholder_requirements
  - regulatory_context
outputs:
  - policy_draft
  - implementation_guide
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
Develop internal policies, compliance procedures, and governance frameworks with stakeholder review.

## When To Use
- develop internal policy
- draft compliance procedure
- create governance framework
- policy template creation

## When Not To Use
- product policy belongs to a different domain
- cache policy belongs to a different domain
- security policy code belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: policy_domain, stakeholder_requirements, regulatory_context.
3. Produce the core outputs: policy_draft, implementation_guide, review_checklist.
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
- "develop internal policy"
- "draft compliance procedure"
- "create governance framework"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
