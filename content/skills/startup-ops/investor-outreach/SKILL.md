---
id: startup-ops.investor-outreach
name: Investor Outreach
version: 1.0.0
domain: startup-ops
category: startup-ops.fundraising
purpose: Design and execute investor outreach sequences with warm introductions, cold emails, and follow-up cadences.
summary: Creates outreach templates, introduction strategies, and meeting preparation guides for investor engagement.
triggers:
  - investor outreach
  - investor email
  - warm intro
  - investor meeting prep
activation_triggers:
  - investor outreach
  - investor email
  - warm intro
  - investor meeting prep
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Research target investor thesis and portfolio
  - Craft personalized outreach message
  - Plan warm introduction paths
  - Design follow-up cadence
  - Prepare meeting talking points
  - Create data room access strategy
  - Track outreach pipeline
outputs:
  - outreach_templates
  - intro_strategy
  - meeting_prep
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Sends generic outreach without thesis research
  - Skips follow-up cadence
  - Confuses warm intro with cold outreach effectiveness
handoffs:
  - startup-ops.fundraising-specialist
  - startup-ops.pitch-deck-creator
source_references:
  - ref.github.startup-ops.2026-05-31
allowed_agents:
  - startup-ops.startup-strategist
  - startup-ops.business-model-designer
  - startup-ops.customer-development
allowed_workflows:
  - startup-ops.business-model-validation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when investor outreach or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Research target investor thesis and portfolio**: research target investor thesis and portfolio with evidence and documentation.
2. **Craft personalized outreach message**: craft personalized outreach message with evidence and documentation.
3. **Plan warm introduction paths**: plan warm introduction paths with evidence and documentation.
4. **Design follow-up cadence**: design follow-up cadence with evidence and documentation.
5. **Prepare meeting talking points**: prepare meeting talking points with evidence and documentation.
6. **Create data room access strategy**: create data room access strategy with evidence and documentation.
7. **Track outreach pipeline**: track outreach pipeline with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Sends generic outreach without thesis research
- Skips follow-up cadence
- Confuses warm intro with cold outreach effectiveness

## Examples
### Investor Outreach Example
Input: investor outreach for a B2B SaaS startup
Output:
- outreach_templates with evidence-based entries
- intro_strategy with prioritized items
- meeting_prep with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
