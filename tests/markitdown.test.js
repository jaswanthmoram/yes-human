import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { convertToMarkdown } from '../packages/yes-runtime/tools/markitdown.js';

test('converts a plain text file to markdown', async () => {
  const tmp = path.join(os.tmpdir(), `yh-md-${Date.now()}.txt`);
  fs.writeFileSync(tmp, 'Hello World from the test suite');
  try {
    const md = await convertToMarkdown(tmp);
    assert.match(md, /Hello World from the test suite/);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
});

test('rejects when the input file does not exist', async () => {
  await assert.rejects(
    () => convertToMarkdown('/no/such/file/here.pdf'),
    /File not found/
  );
});
