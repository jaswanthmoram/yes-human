---
id: meta-system.fixture-writing
name: Route and Workflow Fixture Creation
version: 1.0.0
domain: meta-system
category: meta-system.evaluation
purpose: Create high-quality test fixtures for routing and workflow evaluation.
summary: Systematic approach to writing test fixtures that cover edge cases, negative examples, and real-world scenarios.
triggers:
  - write test fixtures for skill evaluation
  - create routing test fixtures for eval
  - add workflow test fixtures for testing
  - write skill test fixtures for validation
  - create evaluation test fixtures
activation_triggers:
  - write fixtures for skill eval
  - add test fixtures for skills
  - create eval test cases for skills
prerequisites:
  - understanding of agent/workflow being tested
  - access to existing fixtures for reference
inputs:
  - target_agent_or_workflow
  - fixture_count
  - fixture_types (positive, negative, edge cases)
  - existing_fixtures (optional)
steps:
  - Analyze agent/workflow triggers and capabilities
  - Identify positive test cases (should route correctly)
  - Identify negative test cases (should not route)
  - Create edge cases (ambiguous, boundary conditions)
  - Write fixtures in standard format
  - Validate fixtures against schema
  - Run fixtures through evaluation
  - Iterate based on results
outputs:
  - fixture_file (JSON format)
  - fixture_validation_report
  - evaluation_results
tools:
  - filesystem.write (create fixture files)
  - shell.readonly (run evaluations)
quality_gates:
  - All fixtures validate against schema
  - Positive cases route correctly
  - Negative cases route to fallback
  - Edge cases are documented
  - Evaluation passes
failure_modes:
  - Fixtures too similar (low coverage)
  - Missing negative examples
  - Ambiguous fixtures (multiple valid routes)
  - Fixtures not representative of real usage
  - Not testing edge cases
handoffs:
  - meta-system.route-evaluation (to run evaluation)
  - engineering.code-reviewer (to review fixtures)
source_references:
  - ref.github.test-fixture-best-practices.2026-06-01
allowed_agents:
  - meta-system.eval-runner
  - meta-system.source-miner
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Delete fixture files
  - Revert evaluation results
validators:
  - skill.validator
---

## Trigger
Use this skill when creating test fixtures for routing evaluation, workflow evaluation, or skill evaluation.

## Prerequisites
- Understanding of the agent, workflow, or skill being tested
- Access to existing fixtures for reference
- Knowledge of the evaluation framework

## Steps
1. **Analyze Target**:
   - Review agent/workflow triggers
   - Understand capabilities and limitations
   - Identify typical use cases
   - Note edge cases and failure modes
2. **Identify Positive Cases**:
   - Direct trigger matches ("code review" for code-reviewer agent)
   - Paraphrased triggers ("review this code for me")
   - Contextual triggers ("check my pull request")
   - Multi-word triggers ("perform a security audit")
3. **Identify Negative Cases**:
   - Similar but different tasks ("write code" vs "review code")
   - Out-of-scope requests ("deploy to production" for code-reviewer)
   - Ambiguous requests that should fallback
   - Requests for different domains
4. **Create Edge Cases**:
   - Boundary conditions (very short/long prompts)
   - Mixed requests (multiple tasks in one prompt)
   - Typos and misspellings
   - Non-English prompts (if supported)
   - Prompts with special characters
5. **Write Fixtures**:
   - Use standard JSON format
   - Include prompt and expected_skill/expected_workflow
   - Add category for organization
   - Document any special considerations
6. **Validate Fixtures**:
   - Check JSON syntax
   - Validate against fixture schema
   - Ensure no duplicates
   - Verify expected values are valid
7. **Run Evaluation**:
   - Execute evaluation script
   - Check accuracy metrics
   - Identify failed fixtures
   - Analyze failure patterns
8. **Iterate**:
   - Fix failed fixtures (if expectation was wrong)
   - Add more fixtures for low-coverage areas
   - Remove ambiguous fixtures
   - Re-run evaluation

## Verification
- All fixtures validate against schema
- Positive cases have >95% accuracy
- Negative cases route to fallback
- Edge cases are documented
- Overall evaluation passes threshold

## Rollback
- Delete fixture files: `rm tests/fixtures/skills/<file>.json`
- Revert any evaluation result changes

## Common Failures
- Writing fixtures that are too similar (low diversity)
- Missing negative examples (only testing happy path)
- Creating ambiguous fixtures (multiple valid interpretations)
- Not testing edge cases (only typical scenarios)
- Fixtures not representative of real user behavior
- Not iterating based on evaluation results

## Examples
### Writing Fixtures for Code Review Agent
Input: Create 10 fixtures for engineering.code-reviewer
Output:
```json
{
  "fixtures": [
    {"prompt": "review this code", "expected_skill": "engineering.code-review", "category": "positive"},
    {"prompt": "check my pull request", "expected_skill": "engineering.code-review", "category": "positive"},
    {"prompt": "perform a code audit", "expected_skill": "engineering.code-review", "category": "positive"},
    {"prompt": "write a function to sort array", "expected_skill": "null", "category": "negative"},
    {"prompt": "deploy to production", "expected_skill": "null", "category": "negative"},
    {"prompt": "fix the bug in login", "expected_skill": "engineering.build-resolver", "category": "negative"},
    {"prompt": "rvw cd", "expected_skill": "engineering.code-review", "category": "edge"},
    {"prompt": "review this code and also deploy it", "expected_skill": "engineering.code-review", "category": "edge"},
    {"prompt": "REVIEW CODE", "expected_skill": "engineering.code-review", "category": "edge"},
    {"prompt": "can you please review my code when you have time", "expected_skill": "engineering.code-review", "category": "positive"}
  ]
}
```

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
