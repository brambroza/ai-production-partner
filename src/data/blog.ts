/**
 * Technical blog article templates — 100+ articles generated from
 * parameterized templates so every platform/stack/topic combination gets
 * a structured, SEO-targeted article with real prose. Rendered statically
 * at /blog/[slug].
 */

export type ArticleSection = { heading: string; paragraphs: string[] };

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  /** ISO date, assigned deterministically so builds are reproducible. */
  date: string;
  readingMinutes: number;
  sections: ArticleSection[];
};

/* Deterministic publish dates: spread articles weekly, newest first. */
function dateForIndex(index: number): string {
  const start = new Date("2026-07-06T00:00:00Z").getTime();
  const week = 7 * 24 * 60 * 60 * 1000;
  return new Date(start - index * (week / 2)).toISOString().slice(0, 10);
}

const platforms = [
  { name: "Cursor", stack: "Next.js or Node.js", risk: "API routes generated without authentication or rate limiting" },
  { name: "Claude Code", stack: "Next.js, Python, or Go", risk: "infrastructure files written by the agent but never tested against a real cloud" },
  { name: "Lovable", stack: "React with Supabase", risk: "missing or permissive Supabase Row Level Security policies" },
  { name: "Replit", stack: "Python or Node.js", risk: "workspace-tied databases and secrets that make migration risky" },
  { name: "Bolt", stack: "React or Next.js", risk: "database schemas without indexes, constraints, or a migration story" },
  { name: "v0", stack: "Next.js with shadcn/ui", risk: "polished frontends wired to improvised backends that trust client input" },
  { name: "Windsurf", stack: "TypeScript or Python", risk: "agentic multi-file edits that silently weaken previously secure code" },
  { name: "GitHub Copilot", stack: "any mainstream stack", risk: "suggestions that reproduce vulnerable patterns from training data" },
] as const;

const stacks = [
  { name: "Next.js", server: "Node.js server or serverless functions", db: "PostgreSQL" },
  { name: "React", server: "a separate API backend", db: "PostgreSQL" },
  { name: "Node.js", server: "Express or Fastify services", db: "PostgreSQL" },
  { name: ".NET", server: "ASP.NET Core with Kestrel", db: "SQL Server or PostgreSQL" },
  { name: "Python", server: "FastAPI or Django behind uvicorn/gunicorn", db: "PostgreSQL" },
  { name: "Vue", server: "Nuxt's Nitro server", db: "PostgreSQL" },
  { name: "SvelteKit", server: "the SvelteKit node adapter", db: "PostgreSQL" },
  { name: "Go", server: "net/http or chi services", db: "PostgreSQL" },
] as const;

const clouds = ["AWS", "Azure", "Google Cloud", "DigitalOcean"] as const;

const articles: Omit<BlogArticle, "date" | "readingMinutes">[] = [];

