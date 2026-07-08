import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

/**
 * FAQ accordion built on native <details>/<summary> — keyboard-accessible
 * with zero JavaScript — plus FAQPage JSON-LD for AI-search citations.
 */
export default function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div>
      <JsonLd data={faqSchema(items)} />
      <div className="divide-y divide-ink-700/60 rounded-xl border border-ink-700/60 bg-ink-900">
        {items.map((item) => (
          <details key={item.question} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-white [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="text-accent-400 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-7 text-slate-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
