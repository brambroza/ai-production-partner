/** Content for the 13 homepage sections. */

export const painPoints = [
  {
    title: "It works in the demo — and you don't trust it further than that",
    body: "Your AI-built app does everything you asked. But nobody has verified what happens with real users, real data volume, or a real attacker probing it.",
  },
  {
    title: "Security is a question mark",
    body: "Hardcoded API keys, missing authorization checks, unvalidated input — AI tools generate these constantly, and they're invisible until someone exploits them.",
  },
  {
    title: "It lives on prototype hosting",
    body: "Preview URLs, workspace hosts, and free-tier databases were never meant to carry paying customers. No SLA, no backups you control, no way to scale.",
  },
  {
    title: "Nobody can operate it",
    body: "No monitoring, no logs, no deployment pipeline, no recovery plan. The 'why' behind the code lives in scattered AI chat histories and one person's memory.",
  },
];

export const whyAiAppsFail = [
  {
    title: "Security was never in the prompt",
    body: "AI tools optimize for 'make it work', not 'make it safe'. Studies consistently find security flaws in a large share of AI-generated code: exposed secrets, injection paths, and broken access control ship silently.",
  },
  {
    title: "Architecture by accumulation",
    body: "Every AI session makes locally-reasonable choices that add up to a globally-fragile system: N+1 queries, no service boundaries, state in surprising places. It works at demo scale and hits a ceiling at real scale.",
  },
  {
    title: "The invisible 40% is missing",
    body: "Environments, pipelines, observability, backups, and recovery are never generated — nobody prompts for them and demos don't need them. Production does.",
  },
  {
    title: "No one is watching",
    body: "Without monitoring and alerting, the first outage is discovered by customers. Without tested backups, the first data incident is permanent.",
  },
];

export const frameworkPillars = [
  {
    number: "01",
    title: "Assess",
    body: "40+ checkpoint review across security, architecture, infrastructure, and operations — producing a Production Readiness Score and a prioritized findings report within 48 hours.",
  },
  {
    number: "02",
    title: "Harden",
    body: "Security remediation: secrets rotated and vaulted, authorization enforced on every endpoint, input validated, dependencies patched, rate limits installed.",
  },
  {
    number: "03",
    title: "Deploy",
    body: "Production-grade containers, infrastructure-as-code you own, staging and production environments, and CI/CD with automated tests and one-click rollback.",
  },
  {
    number: "04",
    title: "Observe",
    body: "Error tracking, structured logs, metrics dashboards, uptime checks, and alerts routed to humans who can act — before customers notice.",
  },
  {
    number: "05",
    title: "Protect",
    body: "Automated backups with tested restores, disaster recovery runbooks, and cross-region copies. Recovery becomes a rehearsed procedure, not a hope.",
  },
  {
    number: "06",
    title: "Support",
    body: "SLA-backed operations: monitoring response, security patching, cost reviews, and monthly reports — while your team keeps building.",
  },
];

export const services = [
  { name: "Production Readiness Assessment", href: "/production-readiness-assessment", blurb: "Scored 40+ checkpoint review of your AI-built app, delivered in 48 hours." },
  { name: "Architecture Review", href: "/architecture-review", blurb: "Map what the AI actually built, find the ceilings, plan the evolution." },
  { name: "Production Checklist", href: "/production-readiness-checklist-service", blurb: "Every readiness item implemented and verified — not just listed." },
  { name: "Security Audit", href: "/ai-security-audit", blurb: "OWASP Top 10 + LLM Top 10 audit built for AI-generated code, with verified fixes." },
  { name: "Docker & Containerization", href: "/docker-deployment", blurb: "Hardened, minimal images and reproducible builds for any stack." },
  { name: "Cloud Deployment", href: "/cloud-deployment-services", blurb: "Right-sized AWS, Azure, GCP, or DigitalOcean infrastructure you own." },
  { name: "Kubernetes Deployment", href: "/kubernetes-deployment", blurb: "Production clusters with GitOps and autoscaling — when you actually need them." },
  { name: "CI/CD Pipeline", href: "/ci-cd-pipeline-setup", blurb: "Automated test, build, and deploy with zero-downtime releases and rollback." },
  { name: "Monitoring & Logging", href: "/monitoring-logging-setup", blurb: "Know before your users do: errors, uptime, metrics, and sane alerts." },
  { name: "Backup & Disaster Recovery", href: "/backup-disaster-recovery", blurb: "Automated backups, tested restores, and runbooks for the worst day." },
  { name: "Performance Optimization", href: "/performance-optimization", blurb: "Profile, fix, and prove it: queries, caching, and Core Web Vitals." },
  { name: "Cloud Cost Optimization", href: "/cloud-cost-optimization", blurb: "Most clients save 30–60% — with reliability improved, not traded." },
  { name: "Documentation & Handover", href: "/documentation-handover", blurb: "Runbooks, architecture docs, and due-diligence-ready packages." },
  { name: "Ongoing Production Support", href: "/ongoing-production-support", blurb: "SLA-backed operations at a flat monthly rate. Production, handled." },
];

