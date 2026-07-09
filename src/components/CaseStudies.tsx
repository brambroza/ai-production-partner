import { publishedCaseStudies } from "@/data/case-studies";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, { eyebrow: string; title: string; lede: string; builtWith: string }> = {
  en: {
    eyebrow: "Proof",
    title: "AI-built apps we took to production",
    lede: "Real engagements, real outcomes — from prototype to a system real customers rely on.",
    builtWith: "Built with",
  },
  th: {
    eyebrow: "ผลงานจริง",
    title: "แอปที่สร้างด้วย AI ที่เราพาขึ้น Production",
    lede: "งานจริง ผลลัพธ์จริง — จาก prototype สู่ระบบที่ลูกค้าใช้งานได้อย่างมั่นใจ",
    builtWith: "สร้างด้วย",
  },
};

/**
 * Social-proof section. Renders only when there is at least one published case
 * study (see src/data/case-studies.ts), so the homepage never shows an empty
 * or fabricated proof block.
 */
export default function CaseStudies({ locale = "en" }: { locale?: Locale }) {
  const studies = publishedCaseStudies(locale);
  if (studies.length === 0) return null;

  const t = copy[locale];

  return (
    <section
      aria-labelledby="case-studies-heading"
      className="border-y border-ink-700/60 bg-ink-900/50 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
            {t.eyebrow}
          </p>
          <h2
            id="case-studies-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {t.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">{t.lede}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
          {studies.map((study) => (
            <article
              key={study.slug}
              className="flex flex-col rounded-xl border border-ink-700/60 bg-ink-950 p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-white">{study.client}</h3>
                <span className="rounded-md border border-ink-600 px-2 py-0.5 text-xs text-slate-400">
                  {study.industry}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {t.builtWith} {study.builtWith}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-400">{study.challenge}</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">{study.outcome}</p>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-ink-700/60 pt-5">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd className="text-xl font-bold text-accent-300">{metric.value}</dd>
                    <p className="mt-1 text-xs leading-4 text-slate-500">{metric.label}</p>
                  </div>
                ))}
              </dl>

              {study.quote && (
                <blockquote className="mt-5 border-t border-ink-700/60 pt-5">
                  <p className="text-sm italic leading-6 text-slate-300">
                    “{study.quote.text}”
                  </p>
                  <footer className="mt-2 text-xs text-slate-500">
                    {study.quote.author} · {study.quote.role}
                  </footer>
                </blockquote>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
