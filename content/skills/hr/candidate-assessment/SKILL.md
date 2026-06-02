---
id: hr.candidate-assessment
name: Candidate Assessment
version: 1.0.0
domain: hr
category: hr.talent-acquisition
purpose: Design candidate assessment frameworks including skills tests, work samples, and evaluation criteria.
summary: Assessment design, work sample creation, skills testing frameworks, and candidate evaluation criteria.
triggers:
  - design candidate assessment
  - create work sample test
  - build skills assessment
  - candidate evaluation criteria
  - assessment center design
aliases:
  - candidate assessment
  - skills testing
  - work samples
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - role_requirements
  - assessment_goals
  - validation_criteria
outputs:
  - assessment_framework
  - work_sample_design
  - evaluation_criteria
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs assessment without job relevance
  - Omits validity and reliability considerations
  - Ignores accessibility requirements
verification:
  - Job relevance demonstrated
  - Validity addressed
  - Accessibility considered
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
Design candidate assessment frameworks including skills tests, work samples, and evaluation criteria.

## When To Use
- Designing candidate assessment processes
- Creating work sample tests
- Building skills assessment frameworks

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Define role requirements and assessment goals.
2. Design assessments with demonstrated job relevance.
3. Create work samples and skills tests.
4. Address validity and reliability considerations.
5. Ensure accessibility requirements are met.

## Tool Policy
- Use `filesystem.read` to access role profiles and assessment templates.
- Use `filesystem.write` to save assessment designs.

## Verification
- Job relevance demonstrated for each assessment component
- Validity and reliability addressed
- Accessibility requirements considered

## Failure Modes
- Designing assessment without job relevance
- Omitting validity and reliability considerations
- Ignoring accessibility requirements

## Example Routes
- "design candidate assessment for engineering role"
- "create work sample test for designers"
- "build skills assessment framework"

## Source Notes
- SHRM assessment design guidelines, EEOC uniform guidelines on employee selection
- Reference: ref.github.hr.2026-05-31
