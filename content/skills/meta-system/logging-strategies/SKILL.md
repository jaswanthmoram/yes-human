---
id: meta-system.logging-strategies
name: Logging Strategy Design and Implementation
version: 1.0.0
domain: meta-system
category: meta-system.operations
purpose: Design logging strategies for agents, skills, and workflows ensuring observability and debuggability.
summary: Systematic approach to designing logging that provides sufficient observability without excessive token cost.
triggers:
  - design logging strategy
  - logging review
  - observability planning
  - log format design
  - debug logging setup
activation_triggers:
  - logging strategy design
  - observability planning
  - log format review
prerequisites:
  - target components identified
  - observability requirements defined
  - log storage configured
inputs:
  - target_components
  - observability_requirements
  - log_storage_config
steps:
  - Identify components needing logging
  - Define observability requirements
  - Design log levels and categories
  - Specify log format and structure
  - Design correlation IDs for tracing
  - Plan log retention and rotation
  - Design debug logging modes
  - Implement logging patterns
  - Test log output quality
  - Document logging standards
outputs:
  - logging_specification
  - log_format_definition
  - observability_plan
  - logging_standards_documentation
tools:
  - filesystem.read (read component definitions)
quality_gates:
  - All components covered
  - Log levels defined
  - Format standardized
  - Correlation IDs designed
  - Standards documented
failure_modes:
  - Logging without observability requirements
  - Inconsistent log formats
  - Missing correlation IDs
  - Excessive logging increasing token cost
  - Undocumented standards
handoffs:
  - meta-system.system-monitoring (for monitoring integration)
  - meta-system.debugging-techniques (for debug workflows)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.system-optimizer
  - meta-system.quality-assurance
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert logging configuration
  - Restore previous logging setup
validators:
  - skill.validator
---

## Trigger
Use this skill when designing logging strategies, planning observability, or reviewing log formats.

## Prerequisites
- Target components identified
- Observability requirements defined
- Log storage configured

## Steps
1. **Identify Components**: List all components needing logging.
2. **Define Requirements**: Establish what needs to be observable.
3. **Design Levels**: Define log levels (debug, info, warn, error, fatal).
4. **Specify Format**: Standardize log format and structure.
5. **Design Correlation**: Create correlation ID scheme for request tracing.
6. **Plan Retention**: Define log retention and rotation policies.
7. **Design Debug Modes**: Create debug logging modes for troubleshooting.
8. **Implement**: Apply logging patterns to components.
9. **Test Quality**: Verify log output provides sufficient observability.
10. **Document**: Write logging standards documentation.

## Verification
- All quality gates passed
- All components covered
- Format standardized
- Standards documented

## Common Failures
- Logging without clear observability requirements
- Inconsistent log formats across components
- Excessive logging increasing token cost
