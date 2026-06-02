---
id: startup-ops.pitch-decks
name: Pitch Deck Creation
version: 1.0.0
domain: startup-ops
category: startup-ops.fundraising
purpose: Create investor-ready pitch decks following proven frameworks and storytelling structures.
summary: Guides through slide-by-slide pitch deck creation with narrative flow, data visualization, and investor-ready formatting.
triggers:
  - pitch deck
  - investor deck
  - startup presentation
  - demo day slides
activation_triggers:
  - pitch deck
  - investor deck
  - startup presentation
  - demo day slides
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Define the problem and market opportunity
  - Present the solution and product vision
  - Show traction and key metrics
  - Explain the business model
  - Detail the go-to-market strategy
  - Present the team and why now
  - State the ask and use of funds
outputs:
  - pitch_deck_outline
  - narrative_script
  - data_slides
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Starts with solution before problem
  - Overloads slides with text
  - Missing clear ask and use of funds
handoffs:
  - startup-ops.pitch-deck-creator
  - startup-ops.fundraising-specialist
source_references:
  - ref.github.startup-ops.2026-05-31
allowed_agents:
  - startup-ops.startup-strategist
  - startup-ops.business-model-designer
  - startup-ops.customer-development
allowed_workflows:
  - startup-ops.business-model-validation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when pitch deck or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Define the problem and market opportunity**: define the problem and market opportunity with evidence and documentation.
2. **Present the solution and product vision**: present the solution and product vision with evidence and documentation.
3. **Show traction and key metrics**: show traction and key metrics with evidence and documentation.
4. **Explain the business model**: explain the business model with evidence and documentation.
5. **Detail the go-to-market strategy**: detail the go-to-market strategy with evidence and documentation.
6. **Present the team and why now**: present the team and why now with evidence and documentation.
7. **State the ask and use of funds**: state the ask and use of funds with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Starts with solution before problem
- Overloads slides with text
- Missing clear ask and use of funds

## Examples
### Pitch Deck Creation Example
Input: pitch deck for a B2B SaaS startup
Output:
- pitch_deck_outline with evidence-based entries
- narrative_script with prioritized items
- data_slides with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
