---
id: data-ai.model-eval
name: ML Model Evaluation
version: 1.0.0
domain: data-ai
category: data-ai.evaluation
purpose: Evaluate machine learning models using appropriate metrics and validation strategies.
summary: Systematic approach to assessing model performance including metric selection, validation, and comparison.
triggers:
  - evaluate ML model performance
  - machine learning model evaluation metrics
  - assess model performance and accuracy
  - test model accuracy and F1 score
  - model evaluation with cross-validation
activation_triggers:
  - ML model eval
  - machine learning performance evaluation
  - model accuracy and cross-validation testing
prerequisites:
  - trained model
  - test dataset
  - understanding of task requirements
inputs:
  - model
  - test_dataset
  - evaluation_metrics
  - baseline_model (optional)
steps:
  - Select appropriate evaluation metrics for the task
  - Prepare test dataset (ensure no leakage from training)
  - Run model on test dataset
  - Calculate all selected metrics
  - Perform cross-validation if applicable
  - Compare against baseline model
  - Analyze errors and failure cases
  - Assess model fairness and bias
  - Document results and recommendations
outputs:
  - evaluation_metrics_results
  - comparison_to_baseline
  - error_analysis
  - fairness_assessment
  - evaluation_report
tools:
  - shell.readonly (run evaluation scripts)
  - filesystem.read (model, test data)
  - filesystem.write (evaluation report)
quality_gates:
  - Appropriate metrics selected
  - Test set is independent
  - Results are statistically significant
  - Errors analyzed
  - Fairness assessed
failure_modes:
  - Using wrong metrics for the task
  - Data leakage (test set in training)
  - Not comparing to baseline
  - Ignoring error analysis
  - Not assessing fairness
handoffs:
  - data-ai.ml-engineer (for model improvements)
  - data-ai.dataset-profiling (for dataset issues)
source_references:
  - ref.github.ml-evaluation-best-practices.2026-06-01
allowed_agents:
  - data-ai.ml-engineer
  - data-ai.eval-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when evaluating a machine learning model's performance, comparing models, or assessing model quality.

## Prerequisites
- Trained model ready for evaluation
- Test dataset (separate from training data)
- Understanding of the task and requirements

## Steps
1. **Select Evaluation Metrics**:
   - **Classification**:
     - Accuracy, Precision, Recall, F1-Score
     - ROC-AUC, PR-AUC
     - Confusion Matrix
     - Log Loss
   - **Regression**:
     - MSE, RMSE, MAE
     - R², Adjusted R²
     - MAPE (Mean Absolute Percentage Error)
   - **Ranking**:
     - NDCG, MRR, MAP
   - **Generation**:
     - BLEU, ROUGE, BERTScore
   - Choose metrics based on business requirements
2. **Prepare Test Dataset**:
   - Ensure test set is separate from training (no leakage)
   - Verify test set is representative of real data
   - Check test set size (statistically significant)
   - Stratify if needed (for imbalanced classes)
3. **Run Model on Test Set**:
   - Generate predictions for all test samples
   - Record prediction confidence/probabilities
   - Measure inference time and resource usage
   - Save predictions for analysis
4. **Calculate Metrics**:
   - Compute all selected metrics
   - Calculate confidence intervals
   - Check for statistical significance
   - Compare to target thresholds
5. **Perform Cross-Validation** (if applicable):
   - K-fold cross-validation for small datasets
   - Stratified K-fold for imbalanced data
   - Report mean and std across folds
6. **Compare to Baseline**:
   - Compare to simple baseline (majority class, mean, etc.)
   - Compare to previous model version
   - Compare to state-of-the-art (if applicable)
   - Calculate improvement percentage
7. **Analyze Errors**:
   - Identify misclassified samples
   - Look for patterns in errors (specific classes, features)
   - Check for systematic biases
   - Prioritize error types by impact
8. **Assess Fairness and Bias**:
   - Check performance across demographic groups
   - Measure disparate impact
   - Identify proxy variables
   - Assess equal opportunity
9. **Document Results**:
   - Summary of all metrics
   - Comparison to baseline and targets
   - Error analysis findings
   - Fairness assessment
   - Recommendations for improvement
   - Confidence in results

## Verification
- Appropriate metrics selected for the task
- Test set is independent (no leakage)
- Results are statistically significant
- Errors thoroughly analyzed
- Fairness assessed
- Documentation complete

## Rollback
- No state changes; this is an evaluation skill

## Common Failures
- Using accuracy for imbalanced datasets (use F1, PR-AUC)
- Data leakage (test set accidentally in training)
- Not comparing to baseline (is the model actually useful?)
- Ignoring error analysis (missing improvement opportunities)
- Not assessing fairness (ethical and legal issues)
- Small test set (results not statistically significant)
- Overfitting to test set (using it for model selection)

## Examples
### Evaluating a Churn Prediction Model
Input: Binary classification model predicting customer churn
Output:
- **Metrics**:
  - Accuracy: 0.82
  - Precision: 0.71 (churned class)
  - Recall: 0.68 (churned class)
  - F1-Score: 0.69 (churned class)
  - ROC-AUC: 0.85
  - PR-AUC: 0.72
- **Baseline Comparison**:
  - Majority class baseline: 0.73 accuracy (predict all retained)
  - Previous model: 0.78 accuracy, 0.65 F1
  - Improvement: +4% accuracy, +4% F1 vs previous
- **Error Analysis**:
  - False negatives (missed churn): 32% of churned customers
    - Pattern: Mostly new customers (< 6 months tenure)
    - Impact: High (lost revenue)
  - False positives (false alarms): 29% of predicted churn
    - Pattern: High-value customers with recent complaints
    - Impact: Medium (unnecessary retention offers)
- **Fairness Assessment**:
  - Performance by age group:
    - 18-30: F1 = 0.72
    - 31-50: F1 = 0.70
    - 51+: F1 = 0.65 (lower performance)
  - Disparate impact ratio: 0.90 (acceptable)
- **Recommendations**:
  1. Add features for new customer behavior (improve recall)
  2. Adjust threshold to reduce false negatives (business priority)
  3. Investigate lower performance for 51+ age group
  4. Consider cost-sensitive learning (churn is more costly)

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
