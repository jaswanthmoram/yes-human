---
id: marketing.linkedin-ads
name: LinkedIn Ads
version: 1.0.0
domain: marketing
category: marketing.paid-media
purpose: Design B2B advertising campaigns on LinkedIn with professional targeting, sponsored content, and lead gen forms.
summary: LinkedIn Ads campaign setup covering professional audience targeting, ad formats, bidding, and lead generation.
triggers:
  - set up linkedin ads for B2B SaaS
  - linkedin ads campaign
  - b2b advertising on linkedin
  - linkedin sponsored content
  - linkedin lead gen forms
aliases:
  - linkedin ads
  - linkedin advertising
negative_keywords:
  - facebook ads
  - google ads
  - consumer advertising
inputs:
  - b2b_objective
  - target_professionals
  - budget_range
outputs:
  - campaign_plan
  - audience_targeting
  - ad_creative_brief
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Targeting too narrow with high CPMs
  - Using consumer creative for B2B audience
  - Ignoring LinkedIn's unique ad formats
verification:
  - Professional targeting validated
  - Ad format appropriate for objective
  - Lead gen or conversion tracking configured
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Pause campaigns if CPL exceeds threshold
validators:
  - skill.validator
---

## Mission
Design and optimize LinkedIn advertising campaigns that reach professional audiences and generate B2B leads.

## When To Use
- When setting up B2B advertising campaigns
- When targeting specific professional audiences
- For LinkedIn lead generation form campaigns
- During sponsored content planning

## When Not To Use
- For consumer advertising (use facebook-ads)
- For search advertising (use google-ads)
- For organic LinkedIn content (use social-media-strategy)

## Procedure
1. **Objective Selection**: Choose awareness, consideration, or conversion objective.
2. **Audience Targeting**: Define by job title, function, seniority, company size, and industry.
3. **Ad Format Selection**: Choose sponsored content, message ads, text ads, or dynamic ads.
4. **Creative Strategy**: Develop professional messaging and creative assets.
5. **Bidding and Budget**: Set bid strategy and daily/total budget.
6. **Lead Gen Setup**: Configure lead generation forms and CRM integration.

## Tool Policy
- Use `filesystem.read` to review campaign data.
- Use `web.search` for LinkedIn advertising best practices.
- Use `filesystem.write` to produce campaign plans.

## Verification
- Professional audience properly segmented
- Ad format matches campaign objective
- Lead quality tracking configured

## Failure Modes
- Over-targeting leading to high CPMs
- Generic creative not suited for LinkedIn feed
- Ignoring matched audience and account targeting

## Example Routes
- `set up LinkedIn ads for B2B SaaS`
- `create LinkedIn lead gen campaign`
- `optimize LinkedIn sponsored content`

## Source Notes
- LinkedIn Marketing Solutions documentation
- LinkedIn advertising best practices guides
- Reference: ref.github.marketing.2026-05-31
