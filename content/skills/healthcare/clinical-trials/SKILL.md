---
id: healthcare.clinical-trials
name: Clinical Trials Operations
version: 1.0.0
domain: healthcare
category: healthcare.research
purpose: Support clinical trial operations including protocol design, site management, data management, and regulatory submissions.
summary: Clinical trials operations covering protocol development, IRB submissions, site monitoring, EDC systems, and GCP compliance.
triggers:
  - clinical trial protocol
  - irb submission
  - site monitoring plan
  - edc system design
  - gcp compliance review
  - clinical study operations
aliases:
  - clinical trials
  - clinical research ops
negative_keywords:
  - basic science research
  - market research
  - software testing
inputs:
  - protocol_requirements
  - regulatory_framework
  - operational_plan
outputs:
  - protocol_design
  - regulatory_submission
  - monitoring_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Protocol lacks informed consent elements
  - Regulatory submission incomplete
  - Monitoring plan does not cover critical data
verification:
  - Informed consent elements present
  - Regulatory submission complete per ICH-GCP
  - Monitoring plan covers critical data and processes
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Halt trial activities if safety or compliance issues found
validators:
  - skill.validator
---

## Mission
Support clinical trial operations including protocol design, site management, data management, and regulatory submissions.

## When To Use
- When designing clinical trial protocols
- When preparing IRB and regulatory submissions
- When planning site monitoring activities
- When designing EDC and data management systems

## When Not To Use
- For basic science research (use research agents)
- For market research studies (use marketing agents)
- For software testing (use engineering agents)

## Procedure
1. **Design Protocol**:
   - Define study objectives, endpoints, and design
   - Specify inclusion/exclusion criteria
   - Design informed consent process

2. **Prepare Regulatory Submissions**:
   - Compile IRB application materials
   - Prepare FDA IND/IDE submissions if applicable
   - Address local and international requirements

3. **Plan Site Operations**:
   - Select and qualify study sites
   - Design site training materials
   - Create monitoring plans (risk-based monitoring)

4. **Design Data Management**:
   - Configure EDC system and case report forms
   - Design data validation and query management
   - Plan data lock and statistical analysis

5. **Ensure GCP Compliance**:
   - Apply ICH-GCP E6(R2) principles
   - Monitor protocol deviations
   - Maintain trial master file

## Tool Policy
- Use `filesystem.read` to review protocols and regulatory documents
- Use `filesystem.write` to produce trial documents and submissions

## Verification
- Informed consent elements present per ICH-GCP
- Regulatory submission complete for all required agencies
- Monitoring plan covers critical data and processes

## Failure Modes
- Protocol lacking required informed consent elements
- Regulatory submission incomplete or late
- Monitoring plan not covering critical data points

## Example Routes
- Phase III protocol design for oncology trial
- IRB submission package for multi-site study
- Risk-based monitoring plan for cardiovascular trial

## Source Notes
- ICH-GCP E6(R2): https://www.ich.org/page/good-clinical-practice-gcp
- FDA Clinical Trials: https://www.fda.gov/clinical-trials
- Reference: ref.github.healthcare.2026-05-31
