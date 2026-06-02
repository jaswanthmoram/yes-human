# Phase 8 Internal Execution Plan

**Status:** Ready for execution  
**Current State:** 86 agents, 1 skill, 23 workflows  
**Target State:** 250 agents (+164), 360 skills (+359), 119 workflows (+96)  
**Total Stages:** 42 stages across 8 waves  
**Subagent Strategy:** 10-30 parallel subagents per major wave  

---

## Execution Overview

This plan breaks Phase 8 into 42 concrete stages organized into 8 waves. Each stage has:
- Clear inputs and outputs
- Specific subagent assignments
- Validation checkpoints
- Dependencies on prior stages

**Wave Structure:**
- Wave 7A: Skill Substrate (Stages 1-5)
- Wave 7B: Source Mining & Dossiers (Stages 6-10)
- Wave 7C: Technical Domain Expansion (Stages 11-20)
- Wave 7D: Commercial Domain Expansion (Stages 21-28)
- Wave 7E: Regulated Domain Expansion (Stages 29-36)
- Wave 7F: Knowledge Packs & Connectors (Stages 37-39)
- Wave 7G: Fixture Scale & Evaluation (Stages 40-41)
- Wave 7H: Acceptance Freeze (Stage 42)

---

## WAVE 7A: SKILL SUBSTRATE (Stages 1-5)

**Goal:** Establish skill infrastructure before mass content generation  
**Subagents:** 5-8 parallel  
**Duration:** 3-5 days  

### Stage 1: Skill Schema & Compiler Support
**Inputs:**
- Existing `packages/yes-schema/schemas/` directory
- Existing `packages/yes-cli/commands/compile.js`
- Architecture skill model from `yes-human-agentic-system-architecture.md` Section 25

**Outputs:**
- `packages/yes-schema/schemas/skill.schema.json` - Complete JSON schema for skills
- Updated `packages/yes-cli/commands/compile.js` - Skill compilation logic
- `packages/yes-schema/eval-skill.js` - Skill evaluation script
- Updated `packages/yes-cli/index.js` - `yes eval skill` command

**Subagent Assignment:**
```
Subagent 1: Schema Architect
  - Write skill.schema.json based on architecture Section 25
  - Validate against existing agent.schema.json patterns
  - Include: id, domain, purpose, inputs, outputs, activation_triggers, 
    procedure, tools, quality_gates, failure_modes, handoffs, 
    source_references, allowed_agents, allowed_workflows, status

Subagent 2: Compiler Engineer
  - Update compile.js to scan content/skills/<domain>/<skill-id>/SKILL.md
  - Parse YAML frontmatter from skill files
  - Generate registry/skills.json from canonical skill files
  - Add skill validation to compilation pipeline

Subagent 3: Eval Script Developer
  - Create eval-skill.js following eval-route.js patterns
  - Implement skill fixture loading from tests/fixtures/skills/
  - Calculate top-1 accuracy for skill routing
  - Output pass/fail with mismatches
```

**Validation:**
- `npm run validate` passes
- `node packages/yes-schema/eval-skill.js` runs without errors
- Skill schema validates against example skill file

**Dependencies:** None (foundational stage)

---

### Stage 2: Foundational Skills - Engineering Domain (8 skills)
**Inputs:**
- Skill schema from Stage 1
- Source dossiers from `YES-HUMAN_SOURCE_MAP.md` Section 4
- Existing engineering agents: code-reviewer, build-resolver, tdd-guide, architect, docs-updater

**Outputs:**
- 8 skill files in `content/skills/engineering/`:
  1. `code-review/SKILL.md` - Systematic code review procedure
  2. `test-triage/SKILL.md` - Test failure analysis and prioritization
  3. `dependency-upgrade/SKILL.md` - Safe dependency update workflow
  4. `api-design/SKILL.md` - REST/GraphQL API design patterns
  5. `refactor-planning/SKILL.md` - Refactoring strategy and execution
  6. `build-failure/SKILL.md` - Build error diagnosis and fix
  7. `documentation-update/SKILL.md` - Documentation sync with code
  8. `git-workflow/SKILL.md` - Branch strategy and commit discipline

**Subagent Assignment:**
```
Subagent 4: Engineering Skill Architect
  - Research: Use firecrawl to fetch Aider, Cline, Continue docs
  - Research: Use exa to search "code review best practices 2024"
  - Research: Use fetch to get Sourcegraph Cody context patterns
  - Write: 8 skill files with YAML frontmatter + markdown body
  - Write: 8 skill dossiers in references/skills/engineering/
  - Write: 24 skill fixtures (3 per skill) in tests/fixtures/skills/engineering/
```

**Validation:**
- Each skill has dossier with score ≥80
- Each skill maps to at least 1 allowed agent
- Each skill has 3+ fixtures
- `npm run validate` passes

**Dependencies:** Stage 1 complete

---

### Stage 3: Foundational Skills - Security Domain (6 skills)
**Inputs:**
- Skill schema from Stage 1
- Source dossiers from `YES-HUMAN_SOURCE_MAP.md` Section 6
- Existing security agents: security-reviewer, threat-modeler, secret-scan-agent

