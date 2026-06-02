---
id: finance.business-valuation
name: Business Valuation
version: 1.0.0
domain: finance
category: finance.valuation
purpose: Perform business valuations using DCF, comparable company, and precedent transaction methods with documented methodology.
summary: Business valuation using multiple methodologies with cross-validation, sensitivity analysis, and value range output.
triggers:
  - business valuation analysis
  - company valuation review
  - valuation methodology assessment
  - fair value calculation
  - enterprise value estimation
aliases:
  - business valuation
  - company valuation
negative_keywords:
  - tax valuation
  - code review
  - marketing campaign
inputs:
  - financial_data
  - market_comparables
  - valuation_purpose
outputs:
  - valuation_report
  - methodology_comparison
  - value_range
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: expanded
max_context_tokens: 10000
failure_modes:
  - Uses single methodology without justification
  - Omits sensitivity analysis
  - Presents point estimate instead of range
verification:
  - Multiple methodologies applied
  - Sensitivity analysis included
  - Value presented as range
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
Perform business valuations using DCF, comparable company, and precedent transaction methods with documented methodology for decision support.

## When To Use
- Valuing a business or equity interest
- Selecting valuation methodologies
- Estimating enterprise or equity value

## When Not To Use
- Tax valuations belong to tax-specialist
- Legal appraisals require qualified appraisers
- M&A deal advice belongs to m-and-a-specialist

## Procedure
1. Define valuation purpose and standard of value.
2. Gather financial data and market comparables.
3. Apply DCF methodology with documented assumptions.
4. Apply comparable company analysis.
5. Apply precedent transaction analysis where applicable.
6. Cross-validate results and present value range.
7. Include sensitivity analysis for key assumptions.

## Tool Policy
- Use `filesystem.read` to access financial data and comparables.

## Verification
- Multiple methodologies applied and cross-validated
- Sensitivity analysis included for key variables
- Value presented as range, not point estimate

## Failure Modes
- Using single methodology without justification
- Omitting sensitivity analysis
- Presenting point estimate instead of range

## Example Routes
- "business valuation for acquisition target"
- "company valuation review"
- "fair value calculation"

## Source Notes
- Reference: ref.github.finance.2026-05-31
