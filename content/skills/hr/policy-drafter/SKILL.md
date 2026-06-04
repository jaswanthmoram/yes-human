---
quality_gate: production
id: hr.policy-drafter
name: HR Policy Drafting
version: 1.0.0
domain: hr
category: hr.policy
purpose: Draft HR policy structures with clear scope, employee-facing language, exception handling, and review gates.
summary: HR policy drafting turns company requirements into readable policies while requiring legal, HR, and leadership review before publication.
triggers:
  - hr policy draft
  - policy drafter task
  - employee handbook policy
  - draft workplace policy
  - revise HR policy
activation_triggers:
  - draft an HR policy
  - update the handbook policy
prerequisites:
  - Policy objective and employee population are defined
  - Jurisdictions and review owners are identified
  - Existing handbook or policy template is available when applicable
inputs:
  - policy_objective
  - employee_population
  - jurisdiction_scope
  - existing_policy_template
steps:
  - Define policy purpose, scope, eligibility, definitions, owner, and effective date.
  - Draft employee-facing rules in plain language with examples and non-examples.
  - Add exception path, escalation owner, recordkeeping notes, and review cadence.
  - Flag jurisdiction-sensitive or legal-risk sections for counsel review.
  - Check consistency with existing handbook language and company tone.
  - Produce a review checklist for HR, legal, finance, and leadership as needed.
outputs:
  - policy_draft
  - review_checklist
  - risk_notes
  - employee_faq
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Legal and HR review gate is explicit
  - Policy scope and effective date are clear
  - Employee-facing language is plain and enforceable
failure_modes:
  - Presenting policy as legal advice
  - Missing jurisdiction-specific review
  - Drafting vague rules that cannot be applied consistently
handoffs:
  - hr.hr-compliance
  - legal-compliance.employment-lawyer
source_references:
  - ref.github.hr.policy-drafter.2026-06-02
  - https://github.com/hmrc/design-patterns
allowed_agents:
  - hr.policy-drafter
status: active
budget_band: standard
rollback:
  - Revert policy draft artifact
validators:
  - skill.validator
  - human_review_gate_present
---

## Procedure

1. Clarify the policy goal, audience, jurisdiction, and required reviewers.
2. Draft purpose, scope, definitions, rules, examples, exceptions, and enforcement path.
3. Compare against existing handbook and related policies for contradictions.
4. Add explicit review gates and implementation notes.
5. Prepare employee FAQ and rollout notes.

## Verification

- HR and legal review are required before publication.
- Jurisdiction-sensitive language is flagged.
- The policy can be applied consistently by managers.
