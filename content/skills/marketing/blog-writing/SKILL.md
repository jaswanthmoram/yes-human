---
id: marketing.blog-writing
name: Blog Writing
version: 1.0.0
domain: marketing
category: marketing.content
purpose: Draft SEO-optimized blog posts with clear structure, audience value, and conversion-oriented CTAs.
summary: Blog post writing process covering research, outlining, drafting, SEO optimization, and CTA placement.
triggers:
  - write blog post
  - draft blog article
  - seo blog content
  - long-form content draft
aliases:
  - blog writing
  - blog post creation
negative_keywords:
  - landing page copy
  - email copy
  - ad copy
inputs:
  - topic_and_angle
  - target_keyword
  - audience_persona
outputs:
  - blog_outline
  - draft_post
  - seo_checklist
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Writing for length instead of value
  - Missing clear angle or thesis
  - No CTA or next step for reader
verification:
  - Clear angle and thesis stated
  - SEO elements optimized
  - CTA included and relevant
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Rewrite with different angle if draft misses audience intent
validators:
  - skill.validator
---

## Mission
Draft high-quality blog posts that serve audience intent, rank in search, and drive measurable engagement or conversions.

## When To Use
- When writing new blog content
- During content refresh for existing posts
- When creating pillar or cluster content
- For guest post drafting

## When Not To Use
- For landing page copy (use conversion-optimization)
- For email content (use email-campaigns)
- For social media posts (use social-media-strategy)

## Procedure
1. **Research and Angle**: Research topic, identify unique angle, and validate audience demand.
2. **Outline**: Structure with H2/H3 headings, key points, and supporting evidence.
3. **Draft**: Write with clarity, examples, and actionable takeaways.
4. **SEO Optimization**: Include target keyword in title, H1, URL, meta description, and naturally throughout.
5. **CTA Placement**: Add relevant call-to-action aligned with funnel stage.
6. **Review**: Check readability, accuracy, and anti-slop quality.

## Tool Policy
- Use `web.search` for research and fact-checking.
- Use `filesystem.write` to produce draft posts.
- Use `filesystem.read` to review existing content for internal linking.

## Verification
- Angle clearly differentiated from existing content
- SEO elements present and optimized
- CTA relevant and measurable

## Failure Modes
- Thin content without actionable value
- Keyword stuffing hurting readability
- Missing internal linking opportunities

## Example Routes
- `write blog post about API security best practices`
- `draft SEO blog article for fintech audience`
- `create long-form guide on marketing automation`

## Source Notes
- HubSpot blog writing methodology
- Animalz content marketing guides
- Reference: ref.github.marketing.2026-05-31
