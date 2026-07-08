import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleGrid from "@/components/ArticleGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryNav from "@/components/CategoryNav";
import CtaBanner from "@/components/CtaBanner";
import { pageMetadata } from "@/lib/metadata";
import {
  blogArticles,
  blogCategories,
  categoryFromSlug,
  categorySlug,
} from "@/data/blog";

/** Pre-render one page per blog category. */
export function generateStaticParams() {
  return blogCategories.map((category) => ({
    category: categorySlug(category),
  }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) return {};
  return pageMetadata({
    title: `${name} — Blog`,
    description: `All ${name.toLowerCase()} articles: technical guides on taking AI-built applications to production.`,
    path: `/blog/category/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) notFound();

  const articles = blogArticles.filter(
    (article) => article.category === name,
  );

  return (
    <>
      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name, path: `/blog/category/${category}` },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {articles.length} article{articles.length === 1 ? "" : "s"} in this
            category.
          </p>
          <div className="mt-8">
            <CategoryNav active={name} />
          </div>
        </div>
      </section>

      <section aria-label="Articles" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ArticleGrid articles={articles} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
