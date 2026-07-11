import { NextResponse } from "next/server";
import { site, absoluteUrl } from "@/lib/site";

export async function GET() {
  const content = `# ${site.name}

${site.description}

## Overview
${site.name} helps teams turn AI-generated applications into production-ready systems. The site covers production readiness, security, deployment, monitoring, and implementation guidance for apps built with tools like Cursor, Claude Code, Lovable, Replit, and Bolt.

## Primary services
- Production readiness assessments
- Security audits and AI app hardening
- Docker, Kubernetes, CI/CD, and deployment guidance
- Monitoring, observability, and support
- Technical guidance for scaling AI-generated products

## Key pages
- Home: ${absoluteUrl("/")}
- Solutions: ${absoluteUrl("/solutions")}
- Production readiness checklist: ${absoluteUrl("/production-readiness-checklist")}
- AI app security checklist: ${absoluteUrl("/ai-app-security-checklist")}
- Production score tool: ${absoluteUrl("/tools/production-score")}
- Book an assessment: ${absoluteUrl("/book-assessment")}
- Resources: ${absoluteUrl("/resources")}
- Blog: ${absoluteUrl("/blog")}

## Contact
- Email: ${site.email}
- Website: ${site.url}
- Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
