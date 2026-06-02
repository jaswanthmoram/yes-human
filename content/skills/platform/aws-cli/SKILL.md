---
id: platform.aws-cli
name: AWS CLI Command Patterns
version: 1.0.0
domain: platform
category: platform.cloud
description: Author and optimize AWS CLI commands for cloud resource management, automation, and troubleshooting.
triggers:
  - AWS CLI command patterns
  - manage AWS resources
  - AWS CLI automation
  - AWS service configuration
  - AWS CLI scripting
  - AWS resource troubleshooting
aliases:
  - aws commands
  - aws automation
  - aws cli scripting
negative_keywords:
  - gcloud
  - azure cli
  - terraform
  - AWS console only
inputs:
  - aws_region
  - service_type
  - resource_identifiers
  - iam_permissions
outputs:
  - aws_cli_commands
  - resource_status
  - automation_scripts
  - cost_estimates
allowed_tools:
  - shell.readonly (aws describe, list, get)
  - shell.write (aws create, update, delete)
  - filesystem.read (configs, scripts)
  - filesystem.write (scripts, configs)
required_skills: []
budget_band: micro
max_context_tokens: 4096
failure_modes:
  - Wrong region or profile
  - IAM permission denied
  - Resource not found errors
  - Destructive commands without confirmation
verification:
  - Commands validated with --dry-run where available
  - Output parsed and verified
  - No unintended resource mutations
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.terraform-modules (for IaC-managed resources)
  - platform.prometheus-alerts (for CloudWatch alerts)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.cloud-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Reverse AWS CLI commands or restore from backup
validators:
  - skill.validator
---

## Mission
Provide reliable AWS CLI command patterns for managing cloud resources, automation scripting, and operational tasks.

## When To Use
- Managing AWS resources via CLI
- Scripting AWS automation tasks
- Querying resource state and configurations
- Troubleshooting AWS service issues

## When Not To Use
- Infrastructure provisioning that should be IaC (use Terraform)
- One-time setup tasks (use AWS Console)
- Non-AWS cloud providers

## Procedure
1. **Configure Profile**: Set up AWS CLI profile with correct region and credentials
2. **Identify Resources**: Use `aws <service> describe-*` or `list-*` commands to inspect state
3. **Build Commands**: Construct commands with proper output formatting (`--output json/table/text`)
4. **Use JMESPath Queries**: Filter and transform output with `--query` parameter
5. **Validate Before Mutating**: Use `--dry-run` flags where available
6. **Execute and Verify**: Run commands and verify expected state changes
7. **Script Automation**: Chain commands into shell scripts with error handling

## Tool Policy
- Use named profiles, never default profile for production
- Prefer `--output json` for scripting, `--output table` for human reading
- Use `--query` with JMESPath to filter output
- Always specify `--region` explicitly

## Verification
- Resource state matches expected configuration
- No unexpected side effects from commands
- IAM permissions sufficient for all operations
- Output parsing produces correct results

## Failure Modes
- Operating in wrong AWS region
- Using default profile accidentally for production
- Missing IAM permissions for command execution
- Not handling pagination in list commands

## Example Routes
- "list all EC2 instances in us-east-1" → describe-instances with filters
- "create S3 bucket with encryption" → create-bucket + put-bucket-encryption
- "check Lambda function errors" → get-function + CloudWatch logs query

## Source Notes
Based on AWS CLI official documentation and cloud operations patterns. Referenced dossier: ref.github.platform.2026-05-31.
