---
id: marketing.marketing-attribution
name: Marketing Attribution
version: 1.0.0
domain: marketing
category: marketing.analytics
purpose: Design and implement attribution models to measure marketing channel contribution to conversions and revenue.
summary: Marketing attribution covering model selection, data integration, channel credit assignment, and ROI analysis.
triggers:
  - marketing attribution model
  - channel attribution analysis
  - multi-touch attribution
  - marketing roi measurement
aliases:
  - attribution modeling
  - marketing attribution
negative_keywords:
  - financial accounting
  - product analytics
  - engineering metrics
inputs:
  - conversion_data
  - channel_touchpoints
  - attribution_window
outputs:
  - attribution_model
  - channel_contribution_report
  - roi_analysis
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Using last-click only without multi-touch perspective
  - Ignoring offline and dark social touchpoints
  - Attribution without data quality validation
verification:
  - Model appropriate for business type
  - Data quality validated
  - Cross-channel view complete
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to simpler model if data quality is insufficient
validators:
  - skill.validator
---

## Mission
Implement attribution models that accurately measure marketing channel contribution to business outcomes.

## When To Use
- When evaluating marketing channel ROI
- During budget allocation decisions
- When implementing multi-touch attribution
- For campaign performance measurement

## When Not To Use
- For financial accounting (use finance domain)
- For product usage analytics (use product-business)
- For engineering performance metrics (use data-ai)

## Procedure
1. **Data Audit**: Validate tracking completeness across all marketing channels.
2. **Model Selection**: Choose attribution model (first-touch, last-touch, linear, time-decay, position-based).
3. **Touchpoint Mapping**: Map all customer touchpoints across channels and devices.
4. **Credit Assignment**: Apply model rules to assign conversion credit.
5. **Analysis**: Compare channel contribution and ROI across models.
6. **Optimization**: Reallocate budget based on attribution insights.

## Tool Policy
- Use `filesystem.read` to review analytics and attribution data.
- Use `web.search` for attribution methodology updates.
- Use `filesystem.write` to produce attribution reports.

## Verification
- Tracking completeness validated across channels
- Attribution model justified for business context
- Cross-device and offline touchpoints considered

## Failure Modes
- Relying solely on last-click attribution
- Ignoring assisted conversions
- Data gaps in cross-device tracking

## Example Routes
- `set up multi-touch attribution model`
- `analyze channel contribution to revenue`
- `compare attribution models for budget planning`

## Source Notes
- Google Analytics attribution documentation
- HubSpot attribution model guides
- Reference: ref.github.marketing.2026-05-31
