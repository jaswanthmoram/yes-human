---
id: sales.crm-management
name: CRM Management Framework
version: 1.0.0
domain: sales
category: sales.operations
purpose: Design CRM workflows, data models, and reporting structures that support sales team productivity and pipeline visibility.
summary: CRM configuration, data model design, workflow automation, and reporting setup for sales organizations.
triggers:
  - create CRM reporting structure for VP of Sales
  - audit CRM configuration for data quality issues
  - design CRM workflow
  - CRM data model review
  - CRM automation setup
  - CRM reporting design
  - CRM configuration audit
  - pipeline stage definition
aliases:
  - CRM management
  - CRM admin
  - CRM setup
negative_keywords:
  - CRM software development
  - database migration
  - IT system administration
inputs:
  - sales_process
  - data_requirements
  - reporting_needs
outputs:
  - crm_configuration
  - workflow_design
  - reporting_structure
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Configures CRM without mapping to sales process
  - Creates fields without defining data entry requirements
  - Skips reporting requirements in configuration
verification:
  - CRM maps to defined sales process
  - Data entry requirements specified
  - Reporting structure addresses leadership needs
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design CRM workflows, data models, and reporting structures that support sales team productivity and pipeline visibility.

## When To Use
- Setting up or reconfiguring a CRM for a sales team
- Designing CRM workflows for new sales processes
- Auditing CRM configuration for data quality
- Creating CRM reporting structures for leadership

## When Not To Use
- CRM software development belongs to engineering
- Database migration belongs to platform
- IT system administration belongs to platform

## Procedure
1. Map the sales process to CRM stages and workflows.
2. Define the data model with required and optional fields.
3. Design automation rules for data entry and routing.
4. Configure reporting structures for leadership visibility.
5. Define data quality rules and validation criteria.
6. Document configuration for ongoing maintenance.

## Tool Policy
- Use `filesystem.read` to access sales process documentation and CRM exports.
- Use `filesystem.write` to save configuration designs and workflow maps.

## Verification
- CRM stages map to defined sales process
- Data model includes required fields with validation rules
- Reporting structure addresses leadership dashboard needs

## Failure Modes
- Building CRM without mapping to actual sales process
- Adding fields without defining who enters and maintains data
- Skipping reporting requirements until after configuration

## Example Routes
- "design CRM workflow for enterprise sales process"
- "audit CRM configuration for data quality issues"
- "create CRM reporting structure for VP of Sales"

## Source Notes
- Twenty CRM open-source patterns
- Reference: ref.github.sales.2026-05-31
