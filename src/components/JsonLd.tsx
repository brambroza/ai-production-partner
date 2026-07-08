/**
 * Renders a Schema.org JSON-LD script tag.
 * Accepts any serializable schema object (Organization, Service, FAQPage, …).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be embedded as a raw script body per the spec.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
