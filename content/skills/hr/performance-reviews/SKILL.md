---
id: hr.performance-reviews
name: Performance Reviews
version: 1.0.0
domain: hr
category: hr.performance-management
purpose: Design performance review frameworks, calibration processes, and feedback structures for fair and consistent evaluation.
summary: Review framework design, calibration process creation, feedback structure building, and growth plan templates.
triggers:
  - design performance review framework
  - create calibration process
  - build feedback structure
  - performance review template
  - growth plan design
aliases:
  - performance reviews
  - performance evaluation
  - review framework
negative_keywords:
  - job description
  - compensation analysis
  - employee handbook
inputs:
  - role_family
  - review_cycle
  - evaluation_goals
outputs:
  - review_framework
  - calibration_process
  - feedback_structure
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs review without role context
  - Omits calibration guidance
  - Ignores growth path structure
verification:
  - Role context defined
  - Calibration guidance included
  - Growth path structure present
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
Design performance review frameworks, calibration processes, and feedback structures for fair and consistent evaluation.

## When To Use
- Designing performance review frameworks
- Creating calibration processes
- Building feedback structures

## When Not To Use
- Job descriptions belong to job-description-writing skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Define role family and review cycle context.
2. Design review framework with clear evaluation criteria.
3. Create calibration process for consistency.
4. Build feedback structure with actionable guidance.
5. Include growth plan templates.

## Tool Policy
- Use `filesystem.read` to access role profiles and existing review frameworks.
- Use `filesystem.write` to save review frameworks and templates.

## Verification
- Role context defined for each family
- Calibration guidance included
- Growth path structure present

## Failure Modes
- Designing review without role context
- Omitting calibration guidance
- Ignoring growth path structure

## Example Routes
- "design performance review framework for engineers"
- "create calibration process for managers"
- "build feedback structure for quarterly reviews"

## Source Notes
- SHRM performance management guidelines, open employee handbook patterns
- Reference: ref.github.hr.2026-05-31
