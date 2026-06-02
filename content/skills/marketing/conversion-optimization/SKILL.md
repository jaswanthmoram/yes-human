---
id: marketing.conversion-optimization
name: Conversion Optimization
version: 1.0.0
domain: marketing
category: marketing.optimization
purpose: Systematically improve conversion rates through heuristic analysis, user research, and data-driven testing.
summary: CRO process covering heuristic analysis, user behavior review, hypothesis generation, and testing prioritization.
triggers:
  - improve conversion rate
  - cro audit
  - landing page conversion review
  - checkout optimization
aliases:
  - cro
  - conversion rate optimization
negative_keywords:
  - traffic generation
  - seo optimization
  - brand awareness
inputs:
  - page_or_funnel_url
  - conversion_data
  - user_behavior_data
outputs:
  - cro_audit
  - hypothesis_backlog
  - test_roadmap
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Optimizing without baseline data
  - Focusing on micro-conversions only
  - Copying best practices without testing
verification:
  - Baseline metrics established
  - Hypotheses prioritized by impact
  - Test roadmap with timeline
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert changes if conversion rate decreases
validators:
  - skill.validator
---

## Mission
Improve conversion rates through systematic analysis, hypothesis generation, and data-driven experimentation.

## When To Use
- When conversion rates are below benchmarks
- Before redesigning landing pages or funnels
- During ongoing optimization programs
- When analyzing user behavior data

## When Not To Use
- For driving more traffic (use SEO or paid media skills)
- For brand awareness campaigns (use brand-marketer agent)
- For UX redesign without conversion focus (use design-content)

## Procedure
1. **Data Collection**: Gather analytics, heatmaps, session recordings, and user feedback.
2. **Heuristic Analysis**: Evaluate pages using clarity, relevance, urgency, and distraction frameworks.
3. **Hypothesis Generation**: Create testable hypotheses based on data insights.
4. **Prioritization**: Score hypotheses by potential impact, ease, and confidence (PIE framework).
5. **Test Planning**: Design A/B tests for top hypotheses.
6. **Iteration**: Analyze results, document learnings, and plan next tests.

## Tool Policy
- Use `filesystem.read` to review analytics and user data.
- Use `web.search` for CRO best practices and benchmarks.
- Use `filesystem.write` to produce audit reports and test plans.

## Verification
- Baseline conversion rate documented
- Hypotheses backed by data evidence
- Test roadmap prioritized and scheduled

## Failure Modes
- Making changes without baseline measurement
- Testing based on opinions instead of data
- Ignoring mobile-specific conversion issues

## Example Routes
- `improve landing page conversion rate`
- `CRO audit for checkout flow`
- `optimize signup form conversions`

## Source Notes
- CXL Institute CRO methodology
- Baymard Institute UX research
- Reference: ref.github.marketing.2026-05-31
