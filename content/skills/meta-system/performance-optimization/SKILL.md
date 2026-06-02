---
id: meta-system.performance-optimization
name: Performance Optimization and Tuning
version: 1.0.0
domain: meta-system
category: meta-system.optimization
purpose: Optimize system performance through token budget management, route table compression, and registry pruning.
summary: Systematic approach to optimizing yes-human system performance while maintaining functionality.
triggers:
  - optimize boot performance
  - reduce token usage
  - compress route table
  - prune registry entries
  - performance tuning pass
activation_triggers:
  - performance optimization
  - token reduction
  - route table compression
prerequisites:
  - system metrics available
  - baseline performance measured
  - optimization targets identified
inputs:
  - system_metrics
  - baseline_performance
  - optimization_targets
steps:
  - Measure current performance baseline
  - Identify optimization opportunities
  - Prioritize by impact and effort
  - Design boot token reduction plan
  - Plan route table compression
  - Design registry pruning strategy
  - Implement optimizations
  - Measure post-optimization performance
  - Compare to baseline
  - Document results
outputs:
  - optimization_plan
  - performance_comparison
  - implementation_log
  - results_documentation
tools:
  - filesystem.read (read metrics and registry data)
  - shell.readonly (run performance measurement scripts)
quality_gates:
  - Baseline measured before changes
  - Optimizations prioritized by impact
  - Post-optimization metrics collected
  - No functionality regression
  - Results documented
failure_modes:
  - Optimizing without baseline measurement
  - Removing entries without impact analysis
  - Ignoring functionality regression
  - Not measuring post-optimization
  - Undocumented changes
handoffs:
  - meta-system.system-optimizer (for optimization review)
  - meta-system.quality-assurance (for regression checks)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.system-optimizer
  - meta-system.quality-assurance
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert optimization changes
  - Restore previous performance state
validators:
  - skill.validator
---

## Trigger
Use this skill when optimizing boot performance, reducing token usage, or tuning system performance.

## Prerequisites
- System metrics available
- Baseline performance measured
- Optimization targets identified

## Steps
1. **Measure Baseline**: Record current performance metrics before any changes.
2. **Identify Opportunities**: Find areas where optimization can improve performance.
3. **Prioritize**: Rank opportunities by impact and effort.
4. **Design Token Reduction**: Plan how to reduce boot token usage.
5. **Plan Compression**: Design route table compression strategy.
6. **Design Pruning**: Plan which registry entries can be pruned.
7. **Implement**: Apply optimizations one at a time.
8. **Measure Post**: Collect performance metrics after optimization.
9. **Compare**: Compare post-optimization metrics to baseline.
10. **Document**: Record all changes and results.

## Verification
- All quality gates passed
- Baseline measured before changes
- No functionality regression
- Results documented

## Common Failures
- Optimizing without measuring baseline first
- Removing entries without impact analysis
- Not checking for functionality regression

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
