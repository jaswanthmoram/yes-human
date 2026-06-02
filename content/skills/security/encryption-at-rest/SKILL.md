---
id: security.encryption-at-rest
name: Data Encryption at Rest
version: 1.0.0
domain: security
category: security.cryptography
purpose: Implement and review encryption for data stored in databases, file systems, and storage services.
summary: Encryption at rest review covering database encryption, file encryption, cloud storage encryption, and key management integration.
triggers:
  - review encryption at rest implementation
  - implement database encryption
  - check data encryption in storage
  - encryption at rest audit
  - configure disk encryption
  - review cloud storage encryption
  - sensitive data encryption review
aliases:
  - encryption review
  - data at rest
  - storage encryption
negative_keywords:
  - encryption in transit
  - TLS configuration
  - network encryption
inputs:
  - database_configuration
  - storage_configuration
  - encryption_keys
  - data_classification
outputs:
  - encryption_assessment
  - gap_analysis
  - implementation_plan
  - compliance_mapping
allowed_tools:
  - filesystem.read
  - filesystem.write
  - bash.exec
  - web.search
required_skills:
  - security.key-management
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Encryption keys stored alongside encrypted data
  - Weak encryption algorithms
  - Not encrypting all sensitive data fields
  - Missing encryption on backups
verification:
  - All sensitive data encrypted with AES-256 or equivalent
  - Encryption keys managed separately from data
  - Backup encryption verified
  - Encryption performance impact assessed
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Decrypt data if encryption causes application failures
validators:
  - skill.validator
---

## Mission
Review and implement encryption at rest for sensitive data across databases, file systems, and cloud storage services to protect data confidentiality in case of storage compromise.

## When To Use
- When storing PII, financial data, or health records
- During compliance audits (PCI-DSS, HIPAA, GDPR)
- When configuring new databases or storage services
- After data breach incidents to assess encryption gaps
- When migrating data to new storage systems

## When Not To Use
- For encryption in transit (use ssl-tls-config skill)
- When only managing encryption keys (use key-management skill)
- For public or non-sensitive data that doesn't require encryption
- When encryption is handled entirely by the cloud provider with no configuration needed

## Procedure
1. **Classify Data Sensitivity**:
   - Identify all data stores (databases, file systems, object storage)
   - Classify data by sensitivity (PII, financial, health, credentials, public)
   - Map data flow from creation to storage to deletion
   - Document regulatory requirements for each data category

2. **Review Database Encryption**:
   - Check transparent data encryption (TDE) for SQL databases
   - Review application-level encryption for sensitive fields
   - Verify column-level encryption for PII columns
   - Check encryption of indexes on encrypted columns
   - Review database backup encryption

3. **Review File System Encryption**:
   - Check full disk encryption (LUKS, BitLocker, FileVault)
   - Review file-level encryption for sensitive documents
   - Verify encryption of temporary files and swap space
   - Check encryption of log files containing sensitive data

4. **Review Cloud Storage Encryption**:
   - Verify server-side encryption (SSE-S3, SSE-KMS, SSE-C)
   - Check client-side encryption before upload
   - Review encryption key management (AWS KMS, GCP KMS, Azure Key Vault)
   - Verify encryption of storage snapshots and backups

5. **Assess Algorithm and Key Strength**:
   - Verify AES-256 or equivalent for symmetric encryption
   - Check RSA-2048+ or ECC P-256+ for asymmetric encryption
   - Verify proper IV/nonce generation (never reuse)
   - Check for deprecated algorithms (DES, 3DES, RC4)

6. **Review Key Management Integration**:
   - Verify keys are not hardcoded or stored with data
   - Check key rotation procedures
   - Review key access controls and audit logging
   - Verify key backup and recovery procedures

7. **Test and Validate**:
   - Verify encrypted data is unreadable without keys
   - Test key rotation without data loss
   - Verify application functionality with encryption enabled
   - Performance test encryption overhead

## Tool Policy
- Use `filesystem.read` to review encryption configuration files
- Use `bash.exec` to check encryption status (dmsetup, pg_encrypt)
- Use `web.search` for encryption best practices and cloud provider docs
- Use `filesystem.write` to produce assessment reports

## Verification
- All sensitive data encrypted with AES-256 or equivalent
- Encryption keys managed in dedicated KMS or HSM
- Backups and snapshots encrypted
- Key rotation tested and documented
- No sensitive data readable in storage without decryption

## Failure Modes
- Storing encryption keys in the same database as encrypted data
- Using weak or deprecated encryption algorithms
- Not encrypting database backups
- IV/nonce reuse in encryption operations
- Performance degradation causing application timeouts

## Example Routes
- PostgreSQL TDE configuration review
- S3 bucket encryption verification (SSE-KMS)
- Application-level PII field encryption in MongoDB
- File system encryption on application servers

## Source Notes
- NIST SP 800-111: Guide to Storage Encryption Technologies
- AWS KMS documentation
- PCI-DSS Requirement 3: Protect Stored Data
- Reference: ref.github.security.2026-05-31
