---
id: design-content.style-guides
name: Style Guides
version: 1.0.0
domain: design-content
category: design-content.content-strategy
purpose: Create and maintain content style guides for consistent writing across teams.
summary: Content style guide creation covering voice, tone, grammar, terminology, and formatting conventions.
triggers:
  - style guide creation
  - content style definition
  - writing standards setup
  - terminology guide creation
  - style guide update
aliases:
  - style guide
  - content style
negative_keywords:
  - visual style guide
  - code style guide
  - database schema
inputs:
  - brand_voice
  - audience_profile
  - existing_content_samples
outputs:
  - style_guide_document
  - terminology_glossary
  - formatting_conventions
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Style guide without voice and tone section
  - Missing terminology glossary
  - No formatting conventions
verification:
  - Voice and tone section defined
  - Terminology glossary included
  - Formatting conventions documented
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
Create and maintain content style guides for consistent writing across teams.

## When To Use
- Creating a new content style guide
- Updating an existing style guide
- Standardizing writing across teams

## When Not To Use
- Visual style guide (use brand-guidelines skill)
- Code style guide (use engineering domain)
- Database schema (use engineering.database-design)

## Procedure
1. Review brand voice and existing content samples.
2. Define voice and tone guidelines with examples.
3. Create terminology glossary and preferred terms.
4. Document formatting conventions (headings, lists, code).
5. Establish review and update cadence.

## Tool Policy
- Use `filesystem.read` to review existing content and brand docs.
- Use `filesystem.write` to produce style guide documents.

## Verification
- Voice and tone section defined
- Terminology glossary included
- Formatting conventions documented

## Source Notes
Mailchimp Content Style Guide, Google Developer Documentation Style Guide, 18F Content Guide. Reference: ref.github.design-content.2026-05-31
