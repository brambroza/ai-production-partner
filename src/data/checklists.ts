/** Content for the free checklist pages (production readiness + AI security). */

export type ChecklistItem = {
  title: string;
  detail: string;
  critical?: boolean;
};

export type ChecklistGroup = {
  name: string;
  description: string;
  items: ChecklistItem[];
};

export const productionReadinessChecklist: ChecklistGroup[] = [
  {
    name: "Security",
    description: "The items attackers check first — and AI tools miss most often.",
    items: [
      { title: "No secrets in the repository or client bundle", detail: "Full git history scanned; anything found rotated. Config lives in environment variables backed by a secret manager.", critical: true },
      { title: "Authorization enforced per object, not just per login", detail: "Every endpoint verifies the requester's right to the specific resource — tested by replaying another user's IDs.", critical: true },
      { title: "All input validated server-side", detail: "Explicit schemas at every boundary; parameterized queries everywhere; output encoded where user content renders.", critical: true },
      { title: "Dependencies scanned and patched", detail: "No known-critical CVEs shipping; scanning wired into CI so posture doesn't decay." },
      { title: "TLS everywhere with security headers", detail: "HTTPS enforced with HSTS; CSP, X-Content-Type-Options, and frame protections configured." },
      { title: "Rate limiting on auth and expensive endpoints", detail: "Brute-force protection on login; per-user limits on anything costly (email, LLM calls, exports)." },
      { title: "Session and token handling verified", detail: "httpOnly cookies or equivalent; expiry and revocation work; password hashing uses bcrypt/argon2." },
    ],
  },
  {
    name: "Infrastructure",
    description: "Real hosting, reproducible and owned by you.",
    items: [
      { title: "Production runs on infrastructure you own", detail: "Not a preview URL, workspace host, or free tier — cloud resources in your account.", critical: true },
      { title: "Infrastructure defined as code", detail: "Terraform (or equivalent) in version control; the environment can be rebuilt from scratch." },
      { title: "Staging environment exists and matches production", detail: "Same images, same shape, different values — kept in parity via IaC." },
      { title: "Managed database with automated backups", detail: "Point-in-time recovery enabled; database on a private network, never the public internet.", critical: true },
      { title: "Secret manager in place", detail: "Credentials per environment, access-controlled, rotatable without fear." },
      { title: "Domain, DNS, and TLS certificates managed deliberately", detail: "Auto-renewal verified; DNS TTLs known; ownership documented." },
    ],
  },
  {
    name: "Delivery",
    description: "Deployment as a pipeline, not a person.",
    items: [
      { title: "CI pipeline builds and tests every push", detail: "Broken builds and failing tests cannot reach production.", critical: true },
      { title: "Automated deployment to staging and production", detail: "No SSH-and-pray; promotion is a reviewed, repeatable action." },
      { title: "Zero-downtime deploys with health checks", detail: "Rolling or blue-green releases; failed health checks halt the rollout." },
      { title: "One-click rollback, rehearsed", detail: "Every release is versioned and re-deployable; rollback has actually been executed at least once.", critical: true },
      { title: "Database migrations follow expand-contract", detail: "Schema changes are backward-compatible during deploys; destructive changes are split across releases." },
      { title: "Secret and dependency scanning in the pipeline", detail: "A pasted key or vulnerable package is caught at merge time, not in an incident." },
    ],
  },
  {
    name: "Observability",
    description: "You find out before your customers do.",
    items: [
      { title: "Error tracking live in frontend and backend", detail: "Every production exception captured with release tags and context (Sentry or equivalent).", critical: true },
      { title: "Uptime checks on critical user journeys", detail: "External checks every 30–60s on the flows that matter — not just the homepage." },
      { title: "Structured, searchable logs", detail: "JSON logs with request IDs, aggregated where the team can actually query them." },
      { title: "Metrics dashboard for the golden signals", detail: "Latency, error rate, throughput, and saturation on one screen." },
      { title: "Alerts routed to humans who can act", detail: "Severity tiers, escalation, and a runbook link on every alert — tuned so alerts mean something." },
    ],
  },
  {
    name: "Resilience & Operations",
    description: "The bad day, rehearsed.",
    items: [
      { title: "Automated backups with off-site copies", detail: "3-2-1 applied: live data, same-region snapshots, cross-region (ideally cross-account) copy.", critical: true },
      { title: "Restores tested on a schedule", detail: "An actual restore performed and timed against your recovery objective — quarterly at minimum.", critical: true },
      { title: "RPO and RTO defined", detail: "How much data you can lose and how long you can be down — written down and designed for." },
      { title: "Incident runbooks for the likely three", detail: "Bad deploy, database problem, traffic spike: what to check, how to mitigate, when to escalate." },
      { title: "Load tested at expected peak", detail: "The breaking point found on purpose, before launch day finds it for you." },
      { title: "Documentation and handover complete", detail: "Architecture overview, deployment guide, and operational runbooks — knowledge outside one person's head." },
      { title: "Cost guardrails installed", detail: "Budgets, anomaly alerts, and tagging so the cloud bill tracks growth, not entropy." },
    ],
  },
];

