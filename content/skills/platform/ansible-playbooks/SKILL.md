---
id: platform.ansible-playbooks
name: Ansible Playbook Patterns
version: 1.0.0
domain: platform
category: platform.configuration-management
description: Design and implement Ansible playbooks for configuration management, application deployment, and infrastructure automation.
triggers:
  - Ansible playbook patterns
  - write Ansible playbook
  - Ansible role development
  - configuration management with Ansible
  - Ansible inventory management
  - Ansible automation workflows
aliases:
  - ansible automation
  - config management
  - ansible roles
negative_keywords:
  - terraform
  - kubernetes deployment
  - docker-compose
  - cloud provisioning
inputs:
  - target_hosts
  - desired_state
  - inventory_config
  - role_dependencies
outputs:
  - ansible_playbook
  - ansible_roles
  - inventory_file
  - execution_report
allowed_tools:
  - shell.readonly (ansible-playbook --check)
  - shell.write (ansible-playbook)
  - filesystem.read (playbooks, inventory)
  - filesystem.write (playbooks, roles)
required_skills: []
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Playbook not idempotent
  - Inventory misconfiguration
  - Missing privilege escalation
  - Handler not triggered
verification:
  - ansible-playbook --check passes
  - Playbook is idempotent on second run
  - All handlers execute correctly
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.terraform-modules (for infrastructure provisioning)
  - platform.docker-compose (for local dev environments)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.configuration-manager
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Reverse playbook or restore from backup
validators:
  - skill.validator
---

## Mission
Provide patterns for writing idempotent, maintainable Ansible playbooks and roles for configuration management and automation.

## When To Use
- Server configuration and hardening
- Application deployment to VMs or bare metal
- Package installation and service management
- Multi-tier infrastructure automation

## When Not To Use
- Infrastructure provisioning (use Terraform)
- Kubernetes workload management (use kubectl/Helm)
- Container orchestration (use docker-compose)

## Procedure
1. **Define Inventory**: Create host inventory with groups, variables, and connection settings
2. **Design Roles**: Structure tasks into reusable roles with defaults, handlers, and templates
3. **Write Playbooks**: Compose plays targeting host groups with role assignments
4. **Ensure Idempotency**: Use modules that check state before making changes
5. **Add Handlers**: Define handlers for service restarts and deferred actions
6. **Test with Check Mode**: Run `ansible-playbook --check` for dry-run validation
7. **Execute and Verify**: Run playbook and verify desired state on target hosts

## Tool Policy
- Always test with `--check` mode before production runs
- Use `--diff` to review changes before applying
- Vault-encrypt sensitive variables
- Pin collection and role versions in requirements.yml

## Verification
- `ansible-playbook --check` shows no unexpected changes
- Second run reports zero changes (idempotent)
- Target services running and healthy
- Configuration matches desired state

## Failure Modes
- Playbook not idempotent (changes on every run)
- Missing `become: yes` for privileged operations
- Handlers not notified after config changes
- Inventory pointing to wrong hosts

## Example Routes
- "harden Linux server with Ansible" → security role with SSH, firewall, users
- "deploy application with Ansible" → app role with dependencies, config, service
- "manage multi-env inventory" → group_vars and host_vars structure

## Source Notes
Based on Ansible official documentation and production playbook patterns. Referenced dossier: ref.github.platform.2026-05-31.
