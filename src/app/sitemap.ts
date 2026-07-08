import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { landingPages } from "@/data/landing-pages";
import { blogArticles, blogCategories, categorySlug } from "@/data/blog";

/** XML sitemap covering every static and generated page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/solutions"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/book-assessment"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/tools/production-score"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/production-readiness-checklist"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/ai-app-security-checklist"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/resources"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: absoluteUrl("/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const solutionPages: MetadataRoute.Sitemap = landingPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = blogCategories.map(
    (category) => ({
      url: absoluteUrl(`/blog/category/${categorySlug(category)}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    }),
  );

  return [...staticPages, ...solutionPages, ...categoryPages, ...articlePages];
}
