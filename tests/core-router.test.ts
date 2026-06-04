import { test } from "node:test";
import assert from "node:assert/strict";
import { createRouter } from "@yes-human/core";
import { developerPack } from "@yes-human/packs";

test("createRouter and loadPack initialization", () => {
  const router = createRouter({
    packs: [developerPack],
  });

  const workflows = router.listWorkflows();
  assert.equal(workflows.length, 5);
  assert.equal(workflows[0].id, "developer.code-review");
  assert.equal(workflows[1].id, "developer.bug-fix");

  const skills = router.listSkills();
  assert.equal(skills.length, 5);
});

test("exact match routing resolves successfully", async () => {
  const router = createRouter({
    packs: [developerPack],
  });

  const result = await router.route("review code");
  assert.equal(result.route.id, "route.developer.code-review");
  assert.equal(result.route.stage, "exact");
  assert.equal(result.route.confidence, 1.0);
  assert.ok(result.workflow);
  assert.equal(result.workflow?.id, "developer.code-review");

  // Verify trace steps recorded for code-review
  assert.ok(result.trace.steps.length > 0);
  const execSteps = result.trace.steps.filter((s) =>
    s.step.startsWith("exec-step:")
  );
  assert.equal(execSteps.length, 3);
  assert.equal(execSteps[0].step, "exec-step:read-source-files");
});

test("alias/containment routing resolves successfully", async () => {
  const router = createRouter({
    packs: [developerPack],
  });

  const result = await router.route(
    "please review code for bugs in my project"
  );
  assert.equal(result.route.id, "route.developer.code-review");
  assert.equal(result.route.stage, "alias");
  assert.equal(result.route.confidence, 0.95);
});

test("keyword token overlap routing resolves successfully", async () => {
  const router = createRouter({
    packs: [developerPack],
  });

  // Overlap on words 'review' and 'code' without matching trigger substrings like 'review code'
  const result = await router.route("check the review and the code formatting");
  assert.equal(result.route.id, "route.developer.code-review");
  assert.equal(result.route.stage, "keyword");
  assert.equal(result.route.confidence, 0.9);
});

test("fallback routing when no matches found", async () => {
  const router = createRouter({
    packs: [developerPack],
  });

  const result = await router.route("order a hot cup of coffee");
  assert.equal(result.route.id, "route.meta-system.supreme-router");
  assert.equal(result.route.stage, "fallback");
  assert.equal(result.route.confidence, 0.0);
  assert.equal(result.workflow, null);
});

test("direct runWorkflow execution", async () => {
  const router = createRouter({
    packs: [developerPack],
  });

  const result = await router.runWorkflow(
    "developer.code-review",
    "some patch data"
  );
  assert.equal(result.route.id, "route.developer.code-review");
  assert.equal(result.route.stage, "exact");
  assert.ok(result.workflow);
  assert.equal(result.workflow?.id, "developer.code-review");

  const execSteps = result.trace.steps.filter((s) =>
    s.step.startsWith("exec-step:")
  );
  assert.equal(execSteps.length, 3);
});

test("direct runWorkflow with non-existent workflow returns fallback route", async () => {
  const router = createRouter({
    packs: [developerPack],
  });

  const result = await router.runWorkflow("non-existent", "some data");
  assert.equal(result.route.id, "route.meta-system.supreme-router");
  assert.equal(result.route.stage, "fallback");
  assert.equal(result.workflow, null);
});
