import type { Locale } from "@/lib/i18n";

/**
 * Case studies / social proof — data-driven like landing-pages and blog.
 *
 * IMPORTANT (honesty + trust): only entries with `published: true` render on
 * the site. The seed entries below are realistic TEMPLATES with published:false
 * so nothing fabricated ever ships. After each real engagement, replace one
 * template with the client's actual (anonymized if needed) results and flip
 * `published: true`. Never publish an invented quote or metric — a single fake
 * testimonial is the fastest way to lose a technical buyer's trust.
 */
export type CaseStudyMetric = {
  /** The headline figure, e.g. "48h", "0 → 99.9%", "-62%". */
  value: string;
  /** What the figure measures. */
  label: string;
};

export type CaseStudyQuote = {
  text: string;
  author: string;
  role: string;
};

export type CaseStudyCopy = {
  /** Client name, or an anonymized descriptor like "Seed-stage fintech". */
  client: string;
  industry: string;
  /** What the app was built with, e.g. "Lovable + Supabase". */
  builtWith: string;
  /** The production problem they arrived with. */
  challenge: string;
  /** What the engagement delivered. */
  outcome: string;
  metrics: CaseStudyMetric[];
  quote?: CaseStudyQuote;
};

export type CaseStudy = {
  slug: string;
  published: boolean;
  en: CaseStudyCopy;
  /** Thai copy; falls back to English when omitted. */
  th?: CaseStudyCopy;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "saas-mvp-to-launch",
    published: false, // ← flip to true and replace with real numbers after the engagement
    en: {
      client: "Seed-stage SaaS",
      industry: "B2B SaaS",
      builtWith: "Lovable + Supabase",
      challenge:
        "A founder-built MVP demoed well but had hardcoded API keys, no authorization on internal endpoints, and lived on a preview URL with no backups — blocking a paid pilot with an enterprise customer.",
      outcome:
        "Secrets vaulted, access control enforced on every endpoint, containerized and deployed to the client's own cloud with staging, CI/CD, automated backups, and error alerting — in time for the pilot.",
      metrics: [
        { value: "9 days", label: "assessment to production launch" },
        { value: "14", label: "critical security findings fixed" },
        { value: "99.9%", label: "uptime since go-live" },
      ],
    },
  },
  {
    slug: "fintech-security-hardening",
    published: false,
    en: {
      client: "Seed-stage fintech",
      industry: "Fintech",
      builtWith: "Cursor + Next.js + Postgres",
      challenge:
        "An AI-assisted build needed a security posture that would survive due diligence before a funding round — audit trails, data protection, and dependency hygiene were all missing.",
      outcome:
        "OWASP Top 10 + LLM Top 10 audit with verified fixes, audit logging, dependency scanning in CI, and a documentation package their investors' technical reviewer signed off on.",
      metrics: [
        { value: "0", label: "high-severity issues at re-audit" },
        { value: "100%", label: "endpoints with authz coverage" },
        { value: "Passed", label: "investor technical due diligence" },
      ],
    },
  },
  {
    slug: "ecommerce-cost-and-reliability",
    published: false,
    en: {
      client: "Growing e-commerce brand",
      industry: "E-commerce",
      builtWith: "Bolt + Node.js",
      challenge:
        "A live store was going down under traffic spikes and running an oversized, hand-configured cloud bill with no monitoring — outages were discovered by customers.",
      outcome:
        "Right-sized infrastructure as code, autoscaling, caching, uptime and error monitoring with human-routed alerts, and a tested backup/restore procedure.",
      metrics: [
        { value: "-62%", label: "monthly cloud cost" },
        { value: "0", label: "customer-reported outages after" },
        { value: "<2 min", label: "alert-to-awareness on incidents" },
      ],
    },
  },
];

/** Published case studies for a locale, English copy as fallback. */
export function publishedCaseStudies(
  locale: Locale,
): (CaseStudyCopy & { slug: string })[] {
  return caseStudies
    .filter((study) => study.published)
    .map((study) => ({
      slug: study.slug,
      ...(locale === "th" && study.th ? study.th : study.en),
    }));
}
