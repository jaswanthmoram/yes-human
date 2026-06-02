---
id: sales.closing-techniques
name: Closing Techniques Framework
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Apply structured closing techniques matched to deal stage, buyer signals, and urgency to advance deals to commitment.
summary: Closing technique selection, commitment sequencing, and urgency creation patterns for advancing deals to close.
triggers:
  - create urgency framework for Q4 pipeline
  - design a close plan for this enterprise deal
  - closing technique selection
  - deal closing strategy
  - commitment sequence design
  - urgency creation framework
  - close plan development
  - deal acceleration tactics
aliases:
  - closing
  - deal close
  - closing strategy
negative_keywords:
  - contract signing
  - legal close
  - implementation kickoff
inputs:
  - deal_stage
  - buyer_signals
  - urgency_factors
outputs:
  - closing_strategy
  - commitment_sequence
  - urgency_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Attempts close without reading buyer signals
  - Uses pressure tactics when buyer needs more time
  - Skips mutual action planning
verification:
  - Close technique matched to buyer signals
  - Commitment sequence defined
  - Urgency tied to buyer outcomes not seller quota
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Apply structured closing techniques matched to deal stage, buyer signals, and urgency to advance deals to commitment.

## When To Use
- Designing close plans for late-stage deals
- Selecting closing techniques based on buyer behavior
- Creating urgency frameworks tied to buyer outcomes
- Training sellers on commitment-seeking behaviors

## When Not To Use
- Contract signing belongs to legal-compliance
- Legal close belongs to legal-compliance
- Implementation kickoff belongs to customer success

## Procedure
1. Assess deal stage and buyer readiness signals.
2. Identify urgency factors tied to buyer outcomes.
3. Select closing technique matched to the situation.
4. Design a commitment sequence with escalating asks.
5. Create a mutual action plan with buyer timeline.
6. Define fallback positions if the primary close fails.

## Tool Policy
- Use `filesystem.read` to access deal data and buyer engagement history.
- Use `filesystem.write` to save close plans and commitment sequences.

## Verification
- Close technique matched to buyer signals and deal stage
- Commitment sequence has clear escalation path
- Urgency tied to buyer outcomes, not seller quota

## Failure Modes
- Pushing for close when buyer signals indicate unreadiness
- Using generic closing techniques without situational adaptation
- Creating false urgency that damages trust

## Example Routes
- "design a close plan for this enterprise deal"
- "select closing technique for hesitant buyer"
- "create urgency framework for Q4 pipeline"

## Source Notes
- Assumptive Close, Summary Close, Alternative Close, Urgency Close
- Reference: ref.github.sales.2026-05-31
