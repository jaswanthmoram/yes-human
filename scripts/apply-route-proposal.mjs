#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
if (!process.argv.includes("--approve")) {
  console.error("Usage: node scripts/apply-route-proposal.mjs --approve");
  process.exit(1);
}
const file = path.join(repoRoot, "staging/learning/route-proposals.jsonl");
if (!fs.existsSync(file)) { console.error("No proposals:", file); process.exit(1); }
const last = JSON.parse(fs.readFileSync(file, "utf8").trim().split("\n").filter(Boolean).pop());
console.log("Proposal (manual ROUTE_TABLE merge required):", last);
const r = spawnSync("node", ["packages/yes-schema/eval-route.js"], { cwd: repoRoot, stdio: "inherit" });
process.exit(r.status ?? 1);
