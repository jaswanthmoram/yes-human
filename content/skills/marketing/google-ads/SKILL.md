---
id: marketing.google-ads
name: Google Ads
version: 1.0.0
domain: marketing
category: marketing.paid-media
purpose: Design, structure, and optimize Google Ads campaigns for search, display, and performance max.
summary: Google Ads campaign setup covering structure, bidding, targeting, ad copy, and optimization strategies.
triggers:
  - set up google ads campaign
  - google ads optimization
  - search ads structure
  - performance max setup
aliases:
  - google ads
  - adwords
negative_keywords:
  - facebook ads
  - organic seo
  - social media
inputs:
  - campaign_goal
  - target_keywords
  - budget_allocation
outputs:
  - campaign_structure
  - ad_copy_drafts
  - optimization_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Broad match without negative keywords
  - Missing conversion tracking setup
  - Ad groups with unrelated keywords
verification:
  - Campaign structure follows best practices
  - Bidding strategy aligned with goal
  - Negative keyword list included
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Pause campaigns if spend exceeds budget thresholds
validators:
  - skill.validator
---

## Mission
Design and optimize Google Ads campaigns that drive qualified traffic and conversions within budget constraints.

## When To Use
- When setting up new Google Ads campaigns
- When optimizing existing search or display campaigns
- During Performance Max campaign planning
- For ad copy and extension creation

## When Not To Use
- For Facebook/Meta ads (use facebook-ads)
- For LinkedIn ads (use linkedin-ads)
- For organic search optimization (use on-page-seo)

## Procedure
1. **Campaign Structure**: Organize campaigns by theme, product line, or funnel stage.
2. **Keyword Strategy**: Build tightly themed ad groups with match type strategy.
3. **Ad Copy**: Write compelling headlines, descriptions, and extensions.
4. **Bidding Strategy**: Select bidding approach aligned with conversion goal.
5. **Targeting**: Configure audience, location, device, and schedule targeting.
6. **Optimization**: Plan negative keywords, bid adjustments, and A/B testing.

## Tool Policy
- Use `filesystem.read` to review campaign data and reports.
- Use `web.search` for Google Ads best practices and updates.
- Use `filesystem.write` to produce campaign plans.

## Verification
- Ad groups contain tightly themed keywords
- Conversion tracking configured
- Budget and bidding aligned with goals

## Failure Modes
- Using broad match without negative keywords
- Ignoring quality score optimization
- Missing ad extension opportunities

## Example Routes
- `set up Google Ads for SaaS product`
- `optimize existing search campaigns`
- `create Performance Max campaign`

## Source Notes
- Google Ads Help Center
- WordStream PPC management guides
- Reference: ref.github.marketing.2026-05-31
