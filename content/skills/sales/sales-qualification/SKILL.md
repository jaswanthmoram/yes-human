---
id: sales.sales-qualification
name: Sales Qualification Framework
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Qualify leads and opportunities using structured frameworks like MEDDIC, BANT, and CHAMP to focus seller effort on winnable deals.
summary: Structured qualification using MEDDIC, BANT, and CHAMP frameworks with scoring and disqualification criteria.
triggers:
  - score this opportunity with BANT framework
  - qualify a lead
  - opportunity qualification review
  - MEDDIC assessment
  - BANT scoring
  - lead qualification check
  - deal qualification framework
  - qualification criteria design
aliases:
  - qualification
  - lead qual
  - MEDDIC
negative_keywords:
  - marketing lead scoring
  - customer satisfaction survey
  - product feature request
inputs:
  - lead_data
  - qualification_framework
  - scoring_criteria
outputs:
  - qualification_score
  - fit_assessment
  - next_step_recommendation
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Qualifies without sufficient data points
  - Confuses marketing lead score with sales qualification
  - Skips disqualification criteria
verification:
  - Framework applied completely
  - Score tied to evidence
  - Disqualification criteria checked
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
Apply structured qualification frameworks to assess lead and opportunity fit, producing scored recommendations that focus seller effort on winnable deals.

## When To Use
- Qualifying inbound or outbound leads
- Reviewing opportunity fit before investing seller time
- Designing qualification criteria for a new market segment
- Scoring deals in pipeline review

## When Not To Use
- Marketing lead scoring belongs to marketing
- Customer satisfaction surveys belong to customer success
- Product feature requests belong to product-business

## Procedure
1. Select the appropriate framework (MEDDIC, BANT, CHAMP) based on deal complexity.
2. Gather lead data against each framework dimension.
3. Score each dimension with supporting evidence.
4. Identify disqualification criteria and check against them.
5. Produce a qualification recommendation with confidence level.
6. Define next steps based on qualification outcome.

## Tool Policy
- Use `filesystem.read` to access lead data and CRM exports.
- Use `filesystem.write` to save qualification assessments.

## Verification
- Framework dimensions fully assessed with evidence
- Score includes confidence level and data gaps
- Disqualification criteria explicitly checked

## Failure Modes
- Qualifying on incomplete data without flagging gaps
- Confusing marketing lead score with sales qualification
- Skipping disqualification criteria to avoid saying no

## Example Routes
- "qualify this inbound lead from the demo request"
- "MEDDIC assessment for enterprise opportunity"
- "design qualification criteria for SMB segment"

## Source Notes
- MEDDIC: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion
- BANT: Budget, Authority, Need, Timeline
- CHAMP: Challenges, Authority, Money, Prioritization
- Reference: ref.github.sales.2026-05-31