export const workflow = [
  { step: "1", title: "Free Assessment", body: "Share repository access (NDA available). Within 48 hours you get a Production Readiness Score and prioritized findings — free, no obligation." },
  { step: "2", title: "Fixed-Scope Proposal", body: "A concrete plan with fixed pricing: what we'll fix, build, and verify, in what order, by when. No hourly billing surprises." },
  { step: "3", title: "Harden & Deploy", body: "Security remediation, containerization, infrastructure, and CI/CD — typically 2–6 weeks, with weekly demos so you see progress." },
  { step: "4", title: "Launch & Operate", body: "Monitored go-live with us on standby, then documentation handover and optional SLA-backed ongoing support." },
];

export const beforeAfter: { dimension: string; before: string; after: string }[] = [
  { dimension: "Security", before: "Secrets in code, no authorization checks, unscanned dependencies", after: "Vaulted secrets, enforced access control, CI security scanning" },
  { dimension: "Hosting", before: "Preview URL or workspace host, single environment", after: "Cloud infrastructure you own, staging + production, defined as code" },
  { dimension: "Deployment", before: "Manual, irreversible, one person knows how", after: "Automated pipeline, tested, zero-downtime, one-click rollback" },
  { dimension: "Visibility", before: "Outages discovered by customers", after: "Error tracking, uptime alerts, dashboards — you know first" },
  { dimension: "Data safety", before: "No backups, or backups never tested", after: "Automated backups, scheduled restore tests, recovery runbooks" },
  { dimension: "Operations", before: "Founder answers at 2 a.m., knowledge in chat histories", after: "SLA-backed support, documented runbooks, monthly reports" },
];

/**
 * AI builder tools shown as a hero logo strip. `slug` maps to src/data/brand-icons.ts;
 * tools without path data (e.g. v0) render as a text mark via <BrandLogo />.
 */
export const aiBuilders: { slug: string; name: string }[] = [
  { slug: "cursor", name: "Cursor" },
  { slug: "claude", name: "Claude Code" },
  { slug: "lovable", name: "Lovable" },
  { slug: "replit", name: "Replit" },
  { slug: "bolt", name: "Bolt" },
  { slug: "v0", name: "v0" },
  { slug: "windsurf", name: "Windsurf" },
];

/**
 * Maps a tech-stack item label to a brand-icon slug. Items missing here (EKS, S3,
 * Cloud Run, UptimeRobot, …) render as plain labels — intentional, not a bug.
 */
export const techIconSlug: Record<string, string> = {
  "Next.js": "nextjs",
  React: "react",
  "Node.js": "nodejs",
  Python: "python",
  ".NET": "dotnet",
  Go: "go",
  Vue: "vue",
  SvelteKit: "svelte",
  Docker: "docker",
  Kubernetes: "kubernetes",
  "Google Cloud": "googlecloud",
  DigitalOcean: "digitalocean",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  Redis: "redis",
  Supabase: "supabase",
  MongoDB: "mongodb",
  "GitHub Actions": "githubactions",
  "GitLab CI": "gitlab",
  Terraform: "terraform",
  "Argo CD": "argocd",
  Helm: "helm",
  Sentry: "sentry",
  Grafana: "grafana",
  Prometheus: "prometheus",
  OpenTelemetry: "opentelemetry",
};

