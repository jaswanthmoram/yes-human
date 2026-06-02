---
id: engineering.tailwind-css
name: Tailwind CSS Utility Patterns
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide Tailwind CSS utility-first patterns including responsive design, component extraction, custom themes, and performance optimization.
triggers:
  - tailwind css
  - tailwind utility
  - tailwind responsive
  - tailwind theme
  - tailwind component
  - tailwind dark mode
  - tailwind performance
aliases:
  - tailwind patterns
  - utility first css
  - tailwind config
negative_keywords:
  - css modules
  - styled components
  - sass
  - bootstrap
inputs:
  - design_requirements
  - tailwind_version
  - design_system_tokens (optional)
outputs:
  - tailwind_markup
  - theme_configuration
  - component_extraction_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: micro
max_context_tokens: 4000
failure_modes:
  - Class name bloat reducing readability
  - PurgeCSS removing used classes in production
  - Inconsistent spacing/sizing without design tokens
  - Dark mode not covering all components
verification:
  - All responsive breakpoints tested
  - Dark mode styles complete
  - Production CSS bundle contains only used classes
  - No inline styles that should be utility classes
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous CSS implementation
validators:
  - skill.validator
---

## Mission
Provide expert guidance on Tailwind CSS utility-first patterns, ensuring consistent design systems, responsive layouts, and optimized production builds.

## When To Use
- Building UI with Tailwind CSS utility classes
- Implementing responsive designs with Tailwind breakpoints
- Configuring custom themes and design tokens
- Extracting reusable component patterns from utility classes
- Implementing dark mode with Tailwind

## When Not To Use
- Projects using CSS-in-JS (styled-components, emotion)
- CSS Modules or Sass-based styling systems
- Bootstrap or other CSS framework projects
- Simple pages with minimal styling needs

## Procedure
1. **Configure Theme**: Set up tailwind.config.js with custom colors, spacing, fonts, and breakpoints matching the design system.
2. **Apply Utility Classes**: Use Tailwind utilities for layout (flex, grid), spacing (p-4, m-2), typography (text-lg, font-bold), and colors.
3. **Implement Responsive Design**: Use responsive prefixes (sm:, md:, lg:, xl:) for breakpoint-specific styles.
4. **Add Dark Mode**: Configure dark mode strategy (class or media), apply dark: variants to all color-related utilities.
5. **Extract Components**: Use @apply in CSS or extract to framework components when class lists become unwieldy.
6. **Optimize Bundle**: Configure content paths for PurgeCSS, verify production build removes unused classes.
7. **Handle Edge Cases**: Use arbitrary values ([#hex], [calc()]) for one-off values, create plugins for repeated patterns.

## Tool Policy
- Use `filesystem.read` to inspect existing Tailwind markup and configuration
- Use `filesystem.write` to create or update component markup and theme config
- Use `code_graph.query` to find Tailwind usage patterns across the codebase

## Verification
- Run `npm run build` to verify production CSS is optimized
- Test responsive design at all breakpoints
- Verify dark mode covers all components
- Run visual regression tests if available

## Failure Modes
- **Class Bloat**: Too many utility classes on one element; extract to component or use @apply
- **PurgeCSS Issues**: Dynamic class names not detected; use safelist or static class names
- **Inconsistent Design**: Not using theme tokens leads to magic numbers; configure extend in tailwind.config.js
- **Dark Mode Gaps**: Missing dark: variants on some elements; audit all color utilities
- **Performance**: Large CSS bundle in development; use @tailwindcss/jit for faster builds

## Example Routes
- `yes route "create tailwind responsive layout"` -> engineering.tailwind-css
- `yes route "configure tailwind dark mode"` -> engineering.tailwind-css
- `yes route "extract tailwind component"` -> engineering.tailwind-css

## Source Notes
- Tailwind CSS documentation: https://tailwindcss.com/docs
- Tailwind CSS GitHub: github.com/tailwindlabs/tailwindcss (85k+ stars)
- Tailwind UI component patterns: https://tailwindui.com
- Reference dossier: ref.github.engineering.2026-05-31
