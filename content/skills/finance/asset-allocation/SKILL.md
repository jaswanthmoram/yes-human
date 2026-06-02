---
id: finance.asset-allocation
name: Asset Allocation
version: 1.0.0
domain: finance
category: finance.investment
purpose: Design asset allocation strategies based on investment objectives, risk tolerance, and time horizon.
summary: Asset allocation design with strategic and tactical approaches, diversification analysis, and policy statements.
triggers:
  - asset allocation strategy
  - strategic allocation review
  - tactical allocation adjustment
  - diversification analysis
  - investment policy design
aliases:
  - asset allocation
  - allocation strategy
negative_keywords:
  - tax filing
  - code review
  - marketing campaign
inputs:
  - investment_objectives
  - risk_tolerance
  - time_horizon
outputs:
  - allocation_strategy
  - diversification_analysis
  - policy_statement
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Ignores correlation analysis
  - Omits rebalancing triggers
  - Fails to match allocation to objectives
verification:
  - Allocation matches objectives
  - Diversification analyzed
  - Rebalancing triggers defined
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
Design asset allocation strategies based on investment objectives, risk tolerance, and time horizon for decision support.

## When To Use
- Designing asset allocation strategies
- Reviewing strategic allocation
- Analyzing diversification

## When Not To Use
- Individual security selection belongs to investment-analyst
- Tax-efficient allocation belongs to tax-specialist
- Portfolio optimization belongs to portfolio-optimization skill

## Procedure
1. Define investment objectives and constraints.
2. Assess risk tolerance and time horizon.
3. Analyze asset class characteristics and correlations.
4. Design strategic allocation targeting long-term objectives.
5. Define tactical bands and rebalancing triggers.
6. Document allocation policy statement.

## Tool Policy
- Use `filesystem.read` to access investment data and objective inputs.

## Verification
- Allocation matches stated objectives
- Diversification analyzed across asset classes
- Rebalancing triggers defined

## Failure Modes
- Ignoring correlation analysis
- Omitting rebalancing triggers
- Failing to match allocation to objectives

## Example Routes
- "design asset allocation strategy"
- "strategic allocation review"
- "diversification analysis"

## Source Notes
- Reference: ref.github.finance.2026-05-31
