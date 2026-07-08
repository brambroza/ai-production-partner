/**
 * Global site configuration for AI Production Partner.
 * Single source of truth for branding, URLs, and conversion CTAs —
 * imported by metadata, JSON-LD, sitemap, and UI components.
 */
export const site = {
  name: "AI Production Partner",
  legalName: "AI Production Partner Co., Ltd.",
  url: "https://aiproductionpartner.com",
  tagline: "Turn AI-generated applications into production-ready systems.",
  description:
    "AI Production Partner transforms AI-generated applications from tools like Cursor, Claude Code, Lovable, Replit, and Bolt into secure, scalable, enterprise-grade production systems. Production readiness assessments, security audits, Docker and Kubernetes deployment, CI/CD, monitoring, and ongoing support.",
  email: "aipartnerproduction@gmail.com",
  twitter: "@aiprodpartner",
  linkedin: "https://www.linkedin.com/company/ai-production-partner",
  github: "https://github.com/ai-production-partner",
  logoPath: "/logo.svg",
  ogImagePath: "/og-image.png",
  primaryCta: {
    label: "Book a Free Production Assessment",
    href: "/book-assessment",
  },
  secondaryCta: {
    label: "Request a Production Readiness Review",
    href: "/contact?type=readiness-review",
  },
} as const;

/** Builds an absolute canonical URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
