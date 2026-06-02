---
id: product-business.market-sizing
name: Market Sizing
version: 1.0.0
domain: product-business
category: product-business.strategy
purpose: Estimate market size using TAM/SAM/SOM framework for product strategy and investment decisions.
summary: Guides through top-down and bottom-up market sizing with TAM, SAM, and SOM calculations.
triggers:
  - market sizing
  - tam sam som
  - market size estimate
  - addressable market
activation_triggers:
  - size the market
  - how big is the market
  - market opportunity
prerequisites:
  - product or service definition
  - target customer profile
inputs:
  - product_definition
  - target_customer
  - data_sources (optional)
steps:
  - Define the market and customer segment
  - Calculate TAM using top-down approach
  - Calculate SAM based on geographic and segment constraints
  - Estimate SOM based on current capabilities and competition
  - Validate with bottom-up calculation
  - Document assumptions and data sources
outputs:
  - tam_sam_som
  - assumptions_log
  - validation_analysis
tools:
  - filesystem.read
quality_gates:
  - Both top-down and bottom-up approaches used
  - Assumptions are explicitly documented
  - Data sources are cited with recency
failure_modes:
  - Using only top-down without bottom-up validation
  - Not documenting assumptions
  - Confusing TAM with realistic capture
handoffs:
  - product-business.market-researcher (for data gathering)
  - product-business.product-strategist (for strategy implications)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.market-researcher
  - product-business.product-strategist
  - product-business.master
allowed_workflows:
  - product-business.competitive-analysis
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when estimating market size for product strategy or investment decisions.

## Prerequisites
- Product or service definition
- Target customer profile

## Steps
1. **Define Market**: What problem, for whom, and where?
2. **TAM (Top-Down)**: Total market × relevant percentage from industry reports.
3. **SAM**: TAM × geographic reach × segment fit.
4. **SOM**: SAM × realistic market share based on competition and capabilities.
5. **Validate (Bottom-Up)**: Number of potential customers × average revenue per customer.
6. **Document**: List all assumptions, data sources, and confidence levels.

## Verification
- Top-down and bottom-up estimates are within 2x of each other
- All assumptions are explicit
- Data sources are cited

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Using TAM as if it were achievable revenue
- Not validating top-down with bottom-up
- Stale market data without adjustment

## Examples
### Market Sizing
Product: Project management SaaS for SMBs
TAM: $15B (global PM software market)
SAM: $3B (US + EU, SMB segment)
SOM: $30M (1% SAM in year 3, based on growth trajectory)
Bottom-up: 100K target companies × $300/year = $30M SOM

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
