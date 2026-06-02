---
id: startup-ops.market-validation
name: Market Validation
version: 1.0.0
domain: startup-ops
category: startup-ops.validation
purpose: Validate market opportunity using TAM/SAM/SOM analysis, competitive landscape, and demand signals.
summary: Guides through market sizing, competitive analysis, and demand validation for startup opportunities.
triggers:
  - run market validation process
  - market sizing analysis
  - market validation
  - market sizing
  - TAM SAM SOM
  - market opportunity
activation_triggers:
  - market validation
  - market sizing
  - TAM SAM SOM
  - market opportunity
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Calculate TAM using top-down and bottom-up methods
  - Define SAM based on target segment
  - Estimate SOM from early traction
  - Map competitive landscape
  - Identify demand signals
  - Validate with customer data
  - Document market thesis
outputs:
  - market_analysis
  - competitive_map
  - market_thesis
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Uses only top-down TAM without bottom-up validation
  - Skips competitive analysis
  - Confuses market size with revenue potential
handoffs:
  - startup-ops.startup-strategist
  - startup-ops.product-market-fit
source_references:
  - ref.github.startup-ops.2026-05-31
allowed_agents:
  - startup-ops.startup-strategist
  - startup-ops.business-model-designer
  - startup-ops.customer-development
allowed_workflows:
  - startup-ops.business-model-validation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when market validation or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Calculate TAM using top-down and bottom-up methods**: calculate tam using top-down and bottom-up methods with evidence and documentation.
2. **Define SAM based on target segment**: define sam based on target segment with evidence and documentation.
3. **Estimate SOM from early traction**: estimate som from early traction with evidence and documentation.
4. **Map competitive landscape**: map competitive landscape with evidence and documentation.
5. **Identify demand signals**: identify demand signals with evidence and documentation.
6. **Validate with customer data**: validate with customer data with evidence and documentation.
7. **Document market thesis**: document market thesis with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Uses only top-down TAM without bottom-up validation
- Skips competitive analysis
- Confuses market size with revenue potential

## Examples
### Market Validation Example
Input: market validation for a B2B SaaS startup
Output:
- market_analysis with evidence-based entries
- competitive_map with prioritized items
- market_thesis with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
