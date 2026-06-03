---
quality_gate: production
id: meta-system.agent-absorption
name: Safe Agent Absorption from External Sources
version: 1.0.0
domain: meta-system
category: meta-system.plugin-absorption
purpose: Safely absorb external agents from GitHub repositories or local sources while maintaining quality and security standards.
summary: Systematic approach to evaluating, validating, and integrating external agents into the yes-human ecosystem.
triggers:
  - absorb agent
  - import agent
  - add external agent
  - integrate agent from GitHub
  - absorb plugin
activation_triggers:
  - integrate external plugin
  - import agent from repository
  - absorb this agent from GitHub
  - absorb this agent
  - import from repo
  - add agent from
prerequisites:
  - access to external source
  - understanding of yes-human agent schema
  - license verification tools
inputs:
  - source_location (GitHub URL or local path)
  - agent_files
  - license_info
  - source_metadata
steps:
  - Fetch and inspect external agent files
  - Verify license compatibility (MIT, Apache-2.0, BSD preferred)
  - Validate agent schema compliance
  - Check for security issues (hardcoded secrets, malicious code)
  - Assess agent quality (documentation, examples, tests)
  - Test agent in isolation
  - Create absorption report
  - Integrate into yes-human registry
  - Update category packs and routes
  - Document absorption in provenance
outputs:
  - absorption_report
  - validated_agent
  - integration_changes
  - provenance_record
tools:
  - shell.readonly (fetch, test)
  - filesystem.read (inspect files)
  - filesystem.write (integrate agent)
  - web.search (verify source)
quality_gates:
  - License is compatible
  - Schema validation passes
  - No security issues
  - Quality score >= 80
  - Tests pass
failure_modes:
  - Incompatible license
  - Schema violations
  - Security vulnerabilities
  - Poor documentation
  - Missing tests
handoffs:
  - security.secret-scan-triage (for security review)
  - meta-system.route-evaluation (for route testing)
source_references:
  - ref.github.agent-absorption-best-practices.2026-06-01
allowed_agents:
  - meta-system.plugin-absorber
  - meta-system.source-miner
allowed_workflows:
  - meta-system.source-mine-and-dossier
status: active
budget_band: standard
rollback:
  - Remove absorbed agent from registry
  - Revert category pack changes
  - Update provenance record
validators:
  - skill.validator
---

## Trigger
Use this skill when absorbing external agents from GitHub repositories, local sources, or plugin packages into the yes-human ecosystem.

## Prerequisites
- Access to the external source (GitHub URL, local path, or package)
- Understanding of yes-human agent schema and requirements
- License verification tools available

## Steps
1. **Fetch and Inspect**:
   - Clone repository or copy local files
   - Identify agent files (AGENT.md, skills, workflows)
   - Check file structure and organization
   - Review README and documentation
2. **Verify License**:
   - Check LICENSE file
   - Verify compatibility with MIT/Apache-2.0
   - Reject GPL, AGPL, or proprietary licenses
   - Document license in provenance
3. **Validate Schema**:
   - Parse agent frontmatter
   - Check required fields (id, name, triggers, etc.)
   - Validate against agent.schema.json
   - Fix minor schema violations if possible
4. **Security Review**:
   - Scan for hardcoded secrets (API keys, passwords)
   - Check for malicious code patterns
   - Verify no network calls to suspicious endpoints
   - Review file permissions and access patterns
5. **Quality Assessment**:
   - Check documentation completeness
   - Verify examples are present and working
   - Assess test coverage
   - Calculate quality score (0-100)
6. **Test in Isolation**:
   - Run agent in sandbox environment
   - Test with sample inputs
   - Verify outputs match expectations
   - Check for errors or unexpected behavior
7. **Create Absorption Report**:
   - Document source and license
   - List schema validations
   - Record security scan results
   - Include quality score
   - Note any modifications made
8. **Integrate into Registry**:
   - Copy agent files to content/agents/
   - Update registry/agents.json
   - Add to appropriate category pack
   - Generate routes for agent
9. **Update Provenance**:
   - Record source URL and commit
   - Document absorption date
   - Link to absorption report
   - Track any future updates
10. **Verify Integration**:
    - Run `npm run validate`
    - Test agent routing
    - Verify agent works in production
    - Update documentation

## Verification
- License is compatible and documented
- Schema validation passes
- Security scan is clean
- Quality score >= 80
- Agent tests pass
- Integration tests pass
- Provenance is complete

## Rollback
- Remove agent files from content/agents/
- Revert registry/agents.json changes
- Update category packs to remove agent
- Delete generated routes
- Update provenance to mark as rolled back

## Common Failures
- Absorbing agents with incompatible licenses
- Missing schema validations (broken agents)
- Not scanning for security issues
- Poor quality agents (no docs, no tests)
- Not testing in isolation first
- Incomplete provenance (can't track source)

## Examples
### Absorbing an Agent from GitHub
Input: GitHub repository with coding agent
Output:
- Source: https://github.com/example/coding-agent (MIT license)
- Schema: ✓ Valid (minor fixes applied to triggers)
- Security: ✓ Clean (no secrets, no malicious code)
- Quality: 85/100 (good docs, examples present, 80% test coverage)
- Tests: ✓ All pass in sandbox
- Integration: Added to engineering category, routes generated
- Provenance: Recorded with commit hash abc123

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
