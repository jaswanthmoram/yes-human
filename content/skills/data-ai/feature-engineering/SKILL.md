---
id: data-ai.feature-engineering
name: Feature Engineering
version: 1.0.0
domain: data-ai
category: data-ai.data-preparation
purpose: Create, transform, and select features to improve model performance and interpretability.
summary: Systematic feature engineering including creation, transformation, selection, and validation of features for ML models.
triggers:
  - engineer features
  - feature selection
  - feature transformation
  - create derived features
  - feature importance analysis
activation_triggers:
  - feature engineering
  - feature creation and selection
  - derived feature design
prerequisites:
  - cleaned dataset
  - target variable defined
  - understanding of model type
inputs:
  - cleaned_dataset
  - target_variable
  - domain_knowledge (optional)
steps:
  - Analyze existing features and their distributions
  - Create domain-specific derived features
  - Apply transformations (log, sqrt, box-cox) for skewed features
  - Encode categorical variables appropriately
  - Perform feature selection using statistical or model-based methods
  - Validate features for leakage and multicollinearity
  - Document feature definitions and rationale
outputs:
  - engineered_dataset
  - feature_definitions
  - feature_importance_report
tools:
  - shell.readonly (run feature scripts)
  - filesystem.read (cleaned data)
  - filesystem.write (engineered data)
quality_gates:
  - No data leakage in features
  - Multicollinearity checked
  - Feature definitions documented
failure_modes:
  - Creating features that leak target information
  - Ignoring multicollinearity
  - Not documenting feature definitions
handoffs:
  - data-ai.data-scientist (for model training)
  - data-ai.ml-engineer (for pipeline integration)
source_references:
  - ref.github.data-ai.feature-engineering.2026-05-31
allowed_agents:
  - data-ai.data-scientist
  - data-ai.ml-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Retain pre-engineering dataset
validators:
  - skill.validator
---

## Trigger
Use this skill when creating, transforming, or selecting features for machine learning models.

## Prerequisites
- Cleaned dataset ready for modeling
- Target variable clearly defined
- Understanding of the model type and requirements

## Steps
1. **Analyze Features**: Profile distributions, correlations, and cardinality.
2. **Create Derived Features**: Domain-specific ratios, aggregations, time-based features.
3. **Transform**: Apply log, sqrt, or box-cox for skewed distributions.
4. **Encode Categoricals**: One-hot, target encoding, or ordinal based on cardinality and model type.
5. **Select Features**: Use mutual information, permutation importance, or regularization.
6. **Validate**: Check for target leakage and multicollinearity (VIF).
7. **Document**: Define each feature with type, source, and rationale.

## Verification
- No target leakage detected
- Multicollinearity within acceptable bounds
- All features documented with definitions

## Rollback
- Retain pre-engineering dataset; feature engineering is re-runnable

## Common Failures
- Target leakage through derived features
- High multicollinearity degrading model interpretability
- Undocumented features causing reproducibility issues
