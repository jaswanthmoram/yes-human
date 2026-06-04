import { test } from "node:test";
import assert from "node:assert/strict";
import { createRouter, TraceTracker } from "../packages/yes-core/dist/index.js";
import { developerPack, businessPack } from "../packages/yes-packs/dist/index.js";
import { PolicyEvaluator, StateMachine } from "../packages/yes-policy/dist/index.js";

test("policy package basic integrity check", () => {
  assert.equal(typeof PolicyEvaluator, "function");
  assert.equal(typeof StateMachine, "function");
  
  const sm = new StateMachine({
    id: "test",
    initial: "start",
    states: [{ name: "start", type: "initial" }, { name: "end", type: "terminal" }],
    transitions: [{ from: "start", on: "go", to: "end" }]
  });
  assert.ok(sm.validate().ok);
});

test("tracker chrome trace exporter", () => {
  const tracker = new TraceTracker();
  tracker.addStep("route-start", "success", { detail: "test" });
  tracker.addStep("exact-match", "success");
  
  const chromeTrace = JSON.parse(tracker.exportToChromeTrace());
  assert.ok(Array.isArray(chromeTrace));
  assert.equal(chromeTrace.length, 2);
  assert.equal(chromeTrace[0].name, "route-start");
  assert.equal(chromeTrace[0].ph, "i");
  assert.equal(chromeTrace[0].args.detail, "test");
});

test("local semantic router with mock fetch", async () => {
  const originalFetch = globalThis.fetch;
  
  // Mock fetch to simulate Ollama response
  globalThis.fetch = async (url, options) => {
    if (url.includes("/api/generate")) {
      return {
        ok: true,
        json: async () => ({
          response: "developer.security-review"
        })
      };
    }
    return { ok: false };
  };

  try {
    const router = createRouter({
      packs: [developerPack],
      semanticEndpoint: "http://localhost:11434",
      semanticModel: "llama3"
    });

    const res = await router.route("perform high stakes check");
    assert.equal(res.route.id, "route.developer.security-review");
    assert.equal(res.route.stage, "fallback");
    assert.match(res.route.reason, /Ollama/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("router SDK routing and workflow execution verification", async () => {
  const router = createRouter({
    mode: "offline",
    packs: [developerPack, businessPack],
    trace: true
  });

  // Verify routing for developer pack
  const res1 = await router.route("review code for bugs");
  assert.equal(res1.route.id, "route.developer.code-review");
  assert.equal(res1.route.stage, "exact");
  assert.equal(res1.workflow.id, "developer.code-review");

  // Verify routing for business pack
  const res2 = await router.route("generate business plan");
  assert.equal(res2.route.id, "route.business.business-plan");
  assert.equal(res2.route.stage, "exact");
  assert.equal(res2.workflow.id, "business.business-plan");

  // Verify runWorkflow direct invocation
  const res3 = await router.runWorkflow("business.financial-plan", "Forecast for 3 years");
  assert.equal(res3.route.id, "route.business.financial-plan");
  assert.equal(res3.route.stage, "exact");
  assert.equal(res3.workflow.id, "business.financial-plan");
  assert.ok(res3.trace.steps.some(s => s.step === "exec-step:calculate-cogs"));
});