/* ------------------------------------------------------------------ */
/* Template 1: How to deploy <platform> apps to production            */
/* ------------------------------------------------------------------ */
for (const p of platforms) {
  articles.push({
    slug: `how-to-deploy-${slugify(p.name)}-apps-to-production`,
    title: `How to Deploy ${p.name} Apps to Production: The Complete Guide`,
    description: `A step-by-step guide to taking a ${p.name}-built application from working prototype to secure, monitored production: security hardening, Docker, cloud hosting, CI/CD, and operations.`,
    category: "Deployment Guides",
    keywords: [`deploy ${p.name.toLowerCase()} app`, `${p.name.toLowerCase()} production`, "ai app deployment", "production deployment guide"],
    sections: [
      {
        heading: `Why ${p.name} apps need a deployment strategy`,
        paragraphs: [
          `${p.name} can take you from idea to working application faster than any development approach in history. What it cannot do is make that application production-ready: the output is optimized for functional correctness on the happy path, not for security, reliability, or scale.`,
          `The most common gap we see in ${p.name} projects is ${p.risk}. It never shows up in a demo — it shows up when real users, real data, and real attackers arrive. A deliberate deployment strategy closes that gap before launch instead of after an incident.`,
        ],
      },
      {
        heading: "Step 1: Audit the generated code",
        paragraphs: [
          `Before deploying anything, review the codebase (${p.name} projects are ${p.stack} in most cases) for the standard AI-generation issues: hardcoded secrets, missing input validation, endpoints without authorization checks, and dependencies with known vulnerabilities.`,
          `Run a secret scanner across the full git history, not just the current tree — keys pasted into early prompts have a way of surviving in old commits. Rotate anything you find, then move all configuration to environment variables backed by a proper secret store.`,
        ],
      },
      {
        heading: "Step 2: Containerize with a production-grade Dockerfile",
        paragraphs: [
          "A production Dockerfile uses multi-stage builds to keep images small, runs as a non-root user, includes a health check, and handles termination signals so deployments don't drop requests. If your AI tool generated a Dockerfile, treat it as a draft: they routinely ship dev dependencies, root users, and gigabyte-sized layers.",
          "Containerization is what makes the rest of the pipeline possible: identical behavior across your laptop, staging, and production, and the freedom to move between hosts without rework.",
        ],
      },
      {
        heading: "Step 3: Set up real infrastructure",
        paragraphs: [
          "Choose hosting by workload, not fashion: a managed platform or a small, well-monitored cloud setup beats a premature Kubernetes cluster for almost every early-stage app. Define everything in infrastructure-as-code (Terraform is the safe default) so the environment is reproducible and reviewable.",
          "At minimum you need: separate staging and production environments, a managed database with automated backups, TLS everywhere, and a secret manager. These four items prevent the majority of first-year production disasters.",
        ],
      },
      {
        heading: "Step 4: Build the CI/CD pipeline",
        paragraphs: [
          `A pipeline turns deployment from an event into a non-event: every push is built, tested, scanned, and deployed to staging automatically, with production promotion a single reviewed action and rollback available in one click.`,
          `This matters double for ${p.name} teams: when an AI tool writes a large share of your commits, automated test gates are what make that speed sustainable instead of dangerous.`,
        ],
      },
      {
        heading: "Step 5: Add monitoring before launch, not after",
        paragraphs: [
          "Error tracking (Sentry or equivalent), uptime checks on critical user journeys, structured logs, and alerts routed to a channel someone actually reads. AI tools generate exactly none of this, so assume observability is absent until you add it.",
          "Finally, verify your backup restores actually work and write down the recovery procedure. A production system is defined less by how it runs on a good day than by how it recovers on a bad one.",
        ],
      },
      {
        heading: "Get an expert assessment first",
        paragraphs: [
          `If you'd rather have specialists handle this, our team does exactly this work daily: we assess ${p.name} apps against 40+ production checkpoints, harden them, deploy them on infrastructure you own, and support them under SLA. The initial production readiness assessment is free and takes about 48 hours.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 2: Security issues in <platform>-generated code           */
/* ------------------------------------------------------------------ */
for (const p of platforms) {
  articles.push({
    slug: `security-issues-in-${slugify(p.name)}-generated-code`,
    title: `The Top Security Issues We Find in ${p.name}-Generated Code`,
    description: `The recurring security vulnerabilities in applications built with ${p.name} — from exposed secrets to broken authorization — and how to find and fix each one before attackers do.`,
    category: "Security",
    keywords: [`${p.name.toLowerCase()} security`, "ai generated code vulnerabilities", "ai app security audit", "owasp ai code"],
    sections: [
      {
        heading: `${p.name} writes vulnerabilities with perfect confidence`,
        paragraphs: [
          `AI coding tools produce code that looks clean, compiles, and works — which is exactly why its security flaws survive review. In our audits of ${p.name} projects, the same categories of finding appear again and again, and the platform-signature issue is ${p.risk}.`,
          "None of this means the tool is unusable; it means generated code needs the same security review that any code shipped to production needs — plus a few checks specific to how AI tools fail.",
        ],
      },
      {
        heading: "Finding 1: Secrets in the repository",
        paragraphs: [
          "API keys pasted into prompts end up in source files; source files end up in git history; git history ends up public or shared. A full-history secret scan is the first thing to run on any AI-built codebase, and rotation — not deletion — is the fix, because a key that was ever committed must be treated as leaked.",
        ],
      },
      {
        heading: "Finding 2: Missing authorization checks",
        paragraphs: [
          "AI tools implement authentication (who are you?) far more reliably than authorization (are you allowed to touch this specific object?). The result is APIs where any logged-in user can read or modify any other user's data by changing an ID in the request — broken object-level authorization, the top API vulnerability class in the wild.",
          "The fix is systematic, not clever: every endpoint that touches a resource must verify the requester's right to that specific resource, and a test should prove it.",
        ],
      },
      {
        heading: "Finding 3: Unvalidated input and injection paths",
        paragraphs: [
          "Generated CRUD code frequently interpolates user input into queries, shell commands, or HTML. Parameterized queries, schema validation at every boundary, and output encoding are decades-old defenses — AI tools apply them inconsistently, and one missed spot is enough.",
        ],
      },
      {
        heading: "Finding 4: Vulnerable and abandoned dependencies",
        paragraphs: [
          `AI sessions accumulate dependencies enthusiastically and update them never. Run a vulnerability scan across the full tree, remove what's unused, pin what remains, and automate updates — otherwise your security posture decays monotonically from launch day.`,
        ],
      },
      {
        heading: "What to do about it",
        paragraphs: [
          `Run the free checks above yourself — they catch the worst offenders. For a systematic review, our AI Security Audit covers the OWASP Top 10, the OWASP LLM Top 10 for AI features, and the ${p.name}-specific failure patterns, with fixes verified rather than just reported.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 3: <platform> production checklist                        */
/* ------------------------------------------------------------------ */
for (const p of platforms) {
  articles.push({
    slug: `${slugify(p.name)}-app-production-checklist`,
    title: `${p.name} App Production Checklist: 12 Things to Verify Before Launch`,
    description: `The pre-launch checklist for ${p.name}-built applications: security, infrastructure, delivery, and operations items to verify before real users arrive.`,
    category: "Checklists",
    keywords: [`${p.name.toLowerCase()} production checklist`, `${p.name.toLowerCase()} launch checklist`, "go live checklist", "production readiness"],
    sections: [
      {
        heading: "Before the checklist: know what you're launching",
        paragraphs: [
          `A ${p.name} app that demos well is maybe 60% of a production system. The missing 40% — hardening, infrastructure, observability, recovery — is invisible in a demo and decisive in production. This checklist covers that 40%, ordered by how badly each item hurts when it's missing.`,
        ],
      },
      {
        heading: "Security (items 1–4)",
        paragraphs: [
          "1. No secrets in the repository or client bundle — verified by scanning full git history, with anything found rotated. 2. Every endpoint enforces authorization on the specific object it touches, not just login. 3. All input validated server-side; all queries parameterized. 4. Dependencies scanned, with no known-critical vulnerabilities shipping.",
          `For ${p.name} specifically, double-check the platform's signature weakness: ${p.risk}.`,
        ],
      },
      {
        heading: "Infrastructure (items 5–8)",
        paragraphs: [
          "5. Production runs on infrastructure you own and can reproduce — not a preview URL or workspace host. 6. Staging environment exists and matches production. 7. TLS everywhere, security headers set, and a managed database with automated backups. 8. A restore has been performed successfully at least once — an untested backup is a hypothesis, not a safeguard.",
        ],
      },
      {
        heading: "Delivery & operations (items 9–12)",
        paragraphs: [
          "9. Deployments run through a pipeline with automated tests, not a human with SSH access. 10. Rollback is one action and has been rehearsed. 11. Error tracking and uptime monitoring are live, with alerts reaching a human who can act. 12. There is a written runbook for the three most likely incidents: bad deploy, database problem, and traffic spike.",
        ],
      },
      {
        heading: "Score yourself honestly",
        paragraphs: [
          `Most ${p.name} apps we assess start at 3–5 of 12. That's not a criticism of the builder — it's the nature of what AI tools optimize for. Our free Production Readiness Assessment scores your app across the full 40+ checkpoint version of this list and hands you a prioritized plan, whether or not you engage us to execute it.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 4: From prototype to production story                     */
/* ------------------------------------------------------------------ */
for (const p of platforms) {
  articles.push({
    slug: `from-${slugify(p.name)}-prototype-to-production-system`,
    title: `From ${p.name} Prototype to Production System: What Actually Changes`,
    description: `What separates a ${p.name} prototype from a production system — architecture, security, infrastructure, and operations — explained for founders and engineering leads.`,
    category: "Production Readiness",
    keywords: [`${p.name.toLowerCase()} prototype to production`, "productionize ai app", "ai mvp to production", "production readiness"],
    sections: [
      {
        heading: "The prototype was the easy 60%",
        paragraphs: [
          `${p.name} compresses months of feature development into days — a genuine revolution. But features are the visible part of a software system. The invisible parts (security hardening, environments, pipelines, observability, recovery) don't get generated, because nobody prompts for them and demos don't need them.`,
          "Going to production means building that invisible layer. The good news: it's well-understood, mostly standard work — far more predictable than the product development that preceded it.",
        ],
      },
      {
        heading: "What stays: your code, your product, your speed",
        paragraphs: [
          `Productionizing a ${p.name} app almost never means rewriting it. In our engagements the generated code is refactored where it blocks security or scale and otherwise kept. Crucially, you keep building with ${p.name} afterward — the pipeline and test gates we add are what make continued AI-speed development safe.`,
        ],
      },
      {
        heading: "What changes: five upgrades",
        paragraphs: [
          "First, security: secrets move to a vault, every endpoint gets authorization checks, input validation becomes systematic. Second, infrastructure: the app moves onto cloud resources you own, defined as code, with staging separated from production. Third, delivery: deployments become an automated pipeline with tests and instant rollback.",
          `Fourth, observability: error tracking, logs, metrics, and alerting — so you learn about problems from dashboards, not customers. Fifth, recovery: automated backups with tested restores and a written plan for bad days. Together these turn ${p.risk} and its cousins from time bombs into handled cases.`,
        ],
      },
      {
        heading: "What it costs — and what skipping it costs",
        paragraphs: [
          "A typical productionization engagement runs two to six weeks. Compare that against the alternative: a data breach disclosure, a lost production database, or a launch-day outage in front of your biggest audience. Production readiness is dramatically cheaper than any one of the incidents it prevents.",
          "If you want the exact gap analysis for your app, our free 48-hour Production Readiness Assessment scores it across 40+ checkpoints and gives you the prioritized roadmap — no obligation attached.",
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 5: Cost of running <platform> apps                        */
/* ------------------------------------------------------------------ */
for (const p of platforms) {
  articles.push({
    slug: `what-it-costs-to-run-a-${slugify(p.name)}-app-in-production`,
    title: `What It Really Costs to Run a ${p.name} App in Production`,
    description: `Realistic monthly infrastructure, tooling, and operations costs for a production ${p.name} application — with the budget line items teams forget.`,
    category: "Cloud & Costs",
    keywords: [`${p.name.toLowerCase()} hosting cost`, "production infrastructure cost", "cloud cost startup", "app running costs"],
    sections: [
      {
        heading: "The number everyone wants upfront",
        paragraphs: [
          `For a typical early-stage ${p.name} app (built on ${p.stack}) serving up to a few thousand users: expect roughly $50–$400 per month in infrastructure — app hosting, a managed database, storage, CDN — plus $0–$100 in monitoring and tooling. Well under a coffee budget for most funded teams, when it's sized deliberately.`,
          "The variance comes from three factors: traffic pattern, data volume, and how efficiently the generated code uses the database. That last one is where AI-built apps surprise people.",
        ],
      },
      {
        heading: "Where AI-built apps overspend",
        paragraphs: [
          "Generated code tends to be chatty: N+1 query patterns, missing caches, and oversized payloads translate directly into database and compute bills. We routinely cut 30–60% from cloud spend by fixing query patterns and right-sizing — the code gets faster and cheaper simultaneously.",
          "The other classic: infrastructure copied from enterprise tutorials. A three-node Kubernetes cluster for 200 users burns money and attention that an early-stage product needs elsewhere.",
        ],
      },
      {
        heading: "The line items teams forget",
        paragraphs: [
          "Backups and their storage (cheap, mandatory), staging environments (typically 20–40% of production cost — worth every cent), error tracking and uptime tooling, and the big one: operations time. Someone has to patch, monitor, and respond. Budget either engineer hours or a support plan; budgeting zero is how outages get scheduled.",
        ],
      },
      {
        heading: "Budgeting honestly",
        paragraphs: [
          `A defensible early-stage budget: infrastructure $100–$400/month, tooling $0–$100, and an operations answer (in-house time or an SLA-backed support plan). Our free assessment includes a right-sized architecture with exact monthly numbers for your ${p.name} app — so the budget is based on your workload, not on averages.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 6: Stack production best practices                        */
/* ------------------------------------------------------------------ */
for (const s of stacks) {
  articles.push({
    slug: `${slugify(s.name)}-production-deployment-best-practices`,
    title: `${s.name} Production Deployment: Best Practices That Actually Matter`,
    description: `Production deployment best practices for ${s.name}: configuration, containerization, scaling, and the operational setup that keeps ${s.name} apps reliable under real traffic.`,
    category: "Deployment Guides",
    keywords: [`${s.name.toLowerCase()} production`, `${s.name.toLowerCase()} deployment best practices`, `${s.name.toLowerCase()} docker`, `${s.name.toLowerCase()} scaling`],
    sections: [
      {
        heading: `${s.name} in production: the essentials`,
        paragraphs: [
          `A production ${s.name} deployment runs ${s.server} behind a load balancer or reverse proxy, talks to ${s.db} through a tuned connection pool, and ships as a container so every environment behaves identically. Everything else builds on that foundation.`,
          "Configuration lives in environment variables backed by a secret manager — never in code, never in the image. Separate configuration per environment is what makes staging trustworthy.",
        ],
      },
      {
        heading: "Build and containerization",
        paragraphs: [
          `Use multi-stage Docker builds: compile and bundle in a build stage, then copy only runtime artifacts into a minimal final image running as a non-root user with a health check. For ${s.name} this typically cuts image size by 60–90% versus naive Dockerfiles and removes whole classes of vulnerabilities from the runtime image.`,
        ],
      },
      {
        heading: "Reliability under load",
        paragraphs: [
          `The failure modes that actually take ${s.name} services down: exhausted database connections, unbounded request handling during spikes, and slow queries that back everything up. Set explicit pool sizes, timeouts, and rate limits; add indexes based on real query plans; and load-test at your expected peak before launch day tests it for you.`,
          "Graceful shutdown matters more than teams expect: handling termination signals correctly is the difference between zero-downtime deploys and dropped requests on every release.",
        ],
      },
      {
        heading: "Delivery and observability",
        paragraphs: [
          "Automate the pipeline: build, test, scan, deploy to staging, promote to production with health-check verification and one-click rollback. Wire in error tracking and structured logs with request IDs from day one — debugging production without them is archaeology.",
          `If your ${s.name} app was generated by AI tools, add automated test gates before trusting the pipeline: AI-written commits need the same regression protection as human ones, at higher volume.`,
        ],
      },
      {
        heading: "When to get help",
        paragraphs: [
          `We deploy and operate ${s.name} applications professionally — hardened containers, right-sized cloud infrastructure, CI/CD, monitoring, and SLA-backed support. The initial production readiness assessment is free and gives you a scored, prioritized report within 48 hours.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 7: Stack scaling guide                                    */
/* ------------------------------------------------------------------ */
for (const s of stacks) {
  articles.push({
    slug: `scaling-${slugify(s.name)}-apps-what-breaks-first`,
    title: `Scaling ${s.name} Apps: What Breaks First and How to Fix It`,
    description: `The predictable order in which ${s.name} applications fail under growth — database, connections, memory, then architecture — and the fix for each stage.`,
    category: "Performance",
    keywords: [`scaling ${s.name.toLowerCase()}`, `${s.name.toLowerCase()} performance`, `${s.name.toLowerCase()} slow`, "app scaling guide"],
    sections: [
      {
        heading: "Scaling problems arrive in a predictable order",
        paragraphs: [
          `Growth doesn't break ${s.name} apps randomly — it breaks them in sequence. Knowing the sequence means you fix each ceiling a month before you hit it instead of the night you do. For nearly every ${s.name} app backed by ${s.db}, the sequence starts at the database.`,
        ],
      },
      {
        heading: "Stage 1: The database (100–10,000 users)",
        paragraphs: [
          "First come the missing indexes: queries that scanned 50 test rows instantly now scan 500,000. Then the N+1 patterns AI tools love to generate: one page view triggering hundreds of queries. Both are cheap to fix — index design and query batching — and together they resolve most 'we need a bigger server' conversations.",
          "Connection exhaustion follows: every app instance times its pool, and the database runs out. Explicit pool sizing plus a pooler (like PgBouncer for PostgreSQL) buys an order of magnitude.",
        ],
      },
      {
        heading: "Stage 2: The application layer (10,000–100,000 users)",
        paragraphs: [
          `Next, ${s.server} runs hot: CPU-bound work blocking request handling, memory creep, and slow external calls with no timeouts stalling everything behind them. The fixes: move heavy work to background queues, set timeouts and circuit breakers on every external call, and add caching (Redis or HTTP-level) for the read-heavy paths that dominate real traffic.`,
          "This is also where horizontal scaling starts paying: multiple stateless app instances behind a load balancer, with session state moved out of process. Statelessness is the property to protect from day one.",
        ],
      },
      {
        heading: "Stage 3: Architecture (100,000+ users)",
        paragraphs: [
          "Genuine architectural change — read replicas, sharding, service extraction, event-driven flows — belongs at this stage and not before. Teams that jump here early buy complexity without traffic to justify it; teams that arrive here with stages 1–2 done make the transition calmly, with data.",
        ],
      },
      {
        heading: "Measure before touching anything",
        paragraphs: [
          `Every fix above should be driven by profiling, not intuition — the bottleneck is usually not where anyone guesses. Our performance optimization engagements start with APM-based measurement and end with before/after numbers on your real workload. If your ${s.name} app is slowing down, the free assessment will tell you which stage you're in.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 8: Stack security hardening                               */
/* ------------------------------------------------------------------ */
for (const s of stacks) {
  articles.push({
    slug: `${slugify(s.name)}-security-hardening-guide`,
    title: `${s.name} Security Hardening Guide for Production`,
    description: `A practical security hardening guide for ${s.name} applications heading to production: headers, auth, validation, dependencies, and the AI-generated-code pitfalls specific to ${s.name}.`,
    category: "Security",
    keywords: [`${s.name.toLowerCase()} security`, `${s.name.toLowerCase()} hardening`, `secure ${s.name.toLowerCase()} app`, "production security checklist"],
    sections: [
      {
        heading: "The hardening baseline",
        paragraphs: [
          `Every production ${s.name} deployment needs the same baseline: TLS everywhere with HSTS, security headers (CSP, X-Content-Type-Options, frame protections), secrets in a vault rather than code or images, authenticated and authorized endpoints, validated input at every boundary, and a dependency tree free of known-critical CVEs.`,
          "None of this is exotic. What makes it urgent is volume: AI coding tools now generate a large share of new " + s.name + " code, and they apply these controls inconsistently — so verification has to be systematic.",
        ],
      },
      {
        heading: "Authentication vs. authorization — the gap that breaches",
        paragraphs: [
          "Login flows are usually fine; per-object permission checks are usually not. Verify that every endpoint touching user data confirms the requester's right to that specific record — the vulnerability class known as broken object-level authorization is the single most common critical finding in our audits, across every stack including " + s.name + ".",
        ],
      },
      {
        heading: "Injection defense",
        paragraphs: [
          `All database access goes through parameterized queries or a vetted ORM — no string-built SQL, ever. Validate request bodies against explicit schemas server-side, and encode output where user content is rendered. For ${s.name} apps talking to ${s.db}, also restrict the database user's privileges: the app account should not own the schema it queries.`,
        ],
      },
      {
        heading: "Dependencies and the pipeline",
        paragraphs: [
          "Scan dependencies in CI on every merge, pin versions, and automate updates — a security posture that isn't enforced by the pipeline decays within months. Add secret scanning to CI as well, so a pasted key is caught at commit time instead of in an incident report.",
        ],
      },
      {
        heading: "Verify, don't assume",
        paragraphs: [
          `If your ${s.name} app was built fast — especially with AI tools — assume the baseline is partially missing and verify item by item. Our AI Security Audit does exactly that, with findings fixed and re-tested rather than just listed. The initial assessment is free.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 9: Cloud deployment guides                                */
/* ------------------------------------------------------------------ */
for (const c of clouds) {
  articles.push({
    slug: `deploying-ai-built-apps-to-${slugify(c)}`,
    title: `Deploying AI-Built Apps to ${c}: Architecture and Cost Guide`,
    description: `How to deploy an AI-generated application to ${c}: right-sized architecture, security baseline, cost expectations, and the mistakes to avoid.`,
    category: "Cloud & Costs",
    keywords: [`deploy to ${c.toLowerCase()}`, `${c.toLowerCase()} architecture`, `${c.toLowerCase()} cost`, "ai app cloud deployment"],
    sections: [
      {
        heading: `What a right-sized ${c} setup looks like`,
        paragraphs: [
          `For a typical AI-built web application, the productive ${c} architecture is boring on purpose: containerized app compute, a managed database with automated backups, object storage, a CDN in front, and monitoring — all defined in Terraform, all in your own account. Boring architectures are the ones that stay up.`,
          `${c} offers hundreds of services; your app needs about six. The skill is in the selection and the sizing, not in the service count.`,
        ],
      },
      {
        heading: "The security baseline that must ship on day one",
        paragraphs: [
          "Least-privilege IAM (no wildcard admin roles wired to app workloads), private networking for the database, encryption at rest and in transit, a secret manager instead of environment files, and audit logging enabled. Retrofitting these after launch is many times the cost of including them — and AI-generated deployment configs almost never include them.",
        ],
      },
      {
        heading: `What it costs on ${c}`,
        paragraphs: [
          `Early-stage workloads land in the $50–$400/month range on ${c} when sized to measured usage. The overruns come from predictable places: oversized instances, always-on dev environments, unbounded data transfer, and storage that only ever grows. Budgets and anomaly alerts belong in the first deployment, not the first crisis.`,
        ],
      },
      {
        heading: "Common mistakes to avoid",
        paragraphs: [
          `Console-clicked infrastructure nobody can reproduce; a single environment doing double duty as staging and production; backups that have never been restored; and premature Kubernetes. Each is cheap to avoid upfront and expensive to unwind later.`,
          `If you want this done professionally, we design, secure, and operate ${c} deployments for AI-built apps — with a free assessment producing a concrete architecture and monthly cost estimate for your workload.`,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* Template 10: Standalone evergreen articles                          */
/* ------------------------------------------------------------------ */
const evergreen: { slug: string; title: string; description: string; category: string; keywords: string[]; sections: ArticleSection[] }[] = [
  {
    slug: "why-ai-generated-apps-fail-in-production",
    title: "Why AI-Generated Apps Fail in Production (and How to Prevent It)",
    description: "The five systematic reasons applications built with AI coding tools fail after launch — security gaps, invisible architecture, missing operations — and the prevention playbook.",
    category: "Production Readiness",
    keywords: ["ai apps fail production", "ai generated code problems", "vibe coding production", "ai app reliability"],
    sections: [
      { heading: "Failure is systematic, not random", paragraphs: ["AI-built apps don't fail in production because AI writes bad code — they fail because production readiness was never in the prompt. Demos need features; production needs security, observability, recovery, and scale headroom. AI tools deliver the first brilliantly and the second essentially never, so every generated app launches with the same invisible gaps.", "That's actually good news: systematic failure has systematic prevention. The same five gaps appear in nearly every AI-built app we assess, in roughly the same priority order."] },
      { heading: "Gap 1: Security that was never asked for", paragraphs: ["Hardcoded secrets, missing per-object authorization, unvalidated input, and vulnerable dependencies — present in the large majority of AI-generated codebases we audit. Attackers scan for exactly these patterns because they know AI tools produce them at scale."] },
      { heading: "Gap 2: Architecture nobody chose", paragraphs: ["Each AI session makes locally-reasonable decisions that accumulate into a globally-fragile system: N+1 queries, state in surprising places, no service boundaries. It works at demo scale and hits a ceiling — usually the database — at real scale."] },
      { heading: "Gap 3: Prototype infrastructure carrying production load", paragraphs: ["Preview URLs, workspace hosts, and free-tier databases carrying paying customers. No staging, no reproducibility, no meaningful uptime guarantee — hosting chosen by default rather than decision."] },
      { heading: "Gaps 4 and 5: No eyes, no recovery", paragraphs: ["Zero observability (the outage is discovered by customers) and zero recovery story (the backup, if it exists, has never been restored). These two turn small incidents into existential ones.", "Prevention is a known quantity: a structured readiness assessment, security hardening, real infrastructure with a pipeline, monitoring, and tested backups. Two to six weeks of work that transforms the risk profile of everything you ship afterward."] },
    ],
  },
  {
    slug: "vibe-coding-to-production-a-cto-guide",
    title: "From Vibe Coding to Production: A CTO's Guide",
    description: "How engineering leaders can harness AI-speed development without inheriting AI-scale risk: governance, pipelines, and the production layer that makes vibe coding sustainable.",
    category: "Production Readiness",
    keywords: ["vibe coding", "cto guide ai development", "ai development governance", "ai code production"],
    sections: [
      { heading: "The CTO's dilemma", paragraphs: ["Your teams (and your founders) are shipping features at a speed that was impossible two years ago, and a growing share of your codebase was written by tools nobody fully reviews. Banning the tools is both futile and wrong — the speed is real business value. The job is to make that speed safe.", "The answer isn't reviewing every AI-written line; it's building the system that catches what review misses: automated gates, hardened infrastructure, and observability."] },
      { heading: "Govern the pipeline, not the prompt", paragraphs: ["Effective AI-era governance is boring and mechanical: every merge passes automated tests, dependency scanning, and secret detection; every deploy goes through staging with health-checked rollout and one-click rollback; every endpoint change inherits authorization tests. Rules enforced by pipelines scale with AI-speed development; rules enforced by meetings don't."] },
      { heading: "Budget for the invisible 40%", paragraphs: ["Feature development is now cheap; production engineering is not, and the ratio in your budget should reflect it. Teams that allocate explicitly for hardening, infrastructure, and operations ship AI-built products that survive. Teams that don't, pay the same cost later with incident interest added."] },
      { heading: "The metrics that matter", paragraphs: ["Track deployment frequency, change failure rate, time-to-restore, and security findings per release. AI tools push the first metric up; your production layer determines whether the other three follow. If change failure rate climbs with velocity, the safety net is lagging the speed — invest there first."] },
    ],
  },
  {
    slug: "production-readiness-explained-for-founders",
    title: "Production Readiness, Explained for Non-Technical Founders",
    description: "What 'production-ready' actually means, why your AI-built MVP probably isn't, and how to budget for the gap — in plain language for founders.",
    category: "Production Readiness",
    keywords: ["production ready meaning", "founder guide production", "mvp to production cost", "ai mvp risks"],
    sections: [
      { heading: "A plain-language definition", paragraphs: ["Production-ready means your app can be trusted with real customers and real data: it resists attacks, stays up when traffic spikes, tells you when something breaks, and can recover when the worst happens. Your AI-built MVP does the features; production readiness is everything around the features.", "A useful mental model: the demo is the house tour; production readiness is the wiring, plumbing, insurance, and smoke detectors. Invisible until they're not."] },
      { heading: "The questions to ask your team (or vendor)", paragraphs: ["Where do our secrets live, and have we scanned for leaked keys? If our database vanished right now, how much data do we lose and how long until we're back? How would we know about an outage before a customer emails? Can we undo a bad release in one step? Clear answers to those four questions are most of production readiness; blank stares are your risk report."] },
      { heading: "What the gap costs to close — and to ignore", paragraphs: ["Closing the gap on a typical AI-built app is a two-to-six-week engineering engagement — a bounded, predictable cost. Ignoring it prices differently: a breach means disclosure and customer loss; a lost database can mean the company. The asymmetry is the whole argument.", "Start with an assessment (ours is free and takes 48 hours): a scored report of exactly where your app stands and a prioritized plan. Then decide what to fix, in what order, with real numbers."] },
    ],
  },
  {
    slug: "hardcoded-secrets-the-most-common-ai-code-vulnerability",
    title: "Hardcoded Secrets: The Most Common Vulnerability in AI-Generated Code",
    description: "Why API keys and credentials end up hardcoded in AI-generated applications, how attackers find them within minutes, and the remediation playbook.",
    category: "Security",
    keywords: ["hardcoded secrets", "api key leak", "secret scanning", "ai code secrets"],
    sections: [
      { heading: "How secrets get into AI-built code", paragraphs: ["It starts innocently: you paste an API key into a prompt so the tool can wire up an integration, and the tool does exactly what you asked — embeds it in the source. The file gets committed, the repo gets shared or published, and the key is now permanently in git history even if you later delete the line.", "Public GitHub repos are scanned by bots within minutes of pushing. A leaked cloud key routinely becomes a five-figure crypto-mining bill overnight; a leaked database URL becomes a breach."] },
      { heading: "The remediation playbook", paragraphs: ["One: scan the full git history (not just current files) with a secret scanner. Two: rotate every key found — a committed secret is a leaked secret, deletion doesn't help. Three: move configuration to environment variables backed by a secret manager. Four: add secret scanning to CI so the next paste is caught at commit time. Five: audit client bundles separately — keys shipped to the browser are public by definition.", "This entire playbook takes a day or two on most codebases, which makes it the highest ROI security work available. It's also the first item in every audit we run — and the most frequently failed."] },
    ],
  },
  {
    slug: "supabase-row-level-security-for-ai-built-apps",
    title: "Supabase Row Level Security: The Setting That Protects (or Exposes) Your AI-Built App",
    description: "Why Row Level Security is the single most important configuration in Lovable and Supabase-backed apps, the common misconfigurations, and how to verify yours.",
    category: "Security",
    keywords: ["supabase row level security", "lovable security", "supabase rls policies", "supabase data exposure"],
    sections: [
      { heading: "Why RLS is everything in a Supabase app", paragraphs: ["Supabase-backed apps — including most Lovable output — let the browser talk to the database directly. There's no API layer to enforce permissions, so Row Level Security policies are the only thing standing between any user and every row in your tables. RLS disabled or misconfigured doesn't mean 'less secure'; it means every user can read and write everyone's data with a few lines of JavaScript.", "This isn't theoretical: researchers keep finding production apps with hundreds of thousands of exposed records, all traceable to missing RLS."] },
      { heading: "The three standard misconfigurations", paragraphs: ["RLS never enabled on a table (everything exposed); policies that check authentication but not ownership (any logged-in user reads all rows); and service-role keys shipped in client code (bypassing RLS entirely). AI builders produce all three, because a permissive database makes the demo work on the first try."] },
      { heading: "How to verify yours today", paragraphs: ["In the Supabase dashboard, confirm RLS is enabled on every table containing user data. Then test as a real attacker would: sign in as user A and query user B's rows via the client library. If data comes back, you have a breach in waiting. Finally, grep your client bundle for the service-role key — it should exist only in server environments.", "Our AI Security Audit runs this verification (and about forty others) systematically — worth doing before your user count makes the stakes real."] },
    ],
  },
  {
    slug: "n-plus-one-queries-why-your-ai-app-got-slow",
    title: "N+1 Queries: Why Your AI-Built App Got Slow the Moment Real Data Arrived",
    description: "The N+1 query pattern AI coding tools generate constantly: how to detect it, why it cripples apps at scale, and the batching and eager-loading fixes.",
    category: "Performance",
    keywords: ["n+1 queries", "app slow with data", "orm performance", "database query optimization"],
    sections: [
      { heading: "The pattern", paragraphs: ["Fetch a list of 100 orders, then loop through them fetching each customer — 101 queries where 2 would do. That's N+1: invisible with 10 test rows, catastrophic with 100,000 real ones. AI tools generate it constantly because the naive loop is the most statistically likely code for the prompt, and it works perfectly in the demo.", "If your app 'suddenly got slow' as data grew, this is the first suspect — it's the cause in well over half the performance engagements we run."] },
      { heading: "Detection in ten minutes", paragraphs: ["Turn on query logging (or an APM tool) and load your slowest page. If one page view produces dozens or hundreds of similar queries differing only by ID, you've found it. Sort your endpoints by query count per request — the worst offenders are usually a handful of hot paths."] },
      { heading: "The fixes, in order of preference", paragraphs: ["Eager-load the association through your ORM (include/joins/select_related — every ORM has it) so the list and its relations arrive in one or two queries. Where the ORM can't express it, batch by collecting IDs and querying once with IN. Where reads dominate, add caching on top. Typical result: endpoints drop from seconds to tens of milliseconds — and the database bill drops with them.", "Then make it stay fixed: add query-count assertions to tests for hot endpoints, so the next AI-generated feature can't quietly reintroduce the loop."] },
    ],
  },
  {
    slug: "docker-multi-stage-builds-for-smaller-safer-images",
    title: "Docker Multi-Stage Builds: Smaller, Safer Images for Production",
    description: "How multi-stage Docker builds cut image size by 60–90%, remove attack surface, and speed up deployments — with the pattern applied per stack.",
    category: "DevOps",
    keywords: ["docker multi stage build", "docker image size", "docker security", "production dockerfile"],
    sections: [
      { heading: "Why image size is a security issue", paragraphs: ["Everything in your production image is attack surface: compilers, package managers, dev dependencies, shells. A naive Dockerfile ships all of it. Multi-stage builds split the process — build in a full-featured stage, then copy only runtime artifacts into a minimal final image. Typical results: a 1.2 GB Node image becomes 150 MB; vulnerability scanner findings drop by half or more just from what's no longer present."] },
      { heading: "The pattern", paragraphs: ["Stage one starts from a full base image, installs dependencies, and builds. Stage two starts from a slim or distroless base, copies the built artifacts and production dependencies only, sets a non-root user, defines a health check, and declares the runtime command. The same shape works across Node.js, Python, .NET, Go, and JVM stacks — only the details change.", "Add three habits: pin base images by digest, scan images in CI, and rebuild on base-image updates. That turns your container layer from a liability inventory into a maintained asset."] },
      { heading: "What AI-generated Dockerfiles get wrong", paragraphs: ["The generated Dockerfile is almost always single-stage, root-user, dev-dependencies-included, and health-check-free — a working demo artifact, not a deployment artifact. It's fine as a draft; it's not fine in production. Rework it before it ships, or have us do it as part of a containerization engagement."] },
    ],
  },
  {
    slug: "staging-environments-why-you-need-one",
    title: "Staging Environments: The Cheapest Insurance in Software",
    description: "Why a production-parity staging environment prevents most deployment disasters, what parity actually requires, and how to run one affordably.",
    category: "DevOps",
    keywords: ["staging environment", "production parity", "deployment safety", "preview environments"],
    sections: [
      { heading: "The argument in one paragraph", paragraphs: ["Every change meets real conditions somewhere — the only choice is whether that's staging or in front of customers. A staging environment that mirrors production catches migration failures, config drift, integration breakage, and performance regressions at the cost of a review step. It is the single cheapest reliability investment available, and the one AI-built projects most reliably lack."] },
      { heading: "What parity actually means", paragraphs: ["Same container images, same infrastructure shape (smaller sizes are fine), same environment variable structure with different values, and realistic data volume — anonymized or synthetic, never raw production data. The classic staging failure is drift: it worked in staging because staging quietly stopped resembling production. Infrastructure-as-code is the anti-drift mechanism — both environments built from the same definitions."] },
      { heading: "Running it affordably", paragraphs: ["Staging typically costs 20–40% of production: smaller instances, scale-to-zero where the platform allows, and automated teardown of idle resources. Per-pull-request preview environments are a worthwhile upgrade for teams shipping constantly — each PR gets a disposable environment, so review means clicking through the actual change.", "Every deployment we build includes staging by default. When a client asks to skip it to save cost, we show them what one bad production deploy costs instead — the conversation is short."] },
    ],
  },
  {
    slug: "zero-downtime-deployments-explained",
    title: "Zero-Downtime Deployments, Explained",
    description: "Rolling, blue-green, and canary deployment strategies compared — plus the database migration discipline that makes any of them actually work.",
    category: "DevOps",
    keywords: ["zero downtime deployment", "blue green deployment", "rolling deployment", "database migrations deploy"],
    sections: [
      { heading: "Why deploys cause downtime", paragraphs: ["The naive deploy stops the old version and starts the new one — dropping every in-flight request and going dark for however long startup takes, with no path back but panic if the new version is broken. Zero-downtime strategies all follow one principle: run old and new side by side, shift traffic gradually, and keep the old version ready until the new one proves healthy."] },
      { heading: "The three strategies", paragraphs: ["Rolling replaces instances one at a time behind a load balancer — the default, cheap and adequate for most apps. Blue-green runs a full parallel environment and switches traffic atomically — instant rollback at doubled infrastructure cost during deploys. Canary sends a small traffic slice to the new version and watches error rates before promoting — the safest, requiring solid monitoring to be meaningful.", "For most AI-built apps we deploy, health-checked rolling deploys plus one-click rollback deliver the right safety-to-complexity ratio. Blue-green and canary earn their cost at higher stakes and traffic."] },
      { heading: "The part everyone gets wrong: migrations", paragraphs: ["During any zero-downtime deploy, old and new code briefly share the database — so schema changes must be backward-compatible. The discipline: expand first (add nullable columns, backfill, deploy code that writes both), contract later (remove the old path in a subsequent release). Destructive changes in a single deploy are the most common cause of 'zero-downtime' deploys that took production down.", "This is exactly the operational detail AI tools never mention when generating migrations — and one of the first things we fix when building pipelines."] },
    ],
  },
  {
    slug: "monitoring-alerting-what-to-track-first",
    title: "Monitoring and Alerting: What to Track First (and What to Ignore)",
    description: "The minimum observability stack for a production web app — errors, uptime, latency, saturation — and how to set alerts people don't learn to ignore.",
    category: "DevOps",
    keywords: ["application monitoring", "alerting best practices", "observability setup", "sre golden signals"],
    sections: [
      { heading: "Start with four questions", paragraphs: ["Is it up? Is it erroring? Is it slow? Is it running out of headroom? Those map to uptime checks, error tracking, latency percentiles, and saturation metrics (CPU, memory, disk, connections) — the golden signals, and 90% of the observability value for a typical web app. Everything beyond them is refinement.", "Concretely: an uptime service checking your critical user journey every minute, Sentry (or equivalent) capturing exceptions with release tags, p95 latency per endpoint, and basic host/database metrics. Total cost for an SME setup: $0–100/month. Setup time: days, not weeks."] },
      { heading: "Alerts people don't learn to ignore", paragraphs: ["Alert on symptoms users feel (site down, error rate spike, p95 through the ceiling), not on causes (one CPU briefly hot). Tier severities: critical pages a human immediately; warning posts to a channel for business hours; everything else is a dashboard, not an alert. Every alert needs a runbook link — an alert without a next action is just scheduled anxiety.", "Then tune monthly: any alert that fired without prompting action gets demoted or deleted. Alert fatigue is monitoring failure with extra steps — a channel full of ignored red is worse than no monitoring, because it feels covered."] },
      { heading: "The AI-app angle", paragraphs: ["AI tools generate zero observability — no error tracking, no structured logs, no health endpoints. Assume a generated app is blind until proven otherwise. Adding the minimum stack above is typically our first week's work on any productionization engagement, because everything else (deploys, scaling, incident response) depends on being able to see."] },
    ],
  },
  {
    slug: "backup-strategies-3-2-1-for-cloud-apps",
    title: "Backup Strategies for Cloud Apps: 3-2-1 in the Cloud Era",
    description: "How to apply the 3-2-1 backup rule to cloud applications: what to back up, where copies live, retention, and the restore testing everyone skips.",
    category: "DevOps",
    keywords: ["backup strategy", "3-2-1 backup", "database backup", "restore testing"],
    sections: [
      { heading: "3-2-1, translated to cloud", paragraphs: ["Three copies of your data, on two different systems, one outside the blast radius. In cloud terms: the live database, automated snapshots in the same region, and a copy in a different region — ideally a different account, since account compromise and billing lockout are real failure modes that take all same-account copies with them.", "What to back up is broader than teams assume: the database, yes, but also uploaded files, configuration and secrets (securely), and infrastructure definitions. A restore that recovers data into an environment nobody can rebuild isn't a recovery."] },
      { heading: "Retention and cost", paragraphs: ["A sane default: hourly or continuous for the last day, daily for a month, monthly for a year — adjusted to your compliance and business needs. Storage is cheap (typical SME production backups: $5–50/month); the expensive part of backups is not having them. Set lifecycle policies so old snapshots expire automatically, or the bill quietly grows forever."] },
      { heading: "The step that makes it real: restore testing", paragraphs: ["An untested backup is a hypothesis. Schedule actual restores — quarterly at minimum — into an isolated environment, timed against your recovery objective, with the result recorded. Most teams that skip this discover their backups' flaws during the incident that needed them: wrong scope, silent failures since March, missing credentials.", "Every support plan we run includes scheduled restore verification for exactly this reason. It's an hour a quarter that converts 'we should be fine' into 'we recovered in 38 minutes last drill'."] },
    ],
  },
  {
    slug: "incident-response-for-small-teams",
    title: "Incident Response for Small Teams: A Runbook That Fits on One Page",
    description: "A right-sized incident response process for startups and SMEs: severity levels, roles, communication, and the one-page runbook template.",
    category: "DevOps",
    keywords: ["incident response", "runbook template", "severity levels", "postmortem process"],
    sections: [
      { heading: "You need less process than you think — but more than zero", paragraphs: ["Enterprise incident management doesn't fit a five-person team, but 'everyone panics in Slack' isn't a process either. The minimum viable version: three severity levels with response expectations, one person clearly running any given incident, a communication habit, and a blameless review afterward. That fits on one page and covers 95% of what matters."] },
      { heading: "The one-page structure", paragraphs: ["Severities: critical (production down or data at risk — drop everything, all-hands response), high (major function degraded — respond within hours), normal (annoying but stable — next business day). For each: who gets alerted, where coordination happens (one channel, not five), and who talks to customers. The person running the incident makes calls; everyone else executes or stays out of the way.", "Per-alert runbooks complete the picture: what this alert means, what to check first, how to mitigate, when to escalate. Written before the incident, by someone calm."] },
      { heading: "After: the blameless review", paragraphs: ["Every critical incident gets thirty minutes: what happened, what the timeline was, what made it worse or better, and which one or two prevention actions are actually worth doing. Blameless isn't kindness — it's accuracy; incidents are system failures, and blaming a person guarantees the system stays broken.", "Teams that run this loop stop having repeat incidents within a few months. Teams that don't, meet the same outage quarterly under different names."] },
    ],
  },
  {
    slug: "owasp-llm-top-10-for-app-builders",
    title: "The OWASP LLM Top 10, Translated for App Builders",
    description: "The OWASP Top 10 for LLM applications explained practically: prompt injection, insecure output handling, data leakage, and what to actually do about each in a product.",
    category: "Security",
    keywords: ["owasp llm top 10", "prompt injection", "llm security", "ai feature security"],
    sections: [
      { heading: "Your app grew a new attack surface", paragraphs: ["The moment you added an AI feature — a chatbot, a summarizer, an agent — your app acquired vulnerability classes that classical security review doesn't cover. The OWASP LLM Top 10 catalogs them; the practical core is three: prompt injection, insecure output handling, and data leakage through model calls."] },
      { heading: "Prompt injection and output handling", paragraphs: ["Prompt injection is untrusted content steering your model: a user message — or a document your app processes — containing instructions that override yours. Defenses are layered, not absolute: separate system instructions from user content, treat all model output as untrusted, and strictly limit what the model can trigger (tools, queries, actions) so a successful injection has a small blast radius.", "Insecure output handling is the downstream half: model output rendered as HTML becomes XSS; model output fed to a database becomes injection; model-generated code executed becomes remote code execution. The rule is old and absolute — encode, parameterize, and sandbox anything that touches users or systems, no matter who (or what) wrote it."] },
      { heading: "Data leakage and the checklist", paragraphs: ["Everything you send to a third-party model leaves your trust boundary: PII in prompts, secrets in context windows, customer data in fine-tuning sets. Minimize what's sent, redact where possible, and know your provider's retention terms — your privacy policy and contracts may already promise more than your prompts deliver.", "Our AI App Security Checklist includes an LLM section covering all ten categories; the audit version tests them against your actual implementation. If you ship AI features to real users, this review belongs next to your OWASP web audit, not after it."] },
    ],
  },
  {
    slug: "choosing-cloud-provider-2026-startup-guide",
    title: "Choosing a Cloud Provider in 2026: A Startup's Decision Guide",
    description: "AWS vs Azure vs Google Cloud vs DigitalOcean for startups and SMEs — decided by workload, team, and budget rather than brand, with concrete recommendations.",
    category: "Cloud & Costs",
    keywords: ["choose cloud provider", "aws vs azure vs gcp", "digitalocean startup", "cloud comparison 2026"],
    sections: [
      { heading: "The decision matters less than the sizing", paragraphs: ["Here's the secret the comparison articles bury: for a typical web application, all four major options work fine. Teams lose far more money to oversized infrastructure on the 'right' cloud than to choosing the 'wrong' one. Decide efficiently, then invest your attention in right-sizing, automation, and cost guardrails — the factors that actually move the bill."] },
      { heading: "The quick decision tree", paragraphs: ["Heavily Microsoft/.NET shop → Azure fits your tooling and licensing. Container-first with variable traffic → Google Cloud's Cloud Run is the best-in-class serverless container platform. Want maximum service depth and don't mind complexity → AWS remains the deepest catalog with the most mature controls. Want predictable pricing and simplicity a small team can operate → DigitalOcean, unironically, and revisit at scale.", "Regional presence, existing credits, and compliance requirements override all of the above when they apply — check them first."] },
      { heading: "What matters more than the logo", paragraphs: ["Infrastructure-as-code from day one (portability is leverage in every future negotiation), managed databases over self-run ones, budgets and anomaly alerts before the first surprise invoice, and an architecture sized to measured traffic rather than aspirational traffic. Get these right and the provider choice becomes what it should be: a detail.", "Our free assessment includes a provider recommendation with monthly cost estimates for your specific workload — numbers, not vibes."] },
    ],
  },
  {
    slug: "kubernetes-vs-simpler-alternatives-when-to-switch",
    title: "Kubernetes vs. Simpler Alternatives: When Is the Switch Actually Justified?",
    description: "The honest decision framework for Kubernetes adoption: what it solves, what it costs in operational burden, and the traffic/team thresholds where it pays off.",
    category: "DevOps",
    keywords: ["kubernetes when to use", "kubernetes alternatives", "kubernetes vs docker compose", "container orchestration decision"],
    sections: [
      { heading: "What Kubernetes actually buys you", paragraphs: ["Fine-grained autoscaling, self-healing workloads, unified deployment across many services, and an ecosystem for everything — genuinely valuable properties. The price is operational: upgrades, networking, RBAC, resource tuning, and a learning curve your whole team pays. The managed control plane (EKS/AKS/GKE) is perhaps 10% of the operational story; the other 90% is yours."] },
      { heading: "The thresholds that justify it", paragraphs: ["Rules of thumb from our engagements: below roughly five services and moderate traffic, Compose on a couple of hosts or a managed container platform (Cloud Run, App Runner, Container Apps) delivers the same reliability at a fraction of the attention cost. Kubernetes starts earning its keep when you run many services with different scaling profiles, need sophisticated deployment patterns across a platform team, or have compliance/multi-tenant requirements that its policy machinery serves.", "Team shape matters as much as traffic: Kubernetes without someone who owns it is how clusters rot. If nobody on the team wants to own it, that's your answer for now."] },
      { heading: "The migration path either way", paragraphs: ["The good news: containerizing properly (multi-stage builds, health checks, stateless services, config via environment) is 80% of Kubernetes-readiness, and it's exactly what a good simple deployment needs anyway. Do that now, defer the orchestrator decision until the data forces it, and the eventual migration — if it comes — is weeks, not months.", "We build both, and we'll tell you plainly which your workload justifies. 'You don't need Kubernetes yet' is a sentence we say weekly."] },
    ],
  },
  {
    slug: "technical-due-diligence-ai-codebase",
    title: "Technical Due Diligence on an AI-Built Codebase: What Investors Look For",
    description: "How technical due diligence treats AI-generated code in 2026: the questions that come up, the red flags, and how founders can prepare a clean report.",
    category: "Production Readiness",
    keywords: ["technical due diligence", "ai code due diligence", "startup acquisition tech review", "investor code review"],
    sections: [
      { heading: "AI-generated code is now a standard diligence question", paragraphs: ["Every technical due diligence process now asks how much of the codebase was AI-generated and — more importantly — how it's governed. The share itself isn't the red flag; ungoverned AI code is: no review gates, no tests, secrets in history, no documentation of what was built or why. Diligence teams have learned exactly where AI-built apps are weak, and they check those spots first."] },
      { heading: "What gets checked", paragraphs: ["Security posture (secret scans, dependency audits, authorization spot-checks), operational maturity (environments, pipelines, monitoring, backup evidence), architecture coherence (can anyone explain the system?), key-person risk (does this all live in one founder's head and chat history?), and documentation. Restore logs and incident runbooks impress diligence teams more than any framework choice — they're evidence of an organization that operates, not just builds."] },
      { heading: "Preparing a clean report", paragraphs: ["The preparation is just production readiness with a deadline: run a readiness assessment, close the security findings, stand up pipeline and monitoring evidence, and produce the architecture and operations documentation. Four to eight weeks before a raise or acquisition process is the comfortable window; two weeks is survivable; during the process is expensive.", "We've prepared these packages for funding rounds and acquisitions — the assessment report itself, showing scored findings and their remediation, often becomes an exhibit. Diligence rewards teams that found their own problems first."] },
    ],
  },
  {
    slug: "ai-coding-tools-need-code-review",
    title: "Yes, AI-Generated Code Still Needs Code Review — Here's What to Look For",
    description: "A practical review checklist for AI-generated pull requests: the failure patterns human reviewers should hunt for, and how to make review scale with AI-speed development.",
    category: "Security",
    keywords: ["ai code review", "reviewing ai generated code", "copilot code review", "ai pull request review"],
    sections: [
      { heading: "Review changes shape, not necessity", paragraphs: ["AI-generated code arrives syntactically clean, plausibly structured, and confidently wrong in specific ways — which makes traditional nitpick-focused review useless and risk-focused review essential. The reviewer's job shifts from 'is this code tidy?' to 'is this code true?': does it handle the cases the prompt didn't mention, respect the security boundaries the model didn't know about, and avoid the patterns AI tools statistically favor?"] },
      { heading: "The AI-specific review checklist", paragraphs: ["Authorization: does every data access verify the requester's right to that specific object? (The #1 AI omission.) Input handling: validated at the boundary, parameterized at the database? Secrets: anything that looks like a key or connection string? Error paths: what happens when the external call fails, times out, or returns garbage? Dependencies: did this PR quietly add three packages, and are they maintained? Duplication: did the model reimplement something that already exists in the codebase?", "Each of those is a two-minute check that catches a class of production incident. Together they're a fifteen-minute review that makes AI-speed development sustainable."] },
      { heading: "Scaling it: automate the floor, review the ceiling", paragraphs: ["Human review can't keep pace with generated volume unless the pipeline enforces the floor: secret scanning, dependency audit, test gates, and static analysis on every merge, so humans spend their attention on logic, authorization, and architecture. Teams that wire this up review less and catch more.", "This pipeline — plus the review culture around it — is part of what we install in CI/CD engagements. The tools are commodity; the discipline is the product."] },
    ],
  },
  {
    slug: "rate-limiting-missing-defense-ai-apps",
    title: "Rate Limiting: The Missing Defense in Almost Every AI-Built App",
    description: "Why AI-generated applications ship without rate limiting, what that costs (brute force, scraping, surprise bills), and how to add layered limits properly.",
    category: "Security",
    keywords: ["rate limiting", "api rate limits", "brute force protection", "api abuse prevention"],
    sections: [
      { heading: "The default is unlimited", paragraphs: ["Prompt an AI tool for a login endpoint and you'll get one that accepts unlimited attempts; ask for an API and you'll get one that serves unlimited requests. No rate limiting means brute-force attacks on auth, effortless scraping of your data, one buggy client taking down the service, and — if your endpoints call paid APIs like LLMs — an attacker converting your API keys directly into your invoice.", "In our audits, missing rate limits sit alongside missing authorization checks as the most universal finding in AI-generated backends."] },
      { heading: "Layered limits, not one number", paragraphs: ["Effective rate limiting is layered: strict per-account limits on authentication endpoints (with lockout/backoff), moderate per-user limits on expensive operations (anything hitting an LLM, sending email, or generating files), and generous global per-IP limits as the outer wall. Return 429 with Retry-After so legitimate clients behave; log and alert on sustained limit-hitting so abuse becomes visible instead of silent.", "Implementation is a solved problem in every stack — middleware plus Redis for distributed counting — a day or two of work for most apps."] },
      { heading: "Special case: apps with LLM features", paragraphs: ["If your app calls language models, rate limiting is also cost control: every uncapped endpoint is a metered bill an attacker can run up. Add per-user token budgets and spend alerts on top of request limits — we've seen the alternative, and it arrives as a five-figure invoice.", "Rate limiting is a standard item in our security hardening work: quick to add, painful to lack."] },
    ],
  },
  {
    slug: "environment-variables-and-secret-management-done-right",
    title: "Environment Variables and Secret Management, Done Right",
    description: "From .env files to secret managers: how production apps should store configuration and credentials, and the migration path from what your AI tool generated.",
    category: "DevOps",
    keywords: ["environment variables best practices", "secret management", "dotenv production", "vault secret manager"],
    sections: [
      { heading: "The maturity ladder", paragraphs: ["Level zero: secrets hardcoded in source (where AI-generated apps start). Level one: a .env file — better, but it's on disk, in backups, and one 'git add .' from history. Level two: platform environment variables (host-provided config) — the minimum for production. Level three: a secret manager (cloud-native or Vault) with access control, audit logging, and rotation — where anything holding customer data should be.", "Most teams should land at level three for credentials and level two for non-sensitive config. The distinction matters: a feature flag and a database password don't deserve the same handling."] },
      { heading: "The rules that prevent incidents", paragraphs: ["Secrets never enter git — enforce with CI secret scanning, not intention. Different credentials per environment, so a leaked staging key can't touch production data. Rotation is routine, not emergency-only — if rotating a credential frightens the team, that's the signal it's overdue. And client-side code gets no secrets at all: anything shipped to a browser is public, including the 'private' keys AI tools happily embed in React components."] },
      { heading: "Migrating a generated app", paragraphs: ["The path we run in engagements: scan history for what's already exposed, rotate all of it, move config to environment variables with a validated schema (fail fast on missing config at boot, not at 2 a.m.), then graduate credentials into a secret manager with per-service access. A day or two of work, and the single highest-leverage security upgrade most AI-built apps can make."] },
    ],
  },
  {
    slug: "postgres-production-checklist",
    title: "PostgreSQL in Production: The Checklist Behind Reliable Databases",
    description: "The production PostgreSQL checklist: managed vs self-hosted, connection pooling, indexes, backups, and the settings that prevent 3 a.m. incidents.",
    category: "DevOps",
    keywords: ["postgresql production", "postgres checklist", "database production setup", "postgres connection pooling"],
    sections: [
      { heading: "Managed, unless you have a reason", paragraphs: ["For nearly every startup and SME: use a managed PostgreSQL (RDS, Cloud SQL, Azure Database, DigitalOcean Managed) — automated backups, patching, failover, and monitoring included for a modest premium over raw compute. Self-hosting a production database is a specialty job that buys flexibility most teams never use, at an attention cost they can't spare. Your AI-built app on a self-run container database is a countdown timer."] },
      { heading: "The five settings that matter first", paragraphs: ["Connection pooling — Postgres connections are expensive, and app frameworks default to too many; size pools explicitly and add PgBouncer when instances multiply. Indexes — driven by actual query plans, not guesses; the difference between 5ms and 5s lives here. Backups with point-in-time recovery enabled and restores actually tested. TLS enforced and the database on a private network, never the public internet. And statement timeouts, so one runaway query can't hold the whole system hostage."] },
      { heading: "The growth items", paragraphs: ["Monitor the leading indicators: connection count, slow-query log, table bloat, replication lag, disk headroom. Plan migrations with the expand-contract pattern so schema changes never lock tables under live traffic. And when read traffic dominates, add a replica before adding a bigger instance — it's cheaper and it rehearses the topology you'll eventually need anyway.", "Database review is a standard chapter of our production readiness assessment; it's where the most expensive surprises hide."] },
    ],
  },
  {
    slug: "cdn-and-caching-strategy-for-web-apps",
    title: "CDN and Caching Strategy for Web Apps: Layers That Multiply",
    description: "How CDN, HTTP caching, and application-level caching combine: what to cache where, invalidation strategy, and typical performance and cost gains.",
    category: "Performance",
    keywords: ["cdn setup", "http caching", "redis caching strategy", "cache invalidation"],
    sections: [
      { heading: "Three layers, one goal", paragraphs: ["Caching wins compound across layers: a CDN serves static assets and cacheable pages from the edge (milliseconds, near-zero cost), HTTP caching lets browsers and proxies skip requests entirely, and application caching (Redis) spares your database the repeated reads that dominate real traffic. A typical uncached AI-built app gets 50–80% of its load removed by the first afternoon of caching work."] },
      { heading: "What to cache where", paragraphs: ["CDN: images, JS/CSS bundles (fingerprinted filenames, cache forever), fonts, and — where your rendering allows — whole pages for anonymous traffic. HTTP: proper Cache-Control and ETag headers so repeat visitors cost nothing. Redis: expensive query results, session data, computed aggregates, and external API responses with sensible TTLs. Never cache: personalized responses at shared layers (a classic breach pattern — user A served user B's cached page), and anything where staleness costs more than the query."] },
      { heading: "Invalidation without tears", paragraphs: ["The two honest strategies: TTLs short enough that staleness is tolerable (simple, usually sufficient), or explicit invalidation on write for the few keys where freshness is contractual. Resist the clever middle ground — cache invalidation earned its reputation. Fingerprinted asset filenames sidestep the problem entirely for static content: new deploy, new URL, no stale cache possible.", "Caching is one of the fastest wins in our performance engagements: hours of work, halved latency, and a smaller database bill in the same move."] },
    ],
  },
  {
    slug: "core-web-vitals-2026-what-matters",
    title: "Core Web Vitals in 2026: What Actually Moves the Needle",
    description: "LCP, INP, and CLS explained with the fixes that matter: image handling, JavaScript diet, and render path — plus how vitals connect to rankings and revenue.",
    category: "Performance",
    keywords: ["core web vitals", "lcp inp cls", "page speed seo", "web performance 2026"],
    sections: [
      { heading: "The three numbers", paragraphs: ["Largest Contentful Paint (is the main content visible fast? — target under 2.5s), Interaction to Next Paint (does the page respond when touched? — under 200ms), and Cumulative Layout Shift (does the page hold still? — under 0.1). Google uses them as ranking signals; users experience them as trust. Both convert: every major study puts meaningful revenue movement on each second of load time."] },
      { heading: "The fixes, by impact", paragraphs: ["LCP: properly sized and modern-format images (this alone fixes most sites), CDN delivery, preloading the hero asset, and server response time — slow backends cap everything downstream. INP: less JavaScript above all — code-split, defer, and delete; long main-thread tasks are the enemy. CLS: explicit dimensions on images and embeds, reserved space for late content, and font loading that doesn't reflow the page.", "Framework defaults (Next.js image handling, font optimization, code splitting) get you most of the way when actually used — AI-generated frontends frequently bypass them with plain img tags and monolithic bundles."] },
      { heading: "Measure like Google does", paragraphs: ["Lab tools (Lighthouse) are for debugging; field data (CrUX, real-user monitoring) is what ranks you. Check Search Console's Core Web Vitals report for the verdict on real traffic, fix the worst template first (usually the highest-traffic page type), and re-measure over 28 days as the field data refreshes.", "We fold vitals work into performance engagements — the same profiling that speeds up your backend usually surfaces the frontend wins alongside."] },
    ],
  },
  {
    slug: "seo-for-ai-search-aeo-guide",
    title: "SEO for AI Search: How to Get Cited by ChatGPT, Claude, and Perplexity",
    description: "Answer Engine Optimization (AEO) in practice: structured data, quotable answers, and the content patterns that earn citations in AI search results.",
    category: "Growth",
    keywords: ["ai search optimization", "aeo", "chatgpt citations", "perplexity seo", "llm seo"],
    sections: [
      { heading: "Search's second interface", paragraphs: ["A growing share of discovery now happens inside AI answers — ChatGPT, Claude, Perplexity, and Google's AI Mode synthesize responses and cite sources. Earning those citations (Answer Engine Optimization) overlaps heavily with classical SEO but rewards a specific shape of content: clear, self-contained answers that a model can quote confidently and attribute cleanly."] },
      { heading: "The content patterns that get cited", paragraphs: ["Lead with the answer: pages that state the conclusion in the first paragraph — then support it — outperform pages that build to it. Structure aggressively: real headings, FAQ sections, lists, and definitions give models clean extraction targets. Be the primary source for something specific: original data, concrete numbers, and named methodologies get cited; generic overviews get paraphrased without attribution. And keep pages fast, crawlable, and unblocked — AI crawlers respect robots.txt, and some sites are accidentally invisible to them."] },
      { heading: "The technical layer", paragraphs: ["Schema.org structured data (FAQPage, HowTo, Article, Organization) in JSON-LD remains the machine-readable summary of what your page claims — table stakes for both Google and AI engines. Semantic HTML, canonical URLs, and a clean sitemap complete the picture. None of this is exotic: it's classical technical SEO executed thoroughly, which most sites still don't do.", "This site practices what this article preaches — every page ships structured data, answer-first copy, and FAQ schema. It's also exactly how we build client-facing content for the teams we work with."] },
    ],
  },
  {
    slug: "migrating-off-replit-vercel-preview-hosting",
    title: "Migrating Off Prototype Hosting: From Replit and Preview URLs to Real Infrastructure",
    description: "The zero-downtime migration path from prototype hosts (Replit, preview deployments, free tiers) to production cloud infrastructure — data, DNS, and rollback included.",
    category: "Deployment Guides",
    keywords: ["migrate off replit", "prototype to cloud migration", "app migration zero downtime", "move app to aws"],
    sections: [
      { heading: "When prototype hosting becomes a liability", paragraphs: ["Prototype hosts are excellent at their job — instant deployment, zero configuration — and their job ends when real customers arrive. The liabilities stack up quietly: no meaningful uptime SLA, workspace-tied databases and secrets, limited backup control, and pricing or resource ceilings that appear exactly when traffic does. The migration trigger is usually one of: first paying customer, first outage, or first enterprise security questionnaire."] },
      { heading: "The migration sequence", paragraphs: ["One: containerize the app so it runs anywhere, and stand up the target infrastructure (as code) alongside the old host — nothing switches yet. Two: migrate data with continuous replication or scheduled sync, so the new database tracks the old one. Three: cut over in stages — lower DNS TTLs in advance, move traffic, watch error rates with rollback one step away. Four: keep the old environment warm for a week, then decommission deliberately, secrets rotated.", "Background jobs, file storage, and third-party webhooks are the classic forgotten pieces — inventory them before cutover, not during."] },
      { heading: "What it costs and what you get", paragraphs: ["A typical migration engagement runs one to three weeks depending on data volume and integration count, and lands you on infrastructure you own: reproducible, backed up, monitored, and ready for the security questionnaires that enterprise deals bring. Downtime, done properly, rounds to zero.", "We run these migrations regularly — Replit and preview-URL exits are among our most common engagements. The free assessment includes a migration plan with a concrete timeline for your app."] },
    ],
  },
  {
    slug: "auth-mistakes-ai-generated-apps",
    title: "The Authentication Mistakes AI Tools Make (and How to Catch Them)",
    description: "Session handling, token storage, password flows, and the authorization gap: the auth mistakes that recur in AI-generated applications, with verification steps for each.",
    category: "Security",
    keywords: ["authentication security", "jwt mistakes", "session security", "ai app auth"],
    sections: [
      { heading: "Auth is where AI confidence hurts most", paragraphs: ["Authentication code looks like it works when it compiles and lets the demo user in — which is why AI-generated auth ships broken so often. The flaws hide in properties a demo never exercises: token lifetimes, storage location, revocation, and above all the difference between 'logged in' and 'allowed to access this specific thing'."] },
      { heading: "The recurring five", paragraphs: ["JWTs in localStorage (readable by any XSS — httpOnly cookies exist for this), tokens that never expire or can't be revoked (a leak is permanent), password hashing done with fast algorithms or homemade crypto (bcrypt/argon2 or it's wrong), password reset flows that leak account existence or accept unexpired tokens forever, and — the big one — endpoints that check authentication but not authorization, so any user can access any record by changing an ID.", "Each of these appears in a large fraction of the AI-built codebases we audit, usually several at once."] },
      { heading: "Catch them in an afternoon", paragraphs: ["Test as an attacker: log in as user A, replay user B's object IDs against every endpoint. Inspect where tokens live in the browser and what happens when one is stolen (copy it to another machine — does it work? forever?). Read the password reset flow end to end. Check the hashing algorithm name — if you don't recognize it as a deliberate password hash, it isn't one.", "Or use a boring, audited auth provider or framework module and delete the generated custom auth entirely — genuinely the right call for most teams, and a recommendation we make weekly in audits."] },
    ],
  },
  {
    slug: "what-is-infrastructure-as-code-and-why-it-matters",
    title: "Infrastructure as Code: Why Your Cloud Setup Should Live in Git",
    description: "What infrastructure-as-code means practically, why console-clicked cloud setups are a business risk, and how Terraform changes the ownership equation.",
    category: "DevOps",
    keywords: ["infrastructure as code", "terraform basics", "iac benefits", "cloud automation"],
    sections: [
      { heading: "The problem with clicking", paragraphs: ["Cloud infrastructure built by clicking through a console has no memory: nobody knows exactly what exists, why it's configured that way, or how to rebuild it. That's four business risks wearing one costume — unreproducible disaster recovery, unauditable security, unreviewable changes, and total dependence on whoever clicked. AI-assisted projects amplify it: the person who clicked may have been following a chat transcript that no longer exists."] },
      { heading: "Infrastructure as code, practically", paragraphs: ["IaC (Terraform being the safe default) means your infrastructure is text in your repository: every server, database, network rule, and permission declared in files that are reviewed like code, versioned like code, and applied mechanically. The payoffs are immediate — staging that provably matches production, changes with diffs and approvals, disaster recovery that's 'terraform apply' instead of archaeology, and clean provider portability leverage.", "The cost is real but front-loaded: a learning curve and slower first setup. Every engagement we run delivers infrastructure this way, because anything else leaves clients dependent on us — and vendor dependence is a thing we're structurally against."] },
      { heading: "Getting there from here", paragraphs: ["Existing click-built infrastructure can be imported into Terraform incrementally — critical resources first (database, networking, IAM), the long tail over time. Do it before the incident that requires a rebuild, and pair it with the golden rule going forward: if it's not in code, it doesn't get created.", "For AI-built apps we typically stand up fresh IaC-defined infrastructure and migrate onto it — cleaner than importing a prototype's accidents."] },
    ],
  },
  {
    slug: "load-testing-before-launch",
    title: "Load Testing Before Launch: Find Your Breaking Point on Purpose",
    description: "How to load test a web app before launch day: choosing realistic scenarios, running k6 tests, reading the results, and fixing what breaks — on your schedule.",
    category: "Performance",
    keywords: ["load testing", "k6 load test", "launch preparation", "stress testing web app"],
    sections: [
      { heading: "Launch day is a load test either way", paragraphs: ["Your app will meet its breaking point eventually; the only choice is whether that happens in a controlled test on a Tuesday afternoon or in front of your launch audience. Every system has a ceiling — the question load testing answers is where yours is, what fails first when you hit it, and whether that's above or below the traffic you're about to invite."] },
      { heading: "Testing that resembles reality", paragraphs: ["Script real user journeys (browse → search → act), not just homepage hits — the expensive paths are where systems break. Ramp gradually to find the degradation curve, not just the cliff; run against staging with production-shaped data (100 rows lie to you; you need realistic volume); and watch the whole system during the run — app latency, database connections, memory, error rates — because the bottleneck is usually one layer below where symptoms appear.", "Tooling is the easy part: k6 or Locust scripts, an afternoon to write, reusable forever after."] },
      { heading: "Reading results and fixing forward", paragraphs: ["The typical findings, in order: database connection exhaustion (fix: pool sizing), missing indexes surfacing under concurrent load (fix: query plans), external calls without timeouts stalling request threads (fix: timeouts and circuit breakers), and memory pressure from unbounded operations (fix: pagination and streaming). Most ceilings rise 5–10x with days of targeted fixes — but only when found before launch pressure.", "We run launch-readiness load testing as part of production engagements: expected peak modeled, ceiling found, gap closed, and someone on standby during the actual event."] },
    ],
  },
  {
    slug: "ci-cd-for-solo-founders-and-tiny-teams",
    title: "CI/CD for Solo Founders and Tiny Teams: The Minimum That Matters",
    description: "You don't need enterprise DevOps — you need twenty minutes of GitHub Actions. The minimal pipeline that prevents most self-inflicted outages, for teams of one to five.",
    category: "DevOps",
    keywords: ["ci cd small team", "github actions setup", "solo founder devops", "simple deployment pipeline"],
    sections: [
      { heading: "The case for tiny CI/CD", paragraphs: ["Solo founders skip pipelines because they associate them with enterprise ceremony — then lose a Saturday to a broken deploy that a two-minute automated check would have caught. The minimum viable pipeline is genuinely minimal: on every push, build the app, run whatever tests exist, and deploy to production only if both pass. Twenty minutes of GitHub Actions setup; most self-inflicted outages prevented."] },
      { heading: "The minimal pipeline, concretely", paragraphs: ["Stage one: build — catches the broken-import, missing-dependency class of failure that ships surprisingly often. Stage two: a handful of smoke tests — does the app boot, does the critical endpoint answer, does login work. Stage three: deploy with a health check and keep the previous version for one-click rollback. Add secret scanning (one more action, catches the pasted-key mistake everyone eventually makes) and you've covered the failure modes that actually hit small teams.", "If you build with AI tools, this floor matters double: generated commits arrive fast and plausible, and the pipeline is the only reviewer that never gets tired."] },
      { heading: "Grow it when it hurts", paragraphs: ["Add staging when you have users who'd notice a bad deploy; add real test coverage where bugs recur; add preview environments when collaborators arrive. Each upgrade earns its place by pain, not by best-practice guilt. The point of tiny CI/CD is that it exists at all — a modest pipeline used every day beats a sophisticated one planned forever.", "We set these up in a day inside larger engagements, or you can genuinely copy a template and have it running tonight."] },
    ],
  },
  {
    slug: "gdpr-pdpa-basics-for-ai-built-apps",
    title: "GDPR and PDPA Basics for AI-Built Apps: The Compliance Floor",
    description: "The data protection floor every production app needs — data mapping, consent, deletion, breach readiness — and the extra questions AI features raise under GDPR/PDPA.",
    category: "Security",
    keywords: ["gdpr basics", "pdpa compliance", "data protection app", "ai privacy compliance"],
    sections: [
      { heading: "You're subject to this the moment you have users", paragraphs: ["If your app stores personal data of EU residents (GDPR) or Thai residents (PDPA) — and email addresses count — data protection law applies to you at any size. The floor is the same across regimes: know what data you hold, have a lawful basis for holding it, protect it appropriately, honor deletion and export requests, and be able to disclose breaches. None of this requires lawyers on retainer; all of it requires deliberate engineering."] },
      { heading: "The engineering floor", paragraphs: ["A data map (what personal data, in which tables and third-party services, and why), consent captured where required and recorded, encryption in transit and at rest, a working account-deletion flow that actually cascades (backups and analytics included in the plan), data minimization (stop collecting what you don't use), and access controls plus audit logs on personal data. Most AI-built apps fail at deletion cascades and third-party inventory — the generated code collects enthusiastically and forgets where it sent things."] },
      { heading: "The AI-feature wrinkle", paragraphs: ["Sending user data to LLM providers is a third-party transfer: it belongs in your privacy policy, your data map, and your processor agreements, with retention terms checked. Prompts containing personal data are personal data. If you fine-tune on user content, deletion requests get architecturally interesting — design for it now, not after the request arrives.", "Our security audit includes a data protection review at this engineering level — the floor that makes a lawyer's compliance review buildable."] },
    ],
  },
  {
    slug: "when-to-hire-devops-vs-outsource",
    title: "When to Hire DevOps vs. When to Outsource: The Math for Startups",
    description: "The honest economics of a DevOps hire versus outsourced production operations for startups and SMEs — thresholds, hybrid models, and the questions that decide it.",
    category: "Growth",
    keywords: ["hire devops engineer", "outsource devops", "devops cost startup", "managed operations"],
    sections: [
      { heading: "The math nobody does upfront", paragraphs: ["A competent DevOps engineer costs serious salary plus hiring time — and the actual need at early scale is often ten hours a week of specialist work spread unpredictably: infrastructure setup (bursty), monitoring response (rare but urgent), patching and maintenance (steady, small). One full-time hire is simultaneously too much capacity and too little coverage — one person can't be on call around the clock, and infrastructure work between fires won't fill their week."] },
      { heading: "The thresholds", paragraphs: ["Outsourcing (a support plan with SLA) wins when: you're pre-scale, your stack is standard, and your need is 'keep production healthy while we build product'. An in-house hire wins when: infrastructure is your differentiator, you're running many services with daily platform work, or compliance demands internal ownership. The crossover for most SaaS startups lands somewhere between 15 and 40 engineers — later than founders guess.", "The hybrid is often optimal: outsourced operations baseline (monitoring, patching, backups, incident first-response) plus your engineers owning app-level deployment. That's the model most of our support clients run."] },
      { heading: "The questions that decide it", paragraphs: ["Is production work blocking product work weekly? (Pain says decide now.) Is the work steady enough to fill a role? (If not, buy hours, not heads.) Who answers at 3 a.m., realistically? (An exhausted founder is not an on-call rotation.) And what does key-person risk look like if your one infra hire leaves? Outsourced operations come with documentation and redundancy by construction — that alone is worth pricing in.", "We're obviously one of the options being compared here, so discount accordingly — but the math above is the math we walk prospects through, including the ones we tell to hire instead."] },
    ],
  },
  {
    slug: "api-versioning-for-mobile-backends",
    title: "API Versioning: Why Mobile Apps Make It Non-Negotiable",
    description: "Mobile clients can't be force-updated: how to version APIs so old app installs keep working — strategies, deprecation policy, and the mistakes that brick user sessions.",
    category: "Deployment Guides",
    keywords: ["api versioning", "mobile backend api", "backward compatibility", "api deprecation"],
    sections: [
      { heading: "The web habit that breaks mobile", paragraphs: ["Web developers deploy breaking API changes casually because the client updates with the server — every page load ships fresh code. Mobile inverts this: the app on a user's phone might be eighteen months old, updates roll out over weeks, and some users never update at all. Ship a breaking API change and those installs don't gracefully degrade — they crash, sign users out, or silently lose data. AI-generated backends, built with web instincts, do this constantly."] },
      { heading: "Versioning that works", paragraphs: ["Put the version in the URL path (v1/) — visible, cacheable, unambiguous. Within a version, changes must be strictly additive: new fields and endpoints yes, renamed or removed fields never, and clients built to ignore unknown fields. When you genuinely need to break, ship v2 alongside v1 and run both — with server-side metrics on version usage so deprecation decisions come from data, not hope.", "Add a minimum-supported-version handshake so the rare forced upgrade is a polite in-app message rather than a mystery crash."] },
      { heading: "Deprecation as a policy, not an event", paragraphs: ["Announce deprecation with a timeline (six months is humane for consumer apps), watch the usage metrics fall, warn the stragglers through the app, then sunset with a clear error clients handle gracefully. The discipline costs a little duplication; the alternative costs one-star reviews from users whose app stopped working overnight.", "We build this versioning layer into every mobile backend engagement — it's much cheaper installed at v1 than retrofitted at the first crisis."] },
    ],
  },
  {
    slug: "webhooks-reliability-patterns",
    title: "Webhook Reliability: Patterns for Events That Must Not Be Lost",
    description: "Receiving and sending webhooks reliably: signatures, idempotency, retries, queues, and the failure patterns that silently lose payment events and orders.",
    category: "Deployment Guides",
    keywords: ["webhook reliability", "webhook retry", "idempotency", "stripe webhooks production"],
    sections: [
      { heading: "Webhooks fail silently, and that's the problem", paragraphs: ["A dropped webhook doesn't throw an error in front of anyone — it just means a payment your system never recorded, an order that never shipped, a subscription that never activated. The sender retried a few times against your erroring endpoint, gave up, and moved on. Weeks later, support tickets surface the damage. AI-generated webhook handlers are especially prone: the happy path works, and every failure mode loses data."] },
      { heading: "Receiving properly", paragraphs: ["Verify signatures (an unverified webhook endpoint is an open API that mutates your data). Respond fast — acknowledge receipt immediately and process asynchronously via a queue, because slow handlers cause sender timeouts, which cause retries, which cause duplicates. Which is why: make processing idempotent, keyed on the event ID, so a replayed event is a no-op instead of a double-charge. And log every received event before touching it — the audit trail that turns 'did we get it?' from debate into query.", "Finally, reconcile: a periodic job comparing the sender's records (Stripe's event list, for instance) against yours catches whatever slipped through everything else."] },
      { heading: "Sending properly", paragraphs: ["If your app emits webhooks, apply the mirror image: sign payloads, retry with exponential backoff over hours (not three attempts in a minute), expose delivery logs to consumers, and dead-letter what ultimately fails so it's recoverable by hand. Queue-backed delivery is non-negotiable — synchronous sends from request handlers lose events every time a consumer is briefly down.", "Payment and order flows deserve this rigor everywhere; it's a standard checkpoint in our production readiness assessments."] },
    ],
  },
  {
    slug: "background-jobs-queues-when-requests-arent-enough",
    title: "Background Jobs and Queues: When Request-Response Isn't Enough",
    description: "Emails, exports, LLM calls, and imports don't belong in request handlers. How to add a job queue properly: retries, dead letters, idempotency, and monitoring.",
    category: "Deployment Guides",
    keywords: ["background jobs", "task queue", "celery bullmq sidekiq", "async processing"],
    sections: [
      { heading: "The smell: slow requests doing heavy work", paragraphs: ["Sending email, generating PDFs, calling LLMs, processing uploads, syncing third-party data — none of it belongs in a request handler. Done inline, it makes users wait, times out under load, and fails unrecoverably when anything hiccups. The fix is old and universal: put the work on a queue, return immediately, process in the background with retries. AI-generated apps almost never include this layer, because the inline version works in the demo."] },
      { heading: "The queue done right", paragraphs: ["Pick the boring option for your stack (BullMQ for Node, Celery for Python, Sidekiq for Ruby, or your cloud's native queue) and apply the four disciplines: retries with exponential backoff for transient failures; a dead-letter destination for jobs that keep failing (so they're investigated, not vaporized); idempotent job design, because retries mean everything eventually runs twice; and timeouts so a hung job doesn't block a worker forever.", "Give workers their own deployment lifecycle and monitoring — queue depth, job failure rate, and processing lag are the three numbers that predict trouble before users feel it."] },
      { heading: "The LLM special case", paragraphs: ["Apps with AI features need queues more than most: model calls take seconds, fail transiently, and cost money per attempt — exactly the profile background jobs exist for. Queue the calls, cap retries with budget awareness, and stream or notify results back to users instead of holding requests open.", "Adding a proper job layer is a recurring first-month task in our productionization engagements — it's where reliability and user experience improve in the same move."] },
    ],
  },
  {
    slug: "multi-tenancy-basics-saas-data-isolation",
    title: "Multi-Tenancy Basics: Keeping Customer Data Separated in Your SaaS",
    description: "Shared database, shared schema — or stronger isolation? How SaaS apps keep tenant data separated, the query-scoping discipline that prevents leaks, and when to upgrade isolation.",
    category: "Security",
    keywords: ["multi tenancy", "saas data isolation", "tenant separation", "row level security saas"],
    sections: [
      { heading: "The stakes: one bug, another customer's data", paragraphs: ["Multi-tenancy is the property that customer A can never see customer B's data — and in most SaaS apps it hangs on every single query remembering a WHERE clause. Miss the tenant scope once, anywhere, and you have a cross-tenant leak: the breach category that ends enterprise deals on the spot. AI-generated code misses it regularly, because tenant scoping is exactly the kind of cross-cutting rule that per-prompt generation doesn't hold in mind."] },
      { heading: "The standard model and its discipline", paragraphs: ["Shared database, shared schema, tenant_id column on every tenant-owned table is the right default for nearly all SaaS: cheap, simple, scalable far beyond most companies' needs. The discipline that makes it safe: tenant scoping enforced centrally (ORM global scopes, repository layers, or Postgres row-level security keyed to the session's tenant), never re-written by hand per query; tenant_id validated from the session, never from client input; and cross-tenant tests that actively try to read the other customer's records.", "Postgres RLS as a backstop is worth singling out: even when application code forgets, the database refuses. Belt and suspenders, for the failure that must not happen."] },
      { heading: "When to upgrade isolation", paragraphs: ["Schema-per-tenant or database-per-tenant buy stronger isolation at real operational cost (migrations × tenants, connection management) — justified when enterprise contracts or regulation demand it, and rarely before. The pragmatic path: shared schema with RLS now, isolation upgrades priced into enterprise tiers later, where the customers requiring them pay for them.", "Tenant isolation review — including the adversarial cross-tenant tests — is a fixture of our security audits for anything B2B."] },
    ],
  },
  {
    slug: "feature-flags-safe-releases",
    title: "Feature Flags: Shipping Continuously Without Betting the Release",
    description: "How feature flags decouple deployment from release: gradual rollouts, kill switches, and flag hygiene — without buying a platform you don't need yet.",
    category: "DevOps",
    keywords: ["feature flags", "gradual rollout", "kill switch", "trunk based development"],
    sections: [
      { heading: "Deploy ≠ release", paragraphs: ["The deploy is code reaching production; the release is users experiencing it. Feature flags separate the two: ship half-finished work safely dark, turn features on for 5% of users before 100%, and — the underrated half — turn a misbehaving feature off in seconds without a rollback deploy. For teams shipping AI-generated code at speed, that kill switch is the difference between an incident and a toggle."] },
      { heading: "Start embarrassingly simple", paragraphs: ["You don't need a flag platform on day one: a config table or environment-driven flags checked at the decision point covers the first year for most teams. Graduate to a proper system (open-source or hosted) when you need percentage rollouts, per-tenant targeting, or non-engineers flipping switches. The pattern matters more than the tooling: new risky path behind a flag, old path preserved, flag default off, rollout gradual, metrics watched.", "Wrap external dependencies in flags too — when a third-party API degrades, 'disable the integration' beats 'emergency deploy' every time."] },
      { heading: "The hygiene that keeps it sane", paragraphs: ["Flags are temporary by intention and permanent by neglect: every flag gets an owner and a removal condition at creation, and stale flags get deleted in routine cleanup — a codebase with 200 forgotten flags is a combinatorial testing nightmare nobody chose. Keep flag checks at boundaries (one decision point per flag, not twelve scattered ifs), and log flag states with errors so debugging knows which world the user was in.", "We install lightweight flagging as part of CI/CD engagements — it's the cheapest courage a small team can buy."] },
    ],
  },
];

for (const article of evergreen) {
  articles.push(article);
}

/* ------------------------------------------------------------------ */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function wordCount(article: Omit<BlogArticle, "date" | "readingMinutes">): number {
  return article.sections
    .flatMap((section) => section.paragraphs)
    .join(" ")
    .split(/\s+/).length;
}

/** All blog articles, newest first, with deterministic dates. */
export const blogArticles: BlogArticle[] = articles.map((article, index) => ({
  ...article,
  date: dateForIndex(index),
  readingMinutes: Math.max(3, Math.round(wordCount(article) / 200)),
}));

export const blogCategories: string[] = [
  ...new Set(blogArticles.map((article) => article.category)),
].sort();

/** Look up an article by slug. */
export function getArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

/** URL slug for a category name (e.g. "Deployment Guides" → "deployment-guides"). */
export function categorySlug(category: string): string {
  return slugify(category);
}

/** Reverse lookup: category name from its URL slug. */
export function categoryFromSlug(slug: string): string | undefined {
  return blogCategories.find((category) => categorySlug(category) === slug);
}
