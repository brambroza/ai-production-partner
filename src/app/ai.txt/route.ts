import { NextResponse } from "next/server";
import { site, absoluteUrl } from "@/lib/site";

export async function GET() {
  const content = `# ${site.name}

${site.description}

## About
${site.name} helps teams move AI-generated applications from prototype to production. We provide practical guidance and implementation support for security, reliability, deployment, monitoring, and delivery.

## Topics
- AI app production readiness
- AI-generated app security
- Deployment and DevOps for AI-built products
- Monitoring and operational excellence
- Architecture review and scaling guidance

## Resources
- Homepage: ${absoluteUrl("/")}
- Solutions: ${absoluteUrl("/solutions")}
- Checklist: ${absoluteUrl("/production-readiness-checklist")}
- Security checklist: ${absoluteUrl("/ai-app-security-checklist")}
- Tool: ${absoluteUrl("/tools/production-score")}
- Blog: ${absoluteUrl("/blog")}

## Contact
- Email: ${site.email}
- Website: ${site.url}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
