---
id: marketing.marketing-automation
name: Marketing Automation
version: 1.0.0
domain: marketing
category: marketing.operations
purpose: Design and implement marketing automation workflows for lead nurturing, scoring, and lifecycle management.
summary: Marketing automation setup covering workflow design, trigger rules, lead scoring, and platform configuration.
triggers:
  - set up marketing automation
  - lead nurturing workflow
  - automation platform configuration
  - lifecycle email automation
aliases:
  - marketing automation
  - automation workflows
negative_keywords:
  - manual outreach
  - CRM configuration
  - data pipeline engineering
inputs:
  - automation_platform
  - lead_stages
  - trigger_events
outputs:
  - automation_blueprint
  - workflow_diagrams
  - scoring_model
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Workflows without exit conditions
  - No lead fatigue management
  - Automation without measurement hooks
verification:
  - Entry and exit conditions defined
  - Frequency caps configured
  - Scoring model documented
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Disable workflows if error rate exceeds threshold
validators:
  - skill.validator
---

## Mission
Design marketing automation workflows that nurture leads, score engagement, and manage lifecycle communications efficiently.

## When To Use
- When setting up lead nurturing programs
- During marketing automation platform migration
- For lifecycle email automation design
- When implementing lead scoring models

## When Not To Use
- For one-time email campaigns (use email-campaigns)
- For CRM pipeline configuration (use sales domain)
- For data engineering pipelines (use data-ai)

## Procedure
1. **Lifecycle Mapping**: Define lead lifecycle stages and transition criteria.
2. **Trigger Design**: Identify behavioral and demographic triggers for automation.
3. **Workflow Building**: Design branching logic with entry, nurture, and exit paths.
4. **Lead Scoring**: Implement scoring model based on engagement and fit.
5. **Frequency Management**: Set caps to prevent lead fatigue.
6. **Measurement**: Add tracking for open rates, click rates, and stage progression.

## Tool Policy
- Use `filesystem.read` to review automation data and configurations.
- Use `web.search` for platform-specific automation patterns.
- Use `filesystem.write` to produce automation blueprints.

## Verification
- Workflows have clear entry and exit conditions
- Lead scoring model documented and tested
- Frequency caps prevent over-communication

## Failure Modes
- Building workflows without fallback paths
- Ignoring data quality in trigger conditions
- No A/B testing within automation flows

## Example Routes
- `set up lead nurturing automation in HubSpot`
- `design lifecycle email automation`
- `implement lead scoring model`

## Source Notes
- HubSpot marketing automation guides
- Marketo engagement program patterns
- Reference: ref.github.marketing.2026-05-31
