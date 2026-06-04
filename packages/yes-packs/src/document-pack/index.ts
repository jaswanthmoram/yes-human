import { PackDefinition } from "@yes-human/core";

export const documentPack: PackDefinition = {
  name: "document-pack",
  description: "A pack containing workflows and skills for document processing and analysis.",
  workflows: [
    {
      id: "document.summarize-document",
      name: "Summarize Document",
      description: "Generates a concise summary and highlights key points from a document",
      triggerPhrases: ["summarize document", "make a summary of this document", "document summary"],
      requiredSkills: ["document-summarizer"],
      expectedInput: "Text or markdown content of a document",
      expectedOutput: "An executive summary with bulleted key takeaways",
      traceSteps: ["parse-document-sections", "extract-core-arguments", "format-takeaways"],
      safetyNotes: "Always review generated summaries for accuracy before quoting."
    },
    {
      id: "document.extract-tasks",
      name: "Extract Tasks",
      description: "Finds action items, assignments, and due dates inside text",
      triggerPhrases: ["extract tasks", "find action items", "get tasks from notes"],
      requiredSkills: ["action-item-extractor"],
      expectedInput: "Meeting transcripts or text notes",
      expectedOutput: "A structured checklist of tasks, owners, and dates",
      traceSteps: ["scan-for-verbs", "attribute-owners", "export-task-list"],
      safetyNotes: "Verify assigned deadlines against master calendars."
    },
    {
      id: "document.convert-notes-to-report",
      name: "Convert Notes to Report",
      description: "Formats unstructured notes into a structured report",
      triggerPhrases: ["convert notes to report", "make report from notes", "structure notes"],
      requiredSkills: ["report-formatter"],
      expectedInput: "Raw, scattered notes",
      expectedOutput: "Polished markdown report with headings and logical sections",
      traceSteps: ["cluster-similar-points", "create-hierarchy", "write-cohesive-paragraphs"],
      safetyNotes: "Check that no original points were omitted in formatting."
    },
    {
      id: "document.create-outline",
      name: "Create Outline",
      description: "Generates a content outline for essays, plans, or articles",
      triggerPhrases: ["create outline", "outline this topic", "make content outline"],
      requiredSkills: ["outline-builder"],
      expectedInput: "Target topic or rough goals",
      expectedOutput: "Hierarchical outline with main topics and sub-sections",
      traceSteps: ["brainstorm-milestones", "organize-chronologically", "refine-subpoints"],
      safetyNotes: "Review formatting consistency across all nesting levels."
    },
    {
      id: "document.compare-documents",
      name: "Compare Documents",
      description: "Identifies conflicts, differences, and alignment across documents",
      triggerPhrases: ["compare documents", "check differences", "find document overlap"],
      requiredSkills: ["document-comparator"],
      expectedInput: "Two document texts",
      expectedOutput: "Comparison table outlining differences and alignments",
      traceSteps: ["align-document-sections", "detect-differing-statements", "synthesize-findings"],
      safetyNotes: "Check document version tags manually before acting on conflicts."
    }
  ],
  skills: [
    { id: "document-summarizer", name: "Document Summarizer", description: "Condenses lengthy text down to key arguments." },
    { id: "action-item-extractor", name: "Action Item Extractor", description: "Parses conversational text to find checklist items." },
    { id: "report-formatter", name: "Report Formatter", description: "Structures notes with formal style guidelines." },
    { id: "outline-builder", name: "Outline Builder", description: "Organizes concepts into logical nesting structures." },
    { id: "document-comparator", name: "Document Comparator", description: "Extracts textual conflicts and semantic overlaps." }
  ]
};
