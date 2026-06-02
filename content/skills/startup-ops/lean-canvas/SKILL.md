---
id: startup-ops.lean-canvas
name: Lean Canvas Framework
version: 1.0.0
domain: startup-ops
category: startup-ops.strategy
purpose: Create and iterate Lean Canvas one-page business models for rapid hypothesis testing.
summary: Guides through filling out a Lean Canvas with problem, solution, key metrics, unique value proposition, and unfair advantage.
triggers:
  - one page business model analysis
  - lean canvas
  - one page business model
  - lean startup canvas
activation_triggers:
  - lean canvas
  - one page business model
  - lean startup canvas
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Define the top 3 problems
  - Identify customer segments
  - Articulate unique value proposition
  - Define solution for each problem
  - List channels to reach customers
  - Define revenue streams and cost structure
  - Identify key metrics and unfair advantage
outputs:
  - lean_canvas
  - hypothesis_list
  - validation_priorities
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Fills canvas without customer validation
  - Lists too many problems without prioritization
  - Skips unfair advantage section
handoffs:
  - startup-ops.business-model-designer
  - startup-ops.customer-development
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
Use this skill when lean canvas or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Define the top 3 problems**: define the top 3 problems with evidence and documentation.
2. **Identify customer segments**: identify customer segments with evidence and documentation.
3. **Articulate unique value proposition**: articulate unique value proposition with evidence and documentation.
4. **Define solution for each problem**: define solution for each problem with evidence and documentation.
5. **List channels to reach customers**: list channels to reach customers with evidence and documentation.
6. **Define revenue streams and cost structure**: define revenue streams and cost structure with evidence and documentation.
7. **Identify key metrics and unfair advantage**: identify key metrics and unfair advantage with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Fills canvas without customer validation
- Lists too many problems without prioritization
- Skips unfair advantage section

## Examples
### Lean Canvas Framework Example
Input: lean canvas for a B2B SaaS startup
Output:
- lean_canvas with evidence-based entries
- hypothesis_list with prioritized items
- validation_priorities with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
