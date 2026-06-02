---
id: platform.docker-compose
name: Docker Compose Patterns
version: 1.0.0
domain: platform
category: platform.containers
description: Design and manage Docker Compose configurations for local development and multi-container applications.
triggers:
  - Docker Compose patterns
  - create docker-compose.yml
  - multi-container setup
  - Docker Compose networking
  - Docker Compose volumes
  - local development environment
aliases:
  - compose file
  - docker compose
  - container orchestration local
negative_keywords:
  - kubernetes deployment
  - docker swarm
  - production orchestration
  - helm chart
inputs:
  - application_services
  - networking_requirements
  - volume_configuration
  - environment_variables
outputs:
  - docker_compose_yaml
  - env_files
  - networking_config
  - volume_setup
allowed_tools:
  - shell.readonly (docker compose config, ps)
  - shell.write (docker compose up, down)
  - filesystem.read (compose files, Dockerfiles)
  - filesystem.write (compose files, env files)
required_skills: []
budget_band: micro
max_context_tokens: 4096
failure_modes:
  - Port conflicts between services
  - Volume mount permission issues
  - Service dependency ordering
  - Environment variable conflicts
verification:
  - docker compose config validates
  - All services start and are healthy
  - Networking between services works
  - Volumes persist correctly
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.kubectl-commands (for production deployment)
  - platform.helm-charts (for Kubernetes packaging)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.devops-engineer
  - platform.developer
allowed_workflows: []
status: active
rollback:
  - docker compose down -v to remove all resources
validators:
  - skill.validator
---

## Mission
Provide patterns for creating Docker Compose configurations for local development, testing, and multi-container application orchestration.

## When To Use
- Setting up local development environments
- Running integration tests with dependencies
- Multi-container application prototyping
- Database and cache service orchestration for development

## When Not To Use
- Production deployments (use Kubernetes/Helm)
- Single container runs (use `docker run`)
- Large-scale orchestration (use Kubernetes)

## Procedure
1. **Define Services**: List all application services and their Docker images
2. **Configure Networking**: Set up custom networks for service isolation
3. **Set Up Volumes**: Define named volumes for data persistence
4. **Configure Dependencies**: Use `depends_on` with health checks for startup ordering
5. **Manage Environment**: Use `.env` files and environment variable interpolation
6. **Add Health Checks**: Define health checks for all services
7. **Validate and Run**: Run `docker compose config` to validate, then `docker compose up`

## Tool Policy
- Use Docker Compose V2 (`docker compose` not `docker-compose`)
- Always validate with `docker compose config` before running
- Use profiles for optional services (debug, admin tools)
- Pin image versions, avoid `latest` tag

## Verification
- `docker compose config` validates without errors
- All services report healthy status
- Inter-service communication works
- Data persists across restarts

## Failure Modes
- Services starting before dependencies are ready (missing health checks)
- Port conflicts with host services
- Volume permission mismatches between host and container
- Stale containers from previous runs

## Example Routes
- "set up local dev with Postgres and Redis" → compose with app + db + cache
- "add health checks to compose" → healthcheck blocks for each service
- "use profiles for optional services" → debug and admin profiles

## Source Notes
Based on Docker Compose official documentation and multi-container patterns. Referenced dossier: ref.github.platform.2026-05-31.
