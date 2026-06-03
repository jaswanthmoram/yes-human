---
quality_gate: production
id: product-business.cfo-advisory
name: CFO Advisory and Financial Strategy
version: 1.0.0
domain: product-business
category: product-business.finance
purpose: Provide CFO-level financial strategy guidance on runway, burn rate, unit economics, and board financial narratives. Not financial advice.
summary: CFO advisory work at a startup covers: runway extension strategies, burn rate analysis, unit economics (CAC/LTV), board financial narrative, and scenario modeling. All outputs carry a mandatory disclaimer and require human CFO or advisor review.
triggers:
  - cfo advisory session
  - financial strategy advice
  - board financial prep
  - investor financial model
  - runway strategy
activation_triggers:
  - we need to think through our financial strategy
  - how do we present financials to the board
prerequisites:
  - Current financials available (MRR, burn rate, headcount cost)
  - Planning horizon defined (3, 6, or 12 months)
inputs:
  - financial_snapshot
  - planning_horizon
  - strategic_goals
steps:
  - Restate the financial question and confirm the planning horizon and key constraints
  - Analyze current burn rate by category (headcount, infrastructure, marketing, G&A)
  - Calculate runway: cash balance ÷ monthly net burn = months of runway
  - Model unit economics: CAC (total sales+marketing spend ÷ new customers), LTV (ARPU × gross margin ÷ churn)
  - Build 3 scenarios: base (current trajectory), optimistic (10% above), conservative (20% below)
  - Prepare board-ready financial narrative: current state, key metrics, risks, ask
outputs:
  - burn_rate_analysis
  - runway_calculation
  - scenario_model
  - board_financial_narrative
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Actuals clearly separated from estimates
  - All three scenarios modeled
  - Disclaimer attached to every financial output
failure_modes:
  - Presenting estimates as actuals
  - Missing the disclaimer
  - Single scenario planning
requires_disclaimer: true
handoffs:
  - finance.master (for detailed accounting work)
source_references:
  - https://github.com/actualbudget/actual
  - https://github.com/garrytan/gstack
allowed_agents:
  - product-business.cfo-advisor
  - finance.master
status: active
budget_band: expanded
rollback:
  - Financial documents are artifacts — no system changes
validators:
  - skill.validator
---
## Trigger
Use for board financial prep, runway analysis, unit economics review, or investor update financial narrative.

## Prerequisites
- Current MRR, burn rate, cash balance, and headcount costs available

## Steps

### 1. Confirm Scope
Define the question: runway extension, unit economics review, board prep, or scenario planning. Each has a different output.

### 2. Analyze Burn Rate
Break down by: headcount (usually 60-70% of burn), infrastructure, sales & marketing, G&A. Identify the largest lever for runway extension.

### 3. Calculate Runway
`Runway = Cash Balance ÷ Net Monthly Burn`. Conservative: add 2-month buffer. If <6 months, fundraising or cost reduction is urgent.

### 4. Model Unit Economics
CAC: total sales+marketing spend / new customers in period. LTV: ARPU × gross margin / monthly churn rate. LTV/CAC ratio target: ≥3.

### 5. Build 3 Scenarios
Base: current trajectory. Optimistic: 15-20% revenue acceleration. Conservative: 20% revenue miss + burn unchanged. Show runway in each.

### 6. Board Narrative
Structure: current MRR + growth rate → burn rate + runway → unit economics → risks → ask. One page. Headline-first.

## Verification
- [ ] Actuals vs estimates labeled
- [ ] 3 scenarios modeled
- [ ] Disclaimer attached
- [ ] Board narrative headline-first

## Rollback
Financial documents — no system changes.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Estimates presented as actuals | No labeling | Always label every number |
| Missing disclaimer | Oversight | Add to template |
| Single scenario planning | Optimism bias | Always model the bear case |

## Examples
**Example A:** 8 months runway, LTV/CAC = 2.1 — raise Series A or reduce burn by 30%.
**Example B:** Board narrative: MRR $200K (+12% MoM), burn $300K/month, 14 months runway, ask: introductions to 3 VCs.
