---
id: hr.employee-engagement
name: Employee Engagement
version: 1.0.0
domain: hr
category: hr.employee-experience
purpose: Design employee engagement surveys, pulse check programs, and action planning frameworks.
summary: Engagement survey design, pulse check creation, action planning, and engagement metric tracking.
triggers:
  - design engagement survey
  - create pulse check program
  - build engagement action plan
  - employee satisfaction measurement
  - engagement metric tracking
aliases:
  - employee engagement
  - engagement survey
  - pulse check
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - engagement_goals
  - organizational_context
  - measurement_needs
outputs:
  - engagement_survey
  - pulse_check_program
  - action_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs survey without action planning
  - Omits anonymity and confidentiality
  - Ignores follow-up communication
verification:
  - Action planning included
  - Anonymity addressed
  - Follow-up process defined
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
Design employee engagement surveys, pulse check programs, and action planning frameworks.

## When To Use
- Designing employee engagement surveys
- Creating pulse check programs
- Building engagement action plans

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Define engagement goals and measurement needs.
2. Design survey with validated engagement dimensions.
3. Ensure anonymity and confidentiality protections.
4. Create action planning framework for results.
5. Define follow-up communication process.

## Tool Policy
- Use `filesystem.read` to access engagement data and survey templates.
- Use `filesystem.write` to save survey designs and action plans.

## Verification
- Action planning included with survey design
- Anonymity and confidentiality addressed
- Follow-up process defined

## Failure Modes
- Designing survey without action planning
- Omitting anonymity and confidentiality
- Ignoring follow-up communication

## Example Routes
- "design annual engagement survey"
- "create quarterly pulse check program"
- "build engagement action plan template"

## Source Notes
- Gallup Q12 framework, SHRM employee engagement resources
- Reference: ref.github.hr.2026-05-31
