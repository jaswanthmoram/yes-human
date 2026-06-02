---
id: hr.hr-policies
name: HR Policies
version: 1.0.0
domain: hr
category: hr.compliance
purpose: Design HR policies that are clear, inclusive, and compliant with employment regulations.
summary: Policy drafting, policy review frameworks, compliance alignment, and policy communication planning.
triggers:
  - draft hr policy
  - create workplace policy
  - review existing policy
  - policy compliance check
  - policy communication plan
aliases:
  - hr policies
  - workplace policies
  - policy drafting
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - policy_topic
  - regulatory_context
  - organizational_values
outputs:
  - policy_draft
  - compliance_review
  - communication_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Drafts policy without regulatory awareness
  - Omits inclusivity considerations
  - Ignores communication and rollout plan
verification:
  - Regulatory caution attached
  - Inclusivity addressed
  - Communication plan included
source_references:
  - ref.github.hr.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design HR policies that are clear, inclusive, and compliant with employment regulations.

## When To Use
- Drafting new HR policies
- Reviewing existing policies
- Planning policy communication

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Define policy topic and scope.
2. Research regulatory context and requirements.
3. Draft policy with clear language and examples.
4. Review for inclusivity and compliance.
5. Create communication and rollout plan.

## Tool Policy
- Use `filesystem.read` to access existing policies and regulatory references.
- Use `filesystem.write` to save policy drafts and communication plans.

## Verification
- Regulatory caution attached to policy
- Inclusivity considerations addressed
- Communication plan included

## Failure Modes
- Drafting policy without regulatory awareness
- Omitting inclusivity considerations
- Ignoring communication and rollout plan

## Example Routes
- "draft remote work policy"
- "create anti-harassment policy"
- "review existing leave policy"

## Source Notes
- SHRM policy templates, EEOC and DOL guidance, open employee handbooks
- Reference: ref.github.hr.2026-05-31
