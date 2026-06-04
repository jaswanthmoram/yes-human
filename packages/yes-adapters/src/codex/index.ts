import * as fs from "fs";
import * as path from "path";
import { WorkflowDefinition } from "@yes-human/core";

function getCodexInstructions(slug: string, w: WorkflowDefinition): string {
  switch (slug) {
    case "code-review":
      return `
## Purpose
Review source code changes for styling consistency, architectural alignment, code smells, and potential logic errors.

## Execution Procedure
${w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Follow systematic review guidelines for code quality.`).join("\n")}

## Practical Testing Guidance
* Instruct the developer to execute test suites locally: \`npm run test\` or equivalent.
* Ensure code builds cleanly: \`npm run build\` before submitting changes.

## Safe Final Response Rules
* NEVER output mock placeholders; write complete suggested fix patches.
* Do not expose proprietary API tokens or credentials in the output review comments.
* Include a disclaimer that all structural suggestions require final review by a human developer.
`;
    case "bug-fix":
      return `
## Purpose
Analyze execution trace errors, stack logs, or bug descriptions, determine the root cause, and formulate targeted patches.

## Execution Procedure
${w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Locate errors and construct targeted code patches.`).join("\n")}

## Practical Testing Guidance
* Verify the patch reproduces and resolves the crash case locally.
* Write a regression test case demonstrating the fixed state.

## Safe Final Response Rules
* Output complete drop-in replacement diff blocks rather than incomplete code snippets.
* Ensure variable renames do not introduce compiler warnings.
`;
    case "security-review":
    case "check-security-issue":
      return `
## Purpose
Audit source code and dependency structures for security flaws, prompt injection jailbreaks, and credentials leakage.

## Execution Procedure
${w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Perform scans and report compliance issues.`).join("\n")}

## Practical Testing Guidance
* Audit dependency packages using security scanner commands: \`npm audit\` or similar.
* Test input fields with dummy SQL or jailbreak prompts to check validation boundaries.

## Safe Final Response Rules
* Redact all leaked credentials immediately in the report logs.
* Ensure defensive checks fail closed.
`;
    case "test-generator":
    case "generate-tests":
      return `
## Purpose
Generate comprehensive automated unit and integration tests to verify code paths and boundary cases.

## Execution Procedure
${w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Write test suites and verify execution coverage.`).join("\n")}

## Practical Testing Guidance
* Run the test runner synchronously to check for syntax and timeout issues.
* Assert both positive outcomes and expected error throws.

## Safe Final Response Rules
* Ensure mock fixtures do not make real network or database calls.
* Write clear, readable test descriptions following the Arrange-Act-Assert pattern.
`;
    default:
      return `
## Purpose
${w.description}

## Execution Procedure
${w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Execute step actions.`).join("\n")}

## Practical Testing Guidance
* Verify workflow execution outcome against expected outputs.

## Safe Final Response Rules
* Maintain strict output format as defined in the expected outputs.
`;
  }
}

export function exportToCodex(workflows: WorkflowDefinition[], outputDir: string): void {
  fs.mkdirSync(outputDir, { recursive: true });

  // 1. Generate AGENTS.md
  const agentsMdContent = `# AGENTS.md — Codex Instruction Surface

This document maps Codex tasks to active yes-human agent workflows.

## Active Workflows
${workflows
  .map(
    (w) =>
      `- **${w.name}** (\`${w.id}\`): ${w.description}\n  - *Trigger Phrases*: ${w.triggerPhrases.join(
        ", "
      )}`
  )
  .join("\n")}

_Generated on ${new Date().toISOString()}_
`;
  fs.writeFileSync(path.join(outputDir, "AGENTS.md"), agentsMdContent, "utf8");

  // 2. Generate skill folders under .codex/skills
  const skillsDir = path.join(outputDir, ".codex", "skills");
  fs.mkdirSync(skillsDir, { recursive: true });

  // Standard skills required for Codex
  const targets = ["code-review", "bug-fix", "security-review", "generate-tests"];

  for (const skillSlug of targets) {
    const matchingWf = workflows.find(
      (w) => w.id.endsWith(skillSlug) || skillSlug.includes(w.id.split(".").pop() || "")
    ) || {
      id: `developer.${skillSlug}`,
      name: skillSlug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      description: `Workflow for ${skillSlug}`,
      triggerPhrases: [skillSlug.replace("-", " ")],
      requiredSkills: [skillSlug],
      expectedInput: "Context data",
      expectedOutput: "Result output",
      traceSteps: ["analyze", "process", "complete"]
    };

    const skillDir = path.join(skillsDir, skillSlug);
    fs.mkdirSync(skillDir, { recursive: true });

    const instructions = getCodexInstructions(skillSlug, matchingWf);

    const skillContent = `---
name: ${matchingWf.name}
description: ${matchingWf.description}
---

# ${matchingWf.name} Codex Skill

This skill is exported from yes-human workflow \`${matchingWf.id}\`.

${instructions}

## Required Inputs
- ${matchingWf.expectedInput}

## Expected Outputs
- ${matchingWf.expectedOutput}

${matchingWf.safetyNotes ? `> [!IMPORTANT]\n> **Safety Notes**: ${matchingWf.safetyNotes}` : ""}
`;
    fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillContent, "utf8");
  }
}
