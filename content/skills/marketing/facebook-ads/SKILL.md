---
id: marketing.facebook-ads
name: Facebook Ads
version: 1.0.0
domain: marketing
category: marketing.paid-media
purpose: Design and optimize Meta/Facebook advertising campaigns across Facebook, Instagram, and Audience Network.
summary: Facebook/Meta ads campaign setup covering audience targeting, creative strategy, budget allocation, and optimization.
triggers:
  - facebook ads campaign
  - meta ads setup
  - instagram advertising
  - social ads optimization
aliases:
  - facebook ads
  - meta ads
negative_keywords:
  - google ads
  - linkedin ads
  - organic social
inputs:
  - campaign_objective
  - target_audience
  - creative_assets
outputs:
  - campaign_plan
  - audience_targeting
  - creative_brief
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Audience too broad without lookalike refinement
  - Creative fatigue without refresh schedule
  - Missing pixel and conversion API setup
verification:
  - Audience segments defined
  - Creative variations planned
  - Tracking and attribution configured
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Pause ad sets if CPA exceeds threshold
validators:
  - skill.validator
---

## Mission
Design and optimize Meta advertising campaigns that reach target audiences and drive conversions across Facebook and Instagram.

## When To Use
- When setting up Facebook or Instagram ad campaigns
- When optimizing existing Meta ad performance
- During audience targeting strategy development
- For creative testing and iteration planning

## When Not To Use
- For Google Ads campaigns (use google-ads)
- For LinkedIn B2B advertising (use linkedin-ads)
- For organic social media (use social-media-strategy)

## Procedure
1. **Objective Selection**: Choose campaign objective aligned with funnel stage.
2. **Audience Building**: Define custom, lookalike, and saved audiences.
3. **Creative Strategy**: Plan ad formats, copy variations, and visual assets.
4. **Budget and Bidding**: Set budget allocation and bid strategy.
5. **Placement Optimization**: Select automatic or manual placements.
6. **Measurement**: Configure Meta Pixel, Conversions API, and attribution windows.

## Tool Policy
- Use `filesystem.read` to review campaign data.
- Use `web.search` for Meta advertising best practices.
- Use `filesystem.write` to produce campaign plans.

## Verification
- Audience targeting specific and measurable
- Creative variations planned for testing
- Conversion tracking properly configured

## Failure Modes
- Targeting audiences too broad or narrow
- Ignoring iOS privacy changes on attribution
- Not planning for creative fatigue

## Example Routes
- `set up Facebook ads for e-commerce`
- `optimize Instagram ad campaigns`
- `create lookalike audience strategy`

## Source Notes
- Meta Business Help Center
- Jon Loomer Facebook advertising guides
- Reference: ref.github.marketing.2026-05-31
