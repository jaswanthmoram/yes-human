---
id: sales.pipeline-management
name: Pipeline Management Framework
version: 1.0.0
domain: sales
category: sales.operations
purpose: Design and maintain pipeline processes that ensure deal visibility, stage accuracy, and forecast reliability.
summary: Pipeline stage definitions, hygiene processes, slippage detection, and forecast alignment for reliable pipeline management.
triggers:
  - pipeline management design
  - stage definition review
  - pipeline hygiene process
  - slippage detection setup
  - forecast alignment review
  - pipeline review cadence
aliases:
  - pipeline management
  - pipeline ops
  - pipeline hygiene
negative_keywords:
  - marketing funnel
  - customer journey mapping
  - product backlog
inputs:
  - current_pipeline
  - stage_definitions
  - forecast_requirements
outputs:
  - pipeline_process
  - hygiene_rules
  - forecast_alignment
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Defines stages without exit criteria
  - Skips hygiene rules for stale deals
  - Pipeline not aligned with forecast methodology
verification:
  - Stage exit criteria defined
  - Hygiene rules for stale deals specified
  - Pipeline aligned with forecast methodology
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
Design and maintain pipeline processes that ensure deal visibility, stage accuracy, and forecast reliability.

## When To Use
- Designing pipeline management processes for sales teams
- Reviewing stage definitions and exit criteria
- Setting up pipeline hygiene and slippage detection
- Aligning pipeline data with forecast methodology

## When Not To Use
- Marketing funnel management belongs to marketing
- Customer journey mapping belongs to customer success
- Product backlog management belongs to product-business

## Procedure
1. Define pipeline stages with clear entry and exit criteria.
2. Design hygiene rules for stale and stalled deals.
3. Set up slippage detection with alert thresholds.
4. Align pipeline data with forecast categories.
5. Define review cadence and ownership for pipeline health.
6. Create reporting for pipeline velocity and conversion.

## Tool Policy
- Use `filesystem.read` to access pipeline data and stage definitions.
- Use `filesystem.write` to save process designs and hygiene rules.

## Verification
- Each stage has explicit entry criteria, exit criteria, and expected duration
- Hygiene rules defined for stale deals with automated actions
- Pipeline data maps to forecast categories

## Failure Modes
- Stages defined by seller feeling rather than buyer evidence
- No hygiene process for deals stuck in stage
- Pipeline data disconnected from forecast methodology

## Example Routes
- "design pipeline stages for enterprise sales motion"
- "set up pipeline hygiene rules for weekly review"
- "align pipeline data with commit/best-case forecast"

## Source Notes
- Pipedrive pipeline methodology
- Reference: ref.github.sales.2026-05-31
