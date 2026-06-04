import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CodeGraph } from '../../packages/yes-graph/code-graph.js';

let workDir;
let dbPath;

before(async () => {
  workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-graph-'));
  dbPath = path.join(workDir, 'graph.sqlite');

  // Tiny synthetic mini-repo with two JS files + a Python file.
  fs.writeFileSync(
    path.join(workDir, 'auth.js'),
    `
import bcrypt from 'bcrypt';
import { db } from './db.js';

export function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export class AuthService {
  async login(email, password) { return true; }
}
`
  );

  fs.writeFileSync(
    path.join(workDir, 'db.js'),
    `
export const db = {
  query: async (sql) => null
};
`
  );

  fs.writeFileSync(
    path.join(workDir, 'main.py'),
    `
import json
from auth import hashPassword

def run():
    return True

class Server:
    pass
`
  );

  fs.mkdirSync(path.join(workDir, 'node_modules', 'bcrypt'), { recursive: true });
  fs.writeFileSync(path.join(workDir, 'node_modules', 'bcrypt', 'index.js'), 'export function hash(){}');

  await CodeGraph.build(workDir, dbPath);
});

after(() => {
  fs.rmSync(workDir, { recursive: true, force: true });
});

test('builds an SQLite index at the given path', () => {
  assert.ok(fs.existsSync(dbPath), 'sqlite file created');
  assert.ok(fs.statSync(dbPath).size > 0);
});

test('indexes files and skips node_modules', () => {
  const g = new CodeGraph(dbPath);
  const s = g.stats();
  g.close();
  assert.equal(s.file_count, 3, 'three source files indexed (node_modules excluded)');
});

test('extracts a JS function symbol with correct line', () => {
  const g = new CodeGraph(dbPath);
  const hits = g.findSymbol('hashPassword');
  g.close();
  assert.ok(hits.length >= 1);
  assert.equal(hits[0].kind, 'function');
  assert.equal(hits[0].file, 'auth.js');
  assert.ok(hits[0].line >= 4 && hits[0].line <= 6);
});

test('extracts a JS class symbol', () => {
  const g = new CodeGraph(dbPath);
  const hits = g.findSymbol('AuthService');
  g.close();
  assert.ok(hits.some((h) => h.kind === 'class' && h.file === 'auth.js'));
});

test('extracts a Python class symbol', () => {
  const g = new CodeGraph(dbPath);
  const hits = g.findSymbol('Server');
  g.close();
  assert.ok(hits.some((h) => h.kind === 'class' && h.file === 'main.py'));
});

test('captures JS imports', () => {
  const g = new CodeGraph(dbPath);
  const hits = g.filesUsing('bcrypt');
  g.close();
  assert.ok(hits.some((h) => h.file === 'auth.js'));
});

test('captures Python imports', () => {
  const g = new CodeGraph(dbPath);
  const hits = g.filesUsing('auth');
  g.close();
  assert.ok(hits.some((h) => h.file === 'main.py'));
});

test('search returns compact context-pack rows (no full file content)', () => {
  const g = new CodeGraph(dbPath);
  const hits = g.search('hash');
  g.close();
  assert.ok(hits.length > 0);
  for (const h of hits) {
    // Context-pack contract: a row must NEVER contain a full file body field.
    assert.equal('content' in h, false);
    assert.equal('body' in h, false);
    assert.ok(h.file, 'file path present');
  }
});

test('briefing returns languages + symbol_kinds breakdown', () => {
  const g = new CodeGraph(dbPath);
  const b = g.briefing();
  g.close();
  assert.ok(Array.isArray(b.languages));
  assert.ok(b.languages.some((l) => l.language === 'javascript'));
  assert.ok(b.languages.some((l) => l.language === 'python'));
  assert.ok(Array.isArray(b.symbol_kinds));
});

test('rebuild over existing db replaces (does not duplicate) entries', async () => {
  await CodeGraph.build(workDir, dbPath);
  const g = new CodeGraph(dbPath);
  const s = g.stats();
  g.close();
  assert.equal(s.file_count, 3, 'still three files after rebuild');
});
