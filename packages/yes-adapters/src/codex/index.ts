import * as fs from "fs";
import * as path from "path";
import { WorkflowDefinition } from "@yes-human/core";

function getCodexInstructions(slug: string, w: WorkflowDefinition): string {
  let purpose = "";
  let whenToUse = "";
  let workflowSteps = "";
  let inputExpectations = "";
  let outputExpectations = "";
  let testingChecklist = "";
  let safetyQualityRules = "";

  switch (slug) {
    case "code-review":
      purpose = "Review source code changes for styling consistency, architectural alignment, code smells, and potential logic errors.";
      whenToUse = "Triggered when a developer requests a review of their changes, when pull requests are created, or when automated quality gates are run.";
      workflowSteps = w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Follow systematic review guidelines for code quality.`).join("\n");
      inputExpectations = w.expectedInput || "Source files or diff content";
      outputExpectations = w.expectedOutput || "Review report with style comments and suggested improvements";
      testingChecklist = "* Instruct the developer to execute test suites locally: `npm run test` or equivalent.\n* Ensure code builds cleanly: `npm run build` before submitting changes.";
      safetyQualityRules = "* NEVER output mock placeholders; write complete suggested fix patches.\n* Do not expose proprietary API tokens or credentials in the output review comments.\n* Include a disclaimer that all structural suggestions require final review by a human developer.";
      break;

    case "bug-fix":
      purpose = "Analyze execution trace errors, stack logs, or bug descriptions, determine the root cause, and formulate targeted patches.";
      whenToUse = "Triggered when tests fail, runtime crashes occur, or when error logs are supplied by developers or automated monitoring systems.";
      workflowSteps = w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Locate errors and construct targeted code patches.`).join("\n");
      inputExpectations = w.expectedInput || "Error logs, traces, or code context";
      outputExpectations = w.expectedOutput || "Root cause explanation and code patch suggestions";
      testingChecklist = "* Verify the patch reproduces and resolves the crash case locally.\n* Write a regression test case demonstrating the fixed state.";
      safetyQualityRules = "* Output complete drop-in replacement diff blocks rather than incomplete code snippets.\n* Ensure variable renames do not introduce compiler warnings.";
      break;

    case "security-review":
      purpose = "Audit source code and dependency structures for security flaws, prompt injection jailbreaks, and credentials leakage.";
      whenToUse = "Triggered before release, on changes to authentication logic, or during automated security scanning cycles.";
      workflowSteps = w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Perform scans and report compliance issues.`).join("\n");
      inputExpectations = w.expectedInput || "Application source files";
      outputExpectations = w.expectedOutput || "Vulnerability list ranked by severity";
      testingChecklist = "* Audit dependency packages using security scanner commands: `npm audit` or similar.\n* Test input fields with dummy SQL or jailbreak prompts to check validation boundaries.";
      safetyQualityRules = "* Redact all leaked credentials immediately in the report logs.\n* Ensure defensive checks fail closed.";
      break;

    case "test-generator":
      purpose = "Generate comprehensive automated unit and integration tests to verify code paths and boundary cases.";
      whenToUse = "Triggered when implementing new features, modifying existing methods, or expanding code coverage metrics.";
      workflowSteps = w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Write test suites and verify execution coverage.`).join("\n");
      inputExpectations = w.expectedInput || "Function or class implementations";
      outputExpectations = w.expectedOutput || "Fenced unit test files in target language";
      testingChecklist = "* Run the test runner synchronously to check for syntax and timeout issues.\n* Assert both positive outcomes and expected error throws.";
      safetyQualityRules = "* Ensure mock fixtures do not make real network or database calls.\n* Write clear, readable test descriptions following the Arrange-Act-Assert pattern.";
      break;

    default:
      purpose = w.description || `Workflow for ${slug}`;
      whenToUse = `Triggered for standard ${slug} operations.`;
      workflowSteps = w.traceSteps.map((step, idx) => `${idx + 1}. **${step}**: Execute step actions.`).join("\n");
      inputExpectations = w.expectedInput || "Context data";
      outputExpectations = w.expectedOutput || "Result output";
      testingChecklist = "* Verify workflow execution outcome against expected outputs.";
      safetyQualityRules = "* Maintain strict output format as defined in the expected outputs.";
      break;
  }

  return `
## Purpose
${purpose}

## When to Use
${whenToUse}

## Workflow Steps
${workflowSteps}

## Input Expectations
- ${inputExpectations}

## Output Expectations
- ${outputExpectations}

## Testing/Checklist
${testingChecklist}

## Safety/Quality Rules
${safetyQualityRules}
`;
}

export function exportToCodex(workflows: WorkflowDefinition[], outputDir: string): void {
  if (!workflows || !Array.isArray(workflows)) {
    throw new Error("Invalid workflows: array required");
  }
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
  const targets = ["code-review", "bug-fix", "security-review", "test-generator"];

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
      traceSteps: ["analyze", "process", "complete"],
      safetyNotes: ""
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

${matchingWf.safetyNotes ? `> [!IMPORTANT]\n> **Safety Notes**: ${matchingWf.safetyNotes}` : ""}
`;
    fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillContent, "utf8");
  }
}
