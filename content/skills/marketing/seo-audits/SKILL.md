---
id: marketing.seo-audits
name: SEO Audits
version: 1.0.0
domain: marketing
category: marketing.seo
purpose: Conduct comprehensive SEO audits covering technical health, content gaps, and competitive positioning.
summary: Full-site SEO audit process with technical, on-page, and off-page analysis for organic search improvement.
triggers:
  - perform seo audit
  - site health check for search
  - comprehensive seo review
  - seo technical audit
aliases:
  - seo audit
  - site seo review
negative_keywords:
  - paid search audit
  - social media audit
inputs:
  - site_url
  - target_keywords
  - competitor_urls
outputs:
  - audit_report
  - issue_prioritization
  - remediation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Skips technical crawl analysis
  - Reports issues without prioritization
  - Ignores mobile and Core Web Vitals
verification:
  - Technical crawl completed
  - Content gap analysis included
  - Prioritized action items delivered
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Re-run audit with narrower scope if full-site audit times out
validators:
  - skill.validator
---

## Mission
Conduct comprehensive SEO audits that identify technical issues, content gaps, and optimization opportunities to improve organic search visibility.

## When To Use
- When auditing a website's SEO health
- Before launching a content marketing campaign
- When diagnosing organic traffic drops
- During competitive SEO analysis

## When Not To Use
- For paid search campaign audits (use google-ads)
- For social media performance review (use social-media-strategy)
- For single-page on-page optimization (use on-page-seo)

## Procedure
1. **Technical Crawl Analysis**: Check crawlability, indexation, site architecture, and Core Web Vitals.
2. **On-Page Review**: Audit title tags, meta descriptions, heading structure, and internal linking.
3. **Content Gap Analysis**: Compare content coverage against competitors and target keyword clusters.
4. **Off-Page Assessment**: Review backlink profile quality and authority signals.
5. **Prioritization**: Rank issues by impact, effort, and urgency.
6. **Remediation Plan**: Deliver actionable recommendations with expected outcomes.

## Tool Policy
- Use `filesystem.read` to review existing SEO reports and site data.
- Use `web.search` for competitive analysis and benchmarking.
- Use `filesystem.write` to produce audit reports.

## Verification
- Technical crawl covers all major page types
- Content gaps mapped to keyword opportunities
- Action items prioritized by business impact

## Failure Modes
- Skipping mobile-specific SEO checks
- Reporting issues without remediation guidance
- Ignoring site speed and Core Web Vitals

## Example Routes
- `audit SEO for example.com`
- `technical SEO health check`
- `competitive SEO analysis vs competitors`

## Source Notes
- Google Search Central documentation
- Moz SEO audit methodology
- Reference: ref.github.marketing.2026-05-31
