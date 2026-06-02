---
id: data-ai.embedding-index-review
name: Vector Index Quality Review
version: 1.0.0
domain: data-ai
category: data-ai.vector-search
purpose: Review and assess the quality of vector embeddings and similarity search indexes.
summary: Systematic approach to evaluating embedding quality, index performance, and retrieval accuracy.
triggers:
  - review vector embeddings quality
  - check vector index performance
  - embedding quality assessment for search
  - vector index performance evaluation
  - similarity search quality review
activation_triggers:
  - vector embedding review
  - vector index quality check
  - vector similarity search evaluation
prerequisites:
  - vector index built
  - test queries available
  - understanding of use case
inputs:
  - vector_index
  - embedding_model
  - test_queries
  - ground_truth (optional)
steps:
  - Assess embedding quality (distribution, dimensionality)
  - Evaluate index performance (latency, recall)
  - Test retrieval accuracy with known queries
  - Check for embedding biases
  - Analyze failure cases
  - Benchmark against alternatives
  - Document findings and recommendations
outputs:
  - embedding_quality_report
  - index_performance_metrics
  - retrieval_accuracy
  - failure_analysis
  - recommendations
tools:
  - shell.readonly (run evaluation scripts)
  - filesystem.read (index, embeddings)
  - filesystem.write (report)
quality_gates:
  - Embedding quality assessed
  - Index performance measured
  - Retrieval accuracy tested
  - Failures analyzed
  - Recommendations actionable
failure_modes:
  - Not checking embedding distribution
  - Ignoring index latency
  - Small test query set
  - Not analyzing failures
  - Not benchmarking alternatives
handoffs:
  - data-ai.rag-engineer (for RAG improvements)
  - data-ai.ml-engineer (for embedding model improvements)
source_references:
  - ref.github.vector-search-best-practices.2026-06-01
allowed_agents:
  - data-ai.rag-engineer
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
Use this skill when reviewing vector embedding quality, assessing similarity search indexes, or evaluating retrieval performance.

## Prerequisites
- Vector index built and accessible
- Test queries with expected results (if available)
- Understanding of the use case (what the embeddings are used for)

## Steps
1. **Assess Embedding Quality**:
   - **Distribution Analysis**:
     - Check embedding dimensions (are they appropriate?)
     - Analyze value distributions (mean, std, range)
     - Check for collapsed dimensions (all near zero)
     - Verify normalization (if required)
   - **Dimensionality Reduction**:
     - Visualize with t-SNE or UMAP
     - Check if similar items cluster together
     - Look for outliers or anomalies
   - **Semantic Quality**:
     - Test with known similar/dissimilar pairs
     - Check if distances reflect semantic similarity
     - Verify nearest neighbors make sense
2. **Evaluate Index Performance**:
   - **Latency**:
     - Measure query time (p50, p95, p99)
     - Check scalability (how does it scale with index size?)
     - Compare to requirements (real-time vs batch)
   - **Recall**:
     - Measure recall@K (are true matches in top K?)
     - Check recall at different K values
     - Compare to brute-force search (ground truth)
   - **Resource Usage**:
     - Memory footprint
     - CPU usage during queries
     - Disk I/O (if applicable)
3. **Test Retrieval Accuracy**:
   - Run test queries through the index
   - Compare results to ground truth (if available)
   - Calculate precision@K, recall@K, MRR
   - Check for systematic errors
4. **Check for Embedding Biases**:
   - Analyze embedding distributions by category
   - Check for demographic biases (if applicable)
   - Look for domain-specific biases
   - Test fairness across groups
5. **Analyze Failure Cases**:
   - Identify queries with poor results
   - Categorize failure types:
     - Embedding quality (poor semantic representation)
     - Index issues (approximate search errors)
     - Data issues (missing or incorrect data)
   - Look for patterns in failures
6. **Benchmark Against Alternatives**:
   - Compare to other embedding models
   - Test different index types (HNSW, IVF, etc.)
   - Evaluate different distance metrics
   - Compare to simple baselines (BM25, TF-IDF)
7. **Document Findings**:
   - Embedding quality assessment
   - Index performance metrics
   - Retrieval accuracy results
   - Failure analysis
   - Comparison to alternatives
   - Specific recommendations

## Verification
- Embedding quality thoroughly assessed
- Index performance measured (latency, recall)
- Retrieval accuracy tested with representative queries
- Failures analyzed and categorized
- Recommendations are specific and actionable
- Documentation complete

## Rollback
- No state changes; this is an evaluation skill

## Common Failures
- Not checking embedding distribution (collapsed dimensions)
- Ignoring index latency (too slow for real-time use)
- Small test query set (not representative)
- Not analyzing failures (missing improvement opportunities)
- Not benchmarking alternatives (missing better options)
- Not checking for biases (fairness issues)

## Examples
### Reviewing a Product Search Embedding Index
Input: Vector index with 100K product embeddings for search
Output:
- **Embedding Quality**:
  - Dimensions: 768 (appropriate for the model)
  - Distribution: Mean ≈ 0, Std ≈ 1 (well-normalized)
  - Collapsed dimensions: None detected
  - t-SNE visualization: Clear clusters by category
  - Semantic quality: Nearest neighbors are semantically similar
- **Index Performance**:
  - Latency: p50 = 12ms, p95 = 25ms, p99 = 45ms (meets <50ms requirement)
  - Recall@10: 0.94 (94% of true matches in top 10)
  - Memory: 2.3 GB (acceptable)
  - Scalability: Linear up to 500K items, then degrades
- **Retrieval Accuracy**:
  - Precision@5: 0.82
  - Recall@10: 0.94
  - MRR: 0.78
- **Failure Analysis**:
  - 6% of queries have recall < 0.5
    - Pattern: Queries with typos or slang
    - Cause: Embedding model not robust to variations
  - 3% of queries return irrelevant results
    - Pattern: Ambiguous product names
    - Cause: Embeddings don't capture context
- **Benchmark Comparison**:
  - Current model (Sentence-BERT): Recall@10 = 0.94
  - Alternative (OpenAI embeddings): Recall@10 = 0.96 (+2%)
  - Baseline (BM25): Recall@10 = 0.71 (-23%)
- **Recommendations**:
  1. Add query preprocessing to handle typos
  2. Consider fine-tuning embedding model on product data
  3. Evaluate OpenAI embeddings for 2% recall improvement
  4. Add hybrid search (combine vector + BM25) for ambiguous queries
  5. Plan for index sharding when reaching 500K items
