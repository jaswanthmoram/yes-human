---
id: security.container-scanning
name: Container Image Scanning
version: 1.0.0
domain: security
category: security.infrastructure-security
purpose: Scan container images for vulnerabilities, misconfigurations, and compliance issues.
summary: Container image scanning to detect CVEs in base images, layer vulnerabilities, and security misconfigurations in Dockerfiles.
triggers:
  - check container base image for CVEs
  - scan Docker image for known vulnerabilities
  - scan container image for vulnerabilities
  - docker image security scan
  - check base image for CVEs
  - container security assessment
  - Dockerfile security review
  - scan kubernetes pod images
  - container compliance check
aliases:
  - container scan
  - image scan
  - docker scan
negative_keywords:
  - runtime container monitoring
  - container orchestration
  - container deployment
inputs:
  - container_image
  - dockerfile
  - image_registry
  - compliance_requirements
outputs:
  - vulnerability_report
  - layer_analysis
  - dockerfile_findings
  - remediation_plan
allowed_tools:
  - bash.exec
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Not scanning all layers including base images
  - Missing vulnerabilities in application dependencies inside container
  - Ignoring Dockerfile misconfigurations
  - Not checking for secrets baked into image layers
verification:
  - All image layers scanned for CVEs
  - Dockerfile reviewed for security best practices
  - No critical or high vulnerabilities in production images
  - Image size optimized with minimal attack surface
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous known-good image if scan blocks deployment
validators:
  - skill.validator
---

## Mission
Scan container images for vulnerabilities in base images and application layers, review Dockerfiles for security misconfigurations, and ensure container security compliance.

## When To Use
- Before deploying container images to production
- During CI/CD pipeline as a security gate
- When updating base images or adding new dependencies
- During compliance audits requiring container security evidence
- When reviewing Dockerfiles for security best practices

## When Not To Use
- For runtime container monitoring (use Falco or runtime security agents)
- For container orchestration security (use kubernetes security tools)
- When only checking application dependencies (use dependency-audit)
- For VM or bare-metal server scanning

## Procedure
1. **Identify Images to Scan**:
   - List all container images in registry
   - Identify base images and their versions
   - Map images to services and environments
   - Prioritize production images

2. **Scan Image Layers**:
   - Run vulnerability scanner (Trivy, Grype, Snyk Container)
   - Scan each layer for OS package CVEs
   - Check application dependencies within image
   - Identify secrets or sensitive files in layers

3. **Review Dockerfile Security**:
   - Check for root user execution (missing USER directive)
   - Verify minimal base image usage (distroless, Alpine)
   - Check for unnecessary packages installed
   - Verify COPY vs ADD usage (ADD can extract archives)
   - Check for exposed secrets in build arguments
   - Verify .dockerignore is properly configured

4. **Assess Image Configuration**:
   - Check for excessive capabilities (CAP_SYS_ADMIN)
   - Verify read-only filesystem where possible
   - Check network configuration and exposed ports
   - Review environment variables for sensitive data

5. **Check Compliance**:
   - Verify CIS Docker Benchmark compliance
   - Check for signed images (Docker Content Trust, Cosign)
   - Verify image provenance and SBOM availability
   - Check for approved base image policy compliance

6. **Remediate Findings**:
   - Update base images to patched versions
   - Remove unnecessary packages and files
   - Fix Dockerfile misconfigurations
   - Rebuild images with minimal layers

7. **Integrate into Pipeline**:
   - Add scanning to CI/CD as blocking gate
   - Set severity thresholds for deployment blocking
   - Configure notifications for new vulnerabilities
   - Track vulnerability trends over time

## Tool Policy
- Use `bash.exec` to run Trivy, Grype, or Snyk Container
- Use `filesystem.read` to review Dockerfiles and docker-compose files
- Use `web.search` for CVE details and base image advisories
- Use `filesystem.write` to produce scan reports

## Verification
- All production images scanned with zero critical vulnerabilities
- Dockerfiles follow security best practices
- Images use minimal, approved base images
- Scanning integrated into CI/CD pipeline
- SBOM generated for each image

## Failure Modes
- Only scanning the final layer, missing base image vulnerabilities
- Not updating scanner vulnerability databases
- Ignoring Dockerfile security misconfigurations
- Deploying images with known critical CVEs
- Not scanning sidecar and init container images

## Example Routes
- Scan `Dockerfile` for security misconfigurations before build
- Scan `myapp:latest` image for CVEs before deployment
- Check `node:18-alpine` base image for known vulnerabilities
- Review `docker-compose.yml` for security configurations

## Source Notes
- Trivy: https://github.com/aquasecurity/trivy
- Grype: https://github.com/anchore/grype
- CIS Docker Benchmark
- Reference: ref.github.security.2026-05-31
