---
id: plan
name: Repository Onboarding Plan
version: 1.0.0
maps_to:
  kind: workflow
  ref: engineering.repo-onboarding
description: Build a high-level understanding of an unfamiliar repo before making changes.
---

# /plan

Build a high-level understanding of an unfamiliar repo before making changes.

## Usage

```
/plan
```

## Inputs
repo_path
- goal

## Outputs
architecture_overview
- key_modules
- risk_notes

## Workflow
Routes through `yes route` to activate the `engineering.repo-onboarding` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes
- This command is a shim over the `engineering.repo-onboarding` workflow.
- Run `yes route "plan" --dry-run` to inspect the routing before execution.
