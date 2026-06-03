import crypto from "crypto";
export function signManifest(manifest, privateKeyPem) {
  const payload = JSON.stringify(manifest);
  const sig = crypto.sign(null, Buffer.from(payload), privateKeyPem);
  return { algorithm: "ed25519", value: sig.toString("base64"), signed_at: new Date().toISOString() };
}
export function verifyManifest(manifest, signature, publicKeyPem) {
  const payload = JSON.stringify(manifest);
  return crypto.verify(null, Buffer.from(payload), publicKeyPem, Buffer.from(signature.value, "base64"));
}
