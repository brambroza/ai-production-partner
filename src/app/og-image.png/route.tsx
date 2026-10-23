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
          background: "linear-gradient(135deg, #ffffff 0%, #f3fbf6 55%, #d2eedc 100%)",
          color: "#0f172a",
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
              background: "#95dcb3",
              color: "#0a2a1c",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            AP
          </div>
          {site.name} · by GO Along
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#0a2a1c",
            maxWidth: 980,
          }}
        >
          Turn AI-generated apps into production-ready systems.
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#1b6e48" }}>
          AI App Rescue · Integration · Managed Hosting & Care Plan
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
