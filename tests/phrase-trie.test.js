import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PhraseTrie, buildTrieFromRouteMap } from '../packages/yes-graph/index.js';

test('finds an exact stored phrase', () => {
  const t = new PhraseTrie();
  t.insert('review code', 'route.a');
  assert.equal(t.search('review code').routeId, 'route.a');
});

test('finds a phrase contained within a longer query', () => {
  const t = new PhraseTrie();
  t.insert('build error', 'route.b');
  assert.equal(t.search('I hit a build error in CI').routeId, 'route.b');
});

test('longest phrase wins over shorter overlapping phrase', () => {
  const t = buildTrieFromRouteMap({ route: 'route.short', 'system route': 'route.long' });
  assert.equal(t.search('please execute system route check').routeId, 'route.long');
});

test('returns null when nothing matches', () => {
  const t = new PhraseTrie();
  t.insert('deploy app', 'route.c');
  assert.equal(t.search('write a poem'), null);
});

test('does not match a phrase split across non-adjacent words', () => {
  const t = new PhraseTrie();
  t.insert('fix build', 'route.d');
  assert.equal(t.search('fix the build'), null);
});
