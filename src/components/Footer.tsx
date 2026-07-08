"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { localeOfPath, localePath } from "@/lib/i18n";
import { ui } from "@/dictionaries/ui";

/** Site footer: navigation columns, contact info, and legal line. */
export default function Footer() {
  const pathname = usePathname() ?? "/";
  const locale = localeOfPath(pathname);
  const dict = ui(locale);

  const footerColumns: { heading: string; links: { label: string; href: string }[] }[] = [
    {
      heading: dict.footer.deployColumn,
      links: [
        { label: "Deploy Cursor Apps", href: "/deploy-cursor-apps" },
        { label: "Deploy Claude Code Apps", href: "/deploy-claude-code-apps" },
        { label: "Deploy Lovable Apps", href: "/deploy-lovable-apps" },
        { label: "Deploy Replit Apps", href: "/deploy-replit-apps" },
        { label: "Deploy Bolt Apps", href: "/deploy-bolt-apps" },
        { label: dict.footer.allSolutions, href: "/solutions" },
      ],
    },
    {
      heading: dict.footer.servicesColumn,
      links: [
        { label: "Production Readiness Assessment", href: "/production-readiness-assessment" },
        { label: "AI Security Audit", href: "/ai-security-audit" },
        { label: "Docker Deployment", href: "/docker-deployment" },
        { label: "Kubernetes Deployment", href: "/kubernetes-deployment" },
        { label: "Cloud Deployment Services", href: "/cloud-deployment-services" },
        { label: "CI/CD Pipeline Setup", href: "/ci-cd-pipeline-setup" },
      ],
    },
    {
      heading: dict.footer.resourcesColumn,
      links: [
        { label: dict.footer.resourceCenter, href: "/resources" },
        { label: dict.footer.blog, href: "/blog" },
        { label: dict.footer.readinessChecklist, href: "/production-readiness-checklist" },
        { label: dict.footer.securityChecklist, href: "/ai-app-security-checklist" },
        { label: dict.footer.freeScore, href: "/tools/production-score" },
      ],
    },
    {
      heading: dict.footer.companyColumn,
      links: [
        { label: dict.footer.contact, href: "/contact" },
        { label: dict.footer.bookFree, href: "/book-assessment" },
      ],
    },
  ];

  return (
    <footer className="border-t border-ink-700/60 bg-ink-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="flex items-center gap-2 font-semibold text-white">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-500 font-mono text-sm font-bold text-ink-950"
              >
                AP
              </span>
              {site.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              {dict.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-slate-400">
              <a
                href={`mailto:${site.email}`}
                className="hover:text-accent-300"
              >
                {site.email}
              </a>
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm font-semibold text-white">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localePath(locale, link.href)}
                      className="transition-colors hover:text-accent-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink-700/60 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} {dict.footer.rights}
          </p>
          <p>{dict.footer.positioning}</p>
        </div>
      </div>
    </footer>
  );
}
