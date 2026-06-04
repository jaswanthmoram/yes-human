import { test } from "node:test";
import assert from "node:assert/strict";
import { SkillRunner, WorkflowRunner } from "../packages/yes-runtime/dist/index.js";
import { developerPack } from "../packages/yes-packs/dist/index.js";

test("execution context steps trace tracing", async () => {
  const runner = new SkillRunner();
  let executedCount = 0;

  runner.register("code-reviewer", async (input) => {
    executedCount++;
    return `Reviewed files: ${input}`;
  });

  const workflow = developerPack.workflows[0]; // developer.code-review
  const workflowRunner = new WorkflowRunner(runner);

  const res = await workflowRunner.run(workflow, "const data = 42;");

  assert.equal(executedCount, 1);
  assert.equal(res.route.id, "route.developer.code-review");
  assert.equal(res.trace.steps.length, 3);
  assert.equal(res.trace.steps[0].status, "success");
  assert.equal(res.trace.steps[0].metadata?.result, "Reviewed files: const data = 42;");
});

test("skill runner fallback executes mock logs", async () => {
  const runner = new SkillRunner();
  const res = await runner.run("non-registered-skill", "some-input", {});
  assert.match(res, /\[Mock\] Executed skill: non-registered-skill/);
});