export const techStack: { category: string; items: string[] }[] = [
  { category: "Runtimes & Frameworks", items: ["Next.js", "React", "Node.js", "Python", ".NET", "Go", "Vue", "SvelteKit"] },
  { category: "Containers & Orchestration", items: ["Docker", "Kubernetes", "EKS", "AKS", "GKE", "Cloud Run"] },
  { category: "Cloud Platforms", items: ["AWS", "Azure", "Google Cloud", "DigitalOcean"] },
  { category: "Data", items: ["PostgreSQL", "MySQL", "Redis", "Supabase", "MongoDB", "S3"] },
  { category: "Delivery & IaC", items: ["GitHub Actions", "GitLab CI", "Terraform", "Argo CD", "Helm"] },
  { category: "Observability", items: ["Sentry", "Grafana", "Prometheus", "OpenTelemetry", "UptimeRobot"] },
];

export const industries = [
  { name: "SaaS & Startups", body: "From AI-built MVP to a platform investors and enterprise buyers can trust." },
  { name: "E-commerce", body: "Uptime, performance, and payment-flow reliability where downtime is lost revenue." },
  { name: "Fintech", body: "Security hardening, audit trails, and data protection to regulatory expectations." },
  { name: "Healthcare", body: "Privacy-first infrastructure and access controls for sensitive data." },
  { name: "Internal Tools & IT", body: "Turning department-built AI apps into systems IT can safely own and operate." },
  { name: "Agencies & Software Houses", body: "White-label production engineering behind your client deliveries." },
];

export const homeFaq = [
  {
    question: "What does AI Production Partner actually do?",
    answer: "We transform AI-generated applications — built with tools like Cursor, Claude Code, Lovable, Replit, and Bolt — into secure, scalable, production-grade systems. That means security auditing and hardening, containerization, cloud or Kubernetes deployment, CI/CD pipelines, monitoring, backups, documentation, and ongoing SLA-backed support. We are not a software house and we don't build apps from scratch; we make the app you already built ready for real users.",
  },
  {
    question: "Are apps built with AI tools actually production-viable?",
    answer: "Yes. AI tools produce real, working code — the gap is everything around it: security hardening, infrastructure, observability, and recovery. Once that production layer is built (typically 2–6 weeks of work), an AI-built app is as reliable as any conventionally-built one, and you keep your AI-speed development going forward.",
  },
  {
    question: "How much does it cost to make an AI app production-ready?",
    answer: "It depends on the gap, which is why we start with a free assessment: within 48 hours you get a Production Readiness Score and a fixed-price proposal. Typical engagements run 2–6 weeks. Ongoing support is a flat monthly rate. There's no hourly billing and no obligation after the free assessment.",
  },
  {
    question: "What is a Production Readiness Assessment?",
    answer: "A structured review of your application across 40+ checkpoints in security, architecture, infrastructure, delivery, and operations. You receive a scored report with every finding ranked by risk, plus a prioritized remediation roadmap. The initial assessment is free and takes about 48 hours from repository access.",
  },
  {
    question: "Do you replace our developers or our AI tools?",
    answer: "Neither. Your team keeps building product — with whatever AI tools make them fast. We build and operate the production layer: pipelines, infrastructure, security gates, and monitoring that make AI-speed development safe. Everything we build is documented, in your accounts, and yours.",
  },
  {
    question: "What AI builders and stacks do you support?",
    answer: "All the major AI builders: Cursor, Claude Code, Lovable, Replit, Bolt, v0, Windsurf, and Copilot-assisted teams. Stacks: Next.js, React, Node.js, Python, .NET, Go, Vue, SvelteKit and more, deployed to AWS, Azure, Google Cloud, or DigitalOcean.",
  },
  {
    question: "We already launched. Is it too late for production readiness?",
    answer: "It's more urgent, not too late. For live apps we prioritize by exposure: backups and security first, then observability, then delivery pipeline — all without disrupting your running service. Many clients come to us right after their first incident; the goal is to arrive before it.",
  },
  {
    question: "Who owns the infrastructure and code after an engagement?",
    answer: "You do — completely. Everything runs in your cloud accounts, infrastructure is defined in Terraform in your repository, and documentation is part of every delivery. No lock-in is a design principle: we keep clients by being useful, not by being hard to leave.",
  },
];

export const trustSignals = [
  { metric: "40+", label: "checkpoints in every production assessment" },
  { metric: "48h", label: "from repository access to scored findings report" },
  { metric: "30–60%", label: "typical cloud cost reduction after optimization" },
  { metric: "100%", label: "infrastructure ownership stays with you — no lock-in" },
];
