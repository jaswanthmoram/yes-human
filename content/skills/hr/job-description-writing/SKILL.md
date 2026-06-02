---
id: hr.job-description-writing
name: Job Description Writing
version: 1.0.0
domain: hr
category: hr.talent-acquisition
purpose: Create clear, inclusive, and legally compliant job descriptions that attract diverse candidates.
summary: Job description structure, competency mapping, inclusive language, and role requirement definition.
triggers:
  - write job description
  - create job posting
  - draft role description
  - job ad writing
  - position description
aliases:
  - job description
  - jd writing
  - job posting
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - role_requirements
  - team_context
  - competency_framework
outputs:
  - job_description
  - competency_list
  - inclusive_language_review
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Writes description without role criteria
  - Uses exclusionary or biased language
  - Omits essential vs preferred qualifications
verification:
  - Role criteria defined
  - Inclusive language used
  - Essential and preferred qualifications separated
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
Create clear, inclusive, and legally compliant job descriptions that attract diverse candidates.

## When To Use
- Writing new job descriptions or postings
- Refreshing existing role descriptions
- Creating position descriptions for hiring

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Gather role requirements, team context, and competency framework.
2. Define essential and preferred qualifications.
3. Write description using inclusive language.
4. Map competencies to role responsibilities.
5. Review for bias and legal compliance.

## Tool Policy
- Use `filesystem.read` to access role profiles and competency frameworks.
- Use `filesystem.write` to save job descriptions.

## Verification
- Role criteria defined with essential and preferred qualifications
- Inclusive language review completed
- Competencies mapped to responsibilities

## Failure Modes
- Writing description without role criteria
- Using exclusionary or biased language
- Omitting essential vs preferred qualifications

## Example Routes
- "write job description for senior engineer"
- "create job posting for product manager"
- "draft role description for data analyst"

## Source Notes
- SHRM job description guidelines, EEOC best practices
- Reference: ref.github.hr.2026-05-31
