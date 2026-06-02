---
id: data-ai.sentiment-analysis
name: Sentiment Analysis
version: 1.0.0
domain: data-ai
category: data-ai.nlp
purpose: Analyze text sentiment, opinions, and emotions using NLP techniques and pretrained models.
summary: Systematic sentiment analysis including preprocessing, model selection, aspect-based analysis, and evaluation.
triggers:
  - sentiment analysis
  - opinion mining
  - emotion detection in text
  - review sentiment classification
  - aspect based sentiment
activation_triggers:
  - sentiment analysis
  - opinion mining
  - emotion detection
prerequisites:
  - text data available
  - sentiment labels or lexicon defined
  - language identified
inputs:
  - text_data
  - sentiment_schema (binary, multi-class, aspect-based)
  - language
steps:
  - Profile text data for domain, language, and noise
  - Select approach (lexicon-based, ML, transformer)
  - Preprocess text appropriately for sentiment
  - Train or configure sentiment model
  - Evaluate on labeled test set
  - Perform aspect-based analysis if required
  - Document performance and limitations
outputs:
  - sentiment_model_or_pipeline
  - evaluation_report
  - aspect_analysis (if applicable)
tools:
  - shell.readonly (analysis scripts)
  - filesystem.read (text data)
  - filesystem.write (results, report)
quality_gates:
  - Sarcasm and negation handled
  - Domain-specific language considered
  - Evaluation on representative test set
failure_modes:
  - Ignoring sarcasm and irony
  - Not handling negation correctly
  - Using generic model for domain-specific sentiment
handoffs:
  - data-ai.nlp-engineer (for advanced NLP)
  - data-ai.data-analyst (for business insights)
source_references:
  - ref.github.data-ai.sentiment-analysis.2026-05-31
allowed_agents:
  - data-ai.nlp-engineer
  - data-ai.data-analyst
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when analyzing text sentiment, opinions, or emotions.

## Prerequisites
- Text data available for analysis
- Sentiment schema defined (binary, multi-class, aspect-based)
- Target language identified

## Steps
1. **Profile Data**: Check domain, language mix, noise level, text length.
2. **Select Approach**: VADER (quick), fine-tuned BERT (accurate), aspect-based (detailed).
3. **Preprocess**: Handle emojis, slang, domain-specific terms.
4. **Model**: Train or configure sentiment classifier.
5. **Evaluate**: Accuracy, F1 per sentiment class, confusion matrix.
6. **Aspect Analysis**: Extract aspects and their sentiments if required.
7. **Document**: Performance, domain limitations, and known failure cases.

## Verification
- Sarcasm and negation handling documented
- Domain-specific language addressed
- Evaluation on representative test set

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Ignoring sarcasm and irony (systematic misclassification)
- Not handling negation ("not good" classified as positive)
- Using generic model for domain-specific sentiment (financial, medical)
