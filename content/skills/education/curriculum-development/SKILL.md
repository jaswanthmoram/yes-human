---
id: education.curriculum-development
name: Curriculum Development
version: 1.0.0
domain: education
category: education.curriculum
purpose: Design comprehensive curriculum frameworks including scope and sequence, unit plans, and standards-aligned learning progressions.
summary: End-to-end curriculum development from needs analysis through implementation with standards alignment and review cycles.
triggers:
  - develop a curriculum
  - curriculum framework design
  - scope and sequence creation
  - curriculum needs analysis
  - learning progression design
aliases:
  - curriculum dev
  - curriculum build
negative_keywords:
  - marketing campaign
  - financial model
  - code review
inputs:
  - learner_population
  - standards_or_competencies
  - curriculum_scope
outputs:
  - curriculum_framework
  - scope_and_sequence
  - implementation_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Develops curriculum without needs analysis
  - Skips standards alignment verification
  - Omits review and revision cycles
verification:
  - Needs analysis completed
  - Standards mapped to all units
  - Review cycle defined
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
Design comprehensive curriculum frameworks including scope and sequence, unit plans, and standards-aligned learning progressions for defined learner populations.

## When To Use
- Developing new curriculum from scratch
- Redesigning existing curriculum for new standards
- Creating scope and sequence documents
- Building learning progressions across grade levels

## When Not To Use
- Single lesson planning belongs to lesson-planning skill
- Assessment-only design belongs to assessment-design skill
- Course marketing belongs to marketing domain

## Procedure
1. Conduct needs analysis for the target learner population.
2. Map standards or competencies to curriculum units.
3. Design scope and sequence with prerequisite dependencies.
4. Create unit-level learning progressions.
5. Build in review and revision cycles.
6. Document implementation guidance for educators.

## Tool Policy
- Use `filesystem.read` to access standards documents and existing curriculum.
- Use `filesystem.write` to save curriculum frameworks and guides.

## Verification
- Needs analysis documented with learner population details
- Every standard mapped to at least one curriculum unit
- Review cycle with timeline defined

## Failure Modes
- Developing curriculum without understanding learner needs
- Skipping standards alignment verification step
- Omitting review and revision cycles from the plan

## Example Routes
- "develop a curriculum for grade 6 science"
- "curriculum framework design for workforce training"
- "scope and sequence creation for algebra"

## Source Notes
- Wiggins & McTighe Understanding by Design
- Common Core State Standards, NGSS frameworks
- Reference: ref.github.education.2026-05-31
