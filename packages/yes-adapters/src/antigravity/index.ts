import * as fs from "fs";
import * as path from "path";
import { WorkflowDefinition } from "@yes-human/core";

function getAntigravityInstructions(slug: string): string {
  switch (slug) {
    case "code-review":
      return `
## Team Role: Reviewer
Reviews source code quality, compliance with monorepo standards, and verifies performance metrics.

## Protocol Steps
1. **read-code**: Inspect modified files and import structures carefully.
2. **evaluate-quality**: Assess complexity, verify correct usage of ESM paths, and check for lint errors.
3. **format-review**: Write a structured review markdown table containing suggestions and code improvements.

## Practical Testing Guidance
* Validate files using local linters: \`npm run lint\` or \`npx tsc --noEmit\`.

## Safe Final Response Rules
* NEVER propose partial fixes or stub codes; write full implementations.
`;
    case "bug-fix":
      return `
## Team Role: Builder
Resolves codebase crash logs, build failures, and exceptions cleanly.

## Protocol Steps
1. **locate-fault**: Study stack traces to find the exact line and method throwing the exception.
2. **apply-patch**: Correct faulty variable definitions, add check constraints, or fix type definitions.
3. **verify-repaired-state**: Rebuild the package and execute local regression checks.

## Practical Testing Guidance
* Run unit tests directly to confirm the bug is resolved: \`npm run test\`.

## Safe Final Response Rules
* Output complete drop-in replacement blocks to prevent copy-paste compilation errors.
`;
    case "feature-builder":
      return `
## Team Role: Builder / Architect
Scaffolds and implements new features, UI components, or utilities conforming to architecture standards.

## Protocol Steps
1. **scaffold-interface**: Design classes, parameters, and return types matching the API requirements.
2. **implement-logic**: Author strict TypeScript ESM code with correct exports and types.
3. **compile-check**: Verify code passes strict TypeScript checks and monorepo compilation rules.

## Practical Testing Guidance
* Add corresponding unit test assertions in target test directories.

## Safe Final Response Rules
* Ensure all files are production-ready without dummy indicators or TODO comments.
`;
    case "repo-analyzer":
      return `
## Team Role: Architect
Analyzes monorepo package relationships, dependencies tree, and directory structures.

## Protocol Steps
1. **audit-dependencies**: Check for version mismatches across monorepo package workspace registries.
2. **trace-cycles**: Search for circular import paths that violate clean dependency layering.
3. **propose-restructure**: Draft structural plans for packaging or refactoring modules.

## Practical Testing Guidance
* Test workspace symlink integrity using \`npm install\` at root.

## Safe Final Response Rules
* Recommend changes incrementally; separate architectural modifications into independent waves.
`;
    case "security-review":
      return `
## Team Role: Security Reviewer
Inspects source files for hardcoded secrets, input sanitization leaks, and package vulnerabilities.

## Protocol Steps
1. **scan-secrets**: Use entropy rules to find tokens or SSH keys in the source tree.
2. **audit-sanitization**: Verify that user-supplied input fields are properly checked or escaped.
3. **inspect-licenses**: Ensure that third-party library licenses comply with MIT policy limits.

## Practical Testing Guidance
* Run dependency checks: \`npm run audit:dossiers\` and \`npm audit\`.

## Safe Final Response Rules
* Redact all discovered secrets in reports; always verify security changes fail closed.
`;
    default:
      return `
## Protocol Steps
1. **Analyze**: Evaluate requirements.
2. **Execute**: Propose changes.
3. **Verify**: Test updates.
`;
  }
}

export function exportToAntigravity(workflows: WorkflowDefinition[], outputDir: string): void {
  fs.mkdirSync(outputDir, { recursive: true });

  // 1. Generate agents.md
  const agentsMdContent = `# Antigravity Agents Registry

This file maps workflows to Antigravity agents configured as a structured development team.

## Team Structure
- **Architect**: Configured via \`repo-analyzer\` and \`feature-builder\`
- **Builder**: Configured via \`bug-fix\` and \`feature-builder\`
- **Reviewer**: Configured via \`code-review\`
- **Tester**: Configured via \`test-and-validate\`
- **Security Reviewer**: Configured via \`security-review\`

## Active Workflows
${workflows.map((w) => `- **${w.name}** (\`${w.id}\`): ${w.description}`).join("\n")}

_Generated on ${new Date().toISOString()}_
`;
  fs.writeFileSync(path.join(outputDir, "agents.md"), agentsMdContent, "utf8");

  // 2. Generate skills/
  const skillsDir = path.join(outputDir, "skills");
  fs.mkdirSync(skillsDir, { recursive: true });

  const targetSkills = [
    { id: "code-review", name: "Code Review", description: "Review source code for styling, quality, and potential bugs." },
    { id: "bug-fix", name: "Bug Fix", description: "Diagnose build errors and runtime crashes and suggest repairs." },
    { id: "feature-builder", name: "Feature Builder", description: "Design and implement new feature requirements into the codebase." },
    { id: "repo-analyzer", name: "Repository Analyzer", description: "Perform static analysis and architecture reviews on the repo." },
    { id: "security-review", name: "Security Review", description: "Scans repository for credentials leak and OWASP security issues." }
  ];

  for (const skill of targetSkills) {
    const skillPath = path.join(skillsDir, skill.id);
    fs.mkdirSync(skillPath, { recursive: true });

    const instructions = getAntigravityInstructions(skill.id);

    const skillContent = `---
name: ${skill.name}
description: ${skill.description}
---

# Antigravity Skill: ${skill.name}

${skill.description}

${instructions}
`;
    fs.writeFileSync(path.join(skillPath, "SKILL.md"), skillContent, "utf8");
  }

  // 3. Generate workflows/
  const workflowsDir = path.join(outputDir, "workflows");
  fs.mkdirSync(workflowsDir, { recursive: true });

  const requiredWorkflows = [
    {
      id: "feature-build",
      name: "Feature Build Workflow",
      steps: ["analyze-requirements", "scaffold-components", "integrate-flows", "run-verifications"]
    },
    {
      id: "test-and-validate",
      name: "Test and Validate Workflow",
      steps: ["identify-test-cases", "write-assertions", "measure-coverage"]
    },
    {
      id: "debug-and-fix",
      name: "Debug and Fix Workflow",
      steps: ["locate-fault", "apply-patch", "verify-repaired-state"]
    }
  ];

  for (const wf of requiredWorkflows) {
    const wfContent = `# Workflow: ${wf.name}

Defines a sequence of tasks for the Antigravity controller plane.

## Target Execution Flow
${wf.steps.map((step, idx) => `- **Step ${idx + 1}**: \`${step}\``).join("\n")}

## Completion Gates
- Verification checklist returns clean state.
- Documentation guides updated successfully.
`;
    fs.writeFileSync(path.join(workflowsDir, `${wf.id}.md`), wfContent, "utf8");
  }
}
