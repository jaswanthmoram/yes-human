# Phase 8 Acceptance

Generated: 2026-06-01T08:20:34.008Z

## Summary

- Phase 8 scope: Wave 5 workflows + acceptance surface
- Canonical workflows: 23
- Category packs: 19
- Connectors: 16 (7 enabled, 9 disabled)

## Evaluation

- Routing top-1: 99.3% across 437 fixtures
- Wrong-domain rate: 0.2%
- Missing-route rate: 0.0%
- Workflow top-1: 100.0% across 46 fixtures

## Token Budget

- Boot file: YES_BOOT.md
- Estimated boot tokens: 69
- Target: 180
- Hard cap: 300

## Dossier Coverage

- Agent dossiers: 86/86
- Workflow dossiers: 23/23

## Connector Coverage

- Enabled connectors: 7
- Disabled declarations: crm.twenty, support.chatwoot, analytics.posthog, pm.plane, pm.openproject, accounting.erpnext, accounting.odoo, hr.frappe-hrms, hr.orangehrm

## Notes

- Workflow routes now target real workflow ids rather than legacy placeholder ids.
- Category packs are generated from categories, agents, workflows, connector mappings, and fixture coverage.
- Optional adapter packs remain out of scope for Phase 8.
