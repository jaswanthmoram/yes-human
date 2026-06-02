---
id: education.online-course-design
name: Online Course Design
version: 1.0.0
domain: education
category: education.instruction
purpose: Design complete online courses with modular structure, multimedia content, interactive activities, and assessment strategies for digital delivery.
summary: End-to-end online course design with modular units, multimedia integration, engagement strategies, and quality assurance checkpoints.
triggers:
  - design an online course
  - online course structure
  - digital course creation
  - e-learning course design
  - MOOC course planning
aliases:
  - online course
  - e-learning design
negative_keywords:
  - website design
  - app development
  - marketing funnel
inputs:
  - course_topic
  - target_audience
  - delivery_platform
outputs:
  - course_structure
  - content_plan
  - engagement_strategy
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Designs course without modular structure
  - Omits engagement and interaction strategies
  - Ignores accessibility in multimedia content
verification:
  - Modular structure defined
  - Engagement strategies included
  - Accessibility reviewed for all media
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
Design complete online courses with modular structure, multimedia content, interactive activities, and assessment strategies for effective digital learning.

## When To Use
- Designing new online courses from scratch
- Converting face-to-face courses to online format
- Structuring MOOCs or self-paced courses
- Planning multimedia content for digital delivery

## When Not To Use
- Website design belongs to design-content domain
- App development belongs to engineering domain
- Marketing funnel creation belongs to marketing domain

## Procedure
1. Define course outcomes and target learner profile.
2. Design modular course structure with units and lessons.
3. Plan multimedia content with accessibility in mind.
4. Create interactive activities and discussion prompts.
5. Design assessment strategy with formative and summative checks.
6. Build quality assurance checklist for course review.

## Tool Policy
- Use `filesystem.read` to access platform requirements and course templates.
- Use `filesystem.write` to save course structures and content plans.

## Verification
- Modular structure with clear unit and lesson boundaries
- Engagement strategies for each module documented
- Accessibility review completed for all multimedia content

## Failure Modes
- Designing courses as content dumps without interaction
- Omitting engagement strategies leading to low completion
- Ignoring accessibility barriers in multimedia content

## Example Routes
- "design an online course for data literacy"
- "online course structure for professional development"
- "e-learning course design for compliance training"

## Source Notes
- Quality Matters Higher Education Rubric
- Community of Inquiry framework (Garrison, Anderson, Archer)
- Reference: ref.github.education.2026-05-31
