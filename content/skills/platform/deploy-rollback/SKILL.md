---
id: platform.deploy-rollback
name: Safe Deployment Rollback
version: 1.0.0
domain: platform
category: platform.release-engineering
purpose: Safely rollback failed deployments while minimizing downtime and data loss.
summary: Systematic approach to rolling back deployments including verification, data considerations, and communication.
triggers:
  - rollback deployment
  - revert deployment
  - deployment failed
  - undo release
  - emergency rollback
activation_triggers:
  - rollback
  - revert release
  - undo deploy
prerequisites:
  - access to deployment system
  - rollback procedure documented
  - backup or previous version available
inputs:
  - current_deployment
  - previous_stable_version
  - rollback_reason
  - data_changes_since_deploy (optional)
steps:
  - Verify rollback is necessary (check monitoring, logs, user reports)
  - Identify the last known good version
  - Check for data migrations or changes since deployment
  - Prepare rollback plan (steps, timing, communication)
  - Notify stakeholders of rollback
  - Execute rollback procedure
  - Verify rollback success
  - Monitor for issues post-rollback
  - Document rollback and root cause
outputs:
  - rollback_plan
  - rollback_execution_log
  - verification_results
  - post_rollback_report
tools:
  - shell.readonly (check status, logs)
  - shell.write (execute rollback commands)
  - filesystem.read (configs, logs)
quality_gates:
  - Rollback reason verified
  - Data impact assessed
  - Rollback successful
  - System stable post-rollback
failure_modes:
  - Rolling back without verifying it's necessary
  - Not considering data migrations
  - Incomplete rollback (partial state)
  - Not monitoring after rollback
  - Not documenting root cause
handoffs:
  - platform.incident-responder (if rollback due to incident)
  - platform.devops-engineer (for infrastructure rollback)
source_references:
  - ref.github.deployment-rollback-best-practices.2026-06-01
allowed_agents:
  - platform.release-manager
  - platform.devops-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Re-deploy the rolled-back version if rollback itself failed
validators:
  - skill.validator
---

## Trigger
Use this skill when a deployment has failed and needs to be rolled back to a previous stable version.

## Prerequisites
- Access to deployment system (Kubernetes, AWS, etc.)
- Previous stable version identified
- Rollback procedure documented
- Monitoring in place to verify rollback

## Steps
1. **Verify Rollback is Necessary**:
   - Check monitoring dashboards (error rates, latency, etc.)
   - Review application logs for errors
   - Check user reports or support tickets
   - Confirm the issue is deployment-related, not infrastructure
2. **Identify Last Known Good Version**:
   - Check deployment history
   - Identify the last version that was stable
   - Verify that version's artifacts are still available
3. **Assess Data Impact**:
   - Check if any database migrations ran since deployment
   - Identify any data changes that might conflict with rollback
   - Determine if data rollback is needed (rare, high-risk)
   - Plan for data compatibility with old version
4. **Prepare Rollback Plan**:
   - Document exact rollback steps
   - Estimate downtime
   - Identify rollback window (low-traffic period if possible)
   - Prepare communication plan
5. **Notify Stakeholders**:
   - Alert on-call team
   - Notify product/engineering leads
   - Update status page if customer-facing
   - Set expectations for downtime
6. **Execute Rollback**:
   - Follow documented rollback procedure
   - Use deployment system's rollback feature if available
   - Or manually deploy previous version
   - Monitor progress during rollback
7. **Verify Rollback Success**:
   - Check monitoring returns to normal
   - Verify application logs show no errors
   - Test critical user flows
   - Confirm data integrity
8. **Monitor Post-Rollback**:
   - Watch for delayed issues
   - Monitor for increased error rates
   - Check for performance degradation
   - Verify all services are healthy
9. **Document**:
   - Record rollback reason and timeline
   - Document root cause of failed deployment
   - Update runbook with lessons learned
   - Create post-mortem if significant impact

## Verification
- Monitoring metrics return to baseline
- No errors in application logs
- Critical user flows work correctly
- Data integrity verified
- All services healthy

## Rollback (of the rollback)
- If rollback itself fails, re-deploy the failed version
- Investigate why rollback failed
- Consider manual intervention or infrastructure reset

## Common Failures
- Rolling back without verifying it's necessary (issue might be elsewhere)
- Not checking for data migrations (old code with new schema)
- Incomplete rollback (some services rolled back, others not)
- Not monitoring after rollback (delayed issues)
- Not documenting root cause (same issue will recur)

## Examples
### Rolling Back a Failed Kubernetes Deployment
Input: New deployment causing 500 errors
Output:
- Verification: Error rate spiked from 0.1% to 15% after deployment
- Last good version: v1.2.3 (deployed 2 days ago, stable)
- Data impact: No migrations, safe to rollback
- Rollback plan: `kubectl rollout undo deployment/app`
- Execution: Rolled back at 14:30 UTC
- Verification: Error rate returned to 0.1% within 2 minutes
- Monitoring: Stable for 30 minutes post-rollback
- Documentation: Root cause was memory leak in new caching logic
