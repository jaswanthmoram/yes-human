---
id: data-ai.text-classification
name: Text Classification
version: 1.0.0
domain: data-ai
category: data-ai.nlp
purpose: Build text classification models for categorizing documents, messages, or content into predefined classes.
summary: Systematic text classification including preprocessing, model selection, training, and evaluation.
triggers:
  - text classification model
  - classify text documents
  - document categorization
  - text labeling
  - content classification
activation_triggers:
  - text classification
  - document categorization
  - text labeling
prerequisites:
  - labeled text dataset
  - classification taxonomy defined
  - language identified
inputs:
  - text_dataset
  - class_labels
  - language
  - accuracy_requirements
steps:
  - Profile text dataset for quality and class balance
  - Design preprocessing pipeline (tokenization, normalization)
  - Select model (traditional ML, transformer, fine-tuned LLM)
  - Train with appropriate loss and regularization
  - Evaluate on held-out test set
  - Analyze misclassifications and edge cases
  - Document model performance and limitations
outputs:
  - trained_classifier
  - evaluation_report
  - preprocessing_pipeline
tools:
  - shell.readonly (training scripts)
  - filesystem.read (text data, labels)
  - filesystem.write (model, report)
quality_gates:
  - Class imbalance addressed
  - Preprocessing documented
  - Test set evaluation complete
failure_modes:
  - Ignoring class imbalance in text data
  - Over-preprocessing losing semantic information
  - Not testing on out-of-domain text
handoffs:
  - data-ai.model-deployment (for serving)
  - data-ai.nlp-engineer (for advanced NLP)
source_references:
  - ref.github.data-ai.text-classification.2026-05-31
allowed_agents:
  - data-ai.nlp-engineer
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
Use this skill when building a text classification model for document or content categorization.

## Prerequisites
- Labeled text dataset available
- Classification taxonomy defined
- Target language identified

## Steps
1. **Profile Dataset**: Check text length distribution, class balance, label noise.
2. **Preprocessing**: Tokenization, lowercasing, stop words, stemming/lemmatization (task-dependent).
3. **Model Selection**: TF-IDF + SVM (baseline), BERT (mid-size), fine-tuned LLM (complex).
4. **Train**: Class-weighted loss, early stopping, learning rate scheduling.
5. **Evaluate**: Accuracy, per-class F1, macro F1 on held-out test set.
6. **Error Analysis**: Misclassifications, ambiguous samples, out-of-domain failures.
7. **Document**: Performance, preprocessing steps, and known limitations.

## Verification
- Class imbalance addressed
- Preprocessing pipeline documented
- Test set evaluation complete

## Rollback
- Revert to previous model version

## Common Failures
- Ignoring class imbalance (poor minority class recall)
- Over-preprocessing (removing useful signal)
- Not testing on out-of-domain or adversarial text
