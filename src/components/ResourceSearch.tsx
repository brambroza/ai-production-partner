"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ResourceEntry = {
  title: string;
  description: string;
  href: string;
  type: string;
  keywords: string[];
};

/**
 * Client-side search over the full resource index (articles, solutions,
 * checklists, tools). Matches on title, description, type, and keywords.
 */
export default function ResourceSearch({
  resources,
}: {
  resources: ResourceEntry[];
}) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const types = useMemo(
    () => ["All", ...new Set(resources.map((resource) => resource.type))],
    [resources],
  );

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return resources.filter((resource) => {
      if (typeFilter !== "All" && resource.type !== typeFilter) return false;
      if (terms.length === 0) return true;
      const haystack = [
        resource.title,
        resource.description,
        resource.type,
        ...resource.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [resources, query, typeFilter]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Search resources</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${resources.length} resources — try "docker", "security", "lovable"…`}
            className="w-full rounded-md border border-ink-600 bg-ink-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent-400 focus:outline-none"
          />
        </label>
        <label>
          <span className="sr-only">Filter by type</span>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="w-full rounded-md border border-ink-600 bg-ink-900 px-4 py-3 text-white focus:border-accent-400 focus:outline-none sm:w-48"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-slate-400" role="status">
        {results.length} resource{results.length === 1 ? "" : "s"} found
      </p>

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {results.map((resource) => (
          <li key={resource.href}>
            <Link
              href={resource.href}
              className="group block h-full rounded-xl border border-ink-700/60 bg-ink-900 p-5 transition-colors hover:border-accent-600"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-400">
                {resource.type}
              </p>
              <h2 className="mt-2 font-semibold text-white group-hover:text-accent-300">
                {resource.title}
              </h2>
              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-400">
                {resource.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="mt-10 text-center text-slate-400">
          Nothing matched. Try a broader term like &ldquo;deploy&rdquo;,
          &ldquo;security&rdquo;, or &ldquo;monitoring&rdquo;.
        </p>
      )}
    </div>
  );
}
