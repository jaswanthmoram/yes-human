---
id: finance.dcf-modeling
name: DCF Modeling
version: 1.0.0
domain: finance
category: finance.modeling
purpose: Build discounted cash flow models with explicit assumptions, terminal value calculations, and sensitivity analysis.
summary: DCF model construction with assumption documentation, WACC calculation, terminal value, and sensitivity tables.
triggers:
  - build DCF model
  - discounted cash flow analysis
  - DCF valuation
  - WACC calculation
  - terminal value estimation
aliases:
  - DCF modeling
  - DCF analysis
negative_keywords:
  - tax filing
  - code review
  - marketing campaign
inputs:
  - historical_financials
  - projection_assumptions
  - discount_rate_inputs
outputs:
  - dcf_model
  - sensitivity_analysis
  - valuation_range
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: expanded
max_context_tokens: 10000
failure_modes:
  - Hardcodes assumptions without documentation
  - Omits sensitivity analysis
  - Uses inappropriate discount rate
verification:
  - All assumptions documented
  - Sensitivity analysis included
  - Terminal value methodology justified
source_references:
  - ref.github.finance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Build discounted cash flow models with explicit assumptions, terminal value calculations, and sensitivity analysis for decision support.

## When To Use
- Building DCF models for valuation
- Calculating WACC for discount rates
- Estimating terminal values

## When Not To Use
- Final valuation opinions belong to valuation-expert
- M&A deal advice belongs to m-and-a-specialist
- Tax structuring belongs to tax-specialist

## Procedure
1. Gather historical financial data and projection assumptions.
2. Calculate WACC using appropriate cost of equity and debt inputs.
3. Project free cash flows over the explicit forecast period.
4. Calculate terminal value using appropriate methodology.
5. Discount projected cash flows and terminal value to present.
6. Build sensitivity tables for key assumptions.
7. Document all assumptions with sources and rationale.

## Tool Policy
- Use `filesystem.read` to access financial data and assumption inputs.

## Verification
- All assumptions documented with sources
- Sensitivity analysis covers key variables
- Terminal value methodology justified

## Failure Modes
- Hardcoding assumptions without documentation
- Omitting sensitivity analysis
- Using inappropriate discount rate

## Example Routes
- "build DCF model for acquisition target"
- "DCF valuation analysis"
- "WACC calculation for DCF"

## Source Notes
- Reference: ref.github.finance.2026-05-31
