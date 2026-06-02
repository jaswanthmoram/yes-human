---
id: hr.succession-planning
name: Succession Planning
version: 1.0.0
domain: hr
category: hr.talent-management
purpose: Design succession planning frameworks, critical role identification, and leadership pipeline development.
summary: Succession framework design, critical role mapping, readiness assessment, and leadership pipeline building.
triggers:
  - design succession plan
  - identify critical roles
  - assess leadership readiness
  - build leadership pipeline
  - succession planning framework
aliases:
  - succession planning
  - succession plan
  - leadership pipeline
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - organizational_structure
  - critical_roles
  - leadership_needs
outputs:
  - succession_framework
  - readiness_assessment
  - pipeline_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Plans without critical role identification
  - Omits readiness assessment criteria
  - Ignores development path for successors
verification:
  - Critical roles identified
  - Readiness criteria defined
  - Development paths included
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
Design succession planning frameworks, critical role identification, and leadership pipeline development.

## When To Use
- Designing succession planning frameworks
- Identifying critical roles for succession
- Building leadership pipelines

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Identify critical roles and organizational structure.
2. Define readiness assessment criteria for each role.
3. Map potential successors and their development needs.
4. Build leadership pipeline with development paths.
5. Create review and update cadence for succession plans.

## Tool Policy
- Use `filesystem.read` to access organizational charts and role profiles.
- Use `filesystem.write` to save succession frameworks and pipeline plans.

## Verification
- Critical roles identified and prioritized
- Readiness criteria defined for each role
- Development paths included for potential successors

## Failure Modes
- Planning without critical role identification
- Omitting readiness assessment criteria
- Ignoring development path for successors

## Example Routes
- "design succession plan for executive roles"
- "identify critical roles for succession"
- "build leadership pipeline framework"

## Source Notes
- SHRM succession planning guidelines, CCL leadership development frameworks
- Reference: ref.github.hr.2026-05-31
