import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { blogArticles, getArticle } from "@/data/blog";

/** Pre-render every article at build time. */
export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    keywords: article.keywords,
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = blogArticles
    .filter(
      (candidate) =>
        candidate.category === article.category &&
        candidate.slug !== article.slug,
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path: `/blog/${article.slug}`,
          datePublished: article.date,
          keywords: article.keywords,
        })}
      />

      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: article.title, path: `/blog/${article.slug}` },
            ]}
          />

          <header className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
              {article.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {article.description}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              By {site.name} ·{" "}
              <time dateTime={article.date}>{article.date}</time> ·{" "}
              {article.readingMinutes} min read
            </p>
          </header>

          <div className="mt-12 space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 leading-8 text-slate-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <aside className="mt-14 rounded-xl border border-ink-700/60 bg-ink-900 p-6">
            <h2 className="font-semibold text-white">
              Want this handled for you?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              We take AI-built applications to production every week —
              assessment, hardening, deployment, and support. The initial
              production readiness assessment is free.
            </p>
            <Link
              href={site.primaryCta.href}
              className="mt-4 inline-block rounded-md bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400"
            >
              {site.primaryCta.label}
            </Link>
          </aside>

          {related.length > 0 && (
            <nav aria-label="Related articles" className="mt-14">
              <h2 className="text-xl font-bold text-white">Related articles</h2>
              <ul className="mt-4 space-y-3">
                {related.map((relatedArticle) => (
                  <li key={relatedArticle.slug}>
                    <Link
                      href={`/blog/${relatedArticle.slug}`}
                      className="text-accent-300 underline-offset-4 hover:underline"
                    >
                      {relatedArticle.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
