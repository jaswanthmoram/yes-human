---
id: platform.azure-cli
name: Azure CLI Command Patterns
version: 1.0.0
domain: platform
category: platform.cloud
description: Author and optimize Azure CLI (az) commands for Azure resource management, automation, and troubleshooting.
triggers:
  - Azure CLI command patterns
  - manage Azure resources
  - az CLI automation
  - Azure service configuration
  - Azure CLI scripting
  - Azure resource troubleshooting
aliases:
  - az commands
  - azure cli
  - az automation
negative_keywords:
  - aws cli
  - gcloud
  - terraform
  - Azure portal only
inputs:
  - azure_subscription
  - resource_group
  - service_type
  - rbac_assignments
outputs:
  - az_cli_commands
  - resource_status
  - automation_scripts
  - configuration_output
allowed_tools:
  - shell.readonly (az show, list)
  - shell.write (az create, update, delete)
  - filesystem.read (configs, scripts)
  - filesystem.write (scripts, configs)
required_skills: []
budget_band: micro
max_context_tokens: 4096
failure_modes:
  - Wrong subscription or resource group
  - RBAC permission denied
  - Resource provider not registered
  - Location/region mismatches
verification:
  - Commands validated with --what-if where available
  - Output parsed and verified
  - No unintended resource mutations
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.terraform-modules (for IaC-managed resources)
  - platform.prometheus-alerts (for Azure Monitor alerts)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.cloud-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Reverse az commands or restore from backup
validators:
  - skill.validator
---

## Mission
Provide reliable Azure CLI command patterns for managing Azure resources, automation scripting, and operational tasks.

## When To Use
- Managing Azure resources via CLI
- Scripting Azure automation tasks
- Querying resource state and configurations
- Troubleshooting Azure service issues

## When Not To Use
- Infrastructure provisioning that should be IaC (use Terraform)
- One-time setup tasks (use Azure Portal)
- Non-Azure cloud providers

## Procedure
1. **Set Subscription**: Use `az account set --subscription <id>` for target subscription
2. **Identify Resources**: Use `az <service> list` and `az <service> show` commands
3. **Build Commands**: Construct commands with `--output json/table/tsv` for formatting
4. **Use JMESPath Queries**: Filter output with `--query` parameter
5. **Validate Before Mutating**: Use `--what-if` for ARM deployment previews
6. **Execute and Verify**: Run commands and verify expected state changes
7. **Script Automation**: Chain commands with proper error handling and `set -e`

## Tool Policy
- Use `--subscription` flag for cross-subscription operations
- Prefer `--output json` for scripting, `--output table` for human reading
- Use `--query` with JMESPath to filter output
- Always specify `--resource-group` for resource-scoped commands

## Verification
- Resource state matches expected configuration
- No unexpected side effects from commands
- RBAC permissions sufficient for all operations
- Output parsing produces correct results

## Failure Modes
- Operating in wrong Azure subscription
- Resource provider not registered for service
- Missing RBAC role assignments
- Location/region not matching resource group

## Example Routes
- "list all VMs in resource group" → az vm list with filters
- "create AKS cluster" → az aks create with node pool config
- "check Function App logs" → az webapp log tail

## Source Notes
Based on Azure CLI official documentation and Azure operations patterns. Referenced dossier: ref.github.platform.2026-05-31.
