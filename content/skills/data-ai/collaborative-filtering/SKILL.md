---
id: data-ai.collaborative-filtering
name: Collaborative Filtering
version: 1.0.0
domain: data-ai
category: data-ai.recommendation
purpose: Build recommendation systems using collaborative filtering based on user-item interaction patterns.
summary: Systematic collaborative filtering including matrix factorization, neural approaches, and evaluation with ranking metrics.
triggers:
  - collaborative filtering
  - user based recommendations
  - item based recommendations
  - matrix factorization
  - interaction based recommendations
activation_triggers:
  - collaborative filtering
  - CF model
  - user-item interactions
prerequisites:
  - user-item interaction data
  - sufficient data density
  - recommendation task defined
inputs:
  - interaction_data
  - user_metadata (optional)
  - item_metadata (optional)
steps:
  - Analyze interaction data for sparsity and bias
  - Choose CF approach (user-based, item-based, matrix factorization, neural)
  - Handle cold-start for new users and items
  - Train model with implicit or explicit feedback
  - Evaluate with ranking metrics (NDCG, MAP, recall@k)
  - Address popularity bias and filter bubbles
  - Document model performance and limitations
outputs:
  - trained_cf_model
  - evaluation_report
  - bias_analysis
tools:
  - shell.readonly (training scripts)
  - filesystem.read (interaction data)
  - filesystem.write (model, report)
quality_gates:
  - Cold-start addressed
  - Ranking metrics evaluated
  - Popularity bias assessed
failure_modes:
  - Ignoring data sparsity issues
  - Not handling cold-start users/items
  - Amplifying popularity bias
handoffs:
  - data-ai.recommendation-engineer (for system integration)
  - data-ai.content-based-recommendation (for hybrid)
source_references:
  - ref.github.data-ai.collaborative-filtering.2026-05-31
allowed_agents:
  - data-ai.recommendation-engineer
  - data-ai.ml-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert to previous model version
validators:
  - skill.validator
---

## Trigger
Use this skill when building a collaborative filtering recommendation system.

## Prerequisites
- User-item interaction data available
- Data density sufficient for learning patterns
- Recommendation task defined (top-k, rating prediction)

## Steps
1. **Analyze Data**: Sparsity, implicit vs explicit feedback, temporal patterns.
2. **Choose Approach**: User-based, item-based, ALS, BPR, neural CF.
3. **Cold-Start**: Hybrid with content features, popularity fallback, exploration.
4. **Train**: Negative sampling, regularization, implicit feedback handling.
5. **Evaluate**: NDCG@k, MAP@k, recall@k on held-out interactions.
6. **Bias Analysis**: Measure popularity bias, diversity, coverage.
7. **Document**: Performance, cold-start strategy, and bias findings.

## Verification
- Cold-start strategy implemented
- Ranking metrics evaluated on held-out set
- Popularity bias measured and addressed

## Rollback
- Revert to previous model version

## Common Failures
- Ignoring sparsity (poor recommendations for long-tail items)
- No cold-start handling (new users get no recommendations)
- Amplifying popularity bias (only recommending popular items)
