---
id: finance.financial-statements
name: Financial Statement Analysis
version: 1.0.0
domain: finance
category: finance.analysis
purpose: Analyze income statements, balance sheets, and cash flow statements to extract key insights and trends.
summary: Structured analysis of financial statements including horizontal, vertical, and ratio-based approaches.
triggers:
  - analyze financial statements
  - income statement review
  - balance sheet analysis
  - cash flow statement review
  - financial statement interpretation
aliases:
  - financial statements
  - statement analysis
negative_keywords:
  - tax filing
  - investment recommendation
  - code review
inputs:
  - financial_statements
  - analysis_period
  - comparison_base
outputs:
  - statement_analysis
  - key_findings
  - trend_summary
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Analyzes without context of accounting policies
  - Confuses cash flow with profitability
  - Omits period-over-period comparison
verification:
  - All three statements analyzed
  - Period comparisons included
  - Key findings supported by data
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
Analyze income statements, balance sheets, and cash flow statements to extract key insights and trends with proper context and disclaimers.

## When To Use
- Analyzing financial statements for decision support
- Reviewing income statement trends
- Assessing balance sheet health
- Interpreting cash flow patterns

## When Not To Use
- Tax filing or advice belongs to tax-specialist
- Investment recommendations belong to investment-analyst
- Audit opinions belong to audit-specialist

## Procedure
1. Obtain the financial statements for the analysis period.
2. Perform horizontal analysis (period-over-period changes).
3. Perform vertical analysis (common-size statements).
4. Identify material changes and trends.
5. Cross-reference findings across all three statements.
6. Document key findings with supporting data.

## Tool Policy
- Use `filesystem.read` to access financial statement data.

## Verification
- All three statements analyzed where available
- Period comparisons included with percentage changes
- Key findings supported by specific data points

## Failure Modes
- Analyzing without context of accounting policies
- Confusing cash flow with profitability
- Omitting period-over-period comparison

## Example Routes
- "analyze Q3 financial statements"
- "review income statement trends"
- "balance sheet health check"

## Source Notes
- Reference: ref.github.finance.2026-05-31