**Outputs:**
- 6 skill files in `content/skills/security/`:
  1. `threat-model/SKILL.md` - STRIDE/DREAD threat modeling
  2. `secret-scan-triage/SKILL.md` - Secret detection and false positive filtering
  3. `prompt-injection-review/SKILL.md` - LLM prompt injection detection
  4. `supply-chain-review/SKILL.md` - Dependency supply chain risk
  5. `auth-review/SKILL.md` - Authentication flow security review
  6. `vulnerability-assessment/SKILL.md` - CVE analysis and prioritization

**Subagent Assignment:**
```
Subagent 5: Security Skill Architect
  - Research: Use firecrawl to fetch OWASP Top 10, STRIDE docs
  - Research: Use exa to search "prompt injection detection 2024"
  - Research: Use fetch to get Semgrep, CodeQL documentation
  - Write: 6 skill files with complete procedure and quality gates
  - Write: 6 skill dossiers with security-specific sources
  - Write: 18 skill fixtures (3 per skill)
```

**Validation:**
- Each skill includes high-stakes disclaimer requirements
- Each skill has explicit failure modes for security context
- Dossier scores ≥80 with security-specific sources
- `npm run validate` passes

**Dependencies:** Stage 1 complete

---

### Stage 4: Foundational Skills - Platform & Data/AI (8 skills)
**Inputs:**
- Skill schema from Stage 1
- Source dossiers from `YES-HUMAN_SOURCE_MAP.md` Sections 5, 7
- Existing platform agents: devops-engineer, ci-cd-engineer, incident-responder
- Existing data-ai agents: rag-engineer, eval-engineer, ml-engineer

**Outputs:**
- 4 platform skills in `content/skills/platform/`:
  1. `ci-triage/SKILL.md` - CI failure diagnosis
  2. `deploy-rollback/SKILL.md` - Safe deployment rollback
  3. `observability-setup/SKILL.md` - Monitoring and logging setup
  4. `incident-analysis/SKILL.md` - Incident postmortem and analysis

- 4 data-ai skills in `content/skills/data-ai/`:
  1. `rag-eval/SKILL.md` - RAG system evaluation
  2. `dataset-profiling/SKILL.md` - Dataset quality assessment
  3. `model-eval/SKILL.md` - ML model evaluation
  4. `embedding-index-review/SKILL.md` - Vector index quality review

**Subagent Assignment:**
```
Subagent 6: Platform Skill Architect
  - Research: Use firecrawl to fetch Kubernetes, Terraform, Argo CD docs
  - Research: Use exa to search "incident postmortem best practices"
  - Write: 4 platform skill files
  - Write: 4 platform skill dossiers
  - Write: 12 platform skill fixtures

Subagent 7: Data/AI Skill Architect
  - Research: Use firecrawl to fetch RAG evaluation frameworks
  - Research: Use exa to search "ML model evaluation metrics 2024"
  - Research: Use fetch to get Hugging Face evaluation docs
  - Write: 4 data-ai skill files
  - Write: 4 data-ai skill dossiers
  - Write: 12 data-ai skill fixtures
```

**Validation:**
- Platform skills include observability and rollback procedures
- Data/AI skills include evaluation metrics and quality gates
- All dossiers score ≥80
- 24 total fixtures created
- `npm run validate` passes

**Dependencies:** Stage 1 complete

---

### Stage 5: Foundational Skills - Meta-System & Integration (3 skills)
**Inputs:**
- Skill schema from Stage 1
- Source dossiers from `YES-HUMAN_SOURCE_MAP.md` Sections 2, 8
- Existing meta-system agents: supreme-router, plugin-absorber, source-miner

**Outputs:**
- 3 meta-system skills in `content/skills/meta-system/`:
  1. `agent-absorption/SKILL.md` - Safe agent absorption from external sources
  2. `fixture-writing/SKILL.md` - Route and workflow fixture creation
  3. `route-evaluation/SKILL.md` - Routing accuracy testing and analysis

**Subagent Assignment:**
```
Subagent 8: Meta-System Skill Architect
  - Research: Use firecrawl to fetch ECC plugin absorption patterns
  - Research: Use exa to search "test fixture design patterns"
  - Write: 3 meta-system skill files
  - Write: 3 meta-system skill dossiers
  - Write: 9 meta-system skill fixtures
```

**Validation:**
- Meta-system skills reference architecture patterns
- Absorption skill includes license and provenance gates
- All dossiers score ≥80
- `npm run validate` passes
- **Wave 7A Exit Check:** 25 foundational skills promoted, skill eval passes

**Dependencies:** Stages 2, 3, 4 complete

---

## WAVE 7B: SOURCE MINING & DOSSIERS (Stages 6-10)

**Goal:** Build source dossier cache for all domains before mass expansion  
**Subagents:** 8-12 parallel  
**Duration:** 2-3 days  

### Stage 6: Source Dossier Cache Infrastructure
**Inputs:**
- Existing `registry/source-references.json`
- Existing `references/` directory structure
- Source protocol from `YES-HUMAN_PHASE8_LONGTAIL_EXPANSION_PLAN.md`

**Outputs:**
- `registry/source-dossier-cache.json` - Cached dossier index
- `packages/yes-schema/dossier-scorer.js` - Automated dossier scoring helper
- `reports/research-gaps.md` - Documented research gaps per domain

