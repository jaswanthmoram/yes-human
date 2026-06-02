---
id: hr.benefits-administration
name: Benefits Administration
version: 1.0.0
domain: hr
category: hr.total-rewards
purpose: Design benefits programs, enrollment processes, and employee benefits communication strategies.
summary: Benefits program design, enrollment process creation, vendor evaluation, and benefits communication planning.
triggers:
  - design benefits program
  - create benefits enrollment process
  - benefits vendor evaluation
  - benefits communication plan
  - employee benefits review
aliases:
  - benefits administration
  - benefits management
  - employee benefits
negative_keywords:
  - performance review
  - job description
  - employee handbook
inputs:
  - employee_needs
  - budget_constraints
  - regulatory_requirements
outputs:
  - benefits_program_design
  - enrollment_process
  - communication_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs benefits without employee needs assessment
  - Ignores regulatory compliance
  - Omits communication strategy
verification:
  - Employee needs assessed
  - Regulatory compliance addressed
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
Design benefits programs, enrollment processes, and employee benefits communication strategies.

## When To Use
- Designing employee benefits programs
- Creating benefits enrollment processes
- Planning benefits communication strategies

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Job descriptions belong to job-description-writing skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Assess employee needs and preferences.
2. Design benefits program within budget constraints.
3. Address regulatory compliance requirements.
4. Create enrollment process and timeline.
5. Develop benefits communication plan.

## Tool Policy
- Use `filesystem.read` to access benefits data and regulatory requirements.
- Use `filesystem.write` to save benefits program designs.

## Verification
- Employee needs assessed and documented
- Regulatory compliance addressed
- Communication plan included

## Failure Modes
- Designing benefits without employee needs assessment
- Ignoring regulatory compliance
- Omitting communication strategy

## Example Routes
- "design health benefits program"
- "create open enrollment process"
- "plan benefits communication for employees"

## Source Notes
- SHRM benefits administration guidelines, DOL benefits compliance resources
- Reference: ref.github.hr.2026-05-31
