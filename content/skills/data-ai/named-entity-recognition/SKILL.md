---
id: data-ai.named-entity-recognition
name: Named Entity Recognition
version: 1.0.0
domain: data-ai
category: data-ai.nlp
purpose: Identify and classify named entities in text into predefined categories such as persons, organizations, and locations.
summary: Systematic NER including annotation design, model selection, training, and evaluation with entity-level metrics.
triggers:
  - named entity recognition
  - entity extraction
  - ner model
  - extract entities from text
  - entity classification
activation_triggers:
  - NER
  - entity extraction
  - named entity recognition
prerequisites:
  - annotated text dataset with entity labels
  - entity taxonomy defined
  - language identified
inputs:
  - annotated_dataset
  - entity_types
  - language
  - accuracy_requirements
steps:
  - Review annotation guidelines and inter-annotator agreement
  - Design preprocessing for NER (tokenization, sentence splitting)
  - Select model (CRF, BiLSTM-CRF, transformer-based)
  - Train with entity-level loss and appropriate evaluation
  - Evaluate with entity-level F1 (strict and relaxed)
  - Analyze error types (boundary, type, missed entities)
  - Document performance and annotation quality issues
outputs:
  - trained_ner_model
  - evaluation_report
  - error_analysis
tools:
  - shell.readonly (training scripts)
  - filesystem.read (annotated data)
  - filesystem.write (model, report)
quality_gates:
  - Annotation quality assessed
  - Entity-level F1 evaluated
  - Error types analyzed
failure_modes:
  - Inconsistent entity annotations
  - Ignoring nested or overlapping entities
  - Using token-level metrics instead of entity-level
handoffs:
  - data-ai.nlp-engineer (for advanced NLP)
  - data-ai.knowledge-graphs (for entity linking)
source_references:
  - ref.github.data-ai.ner.2026-05-31
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
Use this skill when building a named entity recognition model or extracting entities from text.

## Prerequisites
- Annotated text dataset with entity labels
- Entity taxonomy defined (PER, ORG, LOC, etc.)
- Target language identified

## Steps
1. **Annotation Review**: Check inter-annotator agreement, entity boundary consistency.
2. **Preprocessing**: Tokenization aligned with annotation, sentence splitting.
3. **Model Selection**: CRF (baseline), BiLSTM-CRF (sequence), BERT-NER (state-of-art).
4. **Train**: BIO/BIOES tagging, class-weighted loss for rare entities.
5. **Evaluate**: Entity-level F1 (strict match), per-entity-type metrics.
6. **Error Analysis**: Boundary errors, type confusion, missed entities.
7. **Document**: Performance, annotation quality issues, and limitations.

## Verification
- Annotation quality assessed (inter-annotator agreement)
- Entity-level F1 evaluated on held-out set
- Error types categorized and analyzed

## Rollback
- Revert to previous model version

## Common Failures
- Inconsistent entity boundary annotations
- Ignoring nested entities (e.g., "Bank of America" as ORG containing LOC)
- Using token-level accuracy instead of entity-level F1