**Subagent Assignment:**
```
Subagent 9: Infrastructure Engineer
  - Create source-dossier-cache.json schema
  - Write dossier-scorer.js implementing 7-dimension scoring
  - Scan existing references/ and populate cache
  - Generate research-gaps.md identifying domains with <50 dossiers
```

**Validation:**
- Cache indexes all existing dossiers
- Scorer produces consistent scores (±2 points on re-run)
- Research gaps document lists all 18 domains

**Dependencies:** Wave 7A complete

---

### Stage 7: Domain Dossiers - Technical Domains (7 domains)
**Inputs:**
- Source lanes from expansion plan
- YES-HUMAN_SOURCE_MAP.md Sections 2-8
- Research gaps from Stage 6

**Outputs:**
- 7 domain-level dossiers (1 per technical domain):
  - `references/engineering/domain.sources.json`
  - `references/platform/domain.sources.json`
  - `references/security/domain.sources.json`
  - `references/data-ai/domain.sources.json`
  - `references/integrations/domain.sources.json`
  - `references/research/domain.sources.json`
  - `references/meta-system/domain.sources.json`

**Subagent Assignment:**
```
Subagent 10: Technical Domain Researcher (Engineering, Platform, Security)
  - Use firecrawl to fetch 10+ GitHub repos per domain
  - Use exa to search official docs for each domain
  - Use fetch to get vendor documentation
  - Write 3 domain dossiers with 15+ sources each
  - Score each dossier ≥80

Subagent 11: Technical Domain Researcher (Data/AI, Integrations, Research, Meta)
  - Use firecrawl to fetch RAG, MCP, GraphRAG repos
  - Use exa to search "agent orchestration patterns 2024"
  - Use fetch to get Microsoft Agent Framework docs
  - Write 4 domain dossiers with 15+ sources each
  - Score each dossier ≥80
```

**Validation:**
- Each domain dossier has 15+ sources
- License safety ≥12 for all dossiers
- Source count ≥15 for all dossiers
- Testability ≥7 for all dossiers

**Dependencies:** Stage 6 complete

---

### Stage 8: Domain Dossiers - Commercial Domains (5 domains)
**Inputs:**
- Source lanes from expansion plan
- YES-HUMAN_SOURCE_MAP.md Sections 9-13

**Outputs:**
- 5 domain-level dossiers:
  - `references/product-business/domain.sources.json`
  - `references/design-content/domain.sources.json`
  - `references/marketing/domain.sources.json`
  - `references/sales/domain.sources.json`
  - `references/startup-ops/domain.sources.json`

**Subagent Assignment:**
```
Subagent 12: Commercial Domain Researcher (Product, Design, Marketing)
  - Use firecrawl to fetch product management frameworks
  - Use exa to search "design system best practices 2024"
  - Use fetch to get marketing analytics documentation
  - Write 3 domain dossiers

Subagent 13: Commercial Domain Researcher (Sales, Startup-Ops)
  - Use firecrawl to fetch CRM documentation (Salesforce, HubSpot)
  - Use exa to search "startup operations playbook"
  - Use fetch to get sales methodology resources
  - Write 2 domain dossiers
```

**Validation:**
- Each dossier has 15+ sources
- Commercial sources include vendor docs and playbooks
- All dossiers score ≥80

**Dependencies:** Stage 6 complete

---

### Stage 9: Domain Dossiers - Regulated Domains (6 domains)
**Inputs:**
- Source lanes from expansion plan
- YES-HUMAN_SOURCE_MAP.md Sections 14-16
- High-stakes policy requirements

**Outputs:**
- 6 domain-level dossiers:
  - `references/finance/domain.sources.json`
  - `references/legal-compliance/domain.sources.json`
  - `references/hr/domain.sources.json`
  - `references/healthcare/domain.sources.json`
  - `references/education/domain.sources.json`
  - `references/manufacturing/domain.sources.json`

**Subagent Assignment:**
```
Subagent 14: Regulated Domain Researcher (Finance, Legal, HR)
  - Use firecrawl to fetch accounting standards (GAAP, IFRS)
  - Use exa to search "contract review best practices"
  - Use fetch to get HR compliance documentation
  - Write 3 domain dossiers with regulatory sources
  - Include disclaimer requirements in each dossier

Subagent 15: Regulated Domain Researcher (Healthcare, Education, Manufacturing)
  - Use firecrawl to fetch HIPAA, FERPA, ISO standards
  - Use exa to search "clinical decision support systems"
  - Use fetch to get manufacturing quality standards
  - Write 3 domain dossiers with high-stakes sources
  - Include escalation triggers in each dossier
```

**Validation:**
- Each dossier has 15+ sources including official standards
- Regulated domains include disclaimer requirements
- All dossiers score ≥80 with license safety ≥12

**Dependencies:** Stage 6 complete

---

### Stage 10: Skill Family Dossiers (10 families)
**Inputs:**
- Skill families from expansion plan Section "Skill Model"
- Domain dossiers from Stages 7-9

**Outputs:**
- 10 skill family dossiers:
  - `references/skills/source-and-evidence.family.sources.json`
  - `references/skills/engineering.family.sources.json`
  - `references/skills/security.family.sources.json`
  - `references/skills/platform.family.sources.json`
  - `references/skills/data-ai.family.sources.json`
  - `references/skills/product-startup.family.sources.json`
  - `references/skills/design-content.family.sources.json`
  - `references/skills/commercial.family.sources.json`
  - `references/skills/regulated-operations.family.sources.json`
  - `references/skills/meta-system.family.sources.json`

