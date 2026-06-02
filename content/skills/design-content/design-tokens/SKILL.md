---
id: design-content.design-tokens
name: Design Tokens
version: 1.0.0
domain: design-content
category: design-content.design-systems
purpose: Define and manage design tokens for color, spacing, typography, and other design primitives across platforms.
summary: Design token architecture with naming conventions, multi-platform output, and token governance.
triggers:
  - design token definition
  - token naming convention
  - multi-platform token output
  - token governance setup
  - design token audit
aliases:
  - design tokens
  - token system
negative_keywords:
  - component implementation
  - visual design only
  - code deployment
inputs:
  - design_system_requirements
  - platform_targets
  - existing_tokens
outputs:
  - token_definitions
  - naming_conventions
  - platform_outputs
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Inconsistent naming across token categories
  - Missing platform-specific outputs
  - No governance model for token changes
verification:
  - Naming convention applied consistently
  - All target platforms have outputs
  - Governance model documented
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
Define and manage design tokens for color, spacing, typography, and other design primitives across platforms.

## When To Use
- Defining design token architecture
- Setting up multi-platform token outputs
- Auditing existing token systems

## When Not To Use
- Component implementation (use component-libraries skill)
- Visual design only (use figma-design or sketch-design skill)
- Code deployment (use engineering domain)

## Procedure
1. Audit existing tokens or define new token categories.
2. Establish naming conventions (category-property-variant-state).
3. Define global and alias tokens.
4. Generate platform-specific outputs (CSS, iOS, Android, JSON).
5. Document governance model for token changes.

## Tool Policy
- Use `filesystem.read` to review existing token files.
- Use `filesystem.write` to produce token definitions.

## Verification
- Naming convention applied consistently
- All target platforms have outputs
- Governance model documented

## Source Notes
Design Tokens W3C Community Group, Style Dictionary, Theo token tool. Reference: ref.github.design-content.2026-05-31
