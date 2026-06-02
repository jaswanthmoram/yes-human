---
id: sales.discovery-calls
name: Discovery Call Design
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Structure discovery conversations that uncover buyer pain, decision process, and success criteria through effective questioning techniques.
summary: Discovery call frameworks with question sequences, active listening patterns, and note-taking structures for productive first meetings.
triggers:
  - design a discovery call
  - discovery question framework
  - first meeting structure
  - buyer interview guide
  - discovery call preparation
  - pain identification questions
aliases:
  - discovery
  - first call
  - buyer interview
negative_keywords:
  - product demo
  - closing call
  - customer support call
inputs:
  - buyer_persona
  - product_capabilities
  - call_objective
outputs:
  - discovery_guide
  - question_sequence
  - note_template
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates questions without linking to buyer persona
  - Skips pain identification in favor of product pitch
  - No structure for capturing buyer responses
verification:
  - Questions tied to persona and pain
  - Open-ended questions prioritized
  - Note template included
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
Design discovery call structures that systematically uncover buyer pain, decision process, and success criteria through effective questioning techniques.

## When To Use
- Preparing for first buyer meetings
- Designing discovery frameworks for new market segments
- Training sellers on discovery techniques
- Creating question guides for specific buyer personas

## When Not To Use
- Product demonstrations belong to product-demos skill
- Closing calls belong to closing-techniques skill
- Customer support calls belong to customer success

## Procedure
1. Define the call objective tied to the deal stage.
2. Research the buyer persona and likely pain points.
3. Design open-ended questions that explore pain, impact, and urgency.
4. Structure the question sequence from broad to specific.
5. Create a note template for capturing responses and next steps.
6. Include follow-up questions for deeper exploration.

## Tool Policy
- Use `filesystem.read` to access buyer persona data and product information.
- Use `filesystem.write` to save discovery guides and templates.

## Verification
- Questions linked to buyer persona and known pain areas
- Open-ended questions outnumber closed questions
- Note template captures pain, impact, and next steps

## Failure Modes
- Creating a product pitch disguised as discovery
- Skipping pain identification questions
- No structure for capturing and acting on buyer responses

## Example Routes
- "design a discovery call for CFO persona"
- "create discovery questions for enterprise IT buyer"
- "build a discovery framework for SMB segment"

## Source Notes
- SPIN Selling: Situation, Problem, Implication, Need-Payoff
- Reference: ref.github.sales.2026-05-31
