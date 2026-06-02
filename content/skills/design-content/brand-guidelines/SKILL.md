---
id: design-content.brand-guidelines
name: Brand Guidelines
version: 1.0.0
domain: design-content
category: design-content.brand-design
purpose: Create comprehensive brand guidelines covering visual identity, voice, tone, and application rules.
summary: Brand guideline creation with visual identity specs, voice and tone, logo usage, and application examples.
triggers:
  - create brand guidelines for the startup
  - brand guidelines creation
  - brand book design
  - visual identity documentation
  - brand application rules
  - brand standards guide
aliases:
  - brand guidelines
  - brand book
negative_keywords:
  - content style guide only
  - code implementation
  - database design
inputs:
  - brand_strategy
  - visual_identity_assets
  - application_contexts
outputs:
  - brand_guidelines_document
  - visual_identity_specs
  - application_rules
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: expanded
max_context_tokens: 8000
failure_modes:
  - Guidelines without visual identity specs
  - Missing application rules
  - No voice and tone section
verification:
  - Visual identity specs included
  - Application rules defined
  - Voice and tone section present
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
Create comprehensive brand guidelines covering visual identity, voice, tone, and application rules.

## When To Use
- Creating brand guidelines for a new brand
- Updating existing brand documentation
- Standardizing brand application across teams

## When Not To Use
- Content style guide only (use style-guides skill)
- Code implementation (use engineering domain)
- Database design (use engineering.database-design)

## Procedure
1. Review brand strategy and visual identity assets.
2. Document logo usage rules (clear space, minimum size, don'ts).
3. Define color palette with primary, secondary, and accent colors.
4. Specify typography scale and font usage rules.
5. Create voice and tone guidelines with examples.
6. Define application rules for print, digital, and social.

## Tool Policy
- Use `filesystem.read` to review brand strategy and assets.
- Use `filesystem.write` to produce guideline documents.

## Verification
- Visual identity specs included
- Application rules defined
- Voice and tone section present

## Source Notes
Alina Wheeler Designing Brand Identity, Pentagram brand guidelines, Spotify brand guidelines. Reference: ref.github.design-content.2026-05-31
