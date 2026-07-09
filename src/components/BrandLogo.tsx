import { brandIcons } from "@/data/brand-icons";

type BrandLogoProps = {
  /** Icon slug, e.g. "docker", "claude", "grafana". */
  slug: string;
  /** Accessible/visible name; falls back to the icon's own title or the slug. */
  label?: string;
  /** Extra classes for sizing/color (defaults to 1.5rem square, currentColor). */
  className?: string;
};

/**
 * Renders a single-path brand glyph as inline SVG (monochrome, `currentColor`).
 * When the slug has no path data (e.g. AWS, Azure, v0), it renders a compact
 * monospace text mark instead so the row stays visually consistent.
 */
export default function BrandLogo({ slug, label, className }: BrandLogoProps) {
  const icon = brandIcons[slug];
  const title = label ?? icon?.title ?? slug;

  if (!icon) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center font-mono text-[0.72em] font-bold uppercase leading-none tracking-tight ${
          className ?? ""
        }`}
      >
        {title}
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "h-6 w-6"}
    >
      <path d={icon.path} />
    </svg>
  );
}
