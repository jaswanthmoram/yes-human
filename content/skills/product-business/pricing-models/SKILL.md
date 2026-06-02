---
id: product-business.pricing-models
name: Pricing Models
version: 1.0.0
domain: product-business
category: product-business.monetization
purpose: Design and evaluate pricing models aligned to product value and customer willingness to pay.
summary: Guides through value-based pricing, tier design, and pricing experimentation for SaaS and digital products.
triggers:
  - pricing experimentation for usage based model
  - pricing model
  - pricing strategy
  - pricing tiers
  - value based pricing
activation_triggers:
  - design pricing
  - set pricing tiers
  - pricing experimentation
prerequisites:
  - product value proposition
  - customer segment definitions
inputs:
  - value_proposition
  - customer_segments
  - competitive_pricing
steps:
  - Identify value metric that aligns with customer value
  - Research willingness to pay through Van Westendorp or Gabor-Granger
  - Design pricing tiers with feature differentiation
  - Validate pricing against competitive landscape
  - Plan pricing experiment or rollout strategy
  - Define metrics for pricing effectiveness
outputs:
  - pricing_model
  - tier_design
  - pricing_experiment_plan
tools:
  - filesystem.read
quality_gates:
  - Value metric is justified with customer research
  - Tiers are differentiated by value, not just features
  - Pricing experiment plan is included
failure_modes:
  - Pricing based on cost rather than value
  - Too many tiers creating decision paralysis
  - Not testing pricing with real customers
handoffs:
  - product-business.pricing-strategist (for strategy refinement)
  - product-business.product-marketer (for packaging communication)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.pricing-strategist
  - product-business.product-marketer
  - product-business.master
allowed_workflows:
  - product-business.product-launch
status: active
budget_band: standard
rollback:
  - Grandfather existing customers on old pricing
validators:
  - skill.validator
---

## Trigger
Use this skill when designing or revising product pricing models.

## Prerequisites
- Product value proposition defined
- Customer segments identified

## Steps
1. **Value Metric**: What does the customer get value from? (seats, usage, outcomes)
2. **WTP Research**: Van Westendorp price sensitivity or Gabor-Granger conjoint analysis.
3. **Tier Design**: 3-4 tiers with clear value progression and feature gates.
4. **Competitive Check**: Benchmark against competitor pricing and positioning.
5. **Experiment**: Plan A/B test, price sensitivity test, or phased rollout.
6. **Metrics**: Track conversion, ARPU, churn, and expansion revenue.

## Verification
- Value metric correlates with customer value received
- Tiers have clear upgrade motivation
- Pricing is tested before full rollout

## Rollback
- Grandfather existing customers; new pricing applies to new signups

## Common Failures
- Cost-plus pricing instead of value-based
- Feature gates that don't align with value inflection points
- Not communicating price changes with adequate notice

## Examples
### Tier Design
Free: 3 projects, 1 user
Pro ($29/mo): Unlimited projects, 10 users, integrations
Enterprise (Custom): SSO, audit log, dedicated support
Value Metric: Number of active projects

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
