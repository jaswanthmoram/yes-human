---
id: product-business.competitive-analysis
name: Competitive Analysis
version: 1.0.0
domain: product-business
category: product-business.strategy
purpose: Systematically analyze competitors to inform product strategy, positioning, and differentiation.
summary: Guides through competitor identification, feature comparison, SWOT analysis, and strategic recommendations.
triggers:
  - competitive analysis
  - competitor research
  - competitive landscape
  - competitor comparison
activation_triggers:
  - analyze competitors
  - who are our competitors
  - competitive positioning
prerequisites:
  - list of known competitors
  - product positioning context
inputs:
  - competitor_list
  - analysis_dimensions
  - product_context
steps:
  - Identify direct, indirect, and potential competitors
  - Gather data on features, pricing, positioning, and market share
  - Build feature comparison matrix
  - Conduct SWOT analysis for key competitors
  - Identify competitive advantages and gaps
  - Produce strategic recommendations
outputs:
  - competitive_landscape
  - feature_matrix
  - strategic_recommendations
tools:
  - filesystem.read
quality_gates:
  - Analysis covers direct and indirect competitors
  - Feature matrix is current and sourced
  - Recommendations are actionable
failure_modes:
  - Analyzing only direct competitors
  - Feature comparison without strategic context
  - Stale data without recency indicators
handoffs:
  - product-business.competitive-analyst (for deep dives)
  - product-business.product-marketer (for positioning)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.competitive-analyst
  - product-business.product-strategist
  - product-business.master
allowed_workflows:
  - product-business.competitive-analysis
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when analyzing competitors or updating competitive intelligence.

## Prerequisites
- List of known competitors
- Product positioning context

## Steps
1. **Identify**: Map direct, indirect, and emerging competitors.
2. **Gather Data**: Features, pricing, positioning, market share, funding.
3. **Compare**: Build feature matrix with parity/advantage/disadvantage ratings.
4. **SWOT**: Strengths, Weaknesses, Opportunities, Threats per competitor.
5. **Gap Analysis**: Where do we lead, lag, or match?
6. **Recommend**: Strategic actions based on competitive position.

## Verification
- Analysis includes indirect and emerging competitors
- Data sources and recency are documented
- Recommendations are specific and actionable

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Focusing only on features, ignoring positioning and GTM
- Not updating analysis regularly
- Treating competitive analysis as a one-time exercise

## Examples
### Feature Matrix
| Feature | Us | Competitor A | Competitor B |
|---------|-----|-------------|-------------|
| SSO | Yes | Yes (Enterprise) | No |
| API | Full | Limited | Full |
| Pricing | $29/mo | $49/mo | Free tier |

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
