---
id: marketing.email-campaigns
name: Email Campaigns
version: 1.0.0
domain: marketing
category: marketing.email
purpose: Design and execute email marketing campaigns with segmentation, personalization, and deliverability optimization.
summary: Email campaign creation covering list segmentation, subject lines, body copy, automation triggers, and deliverability.
triggers:
  - create email campaign for product launch
  - create email campaign
  - email sequence design
  - newsletter campaign plan
  - drip campaign setup
aliases:
  - email campaign
  - email marketing campaign
negative_keywords:
  - transactional email
  - sms marketing
  - push notifications
inputs:
  - campaign_goal
  - audience_segments
  - content_theme
outputs:
  - campaign_brief
  - email_copy_drafts
  - segmentation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Sending without list segmentation
  - Ignoring deliverability and sender reputation
  - Missing unsubscribe and consent handling
verification:
  - Segmentation strategy defined
  - Deliverability best practices followed
  - Compliance requirements met
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Pause campaign if bounce rate exceeds threshold
validators:
  - skill.validator
---

## Mission
Design email campaigns that reach the inbox, engage subscribers, and drive measurable conversions with full compliance.

## When To Use
- When creating new email marketing campaigns
- When designing drip or nurture sequences
- During newsletter planning
- For email list segmentation strategy

## When Not To Use
- For transactional emails (password resets, receipts)
- For marketing automation workflows (use marketing-automation)
- For deliverability troubleshooting (use email-marketer agent)

## Procedure
1. **Goal and Audience**: Define campaign objective and target segments.
2. **Segmentation**: Split list by behavior, demographics, or engagement level.
3. **Subject Line**: Write compelling subject lines with A/B test variants.
4. **Body Copy**: Draft email content with clear value proposition and CTA.
5. **Design**: Plan responsive layout with mobile-first approach.
6. **Deliverability**: Check sender reputation, authentication (SPF/DKIM/DMARC), and list hygiene.

## Tool Policy
- Use `filesystem.read` to review subscriber data and past campaign performance.
- Use `filesystem.write` to produce campaign briefs and copy.

## Verification
- Segmentation strategy documented
- Subject lines A/B tested
- Compliance (CAN-SPAM, GDPR) verified

## Failure Modes
- Sending to unsegmented lists
- Ignoring mobile rendering
- Missing plain-text fallback

## Example Routes
- `create email campaign for product launch`
- `design drip sequence for new subscribers`
- `plan newsletter campaign for Q3`

## Source Notes
- Mailchimp email marketing guides
- Litmus email best practices
- Reference: ref.github.marketing.2026-05-31
