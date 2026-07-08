import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Serves the sitewide Open Graph image (1200×630) at /og-image.png,
 * rendered at build time so no design asset needs to be maintained.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #060a13 0%, #0b1120 60%, #0f2a26 100%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 34,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#14b8a6",
              color: "#060a13",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            AP
          </div>
          {site.name}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          Turn AI-generated apps into production-ready systems.
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#94a3b8" }}>
          Security · Docker · Kubernetes · CI/CD · Monitoring · Support
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
