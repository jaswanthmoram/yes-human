---
id: education.lesson-planning
name: Lesson Planning
version: 1.0.0
domain: education
category: education.instruction
purpose: Create detailed lesson plans with objectives, activities, timing, differentiation, and formative checks aligned to curriculum goals.
summary: Structured lesson plan creation with objectives, activities, differentiation strategies, and embedded formative assessment.
triggers:
  - create a lesson plan
  - lesson plan design
  - daily lesson structure
  - lesson activity sequence
  - lesson plan template
aliases:
  - lesson plan
  - lesson design
negative_keywords:
  - curriculum framework
  - marketing plan
  - project roadmap
inputs:
  - learning_objectives
  - lesson_duration
  - learner_readiness
outputs:
  - lesson_plan
  - activity_sequence
  - differentiation_notes
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Plans without measurable objectives
  - Activities not timed or paced
  - No differentiation for diverse learners
verification:
  - Objectives measurable and stated
  - Activities timed and sequenced
  - Differentiation strategies included
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
Create detailed lesson plans with measurable objectives, timed activities, differentiation strategies, and embedded formative assessment checks.

## When To Use
- Creating individual lesson plans
- Designing daily lesson structures
- Building activity sequences for specific learning objectives
- Adapting lessons for diverse learner needs

## When Not To Use
- Full curriculum design belongs to curriculum-development skill
- Assessment-only design belongs to assessment-design skill
- Course-level planning belongs to online-course-design skill

## Procedure
1. Define measurable learning objectives using Bloom's taxonomy.
2. Sequence activities with explicit timing and transitions.
3. Embed formative checks at key points in the lesson.
4. Add differentiation strategies for varied learner readiness.
5. Include materials list and technology requirements.
6. Note assessment criteria and success indicators.

## Tool Policy
- Use `filesystem.read` to access curriculum maps and standards.
- Use `filesystem.write` to save lesson plans and templates.

## Verification
- Objectives stated in measurable terms with Bloom's level
- Activities sequenced with time allocations
- At least two differentiation strategies included

## Failure Modes
- Writing lesson plans without measurable objectives
- Activities not timed leading to pacing issues
- No differentiation for diverse learner needs

## Example Routes
- "create a lesson plan for photosynthesis grade 7"
- "lesson plan design for introduction to fractions"
- "daily lesson structure for ESL beginners"

## Source Notes
- Madeline Hunter lesson plan model
- Gradual Release of Responsibility framework
- Reference: ref.github.education.2026-05-31
