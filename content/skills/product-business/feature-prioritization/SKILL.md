---
id: product-business.feature-prioritization
name: Feature Prioritization
version: 1.0.0
domain: product-business
category: product-business.planning
purpose: Apply structured prioritization frameworks to rank features by impact, effort, and strategic alignment.
summary: Guides through RICE, ICE, MoSCoW, and Kano frameworks to make data-informed prioritization decisions.
triggers:
  - prioritize features
  - feature prioritization
  - rank backlog
  - prioritization framework
activation_triggers:
  - prioritize the backlog
  - what should we build first
  - feature ranking
prerequisites:
  - feature backlog or list of candidates
  - business context and strategic goals
inputs:
  - feature_list
  - evaluation_criteria
  - data_sources (optional)
steps:
  - Select appropriate prioritization framework for context
  - Score each feature against framework criteria
  - Validate scores with available data
  - Rank features and identify tiers
  - Document rationale and tradeoffs
  - Create review cadence for re-prioritization
outputs:
  - prioritized_backlog
  - scoring_matrix
  - tradeoff_documentation
tools:
  - filesystem.read
quality_gates:
  - Framework applied consistently across all features
  - Scores backed by data where available
  - Rationale documented for top decisions
failure_modes:
  - Using wrong framework for context
  - Scoring without supporting data
  - Not revisiting priorities as context changes
handoffs:
  - product-business.roadmap-planner (for timeline placement)
  - product-business.product-manager (for PRD creation)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.feature-prioritizer
  - product-business.product-manager
  - product-business.master
allowed_workflows:
  - product-business.feature-prioritization
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when prioritizing or re-prioritizing a feature backlog.

## Prerequisites
- Feature backlog or list of candidates
- Business context and strategic goals

## Steps
1. **Select Framework**: Choose RICE (quantitative), ICE (quick), MoSCoW (binary), or Kano (satisfaction).
2. **Score Features**: Apply framework criteria consistently.
3. **Validate**: Cross-reference scores with analytics, user feedback, and market data.
4. **Rank**: Create tiers (must-do, should-do, could-do, won't-do).
5. **Document**: Record rationale for each decision.
6. **Schedule Review**: Set cadence for re-prioritization.

## Verification
- Framework applied consistently
- Top-ranked features have data backing
- Tradeoffs are explicitly documented

## Rollback
- No state changes; this is a planning skill

## Common Failures
- HiPPO (Highest Paid Person's Opinion) overriding data
- Not distinguishing between urgency and importance
- Failing to re-prioritize when context changes

## Examples
### RICE Scoring
Feature: In-app notifications
- Reach: 8/10 (affects most active users)
- Impact: 3 (high impact on retention)
- Confidence: 80% (backed by user interviews)
- Effort: 2 person-weeks
- RICE Score: (8 × 3 × 0.8) / 2 = 9.6
