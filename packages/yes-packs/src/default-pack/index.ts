import { PackDefinition } from "@yes-human/core";

export const defaultPack: PackDefinition = {
  name: "default-pack",
  description: "A small default pack containing 10 common workflows for general and offline AI tasks.",
  workflows: [
    {
      id: "default.code-review",
      name: "Code Review",
      description: "Review files for bugs, code quality, and security risks",
      triggerPhrases: ["code review", "review code", "check code"],
      requiredSkills: ["general-reviewer"],
      expectedInput: "Source files or code block",
      expectedOutput: "Review logs showing quality and security status",
      traceSteps: ["read-code", "evaluate-quality", "format-review"],
      safetyNotes: "Always review outputs manually before applying."
    },
    {
      id: "default.summarize-document",
      name: "Summarize Document",
      description: "Extract summary and highlights from document",
      triggerPhrases: ["summarize document", "summarize text", "make document summary"],
      requiredSkills: ["general-summarizer"],
      expectedInput: "Text content",
      expectedOutput: "Executive summary list",
      traceSteps: ["parse-sections", "generate-summary"],
      safetyNotes: "Double-check numerical details inside summaries."
    },
    {
      id: "default.extract-tasks",
      name: "Extract Tasks",
      description: "Extract action items and checklists from notes",
      triggerPhrases: ["extract tasks", "find tasks", "get action items"],
      requiredSkills: ["general-extractor"],
      expectedInput: "Text notes",
      expectedOutput: "A checklists array of tasks",
      traceSteps: ["locate-tasks", "compile-todo-list"],
      safetyNotes: "Assure deadlines are aligned."
    },
    {
      id: "default.generate-plan",
      name: "Generate Plan",
      description: "Create structured implementation project plans",
      triggerPhrases: ["generate plan", "create project plan", "make implementation plan"],
      requiredSkills: ["general-planner"],
      expectedInput: "Project description and requirements",
      expectedOutput: "Chronological plan listing phases, steps, and owners",
      traceSteps: ["structure-phases", "define-deliverables", "format-plan"],
      safetyNotes: "Align plan targets with resources."
    },
    {
      id: "default.debug-error",
      name: "Debug Error",
      description: "Diagnose stack traces and compile errors",
      triggerPhrases: ["debug error", "fix my error", "diagnose crash"],
      requiredSkills: ["general-debugger"],
      expectedInput: "Error logs or trace",
      expectedOutput: "Fix suggestion explaining the root cause",
      traceSteps: ["parse-stack-trace", "find-root-cause", "suggest-remediation"],
      safetyNotes: "Verify fixes locally."
    },
    {
      id: "default.explain-code",
      name: "Explain Code",
      description: "Generate a plain-text logic walkthrough",
      triggerPhrases: ["explain code", "walkthrough this code", "code explanation"],
      requiredSkills: ["general-explainer"],
      expectedInput: "Source files block",
      expectedOutput: "Easy description explaining logical flow",
      traceSteps: ["identify-entrypoints", "trace-logic", "explain-structure"],
      safetyNotes: "Check context capacity limit."
    },
    {
      id: "default.write-email",
      name: "Write Email",
      description: "Drafts high-quality correspondence emails",
      triggerPhrases: ["write email", "draft email", "send message draft"],
      requiredSkills: ["general-writer"],
      expectedInput: "Recipient and main points list",
      expectedOutput: "Polished subject line and body email",
      traceSteps: ["establish-tone", "draft-subject", "draft-body"],
      safetyNotes: "Do not include confidential personal info."
    },
    {
      id: "default.create-business-plan",
      name: "Create Business Plan",
      description: "Generates high-level business plans outline",
      triggerPhrases: ["create business plan", "generate business plan summary"],
      requiredSkills: ["general-planner"],
      expectedInput: "Market and business details description",
      expectedOutput: "Plan listing strategy, customer segment, and pricing",
      traceSteps: ["structure-business-canvas", "compile-projections"],
      safetyNotes: "Not professional legal or financial advice."
    },
    {
      id: "default.check-security-issue",
      name: "Check Security Issue",
      description: "Detect basic vulnerability classes inside code",
      triggerPhrases: ["check security issue", "scan security", "detect security risks"],
      requiredSkills: ["general-security-scanner"],
      expectedInput: "Source code block",
      expectedOutput: "Risk analysis report ranking security issues",
      traceSteps: ["scan-vulnerability-spots", "evaluate-risks", "compile-report"],
      safetyNotes: "Supplement with static security analyzers."
    },
    {
      id: "default.generate-report",
      name: "Generate Report",
      description: "Formats structured texts into reports with layout",
      triggerPhrases: ["generate report", "make report", "write report structure"],
      requiredSkills: ["general-writer"],
      expectedInput: "Data logs or raw text files",
      expectedOutput: "Structured formal document with outline",
      traceSteps: ["collate-points", "apply-headers", "format-report"],
      safetyNotes: "Confirm data accuracy in compilation."
    }
  ],
  skills: [
    { id: "general-reviewer", name: "General Reviewer", description: "Performs code style and logic reviews." },
    { id: "general-summarizer", name: "General Summarizer", description: "Condenses textual content." },
    { id: "general-extractor", name: "General Extractor", description: "Pulls key metrics, data, or checklists." },
    { id: "general-planner", name: "General Planner", description: "Drafts project schedules and canvas models." },
    { id: "general-debugger", name: "General Debugger", description: "Parses logs and recommends error corrections." },
    { id: "general-explainer", name: "General Explainer", description: "Explains syntax structures in plain-text logs." },
    { id: "general-writer", name: "General Writer", description: "Formulates text drafts and communications." },
    { id: "general-security-scanner", name: "General Security Scanner", description: "Detects passwords and basic vulnerabilities." }
  ]
};
