---
id: data-ai.object-detection
name: Object Detection
version: 1.0.0
domain: data-ai
category: data-ai.computer-vision
purpose: Build object detection models for localizing and classifying objects in images or video streams.
summary: Systematic object detection including annotation strategy, model selection, training, and evaluation with mAP metrics.
triggers:
  - object detection model
  - detect objects in images
  - bounding box detection
  - object localization
  - video object detection
activation_triggers:
  - object detection
  - bounding box model
  - object localization
prerequisites:
  - annotated image dataset with bounding boxes
  - object classes defined
  - compute resources available
inputs:
  - annotated_dataset
  - object_classes
  - accuracy_and_latency_requirements
steps:
  - Review annotation quality and consistency
  - Design data augmentation for detection (scale, occlusion)
  - Select detection architecture (YOLO, Faster R-CNN, DETR)
  - Train with appropriate loss functions and anchors
  - Evaluate with mAP, per-class AP, and inference speed
  - Analyze failure modes (missed detections, false positives)
  - Document model performance and deployment considerations
outputs:
  - trained_detector
  - evaluation_report
  - deployment_spec
tools:
  - shell.readonly (training scripts)
  - filesystem.read (images, annotations)
  - filesystem.write (model, report)
quality_gates:
  - Annotation quality verified
  - mAP evaluated on held-out set
  - Inference speed measured
failure_modes:
  - Inconsistent annotations degrading model quality
  - Ignoring small object detection challenges
  - Not measuring inference speed for real-time requirements
handoffs:
  - data-ai.model-deployment (for serving)
  - data-ai.computer-vision-engineer (for system integration)
source_references:
  - ref.github.data-ai.object-detection.2026-05-31
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
Use this skill when building an object detection model for localizing and classifying objects.

## Prerequisites
- Annotated dataset with bounding boxes available
- Object classes clearly defined
- Compute resources for training available

## Steps
1. **Annotation Review**: Check consistency, completeness, and IoU thresholds.
2. **Augmentation**: Scale variation, occlusion simulation, mosaic augmentation.
3. **Model Selection**: YOLO (real-time), Faster R-CNN (accuracy), DETR (end-to-end).
4. **Train**: Multi-scale training, focal loss for class imbalance, anchor tuning.
5. **Evaluate**: mAP@0.5, mAP@0.5:0.95, per-class AP, FPS measurement.
6. **Error Analysis**: Missed detections, false positives, localization errors.
7. **Document**: Performance, deployment considerations, known limitations.

## Verification
- Annotation quality verified
- mAP evaluated on held-out set
- Inference speed measured against requirements

## Rollback
- Revert to previous model version

## Common Failures
- Inconsistent bounding box annotations
- Ignoring small object detection (low recall for small objects)
- Not measuring inference speed for real-time use cases
