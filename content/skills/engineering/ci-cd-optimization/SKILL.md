---
id: engineering.ci-cd-optimization
name: CI/CD Pipeline Optimization
version: 1.0.0
domain: engineering
category: engineering.devops
purpose: Optimize CI/CD pipelines for speed, reliability, and cost efficiency through caching, parallelism, and smart job orchestration.
summary: Systematic approach to diagnosing slow pipelines and applying optimizations like caching, parallelization, conditional jobs, and artifact reuse.
triggers:
  - optimize the GitHub Actions workflow
  - CI is slow
  - optimize pipeline
  - speed up builds
  - CI/CD optimization
  - reduce build time
  - pipeline caching
  - parallel jobs
aliases:
  - CI optimization
  - pipeline speed
  - build optimization
negative_keywords:
  - deployment strategy
  - rollback
  - incident response
inputs:
  - ci_platform (github_actions, gitlab_ci, circleci, jenkins)
  - current_pipeline_config
  - average_build_time
  - target_build_time (optional)
outputs:
  - optimized_pipeline_config
  - performance_improvements
  - caching_strategy
  - cost_analysis
allowed_tools:
  - shell.readonly (analyze pipeline logs, measure timings)
  - filesystem.read (read pipeline configs)
  - filesystem.write (update pipeline configs)
required_skills:
  - engineering.git-workflow
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Cache corruption causing non-deterministic builds
  - Over-parallelization causing resource contention
  - Conditional jobs skipping critical steps
  - Artifact expiration causing downstream failures
verification:
  - Pipeline completes within target build time
  - All tests pass with optimized configuration
  - Cache hit rate is above 70% for stable branches
  - No flaky tests introduced by parallelization
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert pipeline configuration via version control
validators:
  - skill.validator
---

## Mission
Reduce CI/CD pipeline execution time and cost while maintaining or improving reliability, test coverage, and deployment safety.

## When To Use
- Pipeline execution time exceeds acceptable thresholds
- CI costs are growing disproportionately with team size
- Builds are frequently timing out or queuing
- Team productivity is blocked by slow feedback loops from CI
- Preparing for increased PR volume or team growth

## When Not To Use
- Pipeline is already fast enough for team needs
- The bottleneck is test execution time that cannot be parallelized
- Build failures are caused by code issues, not pipeline configuration
- The team has no CI/CD pipeline yet (set one up first)

## Procedure
1. **Profile Current Pipeline**: Measure each job's duration, identify the longest-running steps, and map the dependency graph between jobs.
2. **Implement Caching**:
   - Dependency caches: `node_modules`, `pip`, `go mod` caches
   - Build caches: compiled artifacts, incremental build outputs
   - Docker layer caching for container builds
   - Platform-specific cache keys with fallback chains
3. **Enable Parallelism**:
   - Run independent jobs concurrently (lint, test, build in parallel)
   - Split test suites across parallel runners (sharding)
   - Use matrix builds for multi-platform/multi-version testing
4. **Optimize Job Ordering**:
   - Run fast-failing checks first (lint, type-check) before expensive builds
   - Use conditional jobs to skip unnecessary steps (e.g., skip deploy on docs-only changes)
   - Implement path-based filtering to build only affected components
5. **Reduce Overhead**:
   - Use smaller runner images or custom Docker images with pre-installed tools
   - Minimize checkout depth (shallow clones for CI)
   - Reduce artifact upload/download sizes
6. **Monitor and Iterate**: Track pipeline metrics (duration, queue time, cache hit rate, failure rate) and set up alerts for regressions.
7. **Document Optimizations**: Maintain a runbook of pipeline optimizations with before/after metrics.

## Tool Policy
- Use `shell.readonly` for analyzing pipeline logs and measuring timings
- Use `filesystem.read` to inspect current pipeline configurations
- Use `filesystem.write` to update pipeline configuration files
- Always test pipeline changes on a branch before merging to main

## Verification
- Optimized pipeline completes all required checks
- Build time is measurably reduced (compare before/after metrics)
- Cache hit rate is tracked and above target threshold
- No increase in flaky test rate after parallelization

## Failure Modes
- **Cache poisoning**: Corrupted cache causes builds to pass locally but fail in CI. Mitigation: use content-addressable cache keys and periodic cache invalidation.
- **Race conditions**: Parallel jobs writing to shared resources. Mitigation: use job isolation, separate workspaces, or resource locks.
- **Skipped critical steps**: Conditional logic accidentally skips required checks. Mitigation: use required status checks in branch protection.
- **Flaky parallel tests**: Tests that share state fail when run in parallel. Mitigation: identify and isolate stateful tests, run them sequentially.

## Example Routes
- "our GitHub Actions pipeline takes 25 minutes" -> Cache dependencies, parallelize lint/test/build, use path filters
- "CI costs are too high" -> Reduce runner minutes with caching, smaller images, and conditional jobs
- "builds keep timing out" -> Split large test suites, use sharding, increase timeout with root cause analysis

## Source Notes
- Based on GitHub Actions, GitLab CI, and CircleCI optimization documentation
- Patterns from high-throughput engineering teams' CI/CD playbooks
- Reference: ref.github.engineering.2026-05-31
