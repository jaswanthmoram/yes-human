---
id: data-ai.hyperparameter-tuning
name: Hyperparameter Tuning
version: 1.0.0
domain: data-ai
category: data-ai.modeling
purpose: Optimize model hyperparameters using systematic search strategies to maximize performance.
summary: Systematic hyperparameter optimization using grid search, random search, Bayesian optimization, or population-based training.
triggers:
  - tune hyperparameters
  - hyperparameter optimization
  - optimize model config
  - find best hyperparameters
  - model tuning
activation_triggers:
  - hyperparameter tuning
  - model optimization
  - config search
prerequisites:
  - selected model architecture
  - evaluation metric defined
  - compute budget available
inputs:
  - model
  - search_space
  - evaluation_metric
  - compute_budget
steps:
  - Define hyperparameter search space
  - Select search strategy (grid, random, Bayesian, PBT)
  - Configure cross-validation or holdout strategy
  - Run search with resource constraints
  - Analyze results and identify best configuration
  - Validate best config on held-out set
  - Document search results and final configuration
outputs:
  - best_hyperparameters
  - search_results
  - tuning_report
tools:
  - shell.readonly (run tuning scripts)
  - filesystem.read (model, data)
  - filesystem.write (tuning report)
quality_gates:
  - Search space defined appropriately
  - Strategy matches compute budget
  - Best config validated on held-out set
failure_modes:
  - Search space too narrow or too broad
  - Overfitting to validation set during tuning
  - Not respecting compute budget
handoffs:
  - data-ai.model-deployment (for deployment)
  - data-ai.ml-engineer (for training pipeline)
source_references:
  - ref.github.data-ai.hyperparameter-tuning.2026-05-31
allowed_agents:
  - data-ai.ml-engineer
  - data-ai.data-scientist
allowed_workflows: []
status: active
budget_band: expanded
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when optimizing model hyperparameters or searching for the best model configuration.

## Prerequisites
- Model architecture already selected
- Evaluation metric defined
- Compute budget understood

## Steps
1. **Define Search Space**: Ranges for each hyperparameter based on domain knowledge.
2. **Select Strategy**: Grid (small space), random (large space), Bayesian (expensive eval), PBT (distributed).
3. **Configure Validation**: K-fold CV or holdout; ensure no leakage.
4. **Run Search**: Execute within compute budget; track all trials.
5. **Analyze Results**: Identify best config; check for overfitting to validation.
6. **Validate**: Confirm best config on independent held-out set.
7. **Document**: Record search space, strategy, results, and final config.

## Verification
- Search space appropriate for model
- Strategy matches budget
- Best config validated independently

## Rollback
- No state changes; this is an optimization skill

## Common Failures
- Overfitting to validation set during search
- Search space too narrow (missing good configs)
- Ignoring compute budget constraints

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
