---
id: security.rate-limiting
name: Rate Limiting Implementation
version: 1.0.0
domain: security
category: security.application-security
purpose: Implement and review rate limiting to protect against brute force, DDoS, and abuse.
summary: Rate limiting review covering algorithm selection, distributed limiting, API throttling, and DDoS protection patterns.
triggers:
  - review distributed rate limiting with Redis
  - implement rate limiting on API endpoints
  - implement rate limiting
  - review API throttling
  - check brute force protection
  - rate limiting audit
  - DDoS protection review
  - configure API rate limits
  - implement request throttling
aliases:
  - rate limit
  - throttling
  - API limits
negative_keywords:
  - load balancing
  - auto-scaling
  - CDN configuration
inputs:
  - api_endpoints
  - current_rate_limits
  - traffic_patterns
  - infrastructure_config
outputs:
  - rate_limit_assessment
  - implementation_plan
  - algorithm_recommendation
  - monitoring_setup
allowed_tools:
  - filesystem.read
  - filesystem.write
  - bash.exec
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Rate limits too permissive to prevent abuse
  - Not implementing distributed rate limiting
  - Missing rate limiting on authentication endpoints
  - No monitoring for rate limit violations
verification:
  - All public endpoints have rate limiting
  - Authentication endpoints have strict limits
  - Distributed rate limiting for multi-instance deployments
  - Rate limit violations logged and monitored
  - Graceful degradation under limit exceeded
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Increase rate limits if legitimate traffic is blocked
validators:
  - skill.validator
---

## Mission
Implement and review rate limiting across API endpoints and authentication flows to protect against brute force attacks, credential stuffing, API abuse, and application-layer DDoS.

## When To Use
- When deploying public-facing APIs
- During security hardening of authentication endpoints
- After experiencing brute force or abuse attacks
- When designing API gateway configurations
- Before launching features that could be abused (search, export)

## When Not To Use
- For internal-only APIs with trusted clients
- When only configuring load balancing (different concern)
- For network-layer DDoS protection (use CDN/WAF)
- When rate limiting is fully handled by API gateway with no customization

## Procedure
1. **Identify Endpoints Requiring Rate Limiting**:
   - Map all public-facing API endpoints
   - Prioritize authentication endpoints (login, signup, password reset)
   - Identify expensive operations (search, report generation, file export)
   - Document current traffic patterns and peak loads

2. **Select Rate Limiting Algorithm**:
   - **Fixed Window**: Simple, count requests per time window
   - **Sliding Window Log**: Precise but memory-intensive
   - **Sliding Window Counter**: Balance of precision and efficiency
   - **Token Bucket**: Allows bursts while enforcing average rate
   - **Leaky Bucket**: Smooths out burst traffic
   - Choose based on use case and infrastructure

3. **Define Rate Limit Policies**:
   - Set per-user and per-IP limits
   - Different limits for different endpoint categories
   - Stricter limits for authentication (5-10 attempts per minute)
   - Higher limits for read operations vs write operations
   - Consider tiered limits for free vs paid users

4. **Implement Distributed Rate Limiting**:
   - Use Redis or similar for shared rate limit state
   - Implement consistent hashing for distributed counters
   - Handle race conditions with atomic operations
   - Implement rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining)

5. **Configure Response Handling**:
   - Return 429 Too Many Requests with Retry-After header
   - Include rate limit information in response headers
   - Implement exponential backoff guidance for clients
   - Consider progressive penalties for repeated violations

6. **Implement Defense-in-Depth**:
   - Layer rate limiting at API gateway, application, and WAF
   - Implement CAPTCHA after failed authentication attempts
   - Add IP reputation scoring for adaptive limiting
   - Implement circuit breakers for downstream protection

7. **Monitor and Tune**:
   - Log all rate limit violations with context
   - Set up alerts for unusual rate limit hits
   - Monitor for legitimate users hitting limits
   - Tune limits based on observed traffic patterns

## Tool Policy
- Use `filesystem.read` to review rate limiting implementation code
- Use `bash.exec` to test rate limiting with load testing tools
- Use `web.search` for rate limiting algorithms and library recommendations
- Use `filesystem.write` to produce assessment and configuration reports

## Verification
- All public endpoints have appropriate rate limits
- Authentication endpoints have strict brute force protection
- Distributed rate limiting works across instances
- 429 responses include proper headers
- Rate limit violations logged and monitored
- Legitimate traffic not blocked by overly strict limits

## Failure Modes
- Rate limits too high to prevent brute force attacks
- Not implementing distributed limiting (bypassed via multiple instances)
- Missing rate limiting on password reset or signup endpoints
- No monitoring, missing sustained abuse
- Blocking legitimate users without clear error messages

## Example Routes
- `POST /auth/login` - strict rate limit (5/min per IP, 10/min per user)
- `POST /auth/reset-password` - very strict (3/hour per email)
- `GET /api/search` - moderate limit (60/min per user)
- `POST /api/export` - strict (5/hour per user)

## Source Notes
- OWASP Brute Force Attack Prevention
- Redis Rate Limiting patterns
- IETF RFC 6585 (429 Too Many Requests)
- Reference: ref.github.security.2026-05-31
