---
id: integrations.api-versioning
name: API Versioning
version: 1.0.0
domain: integrations
category: integrations.lifecycle
purpose: Implement API versioning strategies to enable backward-compatible evolution of API contracts.
summary: Guides through choosing and implementing URL-based, header-based, or content-negotiation versioning for APIs.
triggers:
  - api versioning strategy
  - version api endpoint
  - api backward compatibility
activation_triggers:
  - evolve api contract
  - deprecate api version
prerequisites:
  - existing api contract
  - understanding of consumer base
inputs:
  - versioning_strategy
  - deprecation_timeline
  - consumer_migration_plan
steps:
  - Analyze current API contract and breaking change requirements
  - Choose versioning strategy (URL path, header, media type)
  - Implement version routing and negotiation
  - Create deprecation timeline and communication plan
  - Build version compatibility tests
  - Monitor version adoption and plan sunset
outputs:
  - versioning_implementation
  - deprecation_plan
  - migration_guide
tools:
  - filesystem.write (versioning configuration)
quality_gates:
  - Old versions continue to work
  - New version documented and discoverable
  - Deprecation headers present
failure_modes:
  - Breaking changes without version bump
  - No deprecation communication
  - Supporting too many versions indefinitely
handoffs:
  - integrations.api-documentation (for version docs)
  - integrations.api-monitoring (for version tracking)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
  - integrations.api-gateway-architect
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert to previous version routing
validators:
  - skill.validator
---

## Trigger
Use this skill when planning or implementing API versioning strategies.

## Prerequisites
- Existing API contract in production
- Understanding of consumer base and their migration capacity

## Steps
1. **Analyze Changes**: Identify which changes are breaking vs. non-breaking.
2. **Choose Strategy**: URL path (/v2/) for simplicity, headers for flexibility.
3. **Implement Routing**: Route requests to correct version based on strategy.
4. **Plan Deprecation**: Set sunset dates and communicate to consumers.
5. **Test Compatibility**: Verify old and new versions work correctly in parallel.
6. **Monitor Adoption**: Track which consumers use which versions.

## Verification
- Old API version continues working after new version deploy
- Deprecation headers present on old version responses
- Documentation covers all active versions

## Rollback
- Revert version routing configuration

## Common Failures
- Making breaking changes without incrementing version
- Not communicating deprecation timelines
- Supporting deprecated versions beyond reasonable sunset dates
