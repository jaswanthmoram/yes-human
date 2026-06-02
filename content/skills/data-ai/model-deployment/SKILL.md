---
id: data-ai.model-deployment
name: Model Deployment
version: 1.0.0
domain: data-ai
category: data-ai.operations
purpose: Deploy ML models to production with proper serving infrastructure, monitoring, and rollback capabilities.
summary: Systematic model deployment including serving setup, health checks, canary releases, and rollback strategies.
triggers:
  - deploy ml model
  - model serving setup
  - production model release
  - model deployment pipeline
  - canary release for model
activation_triggers:
  - model deployment
  - production release
  - serving infrastructure
prerequisites:
  - trained and evaluated model
  - deployment target defined
  - monitoring requirements specified
inputs:
  - model_artifact
  - deployment_target
  - serving_requirements
  - rollback_strategy
steps:
  - Package model with dependencies
  - Configure serving infrastructure (batch/real-time)
  - Set up health checks and monitoring
  - Deploy to staging environment
  - Run integration and load tests
  - Execute canary or blue-green deployment
  - Monitor production metrics post-deployment
outputs:
  - deployed_model
  - serving_configuration
  - monitoring_setup
  - deployment_report
tools:
  - shell.readonly (deployment scripts)
  - filesystem.read (model artifacts)
  - filesystem.write (deployment config)
quality_gates:
  - Health checks configured
  - Rollback strategy tested
  - Monitoring active
failure_modes:
  - Deploying without rollback strategy
  - Skipping load testing
  - No post-deployment monitoring
handoffs:
  - data-ai.model-monitoring (for ongoing monitoring)
  - data-ai.mlops-engineer (for CI/CD integration)
source_references:
  - ref.github.data-ai.model-deployment.2026-05-31
allowed_agents:
  - data-ai.mlops-engineer
  - data-ai.ml-engineer
allowed_workflows: []
status: active
budget_band: expanded
rollback:
  - Revert to previous model version
  - Restore previous serving configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when deploying an ML model to production or setting up model serving infrastructure.

## Prerequisites
- Model trained and evaluated with acceptable metrics
- Deployment target (cloud, on-prem, edge) defined
- Rollback strategy agreed upon

## Steps
1. **Package Model**: Bundle model with dependencies, config, and version info.
2. **Configure Serving**: Set up inference server (REST/gRPC), batching, scaling.
3. **Health Checks**: Configure liveness, readiness, and model-specific health probes.
4. **Staging Deploy**: Deploy to staging; run integration and load tests.
5. **Canary Release**: Gradually shift traffic; monitor metrics at each stage.
6. **Monitor**: Track latency, error rate, prediction quality post-deployment.
7. **Document**: Record deployment config, monitoring setup, and rollback procedure.

## Verification
- Health checks active and passing
- Rollback strategy tested and documented
- Monitoring dashboards configured

## Rollback
- Revert to previous model version
- Restore previous serving configuration

## Common Failures
- Deploying without tested rollback
- Skipping load testing (production failures)
- No post-deployment monitoring (silent degradation)
