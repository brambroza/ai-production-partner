/**
 * SEO landing page content — the single source for every solution page.
 * Pages are generated statically from this data via app/(landing)/[slug].
 *
 * Factory functions build fully-written page copy from a small set of
 * platform/stack/cloud-specific facts, so each page is genuinely
 * differentiated (unique pain points, FAQs, and process notes) while
 * remaining maintainable from one file.
 */

export type PageSection = { title: string; body: string };
export type FaqItem = { question: string; answer: string };

export type LandingPage = {
  slug: string;
  category: "platform" | "stack" | "cloud" | "service";
  /** Short display name used in navigation and related-page cards. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  painPoints: PageSection[];
  features: PageSection[];
  steps: PageSection[];
  faq: FaqItem[];
  related: string[];
};

/* ------------------------------------------------------------------ */
/* Platform pages — "Deploy <AI builder> Apps"                         */
/* ------------------------------------------------------------------ */

type PlatformSpec = {
  slug: string;
  name: string;
  vendor: string;
  typicalStack: string;
  quirks: [string, string, string];
  related: string[];
};

function platformPage(spec: PlatformSpec): LandingPage {
  const { name } = spec;
  return {
    slug: spec.slug,
    category: "platform",
    name: `Deploy ${name} Apps`,
    metaTitle: `Deploy ${name} Apps to Production — Secure, Scalable Hosting & DevOps`,
    metaDescription: `Professional production deployment for applications built with ${name}. Security audit, Docker, Kubernetes, CI/CD, monitoring, and ongoing support for ${name}-generated code. Free production assessment.`,
    keywords: [
      `deploy ${name.toLowerCase()} app`,
      `${name.toLowerCase()} production deployment`,
      `${name.toLowerCase()} app hosting`,
      `${name.toLowerCase()} to production`,
      `${name.toLowerCase()} security audit`,
      "ai generated app deployment",
    ],
    heroTitle: `Deploy ${name} Apps to Production — Without the Risk`,
    heroSubtitle: `You built it fast with ${name}. We make it secure, scalable, and enterprise-ready: hardened infrastructure, real CI/CD, monitoring, backups, and a team that answers when production breaks.`,
    painPoints: [
      {
        title: `${name} got you to a working prototype — not a production system`,
        body: `${vendorSentence(spec)} That speed is real, but the output is optimized for "it works on my screen", not for uptime, security, or scale. The gap between a ${name} prototype and a production system is exactly what we close.`,
      },
      {
        title: spec.quirks[0],
        body: `This is one of the most common issues we find in ${name} projects during our production readiness assessments. It rarely shows up in a demo — it shows up at 2 a.m. with real users and real data.`,
      },
      {
        title: spec.quirks[1],
        body: `AI coding tools generate what you ask for, not what you forgot to ask for. Rate limiting, secret management, migrations, and error budgets are the "unasked questions" we answer before your launch, not after your incident.`,
      },
    ],
    features: [
      {
        title: `${name} Code Production Audit`,
        body: `Line-by-line review of your ${name}-generated codebase (${spec.typicalStack}) for security vulnerabilities, hardcoded secrets, missing validation, and architectural dead ends — with a prioritized remediation plan.`,
      },
      {
        title: "Security Hardening",
        body: `We fix the OWASP Top 10 issues AI tools commonly introduce: injection paths, broken auth flows, exposed API keys, missing rate limits, and permissive CORS. ${spec.quirks[2]}`,
      },
      {
        title: "Docker & Cloud Deployment",
        body: `We containerize your app with production-grade Dockerfiles, then deploy to AWS, Azure, GCP, or DigitalOcean with infrastructure-as-code you own — no vendor lock-in, no black boxes.`,
      },
      {
        title: "CI/CD Pipeline",
        body: `Automated build, test, and deploy on every push. Staging and production environments, zero-downtime releases, and instant rollback so you can keep shipping with ${name} safely after launch.`,
      },
      {
        title: "Monitoring, Logging & Alerts",
        body: `Uptime checks, error tracking, structured logs, and dashboards. You'll know about problems before your users do — with alerting routed to the channels your team actually reads.`,
      },
      {
        title: "Ongoing Production Support",
        body: `Backups, disaster recovery drills, dependency updates, and an SLA-backed support line. Your ${name} app keeps evolving; we keep it stable.`,
      },
    ],
    steps: productionSteps(`your ${name} application`),
    faq: [
      {
        question: `Can apps built with ${name} really run in production?`,
        answer: `Yes. ${name} produces real, working code — the issue is what surrounds it: security hardening, infrastructure, observability, and recovery. We audit and harden the code, containerize it, deploy it on cloud infrastructure you own, and put monitoring and backups around it. After that, a ${name}-built app is as production-worthy as any hand-written one.`,
      },
      {
        question: `What problems do you usually find in ${name} projects?`,
        answer: `The most frequent findings are: ${spec.quirks[0].toLowerCase()}; ${spec.quirks[1].toLowerCase()}; hardcoded secrets and API keys; missing input validation; and no strategy for migrations, backups, or rollback. Our free assessment gives you the exact list for your codebase.`,
      },
      {
        question: `Do I have to stop using ${name} after you take over deployment?`,
        answer: `No — the opposite. We set up CI/CD with automated tests and staging environments precisely so you can keep building features with ${name} and ship them safely. We handle the production layer; you keep your speed.`,
      },
      {
        question: `How long does it take to get a ${name} app production-ready?`,
        answer: `A typical engagement runs 2–6 weeks depending on scope: the assessment takes 3–5 days, security and infrastructure work 1–3 weeks, and cutover with monitoring about a week. You get a fixed-scope proposal after the free assessment, so there are no surprises.`,
      },
    ],
    related: spec.related,
  };
}

function vendorSentence(spec: PlatformSpec): string {
  return spec.vendor;
}

function productionSteps(subject: string): PageSection[] {
  return [
    {
      title: "1. Free Production Assessment",
      body: `We review ${subject} — code, architecture, and current hosting — and deliver a Production Readiness Score with a prioritized findings report within 48 hours.`,
    },
    {
      title: "2. Harden & Fix",
      body: `We remediate security findings, add input validation and rate limiting, externalize secrets, and restructure anything that would break under real load.`,
    },
    {
      title: "3. Containerize & Deploy",
      body: `Production-grade Docker images, infrastructure-as-code, staging plus production environments, and a CI/CD pipeline with automated tests and one-click rollback.`,
    },
    {
      title: "4. Monitor & Support",
      body: `Monitoring, logging, alerting, automated backups, and disaster recovery — then SLA-backed ongoing support so production stays boring.`,
    },
  ];
}

const platformPages: LandingPage[] = [
  platformPage({
    slug: "deploy-cursor-apps",
    name: "Cursor",
    vendor:
      "Cursor's AI-first editor lets you build entire features by describing them.",
    typicalStack: "typically Next.js, React, Node.js, or Python",
    quirks: [
      "Inconsistent patterns across AI sessions leave the codebase hard to secure as one system",
      "Generated API routes often ship without authentication checks or rate limiting",
      "We also add dependency scanning, since Cursor sessions tend to accumulate unused and outdated packages.",
    ],
    related: ["deploy-claude-code-apps", "deploy-nextjs-apps", "ai-security-audit"],
  }),
  platformPage({
    slug: "deploy-claude-code-apps",
    name: "Claude Code",
    vendor:
      "Claude Code builds complete applications from the terminal, often producing large, capable codebases in days.",
    typicalStack: "typically Next.js, Node.js, Python, or Go",
    quirks: [
      "Rapid multi-file generation can hide architectural decisions nobody consciously made",
      "Local-first development means production config, secrets handling, and scaling were never exercised",
      "We also review agent-written infrastructure files (Dockerfiles, workflows) that were never tested against a real cloud.",
    ],
    related: ["deploy-cursor-apps", "deploy-nodejs-apps", "production-readiness-assessment"],
  }),
  platformPage({
    slug: "deploy-lovable-apps",
    name: "Lovable",
    vendor:
      "Lovable turns prompts into full-stack web apps with a Supabase backend in minutes.",
    typicalStack: "typically React + Vite with Supabase",
    quirks: [
      "Supabase Row Level Security policies are often missing or permissive, exposing user data",
      "Client-side API keys and business logic that belong on a server are shipped to the browser",
      "We migrate sensitive logic to secure server-side functions and lock down RLS policies properly.",
    ],
    related: ["deploy-bolt-apps", "deploy-react-apps", "ai-security-audit"],
  }),
  platformPage({
    slug: "deploy-replit-apps",
    name: "Replit",
    vendor:
      "Replit Agent builds and hosts apps in one place, which is perfect for prototypes.",
    typicalStack: "typically Python/Flask, Node.js, or React",
    quirks: [
      "Replit-hosted databases and always-on containers are not designed for business-critical uptime",
      "Environment secrets, cron jobs, and storage are tied to the Replit workspace, making migration risky without a plan",
      "We execute a zero-downtime migration off Replit onto cloud infrastructure you own.",
    ],
    related: ["deploy-bolt-apps", "cloud-deployment-services", "backup-disaster-recovery"],
  }),
  platformPage({
    slug: "deploy-bolt-apps",
    name: "Bolt",
    vendor:
      "Bolt.new generates and previews full-stack apps entirely in the browser.",
    typicalStack: "typically React/Next.js with Node.js",
    quirks: [
      "In-browser builds skip real dependency, build, and runtime hardening entirely",
      "Generated database schemas usually lack indexes, constraints, and a migration story",
      "We rebuild the delivery pipeline on real infrastructure with proper builds, tests, and migrations.",
    ],
    related: ["deploy-lovable-apps", "deploy-react-apps", "docker-deployment"],
  }),
  platformPage({
    slug: "deploy-v0-apps",
    name: "v0",
    vendor:
      "Vercel's v0 generates polished React and Next.js interfaces from prompts.",
    typicalStack: "typically Next.js with shadcn/ui",
    quirks: [
      "Beautiful frontends often sit on improvised backends with no auth, validation, or persistence strategy",
      "Server actions and API routes generated alongside the UI frequently trust client input blindly",
      "We build the production backend and data layer the generated frontend deserves.",
    ],
    related: ["deploy-nextjs-apps", "deploy-react-apps", "deploy-cursor-apps"],
  }),
  platformPage({
    slug: "deploy-windsurf-apps",
    name: "Windsurf",
    vendor:
      "Windsurf's agentic editor writes and refactors code across your whole repository.",
    typicalStack: "typically TypeScript full-stack or Python services",
    quirks: [
      "Agentic multi-file edits can silently weaken previously secure code paths",
      "Test coverage rarely keeps pace with agent-generated changes, so regressions reach users",
      "We add the automated test and review gates that make agentic development safe to continue.",
    ],
    related: ["deploy-cursor-apps", "deploy-claude-code-apps", "ci-cd-pipeline-setup"],
  }),
  platformPage({
    slug: "deploy-copilot-apps",
    name: "GitHub Copilot",
    vendor:
      "GitHub Copilot accelerates teams by completing code and building features from issues.",
    typicalStack: "any stack — commonly TypeScript, C#, Java, or Python",
    quirks: [
      "Copilot suggestions inherit vulnerable patterns from training data, including outdated crypto and injection-prone queries",
      "Fast-moving teams merge suggested code without infrastructure to match the new surface area",
      "We add security scanning to your existing GitHub workflow so Copilot-assisted merges stay safe.",
    ],
    related: ["ai-security-audit", "ci-cd-pipeline-setup", "production-readiness-assessment"],
  }),
];

/* ------------------------------------------------------------------ */
/* Stack pages — "Deploy <framework/runtime>"                          */
/* ------------------------------------------------------------------ */

type StackSpec = {
  slug: string;
  name: string;
  pageName: string;
  intro: string;
  concerns: [string, string, string];
  hardeningNote: string;
  related: string[];
};

function stackPage(spec: StackSpec): LandingPage {
  const { name } = spec;
  return {
    slug: spec.slug,
    category: "stack",
    name: spec.pageName,
    metaTitle: `${spec.pageName} to Production — Docker, Cloud & Kubernetes Experts`,
    metaDescription: `Production deployment services for ${name} applications: security hardening, containerization, cloud or Kubernetes hosting, CI/CD, and 24/7-monitored operations. Free production assessment.`,
    keywords: [
      `deploy ${name.toLowerCase()}`,
      `${name.toLowerCase()} production deployment`,
      `${name.toLowerCase()} docker`,
      `${name.toLowerCase()} kubernetes`,
      `${name.toLowerCase()} hosting`,
      `${name.toLowerCase()} devops`,
    ],
    heroTitle: `${spec.pageName} to Production — Done Right`,
    heroSubtitle: `${spec.intro} We handle security, infrastructure, CI/CD, and monitoring so your ${name} application runs like an enterprise system.`,
    painPoints: [
      {
        title: spec.concerns[0],
        body: `This is the most common gap we find in ${name} projects — especially AI-generated ones, where the happy path works perfectly and everything around it is missing.`,
      },
      {
        title: spec.concerns[1],
        body: `It works in development and falls over in production. We design for the failure modes ${name} apps actually hit: traffic spikes, slow queries, memory pressure, and dependency failures.`,
      },
      {
        title: spec.concerns[2],
        body: `Without deployment automation and observability, every release is a gamble. We replace "deploy and pray" with pipelines, health checks, and instant rollback.`,
      },
    ],
    features: [
      {
        title: `${name} Production Audit`,
        body: `Architecture and code review focused on ${name}-specific risks: configuration, dependency health, security posture, and scalability blockers — delivered as a prioritized action plan.`,
      },
      {
        title: "Security Hardening",
        body: `Input validation, authentication review, secret management, security headers, and dependency patching. ${spec.hardeningNote}`,
      },
      {
        title: "Production-Grade Containerization",
        body: `Multi-stage Docker builds tuned for ${name}: small images, non-root users, health checks, and reproducible builds that behave identically in staging and production.`,
      },
      {
        title: "Cloud or Kubernetes Deployment",
        body: `Right-sized infrastructure on AWS, Azure, GCP, or DigitalOcean — from a simple managed platform to full Kubernetes with autoscaling, depending on your actual traffic, not hype.`,
      },
      {
        title: "CI/CD & Environments",
        body: `Automated pipelines with tests, staging environments, database migration handling, zero-downtime deploys, and one-click rollback.`,
      },
      {
        title: "Monitoring & Ongoing Support",
        body: `Error tracking, metrics, log aggregation, uptime alerts, automated backups, and SLA-backed support after go-live.`,
      },
    ],
    steps: productionSteps(`your ${name} application`),
    faq: [
      {
        question: `What does a production-ready ${name} setup include?`,
        answer: `At minimum: hardened configuration and dependencies, containerized builds, separate staging and production environments, automated CI/CD with tests and rollback, TLS and security headers, structured logging, error tracking, uptime monitoring, automated backups, and a documented recovery procedure. Our ${name} engagements deliver all of these as a package.`,
      },
      {
        question: `Can you deploy a ${name} app that was generated by AI tools like Cursor or Claude Code?`,
        answer: `Yes — that's our specialty. We start with a production readiness assessment that catches the issues AI tools commonly introduce in ${name} code, fix them, and then build the deployment and monitoring stack around the app.`,
      },
      {
        question: `Which cloud should I use for ${name}?`,
        answer: `It depends on your traffic, budget, and team. For most startups and SMEs we recommend starting with a managed platform or a small, well-monitored setup on DigitalOcean or AWS, and moving to Kubernetes only when scale demands it. Our assessment includes a concrete recommendation with monthly cost estimates.`,
      },
      {
        question: "Do you provide support after deployment?",
        answer: `Yes. Ongoing production support covers monitoring response, security patches, dependency updates, backup verification, and performance tuning — with defined SLAs. You keep building features; we keep ${name} production stable.`,
      },
    ],
    related: spec.related,
  };
}

const stackPages: LandingPage[] = [
  stackPage({
    slug: "deploy-react-apps",
    name: "React",
    pageName: "Deploy React Apps",
    intro: "Your React app deserves better than a hobby-tier static host.",
    concerns: [
      "SPAs that expose API keys and business logic in the browser bundle",
      "No code-splitting, caching, or CDN strategy — so Core Web Vitals and conversions suffer",
      "Backends improvised behind the frontend with no auth or rate limiting",
    ],
    hardeningNote:
      "For React specifically, we audit the client bundle for leaked secrets and move sensitive logic server-side.",
    related: ["deploy-nextjs-apps", "deploy-lovable-apps", "deploy-nodejs-apps"],
  }),
  stackPage({
    slug: "deploy-nextjs-apps",
    name: "Next.js",
    pageName: "Deploy Next.js Apps",
    intro: "Self-hosted or serverless, Next.js production is full of sharp edges.",
    concerns: [
      "Server actions and API routes that trust client input without validation",
      "Uncontrolled serverless costs, or self-hosted deployments without caching and image optimization",
      "Environment variables and secrets scattered between build-time and runtime incorrectly",
    ],
    hardeningNote:
      "We configure middleware, headers, and ISR/caching correctly for your rendering strategy.",
    related: ["deploy-react-apps", "deploy-v0-apps", "deploy-cursor-apps"],
  }),
  stackPage({
    slug: "deploy-dotnet-apis",
    name: ".NET",
    pageName: "Deploy .NET APIs",
    intro: "ASP.NET Core is enterprise-grade — if it's configured like it.",
    concerns: [
      "APIs deployed without proper authentication schemes, HTTPS enforcement, or data protection configuration",
      "Entity Framework queries and connection pooling that collapse under production load",
      "Windows-centric assumptions that block containerization and cloud portability",
    ],
    hardeningNote:
      "We apply ASP.NET Core security best practices: Identity/JWT done right, data protection keys, and hardened Kestrel behind a reverse proxy.",
    related: ["deploy-nodejs-apps", "kubernetes-deployment", "docker-deployment"],
  }),
  stackPage({
    slug: "deploy-nodejs-apps",
    name: "Node.js",
    pageName: "Deploy Node.js Apps",
    intro: "Node.js powers your API — until an unhandled rejection takes it down.",
    concerns: [
      "Single-process deployments with no clustering, health checks, or graceful shutdown",
      "Unpinned dependencies and known-vulnerable packages deep in the tree",
      "Blocking the event loop with CPU work, causing mysterious latency under load",
    ],
    hardeningNote:
      "We add process management, dependency auditing, and load-tested performance baselines for Node services.",
    related: ["deploy-nextjs-apps", "deploy-dotnet-apis", "ci-cd-pipeline-setup"],
  }),
  stackPage({
    slug: "deploy-python-apps",
    name: "Python",
    pageName: "Deploy Python Apps",
    intro: "FastAPI and Django prototypes become production systems with the right operations layer.",
    concerns: [
      "Development servers (uvicorn --reload, runserver) used in production",
      "No WSGI/ASGI tuning, worker management, or task queue for long-running jobs",
      "SQLite or unmigrated schemas where PostgreSQL and Alembic/Django migrations belong",
    ],
    hardeningNote:
      "We productionize Python services with gunicorn/uvicorn workers, Celery or task queues where needed, and proper settings separation.",
    related: ["deploy-replit-apps", "docker-deployment", "deploy-nodejs-apps"],
  }),
  stackPage({
    slug: "deploy-vue-apps",
    name: "Vue",
    pageName: "Deploy Vue Apps",
    intro: "Vue and Nuxt apps need the same production rigor as any frontend platform.",
    concerns: [
      "Nuxt server routes and middleware deployed without validation or rate limiting",
      "No SSR caching or CDN strategy, hurting both performance and hosting costs",
      "Client bundles leaking API tokens and internal endpoints",
    ],
    hardeningNote:
      "We tune Nuxt/Nitro presets for your target platform and lock down server routes.",
    related: ["deploy-react-apps", "deploy-nextjs-apps", "cloud-deployment-services"],
  }),
  stackPage({
    slug: "deploy-sveltekit-apps",
    name: "SvelteKit",
    pageName: "Deploy SvelteKit Apps",
    intro: "SvelteKit is fast by default — production-safe takes deliberate work.",
    concerns: [
      "Form actions and endpoints that skip server-side validation",
      "Adapter choices made by default rather than by traffic pattern and budget",
      "No error tracking or logging around server-side load functions",
    ],
    hardeningNote:
      "We choose and configure the right adapter (node, serverless, or edge) for your workload.",
    related: ["deploy-react-apps", "deploy-vue-apps", "deploy-nodejs-apps"],
  }),
  stackPage({
    slug: "deploy-mobile-backends",
    name: "Mobile Backend",
    pageName: "Deploy Mobile App Backends",
    intro: "Your Flutter or React Native app is only as reliable as the API behind it.",
    concerns: [
      "APIs without versioning, breaking old app installs on every release",
      "Push notification, auth, and file upload flows glued together without hardening",
      "No load strategy for launch-day traffic spikes from app store features",
    ],
    hardeningNote:
      "We add API versioning, token rotation, and mobile-specific abuse protection.",
    related: ["deploy-nodejs-apps", "deploy-dotnet-apis", "cloud-deployment-services"],
  }),
];

/* ------------------------------------------------------------------ */
/* Cloud pages — "Deploy to <provider>"                                */
/* ------------------------------------------------------------------ */

type CloudSpec = {
  slug: string;
  name: string;
  strengths: string;
  services: string;
  costNote: string;
  related: string[];
};

function cloudPage(spec: CloudSpec): LandingPage {
  const { name } = spec;
  return {
    slug: spec.slug,
    category: "cloud",
    name: `Deploy to ${name}`,
    metaTitle: `Deploy AI-Built Apps to ${name} — Architecture, Security & Cost Control`,
    metaDescription: `Expert ${name} deployment for AI-generated applications: well-architected infrastructure, security hardening, CI/CD, monitoring, and cloud cost optimization on ${name}. Free assessment.`,
    keywords: [
      `deploy to ${name.toLowerCase()}`,
      `${name.toLowerCase()} deployment services`,
      `${name.toLowerCase()} devops consulting`,
      `ai app ${name.toLowerCase()} hosting`,
      `${name.toLowerCase()} cost optimization`,
    ],
    heroTitle: `Deploy Your AI-Built App to ${name}`,
    heroSubtitle: `${spec.strengths} We design, secure, and operate ${name} infrastructure that fits your workload and your budget — with everything delivered as infrastructure-as-code you own.`,
    painPoints: [
      {
        title: `${name} has hundreds of services — your app needs about six of them`,
        body: `Teams either under-build (one VM doing everything, no backups) or over-build (Kubernetes for 50 users). We pick the right ${name} services for your actual traffic: ${spec.services}.`,
      },
      {
        title: "Cloud bills that grow faster than your user base",
        body: spec.costNote,
      },
      {
        title: "Console-clicked infrastructure nobody can reproduce",
        body: `If your environment was built by clicking around the ${name} console, you can't rebuild it after a failure or audit it for security. We rebuild it as version-controlled infrastructure-as-code with documented runbooks.`,
      },
    ],
    features: [
      {
        title: `${name} Architecture Design`,
        body: `Well-architected setup sized to your workload: compute, managed database, networking, TLS, CDN, and environments — designed for your growth curve, not a reference diagram.`,
      },
      {
        title: "Security & Compliance Baseline",
        body: `IAM with least privilege, private networking, encrypted storage, secret management, and audit logging configured from day one.`,
      },
      {
        title: "Infrastructure as Code",
        body: `Terraform-managed infrastructure with full documentation. Every resource is reproducible, reviewable, and yours — no dependency on us to make changes.`,
      },
      {
        title: "CI/CD to Production",
        body: `Pipelines that build, test, and deploy to staging and production on ${name} with zero-downtime releases and instant rollback.`,
      },
      {
        title: "Monitoring & Alerting",
        body: `Native ${name} monitoring plus error tracking and uptime checks, with alerts tuned to signal — not noise.`,
      },
      {
        title: "Cloud Cost Optimization",
        body: `Right-sizing, reserved capacity where it pays off, and monthly cost reviews. Most clients save 30–60% versus their first-draft cloud setup.`,
      },
    ],
    steps: productionSteps(`your application and target ${name} environment`),
    faq: [
      {
        question: `Is ${name} the right cloud for my AI-generated app?`,
        answer: `Usually the right cloud is the one that matches your team, region, and budget. ${spec.strengths} During the free assessment we compare a right-sized ${name} architecture against alternatives with concrete monthly cost estimates, so the decision is based on numbers.`,
      },
      {
        question: `What will my app cost to run on ${name}?`,
        answer: `A typical startup workload (app server, managed database, storage, CDN, monitoring) runs far less than teams expect when it's right-sized — often $50–$400/month at early scale. ${spec.costNote}`,
      },
      {
        question: "Do we keep ownership of the infrastructure?",
        answer: `Completely. Everything runs in your own ${name} account, defined in Terraform stored in your repository, with documentation and handover included. If you leave us, you keep everything.`,
      },
      {
        question: `Can you migrate us to ${name} from Replit, Vercel, Heroku, or another host?`,
        answer: `Yes. We plan and execute zero-downtime migrations, including databases, DNS, and background jobs — with a tested rollback plan at every step.`,
      },
    ],
    related: spec.related,
  };
}

const cloudPages: LandingPage[] = [
  cloudPage({
    slug: "deploy-to-aws",
    name: "AWS",
    strengths:
      "AWS offers the deepest service catalog and the most mature enterprise controls.",
    services: "ECS or App Runner, RDS, S3, CloudFront, and CloudWatch",
    costNote:
      "AWS pricing punishes unmanaged setups — idle instances, unbounded data transfer, oversized RDS. We set budgets, alerts, and right-sizing from day one so the bill tracks usage, not neglect.",
    related: ["deploy-to-azure", "kubernetes-deployment", "cloud-cost-optimization"],
  }),
  cloudPage({
    slug: "deploy-to-azure",
    name: "Azure",
    strengths:
      "Azure is the natural fit for .NET workloads and Microsoft-centric enterprises.",
    services: "App Service or Container Apps, Azure SQL or PostgreSQL, Blob Storage, Front Door, and Azure Monitor",
    costNote:
      "Azure costs balloon through forgotten dev resources and premium tiers left on by default. We enforce tagging, budgets, and environment automation to keep it in check.",
    related: ["deploy-dotnet-apis", "deploy-to-aws", "cloud-cost-optimization"],
  }),
  cloudPage({
    slug: "deploy-to-gcp",
    name: "Google Cloud",
    strengths:
      "Google Cloud's Cloud Run and managed data services make it excellent for containerized and data-heavy apps.",
    services: "Cloud Run, Cloud SQL, Cloud Storage, Cloud CDN, and Cloud Monitoring",
    costNote:
      "Cloud Run's scale-to-zero pricing is genuinely cheap — until misconfigured concurrency or always-on minimum instances quietly change the math. We configure it deliberately.",
    related: ["deploy-to-aws", "docker-deployment", "kubernetes-deployment"],
  }),
  cloudPage({
    slug: "deploy-to-digitalocean",
    name: "DigitalOcean",
    strengths:
      "DigitalOcean delivers predictable pricing and simplicity that startups and SMEs actually benefit from.",
    services: "App Platform or Droplets, Managed PostgreSQL, Spaces, and built-in monitoring",
    costNote:
      "DigitalOcean's flat pricing makes budgeting easy, but teams still overpay for oversized droplets and unused snapshots. We right-size and automate cleanup.",
    related: ["cloud-deployment-services", "docker-deployment", "cloud-cost-optimization"],
  }),
];

/* ------------------------------------------------------------------ */
/* Service pages                                                       */
/* ------------------------------------------------------------------ */

type ServiceSpec = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  painPoints: PageSection[];
  features: PageSection[];
  faq: FaqItem[];
  related: string[];
};

