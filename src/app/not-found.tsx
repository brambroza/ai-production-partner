import Link from "next/link";

/** 404 page that routes lost visitors back to high-value pages. */
export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="font-mono text-sm text-accent-600">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          This page isn&apos;t in production
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          The URL you followed doesn&apos;t exist (or was never deployed).
          Here&apos;s where to go instead:
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-md bg-accent-500 px-6 py-3 font-semibold text-accent-950 transition-colors hover:bg-accent-300"
          >
            Home
          </Link>
          <Link
            href="/solutions"
            className="rounded-md border border-mint-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-accent-400 hover:text-accent-700"
          >
            Solutions
          </Link>
          <Link
            href="/resources"
            className="rounded-md border border-mint-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-accent-400 hover:text-accent-700"
          >
            Resource Center
          </Link>
        </div>
      </div>
    </section>
  );
}