**Subagent Assignment:**
```
Subagent 16: Skill Family Dossier Writer
  - Aggregate domain dossiers into skill family dossiers
  - Add skill-specific sources (procedures, tools, quality gates)
  - Write 10 skill family dossiers
  - Cross-reference with domain dossiers to avoid duplication
```

**Validation:**
- Each skill family dossier has 15+ sources
- Families reference domain dossiers where applicable
- All dossiers score ≥80
- **Wave 7B Exit Check:** 50+ dossiers exist (18 domain + 10 family + 22 from Wave 7A)

**Dependencies:** Stages 7, 8, 9 complete

---

## WAVE 7C: TECHNICAL DOMAIN EXPANSION (Stages 11-20)

**Goal:** Expand technical backbone to 111 agents, 170 skills, 53 workflows  
**Subagents:** 15-20 parallel  
**Duration:** 7-10 days  

### Stage 11: Engineering Domain - Agents (14 new agents)
**Inputs:**
- Domain dossier from Stage 7
- Existing 6 engineering agents
- Target: 20 total engineering agents

**Outputs:**
- 14 new agent files in `content/agents/engineering/`:
  1. `backend-api.md` - REST/GraphQL API development
  2. `frontend-react.md` - React component development
  3. `frontend-vue.md` - Vue component development
  4. `mobile-ios.md` - iOS native development
  5. `mobile-android.md` - Android native development
  6. `database-design.md` - Database schema design
  7. `database-optimization.md` - Query optimization
  8. `performance-profiling.md` - Performance analysis
  9. `testing-unit.md` - Unit testing strategy
  10. `testing-integration.md` - Integration testing
  11. `testing-e2e.md` - End-to-end testing
  12. `code-migration.md` - Large-scale code migration
  13. `refactoring.md` - Code refactoring specialist
  14. `dev-workflow.md` - Development workflow optimization

**Subagent Assignment:**
```
Subagent 17: Engineering Agent Architect (Backend, Frontend, Mobile)
  - Research: Use firecrawl to fetch framework-specific docs
  - Research: Use exa to search "React best practices 2024"
  - Write: 5 agent files (backend-api, frontend-react, frontend-vue, mobile-ios, mobile-android)
  - Write: 5 agent dossiers
  - Write: 25 route fixtures (5 per agent)

Subagent 18: Engineering Agent Architect (Database, Performance, Testing)
  - Research: Use firecrawl to fetch database optimization guides
  - Research: Use exa to search "testing pyramid best practices"
  - Write: 5 agent files (database-design, database-optimization, performance-profiling, testing-unit, testing-integration)
  - Write: 5 agent dossiers
  - Write: 25 route fixtures

Subagent 19: Engineering Agent Architect (Migration, Refactoring, Workflow)
  - Research: Use firecrawl to fetch code migration strategies
  - Research: Use exa to search "refactoring patterns"
  - Write: 4 agent files (testing-e2e, code-migration, refactoring, dev-workflow)
  - Write: 4 agent dossiers
  - Write: 20 route fixtures
```

**Validation:**
- Each agent has dossier score ≥80
- Each agent has 5+ route fixtures
- Each agent maps to engineering skills
- `npm run validate` passes
- Route eval remains ≥95%

**Dependencies:** Wave 7B complete

---

### Stage 12: Engineering Domain - Skills (26 new skills)
**Inputs:**
- 8 foundational skills from Stage 2
- 14 new agents from Stage 11
- Target: 34 total engineering skills

**Outputs:**
- 26 new skill files covering:
  - Framework-specific skills (React hooks, Vue composition, Swift UI, Kotlin coroutines)
  - Database skills (schema migration, index optimization, query analysis)
  - Testing skills (test coverage analysis, flaky test detection, test data generation)
  - Tool-specific skills (git bisect, grep patterns, IDE shortcuts)

**Subagent Assignment:**
```
Subagent 20: Engineering Skill Writer (Framework Skills - 10 skills)
  - Write: React hooks, Vue composition, Swift UI, Kotlin coroutines, etc.
  - Write: 10 skill dossiers
  - Write: 30 skill fixtures

Subagent 21: Engineering Skill Writer (Database & Testing Skills - 10 skills)
  - Write: Schema migration, index optimization, test coverage, etc.
  - Write: 10 skill dossiers
  - Write: 30 skill fixtures

Subagent 22: Engineering Skill Writer (Tool & Workflow Skills - 6 skills)
  - Write: Git bisect, grep patterns, IDE shortcuts, etc.
  - Write: 6 skill dossiers
  - Write: 18 skill fixtures
```

**Validation:**
- Each skill maps to at least 1 engineering agent
- Each skill has 3+ fixtures
- All dossiers score ≥80
- Skill eval passes

**Dependencies:** Stage 11 complete

---

### Stage 13: Engineering Domain - Workflows (7 new workflows)
**Inputs:**
- Existing 5 engineering workflows
- 20 engineering agents
- 34 engineering skills
- Target: 12 total engineering workflows

