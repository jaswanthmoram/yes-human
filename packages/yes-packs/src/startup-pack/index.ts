import { PackDefinition } from "@yes-human/core";

export const startupPack: PackDefinition = {
  name: "startup-pack",
  description: "A pack containing workflows and skills for rapid product launch, roadmaps, and alignment.",
  workflows: [
    {
      id: "startup.prd-generator",
      name: "PRD Generator",
      description: "Generates a detailed Product Requirements Document based on a feature summary",
      triggerPhrases: ["generate prd", "prd generator", "write product requirements"],
      requiredSkills: ["prd-writer"],
      expectedInput: "Feature outline, user goals, and constraints",
      expectedOutput: "A structured PRD including user stories, specs, and release criteria",
      traceSteps: ["draft-user-persona", "outline-functional-specs", "specify-release-metrics"],
      safetyNotes: "Align PRD goals with engineering feasibility and milestones."
    },
    {
      id: "startup.feature-roadmap",
      name: "Feature Roadmap",
      description: "Structures a multi-quarter product launch roadmap",
      triggerPhrases: ["feature roadmap", "product release roadmap", "make development roadmap"],
      requiredSkills: ["roadmap-planner"],
      expectedInput: "Core deliverables list and resource count",
      expectedOutput: "Timeline divided by quarters showing milestones and dependecies",
      traceSteps: ["sequence-milestones", "estimate-resource-bottlenecks", "format-gantt-outline"],
      safetyNotes: "Verify roadmap feasibility with core technical team before sharing."
    },
    {
      id: "startup.investor-summary",
      name: "Investor Summary",
      description: "Creates a concise executive summary for investors",
      triggerPhrases: ["investor summary", "startup executive summary", "generate investor report"],
      requiredSkills: ["investor-summarizer"],
      expectedInput: "Key traction metrics, business model, and problem statement",
      expectedOutput: "A 1-page investment teaser/executive summary",
      traceSteps: ["outline-problem-opportunity", "summarize-traction-metrics", "format-financial-ask"],
      safetyNotes: "Confirm all metric logs are audit-ready and true."
    },
    {
      id: "startup.launch-checklist",
      name: "Launch Checklist",
      description: "Builds a launch checklist covering ops, dev, and marketing",
      triggerPhrases: ["launch checklist", "product release checklist", "go-to-market checklist"],
      requiredSkills: ["launch-coordinator"],
      expectedInput: "Product type and launch platform description",
      expectedOutput: "A chronological checklist divided by department",
      traceSteps: ["compile-dev-readiness", "compile-marketing-readiness", "structure-ops-plan"],
      safetyNotes: "Include roll-back steps in the launch checklist for deployment issues."
    },
    {
      id: "startup.product-positioning",
      name: "Product Positioning",
      description: "Creates positioning statements and marketing taglines",
      triggerPhrases: ["product positioning", "startup marketing positioning", "tagline generator"],
      requiredSkills: ["positioning-strategist"],
      expectedInput: "Product description, target audience, and primary competitors",
      expectedOutput: "A positioning framework with value propositions and primary hooks",
      traceSteps: ["identify-differentiation", "draft-value-statements", "generate-hooks"],
      safetyNotes: "Test draft taglines on a focus group before finalizing campaigns."
    }
  ],
  skills: [
    { id: "prd-writer", name: "PRD Writer", description: "Translates product features into concrete requirements." },
    { id: "roadmap-planner", name: "Roadmap Planner", description: "Schedules milestones while accounting for resources." },
    { id: "investor-summarizer", name: "Investor Summarizer", description: "Extracts key highlights and formats teasers." },
    { id: "launch-coordinator", name: "Launch Coordinator", description: "Aggregates departmental prerequisites into a checklist." },
    { id: "positioning-strategist", name: "Positioning Strategist", description: "Formulates value messaging frameworks." }
  ]
};
