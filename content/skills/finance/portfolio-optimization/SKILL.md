---
id: finance.portfolio-optimization
name: Portfolio Optimization
version: 1.0.0
domain: finance
category: finance.investment
purpose: Optimize investment portfolios using mean-variance analysis, efficient frontier, and risk-adjusted return metrics.
summary: Portfolio optimization with efficient frontier analysis, Sharpe ratio assessment, and allocation recommendations.
triggers:
  - portfolio optimization analysis
  - efficient frontier review
  - risk-adjusted return assessment
  - portfolio rebalancing plan
  - allocation optimization
aliases:
  - portfolio optimization
  - portfolio rebalancing
negative_keywords:
  - tax filing
  - code review
  - marketing campaign
inputs:
  - portfolio_holdings
  - return_expectations
  - risk_parameters
outputs:
  - optimization_analysis
  - efficient_frontier
  - rebalancing_plan
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: expanded
max_context_tokens: 10000
failure_modes:
  - Ignores transaction costs
  - Over-relies on historical returns
  - Omits risk constraints
verification:
  - Efficient frontier calculated
  - Risk constraints applied
  - Transaction costs considered
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
Optimize investment portfolios using mean-variance analysis, efficient frontier, and risk-adjusted return metrics for decision support.

## When To Use
- Optimizing portfolio allocation
- Analyzing efficient frontier
- Planning portfolio rebalancing

## When Not To Use
- Individual stock selection belongs to investment-analyst
- Tax optimization belongs to tax-specialist
- Risk management belongs to risk-manager

## Procedure
1. Gather portfolio holdings and return expectations.
2. Calculate expected returns and covariance.
3. Construct efficient frontier.
4. Identify optimal portfolio given risk parameters.
5. Assess current portfolio vs optimal.
6. Develop rebalancing plan with transaction cost estimates.

## Tool Policy
- Use `filesystem.read` to access portfolio data and return expectations.

## Verification
- Efficient frontier calculated correctly
- Risk constraints applied throughout
- Transaction costs considered in rebalancing

## Failure Modes
- Ignoring transaction costs in rebalancing
- Over-relying on historical returns
- Omitting risk constraints

## Example Routes
- "optimize portfolio allocation"
- "efficient frontier analysis"
- "portfolio rebalancing plan"

## Source Notes
- Reference: ref.github.finance.2026-05-31