**Outputs:**
- 7 new workflow files:
  1. `engineering/frontend-component-creation.json`
  2. `engineering/backend-api-implementation.json`
  3. `engineering/database-migration.json`
  4. `engineering/test-suite-expansion.json`
  5. `engineering/performance-optimization.json`
  6. `engineering/code-migration-execution.json`
  7. `engineering/refactoring-campaign.json`

**Subagent Assignment:**
```
Subagent 23: Engineering Workflow Architect
  - Write: 7 workflow JSON files
  - Write: 7 workflow dossiers
  - Write: 14 workflow fixtures (2 per workflow)
  - Map workflows to agents and skills
```

**Validation:**
- Each workflow has primary agent and participants
- Each workflow has success criteria and rollback plan
- Each workflow has 2+ fixtures
- Workflow eval passes

**Dependencies:** Stage 12 complete

---

### Stage 14: Platform Domain - Agents (10 new agents)
**Inputs:**
- Domain dossier from Stage 7
- Existing 5 platform agents
- Target: 15 total platform agents

**Outputs:**
- 10 new agent files:
  1. `cloud-aws.md` - AWS infrastructure
  2. `cloud-gcp.md` - GCP infrastructure
  3. `cloud-azure.md` - Azure infrastructure
  4. `kubernetes-ops.md` - Kubernetes operations
  5. `terraform-modules.md` - Terraform module development
  6. `monitoring-setup.md` - Monitoring stack setup
  7. `logging-analysis.md` - Log analysis and troubleshooting
  8. `release-management.md` - Release coordination
  9. `network-security.md` - Network security configuration
  10. `disaster-recovery.md` - DR planning and testing

**Subagent Assignment:**
```
Subagent 24: Platform Agent Architect (Cloud & Kubernetes - 5 agents)
  - Research: Use firecrawl to fetch AWS, GCP, Azure docs
  - Research: Use exa to search "Kubernetes operations best practices"
  - Write: 5 agent files and dossiers
  - Write: 25 route fixtures

Subagent 25: Platform Agent Architect (Monitoring, Release, Network, DR - 5 agents)
  - Research: Use firecrawl to fetch Prometheus, Grafana docs
  - Research: Use exa to search "disaster recovery planning"
  - Write: 5 agent files and dossiers
  - Write: 25 route fixtures
```

**Validation:**
- Each agent has dossier score ≥80
- Each agent has 5+ route fixtures
- Route eval remains ≥95%

**Dependencies:** Wave 7B complete

---

### Stage 15: Platform Domain - Skills (16 new skills)
**Inputs:**
- 4 foundational skills from Stage 4
- 15 platform agents
- Target: 20 total platform skills

**Outputs:**
- 16 new skill files covering cloud operations, monitoring, release management

**Subagent Assignment:**
```
Subagent 26: Platform Skill Writer
  - Write: 16 platform skill files
  - Write: 16 skill dossiers
  - Write: 48 skill fixtures
```

**Validation:**
- Each skill maps to platform agents
- All dossiers score ≥80
- Skill eval passes

**Dependencies:** Stage 14 complete

---

### Stage 16: Platform Domain - Workflows (6 new workflows)
**Inputs:**
- Existing 1 platform workflow
- 15 platform agents, 20 platform skills
- Target: 7 total platform workflows

**Outputs:**
- 6 new workflow files for cloud deployment, monitoring setup, incident response, etc.

**Subagent Assignment:**
```
Subagent 27: Platform Workflow Architect
  - Write: 6 workflow JSON files
  - Write: 6 workflow dossiers
  - Write: 12 workflow fixtures
```

**Validation:**
- Workflow eval passes
- Each workflow has rollback plan

**Dependencies:** Stage 15 complete

---

### Stage 17: Security Domain - Agents (11 new agents)
**Inputs:**
- Domain dossier from Stage 7
- Existing 5 security agents
- Target: 16 total security agents

**Outputs:**
- 11 new agent files covering:
  - Application security (appsec-reviewer, dependency-risk-agent)
  - Infrastructure security (network-security-analyst, cloud-security-reviewer)
  - Compliance (compliance-auditor, privacy-reviewer)
  - Specialized (cryptography-reviewer, incident-responder, forensics-analyst, red-team-operator, security-architect)

**Subagent Assignment:**
```
Subagent 28: Security Agent Architect
  - Research: Use firecrawl to fetch OWASP, NIST frameworks
  - Research: Use exa to search "application security review 2024"
  - Write: 11 agent files and dossiers
  - Write: 55 route fixtures
```

**Validation:**
- All security agents include high-stakes disclaimers
- Each agent has 5+ route fixtures
- Route eval remains ≥95%

**Dependencies:** Wave 7B complete

---

### Stage 18: Security Domain - Skills (20 new skills)
**Inputs:**
- 6 foundational skills from Stage 3
- 16 security agents
- Target: 26 total security skills

**Outputs:**
- 20 new skill files for security procedures

**Subagent Assignment:**
```
Subagent 29: Security Skill Writer
  - Write: 20 security skill files
  - Write: 20 skill dossiers
  - Write: 60 skill fixtures
```

**Validation:**
- All security skills include quality gates
- Skill eval passes

**Dependencies:** Stage 17 complete

---

### Stage 19: Security Domain - Workflows (6 new workflows)
**Inputs:**
- Existing 2 security workflows
- Target: 8 total security workflows

