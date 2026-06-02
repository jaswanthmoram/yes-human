---
id: hr.onboarding-processes
name: Onboarding Processes
version: 1.0.0
domain: hr
category: hr.employee-lifecycle
purpose: Design comprehensive onboarding programs with structured ramp plans, checklists, and manager handoff processes.
summary: Onboarding program design, ramp plan creation, checklist building, and manager handoff coordination.
triggers:
  - design onboarding program
  - create onboarding checklist
  - build ramp plan
  - onboarding process design
  - new hire orientation plan
aliases:
  - onboarding
  - onboarding process
  - new hire onboarding
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - role_context
  - team_structure
  - ramp_expectations
outputs:
  - onboarding_program
  - ramp_plan
  - onboarding_checklist
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs onboarding without role-specific goals
  - Omits manager handoff steps
  - Ignores cultural integration
verification:
  - Role-specific goals defined
  - Manager handoff included
  - Cultural integration addressed
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
Design comprehensive onboarding programs with structured ramp plans, checklists, and manager handoff processes.

## When To Use
- Designing onboarding programs for new hires
- Creating onboarding checklists
- Building ramp plans for specific roles

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Gather role context, team structure, and ramp expectations.
2. Define role-specific onboarding goals and milestones.
3. Create structured checklist with owners and timelines.
4. Design manager handoff and check-in cadence.
5. Include cultural integration and social onboarding.

## Tool Policy
- Use `filesystem.read` to access role profiles and existing onboarding materials.
- Use `filesystem.write` to save onboarding programs and checklists.

## Verification
- Role-specific goals defined with milestones
- Manager handoff steps included
- Cultural integration addressed

## Failure Modes
- Designing onboarding without role-specific goals
- Omitting manager handoff steps
- Ignoring cultural integration

## Example Routes
- "design onboarding program for engineers"
- "create onboarding checklist for new managers"
- "build 30-60-90 day ramp plan"

## Source Notes
- SHRM onboarding best practices, open employee handbook patterns
- Reference: ref.github.hr.2026-05-31
