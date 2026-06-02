---
id: finance.ratio-analysis
name: Financial Ratio Analysis
version: 1.0.0
domain: finance
category: finance.analysis
purpose: Calculate and interpret financial ratios across liquidity, profitability, efficiency, and leverage categories.
summary: Comprehensive ratio analysis covering liquidity, profitability, efficiency, and leverage metrics.
triggers:
  - calculate financial ratios
  - ratio analysis report
  - liquidity ratio review
  - profitability ratio assessment
  - leverage ratio analysis
aliases:
  - ratio analysis
  - financial ratios
negative_keywords:
  - tax filing
  - investment recommendation
  - code review
inputs:
  - financial_statements
  - ratio_categories
  - benchmark_data
outputs:
  - ratio_calculations
  - interpretation_summary
  - benchmark_comparison
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Calculates ratios without interpretation
  - Omits industry benchmarks
  - Uses inconsistent data sources
verification:
  - All ratio categories covered
  - Interpretation provided for each ratio
  - Benchmarks referenced where available
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
Calculate and interpret financial ratios across liquidity, profitability, efficiency, and leverage categories with benchmark comparisons.

## When To Use
- Calculating financial ratios for analysis
- Comparing ratios against benchmarks
- Assessing financial health through ratios

## When Not To Use
- Tax analysis belongs to tax-specialist
- Investment recommendations belong to investment-analyst
- Credit decisions belong to credit-analyst

## Procedure
1. Obtain financial statements for the analysis period.
2. Calculate liquidity ratios (current, quick, cash).
3. Calculate profitability ratios (gross margin, operating margin, ROE, ROA).
4. Calculate efficiency ratios (asset turnover, inventory turnover, DSO).
5. Calculate leverage ratios (debt-to-equity, interest coverage).
6. Compare against industry benchmarks and prior periods.
7. Provide interpretation for each ratio category.

## Tool Policy
- Use `filesystem.read` to access financial data and benchmarks.

## Verification
- All ratio categories calculated
- Interpretation provided for each ratio
- Benchmarks referenced where available

## Failure Modes
- Calculating ratios without interpretation
- Omitting industry benchmarks
- Using inconsistent data sources

## Example Routes
- "calculate financial ratios for Q3"
- "liquidity ratio analysis"
- "profitability ratio comparison"

## Source Notes
- Reference: ref.github.finance.2026-05-31
