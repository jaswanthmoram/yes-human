import { test } from "node:test";
import assert from "node:assert/strict";
import { SkillRunner, WorkflowRunner } from "../packages/yes-runtime/dist/index.js";
import { developerPack } from "../packages/yes-packs/dist/index.js";

test("workflow runner executes steps in correct order", async () => {
  const runner = new SkillRunner();
  const stepsRun = [];

  runner.register("code-reviewer", (input, context) => {
    stepsRun.push("code-reviewer-skill");
    return `Reviewed: ${input}`;
  });

  const workflow = {
    id: "test.wf",
    name: "Test Workflow",
    description: "A workflow for testing step execution order",
    triggerPhrases: ["test order"],
    requiredSkills: ["code-reviewer"],
    expectedInput: "code",
    expectedOutput: "report",
    traceSteps: ["read-source-files", "analyze-code-style", "generate-review-report"]
  };

  const workflowRunner = new WorkflowRunner(runner);
  const res = await workflowRunner.run(workflow, "const data = 42;");

  // Verify steps in trace are recorded in order
  assert.equal(res.trace.steps.length, 3);
  assert.equal(res.trace.steps[0].step, "read-source-files");
  assert.equal(res.trace.steps[1].step, "analyze-code-style");
  assert.equal(res.trace.steps[2].step, "generate-review-report");
  assert.equal(res.trace.steps[0].status, "success");
  assert.equal(res.trace.steps[1].status, "success");
  assert.equal(res.trace.steps[2].status, "success");
});

test("skill runner receives execution context and variables", async () => {
  const runner = new SkillRunner();
  let receivedContext = null;

  runner.register("code-reviewer", (input, context) => {
    receivedContext = context;
    context.variables.foo = "bar";
    return `Reviewed: ${input}`;
  });

  const workflow = developerPack.workflows[0]; // developer.code-review
  const workflowRunner = new WorkflowRunner(runner);
  await workflowRunner.run(workflow, "const data = 42;");

  assert.ok(receivedContext);
  assert.equal(receivedContext.variables.foo, "bar");
  assert.ok(Array.isArray(receivedContext.trace));
});

test("runtime handles missing skills cleanly by returning mock or readable logs", async () => {
  const runner = new SkillRunner(); // Empty registry

  const workflow = developerPack.workflows[0]; // developer.code-review
  const workflowRunner = new WorkflowRunner(runner);

  const res = await workflowRunner.run(workflow, "const data = 42;");
  // Check that it fell back to mock execution cleanly without crashing
  const stepEvent = res.trace.steps.find(s => s.step === "read-source-files");
  assert.ok(stepEvent);
  assert.match(stepEvent.metadata?.result, /\[Mock\] Executed skill: code-reviewer/);
});

test("runtime returns readable errors when step fails", async () => {
  const runner = new SkillRunner();
  runner.register("code-reviewer", () => {
    throw new Error("Syntax error on line 4");
  });

  const workflow = developerPack.workflows[0]; // developer.code-review
  const workflowRunner = new WorkflowRunner(runner);

  await assert.rejects(
    () => workflowRunner.run(workflow, "const data = 42;"),
    /Syntax error on line 4/
  );
});

test("skill runner fallback executes mock logs", async () => {
  const runner = new SkillRunner();
  const res = await runner.run("non-registered-skill", "some-input", {});
  assert.match(res, /\[Mock\] Executed skill: non-registered-skill/);
});
