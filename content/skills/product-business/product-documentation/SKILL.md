---
id: product-business.product-documentation
name: Product Documentation
version: 1.0.0
domain: product-business
category: product-business.communications
purpose: Create and maintain product documentation that serves both internal teams and external users.
summary: Guides through documentation strategy, information architecture, and content creation for product docs.
triggers:
  - product documentation
  - help docs
  - user guide
  - knowledge base
activation_triggers:
  - write documentation
  - create help docs
  - documentation strategy
prerequisites:
  - product features and workflows defined
  - target audience identified
inputs:
  - documentation_scope
  - target_audience
  - existing_content
steps:
  - Audit existing documentation for gaps and quality
  - Define documentation types (tutorials, how-to, reference, explanation)
  - Create information architecture and navigation structure
  - Write content following Diataxis or similar framework
  - Review for accuracy, clarity, and completeness
  - Set up maintenance process and review cadence
outputs:
  - documentation_strategy
  - content_drafts
  - maintenance_plan
tools:
  - filesystem.read
quality_gates:
  - Documentation follows consistent framework
  - Content is accurate and up-to-date
  - Maintenance process is defined
failure_modes:
  - Documentation that doesn't match current product
  - Mixing tutorial and reference content
  - No maintenance process leading to stale docs
handoffs:
  - product-business.product-writer (for content creation)
  - product-business.product-manager (for feature accuracy)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-writer
  - product-business.product-manager
  - product-business.master
allowed_workflows:
  - product-business.product-launch
status: active
budget_band: standard
rollback:
  - Version control allows reverting documentation changes
validators:
  - skill.validator
---

## Trigger
Use this skill when creating or improving product documentation.

## Prerequisites
- Product features and workflows defined
- Target audience identified

## Steps
1. **Audit**: Review existing docs for accuracy, gaps, and quality.
2. **Types**: Separate into tutorials (learning), how-to (tasks), reference (specs), explanation (concepts).
3. **Architecture**: Define navigation, search, and cross-linking structure.
4. **Write**: Follow Diataxis framework; one topic per page, clear headings, code examples.
5. **Review**: Technical accuracy check with engineering; clarity check with users.
6. **Maintain**: Set review cadence (quarterly), assign owners, track staleness.

## Verification
- Documentation matches current product behavior
- Each page serves a single documentation type
- Maintenance owners are assigned

## Rollback
- Version control allows reverting changes

## Common Failures
- Writing docs that mix learning and reference content
- Not updating docs when product changes
- No search or navigation making docs unfindable

## Examples
### Documentation Structure
Getting Started (Tutorial) → How-to Guides → API Reference → Concepts
Each page: Title, Prerequisites, Steps, Expected Outcome, Related Links

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
