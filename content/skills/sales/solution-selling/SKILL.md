---
id: sales.solution-selling
name: Solution Selling Framework
version: 1.0.0
domain: sales
category: sales.strategy
purpose: Align solution capabilities to buyer pain points using consultative selling techniques and needs-analysis frameworks.
summary: Needs analysis, solution mapping, and consultative selling frameworks for complex B2B sales motions.
triggers:
  - solution selling approach
  - needs analysis framework
  - solution mapping to pain
  - consultative selling guide
  - pain-to-solution alignment
  - solution positioning design
aliases:
  - solution selling
  - consultative selling
  - needs-based selling
negative_keywords:
  - product feature selling
  - transactional sales
  - retail sales
inputs:
  - buyer_pain_points
  - solution_capabilities
  - competitive_context
outputs:
  - needs_analysis
  - solution_map
  - positioning_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Maps solutions without thorough needs analysis
  - Leads with features instead of pain resolution
  - Skips competitive differentiation in solution positioning
verification:
  - Needs analysis completed before solution mapping
  - Each solution tied to specific buyer pain
  - Competitive differentiation included
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Align solution capabilities to buyer pain points using consultative selling techniques and needs-analysis frameworks.

## When To Use
- Designing solution selling approaches for complex deals
- Creating needs analysis frameworks for sales teams
- Mapping solution capabilities to buyer pain points
- Training sellers on consultative selling techniques

## When Not To Use
- Product feature selling belongs to transactional sales
- Transactional sales don't need solution selling
- Retail sales use different methodologies

## Procedure
1. Conduct thorough needs analysis using structured questioning.
2. Identify and prioritize buyer pain points by impact.
3. Map solution capabilities to specific pain points.
4. Design positioning that leads with pain resolution.
5. Include competitive differentiation in solution positioning.
6. Create proof points for each pain-to-solution connection.

## Tool Policy
- Use `filesystem.read` to access buyer data and solution documentation.
- Use `filesystem.write` to save needs analyses and solution maps.

## Verification
- Needs analysis completed before solution mapping begins
- Each solution capability tied to specific buyer pain point
- Competitive differentiation included in positioning

## Failure Modes
- Leading with product features before understanding pain
- Mapping solutions to assumed rather than validated needs
- Generic solution positioning without deal-specific context

## Example Routes
- "design solution selling approach for manufacturing buyer"
- "create needs analysis framework for enterprise deals"
- "map our platform capabilities to healthcare pain points"

## Source Notes
- Solution Selling by Michael Bosworth
- Reference: ref.github.sales.2026-05-31
