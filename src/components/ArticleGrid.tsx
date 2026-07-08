import Link from "next/link";
import { categorySlug, type BlogArticle } from "@/data/blog";

/** Card grid of blog articles, shared by the index and category pages. */
export default function ArticleGrid({ articles }: { articles: BlogArticle[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article
          key={article.slug}
          className="flex flex-col rounded-xl border border-ink-700/60 bg-ink-900 p-6"
        >
          <p className="text-sm text-accent-400">
            <Link
              href={`/blog/category/${categorySlug(article.category)}`}
              className="hover:underline"
            >
              {article.category}
            </Link>
          </p>
          <h2 className="mt-2 font-semibold text-white">
            <Link
              href={`/blog/${article.slug}`}
              className="hover:text-accent-300"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
            {article.description}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            <time dateTime={article.date}>{article.date}</time> ·{" "}
            {article.readingMinutes} min read
          </p>
        </article>
      ))}
    </div>
  );
}
