---
id: marketing.lead-scoring
name: Lead Scoring
version: 1.0.0
domain: marketing
category: marketing.operations
purpose: Design lead scoring models that rank prospects by engagement and fit for sales handoff prioritization.
summary: Lead scoring model design covering demographic fit, behavioral signals, scoring thresholds, and sales alignment.
triggers:
  - implement behavioral lead scoring
  - design lead scoring model for B2B SaaS
  - lead scoring model
  - prospect ranking system
  - mql qualification criteria
  - lead score threshold review
aliases:
  - lead scoring
  - prospect scoring
negative_keywords:
  - credit scoring
  - risk assessment
  - customer satisfaction scoring
inputs:
  - ideal_customer_profile
  - behavioral_data
  - sales_feedback
outputs:
  - scoring_model
  - qualification_thresholds
  - handoff_criteria
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Scoring based only on demographics without behavior
  - Thresholds not validated with sales feedback
  - No decay for stale engagement signals
verification:
  - Demographic and behavioral factors weighted
  - Thresholds validated with sales team
  - Score decay rules defined
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Adjust thresholds if sales acceptance rate drops
validators:
  - skill.validator
---

## Mission
Design lead scoring models that accurately rank prospects by readiness and fit for efficient sales handoff.

## When To Use
- When implementing lead scoring for the first time
- When refining existing scoring models
- During sales and marketing alignment initiatives
- For MQL/SQL threshold definition

## When Not To Use
- For credit or risk scoring (use finance domain)
- For customer satisfaction measurement (use product-business)
- For CRM pipeline management (use sales domain)

## Procedure
1. **ICP Definition**: Document ideal customer profile with firmographic and demographic attributes.
2. **Behavioral Signals**: Identify engagement signals (page views, downloads, email opens, demo requests).
3. **Weight Assignment**: Assign point values based on signal strength and fit correlation.
4. **Threshold Setting**: Define MQL and SQL score thresholds.
5. **Decay Rules**: Implement score decay for stale engagement.
6. **Sales Validation**: Review scoring accuracy with sales team feedback.

## Tool Policy
- Use `filesystem.read` to review lead data and sales feedback.
- Use `filesystem.write` to produce scoring models and documentation.

## Verification
- Both fit and engagement factors scored
- Thresholds validated against historical conversion data
- Decay rules prevent stale lead inflation

## Failure Modes
- Scoring only fit without engagement signals
- No negative scoring for disqualifying behaviors
- Ignoring sales feedback on lead quality

## Example Routes
- `design lead scoring model for B2B SaaS`
- `refine MQL qualification thresholds`
- `implement behavioral lead scoring`

## Source Notes
- HubSpot lead scoring methodology
- Marketo lead scoring best practices
- Reference: ref.github.marketing.2026-05-31
