---
id: finance.working-capital
name: Working Capital Management
version: 1.0.0
domain: finance
category: finance.treasury
purpose: Analyze and optimize working capital across receivables, payables, and inventory to improve cash conversion.
summary: Working capital analysis and optimization covering DSO, DPO, DIO, and cash conversion cycle improvement.
triggers:
  - working capital analysis
  - cash conversion cycle review
  - receivables optimization
  - payables management review
  - inventory turnover analysis
aliases:
  - working capital
  - WCM
negative_keywords:
  - investment recommendation
  - code review
  - marketing campaign
inputs:
  - receivables_data
  - payables_data
  - inventory_data
outputs:
  - working_capital_analysis
  - optimization_recommendations
  - cash_conversion_assessment
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Omits cash conversion cycle calculation
  - Ignores customer concentration risk
  - Skips supplier terms analysis
verification:
  - Cash conversion cycle calculated
  - Concentration risks assessed
  - Terms analysis included
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
Analyze and optimize working capital across receivables, payables, and inventory to improve cash conversion.

## When To Use
- Analyzing working capital efficiency
- Optimizing cash conversion cycle
- Reviewing receivables or payables management

## When Not To Use
- Strategic treasury planning belongs to treasury-manager
- Credit decisions belong to credit-analyst
- Tax implications belong to tax-specialist

## Procedure
1. Gather receivables, payables, and inventory data.
2. Calculate DSO, DPO, DIO, and cash conversion cycle.
3. Benchmark against industry standards.
4. Identify optimization opportunities in each component.
5. Assess customer and supplier concentration risks.
6. Recommend specific improvement actions.

## Tool Policy
- Use `filesystem.read` to access working capital data.

## Verification
- Cash conversion cycle calculated and benchmarked
- Concentration risks assessed for receivables and payables
- Terms analysis included for key customers and suppliers

## Failure Modes
- Omitting cash conversion cycle calculation
- Ignoring customer concentration risk
- Skipping supplier terms analysis

## Example Routes
- "working capital analysis"
- "cash conversion cycle review"
- "receivables optimization plan"

## Source Notes
- Reference: ref.github.finance.2026-05-31
