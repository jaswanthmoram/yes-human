---
id: security-scan
name: Repository Security Scan
version: 1.0.0
maps_to:
  kind: workflow
  ref: security.repo-risk-scan
description: Run a full security risk scan across the repository.
---

# /security-scan

Run a full security risk scan across the repository.

## Usage

```
/security-scan
```

## Inputs

source_code

## Outputs

security_report

- risk_summary

## Workflow

Routes through `yes route` to activate the `security.repo-risk-scan` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes

- This command is a shim over the `security.repo-risk-scan` workflow.
- Run `yes route "security-scan" --dry-run` to inspect the routing before execution.
