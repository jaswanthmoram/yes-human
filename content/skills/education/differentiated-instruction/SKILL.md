---
id: education.differentiated-instruction
name: Differentiated Instruction
version: 1.0.0
domain: education
category: education.inclusion
purpose: Design differentiated learning experiences that address varied learner readiness, interests, and profiles within inclusive classrooms.
summary: Differentiation strategies for content, process, product, and environment based on learner readiness, interest, and profile data.
triggers:
  - differentiated instruction plan
  - differentiation strategies
  - tiered assignment design
  - flexible grouping plan
  - differentiated assessment
aliases:
  - differentiation
  - differentiated learning
negative_keywords:
  - individualized education plan
  - special education referral
  - personalized marketing
inputs:
  - learner_profiles
  - content_objectives
  - classroom_context
outputs:
  - differentiation_plan
  - tiered_activities
  - grouping_strategy
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Differentiates without learner profile data
  - Creates tiers that track students permanently
  - Ignores interest-based differentiation
verification:
  - Learner profiles used
  - Flexible grouping included
  - Multiple differentiation dimensions addressed
source_references:
  - ref.github.education.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design differentiated learning experiences that address varied learner readiness, interests, and profiles within inclusive classroom settings.

## When To Use
- Planning differentiated instruction for diverse classrooms
- Creating tiered assignments at multiple readiness levels
- Designing flexible grouping strategies
- Adapting assessments for varied learner profiles

## When Not To Use
- IEP development belongs to special-education agent
- Special education referral belongs to special-education agent
- Personalized marketing belongs to marketing domain

## Procedure
1. Analyze learner profiles for readiness, interest, and learning profile.
2. Identify content objectives that can be differentiated.
3. Design tiered activities at multiple readiness levels.
4. Create flexible grouping strategies that avoid permanent tracking.
5. Adapt assessment options for varied learner needs.
6. Document differentiation decisions and rationale.

## Tool Policy
- Use `filesystem.read` to access learner profiles and curriculum materials.
- Use `filesystem.write` to save differentiation plans and tiered activities.

## Verification
- Learner profiles analyzed across readiness, interest, and profile
- Flexible grouping avoids permanent tracking
- At least three dimensions of differentiation addressed

## Failure Modes
- Differentiating without understanding learner profiles
- Creating rigid tiers that permanently track students
- Only differentiating by readiness while ignoring interest and profile

## Example Routes
- "differentiated instruction plan for mixed-ability classroom"
- "tiered assignment design for reading comprehension"
- "flexible grouping plan for math workshop"

## Source Notes
- Tomlinson's differentiated instruction model
- Carol Ann Tomlinson's Ready-Differentiation framework
- Reference: ref.github.education.2026-05-31
