---
id: integrations.stripe-integration
name: Stripe Integration
version: 1.0.0
domain: integrations
category: integrations.payments
purpose: Design Stripe payment, subscription, webhook, and reconciliation integration plans with secure handling of payment data.
summary: Stripe integration covers product/pricing setup, checkout or billing flows, webhook verification, idempotency, customer mapping, and reconciliation.
triggers:
  - stripe integration
  - stripe checkout setup
  - stripe subscription workflow
  - stripe webhook design
  - payment integration
activation_triggers:
  - integrate Stripe
  - design Stripe billing
prerequisites:
  - Pricing model and billing flow are known
  - Payment data handling boundaries are defined
  - Webhook endpoint ownership is known
inputs:
  - billing_requirements
  - product_pricing_model
  - customer_mapping
  - webhook_events
steps:
  - Map billing model to Stripe objects: products, prices, customers, subscriptions, invoices, checkout sessions, and webhooks.
  - Define secure boundaries: never store raw card data; use Stripe-hosted or tokenized flows.
  - Design webhook verification, idempotency keys, retry behavior, and event ordering handling.
  - Plan reconciliation between app state, Stripe state, and finance records.
  - Add test-mode fixtures and failure scenarios before production rollout.
outputs:
  - stripe_integration_plan
  - webhook_event_map
  - reconciliation_plan
  - test_scenario_list
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Webhook signature verification is required
  - Idempotency and retries are specified
  - No raw payment data storage is introduced
failure_modes:
  - Trusting webhook payloads without verification
  - Creating duplicate entitlements on retry
  - Failing to reconcile canceled or disputed payments
handoffs:
  - integrations.stripe-agent
  - engineering.backend-api
source_references:
  - ref.github.integrations.stripe-integration.2026-06-03
  - https://github.com/stripe/stripe-node
allowed_agents:
  - integrations.stripe-agent
  - integrations.api-integration-specialist
status: active
budget_band: standard
rollback:
  - Revert integration plan artifact
  - Disable test webhook endpoint if created
validators:
  - skill.validator
  - payment_safety_check
---

## Procedure
1. Map products, prices, customers, subscriptions, invoices, and webhooks.
2. Define payment data boundaries and security controls.
3. Specify webhook verification, idempotency, retries, and event ordering.
4. Plan reconciliation and finance handoff.
5. Add test-mode scenarios for success, failure, retry, dispute, and cancellation.