**Outputs:**
- 6 new workflow files

**Subagent Assignment:**
```
Subagent 30: Security Workflow Architect
  - Write: 6 workflow JSON files
  - Write: 6 workflow dossiers
  - Write: 12 workflow fixtures
```

**Validation:**
- Workflow eval passes

**Dependencies:** Stage 18 complete

---

### Stage 20: Data/AI, Integrations, Research, Meta-System Domains
**Inputs:**
- Domain dossiers from Stage 7
- Existing agents in each domain
- Targets: data-ai (18 agents, 28 skills, 9 workflows), integrations (14 agents, 22 skills, 8 workflows), research (13 agents, 20 skills, 6 workflows), meta-system (14 agents, 20 skills, 7 workflows)

**Outputs:**
- Complete expansion of 4 technical domains

**Subagent Assignment:**
```
Subagent 31: Data/AI Domain Architect
  - Write: 13 new agents, 27 new skills, 8 new workflows
  - Write: All dossiers and fixtures

Subagent 32: Integrations Domain Architect
  - Write: 9 new agents, 21 new skills, 7 new workflows
  - Write: All dossiers and fixtures

Subagent 33: Research Domain Architect
  - Write: 9 new agents, 19 new skills, 5 new workflows
  - Write: All dossiers and fixtures

Subagent 34: Meta-System Domain Architect
  - Write: 8 new agents, 19 new skills, 6 new workflows
  - Write: All dossiers and fixtures
```

**Validation:**
- All domains reach target counts
- All evals pass
- **Wave 7C Exit Check:** 111 agents, 170 skills, 53 workflows total

**Dependencies:** Stages 11-19 complete

---

## WAVE 7D: COMMERCIAL DOMAIN EXPANSION (Stages 21-28)

**Goal:** Expand commercial domains to 68 agents, 92 skills, 35 workflows  
**Subagents:** 12-15 parallel  
**Duration:** 5-7 days  

### Stage 21: Product-Business Domain (10 new agents, 19 new skills, 6 new workflows)
**Subagent Assignment:**
```
Subagent 35: Product-Business Domain Architect
  - Research: Use firecrawl to fetch product management frameworks
  - Research: Use exa to search "roadmap planning best practices"
  - Write: 10 agents, 19 skills, 6 workflows
  - Write: All dossiers and fixtures
```

### Stage 22: Design-Content Domain (8 new agents, 17 new skills, 5 new workflows)
**Subagent Assignment:**
```
Subagent 36: Design-Content Domain Architect
  - Research: Use firecrawl to fetch design system docs
  - Research: Use exa to search "accessibility audit best practices"
  - Write: 8 agents, 17 skills, 5 workflows
  - Write: All dossiers and fixtures
```

### Stage 23: Marketing Domain (9 new agents, 17 new skills, 6 new workflows)
**Subagent Assignment:**
```
Subagent 37: Marketing Domain Architect
  - Research: Use firecrawl to fetch marketing analytics docs
  - Research: Use exa to search "SEO best practices 2024"
  - Write: 9 agents, 17 skills, 6 workflows
  - Write: All dossiers and fixtures
```

### Stage 24: Sales Domain (9 new agents, 17 new skills, 5 new workflows)
**Subagent Assignment:**
```
Subagent 38: Sales Domain Architect
  - Research: Use firecrawl to fetch CRM documentation
  - Research: Use exa to search "sales methodology best practices"
  - Write: 9 agents, 17 skills, 5 workflows
  - Write: All dossiers and fixtures
```

### Stage 25: Startup-Ops Domain (8 new agents, 17 new skills, 4 new workflows)
**Subagent Assignment:**
```
Subagent 39: Startup-Ops Domain Architect
  - Research: Use firecrawl to fetch startup operations playbooks
  - Research: Use exa to search "fundraising best practices"
  - Write: 8 agents, 17 skills, 4 workflows
  - Write: All dossiers and fixtures
```

### Stages 26-28: Validation & Integration
**Subagent Assignment:**
```
Subagent 40: Integration Tester
  - Run all validation commands
  - Fix any schema violations
  - Ensure route eval ≥95%
  - Ensure workflow eval ≥95%
  - Ensure skill eval ≥95%
```

**Validation:**
- **Wave 7D Exit Check:** 179 agents, 262 skills, 88 workflows total

---

## WAVE 7E: REGULATED DOMAIN EXPANSION (Stages 29-36)

**Goal:** Expand regulated domains to 71 agents, 98 skills, 31 workflows  
**Subagents:** 12-15 parallel  
**Duration:** 5-7 days  

### Stage 29: Finance Domain (8 new agents, 17 new skills, 6 new workflows)
**Subagent Assignment:**
```
Subagent 41: Finance Domain Architect
  - Research: Use firecrawl to fetch accounting standards
  - Research: Use exa to search "financial forecasting best practices"
  - Write: 8 agents, 17 skills, 6 workflows
  - Include: Disclaimers and human-review gates on all content
  - Write: All dossiers and fixtures
```

