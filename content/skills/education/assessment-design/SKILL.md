---
id: education.assessment-design
name: Assessment Design
version: 1.0.0
domain: education
category: education.assessment
purpose: Design valid and reliable assessments including formative checks, summative exams, and performance tasks aligned to learning objectives.
summary: Creating valid assessments aligned to objectives with clear scoring criteria, item specifications, and fairness considerations.
triggers:
  - design an assessment
  - create a test blueprint
  - formative assessment design
  - summative exam creation
  - performance task design
aliases:
  - assessment creation
  - test design
negative_keywords:
  - survey design
  - marketing quiz
  - employee evaluation
inputs:
  - learning_objectives
  - assessment_purpose
  - target_population
outputs:
  - assessment_blueprint
  - item_specifications
  - scoring_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Designs assessment without alignment to objectives
  - Omits scoring criteria or rubrics
  - Ignores accessibility and fairness in item design
verification:
  - Objectives mapped to items
  - Scoring criteria defined
  - Fairness review included
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
Design valid and reliable assessments including formative checks, summative exams, and performance tasks aligned to learning objectives with clear scoring criteria.

## When To Use
- Designing formative or summative assessments
- Creating test blueprints and item specifications
- Building performance-based assessment tasks
- Developing scoring guides and answer keys

## When Not To Use
- Rubric-only creation belongs to rubric-creation skill
- Survey design belongs to research domain
- Employee performance evaluation belongs to HR domain

## Procedure
1. Map each learning objective to assessment items or tasks.
2. Create assessment blueprint with item distribution.
3. Write item specifications including cognitive level targets.
4. Develop scoring guides or rubrics for each item.
5. Review items for bias, accessibility, and fairness.
6. Pilot or review items before final deployment.

## Tool Policy
- Use `filesystem.read` to access learning objectives and standards.
- Use `filesystem.write` to save assessment blueprints and items.

## Verification
- Every objective has at least one aligned assessment item
- Scoring criteria defined for all items
- Fairness and bias review documented

## Failure Modes
- Creating assessments that test untaught content
- Omitting scoring criteria leading to inconsistent grading
- Ignoring accessibility barriers in assessment design

## Example Routes
- "design an assessment for grade 8 history unit"
- "create a test blueprint for biology final exam"
- "performance task design for engineering course"

## Source Notes
- AERA/APA/NCME Standards for Educational Testing
- Webb's Depth of Knowledge alignment
- Reference: ref.github.education.2026-05-31
