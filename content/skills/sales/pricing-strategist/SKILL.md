---
quality_gate: production
id: sales.pricing-strategist
name: Deal Pricing and Packaging Strategy
version: 1.0.0
domain: sales
category: sales.pricing
purpose: Design deal pricing, discount guardrails, packaging options, and commercial tradeoffs for sales opportunities.
summary: Pricing strategy balances customer value, willingness to pay, margin, discount discipline, and renewal expansion potential.
triggers:
  - sales pricing
  - deal pricing strategy
  - discount strategy
  - pricing strategist task
  - package this deal
activation_triggers:
  - what discount should we offer
  - design pricing for this customer
prerequisites:
  - Customer segment and use case are known
  - List price, margin constraints, and discount policy are available
  - Competitive or budget context is available when relevant
inputs:
  - deal_context
  - list_pricing
  - discount_policy
  - value_drivers
steps:
  - Clarify buyer value, urgency, alternatives, budget signals, and procurement constraints.
  - Map package options from good, better, best using capability, usage, service level, and term length.
  - Calculate margin impact and ARR impact for each option.
  - Apply discount guardrails: trade discounts for term, scope, reference rights, upfront payment, or expansion commitment.
  - Identify renewal risk created by one-time discounting or over-custom packaging.
  - Produce a recommended offer with fallback positions and approval notes.
outputs:
  - pricing_options
  - discount_guardrails
  - commercial_tradeoff_analysis
  - recommended_offer
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Margin and ARR impact are stated
  - Discounts are exchanged for explicit customer commitments
  - Renewal and expansion consequences are considered
failure_modes:
  - Discounting without a concession from the customer
  - Hiding margin risk behind ARR growth
  - Creating custom packages that cannot be renewed cleanly
handoffs:
  - sales.sales-forecasting
  - finance.financial-analyst
source_references:
  - ref.github.sales.pricing-strategist.2026-06-02
  - https://github.com/TwentyHQ/twenty
allowed_agents:
  - sales.pricing-strategist
status: active
budget_band: standard
rollback:
  - Revert pricing memo
  - Restore previous offer table
validators:
  - skill.validator
  - pricing_guardrails_checked
---

## Procedure

1. Gather deal facts: segment, use case, buyer value, alternatives, budget, timeline, and procurement constraints.
2. Build three package options with price, scope, term, services, and usage limits.
3. Calculate ARR, margin, payback, and renewal risk for each option.
4. Attach discount conditions that protect future pricing.
5. Recommend one option plus fallback positions for negotiation.

## Verification

- Discount rationale is tied to customer value or reciprocal commitment.
- Finance-sensitive assumptions are labeled.
- Approval requirements are explicit.