### Stage 30: Legal-Compliance Domain (9 new agents, 17 new skills, 5 new workflows)
**Subagent Assignment:**
```
Subagent 42: Legal-Compliance Domain Architect
  - Research: Use firecrawl to fetch legal tech documentation
  - Research: Use exa to search "contract review best practices"
  - Write: 9 agents, 17 skills, 5 workflows
  - Include: Disclaimers and escalation triggers
  - Write: All dossiers and fixtures
```

### Stage 31: HR Domain (7 new agents, 15 new skills, 4 new workflows)
**Subagent Assignment:**
```
Subagent 43: HR Domain Architect
  - Research: Use firecrawl to fetch HR compliance docs
  - Research: Use exa to search "hiring best practices 2024"
  - Write: 7 agents, 15 skills, 4 workflows
  - Include: Disclaimers and policy gates
  - Write: All dossiers and fixtures
```

### Stage 32: Healthcare Domain (8 new agents, 17 new skills, 4 new workflows)
**Subagent Assignment:**
```
Subagent 44: Healthcare Domain Architect
  - Research: Use firecrawl to fetch HIPAA documentation
  - Research: Use exa to search "clinical decision support systems"
  - Write: 8 agents, 17 skills, 4 workflows
  - Include: High-stakes disclaimers and clinician handoff
  - Write: All dossiers and fixtures
```

### Stage 33: Education Domain (7 new agents, 13 new skills, 3 new workflows)
**Subagent Assignment:**
```
Subagent 45: Education Domain Architect
  - Research: Use firecrawl to fetch FERPA documentation
  - Research: Use exa to search "learning design best practices"
  - Write: 7 agents, 13 skills, 3 workflows
  - Include: Disclaimers and age-appropriate gates
  - Write: All dossiers and fixtures
```

### Stage 34: Manufacturing Domain (7 new agents, 13 new skills, 3 new workflows)
**Subagent Assignment:**
```
Subagent 46: Manufacturing Domain Architect
  - Research: Use firecrawl to fetch ISO standards
  - Research: Use exa to search "quality management systems"
  - Write: 7 agents, 13 skills, 3 workflows
  - Include: Safety disclaimers and escalation triggers
  - Write: All dossiers and fixtures
```

### Stages 35-36: Validation & Integration
**Subagent Assignment:**
```
Subagent 47: Regulated Domain Validator
  - Verify all regulated content has disclaimers
  - Verify all high-stakes workflows have escalation triggers
  - Run all validation commands
  - Fix any policy violations
```

**Validation:**
- **Wave 7E Exit Check:** 250 agents, 360 skills, 119 workflows total

---

## WAVE 7F: KNOWLEDGE PACKS & CONNECTORS (Stages 37-39)

**Goal:** Add knowledge packs and expand connectors to 30+  
**Subagents:** 8-10 parallel  
**Duration:** 3-5 days  

### Stage 37: Knowledge Pack Infrastructure
**Outputs:**
- `registry/knowledge-packs.json`
- `packages/yes-schema/schemas/knowledge-pack.schema.json`
- `content/knowledge/` directory structure

**Subagent Assignment:**
```
Subagent 48: Knowledge Pack Infrastructure Engineer
  - Create knowledge pack schema
  - Create registry file
  - Set up directory structure
```

### Stage 38: Knowledge Packs (16 packs)
**Outputs:**
- 16 knowledge pack files covering all domains

**Subagent Assignment:**
```
Subagent 49: Knowledge Pack Writer (Technical - 8 packs)
  - Write: Engineering, platform, security, data-ai, integrations, research, meta-system, startup-ops packs
  - Write: 8 knowledge pack dossiers

Subagent 50: Knowledge Pack Writer (Commercial & Regulated - 8 packs)
  - Write: Product-business, design-content, marketing, sales, finance, legal-compliance, hr, healthcare packs
  - Write: 8 knowledge pack dossiers
```

### Stage 39: Connector Expansion (14 new connectors)
**Outputs:**
- 14 new connector declarations in `registry/mcps.json`
- Connector documentation and fallback behavior

**Subagent Assignment:**
```
Subagent 51: Connector Architect
  - Add: HubSpot, Salesforce, Jira, Linear, Slack, Mixpanel, and 8 more
  - Write: Connector documentation
  - Define: Fallback behavior for disabled connectors
  - Map: Connectors to agents and workflows
```

**Validation:**
- **Wave 7F Exit Check:** 30+ connectors, 16 knowledge packs

---

## WAVE 7G: FIXTURE SCALE & EVALUATION (Stages 40-41)

**Goal:** Scale fixtures to 1500+ and ensure all evals pass  
**Subagents:** 10-12 parallel  
**Duration:** 4-6 days  

### Stage 40: Route Fixture Scale (437 → 1500)
**Outputs:**
- 1063 new route fixtures across all domains
- Hard negative fixtures (ambiguous, wrong-domain, high-stakes unsafe)

**Subagent Assignment:**
```
Subagent 52: Fixture Writer (Technical Domains - 400 fixtures)
  - Write: 400 route fixtures for engineering, platform, security, data-ai, integrations, research, meta-system
  - Include: 50 hard negative fixtures

Subagent 53: Fixture Writer (Commercial Domains - 350 fixtures)
  - Write: 350 route fixtures for product-business, design-content, marketing, sales, startup-ops
  - Include: 40 hard negative fixtures

Subagent 54: Fixture Writer (Regulated Domains - 313 fixtures)
  - Write: 313 route fixtures for finance, legal-compliance, hr, healthcare, education, manufacturing
  - Include: 40 hard negative fixtures with safe refusal examples
```

