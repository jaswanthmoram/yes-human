---
id: meta-system.debugging-techniques
name: Debugging Techniques and Methodologies
version: 1.0.0
domain: meta-system
category: meta-system.reliability
purpose: Apply systematic debugging techniques to diagnose issues in agents, skills, and workflows.
summary: Systematic approach to debugging yes-human system issues using proven methodologies.
triggers:
  - debug agent issue
  - diagnose skill failure
  - troubleshoot workflow error
  - systematic debugging
  - root cause analysis
activation_triggers:
  - debugging session
  - issue diagnosis
  - root cause analysis
prerequisites:
  - issue reproducible or described
  - system logs available
  - debugging tools accessible
inputs:
  - issue_description
  - system_logs
  - debugging_tools
steps:
  - Reproduce or clarify the issue
  - Gather relevant logs and metrics
  - Form initial hypotheses
  - Design tests to validate hypotheses
  - Execute diagnostic tests
  - Narrow down root cause
  - Verify root cause with evidence
  - Design fix or workaround
  - Implement and test fix
  - Document findings and resolution
outputs:
  - root_cause_analysis
  - diagnostic_test_results
  - fix_or_workaround
  - debugging_documentation
tools:
  - filesystem.read (read logs and artifacts)
  - shell.readonly (run diagnostic commands)
quality_gates:
  - Issue reproduced or clarified
  - Hypotheses tested systematically
  - Root cause verified with evidence
  - Fix tested and working
  - Findings documented
failure_modes:
  - Jumping to conclusions without evidence
  - Not reproducing the issue
  - Skipping hypothesis testing
  - Fixing symptoms not root cause
  - Undocumented findings
handoffs:
  - meta-system.error-handling (for error handling improvements)
  - meta-system.logging-strategies (for logging improvements)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.quality-assurance
  - meta-system.system-architect
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert debugging changes
  - Restore system to pre-debug state
validators:
  - skill.validator
---

## Trigger
Use this skill when debugging agent issues, diagnosing skill failures, or troubleshooting workflow errors.

## Prerequisites
- Issue reproducible or described
- System logs available
- Debugging tools accessible

## Steps
1. **Reproduce Issue**: Reproduce the issue or clarify its description.
2. **Gather Data**: Collect relevant logs, metrics, and artifacts.
3. **Form Hypotheses**: Generate possible explanations for the issue.
4. **Design Tests**: Create tests to validate or invalidate each hypothesis.
5. **Execute Tests**: Run diagnostic tests systematically.
6. **Narrow Cause**: Eliminate hypotheses based on test results.
7. **Verify Root Cause**: Confirm root cause with evidence.
8. **Design Fix**: Create a fix or workaround for the root cause.
9. **Test Fix**: Implement and verify the fix resolves the issue.
10. **Document**: Record findings, root cause, and resolution.

## Verification
- All quality gates passed
- Root cause verified with evidence
- Fix tested and working
- Findings documented

## Common Failures
- Jumping to conclusions without evidence
- Not reproducing the issue first
- Fixing symptoms instead of root cause
