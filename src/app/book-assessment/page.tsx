import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/FaqList";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Free Production Assessment — 48-Hour Scored Report",
  description:
    "Book your free AI app production assessment: a 40+ checkpoint review of security, architecture, infrastructure, and operations, with a scored findings report within 48 hours. No obligation.",
  path: "/book-assessment",
  keywords: [
    "free production assessment",
    "book production readiness review",
    "ai app audit free",
  ],
});

const steps = [
  {
    title: "1. Send the form",
    body: "Tell us what you built and what's worrying you. We reply within one business day with an access checklist — and an NDA first if you want one.",
  },
  {
    title: "2. Share access",
    body: "Read access to your repository (GitHub, GitLab, or ZIP) plus a description of current hosting. Thirty minutes with whoever knows the app best helps but isn't required.",
  },
  {
    title: "3. Get the report in 48 hours",
    body: "A Production Readiness Score across 40+ checkpoints, every finding ranked by risk, and a fixed-price remediation proposal. The report is yours either way.",
  },
];

const assessmentFaq = [
  {
    question: "Is it really free, and what's the catch?",
    answer:
      "Really free, and the catch is transparent: some teams who see their findings report hire us to fix them. Many don't — they fix the quick wins in-house — and that's fine. The report is yours regardless, with no follow-up pressure.",
  },
  {
    question: "How long does it take?",
    answer:
      "About 48 hours from repository access to scored report. Booking to access typically takes a day or two depending on your NDA and access process.",
  },
  {
    question: "Is our code safe with you?",
    answer:
      "We sign your NDA (or provide ours) before any access, work from read-only access, and delete local copies after the engagement. We assess AI-built apps for a living — confidentiality handling is table stakes.",
  },
  {
    question: "What if our app is already live?",
    answer:
      "Even more useful — the assessment prioritizes by live exposure: backups and security first, then observability, then delivery. Live apps get the same 48-hour turnaround.",
  },
];

export default function BookAssessmentPage() {
  return (
    <>
      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Book a Free Assessment", path: "/book-assessment" },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Book a Free Production Assessment
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Find out exactly how far your AI-built app is from production —
              scored across 40+ checkpoints, prioritized by risk, delivered
              within 48 hours. Free, NDA available, no obligation.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="How the assessment works" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.title}
                className="rounded-xl border border-ink-700/60 bg-ink-900 p-6"
              >
                <h2 className="font-semibold text-white">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-ink-700/60 bg-ink-900 p-8">
            <h2 className="text-2xl font-bold text-white">Start here</h2>
            {site.bookingUrl && (
              <div className="mt-6 rounded-lg border border-accent-500/40 bg-ink-950 p-5">
                <p className="text-sm text-slate-300">
                  Prefer to talk it through? Grab a 20-minute slot and we'll walk
                  your app's production gaps together — no prep needed.
                </p>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400"
                >
                  Book a 20-min call →
                </a>
                <p className="mt-4 text-xs text-slate-500">
                  Or send the form below and we'll reply within one business day.
                </p>
              </div>
            )}
            <div className="mt-6">
              <ContactForm defaultType="free-assessment" />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Assessment FAQ"
        className="border-t border-ink-700/60 py-16"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FaqList items={assessmentFaq} />
          </div>
        </div>
      </section>
    </>
  );
}
