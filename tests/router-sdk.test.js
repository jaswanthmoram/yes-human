import { test } from "node:test";
import assert from "node:assert/strict";
import { createRouter } from "../packages/yes-core/dist/index.js";
import { developerPack, defaultPack } from "../packages/yes-packs/dist/index.js";

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
