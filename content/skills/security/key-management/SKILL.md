---
id: security.key-management
name: Cryptographic Key Management
version: 1.0.0
domain: security
category: security.cryptography
purpose: Implement secure cryptographic key lifecycle management including generation, storage, rotation, and destruction.
summary: Key management review covering key generation, secure storage, rotation policies, access controls, and key destruction procedures.
triggers:
  - audit key storage and access controls in HSM
  - review key management implementation
  - implement key rotation policy
  - check cryptographic key security
  - key management audit
  - secure key storage review
  - HSM key management
  - KMS configuration review
aliases:
  - key mgmt
  - key rotation
  - KMS review
negative_keywords:
  - SSL certificate management
  - API key management
  - password management
inputs:
  - key_inventory
  - kms_configuration
  - key_policies
  - application_key_usage
outputs:
  - key_management_report
  - rotation_schedule
  - access_control_review
  - compliance_mapping
allowed_tools:
  - filesystem.read
  - filesystem.write
  - bash.exec
  - web.search
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Keys stored in source code or config files
  - Missing key rotation procedures
  - Insufficient key access controls
  - No key destruction procedures
verification:
  - All keys inventoried with purpose and owner
  - Keys stored in KMS or HSM (not in code)
  - Rotation policy defined and automated
  - Access controls follow least privilege
  - Key destruction procedures documented and tested
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Restore previous key version if rotation causes failures
validators:
  - skill.validator
---

## Mission
Implement and review secure cryptographic key lifecycle management including generation, distribution, storage, rotation, revocation, and destruction following NIST SP 800-57 guidelines.

## When To Use
- When implementing encryption that requires key management
- During security review of cryptographic implementations
- When setting up KMS or HSM infrastructure
- Before compliance audits requiring key management evidence
- After key compromise incidents

## When Not To Use
- For SSL/TLS certificate lifecycle management (use ssl-tls-config)
- For API key or token management (use secret-scanning)
- For password hashing and storage (use auth-review)
- When keys are fully managed by cloud provider with no custom configuration

## Procedure
1. **Inventory All Cryptographic Keys**:
   - List all encryption keys, signing keys, and HMAC keys
   - Document key purpose, algorithm, length, and owner
   - Map which applications and services use each key
   - Identify key storage locations (KMS, HSM, files, env vars)

2. **Review Key Generation**:
   - Verify cryptographically secure random number generators
   - Check key length meets minimum requirements (AES-256, RSA-2048+)
   - Verify key generation happens in secure environment
   - Check for key derivation function usage (PBKDF2, HKDF, Argon2)

3. **Assess Key Storage**:
   - Verify keys are stored in KMS or HSM (not in code or config)
   - Check encryption of key material at rest
   - Review access controls on key storage
   - Verify audit logging of key access
   - Check for keys in environment variables (acceptable for some cases)

4. **Review Key Distribution**:
   - Verify secure key distribution mechanisms
   - Check for key exchange protocols (Diffie-Hellman, ECDH)
   - Review key wrapping and transport encryption
   - Verify no keys transmitted over insecure channels

5. **Implement Key Rotation**:
   - Define rotation schedule based on key sensitivity
   - Implement automated rotation where possible
   - Test rotation procedures without service disruption
   - Support multiple active key versions during rotation
   - Document rotation procedures and responsibilities

6. **Review Key Access Controls**:
   - Verify least privilege access to key operations
   - Check separation of duties (key custodians)
   - Review IAM policies for KMS access
   - Verify multi-factor authentication for key operations
   - Check audit trail for all key usage

7. **Implement Key Destruction**:
   - Define key destruction procedures
   - Verify secure deletion of key material
   - Check crypto-shredding for data destruction
   - Document key lifecycle end procedures
   - Verify destruction is auditable

## Tool Policy
- Use `filesystem.read` to review key management configuration
- Use `bash.exec` to check KMS status and key policies
- Use `web.search` for key management best practices and NIST guidelines
- Use `filesystem.write` to produce key management reports

## Verification
- Complete key inventory with purpose, owner, and storage location
- All keys stored in KMS/HSM with no keys in source code
- Rotation policy defined, automated, and tested
- Access controls follow least privilege with audit logging
- Key destruction procedures documented and tested

## Failure Modes
- Keys hardcoded in source code or configuration files
- No key rotation leading to long-lived compromised keys
- Insufficient access controls allowing unauthorized key access
- Missing audit trail for key usage
- No key destruction procedures leaving orphaned keys

## Example Routes
- AWS KMS key policy review and rotation configuration
- HashiCorp Vault key management setup
- Application encryption key rotation procedure
- HSM key generation and storage review

## Source Notes
- NIST SP 800-57: Recommendation for Key Management
- AWS KMS Best Practices
- HashiCorp Vault documentation
- Reference: ref.github.security.2026-05-31
