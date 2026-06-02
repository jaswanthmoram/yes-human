---
id: startup-ops.financial-projections
name: Financial Projections
version: 1.0.0
domain: startup-ops
category: startup-ops.finance
purpose: Build financial projections with revenue models, cost forecasts, and scenario analysis for investor materials.
summary: Creates 3-5 year financial projections with base/bull/bear scenarios, key assumptions, and sensitivity analysis.
triggers:
  - revenue forecast analysis
  - financial projections
  - revenue forecast
  - financial forecast startup
  - pro forma
activation_triggers:
  - financial projections
  - revenue forecast
  - financial forecast startup
  - pro forma
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Define revenue model and assumptions
  - Project customer acquisition and growth
  - Calculate cost of goods sold
  - Forecast operating expenses by category
  - Build cash flow projection
  - Create scenario analysis (base/bull/bear)
  - Perform sensitivity analysis on key variables
outputs:
  - projection_model
  - scenario_analysis
  - assumptions_doc
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Projects without stating assumptions
  - Uses hockey-stick growth without justification
  - Skips cash flow in favor of P&L only
handoffs:
  - startup-ops.financial-modeler
  - startup-ops.fundraising-specialist
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
Use this skill when financial projections or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Define revenue model and assumptions**: define revenue model and assumptions with evidence and documentation.
2. **Project customer acquisition and growth**: project customer acquisition and growth with evidence and documentation.
3. **Calculate cost of goods sold**: calculate cost of goods sold with evidence and documentation.
4. **Forecast operating expenses by category**: forecast operating expenses by category with evidence and documentation.
5. **Build cash flow projection**: build cash flow projection with evidence and documentation.
6. **Create scenario analysis (base/bull/bear)**: create scenario analysis (base/bull/bear) with evidence and documentation.
7. **Perform sensitivity analysis on key variables**: perform sensitivity analysis on key variables with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Projects without stating assumptions
- Uses hockey-stick growth without justification
- Skips cash flow in favor of P&L only

## Examples
### Financial Projections Example
Input: financial projections for a B2B SaaS startup
Output:
- projection_model with evidence-based entries
- scenario_analysis with prioritized items
- assumptions_doc with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
