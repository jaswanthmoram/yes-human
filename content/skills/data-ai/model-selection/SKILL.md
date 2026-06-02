---
id: data-ai.model-selection
name: Model Selection
version: 1.0.0
domain: data-ai
category: data-ai.modeling
purpose: Select the most appropriate ML model based on task requirements, data characteristics, and constraints.
summary: Systematic model selection comparing algorithms on performance, interpretability, latency, and resource requirements.
triggers:
  - select ml model
  - choose algorithm
  - model comparison
  - algorithm selection
  - best model for task
activation_triggers:
  - model selection
  - algorithm comparison
  - choosing the right model
prerequisites:
  - engineered dataset
  - defined evaluation metrics
  - understanding of constraints
inputs:
  - dataset
  - task_type
  - constraints (latency, interpretability, compute)
steps:
  - Define task type and evaluation criteria
  - Identify candidate algorithms based on task and data
  - Train baseline models for each candidate
  - Compare models on performance metrics
  - Assess interpretability and resource requirements
  - Select best model with justification
  - Document selection rationale
outputs:
  - selected_model
  - comparison_report
  - selection_rationale
tools:
  - shell.readonly (run training scripts)
  - filesystem.read (dataset)
  - filesystem.write (comparison report)
quality_gates:
  - Multiple candidates compared
  - Constraints considered
  - Selection justified
failure_modes:
  - Selecting model without baseline comparison
  - Ignoring latency and resource constraints
  - Not considering interpretability requirements
handoffs:
  - data-ai.hyperparameter-tuning (for optimization)
  - data-ai.ml-engineer (for training pipeline)
source_references:
  - ref.github.data-ai.model-selection.2026-05-31
allowed_agents:
  - data-ai.data-scientist
  - data-ai.ml-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when selecting an ML algorithm or comparing models for a specific task.

## Prerequisites
- Engineered dataset ready for modeling
- Evaluation metrics defined
- Constraints (latency, interpretability, compute) understood

## Steps
1. **Define Task**: Classification, regression, ranking, generation; and success criteria.
2. **Identify Candidates**: Based on task type, data size, and constraints.
3. **Train Baselines**: Simple implementations of each candidate algorithm.
4. **Compare**: Evaluate on held-out set using defined metrics.
5. **Assess Constraints**: Latency, memory, interpretability, deployment requirements.
6. **Select**: Choose best model with documented justification.
7. **Document**: Record comparison results and selection rationale.

## Verification
- Multiple candidates compared on same metrics
- Constraints explicitly considered
- Selection rationale documented

## Rollback
- No state changes; this is an evaluation skill

## Common Failures
- Choosing model without comparison
- Ignoring deployment constraints
- Overlooking interpretability needs

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
