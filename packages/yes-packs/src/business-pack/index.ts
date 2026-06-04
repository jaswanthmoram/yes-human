import { PackDefinition } from "@yes-human/core";

export const businessPack: PackDefinition = {
  name: "business-pack",
  description: "A pack containing workflows and skills for business planning and strategy.",
  workflows: [
    {
      id: "business.business-plan",
      name: "Business Plan Generator",
      description: "Creates a detailed business plan draft given product and team context",
      triggerPhrases: ["create business plan", "generate business plan", "business plan draft"],
      requiredSkills: ["business-planner"],
      expectedInput: "Company goals, target audience, and product description",
      expectedOutput: "A complete multi-section business plan document",
      traceSteps: ["draft-executive-summary", "define-market-opportunity", "structure-ops-plan"],
      safetyNotes: "Always review operational assumptions with business advisors."
    },
    {
      id: "business.financial-plan",
      name: "Financial Plan Generator",
      description: "Generates basic revenue forecasts and cost assumptions",
      triggerPhrases: ["create financial plan", "financial plan forecast", "revenue projection model"],
      requiredSkills: ["financial-modeler"],
      expectedInput: "Pricing inputs, cost assumptions, and customer growth rates",
      expectedOutput: "A structured financial projection layout and assumptions sheet",
      traceSteps: ["calculate-cogs", "forecast-subscriber-growth", "compile-pro-forma-statements"],
      safetyNotes: "Financial forecasts require review; outputs do not constitute professional advisory."
    },
    {
      id: "business.pitch-deck-outline",
      name: "Pitch Deck Outline",
      description: "Outlines slides for fundraising pitches based on company profiles",
      triggerPhrases: ["pitch deck outline", "fundraising deck slides", "make investor pitch outline"],
      requiredSkills: ["pitch-designer"],
      expectedInput: "Company summary, product features, and market size",
      expectedOutput: "A structured 10-12 slide outline for investor decks",
      traceSteps: ["define-problem-slide", "structure-solution-slide", "outline-traction-slide"],
      safetyNotes: "Ensure slide details match accurate business performance logs."
    },
    {
      id: "business.market-analysis",
      name: "Market Analysis",
      description: "Analyzes industry trends and competitive landscape",
      triggerPhrases: ["market analysis", "competitor analysis review", "industry trend check"],
      requiredSkills: ["market-analyst"],
      expectedInput: "Target sector and main competitors",
      expectedOutput: "Competitor matrix and market trend summary report",
      traceSteps: ["size-tam-sam-som", "evaluate-competitor-strengths", "identify-strategic-threats"],
      safetyNotes: "Check external data references manually for recent changes."
    },
    {
      id: "business.pricing-strategy",
      name: "Pricing Strategy",
      description: "Proposes pricing models based on value and market data",
      triggerPhrases: ["pricing strategy", "pricing model options", "propose pricing"],
      requiredSkills: ["pricing-strategist"],
      expectedInput: "Product cost structure and competitive pricing examples",
      expectedOutput: "Suggested pricing tiers and feature differentiation matrix",
      traceSteps: ["analyze-unit-economics", "recommend-pricing-tiers", "draft-billing-frequency-model"],
      safetyNotes: "Verify pricing strategy alignment with long-term cost-of-goods (COGS)."
    }
  ],
  skills: [
    { id: "business-planner", name: "Business Planner", description: "Drafts corporate goals and structures organizational plans." },
    { id: "financial-modeler", name: "Financial Modeler", description: "Projects cashflows, COGS, and growth parameters." },
    { id: "pitch-designer", name: "Pitch Designer", description: "Formulates persuasive storytelling blocks for investors." },
    { id: "market-analyst", name: "Market Analyst", description: "Segments demographics and quantifies competitor profiles." },
    { id: "pricing-strategist", name: "Pricing Strategist", description: "Models unit margins, discounts, and buyer willingness-to-pay." }
  ]
};
