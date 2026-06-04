import { createRouter } from "@yes-human/core";
import { SkillRunner, WorkflowRunner } from "@yes-human/runtime";
import { developerPack } from "@yes-human/packs";

async function runAssistantDemo(): Promise<void> {
  console.log("=== Node CLI Assistant Integration Example ===");

  // 1. Instantiate the router and load the developer pack
  const router = createRouter({
    mode: "offline",
    packs: [developerPack],
    trace: true,
  });

  const prompt = "review code for complexity and check style issues";
  console.log(`\n1. Routing Prompt: "${prompt}"...`);

  // 2. Resolve the prompt to a workflow
  const routeResult = await router.route(prompt);
  console.log(`Resolved Route: ${routeResult.route.id} (Stage: ${routeResult.route.stage})`);

  if (!routeResult.workflow) {
    console.error("✗ Failed to resolve a matching workflow.");
    return;
  }

  const workflow = routeResult.workflow;
  console.log(`Selected Workflow: ${workflow.name} (${workflow.id})`);
  console.log(`Required Skills:   ${workflow.requiredSkills.join(", ")}`);

  // 3. Set up the Runtime Skill and Workflow Runners
  const skillRunner = new SkillRunner();

  // Register custom handlers for the developer pack skills
  skillRunner.register("code-reviewer", async (input, ctx) => {
    console.log(`   [Execution] Code Reviewer running review on source: "${input.slice(0, 30)}..."`);
    return "Style review: passed. Complexity: low.";
  });

  const workflowRunner = new WorkflowRunner(skillRunner);

  console.log("\n2. Executing Workflow steps...");
  const executionResult = await workflowRunner.run(workflow, "const data = { value: 42 }; console.log(data);");

  // 4. Print structured trace timelines
  console.log("\n3. Trace Execution Logs:");
  for (const step of executionResult.trace.steps) {
    console.log(`   - [${step.status.toUpperCase()}] Step: "${step.step}" at ${step.timestamp}`);
    if (step.metadata?.result) {
      console.log(`     Result output: ${step.metadata.result}`);
    }
  }

  console.log("\n4. Final Result Status: success");
}

runAssistantDemo().catch((err) => {
  console.error("Assistant Demo failed:", err);
});
