---
id: marketing.keyword-research
name: Keyword Research
version: 1.0.0
domain: marketing
category: marketing.seo
purpose: Systematic keyword discovery, clustering, and intent mapping for content and SEO strategy.
summary: Keyword research process covering discovery, intent classification, difficulty assessment, and cluster mapping.
triggers:
  - competitive keyword gap analysis
  - find keyword opportunities for fintech blog
  - keyword research for topic
  - find keywords for content
  - keyword cluster mapping
  - search volume analysis
aliases:
  - keyword research
  - keyword analysis
negative_keywords:
  - paid keyword bidding
  - ad group creation
inputs:
  - seed_topics
  - target_audience
  - competitive_urls
outputs:
  - keyword_list
  - intent_clusters
  - opportunity_matrix
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Targets high-volume keywords without intent fit
  - Ignores long-tail and question-based queries
  - Clusters keywords without semantic coherence
verification:
  - Intent mapped for each cluster
  - Difficulty and volume assessed
  - Competitive gap identified
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Narrow seed topics if keyword list is too broad
validators:
  - skill.validator
---

## Mission
Discover, classify, and cluster keywords by search intent to guide content creation and SEO strategy.

## When To Use
- When planning new content topics
- Before building an SEO strategy
- When expanding into new market segments
- During competitive keyword gap analysis

## When Not To Use
- For paid search keyword bidding (use google-ads)
- For ad copy creation (use sem-specialist agent)
- For content drafting (use blog-writing)

## Procedure
1. **Seed Expansion**: Generate keyword variations from seed topics using search suggestions and competitor analysis.
2. **Intent Classification**: Categorize keywords as informational, navigational, commercial, or transactional.
3. **Volume and Difficulty**: Assess search volume, keyword difficulty, and competitive density.
4. **Clustering**: Group semantically related keywords into topic clusters.
5. **Opportunity Scoring**: Rank clusters by opportunity (high intent, low competition, decent volume).
6. **Mapping**: Align clusters to existing and planned content.

## Tool Policy
- Use `web.search` for keyword discovery and competitive analysis.
- Use `filesystem.write` to produce keyword reports.

## Verification
- Each cluster has clear intent classification
- Difficulty and volume data included
- Opportunity scoring applied

## Failure Modes
- Ignoring search intent in favor of volume alone
- Missing long-tail and conversational queries
- Over-clustering unrelated terms

## Example Routes
- `keyword research for B2B SaaS`
- `find keyword opportunities for fintech blog`
- `competitive keyword gap analysis`

## Source Notes
- Ahrefs keyword research methodology
- SEMrush keyword magic tool patterns
- Reference: ref.github.marketing.2026-05-31
