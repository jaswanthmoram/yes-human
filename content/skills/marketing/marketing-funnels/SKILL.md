---
id: marketing.marketing-funnels
name: Marketing Funnels
version: 1.0.0
domain: marketing
category: marketing.strategy
purpose: Design marketing funnels that guide prospects from awareness to conversion with stage-appropriate content and touchpoints.
summary: Marketing funnel design covering awareness, consideration, decision stages with content mapping and conversion points.
triggers:
  - design marketing funnel
  - funnel stage mapping
  - conversion funnel review
  - buyer journey funnel
aliases:
  - marketing funnel
  - conversion funnel
negative_keywords:
  - sales pipeline
  - customer support flow
  - product onboarding
inputs:
  - buyer_persona
  - product_or_service
  - current_funnel_data
outputs:
  - funnel_blueprint
  - stage_content_map
  - conversion_optimization_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Missing middle-of-funnel content
  - No lead handoff criteria between stages
  - Funnel without measurement at each stage
verification:
  - All funnel stages defined
  - Content mapped to each stage
  - Conversion metrics per stage
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Simplify funnel stages if drop-off is too high
validators:
  - skill.validator
---

## Mission
Design marketing funnels that systematically move prospects from awareness to conversion with appropriate content and touchpoints at each stage.

## When To Use
- When building a new marketing funnel
- When auditing existing funnel performance
- During campaign architecture planning
- For lead nurturing strategy development

## When Not To Use
- For sales pipeline management (use sales domain)
- For customer onboarding flows (use product-business)
- For website UX flows (use design-content)

## Procedure
1. **Stage Definition**: Map awareness, consideration, decision, and retention stages.
2. **Audience Mapping**: Align buyer persona journey to funnel stages.
3. **Content Mapping**: Assign content types and formats to each stage.
4. **Conversion Points**: Define CTAs and conversion actions per stage.
5. **Handoff Criteria**: Set lead qualification thresholds between stages.
6. **Measurement**: Define KPIs and conversion rates per stage.

## Tool Policy
- Use `filesystem.read` to review existing funnel data.
- Use `filesystem.write` to produce funnel blueprints.

## Verification
- Each stage has defined entry and exit criteria
- Content mapped to every funnel stage
- Conversion metrics established per stage

## Failure Modes
- Skipping middle-of-funnel nurture content
- No lead scoring between stages
- Funnel stages without measurement

## Example Routes
- `design marketing funnel for SaaS trial`
- `map content to buyer journey stages`
- `audit conversion funnel drop-off points`

## Source Notes
- HubSpot marketing funnel methodology
- Marketo funnel design guides
- Reference: ref.github.marketing.2026-05-31
