---
id: design-content.figma-design
name: Figma Design
version: 1.0.0
domain: design-content
category: design-content.ui-design
purpose: Create and manage design files in Figma with components, auto-layout, and design system integration.
summary: Figma-specific workflows for component creation, auto-layout, variants, and design handoff.
triggers:
  - figma component creation
  - figma auto layout setup
  - figma design handoff
  - figma variant design
  - figma design system setup
aliases:
  - figma
  - figma workflow
negative_keywords:
  - sketch design
  - adobe xd
  - code implementation
inputs:
  - design_requirements
  - component_specs
  - design_system_tokens
outputs:
  - figma_components
  - auto_layout_specs
  - handoff_documentation
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates components without auto-layout
  - Omits variant states
  - Missing handoff annotations
verification:
  - Auto-layout applied to all frames
  - Variants defined for interactive states
  - Handoff annotations present
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
Create and manage design files in Figma with components, auto-layout, and design system integration.

## When To Use
- Creating Figma components with variants and auto-layout
- Setting up design system files in Figma
- Preparing design handoff documentation

## When Not To Use
- Sketch-specific workflows (use sketch-design skill)
- Adobe XD workflows (use adobe-xd skill)
- Code implementation (use engineering domain)

## Procedure
1. Define component requirements and variant states.
2. Apply auto-layout to all frames and containers.
3. Create component variants for interactive states.
4. Apply design tokens for color, spacing, and typography.
5. Add handoff annotations for developers.

## Tool Policy
- Use `filesystem.read` to review design requirements and specs.

## Verification
- Auto-layout applied to all frames
- Variants defined for interactive states
- Handoff annotations present

## Source Notes
Figma best practices, Figma community patterns, design system integration guides. Reference: ref.github.design-content.2026-05-31
