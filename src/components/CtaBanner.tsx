import Link from "next/link";
import { site } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { ui } from "@/dictionaries/ui";

/**
 * Conversion banner reused across pages.
 * Presents the two primary CTAs: free assessment and readiness review.
 */
export default function CtaBanner({
  locale = "en",
  heading,
  body,
}: {
  locale?: Locale;
  heading?: string;
  body?: string;
}) {
  const dict = ui(locale);
  return (
    <section
      aria-labelledby="cta-heading"
      className="border-t border-ink-700/60 bg-gradient-to-b from-ink-900 to-ink-950"
    >
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2
          id="cta-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {heading ?? dict.cta.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
          {body ?? dict.cta.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={localePath(locale, site.primaryCta.href)}
            className="w-full rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-ink-950 transition-colors hover:bg-accent-400 sm:w-auto"
          >
            {dict.cta.primary}
          </Link>
          <Link
            href={localePath(locale, site.secondaryCta.href)}
            className="w-full rounded-md border border-slate-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-accent-400 hover:text-accent-300 sm:w-auto"
          >
            {dict.cta.secondary}
          </Link>
        </div>
        <p className="mt-6 text-sm text-slate-500">{dict.cta.trustLine}</p>
      </div>
    </section>
  );
}
