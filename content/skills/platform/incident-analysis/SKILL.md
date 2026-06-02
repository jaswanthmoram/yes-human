---
id: platform.incident-analysis
name: Incident Postmortem and Analysis
version: 1.0.0
domain: platform
category: platform.incident-management
purpose: Conduct thorough incident postmortems to identify root causes and prevent recurrence.
summary: Systematic approach to analyzing incidents, documenting findings, and implementing preventive measures.
triggers:
  - incident postmortem
  - analyze incident
  - incident review
  - post-incident analysis
  - root cause analysis
activation_triggers:
  - postmortem
  - incident analysis
  - RCA
prerequisites:
  - incident resolved
  - access to incident data (logs, metrics, timeline)
inputs:
  - incident_timeline
  - logs_and_metrics
  - stakeholder_interviews (optional)
  - incident_impact
steps:
  - Gather all incident data (timeline, logs, metrics, communications)
  - Reconstruct detailed timeline of events
  - Identify contributing factors (not just root cause)
  - Perform root cause analysis (5 Whys, fishbone diagram)
  - Assess impact (users affected, duration, data loss)
  - Identify what went well and what could improve
  - Create action items to prevent recurrence
  - Write postmortem document
  - Share findings with team
  - Track action items to completion
outputs:
  - incident_timeline
  - root_cause_analysis
  - impact_assessment
  - lessons_learned
  - action_items
  - postmortem_document
tools:
  - filesystem.read (logs, metrics)
  - filesystem.write (postmortem document)
quality_gates:
  - Timeline is complete and accurate
  - Root cause identified (not just symptoms)
  - Action items are specific and actionable
  - Postmortem is blameless
  - Findings shared with team
failure_modes:
  - Blaming individuals instead of systems
  - Stopping at symptoms instead of root cause
  - Vague action items ("do better")
  - Not sharing findings
  - Not tracking action items to completion
handoffs:
  - platform.devops-engineer (for infrastructure improvements)
  - engineering.code-reviewer (for code fixes)
source_references:
  - ref.github.incident-postmortem-best-practices.2026-06-01
allowed_agents:
  - platform.incident-responder
  - platform.devops-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill after an incident has been resolved to conduct a postmortem and prevent recurrence.

## Prerequisites
- Incident has been resolved
- Access to incident data (logs, metrics, alerts, communications)
- Stakeholders available for interviews (optional)

## Steps
1. **Gather Incident Data**:
   - Collect all logs from the incident period
   - Gather metrics (error rates, latency, resource usage)
   - Collect alerts and notifications sent
   - Gather communications (Slack, email, status page updates)
   - Interview key participants (optional)
2. **Reconstruct Timeline**:
   - Create detailed minute-by-minute timeline
   - Include: detection, diagnosis, mitigation, resolution
   - Note who did what and when
   - Include automated actions (alerts, auto-scaling, etc.)
3. **Identify Contributing Factors**:
   - What conditions led to the incident?
   - What made it worse?
   - What made it better?
   - Consider: code, infrastructure, process, human factors
4. **Perform Root Cause Analysis**:
   - **5 Whys**: Ask "why" repeatedly to get to root cause
   - **Fishbone Diagram**: Categorize causes (people, process, technology, environment)
   - Distinguish between root cause and contributing factors
   - Focus on systems, not individuals (blameless)
5. **Assess Impact**:
   - Number of users affected
   - Duration of impact
   - Data loss or corruption (if any)
   - Financial impact (if applicable)
   - Reputational impact
6. **Identify Lessons Learned**:
   - **What went well**: Fast detection, effective mitigation, good communication
   - **What could improve**: Slow diagnosis, missing monitoring, unclear runbooks
   - **Surprises**: Unexpected behaviors, unknown dependencies
7. **Create Action Items**:
   - Specific, actionable tasks to prevent recurrence
   - Assign owners and deadlines
   - Prioritize by impact and effort
   - Include both short-term and long-term improvements
8. **Write Postmortem Document**:
   - Executive summary (what happened, impact, root cause)
   - Detailed timeline
   - Root cause analysis
   - Lessons learned
   - Action items with owners and deadlines
   - Appendices (logs, metrics, etc.)
9. **Share Findings**:
   - Present to engineering team
   - Share with stakeholders
   - Publish internally (wiki, blog)
   - Consider external publication (if appropriate)
10. **Track Action Items**:
    - Add to project management system
    - Review in team meetings
    - Verify completion
    - Measure effectiveness

## Verification
- Timeline is complete and accurate
- Root cause identified (not just symptoms)
- Action items are specific, actionable, and assigned
- Postmortem is blameless (focuses on systems)
- Findings shared with team
- Action items tracked to completion

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- **Blame culture**: Blaming individuals instead of systems
- **Surface-level analysis**: Stopping at symptoms instead of root cause
- **Vague action items**: "Improve monitoring" instead of "Add alert for X"
- **Not sharing**: Postmortem sits in a document no one reads
- **Not tracking**: Action items never completed
- **Rushing**: Not taking time to do thorough analysis

## Examples
### Postmortem for Database Outage
Input: 2-hour database outage affecting all users
Output:
- **Timeline**:
  - 14:00: Database CPU spikes to 100%
  - 14:05: Alert fires, on-call paged
  - 14:15: On-call identifies slow query
  - 14:30: Query killed, but database unresponsive
  - 14:45: Database restarted
  - 15:00: Database back online
  - 16:00: All services recovered
- **Root Cause**: Missing index on frequently queried column
- **Contributing Factors**:
  - No alert for high CPU
  - No runbook for database issues
  - Single database instance (no redundancy)
- **Impact**: 2 hours downtime, 10,000 users affected
- **Action Items**:
  1. Add missing index (owner: DBA, due: 1 week)
  2. Add CPU alert (owner: DevOps, due: 2 days)
  3. Create database runbook (owner: SRE, due: 2 weeks)
  4. Set up database replica (owner: DevOps, due: 1 month)
