import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Talk to a Production Engineer",
  description:
    "Contact AI Production Partner: free production assessments, readiness reviews, security audits, and deployment inquiries. Straight technical answers within one business day.",
  path: "/contact",
  keywords: ["contact ai production partner", "production assessment inquiry"],
});

type Props = { searchParams: Promise<{ type?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { type } = await searchParams;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <div className="mt-10 grid gap-14 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Contact
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Tell us what you built and where it needs to run. A production
              engineer — not a salesperson — reads every inquiry and replies
              within one business day.
            </p>
            <dl className="mt-10 space-y-6 text-slate-300">
              <div>
                <dt className="text-sm font-semibold text-slate-400">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent-300 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-400">
                  What happens next
                </dt>
                <dd className="mt-1 leading-7">
                  We reply with either a straight answer or a short list of
                  questions. If you want the free assessment, we&apos;ll send
                  the access checklist (NDA first if you prefer) — and you get
                  your scored findings report within 48 hours of repository
                  access.
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-xl border border-ink-700/60 bg-ink-900 p-8">
            <ContactForm defaultType={type} />
          </div>
        </div>
      </div>
    </section>
  );
}
