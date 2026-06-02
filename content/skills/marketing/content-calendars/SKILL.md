---
id: marketing.content-calendars
name: Content Calendars
version: 1.0.0
domain: marketing
category: marketing.content
purpose: Plan and structure editorial content calendars with topic clusters, publishing cadence, and distribution alignment.
summary: Content calendar creation covering topic planning, publishing schedule, format mix, and channel distribution.
triggers:
  - create content calendar
  - editorial calendar planning
  - content publishing schedule
  - quarterly content plan
aliases:
  - content calendar
  - editorial calendar
negative_keywords:
  - one-off blog post
  - ad copy writing
  - email sequence
inputs:
  - content_pillars
  - publishing_frequency
  - channel_mix
outputs:
  - content_calendar
  - topic_roadmap
  - distribution_schedule
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Calendar without topic cluster alignment
  - Publishing frequency without resource reality
  - Missing distribution planning per piece
verification:
  - Topics aligned with content pillars
  - Cadence realistic for team capacity
  - Distribution channels assigned per piece
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Reduce publishing frequency if quality drops
validators:
  - skill.validator
---

## Mission
Create structured content calendars that align topic clusters, publishing cadence, and distribution channels with marketing goals.

## When To Use
- When planning quarterly or monthly content
- Before launching a content marketing program
- When restructuring an existing editorial calendar
- During content strategy development

## When Not To Use
- For single blog posts (use blog-writing)
- For social media scheduling (use social-media-strategy)
- For email campaign planning (use email-campaigns)

## Procedure
1. **Define Content Pillars**: Identify 3-5 core themes aligned with audience needs and business goals.
2. **Topic Clustering**: Generate topic ideas within each pillar using keyword research and audience questions.
3. **Format Mix**: Plan content formats (blog, video, infographic, podcast) per topic.
4. **Publishing Cadence**: Set realistic frequency based on team capacity and audience expectations.
5. **Channel Distribution**: Assign distribution channels for each content piece.
6. **Review Cycles**: Build in review and optimization checkpoints.

## Tool Policy
- Use `filesystem.read` to review existing content and analytics.
- Use `filesystem.write` to produce calendar documents.

## Verification
- Each pillar has sufficient topic coverage
- Publishing schedule is sustainable
- Distribution plan included for each piece

## Failure Modes
- Planning without considering production capacity
- Ignoring seasonal and trending opportunities
- No distribution plan attached to content

## Example Routes
- `create Q3 content calendar for SaaS blog`
- `plan editorial calendar for product launch`
- `structure content calendar around topic clusters`

## Source Notes
- Content Marketing Institute editorial planning
- HubSpot content calendar templates
- Reference: ref.github.marketing.2026-05-31
