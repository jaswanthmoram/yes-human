---
id: platform.cloud-architect
name: Cloud Architecture Design
version: 1.0.0
domain: platform
category: platform.architecture
purpose: Design cloud infrastructure that balances reliability, security, cost, and operational simplicity.
summary: Cloud architecture decisions are expensive to reverse. This skill covers multi-region design, security zone separation, cost modeling (reserved vs on-demand vs spot), IaC review, and capacity planning with explicit trade-off documentation.
triggers:
  - cloud architecture design
  - cloud migration plan
  - cloud cost optimization strategy
  - multi cloud design
  - cloud native architecture
activation_triggers:
  - we need to design our cloud infrastructure
  - how do we reduce our cloud spend
prerequisites:
  - Cloud provider chosen (AWS/GCP/Azure)
  - Workload characteristics defined (stateful/stateless, traffic pattern, compliance requirements)
inputs:
  - workload_requirements
  - compliance_constraints
  - budget_envelope
steps:
  - Define availability requirements: RPO/RTO targets drive multi-AZ vs multi-region decisions
  - Design network topology: VPCs/VNETs, public vs private subnets, security groups, egress control
  - Choose compute strategy: serverless for bursty, containers for predictable, VMs for legacy or compliance
  - Model cost: use reserved instances for baseline, on-demand for overflow, spot for batch — estimate monthly cost
  - Design IAM: least privilege, no wildcards, separate roles per service, secrets in secret manager not env vars
  - Document as IaC (Terraform or CDK) with explicit resource tagging for cost allocation
outputs:
  - architecture_diagram
  - cost_estimate
  - iac_skeleton
  - trade_off_document
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - All resources tagged for cost allocation
  - No public access without explicit justification
  - Estimated monthly cost documented
  - RPO/RTO targets addressed
failure_modes:
  - Over-engineering for hypothetical scale
  - Under-investing in multi-AZ for production workloads
  - No cost estimate before provisioning
handoffs:
  - platform.devops-engineer (for IaC implementation)
source_references:
  - https://github.com/kubernetes/kubernetes
  - https://github.com/argoproj/argo-cd
allowed_agents:
  - platform.devops-engineer
  - engineering.architect
status: active
budget_band: expanded
rollback:
  - IaC changes are reversible via terraform destroy or CDK destroy
  - Rollback is costly for stateful resources — plan before applying
validators:
  - skill.validator
---
## Trigger
Use when designing new cloud infrastructure, planning a migration, or reviewing existing architecture for cost/reliability gaps.

## Prerequisites
- Cloud provider and workload type known
- Compliance and availability requirements defined

## Steps

### 1. Establish Availability Requirements
Define RPO (how much data loss is acceptable) and RTO (how long can the service be down). Multi-AZ meets 99.9%; multi-region meets 99.99%. Don't over-engineer.

### 2. Design Network Topology
Three-tier: public subnet (ALB/CDN), private subnet (compute), isolated subnet (database). No inbound internet to private subnet. VPN or PrivateLink for internal services.

### 3. Choose Compute
Serverless (Lambda/Cloud Run): bursty, event-driven, no always-on cost. Containers (ECS/GKE): predictable throughput. VMs: legacy or compliance requirements. Kubernetes: only at scale.

### 4. Model Cost
Reserved instances for baseline workloads (1-3yr commitment, 30-60% savings). On-demand for variable. Spot/preemptible for batch and ML training. Export cost estimate to spreadsheet.

### 5. Design IAM
One IAM role per service. No wildcards (`*`) on resource ARNs. Secrets in AWS Secrets Manager / GCP Secret Manager — never in environment variables or code.

### 6. Codify in IaC
Write Terraform or CDK. Every resource tagged: `env`, `team`, `service`, `cost-center`. IaC lives in git, reviewed like code.

## Verification
- [ ] RPO/RTO addressed in design
- [ ] Cost estimate documented
- [ ] No internet-exposed private resources
- [ ] All resources in IaC

## Rollback
`terraform destroy` (expensive for stateful) or targeted `terraform destroy -target`. Plan rollback before applying.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Cloud bill shock | No cost estimate | Model before provisioning |
| Single AZ failure | No multi-AZ | Add redundancy for production |
| Secret in env var | IAM complexity avoided | Use Secret Manager |

## Examples
**Example A:** SaaS startup: multi-AZ ECS Fargate + RDS Multi-AZ + CloudFront — reliable, ~$800/month at low scale.
**Example B:** ML batch pipeline: spot instances + S3 for data — 80% cost reduction vs on-demand.
