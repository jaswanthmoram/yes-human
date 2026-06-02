---
id: hr.interview-techniques
name: Interview Techniques
version: 1.0.0
domain: hr
category: hr.talent-acquisition
purpose: Design structured interview processes, question banks, and evaluation rubrics for consistent candidate assessment.
summary: Structured interview design, behavioral question frameworks, scoring rubrics, and interviewer training guides.
triggers:
  - design interview process
  - create interview questions
  - build interview rubric
  - structured interview framework
  - interviewer training guide
aliases:
  - interview techniques
  - interview design
  - interview process
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - role_criteria
  - interview_goals
  - assessment_dimensions
outputs:
  - interview_guide
  - question_bank
  - scoring_rubric
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs interview without structured criteria
  - Creates questions without scoring guidance
  - Omits bias mitigation techniques
verification:
  - Structured criteria defined
  - Scoring guidance included
  - Bias mitigation addressed
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
Design structured interview processes, question banks, and evaluation rubrics for consistent candidate assessment.

## When To Use
- Designing structured interview processes
- Creating interview question banks
- Building evaluation rubrics for interviews

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Define role criteria and assessment dimensions.
2. Create behavioral and situational questions mapped to dimensions.
3. Build scoring rubrics with clear rating scales.
4. Include bias mitigation guidance for interviewers.
5. Create interviewer training materials.

## Tool Policy
- Use `filesystem.read` to access role profiles and existing interview guides.
- Use `filesystem.write` to save interview guides and rubrics.

## Verification
- Structured criteria defined for each dimension
- Scoring guidance included with rating scales
- Bias mitigation techniques addressed

## Failure Modes
- Designing interview without structured criteria
- Creating questions without scoring guidance
- Omitting bias mitigation techniques

## Example Routes
- "design interview process for engineering roles"
- "create behavioral interview questions"
- "build interview scoring rubric"

## Source Notes
- SHRM structured interview frameworks, EEOC interview best practices
- Reference: ref.github.hr.2026-05-31
