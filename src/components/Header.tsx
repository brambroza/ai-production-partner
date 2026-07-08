"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { localeOfPath, localePath, neutralPath } from "@/lib/i18n";
import { ui } from "@/dictionaries/ui";

/** Sticky site header with primary navigation, language switcher, and CTA. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const locale = localeOfPath(pathname);
  const dict = ui(locale);

  const navLinks = [
    { label: dict.nav.services, href: localePath(locale, "/#services") },
    { label: dict.nav.solutions, href: localePath(locale, "/solutions") },
    { label: dict.nav.framework, href: localePath(locale, "/#framework") },
    { label: dict.nav.checklist, href: localePath(locale, "/production-readiness-checklist") },
    { label: dict.nav.scoreTool, href: localePath(locale, "/tools/production-score") },
    { label: dict.nav.resources, href: localePath(locale, "/resources") },
    { label: dict.nav.blog, href: localePath(locale, "/blog") },
    { label: dict.nav.pricing, href: localePath(locale, "/pricing") },
  ];

  const languageSwitch = (
    <div className="inline-flex rounded-md border border-ink-600 bg-ink-900 p-0.5 text-xs font-semibold text-slate-300">
      <Link
        href={localePath("en", neutralPath(pathname))}
        aria-label="Switch to English"
        className={`rounded px-2.5 py-1.5 transition-colors ${
          locale === "en"
            ? "bg-accent-500 text-ink-950"
            : "hover:text-accent-300"
        }`}
      >
        EN
      </Link>
      <Link
        href={localePath("th", neutralPath(pathname))}
        aria-label="เปลี่ยนเป็นภาษาไทย"
        className={`rounded px-2.5 py-1.5 transition-colors ${
          locale === "th"
            ? "bg-accent-500 text-ink-950"
            : "hover:text-accent-300"
        }`}
      >
        TH
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={localePath(locale, "/")}
          className="flex items-center gap-2 font-semibold tracking-tight text-white"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-500 font-mono text-sm font-bold text-ink-950"
          >
            AP
          </span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="sm:hidden">AI Production Partner</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-5 text-sm text-slate-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {languageSwitch}
          <Link
            href={localePath(locale, site.primaryCta.href)}
            className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400"
          >
            {dict.nav.bookShort}
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          {languageSwitch}
          <button
            type="button"
            className="rounded-md p-2 text-slate-300 hover:text-white"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={dict.nav.toggleMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-ink-700/60 bg-ink-900 xl:hidden"
        >
          <ul className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-slate-200 hover:bg-ink-800"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={localePath(locale, site.primaryCta.href)}
                className="mt-2 block rounded-md bg-accent-500 px-3 py-2 text-center font-semibold text-ink-950"
                onClick={() => setOpen(false)}
              >
                {dict.cta.primary}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
