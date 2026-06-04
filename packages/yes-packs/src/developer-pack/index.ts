import { PackDefinition } from "@yes-human/core";

export const developerPack: PackDefinition = {
  name: "developer-pack",
  description: "A pack containing workflows and skills for standard developer tasks.",
  workflows: [
    {
      id: "developer.code-review",
      name: "Code Review",
      description: "Review source code for styling, quality, and typical bugs",
      triggerPhrases: [
        "review code",
        "review this code",
        "code review",
        "review code for bugs",
      ],
      requiredSkills: ["code-reviewer"],
      expectedInput: "Source files or diff content",
      expectedOutput: "Review report with style comments and suggested improvements",
      traceSteps: ["read-source-files", "analyze-code-style", "generate-review-report"],
      safetyNotes: "Do not upload sensitive credentials in the source code."
    },
    {
      id: "developer.bug-fix",
      name: "Bug Fixer",
      description: "Analyze error descriptions and propose patches",
      triggerPhrases: [
        "bug fix",
        "debug error",
        "bug",
        "fix this error",
        "fix error",
        "fix this bug",
      ],
      requiredSkills: ["bug-fixer"],
      expectedInput: "Error logs, traces, or code context",
      expectedOutput: "Root cause explanation and code patch suggestions",
      traceSteps: ["parse-logs", "locate-vulnerability", "generate-patch"],
      safetyNotes: "Verify patches manually before merging into main branches."
    },
    {
      id: "developer.explain-code",
      name: "Explain Code",
      description: "Examine complex code logic and provide details",
      triggerPhrases: [
        "explain code",
        "how does this code work",
        "code walkthrough",
        "explain what this function does",
        "explain this function",
        "explain code logic",
      ],
      requiredSkills: ["code-explainer"],
      expectedInput: "Source code block",
      expectedOutput: "Step-by-step description of data flows and function purposes",
      traceSteps: ["parse-code-structure", "trace-data-flow", "generate-explanation"],
      safetyNotes: "Keep definitions local to limit context usage."
    },
    {
      id: "developer.generate-tests",
      name: "Generate Tests",
      description: "Generate unit and integration tests automatically",
      triggerPhrases: [
        "generate tests",
        "write unit tests",
        "test generator",
        "write tests",
        "write tests for this module",
      ],
      requiredSkills: ["test-generator"],
      expectedInput: "Function or class implementations",
      expectedOutput: "Fenced unit test files in target language",
      traceSteps: ["identify-test-cases", "write-test-assertions", "validate-test-coverage"],
      safetyNotes: "Confirm mock dependencies match actual system behaviors."
    },
    {
      id: "developer.security-review",
      name: "Security Review",
      description: "Check source files for secrets leak, vulnerabilities, or injection bugs",
      triggerPhrases: [
        "security review",
        "audit code for security issues",
        "check secrets",
        "check this code for security issues",
        "security issues",
        "audit code for security",
      ],
      requiredSkills: ["security-auditor"],
      expectedInput: "Application source files",
      expectedOutput: "Vulnerability list ranked by severity",
      traceSteps: ["scan-secrets", "check-injection-vectors", "assess-owasp-vulnerabilities"],
      safetyNotes: "Always review security scans using secondary verified pipelines."
    }
  ],
  skills: [
    { id: "code-reviewer", name: "Code Reviewer", description: "Analyzes styling, logic correctness, and clean architecture rules." },
    { id: "bug-fixer", name: "Bug Fixer", description: "Proposes targeted hotfixes for compilation or runtime defects." },
    { id: "code-explainer", name: "Code Explainer", description: "Translates syntax trees into simple plain-language logs." },
    { id: "test-generator", name: "Test Generator", description: "Creates test assertions for edge cases and branch coverage." },
    { id: "security-auditor", name: "Security Auditor", description: "Detects secrets, injections, and insecure protocol usages." }
  ]
};
