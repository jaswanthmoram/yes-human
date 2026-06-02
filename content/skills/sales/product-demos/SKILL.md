---
id: sales.product-demos
name: Product Demo Design
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Design product demonstrations that connect buyer pain to specific product capabilities with compelling narrative and proof points.
summary: Demo scripting, scenario selection, and proof-point alignment to buyer requirements for persuasive product demonstrations.
triggers:
  - plan a POC demo for this specific opportunity
  - create a demo script for our analytics platform
  - design a demo for the enterprise security buyer
  - design a product demo
  - demo script creation
  - demo scenario planning
  - product walkthrough design
  - proof of concept demo
  - demo preparation guide
aliases:
  - product demo
  - demo design
  - demo script
negative_keywords:
  - user training
  - product documentation
  - technical implementation
inputs:
  - buyer_requirements
  - product_capabilities
  - demo_objective
outputs:
  - demo_script
  - scenario_flow
  - proof_points
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Demos features without connecting to buyer pain
  - Shows too many features without depth
  - Skips proof points and evidence
verification:
  - Features tied to buyer requirements
  - Demo has clear narrative arc
  - Proof points included for key claims
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design product demonstrations that connect buyer pain to specific product capabilities with compelling narrative and proof points.

## When To Use
- Preparing product demonstrations for prospects
- Creating demo scripts for seller use
- Designing proof-of-concept demonstrations
- Planning demo scenarios for specific buyer personas

## When Not To Use
- User training belongs to customer success
- Product documentation belongs to engineering
- Technical implementation belongs to platform or engineering

## Procedure
1. Define the demo objective tied to buyer pain and deal stage.
2. Select 3-5 product capabilities that address buyer requirements.
3. Design a narrative arc that moves from pain to solution.
4. Script each demo step with talking points and transitions.
5. Identify proof points and evidence for key claims.
6. Plan for questions and objections during the demo.

## Tool Policy
- Use `filesystem.read` to access product documentation and buyer requirements.
- Use `filesystem.write` to save demo scripts and scenario flows.

## Verification
- Each demo feature maps to a specific buyer requirement
- Demo has a clear beginning, middle, and end
- Proof points support key capability claims

## Failure Modes
- Feature dump without connecting to buyer pain
- Demo too long or covering too many features
- No preparation for buyer questions or objections

## Example Routes
- "design a demo for the enterprise security buyer"
- "create a demo script for our analytics platform"
- "plan a POC demo for this specific opportunity"

## Source Notes
- Great Demo! methodology by Peter Cohan
- Reference: ref.github.sales.2026-05-31
