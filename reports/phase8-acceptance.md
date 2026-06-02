# Phase 8 Acceptance

Generated: 2026-06-02T09:19:21.078Z

## Summary

- Phase 8 scope: Waves 7A–7H longtail + acceptance freeze
- Agents: 318
- Skills: 366
- Canonical workflows: 119
- Knowledge packs: 18
- Hook bindings: 7
- Category packs: 19
- Connectors: 30 (7 enabled, 23 disabled)

## Evaluation

- Routing top-1: 99.6% across 1583 fixtures
- Wrong-domain rate: 0.1%
- Missing-route rate: 0.0%
- Skill top-1: 98.8% across 592 fixtures
- Dossier staging failures: 0
- Self-ref-only dossiers: 0
- Workflow top-1: 100.0% across 51 fixtures

## Token Budget

- Boot file: YES_BOOT.md
- Estimated boot tokens: 69
- Target: 180
- Hard cap: 300

## Dossier Coverage

- Agent dossiers: 318/318
- Workflow dossiers: 119/119

## Connector Coverage

- Enabled connectors: 7
- Disabled declarations: crm.twenty, support.chatwoot, analytics.posthog, pm.plane, pm.openproject, accounting.erpnext, accounting.odoo, hr.frappe-hrms, hr.orangehrm, hubspot, salesforce, jira, linear, slack, mixpanel, notion-api, stripe-api, github-app, datadog, pagerduty, snowflake, bigquery, postgres

## Notes

- Workflow routes now target real workflow ids rather than legacy placeholder ids.
- Category packs are generated from categories, agents, workflows, connector mappings, and fixture coverage.
- Optional adapter packs remain out of scope for Phase 8.
