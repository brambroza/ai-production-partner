import { site, absoluteUrl } from "@/lib/site";

/** Schema.org Organization node shared across all pages. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl(site.logoPath),
    description: site.description,
    email: site.email,
    sameAs: [site.linkedin, site.github],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English", "Thai"],
    },
    knowsAbout: [
      "AI application deployment",
      "Production readiness",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "Cloud security",
      "DevOps",
      "AI-generated code",
    ],
  };
}

/** Schema.org WebSite node with SearchAction for sitelinks search. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/resources?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Schema.org ProfessionalService node describing the core offering. */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: site.name,
    url: site.url,
    description: site.tagline,
    parentOrganization: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    serviceType: [
      "AI App Production Readiness Assessment",
      "Architecture Review",
      "Security Audit",
      "Docker & Containerization",
      "Cloud Deployment",
      "Kubernetes Deployment",
      "CI/CD Pipeline",
      "Monitoring & Logging",
      "Backup & Disaster Recovery",
      "Performance Optimization",
      "Cloud Cost Optimization",
      "Ongoing Production Support",
    ],
  };
}

/** Schema.org Service node for an individual solution/landing page. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
  };
}

/** Schema.org FAQPage node from question/answer pairs. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Schema.org BreadcrumbList node from ordered name/path pairs. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Schema.org TechArticle node for blog articles. */
export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: "en",
    keywords: input.keywords.join(", "),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

/** Schema.org HowTo node for checklist pages. */
export function howToSchema(input: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
