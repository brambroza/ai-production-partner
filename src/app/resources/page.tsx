import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import ResourceSearch, { type ResourceEntry } from "@/components/ResourceSearch";
import { pageMetadata } from "@/lib/metadata";
import { blogArticles } from "@/data/blog";
import { landingPages } from "@/data/landing-pages";

export const metadata: Metadata = pageMetadata({
  title: "Resource Center — Guides, Checklists & Tools for AI App Production",
  description:
    "Searchable library of production engineering resources: 100+ technical guides, free checklists, the AI Production Score tool, and every deployment solution in one place.",
  path: "/resources",
  keywords: [
    "ai production resources",
    "deployment guides",
    "production checklist",
    "devops resource center",
  ],
});

/** Static resource index built at render time from all site content. */
function buildResourceIndex(): ResourceEntry[] {
  const tools: ResourceEntry[] = [
    {
      title: "Free AI Production Score",
      description:
        "Upload a ZIP or point us at a GitHub repository and get an instant Production Readiness Score across security, delivery, and operations signals.",
      href: "/tools/production-score",
      type: "Tool",
      keywords: ["score", "assessment", "free tool", "github", "zip", "readiness"],
    },
    {
      title: "Production Readiness Checklist",
      description:
        "The complete 30+ item checklist across security, infrastructure, delivery, observability, and resilience — free to use.",
      href: "/production-readiness-checklist",
      type: "Checklist",
      keywords: ["checklist", "production readiness", "go live", "launch"],
    },
    {
      title: "AI App Security Checklist",
      description:
        "Security checklist built for AI-generated apps: secrets, auth, input handling, dependencies, abuse protection, and LLM risks.",
      href: "/ai-app-security-checklist",
      type: "Checklist",
      keywords: ["security checklist", "ai security", "owasp", "llm security"],
    },
  ];

  const solutions: ResourceEntry[] = landingPages.map((page) => ({
    title: page.name,
    description: page.metaDescription,
    href: `/${page.slug}`,
    type: "Solution",
    keywords: page.keywords.slice(),
  }));

  const articles: ResourceEntry[] = blogArticles.map((article) => ({
    title: article.title,
    description: article.description,
    href: `/blog/${article.slug}`,
    type: "Article",
    keywords: [...article.keywords, article.category],
  }));

  return [...tools, ...solutions, ...articles];
}

export default function ResourcesPage() {
  const resources = buildResourceIndex();

  return (
    <>
      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Resource Center
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Everything we know about taking AI-built apps to production —
            {" "}{resources.length} guides, checklists, solutions, and free
            tools, all searchable.
          </p>
        </div>
      </section>

      <section aria-label="Resource search" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ResourceSearch resources={resources} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
