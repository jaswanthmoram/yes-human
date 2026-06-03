import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';

import { signManifest, verifyManifest } from '../../packages/yes-adapters/lib/manifest-signing.js';

test('ed25519 manifest signatures verify and detect tampering', () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519', {
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'spki', format: 'pem' }
  });
  const payload = { name: 'yes-human-generic', version: 'test', route_table: 'graph/indexes/ROUTE_TABLE.min.json' };
  const manifest = { ...payload, signature: signManifest(payload, privateKey) };
  assert.equal(verifyManifest(manifest, manifest.signature, publicKey), true);
  assert.equal(verifyManifest({ ...manifest, version: 'tampered' }, manifest.signature, publicKey), false);
});

test('signing fails without a private key', () => {
  const payload = { name: 'yes-human-generic', version: 'test' };
  assert.throws(() => signManifest(payload), /Manifest signing requires a privateKeyPem key/);
});
