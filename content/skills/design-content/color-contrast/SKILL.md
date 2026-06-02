---
id: design-content.color-contrast
name: Color Contrast
version: 1.0.0
domain: design-content
category: design-content.accessibility
purpose: Audit and fix color contrast issues to meet WCAG AA and AAA standards.
summary: Color contrast analysis with ratio calculations, palette adjustments, and accessible color pairings.
triggers:
  - color contrast audit
  - contrast ratio check
  - accessible color palette
  - color contrast fix
  - wcag color compliance
aliases:
  - color contrast
  - contrast check
negative_keywords:
  - typography only
  - layout design
  - backend implementation
inputs:
  - color_palette
  - contrast_target_level
  - usage_contexts
outputs:
  - contrast_audit_report
  - accessible_pairings
  - remediation_suggestions
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Missing contrast ratio calculations
  - Only checks text, ignores UI components
  - Suggests fixes without brand alignment
verification:
  - All color pairs have ratio calculations
  - UI component colors assessed
  - Fixes align with brand palette
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
Audit and fix color contrast issues to meet WCAG AA and AAA standards.

## When To Use
- Auditing color palette for accessibility
- Fixing contrast issues in existing designs
- Creating accessible color pairings

## When Not To Use
- Typography only (use style-guides skill)
- Layout design (use figma-design skill)
- Backend implementation (use engineering domain)

## Procedure
1. Extract all color pairs from the palette and usage contexts.
2. Calculate contrast ratios for each pair (normal and large text).
3. Assess against WCAG AA (4.5:1 normal, 3:1 large) and AAA (7:1 normal, 4.5:1 large).
4. Check UI component colors (borders, icons, focus indicators).
5. Suggest accessible alternatives that align with brand palette.

## Tool Policy
- Use `filesystem.read` to review color palette and design files.

## Verification
- All color pairs have ratio calculations
- UI component colors assessed
- Fixes align with brand palette

## Source Notes
WCAG 2.2 SC 1.4.3 and 1.4.6, WebAIM contrast checker, APCA contrast algorithm. Reference: ref.github.design-content.2026-05-31
