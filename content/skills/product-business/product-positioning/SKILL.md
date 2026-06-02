---
id: product-business.product-positioning
name: Product Positioning
version: 1.0.0
domain: product-business
category: product-business.strategy
purpose: Define clear product positioning that differentiates from competitors and resonates with target customers.
summary: Guides through positioning framework including market category, unique value, and proof points.
triggers:
  - product positioning
  - positioning statement
  - positioning framework
  - market positioning
activation_triggers:
  - define positioning
  - how should we position
  - positioning workshop
prerequisites:
  - target customer profile
  - competitive landscape understanding
inputs:
  - target_customer
  - competitive_context
  - product_capabilities
steps:
  - Define the market category you compete in
  - Identify underserved customer needs
  - Articulate unique value proposition
  - List proof points that substantiate claims
  - Create positioning statement using standard template
  - Validate positioning with target customers
outputs:
  - positioning_statement
  - proof_points
  - validation_results
tools:
  - filesystem.read
quality_gates:
  - Positioning is differentiated from competitors
  - Claims are backed by proof points
  - Validated with target customer feedback
failure_modes:
  - Generic positioning that could apply to any product
  - Claims without supporting evidence
  - Not testing positioning with real customers
handoffs:
  - product-business.product-marketer (for messaging)
  - product-business.competitive-analyst (for competitive context)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-marketer
  - product-business.product-strategist
  - product-business.master
allowed_workflows:
  - product-business.competitive-analysis
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when defining or refining product positioning.

## Prerequisites
- Target customer profile defined
- Competitive landscape understood

## Steps
1. **Market Category**: What category do you compete in? (e.g., "project management for remote teams")
2. **Underserved Needs**: What do customers need that alternatives don't provide?
3. **Unique Value**: What do you uniquely deliver? (only we can...)
4. **Proof Points**: Evidence that substantiates your claims (case studies, metrics, testimonials).
5. **Statement**: "For [target], [product] is the [category] that [unique value] because [proof]."
6. **Validate**: Test positioning with 10+ target customers for resonance and clarity.

## Verification
- Positioning passes the "so what?" test
- Differentiated from top 3 competitors
- Validated with target customer feedback

## Rollback
- No state changes; this is a strategy skill

## Common Failures
- Positioning as "better" without specifying how
- Not anchoring in a market category customers understand
- Skipping customer validation

## Examples
### Positioning Statement
For product teams at startups, Linear is the issue tracker that moves at the speed of thought because it's keyboard-first, real-time synced, and designed for makers not managers.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
