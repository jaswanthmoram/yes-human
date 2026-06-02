---
id: product-business.go-to-market
name: Go to Market
version: 1.0.0
domain: product-business
category: product-business.launch
purpose: Plan and execute go-to-market strategies for new products, features, or market expansions.
summary: Guides through GTM strategy including target market, positioning, channels, launch plan, and success metrics.
triggers:
  - go to market
  - gtm strategy
  - gtm plan
  - market entry plan
activation_triggers:
  - plan the launch
  - gtm for new feature
  - market entry strategy
prerequisites:
  - product or feature ready for market
  - target market defined
inputs:
  - product_offering
  - target_market
  - launch_timeline
steps:
  - Define target market and ideal customer profile
  - Craft positioning and messaging for target segment
  - Select distribution and marketing channels
  - Build launch timeline with milestones
  - Define success metrics and measurement plan
  - Create sales enablement and support materials
outputs:
  - gtm_strategy
  - launch_timeline
  - success_metrics
tools:
  - filesystem.read
quality_gates:
  - Target market is specific and reachable
  - Messaging is differentiated and tested
  - Success metrics are measurable
failure_modes:
  - Launching without clear target market
  - Messaging that doesn't resonate with target segment
  - No measurement plan for post-launch
handoffs:
  - product-business.product-launcher (for launch execution)
  - product-business.product-marketer (for messaging)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-marketer
  - product-business.product-launcher
  - product-business.master
allowed_workflows:
  - product-business.product-launch
status: active
budget_band: standard
rollback:
  - Delay launch if readiness criteria not met
validators:
  - skill.validator
---

## Trigger
Use this skill when planning a go-to-market strategy for a product or feature launch.

## Prerequisites
- Product or feature ready for market
- Target market defined

## Steps
1. **Target Market**: Define ICP (Ideal Customer Profile) with firmographics and pain points.
2. **Positioning**: Craft unique value proposition and key differentiators.
3. **Channels**: Select acquisition channels (organic, paid, partnerships, sales-led).
4. **Timeline**: Build 8-12 week launch plan with pre-launch, launch, and post-launch phases.
5. **Metrics**: Define success metrics (signups, revenue, adoption, NPS).
6. **Enablement**: Create sales decks, battle cards, and support documentation.

## Verification
- ICP is specific and validated
- Messaging tested with target customers
- Launch readiness checklist is complete

## Rollback
- Delay launch if readiness criteria not met

## Common Failures
- Building product without validating market demand
- Launching to everyone instead of focused ICP
- No post-launch measurement and iteration

## Examples
### GTM Summary
Product: Team collaboration feature
ICP: Product teams at Series A-C startups (20-200 employees)
Positioning: "The simplest way to keep your product team aligned"
Channels: Product-led growth, content marketing, community
Success: 500 active teams in first 90 days

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
