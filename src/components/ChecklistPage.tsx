import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { howToSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import type { ChecklistGroup } from "@/data/checklists";
import type { FaqItem } from "@/data/landing-pages";

/**
 * Shared renderer for the free checklist pages. Groups render as sections
 * with critical items flagged; HowTo JSON-LD mirrors the group structure
 * for AI-search extraction.
 */
export default function ChecklistPage({
  path,
  title,
  intro,
  groups,
  faq,
  serviceHref,
  serviceLabel,
}: {
  path: string;
  title: string;
  intro: string;
  groups: ChecklistGroup[];
  faq: FaqItem[];
  serviceHref: string;
  serviceLabel: string;
}) {
  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
  const criticalCount = groups
    .flatMap((group) => group.items)
    .filter((item) => item.critical).length;

  return (
    <>
      <JsonLd
        data={howToSchema({
          name: title,
          description: intro,
          path,
          steps: groups.map((group) => ({
            name: group.name,
            text: group.items.map((item) => item.title).join(". "),
          })),
        })}
      />

      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: title, path },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">{intro}</p>
            <p className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
              <span>
                <strong className="text-white">{totalItems}</strong> items
              </span>
              <span>
                <strong className="text-accent-300">{criticalCount}</strong>{" "}
                marked critical
              </span>
              <span>Free to use — no signup required</span>
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Checklist" className="py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6">
          {groups.map((group, groupIndex) => (
            <section key={group.name} aria-labelledby={`group-${groupIndex}`}>
              <h2
                id={`group-${groupIndex}`}
                className="text-2xl font-bold tracking-tight text-white"
              >
                {groupIndex + 1}. {group.name}
              </h2>
              <p className="mt-1 text-slate-400">{group.description}</p>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-ink-700/60 bg-ink-900 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-white">
                        {item.title}
                      </h3>
                      {item.critical && (
                        <span className="shrink-0 rounded-full border border-red-400/40 bg-red-950/40 px-2.5 py-0.5 text-xs font-semibold text-red-300">
                          Critical
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-7 text-slate-300">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <aside className="rounded-xl border border-accent-600/40 bg-ink-900 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              Want every box verifiably checked?
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-300">
              Use this checklist yourself — that&apos;s what it&apos;s for. Or
              have us implement and verify every item at a fixed price, with
              documentation to prove it.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={serviceHref}
                className="rounded-md bg-accent-500 px-6 py-3 font-semibold text-ink-950 transition-colors hover:bg-accent-400"
              >
                {serviceLabel}
              </Link>
              <Link
                href={site.primaryCta.href}
                className="rounded-md border border-slate-600 px-6 py-3 font-semibold text-white transition-colors hover:border-accent-400 hover:text-accent-300"
              >
                {site.primaryCta.label}
              </Link>
            </div>
          </aside>

          <section aria-label="Checklist FAQ">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <FaqList items={faq} />
            </div>
          </section>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
