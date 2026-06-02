---
id: hr.training-development
name: Training and Development
version: 1.0.0
domain: hr
category: hr.learning-development
purpose: Design training programs, learning paths, and development initiatives aligned with organizational needs.
summary: Training program design, learning path creation, development initiative planning, and training effectiveness measurement.
triggers:
  - design training program
  - create learning path
  - plan development initiative
  - training needs analysis
  - learning program design
aliases:
  - training development
  - l&d
  - learning development
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - training_needs
  - learner_profiles
  - organizational_goals
outputs:
  - training_program
  - learning_path
  - effectiveness_metrics
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs training without needs analysis
  - Omits effectiveness measurement
  - Ignores learner diversity
verification:
  - Needs analysis completed
  - Effectiveness metrics defined
  - Learner diversity addressed
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
Design training programs, learning paths, and development initiatives aligned with organizational needs.

## When To Use
- Designing training programs
- Creating learning paths
- Planning development initiatives

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Conduct training needs analysis.
2. Design training program with clear learning objectives.
3. Create learning paths for different roles and levels.
4. Define effectiveness measurement criteria.
5. Address learner diversity and accessibility.

## Tool Policy
- Use `filesystem.read` to access training materials and needs assessments.
- Use `filesystem.write` to save training programs and learning paths.

## Verification
- Needs analysis completed and documented
- Effectiveness metrics defined
- Learner diversity addressed

## Failure Modes
- Designing training without needs analysis
- Omitting effectiveness measurement
- Ignoring learner diversity

## Example Routes
- "design leadership training program"
- "create onboarding learning path"
- "plan technical development initiative"

## Source Notes
- ATD training design frameworks, SHRM learning development resources
- Reference: ref.github.hr.2026-05-31
