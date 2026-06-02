---
id: healthcare.hipaa-compliance
name: HIPAA Compliance Review
version: 1.0.0
domain: healthcare
category: healthcare.compliance
purpose: Review systems, policies, and workflows for HIPAA Privacy Rule, Security Rule, and Breach Notification compliance.
summary: HIPAA compliance review covering Privacy Rule, Security Rule, Breach Notification, and Business Associate requirements.
triggers:
  - hipaa compliance review
  - hipaa security assessment
  - privacy rule check
  - breach notification review
  - business associate agreement review
  - phi handling audit
aliases:
  - hipaa review
  - hipaa audit
negative_keywords:
  - general data privacy
  - GDPR compliance
  - financial compliance
inputs:
  - system_or_policy
  - phi_data_flows
  - security_controls
outputs:
  - compliance_assessment
  - gap_analysis
  - remediation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Misses PHI in data flow analysis
  - Ignores Business Associate requirements
  - Overlooks state-specific privacy laws
verification:
  - All PHI data flows identified and assessed
  - Administrative, physical, and technical safeguards reviewed
  - Business Associate agreements validated
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert policy changes if compliance gaps are introduced
validators:
  - skill.validator
---

## Mission
Review systems, policies, and workflows for HIPAA Privacy Rule, Security Rule, and Breach Notification compliance.

## When To Use
- When reviewing systems that handle PHI
- When designing new healthcare data workflows
- When preparing for HIPAA audits
- When reviewing Business Associate Agreements

## When Not To Use
- For GDPR or international privacy compliance (different framework)
- For general corporate privacy policies without PHI
- For financial data compliance (use finance agents)

## Procedure
1. **Map PHI Data Flows**:
   - Identify all systems that create, receive, maintain, or transmit PHI
   - Document data flow diagrams with PHI touchpoints
   - Identify Business Associates and their PHI access

2. **Assess Privacy Rule Compliance**:
   - Review Notice of Privacy Practices
   - Validate minimum necessary standard
   - Check patient rights implementation (access, amendment, accounting)

3. **Assess Security Rule Compliance**:
   - Review administrative safeguards (risk analysis, training, policies)
   - Review physical safeguards (facility access, workstation security)
   - Review technical safeguards (access controls, audit logs, encryption)

4. **Validate Breach Notification Readiness**:
   - Review breach detection and reporting procedures
   - Validate notification timelines and content requirements
   - Test incident response procedures

5. **Produce Remediation Plan**:
   - Prioritize gaps by risk level
   - Provide implementation guidance for each gap
   - Define verification criteria for remediation

## Tool Policy
- Use `filesystem.read` to review policies, system configs, and data flow documentation
- Use `filesystem.write` to produce compliance assessments and remediation plans

## Verification
- All PHI data flows identified with appropriate safeguards
- Administrative, physical, and technical safeguards assessed
- Business Associate agreements reviewed and validated

## Failure Modes
- Missing PHI in data flow analysis
- Ignoring Business Associate requirements
- Overlooking state-specific privacy laws that exceed HIPAA

## Example Routes
- HIPAA Security Rule assessment for new telehealth platform
- Privacy Rule review of patient portal data sharing
- Breach notification procedure validation

## Source Notes
- HHS HIPAA: https://www.hhs.gov/hipaa/
- NIST SP 800-66: Implementing HIPAA Security Rule
- Reference: ref.github.healthcare.2026-05-31
