import { RouteDetails, WorkflowDefinition } from "../types/index.js";

export function createLocalSemanticRouter(
  endpoint: string,
  options: { model?: string; workflows: WorkflowDefinition[] }
): (input: string) => Promise<RouteDetails | null> {
  const model = options.model || "llama3";
  const workflows = options.workflows;

  return async (input: string): Promise<RouteDetails | null> => {
    if (workflows.length === 0) return null;

    try {
      const systemPrompt = `You are a semantic router for yes-human. Classify the user input to exactly one of the workflow IDs.
Available Workflows:
${workflows.map((w) => `- ${w.id}: ${w.description || w.name}`).join("\n")}

Respond with only the matching workflow ID. If none match, respond with "none".`;

      // Try Ollama generate style first
      const res = await fetch(`${endpoint}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt: `Input: "${input}"\nWorkflow ID:`,
          system: systemPrompt,
          stream: false,
          options: { temperature: 0 },
        }),
      });

      if (res.ok) {
        const data: any = await res.json();
        const routeId = data.response?.trim();
        if (routeId && workflows.some((w) => w.id === routeId)) {
          return {
            id: `route.${routeId}`,
            workflowId: routeId,
            confidence: 0.85,
            stage: "fallback",
            reason: `Local semantic routing via Ollama (${model})`,
          };
        }
      }

      // If Ollama style fails/not-found, try OpenAI compatible endpoint (Llamafile style)
      const resOpenAI = await fetch(`${endpoint}/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input },
          ],
          temperature: 0,
        }),
      });

      if (resOpenAI.ok) {
        const data: any = await resOpenAI.json();
        const routeId = data.choices?.[0]?.message?.content?.trim();
        if (routeId && workflows.some((w) => w.id === routeId)) {
          return {
            id: `route.${routeId}`,
            workflowId: routeId,
            confidence: 0.85,
            stage: "fallback",
            reason: `Local semantic routing via Llamafile (${model})`,
          };
        }
      }
    } catch (err) {
      // Fetch failed, fall through to null
    }

    return null;
  };
}
