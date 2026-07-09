import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Privacy-friendly analytics (Plausible). Renders nothing unless
 * NEXT_PUBLIC_ANALYTICS_DOMAIN is configured, so local/dev builds stay clean
 * and no cookie banner is required. The `outbound-links` variant also records
 * clicks that leave the site — booking links, mailto, and the free-score tool —
 * which are the conversion signals that matter for this funnel.
 */
export default function Analytics() {
  const domain = site.analyticsDomain;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.outbound-links.js"
      strategy="afterInteractive"
    />
  );
}
