import { createRouter } from "@yes-human/core";
import { defaultPack, developerPack } from "@yes-human/packs";

export async function cmdRoute(args: string[]): Promise<number> {
  const isTrace = args.includes("--trace");
  const filteredArgs = args.filter((arg) => arg !== "--trace");
  const prompt = filteredArgs[0];

  if (!prompt) {
    console.error('Usage: yes route "<task>" [--trace]');
    return 1;
  }

  const router = createRouter({
    mode: "offline",
    packs: [defaultPack, developerPack],
    trace: true,
  });

  const result = await router.route(prompt);

  console.log("\n=== Routing Result ===");
  console.log(`Route ID:    ${result.route.id}`);
  console.log(`Workflow ID: ${result.route.workflowId}`);
  console.log(`Stage:       ${result.route.stage}`);
  console.log(`Confidence:  ${result.route.confidence}`);
  console.log(`Reason:      ${result.route.reason}`);

  if (result.workflow) {
    console.log(`\nSelected Workflow: ${result.workflow.name}`);
    console.log(`Description:       ${result.workflow.description}`);
    console.log(`Required Skills:   ${result.workflow.requiredSkills.join(", ")}`);
  }

  if (isTrace) {
    console.log("\n=== Execution Trace ===");
    for (const step of result.trace.steps) {
      console.log(`  [${step.status.toUpperCase()}] ${step.step} (${step.timestamp})`);
    }
  }
  return 0;
}
