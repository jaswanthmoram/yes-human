---
id: meta-system.route-evaluation
name: Routing Accuracy Testing and Analysis
version: 1.0.0
domain: meta-system
category: meta-system.evaluation
purpose: Evaluate routing accuracy, identify failures, and improve routing performance.
summary: Systematic approach to running routing evaluations, analyzing failures, and implementing improvements.
triggers:
  - evaluate routing accuracy with fixtures
  - test routing accuracy with test cases
  - run route evaluation script
  - check routing performance metrics
  - analyze routing test failures
activation_triggers:
  - routing eval script
  - test route accuracy metrics
  - routing performance evaluation
prerequisites:
  - routing fixtures available
  - evaluation script configured
  - baseline metrics known
inputs:
  - fixture_files
  - evaluation_thresholds
  - baseline_results (optional)
steps:
  - Load all routing fixtures
  - Run routing evaluation script
  - Calculate accuracy metrics (top-1, top-3, MRR)
  - Identify failed fixtures
  - Categorize failures by type
  - Analyze failure patterns
  - Compare to baseline and thresholds
  - Identify improvement opportunities
  - Implement routing improvements
  - Re-run evaluation to verify
outputs:
  - evaluation_report
  - failure_analysis
  - improvement_recommendations
  - updated_routing_config
tools:
  - shell.readonly (run evaluation)
  - filesystem.read (load fixtures, results)
  - filesystem.write (save report)
quality_gates:
  - All fixtures evaluated
  - Failures categorized and analyzed
  - Metrics meet thresholds
  - Improvements documented
  - Re-evaluation passes
failure_modes:
  - Incomplete fixture coverage
  - Not analyzing failures
  - Ignoring edge cases
  - Not comparing to baseline
  - Implementing fixes without re-evaluation
handoffs:
  - meta-system.fixture-writing (to add more fixtures)
  - engineering.code-reviewer (to review routing logic)
source_references:
  - ref.github.routing-evaluation-best-practices.2026-06-01
allowed_agents:
  - meta-system.eval-runner
  - meta-system.supreme-router
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert routing configuration changes
  - Restore previous evaluation results
validators:
  - skill.validator
---

## Trigger
Use this skill when evaluating routing accuracy, analyzing routing failures, or improving routing performance.

## Prerequisites
- Routing fixtures available in tests/fixtures/
- Evaluation script configured (eval-route.js)
- Baseline metrics known (from previous evaluation)

## Steps
1. **Load Fixtures**:
   - Scan tests/fixtures/ for all fixture files
   - Parse JSON and validate format
   - Count total fixtures by category
   - Check for duplicates
2. **Run Evaluation**:
   - Execute `node packages/yes-schema/eval-route.js`
   - Capture output and metrics
   - Record execution time
   - Save raw results
3. **Calculate Metrics**:
   - **Top-1 Accuracy**: % of fixtures where first result is correct
   - **Top-3 Accuracy**: % where correct result is in top 3
   - **MRR (Mean Reciprocal Rank)**: Average 1/rank of correct result
   - **Precision@K**: % of top K results that are correct
   - **Recall@K**: % of correct results found in top K
4. **Identify Failures**:
   - List all failed fixtures
   - Record expected vs actual routing
   - Note confidence scores
   - Capture routing path
5. **Categorize Failures**:
   - **Trigger Mismatch**: Fixture doesn't match any triggers
   - **Ambiguous**: Multiple valid routes
   - **Edge Case**: Boundary condition not handled
   - **Negative Failure**: Negative case routed incorrectly
   - **System Error**: Routing system error
6. **Analyze Patterns**:
   - Group failures by agent/workflow
   - Identify common failure modes
   - Check for systematic issues
   - Look for missing triggers
   - Analyze confidence score distribution
7. **Compare to Baseline**:
   - Compare metrics to previous evaluation
   - Identify regressions (metrics decreased)
   - Note improvements (metrics increased)
   - Check if thresholds are met
8. **Identify Improvements**:
   - Add missing triggers for failed fixtures
   - Refine ambiguous triggers
   - Add negative keywords
   - Adjust confidence thresholds
   - Improve routing logic
9. **Implement Improvements**:
   - Update agent/workflow triggers
   - Modify routing configuration
   - Add new fixtures if needed
   - Document changes
10. **Re-evaluate**:
    - Run evaluation again
    - Verify improvements
    - Ensure no regressions
    - Update baseline metrics

## Verification
- All fixtures evaluated successfully
- Metrics meet or exceed thresholds
- Failures are analyzed and documented
- Improvements are implemented
- Re-evaluation shows improvement
- No regressions introduced

## Rollback
- Revert routing configuration: `git checkout HEAD~1 <config-file>`
- Restore previous evaluation results
- Re-run evaluation to confirm rollback

## Common Failures
- Running evaluation with incomplete fixtures
- Not analyzing failures (just looking at metrics)
- Ignoring edge cases (only testing typical scenarios)
- Not comparing to baseline (missing regressions)
- Implementing fixes without re-evaluation
- Not documenting improvements

## Examples
### Evaluating Routing Accuracy
Input: 500 routing fixtures across 10 categories
Output:
- **Metrics**:
  - Top-1 Accuracy: 94.2% (threshold: 95%) ✗
  - Top-3 Accuracy: 98.1% (threshold: 98%) ✓
  - MRR: 0.96 (threshold: 0.95) ✓
- **Failures**: 29 fixtures failed
  - Trigger Mismatch: 12 (missing triggers)
  - Ambiguous: 8 (multiple valid routes)
  - Edge Case: 5 (boundary conditions)
  - Negative Failure: 4 (negative cases routed incorrectly)
- **Patterns**:
  - 8 failures in engineering.code-review (missing "check code" trigger)
  - 5 failures in security.threat-model (ambiguous with security-review)
  - 4 failures in platform.ci-triage (edge cases with typos)
- **Improvements**:
  1. Add "check code" trigger to engineering.code-review
  2. Add negative keywords to distinguish code-review from threat-model
  3. Add typo-tolerant triggers for platform.ci-triage
- **Re-evaluation**:
  - Top-1 Accuracy: 96.8% ✓ (improved by 2.6%)
  - All thresholds met
  - No regressions
