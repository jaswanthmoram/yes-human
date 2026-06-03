export const SECRET_PATTERNS = {
  openai_key: /\bsk-[A-Za-z0-9]{20,}\b/g,
  anthropic_key: /\bsk-ant-sid01-[A-Za-z0-9-_]{30,}\b/g,
  google_key: /\bAIza[0-9A-Za-z-_]{35}\b/g,
  stripe_key: /\bsk_live_[0-9a-zA-Z]{24}\b/g,
  slack_token: /\bxox[baprs]-[0-9a-zA-Z]{10,48}\b/g,
  huggingface_token: /\bhf_[a-zA-Z0-9]{34}\b/g,
  github_token: /\bghp_[A-Za-z0-9]{20,}\b/g,
  aws_key: /\bAKIA[0-9A-Z]{16}\b/g,
  ssh_private_key: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----[\s\S]+?-----END (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g,
  pgp_private_key: /-----BEGIN PGP PRIVATE KEY BLOCK-----[\s\S]+?-----END PGP PRIVATE KEY BLOCK-----/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  credit_card: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g,
  email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
};

// Compile a single combined regex for fast checks
export const COMBINED_SECRET_REGEX = new RegExp(
  Object.values(SECRET_PATTERNS)
    .map(r => `(${r.source})`)
    .join('|'),
  'i'
);
