---
id: hr.talent-management
name: Talent Management
version: 1.0.0
domain: hr
category: hr.talent-management
purpose: Design integrated talent management strategies spanning acquisition, development, retention, and mobility.
summary: Talent strategy design, talent review frameworks, high-potential identification, and career path development.
triggers:
  - design talent management strategy
  - create talent review process
  - identify high potentials
  - build career paths
  - talent management framework
aliases:
  - talent management
  - talent strategy
  - talent review
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - business_strategy
  - talent_priorities
  - workforce_capabilities
outputs:
  - talent_strategy
  - talent_review_framework
  - career_path_design
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs strategy without business alignment
  - Omits high-potential identification criteria
  - Ignores retention and mobility components
verification:
  - Business alignment defined
  - HiPo criteria defined
  - Retention and mobility addressed
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
Design integrated talent management strategies spanning acquisition, development, retention, and mobility.

## When To Use
- Designing talent management strategies
- Creating talent review processes
- Building career path frameworks

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Align talent strategy with business strategy.
2. Define high-potential identification criteria.
3. Design talent review process and calibration.
4. Build career path frameworks with mobility options.
5. Include retention and development components.

## Tool Policy
- Use `filesystem.read` to access talent data and strategy documents.
- Use `filesystem.write` to save talent strategies and frameworks.

## Verification
- Business alignment defined for talent strategy
- High-potential criteria defined
- Retention and mobility addressed

## Failure Modes
- Designing strategy without business alignment
- Omitting high-potential identification criteria
- Ignoring retention and mobility components

## Example Routes
- "design integrated talent management strategy"
- "create talent review process"
- "build career path framework for engineers"

## Source Notes
- SHRM talent management frameworks, CCL talent development resources
- Reference: ref.github.hr.2026-05-31
