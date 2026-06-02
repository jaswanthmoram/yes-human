---
id: platform.elk-stack
name: ELK Stack Setup and Queries
version: 1.0.0
domain: platform
category: platform.observability
description: Set up, configure, and query Elasticsearch, Logstash, and Kibana (ELK) for centralized log management.
triggers:
  - ELK stack setup
  - Elasticsearch queries
  - Kibana dashboard creation
  - Logstash pipeline configuration
  - log aggregation with ELK
  - Elasticsearch index management
aliases:
  - elastic stack
  - EFK stack
  - log management
negative_keywords:
  - prometheus
  - grafana
  - loki
  - splunk
inputs:
  - log_sources
  - index_strategy
  - retention_policy
  - query_requirements
outputs:
  - elasticsearch_config
  - logstash_pipelines
  - kibana_dashboards
  - index_templates
allowed_tools:
  - shell.readonly (curl to ES API, Kibana queries)
  - shell.write (index management, pipeline deploy)
  - filesystem.read (configs, pipeline files)
  - filesystem.write (configs, templates)
required_skills:
  - platform.observability-setup
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Index mapping explosions
  - Logstash pipeline backpressure
  - Kibana queries timing out
  - Insufficient shard sizing
verification:
  - Elasticsearch cluster health green
  - Logstash pipeline processes logs without errors
  - Kibana queries return expected results
  - Index lifecycle management active
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.prometheus-alerts (for log-based alerting)
  - platform.grafana-dashboards (if using Grafana with ES)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.observability-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Restore index from snapshot
  - Revert Logstash pipeline configuration
validators:
  - skill.validator
---

## Mission
Provide patterns for deploying and operating the ELK stack for centralized log ingestion, indexing, and analysis.

## When To Use
- Setting up centralized log aggregation
- Creating Kibana dashboards for log analysis
- Configuring Logstash pipelines for log processing
- Managing Elasticsearch indices and lifecycle

## When Not To Use
- Metrics monitoring (use platform.prometheus-alerts)
- Lightweight log aggregation (consider Loki)
- Real-time alerting (use Prometheus + Alertmanager)

## Procedure
1. **Design Index Strategy**: Define index naming, sharding, and lifecycle policies
2. **Configure Elasticsearch**: Set up cluster, index templates, and mappings
3. **Build Logstash Pipelines**: Create input, filter, and output stages for log processing
4. **Deploy Log Shippers**: Configure Filebeat or Fluentd on source hosts
5. **Create Kibana Dashboards**: Build index patterns, saved searches, and visualizations
6. **Set Up ILM**: Configure index lifecycle management for retention and rollover
7. **Test End-to-End**: Send test logs and verify ingestion, parsing, and searchability

## Tool Policy
- Use index templates to prevent mapping explosions
- Configure ILM policies before creating indices
- Use Kibana Dev Tools for query testing
- Monitor cluster health with `_cluster/health` API

## Verification
- `_cluster/health` returns green status
- Test logs appear in Kibana Discover
- Logstash pipeline metrics show no errors
- ILM policies active on all indices

## Failure Modes
- Dynamic mapping creating too many fields (mapping explosion)
- Logstash pipeline bottleneck causing log loss
- Shard sizing too small or too large for workload
- Not setting up ILM (indices grow unbounded)

## Example Routes
- "set up ELK for application logs" → full stack deployment
- "create Kibana dashboard for errors" → index pattern + visualizations
- "fix Logstash pipeline errors" → grok pattern debugging

## Source Notes
Based on Elastic official documentation and production ELK deployment patterns. Referenced dossier: ref.github.platform.2026-05-31.
