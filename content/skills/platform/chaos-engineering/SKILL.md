---
id: platform.chaos-engineering
name: Chaos Engineering Practices
version: 1.0.0
domain: platform
category: platform.reliability
description: Design and execute chaos engineering experiments to validate system resilience and identify failure points.
triggers:
  - chaos engineering practices
  - chaos experiment design
  - fault injection testing
  - resilience testing
  - chaos monkey setup
  - gameday planning
  - failure mode validation
aliases:
  - chaos testing
  - fault injection
  - resilience experiments
negative_keywords:
  - load testing
  - penetration testing
  - unit testing
  - production incidents
inputs:
  - system_architecture
  - failure_hypotheses
  - blast_radius
  - rollback_procedures
outputs:
  - experiment_plan
  - experiment_results
  - resilience_report
  - remediation_actions
allowed_tools:
  - shell.readonly (monitoring queries, status checks)
  - shell.write (fault injection tools)
  - filesystem.read (experiment plans)
  - filesystem.write (experiment reports)
required_skills:
  - platform.observability-setup
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Blast radius too large (experiment causes real outage)
  - Missing abort conditions
  - Not monitoring during experiment
  - No rollback procedure ready
verification:
  - Experiment abort conditions tested
  - Monitoring confirms system behavior
  - Results documented and actionable
  - No unintended production impact
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.incident-analysis (if experiment reveals real issues)
  - platform.prometheus-alerts (for monitoring during experiments)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.reliability-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Abort experiment immediately
  - Restore system to pre-experiment state
validators:
  - skill.validator
---

## Mission
Provide patterns for designing and executing controlled chaos experiments that validate system resilience without causing real outages.

## When To Use
- Validating system resilience to specific failure modes
- Testing failover and recovery procedures
- Running gamedays for on-call team readiness
- Identifying hidden dependencies and single points of failure

## When Not To Use
- Load or performance testing (use dedicated load testing tools)
- Security penetration testing
- When system is already unstable or during incidents
- Without proper monitoring and abort mechanisms

## Procedure
1. **Define Hypothesis**: State expected system behavior under failure (e.g., "service X should failover within 30s")
2. **Assess Blast Radius**: Determine scope of experiment and potential impact
3. **Set Abort Conditions**: Define metrics thresholds that trigger automatic experiment termination
4. **Prepare Monitoring**: Ensure dashboards and alerts are active for affected services
5. **Execute Experiment**: Inject fault (kill pod, add latency, sever network) with controlled scope
6. **Observe and Record**: Monitor system behavior, record metrics and timeline
7. **Analyze and Remediate**: Compare results to hypothesis, create action items for gaps

## Tool Policy
- Start with smallest blast radius (single pod, single instance)
- Always have abort mechanism ready before starting
- Use established tools: Litmus, Chaos Mesh, Gremlin, AWS FIS
- Run experiments during business hours with team available

## Verification
- System behavior matches hypothesis or gaps are documented
- Abort conditions tested and functional
- No lasting production impact after experiment
- Action items created for discovered weaknesses

## Failure Modes
- Experiment scope too broad causing real outage
- Abort conditions not defined or not working
- Team not available during experiment
- Not documenting results and learnings

## Example Routes
- "kill random pod in staging" → Chaos Mesh pod-kill experiment
- "add network latency to service" → traffic control experiment
- "test database failover" → controlled primary termination

## Source Notes
Based on Principles of Chaos Engineering and production chaos experiment patterns. Referenced dossier: ref.github.platform.2026-05-31.
