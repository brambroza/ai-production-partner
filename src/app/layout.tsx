import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HtmlLang from "@/components/HtmlLang";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { site, absoluteUrl } from "@/lib/site";
import {
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Turn AI-Generated Apps into Production-Ready Systems`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false },
  verification: {
    google: "8H0SNuIjr6ZY-tLBzBf85s3jZzY12koKu-ACp7SLNXg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — Turn AI-Generated Apps into Production-Ready Systems`,
    description: site.description,
    images: [{ url: absoluteUrl(site.ogImagePath), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
  },
  icons: { icon: "/favicon.svg" },
};

/** Root layout: skip link, global chrome, and site-wide JSON-LD graph. */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Analytics />
        <HtmlLang />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={professionalServiceSchema()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
