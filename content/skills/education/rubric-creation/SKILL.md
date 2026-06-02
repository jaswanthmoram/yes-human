---
id: education.rubric-creation
name: Rubric Creation
version: 1.0.0
domain: education
category: education.assessment
purpose: Design scoring rubrics with clear criteria levels, performance descriptors, and point values aligned to learning objectives and assessments.
summary: Building analytic and holistic rubrics with defined criteria levels, descriptors, and scoring scales for consistent evaluation.
triggers:
  - create a rubric
  - rubric design
  - scoring rubric development
  - performance criteria rubric
  - analytic rubric creation
aliases:
  - rubric
  - scoring rubric
negative_keywords:
  - pricing table
  - comparison matrix
  - feature checklist
inputs:
  - learning_objectives
  - assessment_task
  - performance_dimensions
outputs:
  - rubric
  - scoring_descriptors
  - calibration_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates rubric without clear performance level descriptors
  - Criteria not aligned to learning objectives
  - Scoring scale lacks differentiation between levels
verification:
  - Descriptors specific and distinguishable
  - Criteria aligned to objectives
  - Scoring scale clearly differentiated
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
Design scoring rubrics with clear criteria levels, performance descriptors, and point values aligned to learning objectives for consistent and fair evaluation.

## When To Use
- Creating analytic or holistic rubrics for assignments
- Designing performance criteria for projects or presentations
- Building calibration guides for inter-rater reliability
- Adapting existing rubrics for new assessments

## When Not To Use
- Full assessment design belongs to assessment-design skill
- Survey rating scales belong to research domain
- Employee evaluation forms belong to HR domain

## Procedure
1. Identify the learning objectives the rubric will assess.
2. Define performance dimensions or criteria.
3. Establish the scoring scale with clear level labels.
4. Write specific, distinguishable descriptors for each level.
5. Assign point values and calculate total score range.
6. Create calibration guide with anchor examples.

## Tool Policy
- Use `filesystem.read` to access learning objectives and sample work.
- Use `filesystem.write` to save rubrics and calibration guides.

## Verification
- Each criterion maps to a learning objective
- Descriptors at each level are specific and distinguishable
- Calibration guide includes anchor work examples

## Failure Modes
- Writing vague descriptors that lead to inconsistent scoring
- Creating criteria that do not align to learning objectives
- Scoring scale with too few or too many levels

## Example Routes
- "create a rubric for persuasive essay grade 9"
- "rubric design for science lab report"
- "scoring rubric development for group project"

## Source Notes
- Brookhart's rubric design principles
- AAC&U VALUE rubrics framework
- Reference: ref.github.education.2026-05-31
