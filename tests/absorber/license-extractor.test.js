import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { extractLicense, classifyLicense, spdxFromText } from '../../packages/yes-absorber/license-extractor.js';

const registry = {
  allowed: ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC'],
  restricted: ['MPL-2.0', 'LGPL-3.0'],
  forbidden: ['GPL-3.0', 'AGPL-3.0', 'SSPL', 'Unclear']
};

function mkSourceDir(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-lic-'));
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), content);
  }
  return dir;
}

test('detects MIT from LICENSE file', () => {
  const dir = mkSourceDir({
    LICENSE: 'MIT License\n\nCopyright (c) 2026 Anyone\n\nPermission is hereby granted, free of charge...'
  });
  const r = extractLicense(dir, registry);
  assert.equal(r.spdx, 'MIT');
  assert.equal(r.decision, 'allowed');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('detects Apache-2.0', () => {
  const dir = mkSourceDir({
    LICENSE: '                                 Apache License\n                           Version 2.0, January 2004'
  });
  const r = extractLicense(dir, registry);
  assert.equal(r.spdx, 'Apache-2.0');
  assert.equal(r.decision, 'allowed');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('forbidden license (GPL-3.0) is decision=forbidden', () => {
  const dir = mkSourceDir({ LICENSE: 'GNU GENERAL PUBLIC LICENSE\n                       Version 3, 29 June 2007' });
  const r = extractLicense(dir, registry);
  assert.equal(r.spdx, 'GPL-3.0');
  assert.equal(r.decision, 'forbidden');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('restricted license (MPL-2.0) is decision=restricted', () => {
  const dir = mkSourceDir({ LICENSE: 'Mozilla Public License Version 2.0' });
  const r = extractLicense(dir, registry);
  assert.equal(r.spdx, 'MPL-2.0');
  assert.equal(r.decision, 'restricted');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('falls back to package.json license field', () => {
  const dir = mkSourceDir({ 'package.json': JSON.stringify({ name: 'x', license: 'ISC' }) });
  const r = extractLicense(dir, registry);
  assert.equal(r.spdx, 'ISC');
  assert.equal(r.decision, 'allowed');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('source with no license signal returns unknown', () => {
  const dir = mkSourceDir({ 'README.md': 'No license here' });
  const r = extractLicense(dir, registry);
  assert.equal(r.spdx, null);
  assert.equal(r.decision, 'unknown');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('classifyLicense maps unrecognized spdx to unknown', () => {
  assert.equal(classifyLicense('WTFPL', registry), 'unknown');
  assert.equal(classifyLicense('MIT', registry), 'allowed');
  assert.equal(classifyLicense('GPL-3.0', registry), 'forbidden');
});

test('spdxFromText is null for empty', () => {
  assert.equal(spdxFromText(''), null);
  assert.equal(spdxFromText('random text'), null);
});
