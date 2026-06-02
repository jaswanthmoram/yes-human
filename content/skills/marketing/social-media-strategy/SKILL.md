---
id: marketing.social-media-strategy
name: Social Media Strategy
version: 1.0.0
domain: marketing
category: marketing.social
purpose: Develop platform-specific social media strategies with content pillars, engagement tactics, and measurement frameworks.
summary: Social media strategy covering platform selection, content pillars, engagement protocols, and performance measurement.
triggers:
  - social media strategy
  - social platform plan
  - social engagement strategy
  - social media audit
aliases:
  - social strategy
  - social media plan
negative_keywords:
  - paid social ads
  - influencer partnerships
  - email marketing
inputs:
  - business_goals
  - target_audience
  - current_social_presence
outputs:
  - social_strategy_doc
  - content_pillars
  - measurement_framework
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Same content across all platforms
  - Ignoring community management
  - Measuring followers instead of engagement
verification:
  - Platform-specific content strategy
  - Engagement protocols defined
  - KPIs beyond vanity metrics
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Reduce platform count if quality drops
validators:
  - skill.validator
---

## Mission
Develop platform-specific social media strategies that build audience engagement and support business goals.

## When To Use
- When creating a new social media strategy
- When auditing existing social presence
- During platform expansion planning
- For community management protocol design

## When Not To Use
- For paid social advertising (use facebook-ads or linkedin-ads)
- For influencer marketing (use influencer-marketer agent)
- For content calendar creation (use content-calendars)

## Procedure
1. **Platform Selection**: Choose platforms based on audience presence and business goals.
2. **Content Pillars**: Define 3-5 content themes for each platform.
3. **Content Mix**: Plan format distribution (text, image, video, stories, live).
4. **Engagement Protocols**: Define response times, tone, and escalation paths.
5. **Publishing Cadence**: Set frequency per platform based on algorithm and audience behavior.
6. **Measurement**: Define KPIs aligned with business objectives.

## Tool Policy
- Use `filesystem.read` to review existing social data.
- Use `web.search` for platform updates and trends.
- Use `filesystem.write` to produce strategy documents.

## Verification
- Each platform has tailored content strategy
- Community management protocols documented
- KPIs connected to business outcomes

## Failure Modes
- Cross-posting identical content everywhere
- Ignoring platform algorithm changes
- No crisis communication protocol

## Example Routes
- `create social media strategy for B2B startup`
- `audit current social media presence`
- `plan social engagement for product launch`

## Source Notes
- Sprout Social strategy guides
- Hootsuite social media planning resources
- Reference: ref.github.marketing.2026-05-31
