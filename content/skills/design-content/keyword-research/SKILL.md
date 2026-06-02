---
id: design-content.keyword-research
name: Keyword Research
version: 1.0.0
domain: design-content
category: design-content.content-strategy
purpose: Conduct keyword research with search volume analysis, intent mapping, and competitive gap identification.
summary: Keyword research methodology including search volume analysis, keyword difficulty, intent classification, and gap analysis.
triggers:
  - keyword research analysis
  - search volume analysis
  - keyword difficulty assessment
  - keyword gap analysis
  - search intent mapping
aliases:
  - keyword research
  - keyword analysis
negative_keywords:
  - paid keyword bidding
  - code implementation
  - database design
inputs:
  - topic_areas
  - competitor_urls
  - business_goals
outputs:
  - keyword_list
  - intent_mapping
  - competitive_gap_report
allowed_tools:
  - filesystem.read
  - web.search
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Missing search intent classification
  - Ignores competitive landscape
  - No prioritization of keywords
verification:
  - Search intent classified for all keywords
  - Competitive landscape assessed
  - Keywords prioritized by opportunity
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
Conduct keyword research with search volume analysis, intent mapping, and competitive gap identification.

## When To Use
- Before creating new content
- During content strategy planning
- When identifying content gaps vs competitors

## When Not To Use
- Paid keyword bidding (use marketing domain)
- Code implementation (use engineering domain)
- Database design (use engineering.database-design)

## Procedure
1. Define topic areas aligned with business goals.
2. Research keywords with volume and difficulty data.
3. Classify search intent (informational, navigational, transactional).
4. Analyze competitor keyword rankings.
5. Prioritize keywords by opportunity score.

## Tool Policy
- Use `filesystem.read` to review existing content and strategy.
- Use `web.search` for keyword research and competitor analysis.

## Verification
- Search intent classified for all keywords
- Competitive landscape assessed
- Keywords prioritized by opportunity

## Source Notes
Ahrefs keyword research guide, Moz keyword research, SEMrush keyword methodology. Reference: ref.github.design-content.2026-05-31
