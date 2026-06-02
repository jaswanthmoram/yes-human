---
id: data-ai.image-classification
name: Image Classification
version: 1.0.0
domain: data-ai
category: data-ai.computer-vision
purpose: Build image classification models using CNNs, Vision Transformers, or transfer learning approaches.
summary: Systematic image classification including data preparation, model selection, training, and evaluation.
triggers:
  - image classification model
  - classify images
  - image recognition
  - visual categorization
  - image tagging model
activation_triggers:
  - image classification
  - visual recognition
  - image categorization
prerequisites:
  - labeled image dataset
  - classification taxonomy defined
  - compute resources available
inputs:
  - image_dataset
  - class_labels
  - accuracy_requirements
steps:
  - Profile image dataset for quality and class balance
  - Design data augmentation strategy
  - Select model architecture (CNN, ViT, transfer learning)
  - Train with appropriate learning rate schedule
  - Evaluate on held-out test set
  - Analyze confusion matrix and error cases
  - Document model performance and limitations
outputs:
  - trained_model
  - evaluation_report
  - augmentation_strategy
tools:
  - shell.readonly (training scripts)
  - filesystem.read (images, labels)
  - filesystem.write (model, report)
quality_gates:
  - Class imbalance addressed
  - Augmentation strategy documented
  - Test set evaluation complete
failure_modes:
  - Training without adequate augmentation
  - Ignoring class imbalance
  - Not analyzing confusion matrix
handoffs:
  - data-ai.model-deployment (for serving)
  - data-ai.computer-vision-engineer (for advanced CV)
source_references:
  - ref.github.data-ai.image-classification.2026-05-31
allowed_agents:
  - data-ai.computer-vision-engineer
  - data-ai.ml-engineer
allowed_workflows: []
status: active
budget_band: expanded
rollback:
  - Revert to previous model version
validators:
  - skill.validator
---

## Trigger
Use this skill when building an image classification model or visual categorization system.

## Prerequisites
- Labeled image dataset available
- Classification taxonomy defined
- Compute resources for training available

## Steps
1. **Profile Dataset**: Check image quality, resolution distribution, class balance.
2. **Augmentation**: Design strategy (flip, rotate, crop, color jitter, mixup).
3. **Model Selection**: CNN (ResNet, EfficientNet), ViT, or transfer learning based on dataset size.
4. **Train**: Use learning rate warmup, cosine decay, mixed precision.
5. **Evaluate**: Test set metrics (accuracy, per-class F1), confusion matrix.
6. **Error Analysis**: Identify systematic failures, ambiguous samples.
7. **Document**: Performance, augmentation, and known limitations.

## Verification
- Class imbalance addressed with oversampling or weighting
- Augmentation strategy documented and applied
- Test set evaluation complete with confusion matrix

## Rollback
- Revert to previous model version

## Common Failures
- Insufficient augmentation causing overfitting
- Ignoring class imbalance (poor minority class performance)
- Not analyzing confusion matrix (missing systematic errors)