### Stage 41: Skill & Workflow Fixture Scale
**Outputs:**
- 1077 skill fixtures (3 per skill)
- 192 workflow fixtures (2 per workflow)

**Subagent Assignment:**
```
Subagent 55: Skill Fixture Writer (500 fixtures)
Subagent 56: Skill Fixture Writer (577 fixtures)
Subagent 57: Workflow Fixture Writer (192 fixtures)
```

**Validation:**
- **Wave 7G Exit Check:** 1500+ route fixtures, all evals pass

---

## WAVE 7H: ACCEPTANCE FREEZE (Stage 42)

**Goal:** Final validation and acceptance report  
**Subagents:** 3-5 parallel  
**Duration:** 1-2 days  

### Stage 42: Acceptance Freeze
**Outputs:**
- `reports/phase8-acceptance.md` - Final acceptance report
- Updated `README.md`
- Updated architecture docs

**Subagent Assignment:**
```
Subagent 58: Acceptance Curator
  - Run: All validation commands
  - Generate: Phase 8 acceptance report
  - Update: README.md with final counts
  - Update: Architecture docs where needed
  - Verify: Host bundle exports for claude, codex, opencode, mcp
```

**Validation:**
- **Final Exit Check:**
  - 250+ agents ✓
  - 360+ skills ✓
  - 119+ workflows ✓
  - 30+ connectors ✓
  - 1500+ route fixtures ✓
  - 100% dossier coverage ✓
  - All evals pass ✓
  - Boot cost ≤180 tokens ✓

---

## SUBAGENT SUMMARY

**Total Subagents:** 58 unique subagent assignments across 42 stages

**Subagent Roles:**
- Schema/Infrastructure Engineers: 6
- Domain Researchers: 16
- Agent Architects: 12
- Skill Writers: 10
- Workflow Architects: 8
- Fixture Writers: 6

**Parallel Execution Strategy:**
- Wave 7A: 5-8 subagents (sequential stages)
- Wave 7B: 8-12 subagents (parallel domain research)
- Wave 7C: 15-20 subagents (parallel domain expansion)
- Wave 7D: 12-15 subagents (parallel domain expansion)
- Wave 7E: 12-15 subagents (parallel domain expansion)
- Wave 7F: 8-10 subagents (parallel infrastructure)
- Wave 7G: 10-12 subagents (parallel fixture writing)
- Wave 7H: 3-5 subagents (sequential validation)

---

## TOOL USAGE STRATEGY

**Firecrawl:**
- Fetch official documentation (framework docs, API docs, standards)
- Scrape GitHub repositories for patterns and examples
- Extract content from vendor documentation sites

**Exa:**
- Search for best practices and methodologies
- Find recent articles and guides (2024-2026)
- Discover domain-specific resources

**Fetch:**
- Get specific documentation pages
- Retrieve API specifications
- Download standards and frameworks

**Research Protocol:**
1. Use firecrawl for comprehensive documentation scraping
2. Use exa for targeted searches and recent content
3. Use fetch for specific pages and API docs
4. Cross-reference multiple sources for validation
5. Prioritize official docs and high-quality repositories

---

## VALIDATION CHECKPOINTS

**After Each Stage:**
- `npm run validate` passes
- No schema violations
- Dossier scores ≥80

**After Each Wave:**
- Route eval ≥95%
- Workflow eval ≥95%
- Skill eval ≥95%
- Boot cost ≤180 tokens

**Final Acceptance:**
- All target counts met
- 100% dossier coverage
- All evals pass
- Host bundles export successfully

---

## EXECUTION TIMELINE

**Total Duration:** 30-42 days (with parallel execution)

- Wave 7A: Days 1-5
- Wave 7B: Days 6-8
- Wave 7C: Days 9-18
- Wave 7D: Days 19-25
- Wave 7E: Days 26-32
- Wave 7F: Days 33-37
- Wave 7G: Days 38-43
- Wave 7H: Days 44-45

**Critical Path:** 7A → 7B → 7C → 7G → 7H (20-28 days minimum)

---

## RISK MITIGATION

**Risk 1: Dossier Quality**
- Mitigation: Use multiple research tools per dossier
- Fallback: Accept dossiers with score ≥75 if high-stakes sources are strong

**Risk 2: Fixture Coverage**
- Mitigation: Generate fixtures incrementally, validate after each batch
- Fallback: Reduce fixture target to 1200 if quality suffers

**Risk 3: Eval Degradation**
- Mitigation: Run evals after each wave, fix issues immediately
- Fallback: Adjust routing thresholds if needed (minimum 90%)

**Risk 4: Boot Cost Creep**
- Mitigation: Monitor boot cost after each stage
- Fallback: Optimize route table compression if needed

---

## CONCLUSION

This plan provides a complete, stage-by-stage execution guide for Phase 8 longtail expansion. Each stage has clear inputs, outputs, subagent assignments, and validation checkpoints. The plan leverages all available research tools (firecrawl, exa, fetch) and uses 58 subagents across 42 stages to achieve the target state of 250 agents, 360 skills, and 119 workflows.

**Ready for execution upon user approval.**
