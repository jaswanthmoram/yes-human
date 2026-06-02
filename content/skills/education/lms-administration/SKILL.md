---
id: education.lms-administration
name: LMS Administration
version: 1.0.0
domain: education
category: education.technology
purpose: Configure, manage, and optimize learning management systems for course delivery, learner tracking, and institutional reporting.
summary: LMS setup, configuration, and optimization for course delivery, gradebook management, and institutional analytics.
triggers:
  - configure LMS
  - learning management system setup
  - LMS course configuration
  - gradebook setup LMS
  - LMS optimization
aliases:
  - LMS admin
  - learning management
negative_keywords:
  - CRM administration
  - database management
  - server configuration
inputs:
  - lms_platform
  - course_structure
  - institutional_requirements
outputs:
  - lms_configuration
  - course_template
  - reporting_setup
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Configures LMS without accessibility compliance
  - Omits gradebook and reporting setup
  - Ignores learner navigation experience
verification:
  - Accessibility compliance checked
  - Gradebook configured and tested
  - Navigation tested for learners
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
Configure, manage, and optimize learning management systems for effective course delivery, learner tracking, and institutional reporting.

## When To Use
- Setting up a new LMS or migrating courses
- Configuring course templates and gradebooks
- Optimizing LMS for accessibility and usability
- Setting up institutional reporting and analytics

## When Not To Use
- CRM administration belongs to sales domain
- Database management belongs to engineering domain
- Server configuration belongs to platform domain

## Procedure
1. Identify institutional requirements for the LMS platform.
2. Configure course templates with consistent structure.
3. Set up gradebook with appropriate weighting and categories.
4. Configure accessibility settings and compliance checks.
5. Test learner navigation and user experience.
6. Set up reporting dashboards for institutional analytics.

## Tool Policy
- Use `filesystem.read` to access institutional requirements and course data.
- Use `filesystem.write` to save configuration documentation and templates.

## Verification
- Accessibility compliance verified (WCAG 2.1 AA minimum)
- Gradebook configured with correct weighting and categories
- Learner navigation tested across device types

## Failure Modes
- Configuring LMS without checking accessibility compliance
- Omitting gradebook setup leading to grading errors
- Ignoring learner navigation experience causing confusion

## Example Routes
- "configure LMS for semester course rollout"
- "learning management system setup for online program"
- "LMS optimization for accessibility compliance"

## Source Notes
- Moodle, Canvas, Blackboard administration guides
- Quality Matters LMS design standards
- Reference: ref.github.education.2026-05-31