export const aiSecurityChecklist: ChecklistGroup[] = [
  {
    name: "Secrets & Credentials",
    description: "The most common — and most exploited — AI-code failure.",
    items: [
      { title: "Full git history scanned for secrets", detail: "Keys pasted into prompts end up in commits. Scan history, not just the current tree.", critical: true },
      { title: "Every found credential rotated", detail: "A committed secret is a leaked secret — deletion doesn't help.", critical: true },
      { title: "Client bundle audited for keys", detail: "Anything shipped to the browser is public, including keys AI tools embed in frontend components.", critical: true },
      { title: "Secret manager adopted", detail: "Environment variables backed by a vault; different credentials per environment." },
      { title: "Secret scanning in CI", detail: "The next pasted key gets caught at commit time." },
    ],
  },
  {
    name: "Authentication & Authorization",
    description: "AI tools do login well and permissions badly.",
    items: [
      { title: "Object-level authorization on every endpoint", detail: "Tested by replaying another user's object IDs against every route that touches data.", critical: true },
      { title: "Token storage and lifetime verified", detail: "httpOnly cookies over localStorage; expiry enforced; revocation actually works." },
      { title: "Password handling to standard", detail: "bcrypt/argon2 hashing; reset flows that expire tokens and don't leak account existence." },
      { title: "Admin surfaces separately protected", detail: "Admin routes gated by role checks and ideally network controls — not just 'hidden' URLs.", critical: true },
    ],
  },
  {
    name: "Input & Data Handling",
    description: "Injection defense at every boundary.",
    items: [
      { title: "Server-side validation with explicit schemas", detail: "Client-side validation is UX, not security. Every boundary validates.", critical: true },
      { title: "Parameterized queries only", detail: "No string-built SQL anywhere — including the corners AI generated at 2 a.m.", critical: true },
      { title: "Output encoding where user content renders", detail: "Stored XSS through user-generated content is a classic AI-app finding." },
      { title: "File uploads constrained", detail: "Type, size, and storage location controlled; uploads never executed or served from the app origin unchecked." },
      { title: "Supabase/BaaS row-level security verified", detail: "For Lovable-style apps: RLS enabled on every table with ownership-checking policies, tested as a hostile user.", critical: true },
    ],
  },
  {
    name: "Dependencies & Pipeline",
    description: "Posture that holds as you keep shipping.",
    items: [
      { title: "Vulnerability scan across the full tree", detail: "No known-critical CVEs; unused packages (AI sessions accumulate them) removed." },
      { title: "Versions pinned and updates automated", detail: "Dependabot/Renovate or equivalent, so patching is routine instead of emergency." },
      { title: "Security checks gate every merge", detail: "Dependency audit, secret scan, and static analysis run in CI — the floor that lets humans review logic instead of syntax." },
    ],
  },
  {
    name: "Abuse & Availability",
    description: "Limits that keep one actor from ruining everyone's day.",
    items: [
      { title: "Rate limiting layered per endpoint class", detail: "Strict on auth, moderate on expensive operations, generous globally — with 429s and alerting on abuse.", critical: true },
      { title: "Timeouts and circuit breakers on external calls", detail: "A slow third party shouldn't stall your request threads." },
      { title: "CORS configured deliberately", detail: "Explicit origins — not the wildcard AI tools default to when the demo needs unblocking." },
    ],
  },
  {
    name: "LLM & AI Features",
    description: "The new attack surface, per the OWASP LLM Top 10.",
    items: [
      { title: "Prompt injection defenses layered", detail: "System instructions separated from user content; model capabilities (tools, queries) minimized so successful injection has a small blast radius.", critical: true },
      { title: "Model output treated as untrusted", detail: "Encoded before rendering, parameterized before querying, sandboxed before executing — no matter how confident it sounds." },
      { title: "Data sent to model providers minimized", detail: "PII redacted where possible; provider retention terms known; privacy policy consistent with actual prompt contents." },
      { title: "Per-user budgets on LLM endpoints", detail: "Token caps and spend alerts — an uncapped LLM endpoint is a bill an attacker can run up." },
    ],
  },
];
