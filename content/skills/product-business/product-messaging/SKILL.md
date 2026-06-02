---
id: product-business.product-messaging
name: Product Messaging
version: 1.0.0
domain: product-business
category: product-business.communications
purpose: Create consistent product messaging across all channels aligned with positioning and target audience.
summary: Guides through messaging hierarchy creation, channel adaptation, and consistency auditing.
triggers:
  - messaging for new feature announcement
  - product messaging
  - messaging framework
  - messaging hierarchy
  - product copy guidelines
activation_triggers:
  - create messaging
  - messaging for launch
  - consistent product copy
prerequisites:
  - product positioning defined
  - target audience identified
inputs:
  - positioning_statement
  - target_audience
  - channel_list
steps:
  - Define core messaging pillars from positioning
  - Create messaging hierarchy (headline, sub-headline, supporting points)
  - Adapt messaging for each channel and format
  - Create messaging guidelines for consistency
  - Audit existing content for messaging alignment
  - Test messaging with target audience
outputs:
  - messaging_hierarchy
  - channel_adaptations
  - messaging_guidelines
tools:
  - filesystem.read
quality_gates:
  - Messaging is consistent across channels
  - Adapted to channel context without losing core message
  - Tested with target audience
failure_modes:
  - Inconsistent messaging across channels
  - Copy that doesn't match product reality
  - Not adapting messaging to channel context
handoffs:
  - product-business.product-marketer (for GTM integration)
  - product-business.product-writer (for documentation)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-marketer
  - product-business.product-writer
  - product-business.master
allowed_workflows:
  - product-business.product-launch
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when creating or auditing product messaging.

## Prerequisites
- Product positioning defined
- Target audience identified

## Steps
1. **Pillars**: Extract 3-4 messaging pillars from positioning.
2. **Hierarchy**: Headline (value prop), Sub-headline (how), Supporting points (proof).
3. **Adapt**: Tailor for website, ads, sales decks, docs, and social.
4. **Guidelines**: Create do/don't examples and tone specifications.
5. **Audit**: Review existing content for alignment gaps.
6. **Test**: Validate with 5-10 target customers for clarity and resonance.

## Verification
- Messaging is consistent across all channels
- Each channel version maintains core message
- Guidelines are clear enough for any writer to follow

## Rollback
- No state changes; this is a communications skill

## Common Failures
- Different teams using different value propositions
- Messaging that overpromises vs. product reality
- Not updating messaging as product evolves

## Examples
### Messaging Hierarchy
Headline: "Ship products your customers love"
Sub-headline: "The product platform that connects user feedback to your roadmap"
Supporting: "Used by 10,000+ product teams" | "Integrates with your existing tools" | "Set up in 5 minutes"

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
