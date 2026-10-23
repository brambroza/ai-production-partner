import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import HomeMotion from "@/components/HomeMotion";
import JsonLd from "@/components/JsonLd";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getService, services } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

async function currentLocale(): Promise<Locale> {
  return (await headers()).get("x-locale") === "th" ? "th" : "en";
}

const labels: Record<
  Locale,
  {
    home: string;
    services: string;
    problems: string;
    includes: string;
    steps: string;
    pricing: string;
    faq: string;
    other: string;
    deepDive: string;
    call: string;
    ctaTitle: string;
  }
> = {
  en: {
    home: "Home",
    services: "Services",
    problems: "Sound familiar?",
    includes: "What's included",
    steps: "How it works",
    pricing: "Pricing",
    faq: "Questions",
    other: "Other services",
    deepDive: "Technical deep dives",
    call: "Call",
    ctaTitle: "Tell us about your system",
  },
  th: {
    home: "หน้าแรก",
    services: "บริการ",
    problems: "คุ้นกับปัญหานี้ไหม?",
    includes: "สิ่งที่ได้รับ",
    steps: "ขั้นตอน",
    pricing: "ราคา",
    faq: "คำถามที่พบบ่อย",
    other: "บริการอื่น",
    deepDive: "อ่านรายละเอียดเชิงเทคนิค (ภาษาอังกฤษ)",
    call: "โทร",
    ctaTitle: "เล่าให้เราฟังเรื่องระบบของคุณ",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const locale = await currentLocale();
  const copy = service.copy[locale];
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: `/services/${service.slug}`,
    locale,
    keywords: copy.keywords,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const locale = await currentLocale();
  const copy = service.copy[locale];
  const l = labels[locale];
  const path = (href: string) => localePath(locale, href);
  const contactHref = path(`/contact?type=${service.contactType}`);
  const others = services.filter((other) => other.slug !== service.slug);

  return (
    <HomeMotion>
      <JsonLd
        data={serviceSchema({
          name: copy.label,
          description: copy.metaDescription,
          path: path(`/services/${service.slug}`),
        })}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mint-50 via-white to-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            data-blob
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-200/60 blur-3xl sm:h-96 sm:w-96"
          />
          <div
            data-blob
            className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-mint-300/50 blur-3xl"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20">
          <Breadcrumbs
            crumbs={[
              { name: l.home, path: path("/") },
              { name: l.services, path: path("/#services") },
              { name: copy.name, path: path(`/services/${service.slug}`) },
            ]}
          />
          <div className="mt-12 text-center">
            <p
              data-hero
              className="inline-flex rounded-full border border-mint-300 bg-white/80 px-4 py-1.5 text-sm font-semibold text-accent-700"
            >
              {copy.label}
            </p>
            <h1
              data-hero
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-tight"
            >
              {copy.title}
            </h1>
            <p data-hero className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {copy.sub}
            </p>
            <div
              data-hero
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href={contactHref}
                className="w-full rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-accent-950 shadow-[0_8px_24px_-10px_rgba(35,137,90,0.6)] transition hover:-translate-y-0.5 hover:bg-accent-400 sm:w-auto"
              >
                {copy.cta}
              </Link>
              <a
                href={site.phoneHref}
                className="w-full rounded-full border border-mint-300 bg-white px-8 py-3.5 font-semibold text-slate-800 transition hover:border-accent-400 sm:w-auto"
              >
                {l.call} {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="bg-mint-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {l.problems}
          </h2>
          <ul data-stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.problems.map((problem) => (
              <li key={problem.title} className="rounded-2xl border border-mint-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">{problem.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{problem.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Includes */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {l.includes}
          </h2>
          <ul data-stagger className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {copy.includes.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700"
                >
                  ✓
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps + pricing */}
      <section className="bg-mint-50/70 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 data-reveal className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {l.steps}
            </h2>
            <ol data-stagger className="mt-8 space-y-5">
              {copy.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 font-mono font-bold text-accent-950">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-slate-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div
            data-reveal
            className="self-start rounded-3xl border border-mint-200 bg-white p-7 shadow-[0_12px_32px_-18px_rgba(27,110,72,0.25)]"
          >
            <p className="text-sm font-semibold text-accent-700">{l.pricing}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{copy.pricing.model}</p>
            <p className="mt-3 leading-7 text-slate-600">{copy.pricing.note}</p>
            <Link
              href={contactHref}
              className="mt-6 block rounded-full bg-accent-500 px-6 py-3 text-center font-semibold text-accent-950 transition hover:bg-accent-400"
            >
              {copy.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 data-reveal className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {l.faq}
          </h2>
          <div data-reveal className="mt-10">
            <FaqList items={copy.faq} />
          </div>
          <div data-reveal className="mt-10 text-center text-sm text-slate-500">
            <p>{l.deepDive}</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {service.related.map((link) => (
                <li key={link.href}>
                  <Link href={path(link.href)} className="font-medium text-accent-700 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-mint-200 bg-mint-50/70 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-center text-xl font-bold text-slate-900">
            {l.other}
          </h2>
          <ul data-stagger className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((other) => {
              const otherCopy = other.copy[locale];
              return (
                <li key={other.slug}>
                  <Link
                    href={path(`/services/${other.slug}`)}
                    className="block h-full rounded-2xl border border-mint-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-accent-300"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {otherCopy.label}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{otherCopy.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{otherCopy.hook}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6">
        <div
          data-reveal
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-accent-100 via-mint-100 to-white px-6 py-12 text-center ring-1 ring-mint-300"
        >
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{l.ctaTitle}</h2>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={contactHref}
              className="w-full rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-accent-950 transition hover:bg-accent-400 sm:w-auto"
            >
              {copy.cta}
            </Link>
            <a
              href={site.phoneHref}
              className="w-full rounded-full border border-mint-300 bg-white px-8 py-3.5 font-semibold text-slate-800 transition hover:border-accent-400 sm:w-auto"
            >
              {l.call} {site.phone}
            </a>
          </div>
          <p className="mt-5 text-sm">
            <a href={`mailto:${site.email}`} className="font-medium text-accent-700 hover:underline">
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </HomeMotion>
  );
}
