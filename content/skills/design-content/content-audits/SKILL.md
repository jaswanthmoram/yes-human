---
id: design-content.content-audits
name: Content Audits
version: 1.0.0
domain: design-content
category: design-content.content-strategy
purpose: Systematically audit existing content for quality, relevance, accuracy, and alignment with strategy.
summary: Content audit methodology with inventory, assessment criteria, scoring, and action recommendations.
triggers:
  - content audit analysis
  - content inventory review
  - content quality assessment
  - content gap analysis
  - content relevance check
aliases:
  - content audit
  - content review
negative_keywords:
  - content creation
  - code review
  - security audit
inputs:
  - content_inventory
  - audit_criteria
  - business_objectives
outputs:
  - audit_report
  - content_scores
  - action_recommendations
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Incomplete content inventory
  - Missing assessment criteria
  - Recommendations without prioritization
verification:
  - All content items inventoried
  - Assessment criteria applied consistently
  - Recommendations prioritized by impact
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
Systematically audit existing content for quality, relevance, accuracy, and alignment with strategy.

## When To Use
- Before a content strategy refresh
- During site migration or redesign
- When assessing content quality across channels

## When Not To Use
- Content creation (use copywriter or seo-writer agents)
- Code review (use engineering.code-reviewer)
- Security audit (use security domain)

## Procedure
1. Create comprehensive content inventory.
2. Define assessment criteria (quality, relevance, accuracy, SEO).
3. Score each content item against criteria.
4. Identify gaps and redundancies.
5. Produce prioritized action recommendations.

## Tool Policy
- Use `filesystem.read` to review content inventory and files.

## Verification
- All content items inventoried
- Assessment criteria applied consistently
- Recommendations prioritized by impact

## Source Notes
Content Strategy for the Web (Halvorson), Nielsen Norman Group content audit guides. Reference: ref.github.design-content.2026-05-31
