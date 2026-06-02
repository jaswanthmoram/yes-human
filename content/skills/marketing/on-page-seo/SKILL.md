---
id: marketing.on-page-seo
name: On-Page SEO
version: 1.0.0
domain: marketing
category: marketing.seo
purpose: Optimize individual pages for search engines with title tags, meta descriptions, headings, and content structure.
summary: On-page SEO optimization covering metadata, content structure, internal linking, and schema markup.
triggers:
  - optimize page for seo
  - on-page seo review
  - meta tag optimization
  - heading structure review
aliases:
  - on-page optimization
  - page seo
negative_keywords:
  - technical seo
  - backlink building
  - site architecture
inputs:
  - page_url
  - target_keyword
  - current_content
outputs:
  - optimization_checklist
  - metadata_recommendations
  - content_structure_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Keyword stuffing in metadata
  - Ignoring user intent in content optimization
  - Missing schema markup opportunities
verification:
  - Title and meta optimized
  - Heading hierarchy correct
  - Internal links reviewed
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to original metadata if changes hurt rankings
validators:
  - skill.validator
---

## Mission
Optimize individual web pages for search visibility through metadata, content structure, and on-page elements.

## When To Use
- When optimizing a specific page for search
- Before publishing new content
- When updating existing page metadata
- During content refresh cycles

## When Not To Use
- For site-wide technical SEO (use technical-seo)
- For keyword discovery (use keyword-research)
- For full-site audits (use seo-audits)

## Procedure
1. **Metadata Review**: Optimize title tags, meta descriptions, and URL structure for target keywords.
2. **Heading Structure**: Ensure proper H1-H6 hierarchy with keyword inclusion.
3. **Content Optimization**: Align content with search intent, include semantic keywords naturally.
4. **Internal Linking**: Add relevant internal links to related content.
5. **Schema Markup**: Identify and implement appropriate structured data.
6. **Image Optimization**: Add alt text and optimize image file names.

## Tool Policy
- Use `filesystem.read` to review page content and metadata.
- Use `filesystem.write` to produce optimization recommendations.

## Verification
- Title tag within character limits with target keyword
- Meta description compelling and keyword-inclusive
- Heading hierarchy properly structured

## Failure Modes
- Over-optimizing with keyword stuffing
- Ignoring readability for SEO
- Missing featured snippet opportunities

## Example Routes
- `optimize landing page for target keyword`
- `review on-page SEO for blog post`
- `fix meta tags for product pages`

## Source Notes
- Google Search Central on-page guidelines
- Moz on-page SEO checklist
- Reference: ref.github.marketing.2026-05-31
