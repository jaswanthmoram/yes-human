import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { copySkillsFromStaging } from '../../packages/yes-absorber/copy-skills.js';
import { apply, rollback } from '../../packages/yes-absorber/index.js';

let tmp;
const slug = 'fixture-promote-slice';
const copySlug = 'fixture-skills-copy';

before(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-absorb-slice-'));
  fs.writeFileSync(path.join(tmp, 'package.json'), '{"name":"fixture"}\n');
  fs.mkdirSync(path.join(tmp, 'staging/normalized', slug), { recursive: true });
  fs.mkdirSync(path.join(tmp, 'staging/normalized', copySlug, 'demo-skill'), { recursive: true });
  fs.mkdirSync(path.join(tmp, 'staging/rollback'), { recursive: true });
  fs.mkdirSync(path.join(tmp, 'staging/promoted'), { recursive: true });
  fs.mkdirSync(path.join(tmp, 'registry'), { recursive: true });
  fs.writeFileSync(path.join(tmp, 'registry/ledger.jsonl'), '');
  fs.writeFileSync(
    path.join(tmp, 'registry/license-registry.json'),
    JSON.stringify({
      allowed: ['MIT'],
      restricted: [],
      forbidden: ['GPL-3.0']
    })
  );
  fs.writeFileSync(path.join(tmp, 'registry/provenance.json'), '[]');
  fs.writeFileSync(path.join(tmp, 'registry/agents.json'), '{"items":[]}');
  fs.writeFileSync(path.join(tmp, 'registry/skills.json'), '{"items":[]}');
  fs.writeFileSync(path.join(tmp, 'registry/workflows.json'), '{"items":[]}');

  fs.writeFileSync(
    path.join(tmp, 'staging/normalized', copySlug, 'demo-skill', 'SKILL.md'),
    '---\nid: meta-system.demo-skill\n---\n# Demo\n'
  );

  const manifest = {
    schema_version: '1.0',
    slug,
    decision: 'staged',
    source: { origin_url: 'file://fixture', commit_or_version: 'test' },
    license: { spdx: 'MIT', decision: 'allowed' },
    classification: { agents: 1, skills: 1, workflows: 1 }
  };
  fs.writeFileSync(path.join(tmp, 'staging/normalized', slug, 'manifest.json'), JSON.stringify(manifest, null, 2));

  fs.mkdirSync(path.join(tmp, 'staging/normalized', slug, 'agents', 'meta-system'), { recursive: true });
  fs.writeFileSync(
    path.join(tmp, 'staging/normalized', slug, 'agents', 'meta-system', 'absorb-fixture-agent.md'),
    '---\nid: meta-system.absorb-fixture-agent\nname: Absorb Fixture\n---\n# Agent\n'
  );

  fs.mkdirSync(path.join(tmp, 'staging/normalized', slug, 'skills', 'absorb-fixture-skill'), { recursive: true });
  fs.writeFileSync(
    path.join(tmp, 'staging/normalized', slug, 'skills', 'absorb-fixture-skill', 'SKILL.md'),
    '---\nid: meta-system.absorb-fixture-skill\n---\n# Skill\n'
  );

  fs.mkdirSync(path.join(tmp, 'staging/normalized', slug, 'workflows', 'meta-system'), { recursive: true });
  fs.writeFileSync(
    path.join(tmp, 'staging/normalized', slug, 'workflows', 'meta-system', 'absorb-fixture-flow.json'),
    JSON.stringify({ id: 'meta-system.absorb-fixture-flow', version: '1.0.0', steps: [] })
  );
});

after(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('copySkillsFromStaging copies SKILL.md into content/skills', () => {
  const prev = process.cwd();
  try {
    process.chdir(tmp);
    const r = copySkillsFromStaging(copySlug, { domain: 'meta-system', maxFiles: 5 });
    assert.ok(r.copied.length >= 1);
    assert.ok(fs.existsSync(path.join(tmp, 'content/skills/meta-system/demo-skill/SKILL.md')));
  } finally {
    process.chdir(prev);
  }
});

test('apply --promote copies agent skill workflow and rollback removes them', async () => {
  const prev = process.cwd();
  try {
    process.chdir(tmp);
    const ap = await apply(slug, { promote: true });
    assert.ok(ap.changeId);
    assert.ok(ap.promote);
    assert.equal(ap.promote.files_added.length, 3);

    const agentPath = path.join(tmp, 'content/agents/meta-system/absorb-fixture-agent.md');
    const skillPath = path.join(tmp, 'content/skills/meta-system/absorb-fixture-skill/SKILL.md');
    const wfPath = path.join(tmp, 'content/workflows/meta-system/absorb-fixture-flow.json');
    assert.ok(fs.existsSync(agentPath));
    assert.ok(fs.existsSync(skillPath));
    assert.ok(fs.existsSync(wfPath));

    const ledger = fs.readFileSync(path.join(tmp, 'registry/ledger.jsonl'), 'utf8');
    assert.match(ledger, /absorb_promote_content/);

    await rollback(ap.changeId);
    assert.ok(!fs.existsSync(agentPath));
    assert.ok(!fs.existsSync(skillPath));
    assert.ok(!fs.existsSync(wfPath));
  } finally {
    process.chdir(prev);
  }
});
