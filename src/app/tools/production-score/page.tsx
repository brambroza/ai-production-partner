import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import FaqList from "@/components/FaqList";
import ProductionScoreTool from "@/components/ProductionScoreTool";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Free AI Production Score — Test Your App's Production Readiness",
  description:
    "Free tool: upload a ZIP or enter a GitHub repository and get an instant Production Readiness Score. Checks secrets exposure, CI/CD, tests, Docker, IaC, monitoring, and docs — analysis runs in your browser.",
  path: "/tools/production-score",
  keywords: [
    "production readiness score",
    "free production readiness tool",
    "ai app checker",
    "repository analysis tool",
    "is my app production ready",
  ],
});

const toolFaq = [
  {
    question: "Is my code uploaded anywhere?",
    answer:
      "No. ZIP analysis runs entirely in your browser using client-side JavaScript — the archive never leaves your machine, and we never see your code or the results. GitHub mode reads the public file listing via GitHub's own API. There is no server-side storage of anything.",
  },
  {
    question: "How is the score calculated?",
    answer:
      "The tool checks static signals across five categories: security (committed .env files, hardcoded secret patterns, .gitignore), delivery (lockfile, CI configuration, automated tests), infrastructure (Dockerfile, orchestration config, infrastructure-as-code, migrations), observability (error tracking), and documentation (README, runbooks). Each check is weighted by production impact; the score is the weighted percentage passed.",
  },
  {
    question: "Is this the same as the full Production Readiness Assessment?",
    answer:
      "No — this is the static-signal preview. The full assessment is performed by engineers who read your actual code and architecture across 40+ checkpoints, including things no file-listing scan can see: authorization logic, query patterns, infrastructure configuration, and recovery capability. The full assessment is also free and takes about 48 hours.",
  },
  {
    question: "My score is low. How bad is that?",
    answer:
      "Typical, honestly — most AI-built apps score in the C–D range because AI tools generate features, not operations. Every failed check comes with concrete advice, and the failed items are effectively your prioritized to-do list. Fix the security items first.",
  },
  {
    question: "Can I score a private repository?",
    answer:
      "Yes — use the ZIP option. Export or download your repository as a ZIP and analyze it locally in your browser. Since nothing is uploaded, private code stays private.",
  },
];

export default function ProductionScorePage() {
  return (
    <>
      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: "Free AI Production Score", path: "/tools/production-score" },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Free AI Production Score
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              How production-ready is your AI-built app? Point this tool at a
              GitHub repository or upload a ZIP and get an instant score across
              security, delivery, infrastructure, observability, and
              documentation — with concrete advice for every gap. Analysis
              runs in your browser; your code goes nowhere.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Production score tool" className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <ProductionScoreTool />
        </div>
      </section>

      <section aria-label="Tool FAQ" className="border-t border-ink-700/60 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FaqList items={toolFaq} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
