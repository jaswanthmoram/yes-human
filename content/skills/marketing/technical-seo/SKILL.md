---
id: marketing.technical-seo
name: Technical SEO
version: 1.0.0
domain: marketing
category: marketing.seo
purpose: Address technical SEO issues including crawlability, indexation, site speed, and structured data implementation.
summary: Technical SEO review covering crawl budget, indexation, Core Web Vitals, XML sitemaps, and site architecture.
triggers:
  - technical seo audit for e-commerce site
  - technical seo review
  - crawl and indexation audit
  - core web vitals optimization
  - xml sitemap review
  - site architecture seo
aliases:
  - technical seo
  - site infrastructure seo
negative_keywords:
  - content writing
  - keyword research
  - link building
inputs:
  - site_url
  - crawl_data
  - performance_metrics
outputs:
  - technical_audit_report
  - fix_prioritization
  - implementation_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Ignores JavaScript rendering issues
  - Misses canonical tag conflicts
  - Overlooks international SEO signals
verification:
  - Crawl issues identified and prioritized
  - Core Web Vitals assessed
  - Structured data validated
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert robots.txt or sitemap changes if crawl issues arise
validators:
  - skill.validator
---

## Mission
Identify and resolve technical SEO issues that prevent search engines from efficiently crawling, indexing, and ranking site content.

## When To Use
- When diagnosing crawl or indexation problems
- Before site migrations or redesigns
- When optimizing Core Web Vitals
- During technical SEO audits

## When Not To Use
- For content optimization (use on-page-seo)
- For keyword strategy (use keyword-research)
- For backlink analysis (use seo-audits)

## Procedure
1. **Crawl Analysis**: Review robots.txt, crawl errors, and crawl budget efficiency.
2. **Indexation Review**: Check index coverage, canonical tags, and duplicate content issues.
3. **Site Speed**: Assess Core Web Vitals (LCP, FID, CLS) and performance bottlenecks.
4. **Site Architecture**: Evaluate URL structure, internal linking depth, and navigation.
5. **Structured Data**: Validate schema markup implementation and rich result eligibility.
6. **JavaScript Rendering**: Check JS-heavy pages for crawlability and rendering issues.

## Tool Policy
- Use `filesystem.read` to review site configuration and technical files.
- Use `web.search` for technical SEO documentation and best practices.
- Use `filesystem.write` to produce technical audit reports.

## Verification
- Crawl errors identified and categorized
- Core Web Vitals measured against thresholds
- Canonical and hreflang tags validated

## Failure Modes
- Missing JavaScript rendering issues
- Ignoring mobile-first indexing requirements
- Overlooking pagination and faceted navigation

## Example Routes
- `technical SEO audit for e-commerce site`
- `fix crawl and indexation issues`
- `optimize Core Web Vitals scores`

## Source Notes
- Google Search Central technical SEO documentation
- web.dev performance guides
- Reference: ref.github.marketing.2026-05-31
