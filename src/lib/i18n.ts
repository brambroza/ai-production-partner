/**
 * Locale utilities. English lives at the root URL space (canonical for
 * existing SEO); Thai mirrors it under /th. Both trees are fully static.
 */
export type Locale = "en" | "th";

export const locales: Locale[] = ["en", "th"];
export const defaultLocale: Locale = "en";

/** Builds the site-relative path for a locale ("/x" ↔ "/th/x"). */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  return clean === "/" ? "/th" : `/th${clean}`;
}

/** Strips the /th prefix, returning the locale-neutral path. */
export function neutralPath(pathname: string): string {
  if (pathname === "/th") return "/";
  return pathname.startsWith("/th/") ? pathname.slice(3) : pathname;
}

/** Detects the locale of a pathname. */
export function localeOfPath(pathname: string): Locale {
  return pathname === "/th" || pathname.startsWith("/th/") ? "th" : "en";
}

/** hreflang alternates map for Next metadata (per neutral path). */
export function languageAlternates(path: string): Record<string, string> {
  return {
    en: localePath("en", path),
    th: localePath("th", path),
    "x-default": localePath("en", path),
  };
}

/** OG locale code per locale. */
export function ogLocale(locale: Locale): string {
  return locale === "th" ? "th_TH" : "en_US";
}
