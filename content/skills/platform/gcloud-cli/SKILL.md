---
id: platform.gcloud-cli
name: GCloud CLI Command Patterns
version: 1.0.0
domain: platform
category: platform.cloud
description: Author and optimize gcloud CLI commands for GCP resource management, automation, and troubleshooting.
triggers:
  - gcloud CLI command patterns
  - manage GCP resources
  - gcloud automation
  - Google Cloud CLI scripting
  - GCP service configuration
  - gcloud resource troubleshooting
aliases:
  - gcloud commands
  - gcp cli
  - google cloud cli
negative_keywords:
  - aws cli
  - azure cli
  - terraform
  - GCP console only
inputs:
  - gcp_project
  - service_type
  - resource_identifiers
  - iam_bindings
outputs:
  - gcloud_commands
  - resource_status
  - automation_scripts
  - configuration_output
allowed_tools:
  - shell.readonly (gcloud describe, list)
  - shell.write (gcloud create, update, delete)
  - filesystem.read (configs, scripts)
  - filesystem.write (scripts, configs)
required_skills: []
budget_band: micro
max_context_tokens: 4096
failure_modes:
  - Wrong project or configuration
  - IAM permission denied
  - API not enabled for service
  - Resource quota exceeded
verification:
  - Commands validated with --dry-run where available
  - Output parsed and verified
  - No unintended resource mutations
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.terraform-modules (for IaC-managed resources)
  - platform.prometheus-alerts (for Cloud Monitoring alerts)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.cloud-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Reverse gcloud commands or restore from backup
validators:
  - skill.validator
---

## Mission
Provide reliable gcloud CLI command patterns for managing GCP resources, automation scripting, and operational tasks.

## When To Use
- Managing GCP resources via CLI
- Scripting GCP automation tasks
- Querying resource state and configurations
- Troubleshooting GCP service issues

## When Not To Use
- Infrastructure provisioning that should be IaC (use Terraform)
- One-time setup tasks (use GCP Console)
- Non-GCP cloud providers

## Procedure
1. **Configure Project**: Set active project with `gcloud config set project <id>`
2. **Enable APIs**: Ensure required APIs are enabled with `gcloud services enable`
3. **Identify Resources**: Use `gcloud <service> list` and `describe` commands
4. **Build Commands**: Construct commands with proper `--format` for output control
5. **Use Filters**: Apply `--filter` expressions to narrow results
6. **Validate Before Mutating**: Use `--dry-run` flags where available
7. **Execute and Verify**: Run commands and verify expected state changes

## Tool Policy
- Use `--project` flag explicitly for cross-project operations
- Prefer `--format=json` for scripting, `--format=table` for human reading
- Use `--filter` to narrow list results
- Enable only required APIs to reduce attack surface

## Verification
- Resource state matches expected configuration
- No unexpected side effects from commands
- IAM permissions sufficient for all operations
- API quotas not exceeded

## Failure Modes
- Operating in wrong GCP project
- Required API not enabled
- Missing IAM roles for command execution
- Not handling paginated results

## Example Routes
- "list all GKE clusters" → gcloud container clusters list
- "create Cloud Run service" → gcloud run deploy with flags
- "check Cloud Function logs" → gcloud functions logs read

## Source Notes
Based on Google Cloud CLI official documentation and GCP operations patterns. Referenced dossier: ref.github.platform.2026-05-31.
