---
id: design-content.content-templates
name: Content Templates
version: 1.0.0
domain: design-content
category: design-content.content-strategy
purpose: Create reusable content templates for consistent production across teams and channels.
summary: Content template design for blog posts, landing pages, emails, and other content types with structure and guidelines.
triggers:
  - content template creation
  - blog post template design
  - landing page template
  - email template structure
  - content type template
aliases:
  - content templates
  - content type templates
negative_keywords:
  - one-off content writing
  - code implementation
  - visual design only
inputs:
  - content_type
  - brand_guidelines
  - audience_requirements
outputs:
  - content_template
  - structure_guidelines
  - usage_instructions
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Template without structure guidelines
  - Missing usage instructions
  - Ignores brand guidelines
verification:
  - Structure guidelines defined
  - Usage instructions included
  - Brand guidelines followed
source_references:
  - ref.github.design-content.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Create reusable content templates for consistent production across teams and channels.

## When To Use
- Creating templates for recurring content types
- Standardizing content structure across teams
- Setting up content production workflows

## When Not To Use
- One-off content writing (use copywriter or seo-writer agents)
- Code implementation (use engineering domain)
- Visual design only (use figma-design skill)

## Procedure
1. Define content type and its purpose.
2. Create structural outline with required sections.
3. Add writing guidelines for each section.
4. Include brand voice and tone instructions.
5. Provide usage instructions and examples.

## Tool Policy
- Use `filesystem.read` to review brand guidelines and examples.
- Use `filesystem.write` to produce template files.

## Verification
- Structure guidelines defined
- Usage instructions included
- Brand guidelines followed

## Source Notes
Content Design London templates, Gather Content templates, HubSpot content templates. Reference: ref.github.design-content.2026-05-31
