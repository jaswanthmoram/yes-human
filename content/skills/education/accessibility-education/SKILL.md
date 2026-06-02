---
id: education.accessibility-education
name: Accessibility in Education
version: 1.0.0
domain: education
category: education.inclusion
purpose: Ensure educational content, platforms, and environments meet accessibility standards (WCAG, UDL) for learners with diverse needs.
summary: Educational accessibility auditing and design using WCAG, UDL guidelines, and inclusive design principles for equitable learning.
triggers:
  - education accessibility audit
  - WCAG compliance education
  - UDL implementation
  - accessible course design
  - inclusive learning materials
aliases:
  - education a11y
  - accessible education
negative_keywords:
  - website accessibility audit
  - building code compliance
  - physical accessibility
inputs:
  - educational_content
  - accessibility_standards
  - learner_needs
outputs:
  - accessibility_report
  - remediation_plan
  - udl_guidelines
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Audits without testing with assistive technologies
  - Remediation plan ignores UDL principles
  - Overlooks cognitive and neurodiverse accessibility
verification:
  - WCAG compliance checked
  - UDL principles applied
  - Assistive technology tested
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
Ensure educational content, platforms, and environments meet accessibility standards using WCAG, UDL guidelines, and inclusive design principles for equitable learning.

## When To Use
- Auditing educational content for accessibility compliance
- Implementing UDL principles in course design
- Creating accessible learning materials and assessments
- Reviewing educational technology for accessibility

## When Not To Use
- General website accessibility belongs to design-content domain
- Physical building accessibility belongs to facilities
- Software-only accessibility belongs to engineering domain

## Procedure
1. Identify applicable accessibility standards (WCAG 2.1, Section 508).
2. Audit educational content against accessibility criteria.
3. Test with assistive technologies (screen readers, magnifiers).
4. Apply UDL principles for multiple means of engagement, representation, and action.
5. Create remediation plan prioritized by impact.
6. Document accessibility features and known limitations.

## Tool Policy
- Use `filesystem.read` to access content and accessibility standards.
- Use `filesystem.write` to save audit reports and remediation plans.

## Verification
- WCAG 2.1 AA compliance checked for digital content
- UDL principles applied across engagement, representation, and action
- Assistive technology testing documented

## Failure Modes
- Auditing without testing with actual assistive technologies
- Focusing only on visual accessibility while ignoring cognitive needs
- Creating remediation plans without prioritization by learner impact

## Example Routes
- "education accessibility audit for online course"
- "WCAG compliance education platform review"
- "UDL implementation for science curriculum"

## Source Notes
- WCAG 2.1 guidelines (W3C)
- Universal Design for Learning (CAST)
- Section 508 and ADA compliance requirements
- Reference: ref.github.education.2026-05-31
