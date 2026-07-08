import Link from "next/link";
import { blogCategories, categorySlug } from "@/data/blog";

/** Pill navigation across blog categories (static links, SEO-indexable). */
export default function CategoryNav({ active }: { active?: string }) {
  const pillClass = (isActive: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${
      isActive
        ? "border-accent-500 bg-accent-500 font-semibold text-ink-950"
        : "border-ink-600 text-slate-300 hover:border-accent-400"
    }`;

  return (
    <nav aria-label="Blog categories">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/blog" className={pillClass(!active)}>
            All
          </Link>
        </li>
        {blogCategories.map((name) => (
          <li key={name}>
            <Link
              href={`/blog/category/${categorySlug(name)}`}
              className={pillClass(active === name)}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
