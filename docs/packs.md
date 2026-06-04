# Workflow Packs

A **Pack** in `yes-human` is a self-contained bundle of workflows and skills designed for a specific domain. Bundling related workflows ensures clean routing scopes and reduces token waste by only loading necessary contexts.

---

## Built-in Packs

### 1. Default Pack (`defaultPack`)
A general-purpose pack featuring 10 lightweight utility workflows. Designed for standard tasks that do not fit specialized categories.
* **Workflows**: Code Review, Summarize Document, Extract Tasks, Generate Plan, Debug Error, Explain Code, Write Email, Create Business Plan, Check Security Issue, Generate Report.

### 2. Developer Pack (`developerPack`)
Engineered for software development lifecycles.
* **Workflows**:
  * `developer.code-review`: Triggers on "review code", "code review".
  * `developer.bug-fix`: Triggers on "bug fix", "fix this error".
  * `developer.explain-code`: Triggers on "explain code", "code walkthrough".
  * `developer.generate-tests`: Triggers on "generate tests", "write unit tests".
  * `developer.security-review`: Triggers on "security review", "check secrets".

### 3. Document Pack (`documentPack`)
Tailored for document ingestion and text processing.
* **Workflows**: Summarize Document (`document.summarize-document`), Extract Tasks (`document.extract-tasks`), Convert Notes to Report (`document.convert-notes-to-report`), Create Outline (`document.create-outline`), Compare Documents (`document.compare-documents`).

### 4. Business Pack (`businessPack`)
Designed for strategy outlines and corporate planning.
* **Workflows**: Business Plan (`business.business-plan`), Financial Plan (`business.financial-plan`), Pitch Deck Outline (`business.pitch-deck-outline`), Market Analysis (`business.market-analysis`), Pricing Strategy (`business.pricing-strategy`).

### 5. Security Pack (`securityPack`)
Enforces secure code audit gates.
* **Workflows**: Prompt Injection Check (`security.prompt-injection-check`), Dependency Risk Review (`security.dependency-risk-review`), Secrets Detection (`security.secrets-detection`), Auth Flow Review (`security.auth-flow-review`), API Security Review (`security.api-security-review`).

### 6. Startup Pack (`startupPack`)
Facilitates rapid product scoping and go-to-market cycles.
* **Workflows**: PRD Generator (`startup.prd-generator`), Feature Roadmap (`startup.feature-roadmap`), Investor Summary (`startup.investor-summary`), Launch Checklist (`startup.launch-checklist`), Product Positioning (`startup.product-positioning`).

---

## Pack Schema

Every pack must conform to the `PackDefinition` TypeScript schema:

```typescript
export interface PackDefinition {
  name: string; // Unique identifier of the pack
  description: string; // Summary of capabilities
  workflows: WorkflowDefinition[]; // Workflows matching intents
  skills: SkillDefinition[]; // Skills supporting workflows
}

export interface WorkflowDefinition {
  id: string; // e.g. "packname.workflow-slug"
  name: string;
  description: string;
  triggerPhrases: string[]; // Matching trigger intents
  requiredSkills: string[]; // Skill IDs required for execution
  expectedInput: string;
  expectedOutput: string;
  traceSteps: string[]; // Sequential step names
  safetyNotes?: string;
}

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
}
```

---

## Creating a Custom Pack

You can write and register custom packs dynamically in your code:

```javascript
import { createRouter } from "@yes-human/core";

// 1. Define custom pack matching the schema
const customMarketingPack = {
  name: "marketing-pack",
  description: "Social media and marketing automation workflows",
  workflows: [
    {
      id: "marketing.write-ad-copy",
      name: "Write Ad Copy",
      description: "Generates advertising copy for campaigns",
      triggerPhrases: ["write ad copy", "generate marketing text"],
      requiredSkills: ["copywriter"],
      expectedInput: "Product name and target audience",
      expectedOutput: "3 variants of ad copy text",
      traceSteps: ["analyze-keywords", "generate-variants", "format-ad-copy"]
    }
  ],
  skills: [
    {
      id: "copywriter",
      name: "Copywriter",
      description: "Generates persuasive short-form content."
    }
  ]
};

// 2. Initialize router with custom pack
const router = createRouter({
  packs: [customMarketingPack]
});
```
