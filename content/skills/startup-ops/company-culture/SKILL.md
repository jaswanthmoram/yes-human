---
id: startup-ops.company-culture
name: Company Culture Design
version: 1.0.0
domain: startup-ops
category: startup-ops.people
purpose: Define and operationalize company culture through values, rituals, and hiring practices for early-stage startups.
summary: Guides culture definition including values articulation, ritual design, and culture-aligned hiring and decision-making.
triggers:
  - company culture
  - values definition
  - culture design
  - team rituals
  - startup culture
activation_triggers:
  - company culture
  - values definition
  - culture design
  - team rituals
  - startup culture
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Articulate core values with behavioral examples
  - Design team rituals and cadences
  - Define culture-aligned hiring criteria
  - Create decision-making frameworks
  - Build feedback and recognition systems
  - Document culture handbook
  - Plan culture scaling for growth
outputs:
  - culture_handbook
  - values_framework
  - rituals_guide
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Defines values without behavioral examples
  - Skips ritual design for remote teams
  - Confuses perks with culture
handoffs:
  - startup-ops.hr-specialist
  - startup-ops.startup-mentor
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
Use this skill when company culture or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Articulate core values with behavioral examples**: articulate core values with behavioral examples with evidence and documentation.
2. **Design team rituals and cadences**: design team rituals and cadences with evidence and documentation.
3. **Define culture-aligned hiring criteria**: define culture-aligned hiring criteria with evidence and documentation.
4. **Create decision-making frameworks**: create decision-making frameworks with evidence and documentation.
5. **Build feedback and recognition systems**: build feedback and recognition systems with evidence and documentation.
6. **Document culture handbook**: document culture handbook with evidence and documentation.
7. **Plan culture scaling for growth**: plan culture scaling for growth with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Defines values without behavioral examples
- Skips ritual design for remote teams
- Confuses perks with culture

## Examples
### Company Culture Design Example
Input: company culture for a B2B SaaS startup
Output:
- culture_handbook with evidence-based entries
- values_framework with prioritized items
- rituals_guide with clear next steps