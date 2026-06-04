import { test } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { exportToCodex, exportToAntigravity } from "../packages/yes-adapters/dist/index.js";
import { developerPack } from "../packages/yes-packs/dist/index.js";

test("exports configuration to Codex and Antigravity directories", () => {
  const tmpDir = path.join(os.tmpdir(), `yh-export-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    // 1. Test Codex Export
    const codexOut = path.join(tmpDir, "codex");
    exportToCodex(developerPack.workflows, codexOut);

    assert.ok(fs.existsSync(path.join(codexOut, "AGENTS.md")));
    assert.ok(fs.existsSync(path.join(codexOut, ".codex", "skills", "code-review", "SKILL.md")));

    // 2. Test Antigravity Export
    const antigravityOut = path.join(tmpDir, "antigravity");
    exportToAntigravity(developerPack.workflows, antigravityOut);

    assert.ok(fs.existsSync(path.join(antigravityOut, "agents.md")));
    assert.ok(fs.existsSync(path.join(antigravityOut, "skills", "code-review", "SKILL.md")));
    assert.ok(fs.existsSync(path.join(antigravityOut, "workflows", "feature-build.md")));

  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
