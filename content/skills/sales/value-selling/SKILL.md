---
id: sales.value-selling
name: Value Selling Framework
version: 1.0.0
domain: sales
category: sales.strategy
purpose: Quantify and communicate business value to buyers using ROI models, business case frameworks, and value metrics.
summary: Value quantification, ROI modeling, and business case creation for connecting solution capabilities to buyer outcomes.
triggers:
  - quantify value for productivity improvement pitch
  - create ROI model for cost savings proposition
  - build business case
  - ROI model creation
  - value proposition quantification
  - value selling framework
  - total cost of ownership analysis
  - business value assessment
aliases:
  - value selling
  - ROI selling
  - business case
negative_keywords:
  - financial valuation
  - investment analysis
  - product pricing
inputs:
  - buyer_metrics
  - solution_capabilities
  - industry_benchmarks
outputs:
  - value_assessment
  - roi_model
  - business_case
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates ROI model without buyer-specific metrics
  - Uses generic benchmarks without buyer validation
  - Skips total cost of ownership in value calculation
verification:
  - ROI model uses buyer-specific data where available
  - Assumptions explicitly stated and validated
  - TCO included in value calculation
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
Quantify and communicate business value to buyers using ROI models, business case frameworks, and value metrics.

## When To Use
- Building business cases for enterprise deals
- Creating ROI models for buyer presentations
- Quantifying value propositions for specific opportunities
- Developing value selling frameworks for sales teams

## When Not To Use
- Financial valuation belongs to finance
- Investment analysis belongs to finance
- Product pricing belongs to product-business

## Procedure
1. Identify buyer-specific metrics and success criteria.
2. Map solution capabilities to buyer outcome improvements.
3. Build ROI model with conservative assumptions.
4. Calculate total cost of ownership including implementation.
5. Create business case with payback period and NPV.
6. Validate assumptions with buyer or industry benchmarks.

## Tool Policy
- Use `filesystem.read` to access buyer data and industry benchmarks.
- Use `filesystem.write` to save ROI models and business cases.

## Verification
- ROI model uses buyer-specific data where available
- All assumptions explicitly stated with confidence level
- TCO included alongside value calculation

## Failure Modes
- Using only generic benchmarks without buyer validation
- Ignoring implementation costs in ROI calculation
- Presenting ROI as guaranteed rather than projected

## Example Routes
- "build business case for enterprise analytics deal"
- "create ROI model for cost savings proposition"
- "quantify value for productivity improvement pitch"

## Source Notes
- Value selling frameworks from Solution Selling methodology
- Reference: ref.github.sales.2026-05-31
