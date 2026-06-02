---
id: security.sql-injection
name: SQL Injection Prevention
version: 1.0.0
domain: security
category: security.application-security
purpose: Prevent SQL injection vulnerabilities through parameterized queries, ORM usage, and input validation.
summary: SQL injection prevention review covering parameterized queries, ORM security, stored procedure safety, and input validation.
triggers:
  - review raw SQL queries for injection vulnerabilities
  - review SQL injection protection
  - check for SQL injection vulnerabilities
  - implement parameterized queries
  - SQL injection audit
  - review ORM query safety
  - check raw SQL queries
  - database query security review
aliases:
  - SQLi review
  - SQL injection check
  - query safety audit
negative_keywords:
  - NoSQL databases
  - database performance
  - schema design
inputs:
  - database_query_code
  - orm_configuration
  - stored_procedures
  - input_validation_code
outputs:
  - sqli_assessment_report
  - vulnerable_queries
  - remediation_plan
  - secure_query_patterns
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code.grep
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Missing dynamic query construction
  - ORM raw query bypasses
  - Stored procedure concatenation
  - Second-order SQL injection
verification:
  - All queries use parameterized statements or ORM
  - No string concatenation in SQL queries
  - Input validation on all database inputs
  - Least privilege database accounts configured
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert query changes if they break application functionality
validators:
  - skill.validator
---

## Mission
Prevent SQL injection vulnerabilities by reviewing database query construction patterns, enforcing parameterized queries, and ensuring proper input validation before data reaches the database layer.

## When To Use
- When building or reviewing database query code
- During security review of data access layers
- When migrating from raw SQL to ORM or query builders
- After SQL injection vulnerability reports
- Before deploying applications that interact with SQL databases

## When Not To Use
- For NoSQL databases (different injection patterns, use sast-analysis)
- For database performance optimization (use index-optimization skill)
- For schema design review (use schema-migration skill)
- When only checking database connection security

## Procedure
1. **Identify All Database Access Points**:
   - Map all code paths that execute SQL queries
   - Identify ORM usage, raw queries, and stored procedures
   - Find dynamic query construction patterns
   - Document database connection configurations

2. **Review Query Construction**:
   - Check for string concatenation in SQL queries
   - Verify parameterized queries are used everywhere
   - Review prepared statement usage
   - Check for dynamic table/column name injection
   - Identify LIKE clause injection via wildcards

3. **Assess ORM Security**:
   - Check for raw query methods (e.g., .raw(), .extra(), .execute())
   - Review ORM query builder for injection vectors
   - Check for unsafe dynamic field selection
   - Verify ORM version is patched for known injection bugs

4. **Review Stored Procedures**:
   - Check for dynamic SQL within stored procedures
   - Verify EXECUTE IMMEDIATE uses bind variables
   - Review procedure parameter types and validation
   - Check for privilege escalation through procedures

5. **Check Input Validation**:
   - Verify type checking on numeric parameters
   - Check allowlist validation for sort columns and directions
   - Review pagination parameter validation
   - Verify search query sanitization

6. **Test for Advanced Injection**:
   - Second-order SQL injection (stored then used in query)
   - Blind SQL injection (time-based, boolean-based)
   - UNION-based injection
   - Stacked queries
   - Out-of-band data exfiltration

7. **Implement Defense-in-Depth**:
   - Use least privilege database accounts
   - Implement WAF rules for SQL injection patterns
   - Enable database query logging and monitoring
   - Set up alerts for suspicious query patterns

## Tool Policy
- Use `code.grep` to find raw SQL patterns and string concatenation
- Use `filesystem.read` to review query construction code
- Use `web.search` for SQL injection techniques and ORM advisories
- Use `filesystem.write` to produce assessment reports

## Verification
- Zero instances of string concatenation in SQL queries
- All queries use parameterized statements or safe ORM methods
- Input validation applied before query construction
- Database accounts follow least privilege principle
- No SQL injection possible in testing

## Failure Modes
- Missing dynamic ORDER BY or column name injection
- ORM raw query methods used without parameterization
- Second-order injection through stored data
- Not validating numeric parameters (assuming type safety)
- Stored procedures with dynamic SQL concatenation

## Example Routes
- `GET /users?id=1 OR 1=1` - test parameter injection
- `GET /search?q='; DROP TABLE users;--` - test search injection
- `POST /api/filter` - test dynamic WHERE clause construction
- `GET /api/sort?column=name&dir=ASC` - test ORDER BY injection

## Source Notes
- OWASP SQL Injection Prevention Cheat Sheet
- CWE-89: SQL Injection
- Bobby Tables: https://bobby-tables.com/
- Reference: ref.github.security.2026-05-31
