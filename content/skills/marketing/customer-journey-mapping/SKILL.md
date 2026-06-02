---
id: marketing.customer-journey-mapping
name: Customer Journey Mapping
version: 1.0.0
domain: marketing
category: marketing.strategy
purpose: Map customer journeys from awareness to advocacy with touchpoint analysis, pain points, and opportunity identification.
summary: Customer journey mapping covering stage definition, touchpoint inventory, emotion mapping, and gap analysis.
triggers:
  - map customer journey
  - buyer journey analysis
  - touchpoint audit
  - customer experience mapping
aliases:
  - journey mapping
  - customer journey
negative_keywords:
  - user flow design
  - product onboarding
  - service blueprint
inputs:
  - buyer_persona
  - current_touchpoints
  - customer_feedback
outputs:
  - journey_map
  - touchpoint_analysis
  - opportunity_roadmap
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Mapping from company perspective not customer
  - Ignoring emotional state at each stage
  - Journey map without actionable opportunities
verification:
  - Customer perspective maintained
  - Emotion and pain points mapped
  - Actionable opportunities identified
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Simplify journey stages if map becomes too complex
validators:
  - skill.validator
---

## Mission
Map customer journeys that reveal touchpoint gaps, pain points, and opportunities for marketing optimization.

## When To Use
- When understanding the buyer's path to purchase
- During marketing strategy development
- When identifying content and touchpoint gaps
- For cross-functional alignment on customer experience

## When Not To Use
- For UX user flow design (use design-content)
- For product onboarding flows (use product-business)
- For service design blueprints (use design-content)

## Procedure
1. **Stage Definition**: Define journey stages from awareness through advocacy.
2. **Touchpoint Inventory**: Catalog all customer touchpoints per stage.
3. **Emotion Mapping**: Document customer emotions, questions, and pain points per stage.
4. **Gap Analysis**: Identify missing touchpoints and content gaps.
5. **Opportunity Identification**: Prioritize improvements by impact and feasibility.
6. **Alignment**: Share journey map across marketing, sales, and product teams.

## Tool Policy
- Use `filesystem.read` to review customer data and feedback.
- Use `web.search` for journey mapping methodologies.
- Use `filesystem.write` to produce journey maps.

## Verification
- Journey told from customer perspective
- Each stage has touchpoints, emotions, and pain points
- Opportunities prioritized and actionable

## Failure Modes
- Creating journey maps without customer research
- Ignoring post-purchase and advocacy stages
- Maps that are too complex to act on

## Example Routes
- `map customer journey for B2B SaaS purchase`
- `analyze buyer journey touchpoint gaps`
- `create customer journey for e-commerce`

## Source Notes
- Nielsen Norman Group journey mapping guides
- HubSpot buyer journey methodology
- Reference: ref.github.marketing.2026-05-31