function servicePage(spec: ServiceSpec): LandingPage {
  return {
    category: "service",
    steps: productionSteps("your application"),
    ...spec,
  };
}

const servicePages: LandingPage[] = [
  servicePage({
    slug: "production-readiness-assessment",
    name: "Production Readiness Assessment",
    metaTitle: "AI App Production Readiness Assessment — Free 48-Hour Review",
    metaDescription:
      "Get a Production Readiness Score for your AI-generated application. We assess security, architecture, scalability, and operations across 40+ checkpoints — findings report in 48 hours.",
    keywords: [
      "production readiness assessment",
      "ai app assessment",
      "production readiness score",
      "application audit",
      "is my app production ready",
    ],
    heroTitle: "AI App Production Readiness Assessment",
    heroSubtitle:
      "Find out exactly how far your AI-built app is from production — before your users do. A structured 40+ checkpoint review of security, architecture, infrastructure, and operations, scored and prioritized, delivered within 48 hours.",
    painPoints: [
      {
        title: "\"It works\" is not the same as \"it's ready\"",
        body: "AI tools produce apps that demo flawlessly and fail in production. The failure modes — injection vulnerabilities, missing backups, zero observability — are invisible until real users and real data arrive.",
      },
      {
        title: "You can't prioritize what you can't see",
        body: "Founders and IT teams know something is missing but not what, or in what order. Our assessment turns vague worry into a ranked, costed action plan.",
      },
      {
        title: "Investors, clients, and auditors are starting to ask",
        body: "Enterprise customers and due-diligence processes increasingly ask how AI-generated code is secured and operated. A documented assessment is your answer.",
      },
    ],
    features: [
      {
        title: "Security Review",
        body: "OWASP Top 10 coverage: injection, broken auth, secret exposure, misconfiguration, vulnerable dependencies, and missing rate limiting — with severity ratings.",
      },
      {
        title: "Architecture Review",
        body: "Data model integrity, service boundaries, state handling, and the scalability ceilings baked into the current design.",
      },
      {
        title: "Infrastructure & Deployment Review",
        body: "Hosting fitness, environment separation, deployment process, rollback capability, and disaster recovery posture.",
      },
      {
        title: "Operations Review",
        body: "Monitoring, logging, alerting, backup verification, and incident readiness — the layer AI tools never generate.",
      },
      {
        title: "Production Readiness Score",
        body: "A 0–100 score across all dimensions, benchmarked against production standards, so progress is measurable.",
      },
      {
        title: "Prioritized Roadmap",
        body: "Every finding ranked by risk and effort, packaged as a fixed-scope remediation proposal — you decide what to fix with us, in-house, or not at all.",
      },
    ],
    faq: [
      {
        question: "Is the assessment really free?",
        answer: "The initial assessment is free and takes about 48 hours from repository access. You receive the scored findings report regardless of whether you engage us for remediation. Deeper audits (penetration testing, compliance mapping) are scoped separately.",
      },
      {
        question: "What do you need from us to start?",
        answer: "Read access to your repository (GitHub, GitLab, or a ZIP), a description of your current hosting, and 30 minutes with whoever knows the app best. NDA available before any access is shared.",
      },
      {
        question: "Does it cover apps built with Cursor, Claude Code, Lovable, Replit, or Bolt?",
        answer: "Yes — those are our core specialty. The assessment checklist includes the failure patterns specific to each AI builder, from Lovable's Supabase RLS gaps to Replit's hosting migration risks.",
      },
      {
        question: "What happens after the assessment?",
        answer: "You get the report, the score, and a fixed-price remediation proposal. Many clients fix quick wins in-house and engage us for infrastructure, security, and ongoing support. There is no obligation either way.",
      },
    ],
    related: ["ai-security-audit", "architecture-review", "production-readiness-checklist-service"],
  }),
  servicePage({
    slug: "architecture-review",
    name: "Architecture Review",
    metaTitle: "Architecture Review for AI-Generated Applications",
    metaDescription:
      "Expert architecture review for AI-built apps: data modeling, service boundaries, scalability ceilings, and technical debt mapping — with a pragmatic evolution plan, not a rewrite.",
    keywords: [
      "architecture review",
      "ai generated code architecture",
      "software architecture audit",
      "scalability review",
      "technical debt assessment",
    ],
    heroTitle: "Architecture Review — Know What Your AI Actually Built",
    heroSubtitle:
      "AI tools make architectural decisions nobody consciously chose. We map what was actually built, find the ceilings and single points of failure, and design a pragmatic path forward — evolution, not rewrite.",
    painPoints: [
      {
        title: "Nobody chose this architecture — it accumulated",
        body: "Every AI session made locally-reasonable decisions that add up to a globally-fragile system: duplicated logic, tangled data flows, and state in surprising places.",
      },
      {
        title: "The scaling ceiling is invisible until you hit it",
        body: "N+1 queries, unindexed tables, synchronous work that should be queued, and sessions pinned to a single server — all fine at 100 users, fatal at 10,000.",
      },
      {
        title: "Fear of touching anything",
        body: "Without an architectural map and tests, every change risks breaking something unrelated. Teams slow down exactly when they need to speed up.",
      },
    ],
    features: [
      {
        title: "System Mapping",
        body: "A complete, documented map of components, data flows, external dependencies, and trust boundaries — often the first accurate diagram the system has ever had.",
      },
      {
        title: "Data Model Review",
        body: "Schema integrity, indexing, migration strategy, and the query patterns that determine whether your database survives growth.",
      },
      {
        title: "Scalability Analysis",
        body: "Load-path analysis identifying the components that fail first and at what traffic level, with load-test evidence where it matters.",
      },
      {
        title: "Reliability & Failure Modes",
        body: "Single points of failure, missing retries and timeouts, and cascade risks — mapped against your actual availability needs.",
      },
      {
        title: "Refactoring Roadmap",
        body: "Prioritized, incremental changes that can ship alongside feature work. We optimize for risk reduction per engineering hour, never rewrite-for-purity.",
      },
      {
        title: "Decision Records",
        body: "Written architecture decision records so future work — human or AI — builds on deliberate choices instead of accidents.",
      },
    ],
    faq: [
      {
        question: "Will you tell us to rewrite the app?",
        answer: "Almost never. AI-generated codebases are usually salvageable with targeted restructuring. A rewrite recommendation requires evidence that incremental change costs more — in our engagements that's the rare exception, and we show the math when it happens.",
      },
      {
        question: "How long does an architecture review take?",
        answer: "Typically 1–2 weeks depending on codebase size: a week of analysis, then a working session to walk your team through findings, followed by the written roadmap and decision records.",
      },
      {
        question: "Can our team keep shipping during the review?",
        answer: "Yes — the review is read-only and runs alongside normal development. Where findings affect in-flight work, we flag them immediately rather than waiting for the final report.",
      },
      {
        question: "Do we need this if we already had a security audit?",
        answer: "They answer different questions. A security audit finds vulnerabilities; an architecture review finds the ceilings, fragilities, and maintenance costs baked into the design. Production readiness needs both, which is why our full assessment includes the two together.",
      },
    ],
    related: ["production-readiness-assessment", "performance-optimization", "ai-security-audit"],
  }),
  servicePage({
    slug: "ai-security-audit",
    name: "AI Security Audit",
    metaTitle: "AI Security Audit — Security Review for AI-Generated Code",
    metaDescription:
      "Security audit specialized for AI-generated applications. OWASP Top 10, secret exposure, auth flaws, dependency vulnerabilities, and LLM-specific risks — with verified fixes, not just a PDF.",
    keywords: [
      "ai security audit",
      "ai generated code security",
      "vibe coding security",
      "application security audit",
      "owasp audit ai code",
      "llm security review",
    ],
    heroTitle: "AI Security Audit — Built for AI-Generated Code",
    heroSubtitle:
      "AI coding tools reproduce insecure patterns at scale: hardcoded secrets, missing auth checks, injection-prone queries. We find them, fix them, and verify the fixes — a security audit designed for how AI-built apps actually fail.",
    painPoints: [
      {
        title: "AI writes vulnerabilities with perfect confidence",
        body: "Studies consistently find that a large share of AI-generated code contains security flaws. The code looks clean, compiles, and works — which is exactly why the flaws survive review by busy teams.",
      },
      {
        title: "Secrets in the repository, keys in the client bundle",
        body: "API keys pasted into prompts end up in source files; server credentials end up in browser JavaScript. One leaked key can mean a five-figure cloud bill or a full data breach.",
      },
      {
        title: "Your app now includes an LLM — and new attack surface",
        body: "Prompt injection, insecure output handling, and data leakage through model calls are risks classical audits don't cover. Ours does, following the OWASP LLM Top 10.",
      },
    ],
    features: [
      {
        title: "OWASP Top 10 Audit",
        body: "Systematic testing for injection, broken access control, cryptographic failures, misconfiguration, and the rest — mapped to your actual endpoints and data flows.",
      },
      {
        title: "Secret & Credential Sweep",
        body: "Full repository history scan for exposed keys, tokens, and credentials, plus rotation of anything found and vault-based secret management going forward.",
      },
      {
        title: "Authentication & Authorization Review",
        body: "Session handling, token lifetimes, password storage, and — the most common AI-app flaw — object-level authorization checks on every endpoint.",
      },
      {
        title: "Dependency & Supply Chain Scan",
        body: "Known-vulnerability scanning across the full dependency tree, license review, and automated update pipelines so the posture doesn't decay.",
      },
      {
        title: "LLM & AI Feature Security",
        body: "OWASP LLM Top 10 coverage for apps with AI features: prompt injection defenses, output sanitization, and controls on what data reaches third-party models.",
      },
      {
        title: "Verified Remediation",
        body: "We don't hand you a PDF and leave. Findings are fixed (by us or with your team), re-tested, and documented — with security regression checks added to CI.",
      },
    ],
    faq: [
      {
        question: "How is this different from running a scanner?",
        answer: "Scanners catch known patterns; they miss broken authorization logic, business-logic abuse, and LLM-specific issues — the highest-impact flaws in AI-built apps. We combine automated scanning with manual review by engineers who work with AI-generated code daily.",
      },
      {
        question: "What do we receive at the end?",
        answer: "A severity-ranked findings report with proof-of-concept evidence, a remediation plan, verified fixes with re-test results, and CI-integrated security checks. Suitable for sharing with enterprise customers and due-diligence processes.",
      },
      {
        question: "Our app was built with Lovable/Cursor/Claude Code — do you know its specific risks?",
        answer: "Yes. Each builder has a signature risk profile — Supabase RLS gaps in Lovable apps, unauthenticated API routes in Cursor projects, untested infrastructure files from agentic tools. Our audit checklist is organized around these patterns.",
      },
      {
        question: "Is this a penetration test?",
        answer: "It includes targeted penetration testing of your application layer. Full-scope network penetration testing or formal compliance audits (SOC 2, ISO 27001) are scoped separately — we'll tell you honestly if you need them.",
      },
    ],
    related: ["ai-app-security-checklist-service", "production-readiness-assessment", "ci-cd-pipeline-setup"],
  }),
  servicePage({
    slug: "production-readiness-checklist-service",
    name: "Production Checklist Service",
    metaTitle: "Production Readiness Checklist — Guided Implementation Service",
    metaDescription:
      "We take your app through the complete production readiness checklist: security, infrastructure, CI/CD, monitoring, backups, and documentation — every box verifiably checked.",
    keywords: [
      "production readiness checklist",
      "production checklist service",
      "go live checklist",
      "launch readiness",
      "deployment checklist",
    ],
    heroTitle: "Production Checklist — Every Box Verifiably Checked",
    heroSubtitle:
      "Our free checklist tells you what production-ready means. This service gets you there: we implement, verify, and document every item — security, infrastructure, pipelines, monitoring, backups, and recovery.",
    painPoints: [
      {
        title: "The checklist is easy to read and hard to finish",
        body: "Most teams check 30% of the boxes, launch anyway, and plan to finish 'later'. Later arrives as an incident. We close the remaining 70% before it does.",
      },
      {
        title: "Partial implementation gives false confidence",
        body: "A backup that's never been restored, monitoring nobody reads, a staging environment that drifted from production — checked boxes that don't hold. We verify each item works, not just exists.",
      },
      {
        title: "AI-built apps skip the checklist entirely",
        body: "No AI tool sets up disaster recovery or on-call alerting. If your app came from Cursor, Lovable, or Claude Code, the operational layer simply does not exist yet.",
      },
    ],
    features: [
      {
        title: "Gap Analysis Against the Full Checklist",
        body: "We assess all 40+ checklist items across security, infrastructure, delivery, observability, and operations, and show you exactly where you stand.",
      },
      {
        title: "Fixed-Scope Implementation",
        body: "Every unchecked item gets implemented: from TLS and secret management through CI/CD, monitoring, backups, and incident runbooks — at a fixed price agreed upfront.",
      },
      {
        title: "Verification, Not Assertion",
        body: "Backups are restored, failovers are triggered, rollbacks are executed, alerts are fired. An item counts as done when it has been proven to work.",
      },
      {
        title: "Documentation & Runbooks",
        body: "Deployment guides, incident procedures, and recovery runbooks written for your team — so production knowledge lives in documents, not in one person's head.",
      },
      {
        title: "Launch Support",
        body: "We're on standby through your go-live window with monitoring dashboards open and rollback ready.",
      },
      {
        title: "Post-Launch Review",
        body: "Two weeks after launch we review real production behavior and tune alerts, scaling, and costs against actual traffic.",
      },
    ],
    faq: [
      {
        question: "How is this different from the free checklist page?",
        answer: "The free checklist is the standard — use it yourself, no strings attached. This service is us implementing and verifying every item for you, with a fixed scope and a documented result. Many teams self-serve the easy items and bring us the rest.",
      },
      {
        question: "How long does full checklist implementation take?",
        answer: "For a typical AI-built app: 2–4 weeks. Simple apps with some existing infrastructure go faster; apps needing migration off prototype hosting (like Replit) or major security remediation take longer. The gap analysis gives you an exact timeline.",
      },
      {
        question: "Can you work with our in-house team?",
        answer: "Yes, and it's the best setup: we implement the specialist items (infrastructure, security, observability) while your team handles app-level fixes with our review. Knowledge transfer is part of the engagement.",
      },
      {
        question: "What if we've already launched?",
        answer: "Then the checklist matters more, not less — you're running production risk right now. We prioritize items by live exposure: backups and security first, then observability, then delivery pipeline.",
      },
    ],
    related: ["production-readiness-assessment", "monitoring-logging-setup", "backup-disaster-recovery"],
  }),
  servicePage({
    slug: "docker-deployment",
    name: "Docker Deployment",
    metaTitle: "Docker Deployment & Containerization Services",
    metaDescription:
      "Production-grade Docker containerization for AI-built apps: multi-stage builds, security-hardened images, compose or orchestrated deployment, and CI/CD integration.",
    keywords: [
      "docker deployment services",
      "containerization services",
      "dockerize application",
      "docker production best practices",
      "docker security hardening",
    ],
    heroTitle: "Docker Deployment — Containerize It Properly",
    heroSubtitle:
      "A Dockerfile that works is not a Dockerfile that's safe. We build minimal, hardened, reproducible images and the deployment workflow around them — the foundation every reliable production system stands on.",
    painPoints: [
      {
        title: "AI-generated Dockerfiles are demos, not deployments",
        body: "Root users, dev dependencies in production images, no health checks, gigabyte-sized layers, and secrets baked into build args — the standard output of 'write me a Dockerfile' prompts.",
      },
      {
        title: "\"Works on my machine\" is still your deployment strategy",
        body: "Without containerization done right, staging and production drift apart and every deployment is an experiment. Containers make environments identical — if the images are built correctly.",
      },
      {
        title: "Nobody knows what's inside the image",
        body: "Unscanned base images ship known CVEs into production. We add image scanning and rebuild automation so patching is a pipeline, not a panic.",
      },
    ],
    features: [
      {
        title: "Production Dockerfiles",
        body: "Multi-stage builds, minimal base images, non-root users, health checks, and proper signal handling — tuned per stack (Node.js, Python, .NET, Go, JVM).",
      },
      {
        title: "Image Security",
        body: "Vulnerability scanning in CI, pinned digests, secret-free build processes, and automated base image updates.",
      },
      {
        title: "Local-to-Production Parity",
        body: "Docker Compose development environments matching production topology, so bugs surface on laptops instead of in incidents.",
      },
      {
        title: "Registry & Versioning Strategy",
        body: "Private registry setup, image tagging discipline, and retention policies that make every deployed version traceable and re-deployable.",
      },
      {
        title: "Orchestrated Deployment",
        body: "From single-host Compose with zero-downtime reloads to full Kubernetes — sized to your actual scale, with an upgrade path either way.",
      },
      {
        title: "CI/CD Integration",
        body: "Build-scan-push-deploy pipelines so every merge produces a tested, scanned, deployable image automatically.",
      },
    ],
    faq: [
      {
        question: "Do we need Kubernetes if we use Docker?",
        answer: "Usually not at first. A well-run single-host or small multi-host Compose setup handles substantial traffic at a fraction of the operational cost. We containerize so the Kubernetes upgrade path exists — and tell you honestly when you actually need it.",
      },
      {
        question: "Our AI tool already generated Docker files. Are they usable?",
        answer: "Sometimes as a starting point. In audits we almost always find root users, bloated images, missing health checks, or secrets in build args. We rework them into production-grade builds — usually cutting image size by 60–90% along the way.",
      },
      {
        question: "Which stacks do you containerize?",
        answer: "Everything AI builders commonly produce: Node.js, Next.js, Python (FastAPI/Django), .NET, Go, JVM, and static frontends — plus databases, queues, and workers as part of the full topology.",
      },
      {
        question: "How does this connect to deployment?",
        answer: "Containerization is step one of our deployment pipeline. The same engagement typically includes cloud infrastructure, CI/CD, and monitoring — or we hand hardened images to your existing platform team.",
      },
    ],
    related: ["kubernetes-deployment", "ci-cd-pipeline-setup", "cloud-deployment-services"],
  }),
  servicePage({
    slug: "kubernetes-deployment",
    name: "Kubernetes Deployment",
    metaTitle: "Kubernetes Deployment Services — Production Clusters Without the Chaos",
    metaDescription:
      "Managed Kubernetes deployment for growing applications: EKS/AKS/GKE cluster setup, autoscaling, GitOps delivery, observability, and security policies — only when you actually need it.",
    keywords: [
      "kubernetes deployment services",
      "kubernetes consulting",
      "eks aks gke setup",
      "kubernetes production setup",
      "gitops deployment",
    ],
    heroTitle: "Kubernetes Deployment — When You're Actually Ready for It",
    heroSubtitle:
      "Kubernetes solves real scaling problems and creates real operational ones. We build production clusters with autoscaling, GitOps, and observability — and we'll tell you plainly if you don't need Kubernetes yet.",
    painPoints: [
      {
        title: "Kubernetes adopted for the résumé, not the workload",
        body: "A three-node cluster serving 200 users costs more in money and attention than the product it runs. We match orchestration to actual scale — and defer Kubernetes when simpler wins.",
      },
      {
        title: "A cluster is easy to create and hard to operate",
        body: "Upgrades, certificate rotation, network policies, resource limits, and pod security — the managed control plane is 10% of the work. We build the other 90%.",
      },
      {
        title: "YAML sprawl nobody can review",
        body: "Hand-edited manifests drift until no one knows what's deployed. We establish GitOps: the cluster state lives in git, reviewed and reproducible.",
      },
    ],
    features: [
      {
        title: "Cluster Architecture & Setup",
        body: "EKS, AKS, or GKE clusters with node pools, networking, ingress, TLS, and DNS designed for your workload — defined entirely in Terraform.",
      },
      {
        title: "GitOps Delivery",
        body: "Argo CD or Flux with Helm/Kustomize, so every change to the cluster is a reviewed git commit with automatic drift correction.",
      },
      {
        title: "Autoscaling Done Right",
        body: "Horizontal pod autoscaling, cluster autoscaling, and resource requests/limits based on measured usage — not guesses.",
      },
      {
        title: "Security Policies",
        body: "Pod security standards, network policies, RBAC with least privilege, image admission controls, and secret management via external vaults.",
      },
      {
        title: "Observability Stack",
        body: "Prometheus, Grafana, and log aggregation with dashboards and alerts tuned for your services — plus cost visibility per workload.",
      },
      {
        title: "Operations & Upgrades",
        body: "Documented runbooks, tested upgrade procedures, and optional ongoing cluster operations under SLA.",
      },
    ],
    faq: [
      {
        question: "Do we actually need Kubernetes?",
        answer: "Honest answer: most early-stage apps don't. You need it when you run many services, need fine-grained autoscaling, or have platform/compliance requirements. Below that, containerized deployment on simpler infrastructure delivers the same reliability for far less. Our assessment gives you the threshold numbers for your case.",
      },
      {
        question: "Managed (EKS/AKS/GKE) or self-hosted?",
        answer: "Managed, almost always. Self-hosting control planes buys operational burden with no business return for the vast majority of teams. We deploy on the managed Kubernetes of your chosen cloud.",
      },
      {
        question: "Can you migrate our existing deployment to Kubernetes?",
        answer: "Yes — typically from Compose, VMs, Heroku-style platforms, or a first-attempt cluster. We containerize properly first, stand up the new cluster alongside, and cut over service by service with rollback at each step.",
      },
      {
        question: "Who operates the cluster after handover?",
        answer: "Your choice: we train your team and hand over runbooks, or we operate it under an ongoing support SLA — monitoring, upgrades, security patches, and incident response included.",
      },
    ],
    related: ["docker-deployment", "cloud-deployment-services", "monitoring-logging-setup"],
  }),
  servicePage({
    slug: "cloud-deployment-services",
    name: "Cloud Deployment Services",
    metaTitle: "Cloud Deployment Services — AWS, Azure, GCP & DigitalOcean",
    metaDescription:
      "End-to-end cloud deployment for AI-built applications on AWS, Azure, Google Cloud, or DigitalOcean: architecture, infrastructure-as-code, security, CI/CD, and cost control.",
    keywords: [
      "cloud deployment services",
      "cloud migration",
      "aws azure gcp deployment",
      "infrastructure as code services",
      "devops consulting",
    ],
    heroTitle: "Cloud Deployment — From Prototype Hosting to Real Infrastructure",
    heroSubtitle:
      "We move AI-built apps from prototype hosting onto cloud infrastructure you own: architected for your scale, secured by default, deployed by pipeline, and sized to your budget on AWS, Azure, GCP, or DigitalOcean.",
    painPoints: [
      {
        title: "Your app lives wherever the AI tool put it",
        body: "Replit workspaces, preview URLs, free-tier databases — fine for demos, dangerous for customers. Prototype hosting lacks the uptime, backup, and security guarantees a business needs.",
      },
      {
        title: "Cloud choice paralysis",
        body: "Four clouds, hundreds of services, conflicting advice. We cut through it with a concrete recommendation based on your workload, region, team, and budget — with monthly cost estimates attached.",
      },
      {
        title: "One-person infrastructure risk",
        body: "If your deployment knowledge lives in one head (or one chat history), you have a single point of failure. Infrastructure-as-code plus documentation makes your platform survivable.",
      },
    ],
    features: [
      {
        title: "Cloud Architecture & Selection",
        body: "Workload analysis and a right-sized architecture on AWS, Azure, GCP, or DigitalOcean — compared with real monthly cost numbers before you commit.",
      },
      {
        title: "Infrastructure as Code",
        body: "Every resource defined in Terraform, stored in your repository, documented, and reproducible. You own it all.",
      },
      {
        title: "Zero-Downtime Migration",
        body: "Planned cutover from current hosting — including databases, DNS, background jobs, and file storage — with tested rollback at every stage.",
      },
      {
        title: "Security Baseline",
        body: "Least-privilege IAM, private networking, encryption at rest and in transit, secret management, and audit logging from day one.",
      },
      {
        title: "Environments & CI/CD",
        body: "Staging and production environments with automated pipelines: test, build, deploy, verify, and roll back — on every push.",
      },
      {
        title: "Cost Guardrails",
        body: "Budgets, alerts, tagging, and right-sizing built in, with an optional monthly cost review. Cloud spend should track growth, not entropy.",
      },
    ],
    faq: [
      {
        question: "Which cloud do you recommend for startups and SMEs?",
        answer: "For most early-stage workloads: DigitalOcean or AWS with managed services, because they balance cost, simplicity, and growth headroom. .NET-heavy teams often fit Azure better; container-first and data-heavy workloads fit GCP's Cloud Run well. We give a specific recommendation with cost numbers in the free assessment.",
      },
      {
        question: "Can you migrate us without downtime?",
        answer: "Yes for virtually all web workloads: we run old and new environments in parallel, replicate data continuously, cut over DNS with low TTLs, and keep rollback available throughout. Maintenance windows are a last resort, not a default.",
      },
      {
        question: "Do you resell cloud services or mark up hosting?",
        answer: "No. Infrastructure runs in your own cloud account, billed directly to you at provider prices. Our incentive is engineering quality, not your hosting bill.",
      },
      {
        question: "What does ongoing cloud operations cost?",
        answer: "Support plans start at a flat monthly fee covering monitoring response, patching, backup verification, and cost review — scoped to your stack during the assessment. Many clients run self-sufficiently after handover, and that's a fine outcome too.",
      },
    ],
    related: ["deploy-to-aws", "docker-deployment", "cloud-cost-optimization"],
  }),
  servicePage({
    slug: "ci-cd-pipeline-setup",
    name: "CI/CD Pipeline Setup",
    metaTitle: "CI/CD Pipeline Setup — Ship Fast Without Breaking Production",
    metaDescription:
      "CI/CD pipelines for AI-assisted teams: automated testing, staging environments, zero-downtime deploys, and instant rollback with GitHub Actions, GitLab CI, and more.",
    keywords: [
      "ci cd pipeline setup",
      "github actions setup",
      "deployment automation",
      "continuous deployment services",
      "zero downtime deployment",
    ],
    heroTitle: "CI/CD Pipelines — Keep AI Speed, Add Production Safety",
    heroSubtitle:
      "AI tools let you build features in hours. A real pipeline lets you ship them in minutes — tested, staged, deployed without downtime, and rolled back in one click when needed.",
    painPoints: [
      {
        title: "Deployment is a person, not a process",
        body: "Manual deploys — SSH, drag-and-drop, or 'the founder does it' — mean releases are slow, error-prone, and blocked on one human. Every fast-moving team eventually ships a broken build this way.",
      },
      {
        title: "AI-generated code merges without a safety net",
        body: "When Cursor or Claude Code writes half your commits, untested merges are how regressions reach customers. Pipelines with automated tests are what make AI-speed development sustainable.",
      },
      {
        title: "No rollback plan except panic",
        body: "When a bad release hits production, 'fix forward under pressure' is the most expensive strategy there is. One-click rollback turns incidents into non-events.",
      },
    ],
    features: [
      {
        title: "Pipeline Design & Build",
        body: "GitHub Actions, GitLab CI, or your platform of choice: build, lint, test, scan, and deploy stages tuned to your stack and team workflow.",
      },
      {
        title: "Automated Testing Gates",
        body: "We stand up the test infrastructure AI-built apps lack — smoke tests, API contract tests, and critical-path E2E — so pipelines block real regressions, not just syntax errors.",
      },
      {
        title: "Staging Environments",
        body: "Production-parity staging (and preview environments per pull request where useful) so changes are seen before customers see them.",
      },
      {
        title: "Zero-Downtime Deploys",
        body: "Rolling or blue-green releases with health-check verification, plus safe database migration handling — the part most DIY pipelines get wrong.",
      },
      {
        title: "Instant Rollback",
        body: "Every release is versioned and re-deployable. Rolling back is one action, tested regularly, not a heroic recovery.",
      },
      {
        title: "Security in the Pipeline",
        body: "Dependency scanning, secret detection, and image scanning on every merge — catching tomorrow's audit findings today.",
      },
    ],
    faq: [
      {
        question: "Our app has almost no tests. Can we still have CI/CD?",
        answer: "Yes — that's the normal starting point for AI-built apps. We begin with build verification, linting, and smoke tests for critical paths, which already prevents most bad deploys, then grow coverage where risk concentrates. Perfect coverage is not a prerequisite; a pipeline is how you get there.",
      },
      {
        question: "How fast will deployments be?",
        answer: "Typical result: merge-to-production in 5–15 minutes fully automated, versus hours or days of manual process. Preview environments make review cycles faster too.",
      },
      {
        question: "GitHub Actions, GitLab CI, or something else?",
        answer: "We default to the CI native to your repository host — GitHub Actions for most teams — because integration friction is lowest. We're equally at home in GitLab CI, Bitbucket Pipelines, and CircleCI.",
      },
      {
        question: "How do database migrations fit into the pipeline?",
        answer: "With a migration strategy: backward-compatible schema changes, automated migration steps gated before deploy, and tested rollback paths. This is the most common cause of deployment disasters, so we treat it as a first-class pipeline concern.",
      },
    ],
    related: ["docker-deployment", "monitoring-logging-setup", "deploy-copilot-apps"],
  }),
  servicePage({
    slug: "monitoring-logging-setup",
    name: "Monitoring & Logging",
    metaTitle: "Monitoring & Logging Setup — Know Before Your Users Do",
    metaDescription:
      "Production observability for AI-built apps: error tracking, uptime monitoring, structured logging, dashboards, and alerting that reaches the right person at the right time.",
    keywords: [
      "monitoring setup services",
      "application logging setup",
      "observability services",
      "error tracking setup",
      "uptime monitoring",
    ],
    heroTitle: "Monitoring & Logging — Stop Finding Out From Customers",
    heroSubtitle:
      "AI tools generate zero observability. We add the eyes and ears: error tracking, metrics, structured logs, uptime checks, and alerts routed to people who can act — so production problems become tickets, not crises.",
    painPoints: [
      {
        title: "Your monitoring strategy is customer complaints",
        body: "If users report outages before you see them, every incident costs trust on top of downtime. Proper monitoring flips the order: you know first, you fix first, often before anyone notices.",
      },
      {
        title: "When something breaks, there's nothing to look at",
        body: "No logs, no error traces, no metrics — debugging production by adding console.log and redeploying. Incidents that should take minutes take days.",
      },
      {
        title: "Or the opposite: alerts nobody reads",
        body: "Alert fatigue is monitoring failure with extra steps. We tune alerting to real symptoms with severity levels, so a page means something is actually wrong.",
      },
    ],
    features: [
      {
        title: "Error Tracking",
        body: "Sentry (or equivalent) wired into frontend and backend with release tagging, source maps, and grouping — every production exception captured with full context.",
      },
      {
        title: "Structured Logging",
        body: "Consistent, searchable JSON logs with request IDs and correlation across services, aggregated where your team can actually query them.",
      },
      {
        title: "Metrics & Dashboards",
        body: "The dashboards that matter: latency, error rate, throughput, saturation, and business KPIs — one screen that answers 'is production healthy?'",
      },
      {
        title: "Uptime & Synthetic Checks",
        body: "External checks on critical user journeys (not just the homepage) from multiple regions, catching failures your internal metrics miss.",
      },
      {
        title: "Alert Routing & Escalation",
        body: "Severity-tiered alerts to Slack, email, or phone with escalation and quiet-hours policies — tuned over the first month against real traffic.",
      },
      {
        title: "Incident Runbooks",
        body: "For each alert, a written runbook: what it means, what to check, how to mitigate. Alerts without runbooks are just anxiety.",
      },
    ],
    faq: [
      {
        question: "What tools do you use?",
        answer: "Pragmatic defaults: Sentry for errors, UptimeRobot or Better Stack for uptime, Grafana stacks or cloud-native monitoring for metrics and logs. We fit tooling to your budget and stack rather than selling a platform — total tooling cost for a typical SME setup is $0–$100/month.",
      },
      {
        question: "How fast will we know about an outage?",
        answer: "Uptime checks run at 30–60 second intervals with immediate alerting — you'll typically know within a minute, with error context already attached. Compare that to finding out from a customer email hours later.",
      },
      {
        question: "Can you add observability to an app you didn't build?",
        answer: "Yes — this is one of our most common standalone engagements. Error tracking and uptime monitoring need minimal code changes and land within days; structured logging and metrics follow incrementally.",
      },
      {
        question: "Who responds to the alerts?",
        answer: "Your team, ours, or both. With an ongoing support plan we take first response under SLA (including 24/7 for critical alerts); otherwise we set up routing and runbooks so your team responds effectively.",
      },
    ],
    related: ["backup-disaster-recovery", "performance-optimization", "ongoing-production-support"],
  }),
  servicePage({
    slug: "backup-disaster-recovery",
    name: "Backup & Disaster Recovery",
    metaTitle: "Backup & Disaster Recovery — Tested Recovery, Not Hopeful Backups",
    metaDescription:
      "Automated backups, tested restores, and disaster recovery planning for production applications. RPO/RTO targets, cross-region copies, and recovery runbooks that actually work.",
    keywords: [
      "backup and disaster recovery services",
      "database backup setup",
      "disaster recovery plan",
      "rpo rto",
      "data recovery strategy",
    ],
    heroTitle: "Backup & Disaster Recovery — Because 'Oops' Is Inevitable",
    heroSubtitle:
      "Databases get dropped, regions go down, ransomware happens, and someone will eventually delete the wrong thing. We build automated backups and tested recovery so any of it costs you minutes, not your company.",
    painPoints: [
      {
        title: "An untested backup is a hypothesis",
        body: "Most teams discover their backups don't restore during the incident that needed them — wrong scope, silent failures, missing credentials. We test restores on a schedule, so recovery is a rehearsed procedure.",
      },
      {
        title: "AI-built apps ship with zero recovery story",
        body: "No AI tool configures backup retention or writes a disaster recovery plan. If your app was generated, assume data loss protection does not exist until verified.",
      },
      {
        title: "Everything lives in one region, one account, one basket",
        body: "Provider outages, account compromises, and billing lockouts are real. Cross-region and off-account copies keep a bad day from becoming a fatal one.",
      },
    ],
    features: [
      {
        title: "RPO/RTO Definition",
        body: "We translate 'how much data can you lose and how long can you be down' into concrete targets, then design backup frequency and recovery architecture to meet them.",
      },
      {
        title: "Automated Backup Pipeline",
        body: "Databases, file storage, and configuration backed up on schedule with encryption, retention policies, and integrity verification — plus alerts when a backup fails.",
      },
      {
        title: "Off-Site & Cross-Region Copies",
        body: "The 3-2-1 principle applied to cloud: copies in separate regions and, where warranted, separate accounts or providers.",
      },
      {
        title: "Scheduled Restore Testing",
        body: "Restores executed on a regular cadence into isolated environments, timed against RTO, with results reported. This is the step everyone skips — it's the whole point.",
      },
      {
        title: "Disaster Recovery Runbook",
        body: "Step-by-step recovery procedures per scenario (data corruption, region loss, account compromise), written so someone other than the author can execute them at 3 a.m.",
      },
      {
        title: "DR Drills",
        body: "Optional scheduled disaster simulations with your team — the difference between having a plan and being able to execute one.",
      },
    ],
    faq: [
      {
        question: "Our cloud provider does backups automatically. Isn't that enough?",
        answer: "Provider snapshots are a good layer, but they usually live in the same region and account as the failure, have limited retention, and are rarely restore-tested. They don't protect against account compromise or provider-level issues. We build on them, not instead of them — and we test.",
      },
      {
        question: "What RPO/RTO should a startup aim for?",
        answer: "A common, affordable baseline: RPO of 1 hour (max one hour of data loss) and RTO of 4 hours (back online within four). Continuous replication can push RPO to near-zero when the business justifies it. We'll model the cost of each tier so you choose deliberately.",
      },
      {
        question: "How much does a proper backup setup cost to run?",
        answer: "Storage is cheap; loss is not. Typical SME production backups cost $5–$50/month in storage. The engagement cost is one-time setup plus optional scheduled restore-testing — trivial against the cost of losing a production database.",
      },
      {
        question: "Can you recover data we've already lost?",
        answer: "Sometimes — it depends on what snapshots, replicas, or provider-level recovery windows still exist. Contact us immediately and stop writing to the affected systems. Then let's make sure this question never applies to you again.",
      },
    ],
    related: ["monitoring-logging-setup", "cloud-deployment-services", "ongoing-production-support"],
  }),
  servicePage({
    slug: "performance-optimization",
    name: "Performance Optimization",
    metaTitle: "Performance Optimization — Fix Slow Apps with Evidence, Not Guesses",
    metaDescription:
      "Application performance optimization: profiling, database and query tuning, caching strategy, Core Web Vitals, and load testing for AI-generated applications.",
    keywords: [
      "application performance optimization",
      "slow app fix",
      "database query optimization",
      "core web vitals optimization",
      "load testing services",
    ],
    heroTitle: "Performance Optimization — Measured, Fixed, Proven",
    heroSubtitle:
      "AI-generated code optimizes for correctness on the happy path, not performance under load. We profile the real bottlenecks — usually queries, N+1 patterns, and missing caches — fix them, and prove the improvement with numbers.",
    painPoints: [
      {
        title: "Fast in the demo, slow with real data",
        body: "The classic AI-app trajectory: instant with 50 test rows, unusable with 50,000 real ones. Unindexed queries and N+1 patterns don't hurt until data arrives — then they define your user experience.",
      },
      {
        title: "Scaling the bill instead of the code",
        body: "Throwing bigger servers at slow code works briefly and costs forever. Most performance problems are algorithmic or data-layer issues that no instance size fixes.",
      },
      {
        title: "Slow pages quietly cost conversions and rankings",
        body: "Core Web Vitals affect both Google rankings and user trust. A one-second delay measurably cuts conversions — performance is a revenue problem wearing an engineering costume.",
      },
    ],
    features: [
      {
        title: "Profiling & Baseline",
        body: "APM-based profiling under realistic load to find where time actually goes — no optimizing on vibes. Every engagement starts and ends with the same measured benchmarks.",
      },
      {
        title: "Database & Query Optimization",
        body: "Index design, N+1 elimination, query rewrites, and connection pool tuning — where 80% of AI-app performance problems live.",
      },
      {
        title: "Caching Strategy",
        body: "Redis, HTTP caching, and CDN layers applied where they pay off, with invalidation designed deliberately (because stale-data bugs are worse than slow pages).",
      },
      {
        title: "Frontend & Core Web Vitals",
        body: "Bundle diet, code-splitting, image optimization, and render-path fixes targeting LCP, INP, and CLS scores that satisfy both users and Google.",
      },
      {
        title: "Load Testing",
        body: "Scripted load tests that answer 'what happens at 10x traffic?' before launch day answers it for you.",
      },
      {
        title: "Cost-Aware Tuning",
        body: "Performance and cloud cost optimized together — faster code usually means smaller servers, and we report both improvements.",
      },
    ],
    faq: [
      {
        question: "How much improvement is realistic?",
        answer: "For AI-generated apps that have never been profiled: large. It's common to take key endpoints from seconds to tens of milliseconds by fixing indexes and N+1 queries, and to cut page load times in half. We commit to measured baselines and report exact before/after numbers.",
      },
      {
        question: "Can you optimize without rewriting the app?",
        answer: "Yes — the highest-impact fixes (indexes, query patterns, caching, connection pooling) are localized changes. We prioritize by impact-per-change and leave the architecture intact unless the data says otherwise.",
      },
      {
        question: "Do you handle traffic-spike preparation (launches, campaigns)?",
        answer: "Yes: load testing against your expected peak, fixing what breaks, configuring autoscaling, and standing by during the event. Ideally we start 2–4 weeks before the date.",
      },
      {
        question: "What tools do you use for profiling and load testing?",
        answer: "APM via Sentry Performance, OpenTelemetry, or cloud-native tracing; database analysis with native query planners; load testing with k6 or Locust. Tooling adapts to your stack — the method (measure, fix, re-measure) is the constant.",
      },
    ],
    related: ["cloud-cost-optimization", "architecture-review", "monitoring-logging-setup"],
  }),
  servicePage({
    slug: "cloud-cost-optimization",
    name: "Cloud Cost Optimization",
    metaTitle: "Cloud Cost Optimization — Cut 30–60% Without Cutting Reliability",
    metaDescription:
      "Cloud cost optimization for AWS, Azure, GCP, and DigitalOcean: right-sizing, reserved capacity, architecture fixes, and ongoing cost governance. Most clients save 30–60%.",
    keywords: [
      "cloud cost optimization",
      "reduce aws bill",
      "cloud spend management",
      "finops services",
      "cloud cost audit",
    ],
    heroTitle: "Cloud Cost Optimization — Stop Paying for Entropy",
    heroSubtitle:
      "Cloud bills grow through defaults, forgotten resources, and oversized everything. We audit where the money goes, cut the waste, fix the architecture where it's the real culprit — most clients save 30–60% with reliability improved, not traded away.",
    painPoints: [
      {
        title: "The bill grows faster than the business",
        body: "Costs compound quietly: oversized instances chosen 'to be safe', dev environments running around the clock, storage and snapshots accumulating forever. Nobody decided to spend this much — it happened.",
      },
      {
        title: "AI-built apps are expensive by accident",
        body: "Generated code that hammers the database, chatty APIs, missing caches, and serverless functions in hot loops turn inefficiency directly into monthly invoices.",
      },
      {
        title: "No one owns the cloud bill",
        body: "Without tagging, budgets, and review, cost is nobody's job until it's the CFO's emergency. We install lightweight governance so spend stays visible and intentional.",
      },
    ],
    features: [
      {
        title: "Cost Audit & Attribution",
        body: "Full spend breakdown by service, environment, and workload — finding the surprises (there are always surprises) and mapping each dollar to a decision.",
      },
      {
        title: "Right-Sizing",
        body: "Instance, database, and storage sizing based on measured utilization, with autoscaling replacing 'sized for the spike we had once'.",
      },
      {
        title: "Commitment Planning",
        body: "Reserved instances and savings plans applied where usage is proven stable — typically 30–40% off compute with no engineering changes.",
      },
      {
        title: "Architecture-Level Savings",
        body: "Caching, query fixes, data transfer reduction, and lifecycle policies — the structural changes that keep savings compounding instead of drifting back.",
      },
      {
        title: "Waste Elimination",
        body: "Orphaned volumes, idle load balancers, forgotten environments, and zombie snapshots — removed, and prevented from returning via automation.",
      },
      {
        title: "Ongoing Cost Governance",
        body: "Budgets, anomaly alerts, tagging discipline, and an optional monthly review so the bill never surprises anyone again.",
      },
    ],
    faq: [
      {
        question: "How much can we realistically save?",
        answer: "Across our engagements the typical result is 30–60% on unoptimized setups — first-time cloud deployments and AI-built apps sit at the high end because nothing was ever sized deliberately. The audit is quick and tells you the number for your account before you commit to anything.",
      },
      {
        question: "Will cost cutting hurt reliability?",
        answer: "Done right, the opposite: right-sizing usually reveals under-provisioned bottlenecks alongside the waste, and the same review adds budgets, alerts, and autoscaling. We never trade documented reliability requirements for savings — every change is reversible and monitored.",
      },
      {
        question: "Is this a one-time fix or ongoing?",
        answer: "The audit and remediation is a one-time project with immediate effect. Costs drift back without governance, so we include budgets and anomaly alerts by default, and offer a monthly review for teams that want spend actively managed.",
      },
      {
        question: "Do you work on small bills, or only enterprise spend?",
        answer: "Both. A startup spending $800/month that should spend $300 cares about those percentages as much as an enterprise does — often more. Pricing scales with engagement size so the economics work at SME scale.",
      },
    ],
    related: ["performance-optimization", "cloud-deployment-services", "deploy-to-aws"],
  }),
  servicePage({
    slug: "documentation-handover",
    name: "Documentation & Handover",
    metaTitle: "Documentation & Handover — Make Your System Survivable",
    metaDescription:
      "Technical documentation for AI-built systems: architecture docs, runbooks, deployment guides, API documentation, and onboarding material — so knowledge outlives chat histories.",
    keywords: [
      "technical documentation services",
      "runbook writing",
      "system handover documentation",
      "api documentation services",
      "knowledge transfer",
    ],
    heroTitle: "Documentation & Handover — Get the System Out of One Person's Head",
    heroSubtitle:
      "AI-built apps have a documentation problem: the 'why' lives in scattered chat histories and one founder's memory. We produce the documentation that makes your system operable, transferable, and due-diligence ready.",
    painPoints: [
      {
        title: "The documentation is a chat history",
        body: "Decisions made across hundreds of AI prompts are effectively undocumented. When the person who prompted them leaves — or forgets — the system becomes an artifact nobody fully understands.",
      },
      {
        title: "Onboarding takes months instead of days",
        body: "Every new engineer (or new AI session) rediscovers the system from scratch. Good documentation converts that rediscovery into an afternoon of reading.",
      },
      {
        title: "Due diligence, enterprise sales, and audits all ask for docs",
        body: "Investors, enterprise customers, and compliance processes expect architecture documentation and operational runbooks. 'We move fast' is not an answer they accept.",
      },
    ],
    features: [
      {
        title: "Architecture Documentation",
        body: "System overview, component map, data flows, and architecture decision records — the accurate diagram of what actually exists, kept in your repository.",
      },
      {
        title: "Operational Runbooks",
        body: "Deployment, rollback, incident response, backup restoration, and scaling procedures — written to be executed under stress by someone who didn't write them.",
      },
      {
        title: "API Documentation",
        body: "OpenAPI specifications generated and verified against real behavior, with usage guides for internal teams or external consumers.",
      },
      {
        title: "Environment & Setup Guides",
        body: "From-zero local development setup and environment configuration docs, tested by actually following them on a clean machine.",
      },
      {
        title: "Onboarding Path",
        body: "A structured reading-and-doing path that takes a new engineer from clone to confident contribution in days.",
      },
      {
        title: "Handover Package",
        body: "For acquisitions, team transitions, or agency handoffs: complete system transfer documentation including credentials inventory, third-party services, and operational calendar.",
      },
    ],
    faq: [
      {
        question: "How do you document a system you didn't build?",
        answer: "By reading the code, tracing the infrastructure, and interviewing whoever knows most — then verifying everything by doing: deploying from our own docs, restoring from our own runbooks. Documentation we haven't executed is fiction, so we execute it.",
      },
      {
        question: "Won't the documentation go stale immediately?",
        answer: "We fight staleness structurally: docs live in the repository next to code, generated artifacts (like OpenAPI specs) update automatically, and runbooks get re-verified during scheduled drills. We also keep the surface small — a few accurate documents beat a wiki of stale ones.",
      },
      {
        question: "What does 'due-diligence ready' mean concretely?",
        answer: "The package technical due-diligence teams ask for: architecture overview, security posture summary, infrastructure inventory, operational procedures, dependency and license report, and key-person risk mitigation. We've built these for funding rounds and acquisitions.",
      },
      {
        question: "Is documentation included in your other services?",
        answer: "Yes — every deployment, security, and infrastructure engagement ships with runbooks and configuration docs for what we built. This standalone service is for documenting the rest of the system, or systems we didn't build.",
      },
    ],
    related: ["production-readiness-assessment", "ongoing-production-support", "architecture-review"],
  }),
  servicePage({
    slug: "ongoing-production-support",
    name: "Ongoing Production Support",
    metaTitle: "Ongoing Production Support — SLA-Backed Operations for AI-Built Apps",
    metaDescription:
      "Monthly production support for AI-built applications: monitoring response, security patching, backup verification, dependency updates, and incident response under SLA.",
    keywords: [
      "production support services",
      "application maintenance",
      "sla support",
      "managed application operations",
      "devops as a service",
    ],
    heroTitle: "Ongoing Production Support — Production, Someone Else's Problem",
    heroSubtitle:
      "You launched. Now someone has to watch monitoring, patch vulnerabilities, verify backups, and answer at 2 a.m. That someone can be us — under SLA, at a flat monthly rate, while your team keeps building.",
    painPoints: [
      {
        title: "Launch day is day one of operations",
        body: "Uptime, patching, backups, and incidents don't staff themselves. Teams that budgeted for building rarely budgeted for operating — and the gap shows up as downtime.",
      },
      {
        title: "Your builders shouldn't be your on-call",
        body: "Pulling product engineers into ops work costs you roadmap velocity and burns people out. Dedicated operations coverage is cheaper than either.",
      },
      {
        title: "Small neglect compounds into big incidents",
        body: "The unpatched dependency, the backup that stopped, the disk slowly filling — production decays without regular attention. Support is maintenance that prevents emergencies, not just response to them.",
      },
    ],
    features: [
      {
        title: "Monitoring & First Response",
        body: "We watch the alerts and take first response under SLA — including 24/7 coverage for critical severity on higher tiers.",
      },
      {
        title: "Security Patching",
        body: "Dependency updates, base image rebuilds, and CVE response on a defined cadence, with emergency patching for actively-exploited vulnerabilities.",
      },
      {
        title: "Backup & Recovery Verification",
        body: "Scheduled restore tests with reported results — your recovery capability stays proven, not assumed.",
      },
      {
        title: "Performance & Cost Watch",
        body: "Monthly review of latency trends, error budgets, and cloud spend, with proactive fixes before degradation becomes incident.",
      },
      {
        title: "Incident Management",
        body: "Defined severities, response targets, escalation paths, and blameless post-incident reports with prevention actions.",
      },
      {
        title: "Monthly Report",
        body: "Uptime, incidents, changes, spend, and recommendations in a report you can forward to leadership or clients as-is.",
      },
    ],
    faq: [
      {
        question: "What are the SLA response times?",
        answer: "Standard tiers: critical incidents 1-hour response (24/7 on the full tier), high 4 hours, normal next business day — with resolution targets per severity. Exact terms are set in the support agreement to match what your business actually needs.",
      },
      {
        question: "What does it cost?",
        answer: "Flat monthly plans scoped to your stack and coverage window, starting at a level accessible to funded startups and SMEs. It's consistently cheaper than one part-time ops hire — and it never goes on vacation. You get exact pricing with the assessment.",
      },
      {
        question: "Do you support apps you didn't deploy?",
        answer: "Yes, after an onboarding assessment: we need monitoring in place, access sorted, and a baseline understanding of the system before taking SLA responsibility. If observability is missing, we set it up as part of onboarding.",
      },
      {
        question: "Can we cancel or change tiers?",
        answer: "Monthly terms with 30-day notice, no long lock-ins. Everything we operate is documented and in your accounts, so offboarding is clean — that's deliberate. We keep clients by being useful, not by being hard to leave.",
      },
    ],
    related: ["monitoring-logging-setup", "backup-disaster-recovery", "production-readiness-checklist-service"],
  }),
  servicePage({
    slug: "ai-app-security-checklist-service",
    name: "AI Security Checklist Service",
    metaTitle: "AI App Security Checklist — Guided Hardening Service",
    metaDescription:
      "We take your AI-generated app through the complete AI security checklist: secrets, auth, input validation, dependencies, LLM risks, and infrastructure hardening — verified item by item.",
    keywords: [
      "ai app security checklist",
      "secure ai generated code",
      "application hardening service",
      "security checklist implementation",
    ],
    heroTitle: "AI App Security Checklist — Hardened, Item by Item",
    heroSubtitle:
      "Our free AI App Security Checklist defines the standard. This service delivers it: every item implemented and verified on your app, from secret management to LLM-specific defenses.",
    painPoints: [
      {
        title: "Security checklists don't implement themselves",
        body: "Reading about secret rotation and doing it across a live codebase are different jobs. We do the second one, without breaking your app in the process.",
      },
      {
        title: "AI-generated apps fail the same items every time",
        body: "Hardcoded secrets, missing authorization checks, unvalidated input, and permissive CORS — the same five findings appear in nearly every AI-built app we audit. Yours almost certainly has them.",
      },
      {
        title: "One incident costs more than the whole checklist",
        body: "A single leaked key or injection flaw can mean data breach disclosure, customer loss, and cleanup costs that dwarf preventive hardening by orders of magnitude.",
      },
    ],
    features: [
      {
        title: "Full Checklist Assessment",
        body: "Your app scored against every item on the AI App Security Checklist, with evidence per finding — the honest baseline.",
      },
      {
        title: "Secrets & Credential Hardening",
        body: "Repository history cleaned, keys rotated, vault-based secret management installed, and CI secret scanning enabled.",
      },
      {
        title: "Auth & Access Control Fixes",
        body: "Object-level authorization on every endpoint, session hardening, and password/token storage brought to standard.",
      },
      {
        title: "Input Validation & Injection Defense",
        body: "Systematic validation at every boundary, parameterized queries throughout, and output encoding where it belongs.",
      },
      {
        title: "LLM Feature Hardening",
        body: "For apps with AI features: prompt injection defenses, output sanitization, and data-flow controls per the OWASP LLM Top 10.",
      },
      {
        title: "Regression-Proofing",
        body: "Security checks wired into CI so the checklist stays passed as you — and your AI tools — keep shipping.",
      },
    ],
    faq: [
      {
        question: "How long does full checklist hardening take?",
        answer: "Typically 1–3 weeks depending on codebase size and finding density. Critical items (exposed secrets, missing auth) are fixed in the first days; the remainder proceeds in priority order with your app running throughout.",
      },
      {
        question: "Will fixes break existing functionality?",
        answer: "Hardening changes go through the same discipline as any production change: staging verification, incremental rollout, and rollback capability. Where we tighten validation or auth, we test against real usage patterns first.",
      },
      {
        question: "Do we get proof of the hardening for customers or auditors?",
        answer: "Yes — a before/after checklist report with evidence per item, suitable for enterprise security questionnaires and due-diligence requests.",
      },
      {
        question: "Is this the same as the AI Security Audit?",
        answer: "They complement each other: the audit is investigative (find what's wrong, including logic flaws beyond any checklist); this service is systematic hardening against the known AI-app failure patterns. Bundled together they cover both the known and the unknown.",
      },
    ],
    related: ["ai-security-audit", "production-readiness-checklist-service", "ci-cd-pipeline-setup"],
  }),
];

/* ------------------------------------------------------------------ */

export const landingPages: LandingPage[] = [
  ...platformPages,
  ...stackPages,
  ...cloudPages,
  ...servicePages,
];

/** Look up a landing page by slug (used by generateStaticParams + page). */
export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((page) => page.slug === slug);
}
