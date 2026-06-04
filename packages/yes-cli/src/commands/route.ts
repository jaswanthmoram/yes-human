import { createRouter } from "@yes-human/core";
import { defaultPack, developerPack } from "@yes-human/packs";

export async function cmdRoute(args: string[]): Promise<number> {
  const isTrace = args.includes("--trace");
  const filteredArgs = args.filter((arg) => arg !== "--trace");
  let prompt = filteredArgs[0];
  let traceVal = isTrace;

  if (!prompt) {
    const readline = await import("node:readline/promises");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("\n🧙 Welcome to the yes-human Routing Wizard!");
      const taskInput = await rl.question("Enter the task you want to route: ");
      if (!taskInput.trim()) {
        console.error("❌ Error: Task cannot be empty.");
        rl.close();
        return 1;
      }
      prompt = taskInput.trim();

      const traceInput = await rl.question("Enable execution trace? (y/N): ");
      traceVal = ["y", "yes"].includes(traceInput.trim().toLowerCase());
    } catch (e) {
      console.error("❌ Error reading input:", e);
      rl.close();
      return 1;
    } finally {
      rl.close();
    }
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

  if (traceVal) {
    console.log("\n=== Execution Trace ===");
    for (const step of result.trace.steps) {
      console.log(`  [${step.status.toUpperCase()}] ${step.step} (${step.timestamp})`);
    }
  }
  return 0;
}
