import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getLandingPage, landingPages } from "@/data/landing-pages";

/** Pre-render every landing page at build time. */
export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const related = page.related
    .map((relatedSlug) => getLandingPage(relatedSlug))
    .filter((relatedPage) => relatedPage !== undefined);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: page.name,
          description: page.metaDescription,
          path: `/${page.slug}`,
        })}
      />

      {/* Hero */}
      <section
        aria-labelledby="landing-hero"
        className="relative overflow-hidden border-b border-mint-200"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(134,214,170,0.25),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Solutions", path: "/solutions" },
              { name: page.name, path: `/${page.slug}` },
            ]}
          />
          <div className="mx-auto mt-10 max-w-4xl text-center">
            <h1
              id="landing-hero"
              className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            >
              {page.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {page.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={site.primaryCta.href}
                className="w-full rounded-md bg-accent-500 px-8 py-4 text-base font-semibold text-accent-950 transition-colors hover:bg-accent-300 sm:w-auto"
              >
                {site.primaryCta.label}
              </Link>
              <Link
                href="/tools/production-score"
                className="w-full rounded-md border border-mint-300 px-8 py-4 text-base font-semibold text-slate-900 transition-colors hover:border-accent-400 hover:text-accent-700 sm:w-auto"
              >
                Get Your Free Production Score
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section aria-label="Common problems" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900">
            The problems we solve
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
            {page.painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-mint-200 bg-mint-50 p-6"
              >
                <h3 className="font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / deliverables */}
      <section
        aria-label="What's included"
        className="border-y border-mint-200 bg-mint-50/70 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900">
            What&apos;s included
          </h2>
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-mint-200 bg-white p-6"
              >
                <h3 className="font-semibold text-accent-700">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-label="How it works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900">
            How it works
          </h2>
          <ol className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((step) => (
              <li
                key={step.title}
                className="rounded-xl border border-mint-200 bg-mint-50 p-6"
              >
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-label="Frequently asked questions"
        className="border-t border-mint-200 py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-12">
            <FaqList items={page.faq} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section aria-label="Related services" className="pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
              Related services
            </h2>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
              {related.map((relatedPage) => (
                <Link
                  key={relatedPage.slug}
                  href={`/${relatedPage.slug}`}
                  className="rounded-xl border border-mint-200 bg-mint-50 p-5 text-center font-semibold text-slate-900 transition-colors hover:border-accent-400 hover:text-accent-700"
                >
                  {relatedPage.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
