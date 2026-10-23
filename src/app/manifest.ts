import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Web app manifest for installability and brand consistency. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "AI Prod Partner",
    description: site.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#3fb67a",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
