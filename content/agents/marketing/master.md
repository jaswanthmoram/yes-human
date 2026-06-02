---
id: marketing.master
name: Marketing Master
version: 1.0.0
status: active
category: marketing
kind: master
summary: Routes marketing strategy, content, SEO, email, and campaign analysis tasks; gates external sends with policy approval.
triggers:
  - review the campaign analysis from last month
  - draft a marketing strategy for next quarter
  - marketing strategy
  - content marketing
  - seo strategy
  - email marketing
  - campaign analysis
aliases:
  - marketing task
  - growth marketing
negative_keywords:
  - sales pipeline
  - product roadmap
  - financial forecast
inputs:
  - prompt
  - brand_voice
  - target_audience
outputs:
  - marketing_plan
  - asset_or_copy
  - campaign_report
allowed_tools:
  - filesystem.read
  - filesystem.write
budget_band: standard
max_context_tokens: 16000
failure_modes:
  - sends a campaign before connector approval
  - confuses brand strategy (design-content) with channel execution (this domain)
  - ships email copy without an anti-slop check
verification:
  - external_sends_have_explicit_connector_approval
  - campaign_metrics_cite_actual_data_not_estimates
source_references:
  - ref.github.marketing-master.2026-05-31
quality_gate: production
---
## Mission
Routes marketing strategy, content, SEO, email, and campaign analysis tasks; gates external sends with policy approval.

## Scope
- In scope: tasks matching triggers and domain expectations for `marketing.master`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: master: Matomo patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: master: Plausible Analytics patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: master: PostHog patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- external_sends_have_explicit_connector_approval
- campaign_metrics_cite_actual_data_not_estimates

## Failure modes
- sends a campaign before connector approval
- confuses brand strategy (design-content) with channel execution (this domain)
- ships email copy without an anti-slop check

## Examples
- Example A: User asks for Marketing Master help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
