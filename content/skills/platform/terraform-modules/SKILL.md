---
id: platform.terraform-modules
name: Terraform Module Design
version: 1.0.0
domain: platform
category: platform.infrastructure
description: Design, implement, and maintain reusable Terraform modules for infrastructure provisioning.
triggers:
  - refactor monolithic terraform into modules
  - Terraform module design
  - create Terraform module
  - infrastructure as code patterns
  - Terraform state management
  - Terraform module refactoring
  - Terraform provider configuration
aliases:
  - IaC modules
  - terraform config
  - HCL module
negative_keywords:
  - ansible playbook
  - kubernetes manifest
  - cloud console
  - manual provisioning
inputs:
  - infrastructure_requirements
  - cloud_provider
  - networking_topology
  - compliance_constraints
outputs:
  - terraform_module
  - module_documentation
  - state_configuration
  - example_usage
allowed_tools:
  - shell.readonly (terraform plan, validate)
  - shell.write (terraform apply, destroy)
  - filesystem.read (tf files)
  - filesystem.write (module files)
required_skills: []
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - State drift from manual changes
  - Module interface breaking changes
  - Missing variable validation
  - Hardcoded values instead of variables
verification:
  - terraform validate passes
  - terraform plan shows expected changes
  - No state lock conflicts
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.aws-cli (for AWS-specific resources)
  - platform.gcloud-cli (for GCP-specific resources)
  - platform.azure-cli (for Azure-specific resources)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.infrastructure-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - terraform apply -refresh-only to reconcile state
  - terraform destroy for resource removal
validators:
  - skill.validator
---

## Mission
Provide patterns for designing reusable, maintainable Terraform modules that provision infrastructure safely and consistently.

## When To Use
- Creating reusable infrastructure modules
- Standardizing resource provisioning across teams
- Implementing infrastructure guardrails and policies
- Managing multi-environment infrastructure

## When Not To Use
- One-off resource creation (use cloud CLI directly)
- Configuration management (use Ansible)
- Application deployment (use Helm or kubectl)

## Procedure
1. **Define Module Interface**: Design variables with types, descriptions, defaults, and validation rules
2. **Structure Module**: Create main.tf, variables.tf, outputs.tf, and versions.tf files
3. **Implement Resources**: Write resource blocks with proper lifecycle rules and dependencies
4. **Add Data Sources**: Use data sources for lookups instead of hardcoded values
5. **Configure State**: Set up remote state backend with locking (S3+DynamoDB, GCS, etc.)
6. **Write Examples**: Create example configurations showing module usage
7. **Validate and Plan**: Run `terraform validate` and `terraform plan` before applying

## Tool Policy
- Always run `terraform plan` before `terraform apply`
- Use `terraform fmt` and `terraform validate` in CI
- Never manually edit state files
- Pin provider versions in versions.tf

## Verification
- `terraform validate` passes
- `terraform plan` shows only expected changes
- State file matches actual infrastructure
- Module examples deploy successfully

## Failure Modes
- State drift from out-of-band changes
- Breaking module interface changes without migration
- Missing variable validation allowing invalid configs
- Not handling resource dependencies explicitly

## Example Routes
- "create VPC module for AWS" → module with subnets, route tables, NAT gateways
- "refactor monolithic terraform into modules" → extract and compose pattern
- "add validation to module variables" → variable validation blocks

## Source Notes
Based on HashiCorp Terraform documentation and module registry patterns. Referenced dossier: ref.github.platform.2026-05-31.
