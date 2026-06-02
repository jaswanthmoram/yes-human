---
id: sales.competitive-selling
name: Competitive Selling Framework
version: 1.0.0
domain: sales
category: sales.strategy
purpose: Develop competitive positioning and battle cards that help sellers differentiate against specific competitors in active deals.
summary: Competitive positioning, battle card creation, and win/loss analysis integration for competitive deal situations.
triggers:
  - competitive positioning for deal
  - battle card creation
  - competitive selling strategy
  - win loss analysis for selling
  - competitor comparison for buyer
  - competitive differentiation
aliases:
  - competitive selling
  - battle cards
  - competitive positioning
negative_keywords:
  - market research
  - product competitive analysis
  - competitive intelligence gathering
inputs:
  - competitive_landscape
  - win_loss_data
  - deal_context
outputs:
  - competitive_positioning
  - battle_cards
  - differentiation_strategy
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates positioning without win/loss evidence
  - Makes unsubstantiated claims about competitors
  - Confuses competitive selling with market research
verification:
  - Positioning backed by win/loss data
  - Claims about competitors evidenced
  - Differentiation specific to deal context
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
Develop competitive positioning and battle cards that help sellers differentiate against specific competitors in active deals.

## When To Use
- Creating battle cards for specific competitors
- Developing competitive positioning for active deals
- Analyzing win/loss data for selling insights
- Training sellers on competitive differentiation

## When Not To Use
- Market research belongs to research domain
- Product competitive analysis belongs to product-business
- Competitive intelligence gathering belongs to research

## Procedure
1. Identify the competitive landscape for the deal or segment.
2. Analyze win/loss data for patterns against specific competitors.
3. Develop positioning that highlights differentiation with evidence.
4. Create battle cards with objection responses and landmines.
5. Test positioning against real deal outcomes.
6. Update battle cards based on new competitive intelligence.

## Tool Policy
- Use `filesystem.read` to access win/loss data and competitive intelligence.
- Use `filesystem.write` to save battle cards and positioning guides.

## Verification
- Positioning backed by win/loss data or case studies
- Competitor claims evidenced with data or third-party sources
- Differentiation specific to deal context and buyer needs

## Failure Modes
- Making claims about competitors without evidence
- Generic positioning not tailored to deal context
- Not updating battle cards with new competitive intelligence

## Example Routes
- "create battle card for Competitor X"
- "develop competitive positioning for enterprise deals"
- "analyze win/loss data against Competitor Y"

## Source Notes
- Klue competitive intelligence methodology
- Reference: ref.github.sales.2026-05-31
