import { test } from "node:test";
import assert from "node:assert/strict";
import { createRouter } from "../packages/yes-core/dist/index.js";
import { developerPack, defaultPack } from "../packages/yes-packs/dist/index.js";

test("createRouter initialization with defaults", () => {
  const router = createRouter();
  assert.equal(router.listWorkflows().length, 0);
  assert.equal(router.listSkills().length, 0);
  assert.equal(router.listRoutes().length, 0);
});

test("loadPack loads workflows, skills, and prevents duplicate load", () => {
  const router = createRouter();
  router.loadPack(developerPack);

  const initialWfLength = router.listWorkflows().length;
  assert.ok(initialWfLength > 0);

  // Load same pack again - should not duplicate
  router.loadPack(developerPack);
  assert.equal(router.listWorkflows().length, initialWfLength);
});

test("router exact matching and loadPack loading", async () => {
  const router = createRouter({
    packs: [developerPack]
  });

  const res = await router.route("review code");
  assert.equal(res.route.id, "route.developer.code-review");
  assert.equal(res.route.stage, "exact");
});

test("router alias matching check", async () => {
  const router = createRouter({
    packs: [developerPack]
  });

  const res = await router.route("please fix this bug");
  assert.equal(res.route.id, "route.developer.bug-fix");
  assert.equal(res.route.stage, "alias");
});

test("router keyword containment check", async () => {
  const router = createRouter({
    packs: [developerPack]
  });

  const res = await router.route("please review the code logic style");
  assert.equal(res.route.id, "route.developer.code-review");
  assert.equal(res.route.stage, "keyword");
});

test("router custom fallback route config", async () => {
  const router = createRouter({
    packs: [developerPack],
    fallbackRouteId: "route.custom.custom-fallback"
  });

  const res = await router.route("unknown query string");
  assert.equal(res.route.id, "route.custom.custom-fallback");
  assert.equal(res.route.stage, "fallback");
});

test("router pack-scoped matching prioritize scoped packs", async () => {
  const router = createRouter({
    packs: [developerPack, defaultPack]
  });

  // Query starts with prefix "[developer]"
  const res = await router.route("[developer] review code");
  assert.equal(res.route.id, "route.developer.code-review");
  assert.match(res.route.reason, /within pack "developer"/);
});

test("router semantic routing custom hook integration", async () => {
  const router = createRouter({
    packs: [developerPack],
    semanticRouter: (input) => {
      if (input.includes("ai prompt")) {
        return {
          id: "route.custom.semantic",
          workflowId: "developer.security-review",
          confidence: 0.88,
          stage: "alias",
          reason: "semantic matching hook rule"
        };
      }
      return null;
    }
  });

  const res = await router.route("ai prompt issues");
  assert.equal(res.route.id, "route.developer.security-review");
  assert.equal(res.route.stage, "alias");
  assert.equal(res.route.confidence, 0.88);
});

test("direct runWorkflow execution and fallback if missing", async () => {
  const router = createRouter({
    packs: [developerPack]
  });

  const res = await router.runWorkflow("developer.code-review", "some context code");
  assert.equal(res.route.id, "route.developer.code-review");
  assert.equal(res.route.stage, "exact");
  assert.ok(res.workflow);
  assert.equal(res.workflow.id, "developer.code-review");

  // Run invalid/missing workflow
  const missingRes = await router.runWorkflow("developer.non-existent", "context");
  assert.equal(missingRes.route.id, "route.meta-system.supreme-router");
  assert.equal(missingRes.route.stage, "fallback");
  assert.equal(missingRes.workflow, null);
});

test("router manual skill and workflow registration and listing APIs", () => {
  const router = createRouter();

  const mockSkill = { id: "custom-skill", name: "Custom Skill", description: "A custom skill" };
  const mockWorkflow = {
    id: "custom-wf",
    name: "Custom Workflow",
    description: "A custom workflow",
    triggerPhrases: ["run custom", "trigger custom"],
    requiredSkills: ["custom-skill"],
    expectedInput: "any",
    expectedOutput: "any",
    traceSteps: ["step-one", "step-two"]
  };

  router.registerSkill(mockSkill);
  router.registerWorkflow(mockWorkflow);

  const workflows = router.listWorkflows();
  const skills = router.listSkills();
  const routes = router.listRoutes();

  assert.equal(workflows.length, 1);
  assert.equal(workflows[0].id, "custom-wf");
  assert.equal(skills.length, 1);
  assert.equal(skills[0].id, "custom-skill");
  assert.equal(routes.length, 2); // 2 trigger phrases
  assert.equal(routes[0].workflowId, "custom-wf");
});

test("route result and trace event shape validation", async () => {
  const router = createRouter({
    packs: [developerPack]
  });

  const res = await router.route("review code");

  // Check RouteResult shape
  assert.ok(res.route);
  assert.ok(res.trace);
  assert.ok(res.workflow);

  // Check RouteDetails shape
  assert.equal(typeof res.route.id, "string");
  assert.equal(typeof res.route.workflowId, "string");
  assert.equal(typeof res.route.confidence, "number");
  assert.equal(res.route.stage, "exact");
  assert.equal(typeof res.route.reason, "string");

  // Check TraceObject and TraceEvent shape
  const trace = router.getTrace();
  assert.equal(typeof trace.startTime, "string");
  assert.equal(typeof trace.endTime, "string");
  assert.ok(Array.isArray(trace.steps));

  if (trace.steps.length > 0) {
    const step = trace.steps[0];
    assert.equal(typeof step.step, "string");
    assert.equal(typeof step.timestamp, "string");
    assert.ok(["pending", "success", "failure"].includes(step.status));
  }
});

test("invalid registrations throw errors cleanly", () => {
  const router = createRouter();

  // Invalid pack inputs
  assert.throws(() => router.loadPack(null), /Invalid pack: pack is null or undefined/);
  assert.throws(() => router.loadPack({}), /Invalid pack: pack name is required/);
  assert.throws(() => router.loadPack({ name: "test-pack" }), /Invalid pack: pack.workflows must be an array/);
  assert.throws(() => router.loadPack({ name: "test-pack", workflows: [] }), /Invalid pack: pack.skills must be an array/);

  // Invalid workflow inputs
  assert.throws(() => router.registerWorkflow(null), /Invalid workflow: workflow id is required/);
  assert.throws(() => router.registerWorkflow({}), /Invalid workflow: workflow id is required/);

  // Invalid skill inputs
  assert.throws(() => router.registerSkill(null), /Invalid skill: skill id is required/);
  assert.throws(() => router.registerSkill({}), /Invalid skill: skill id is required/);
});
