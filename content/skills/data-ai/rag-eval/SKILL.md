---
id: data-ai.rag-eval
name: RAG System Evaluation
version: 1.0.0
domain: data-ai
category: data-ai.evaluation
purpose: Evaluate Retrieval-Augmented Generation (RAG) systems for retrieval quality and generation accuracy.
summary: Systematic approach to assessing RAG performance including retrieval metrics, generation quality, and end-to-end evaluation.
triggers:
  - evaluate RAG system performance
  - RAG evaluation metrics and quality
  - assess retrieval augmented generation quality
  - test RAG pipeline performance
  - RAG performance evaluation and testing
activation_triggers:
  - RAG eval
  - retrieval augmented generation evaluation
  - RAG system testing
prerequisites:
  - RAG system deployed
  - test dataset available
inputs:
  - rag_system
  - test_dataset
  - evaluation_metrics
  - baseline_results (optional)
steps:
  - Define evaluation metrics (retrieval and generation)
  - Prepare test dataset with ground truth
  - Evaluate retrieval quality (precision, recall, MRR, NDCG)
  - Evaluate generation quality (faithfulness, relevance, coherence)
  - Perform end-to-end evaluation
  - Compare against baseline if available
  - Identify failure cases and patterns
  - Document findings and recommendations
outputs:
  - retrieval_metrics
  - generation_metrics
  - end_to_end_results
  - failure_analysis
  - improvement_recommendations
tools:
  - shell.readonly (run evaluation scripts)
  - filesystem.read (test data, results)
  - filesystem.write (evaluation report)
quality_gates:
  - All metrics calculated
  - Failure cases analyzed
  - Recommendations actionable
  - Results reproducible
failure_modes:
  - Using inappropriate metrics
  - Test dataset not representative
  - Not evaluating retrieval and generation separately
  - Ignoring failure cases
  - Not comparing to baseline
handoffs:
  - data-ai.rag-engineer (for improvements)
  - data-ai.dataset-profiling (for dataset issues)
source_references:
  - ref.github.rag-evaluation-best-practices.2026-06-01
allowed_agents:
  - data-ai.rag-engineer
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
Use this skill when evaluating a RAG system's performance, assessing retrieval quality, or testing generation accuracy.

## Prerequisites
- RAG system deployed and accessible
- Test dataset with questions and ground truth answers
- Understanding of RAG evaluation metrics

## Steps
1. **Define Evaluation Metrics**:
   - **Retrieval Metrics**:
     - Precision@K: % of retrieved documents that are relevant
     - Recall@K: % of relevant documents that are retrieved
     - MRR (Mean Reciprocal Rank): Average rank of first relevant document
     - NDCG (Normalized Discounted Cumulative Gain): Ranking quality
   - **Generation Metrics**:
     - Faithfulness: Does the answer stick to retrieved context?
     - Relevance: Does the answer address the question?
     - Coherence: Is the answer well-structured and logical?
     - Correctness: Is the answer factually correct?
2. **Prepare Test Dataset**:
   - Collect diverse questions (simple, complex, multi-hop)
   - Create ground truth answers
   - Identify relevant documents for each question
   - Include edge cases and failure scenarios
   - Ensure dataset is representative of real usage
3. **Evaluate Retrieval Quality**:
   - Run all test queries through retriever
   - Calculate Precision@K, Recall@K, MRR, NDCG
   - Analyze retrieval failures (wrong docs, missing docs)
   - Check for bias in retrieval (certain topics underrepresented)
4. **Evaluate Generation Quality**:
   - Generate answers for all test questions
   - Use automated metrics (ROUGE, BLEU, BERTScore)
   - Perform human evaluation (sample of results)
   - Check for hallucinations (answers not in context)
   - Assess faithfulness to retrieved context
5. **End-to-End Evaluation**:
   - Run complete RAG pipeline (retrieve + generate)
   - Measure overall answer quality
   - Compare to baseline (if available)
   - Calculate success rate (% of acceptable answers)
6. **Analyze Failures**:
   - Categorize failure types:
     - Retrieval failure (wrong/missing documents)
     - Generation failure (hallucination, irrelevant answer)
     - Combined failure (both retrieval and generation issues)
   - Identify patterns in failures
   - Prioritize by frequency and impact
7. **Document Findings**:
   - Summary of metrics
   - Comparison to baseline
   - Failure analysis
   - Specific recommendations for improvement
   - Confidence intervals and statistical significance

## Verification
- All metrics calculated correctly
- Test dataset is representative
- Failure cases thoroughly analyzed
- Recommendations are specific and actionable
- Results are reproducible

## Rollback
- No state changes; this is an evaluation skill

## Common Failures
- Using only automated metrics (need human evaluation too)
- Test dataset not representative of real usage
- Not evaluating retrieval and generation separately
- Ignoring failure cases (only looking at averages)
- Not comparing to baseline or previous version
- Small test dataset (not statistically significant)

## Examples
### Evaluating a Customer Support RAG System
Input: RAG system for answering customer questions
Output:
- **Retrieval Metrics**:
  - Precision@5: 0.82 (82% of top 5 docs are relevant)
  - Recall@10: 0.91 (91% of relevant docs in top 10)
  - MRR: 0.75 (first relevant doc at rank 1.33 on average)
- **Generation Metrics**:
  - Faithfulness: 0.88 (88% of answers stick to context)
  - Relevance: 0.92 (92% of answers address the question)
  - Correctness: 0.85 (85% of answers are factually correct)
- **End-to-End**:
  - Success rate: 78% (acceptable answers)
  - Baseline comparison: +5% vs previous version
- **Failure Analysis**:
  - 12% retrieval failures (missing docs for new products)
  - 10% generation failures (hallucinations about pricing)
- **Recommendations**:
  1. Update knowledge base with new product docs
  2. Add pricing guardrails to prevent hallucinations
  3. Improve retriever for product-specific queries

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
