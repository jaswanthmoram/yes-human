---
id: design-content.seo-optimization
name: SEO Optimization
version: 1.0.0
domain: design-content
category: design-content.content-strategy
purpose: Optimize content and pages for search engines with on-page SEO, technical SEO, and content structure.
summary: On-page and technical SEO optimization including meta tags, heading structure, internal linking, and schema markup.
triggers:
  - seo optimization review
  - on-page seo audit
  - technical seo check
  - content seo optimization
  - seo structure review
aliases:
  - seo optimization
  - seo review
negative_keywords:
  - paid advertising
  - code deployment
  - database optimization
inputs:
  - page_content
  - target_keywords
  - technical_constraints
outputs:
  - seo_audit_report
  - optimization_recommendations
  - schema_markup_specs
allowed_tools:
  - filesystem.read
  - web.search
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Missing meta tag optimization
  - Ignores technical SEO factors
  - No schema markup recommendations
verification:
  - Meta tags optimized for target keywords
  - Technical SEO factors assessed
  - Schema markup recommended where applicable
source_references:
  - ref.github.design-content.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Optimize content and pages for search engines with on-page SEO, technical SEO, and content structure.

## When To Use
- Optimizing existing pages for search
- Auditing on-page SEO elements
- Adding schema markup to content

## When Not To Use
- Paid advertising (use marketing domain)
- Code deployment (use engineering domain)
- Database optimization (use engineering.database-optimization)

## Procedure
1. Audit on-page SEO elements (title, meta, headings, alt text).
2. Check technical SEO factors (page speed, mobile, crawlability).
3. Optimize content structure for target keywords.
4. Recommend internal linking improvements.
5. Define schema markup for structured data.

## Tool Policy
- Use `filesystem.read` to review page content and code.
- Use `web.search` for SEO research and competitor analysis.

## Verification
- Meta tags optimized for target keywords
- Technical SEO factors assessed
- Schema markup recommended where applicable

## Source Notes
Google Search Central, Moz SEO guide, Ahrefs SEO best practices. Reference: ref.github.design-content.2026-05-31
