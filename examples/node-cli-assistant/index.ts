import { createRouter } from "@yes-human/core";
import { SkillRunner, WorkflowRunner } from "@yes-human/runtime";
import {
  developerPack,
  documentPack,
  businessPack,
  securityPack,
  startupPack,
} from "@yes-human/packs";

async function runAssistantDemo(): Promise<void> {
  console.log("====================================================");
  console.log("=== Node CLI Assistant Multi-Pack Simulation ===");
  console.log("====================================================");

  // 1. Instantiate the router and load all domain packs
  const router = createRouter({
    mode: "offline",
    packs: [developerPack, documentPack, businessPack, securityPack, startupPack],
    trace: true,
  });

  // 2. Define the requested prompts to test
  const prompts = [
    "debug this Node error",
    "summarize this document",
    "create a startup launch checklist",
    "generate a business plan",
    "check this API for security issues",
  ];

  // 3. Set up the Runtime Skill and Workflow Runners
  const skillRunner = new SkillRunner();

  // Register some custom handlers for simulation variety
  skillRunner.register("bug-resolver", async (input) => {
    return `[bug-resolver] Parsed Node stack trace. Recommendation: check import resolution extensions.`;
  });
  skillRunner.register("business-planner", async (input) => {
    return `[business-planner] Generated Business Plan: Market TAM/SAM/SOM defined, operations structured.`;
  });

  const workflowRunner = new WorkflowRunner(skillRunner);

  // 4. Sequentially process each prompt
  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    console.log(`\n----------------------------------------------------`);
    console.log(`[Prompt #${i + 1}] "${prompt}"`);
    console.log(`----------------------------------------------------`);

    // Route the prompt
    const routeResult = await router.route(prompt);
    console.log(`✔ Routed to:      ${routeResult.route.id}`);
    console.log(`✔ Match Stage:    ${routeResult.route.stage}`);
    console.log(`✔ Match Reason:   ${routeResult.route.reason}`);

    if (!routeResult.workflow) {
      console.log(`✗ No workflow matched (fell back to supreme-router).`);
      continue;
    }

    const workflow = routeResult.workflow;
    console.log(`✔ Selected WF:    ${workflow.name} (${workflow.id})`);
    console.log(`✔ Skills Required: ${workflow.requiredSkills.join(", ")}`);

    // Run the workflow
    console.log(`\nExecuting Workflow Steps:`);
    const executionResult = await workflowRunner.run(workflow, `Simulated context for prompt: ${prompt}`);

    // Print trace logs
    console.log(`Execution Trace:`);
    for (const step of executionResult.trace.steps) {
      console.log(`  - [${step.status.toUpperCase()}] Step: "${step.step}"`);
      if (step.metadata?.result) {
        console.log(`    -> Output: ${step.metadata.result}`);
      }
    }

    console.log(`\n✔ Final Output:    ${executionResult.output}`);
  }

  console.log("\n====================================================");
  console.log("=== Simulation Complete ===");
  console.log("====================================================");
}

runAssistantDemo().catch((err) => {
  console.error("Assistant Demo failed:", err);
});
