import { PackDefinition } from "@yes-human/core";

export const securityPack: PackDefinition = {
  name: "security-pack",
  description: "A pack containing workflows and skills for system security auditing and vulnerability scanning.",
  workflows: [
    {
      id: "security.prompt-injection-check",
      name: "Prompt Injection Check",
      description: "Scans prompt templates for injection vulnerabilities or jailbreak vulnerability spots",
      triggerPhrases: ["check prompt injection", "prompt injection check", "scan prompt template"],
      requiredSkills: ["injection-detector"],
      expectedInput: "LLM prompt template structures",
      expectedOutput: "Risk assessment showing vulnerability to prompt escape",
      traceSteps: ["identify-unescaped-inputs", "test-jailbreak-payloads", "suggest-guardrail-filters"],
      safetyNotes: "Always employ input validation and sanitization layers."
    },
    {
      id: "security.dependency-risk-review",
      name: "Dependency Risk Review",
      description: "Reviews external package references for known vulnerabilities and licenses",
      triggerPhrases: ["dependency risk review", "check dependency vulnerabilities", "scan npm package safety"],
      requiredSkills: ["dependency-scanner"],
      expectedInput: "package.json or dependencies list",
      expectedOutput: "Vulnerability list matched against security advisories",
      traceSteps: ["resolve-dependencies", "lookup-cve-databases", "recommend-upgrade-paths"],
      safetyNotes: "Use automated package lock pinning to avoid unexpected sub-dependency upgrades."
    },
    {
      id: "security.secrets-detection",
      name: "Secrets Detection",
      description: "Checks files for hardcoded API keys, tokens, or private keys",
      triggerPhrases: ["check security issue", "detect secrets", "check for hardcoded keys"],
      requiredSkills: ["secrets-detector"],
      expectedInput: "Code files or configuration files",
      expectedOutput: "Report listing locations and types of detected credentials",
      traceSteps: ["apply-regex-rules", "measure-entropy", "list-exposed-secrets"],
      safetyNotes: "Rotate exposed credentials immediately; do not rely only on git history deletion."
    },
    {
      id: "security.auth-flow-review",
      name: "Auth Flow Review",
      description: "Reviews authentication and authorization code flows for design flaws",
      triggerPhrases: ["auth flow review", "check authentication logic", "check authorization rules"],
      requiredSkills: ["auth-flow-auditor"],
      expectedInput: "Login, session management, or routing rules code",
      expectedOutput: "Design assessment showing auth bypass vectors and recommended fixes",
      traceSteps: ["verify-token-validation", "check-session-expiry", "audit-rbac-privileges"],
      safetyNotes: "Verify authorization checks are enforced on all backend API routes."
    },
    {
      id: "security.api-security-review",
      name: "API Security Review",
      description: "Checks API routes for authorization issues, rate limits, and sanitization",
      triggerPhrases: ["api security review", "check api vulnerabilities", "audit endpoints"],
      requiredSkills: ["api-auditor"],
      expectedInput: "API endpoint handler source code",
      expectedOutput: "Report showing data validation and access control flaws",
      traceSteps: ["check-input-sanitization", "verify-access-controls", "evaluate-rate-limiting"],
      safetyNotes: "Never trust raw client parameters; sanitize input on the server side."
    }
  ],
  skills: [
    { id: "injection-detector", name: "Injection Detector", description: "Identifies loose variable substitutions in LLM templates." },
    { id: "dependency-scanner", name: "Dependency Scanner", description: "Cross-checks packages against CVE databases." },
    { id: "secrets-detector", name: "Secrets Detector", description: "Finds high-entropy strings and credentials." },
    { id: "auth-flow-auditor", name: "Auth Flow Auditor", description: "Audits token signing, session states, and role permissions." },
    { id: "api-auditor", name: "API Security Auditor", description: "Scans request boundaries and endpoint routing safety." }
  ]
};
