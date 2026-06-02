---
id: startup-ops.business-model-canvas
name: Business Model Canvas
version: 1.0.0
domain: startup-ops
category: startup-ops.strategy
purpose: Design comprehensive business models using the Osterwalder Business Model Canvas framework.
summary: Walks through all 9 building blocks of the BMC including partners, activities, resources, value propositions, relationships, channels, segments, costs, and revenue.
triggers:
  - run business model canvas process
  - business model canvas
  - BMC
  - osterwalder canvas
activation_triggers:
  - business model canvas
  - BMC
  - osterwalder canvas
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Map key partners and activities
  - Define key resources
  - Articulate value propositions
  - Design customer relationships
  - Map channels
  - Define customer segments
  - Calculate cost structure
  - Define revenue streams
  - Validate canvas with stakeholders
outputs:
  - business_model_canvas
  - partner_map
  - revenue_model
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Maps partners without defining activities
  - Skips cost-revenue balance check
  - Lists value propositions without customer segments
handoffs:
  - startup-ops.business-model-designer
  - startup-ops.financial-modeler
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
Use this skill when business model canvas or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Map key partners and activities**: map key partners and activities with evidence and documentation.
2. **Define key resources**: define key resources with evidence and documentation.
3. **Articulate value propositions**: articulate value propositions with evidence and documentation.
4. **Design customer relationships**: design customer relationships with evidence and documentation.
5. **Map channels**: map channels with evidence and documentation.
6. **Define customer segments**: define customer segments with evidence and documentation.
7. **Calculate cost structure**: calculate cost structure with evidence and documentation.
8. **Define revenue streams**: define revenue streams with evidence and documentation.
9. **Validate canvas with stakeholders**: validate canvas with stakeholders with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Maps partners without defining activities
- Skips cost-revenue balance check
- Lists value propositions without customer segments

## Examples
### Business Model Canvas Example
Input: business model canvas for a B2B SaaS startup
Output:
- business_model_canvas with evidence-based entries
- partner_map with prioritized items
- revenue_model with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
