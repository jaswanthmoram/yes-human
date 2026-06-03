import { test } from "node:test";
import assert from "node:assert/strict";
import { runPlan } from "../../packages/yes-runtime/spawner.js";
import path from "path";
import { fileURLToPath } from "url";
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
test("local-tools mode runs with writes denied", async () => {
  const route = { route_id: "route.meta-system.supreme-router", target: { agent: "meta-system.supreme-router" }, budget_band: "micro" };
  const r = await runPlan({ task: "test", route, mode: "local-tools", repoRoot });
  assert.equal(r.writes, "denied");
});
