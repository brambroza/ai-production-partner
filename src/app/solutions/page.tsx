import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import { pageMetadata } from "@/lib/metadata";
import { landingPages } from "@/data/landing-pages";

export const metadata: Metadata = pageMetadata({
  title: "Solutions — Deploy Any AI-Built App to Production",
  description:
    "All AI Production Partner solutions: deployment for Cursor, Claude Code, Lovable, Replit and Bolt apps; every major stack and cloud; plus security, CI/CD, monitoring, and support services.",
  path: "/solutions",
  keywords: [
    "ai app deployment solutions",
    "deploy ai generated apps",
    "production services",
  ],
});

const categoryMeta: { key: "platform" | "stack" | "cloud" | "service"; title: string; blurb: string }[] = [
  {
    key: "platform",
    title: "By AI Builder",
    blurb: "Production deployment specialized for each AI development tool.",
  },
  {
    key: "stack",
    title: "By Framework & Runtime",
    blurb: "Stack-specific hardening, containerization, and hosting.",
  },
  {
    key: "cloud",
    title: "By Cloud Provider",
    blurb: "Right-sized, secure infrastructure on the cloud you choose.",
  },
  {
    key: "service",
    title: "Production Services",
    blurb: "The individual disciplines — from assessment to ongoing support.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Solutions", path: "/solutions" },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Whatever you built it with, wherever it needs to run — we take it
            to production. {landingPages.length} specialized solutions, one
            framework.
          </p>
        </div>
      </section>

      {categoryMeta.map((category) => {
        const pages = landingPages.filter(
          (page) => page.category === category.key,
        );
        return (
          <section
            key={category.key}
            aria-labelledby={`category-${category.key}`}
            className="border-b border-ink-700/60 py-16"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2
                id={`category-${category.key}`}
                className="text-2xl font-bold tracking-tight text-white"
              >
                {category.title}
              </h2>
              <p className="mt-2 text-slate-400">{category.blurb}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className="group rounded-xl border border-ink-700/60 bg-ink-900 p-5 transition-colors hover:border-accent-600"
                  >
                    <h3 className="font-semibold text-white group-hover:text-accent-300">
                      {page.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-400">
                      {page.heroSubtitle}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBanner />
    </>
  );
}
