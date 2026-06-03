import crypto from 'crypto';

export function unsignedManifestPayload(manifest) {
  const { signature, ...payload } = manifest || {};
  return payload;
}

export function canonicalManifestString(manifest) {
  return JSON.stringify(unsignedManifestPayload(manifest));
}

export function signManifest(manifest, privateKeyPem = null) {
  if (!privateKeyPem) {
    throw new Error('Manifest signing requires a privateKeyPem key.');
  }
  const payload = canonicalManifestString(manifest);
  const sig = crypto.sign(null, Buffer.from(payload), privateKeyPem);
  
  let publicKeyPem = null;
  try {
    const pubKey = crypto.createPublicKey(privateKeyPem);
    publicKeyPem = pubKey.export({ type: 'spki', format: 'pem' });
  } catch (err) {
    // Ignore extraction errors
  }
  
  return {
    algorithm: 'ed25519',
    value: sig.toString('base64'),
    public_key: publicKeyPem,
    signed_at: new Date().toISOString()
  };
}

const SUPPORTED_ALGORITHMS = new Set(['sha256', 'ed25519']);

export function verifyManifest(manifest, signature = manifest?.signature, publicKeyPem = null) {
  if (!manifest || !signature?.value) return false;
  if (!SUPPORTED_ALGORITHMS.has(signature.algorithm)) return false;
  const payload = canonicalManifestString(manifest);
  if (signature.algorithm === 'sha256') {
    const expected = crypto.createHash('sha256').update(payload).digest('hex');
    const expectedBuffer = Buffer.from(expected);
    const actualBuffer = Buffer.from(signature.value);
    return expectedBuffer.length === actualBuffer.length && crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  }
  if (signature.algorithm === 'ed25519') {
    const key = publicKeyPem || signature.public_key || signature.publicKey;
    if (!key) return false;
    return crypto.verify(null, Buffer.from(payload), key, Buffer.from(signature.value, 'base64'));
  }
  return false;
}
