---
id: security.network-scanning
name: Network Vulnerability Scanning
version: 1.0.0
domain: security
category: security.infrastructure-security
purpose: Scan network infrastructure for vulnerabilities, open ports, and misconfigurations.
summary: Network vulnerability scanning using port scanning, service detection, and vulnerability assessment to identify infrastructure security issues.
triggers:
  - identify network misconfigurations and exposed services
  - run nmap scan on production network
  - scan network for open ports and vulnerabilities
  - scan network for vulnerabilities
  - port scan infrastructure
  - network security assessment
  - check open ports and services
  - infrastructure vulnerability scan
  - network penetration test recon
  - firewall rule audit
aliases:
  - network scan
  - port scan
  - infra scan
negative_keywords:
  - application security
  - code review
  - dependency audit
inputs:
  - target_networks
  - ip_ranges
  - network_topology
  - firewall_rules
outputs:
  - open_ports_report
  - service_inventory
  - vulnerability_findings
  - network_risk_assessment
allowed_tools:
  - bash.exec
  - filesystem.write
  - web.search
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Scanning without authorization
  - Missing segmented network zones
  - Not identifying shadow IT services
  - Incomplete service version detection
verification:
  - All in-scope networks and IP ranges scanned
  - Open ports and services inventoried
  - Vulnerabilities validated and prioritized
  - Findings mapped to remediation actions
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Perform network vulnerability scanning to identify open ports, running services, and infrastructure vulnerabilities across network segments with proper authorization.

## When To Use
- During periodic infrastructure security assessments
- Before onboarding new network segments
- After network architecture changes
- For compliance requirements (PCI-DSS network scanning)
- During incident response to identify compromised services

## When Not To Use
- Without explicit written authorization from network owners
- For application-layer security testing (use dast-testing)
- When only checking container security (use container-scanning)
- For cloud-native service mesh security (use istio-config skill)

## Procedure
1. **Obtain Authorization and Define Scope**:
   - Get written authorization for network scanning
   - Define target IP ranges and network segments
   - Identify sensitive systems requiring careful scanning
   - Set scanning windows to minimize disruption

2. **Perform Port Scanning**:
   - Run TCP SYN scan on common ports (1-65535)
   - Run UDP scan on critical ports
   - Identify open, filtered, and closed ports
   - Document unexpected or unauthorized open ports

3. **Service Detection and Fingerprinting**:
   - Identify running services and versions
   - Detect operating systems
   - Map services to known vulnerabilities
   - Identify non-standard services on unusual ports

4. **Vulnerability Assessment**:
   - Run vulnerability scans (Nessus, OpenVAS, Qualys)
   - Check for known CVEs in detected service versions
   - Test for common misconfigurations
   - Check for default credentials on discovered services

5. **Analyze Network Segmentation**:
   - Verify network segmentation effectiveness
   - Test firewall rules between segments
   - Identify lateral movement paths
   - Check for overly permissive firewall rules

6. **Assess and Prioritize Findings**:
   - Score vulnerabilities by CVSS and network exposure
   - Prioritize internet-facing services
   - Consider business criticality of affected systems
   - Group findings by remediation approach

7. **Report and Remediate**:
   - Document all findings with evidence
   - Provide specific remediation steps
   - Recommend firewall rule changes
   - Schedule re-scan after remediation

## Tool Policy
- Use `bash.exec` to run nmap, masscan, or vulnerability scanners
- Use `web.search` for CVE details on discovered services
- Use `filesystem.write` to produce scan reports
- Never scan networks without explicit authorization

## Verification
- All authorized IP ranges scanned
- Open ports and services fully inventoried
- Vulnerabilities validated (no false positives in critical findings)
- Remediation plan with timelines delivered
- Re-scan confirms fixes

## Failure Modes
- Scanning without proper authorization
- Missing network segments due to incomplete scope
- Not scanning UDP ports (commonly missed)
- Ignoring internal network scanning
- Not updating scanner plugins before scanning

## Example Routes
- Scan 10.0.0.0/24 internal network for open ports
- Scan DMZ servers for internet-facing vulnerabilities
- Verify firewall rules between production and staging networks
- Check for unauthorized services on database servers

## Source Notes
- Nmap: https://nmap.org/
- Nessus: https://www.tenable.com/products/nessus
- CIS Network Security Controls
- Reference: ref.github.security.2026-05-31
