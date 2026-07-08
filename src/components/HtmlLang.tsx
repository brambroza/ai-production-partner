"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeOfPath } from "@/lib/i18n";

/**
 * Keeps <html lang> in sync with the active locale. The root layout can't
 * know the pathname at render time, so the attribute is stamped client-side
 * on navigation; hreflang/og:locale carry the signal for crawlers.
 */
export default function HtmlLang() {
  const pathname = usePathname() ?? "/";
  useEffect(() => {
    document.documentElement.lang = localeOfPath(pathname);
  }, [pathname]);
  return null;
}
