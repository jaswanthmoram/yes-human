---
id: design-content.sketch-design
name: Sketch Design
version: 1.0.0
domain: design-content
category: design-content.ui-design
purpose: Create and manage design files in Sketch with symbols, smart layout, and design system integration.
summary: Sketch-specific workflows for symbol creation, smart layout, overrides, and design handoff.
triggers:
  - sketch symbol creation
  - sketch smart layout setup
  - sketch design handoff
  - sketch library setup
  - sketch override design
aliases:
  - sketch
  - sketch workflow
negative_keywords:
  - figma design
  - adobe xd
  - code implementation
inputs:
  - design_requirements
  - symbol_specs
  - design_system_tokens
outputs:
  - sketch_symbols
  - smart_layout_specs
  - handoff_documentation
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates symbols without smart layout
  - Omits override states
  - Missing handoff annotations
verification:
  - Smart layout applied to all artboards
  - Overrides defined for symbol states
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
Create and manage design files in Sketch with symbols, smart layout, and design system integration.

## When To Use
- Creating Sketch symbols with overrides and smart layout
- Setting up shared libraries in Sketch
- Preparing design handoff from Sketch files

## When Not To Use
- Figma-specific workflows (use figma-design skill)
- Adobe XD workflows (use adobe-xd skill)
- Code implementation (use engineering domain)

## Procedure
1. Define symbol requirements and override states.
2. Apply smart layout to all artboards and groups.
3. Create symbol variants for interactive states.
4. Apply design tokens for color, spacing, and typography.
5. Add handoff annotations for developers.

## Tool Policy
- Use `filesystem.read` to review design requirements and specs.

## Verification
- Smart layout applied to all artboards
- Overrides defined for symbol states
- Handoff annotations present

## Source Notes
Sketch documentation, Sketch design system patterns, handoff best practices. Reference: ref.github.design-content.2026-05-31
