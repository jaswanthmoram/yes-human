import { createRouter } from "@yes-human/core";
import { SkillRunner, WorkflowRunner } from "@yes-human/runtime";
import { defaultPack, developerPack } from "@yes-human/packs";

export async function cmdRun(args: string[]): Promise<number> {
  const workflowId = args[0];
  const input = args[1] || "";

  if (!workflowId) {
    console.error("Usage: yes run <workflow-id> [input]");
    return 1;
  }

  const router = createRouter({
    mode: "offline",
    packs: [defaultPack, developerPack],
    trace: true,
  });

  const workflows = router.listWorkflows();
  const workflow = workflows.find((w) => w.id === workflowId || w.id.endsWith(workflowId));

  if (!workflow) {
    console.error(`Error: Workflow "${workflowId}" not found in loaded packs.`);
    console.log("Loaded workflows:");
    for (const w of workflows) {
      console.log(`  - ${w.id}`);
    }
    return 1;
  }

  console.log(`Executing workflow "${workflow.name}" (${workflow.id})...`);

  const skillRunner = new SkillRunner();
  const workflowRunner = new WorkflowRunner(skillRunner);

  const result = await workflowRunner.run(workflow, input);

  console.log("\n=== Workflow Run Completed ===");
  console.log(`Route Match: ${result.route.id} (Stage: ${result.route.stage})`);
  console.log("\n--- Execution Timeline ---");
  for (const step of result.trace.steps) {
    console.log(`  [${step.status.toUpperCase()}] ${step.step}`);
    if (step.metadata?.result) {
      console.log(`      Output: ${step.metadata.result}`);
    }
  }

  return 0;
}
