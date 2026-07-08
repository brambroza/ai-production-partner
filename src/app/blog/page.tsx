import type { Metadata } from "next";
import ArticleGrid from "@/components/ArticleGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryNav from "@/components/CategoryNav";
import CtaBanner from "@/components/CtaBanner";
import { pageMetadata } from "@/lib/metadata";
import { blogArticles } from "@/data/blog";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Production Engineering for AI-Built Apps",
  description:
    "Technical guides on deploying, securing, scaling, and operating AI-generated applications: Cursor, Claude Code, Lovable, Replit, Bolt, and every major stack.",
  path: "/blog",
  keywords: [
    "ai app deployment blog",
    "production engineering guides",
    "ai code security articles",
  ],
});

export default function BlogIndexPage() {
  return (
    <>
      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {blogArticles.length} technical guides on taking AI-built
            applications to production — deployment, security, performance,
            and operations.
          </p>
          <div className="mt-8">
            <CategoryNav />
          </div>
        </div>
      </section>

      <section aria-label="Articles" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ArticleGrid articles={blogArticles} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
