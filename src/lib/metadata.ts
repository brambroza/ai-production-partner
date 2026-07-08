import type { Metadata } from "next";
import { site, absoluteUrl } from "@/lib/site";
import {
  languageAlternates,
  localePath,
  ogLocale,
  type Locale,
} from "@/lib/i18n";

/**
 * Builds consistent per-page metadata: title, description, canonical URL,
 * hreflang alternates, Open Graph, and Twitter cards. Every page routes
 * through this helper so SEO fields never drift.
 *
 * `path` is always the locale-neutral path ("/x"); pass `locale` for the
 * Thai tree and the canonical/alternates resolve automatically.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const locale = input.locale ?? "en";
  const url = absoluteUrl(localePath(locale, input.path));
  const alternates = languageAlternates(input.path);
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        Object.entries(alternates).map(([lang, path]) => [
          lang,
          absoluteUrl(path),
        ]),
      ),
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      type: input.type ?? "website",
      locale: ogLocale(locale),
      images: [
        {
          url: absoluteUrl(site.ogImagePath),
          width: 1200,
          height: 630,
          alt: site.tagline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitter,
      title: input.title,
      description: input.description,
      images: [absoluteUrl(site.ogImagePath)],
    },
  };
}
