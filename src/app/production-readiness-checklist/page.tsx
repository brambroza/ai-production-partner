import type { Metadata } from "next";
import ChecklistPage from "@/components/ChecklistPage";
import { pageMetadata } from "@/lib/metadata";
import { productionReadinessChecklist } from "@/data/checklists";

export const metadata: Metadata = pageMetadata({
  title: "Production Readiness Checklist — The Complete Free Checklist (2026)",
  description:
    "The complete production readiness checklist for web applications: 30+ items across security, infrastructure, delivery, observability, and resilience — built for AI-generated apps, free to use.",
  path: "/production-readiness-checklist",
  keywords: [
    "production readiness checklist",
    "production ready checklist",
    "checklist production ready",
    "เช็คลิสต์ production ready",
    "go live checklist",
    "deployment checklist",
    "launch checklist web app",
    "ai app production checklist",
    "checklist เตรียม production",
  ],
});

export default function ProductionReadinessChecklistPage() {
  return (
    <ChecklistPage
      path="/production-readiness-checklist"
      title="Production Readiness Checklist"
      intro="This free production ready checklist covers everything a web application needs before real users arrive — the same checklist our engineers use in paid assessments, published in full. Built with AI-generated apps in mind, applicable to any app. Work through it top to bottom: groups are ordered by how badly each hurts when it's missing."
      groups={productionReadinessChecklist}
      serviceHref="/production-readiness-checklist-service"
      serviceLabel="Have Us Implement It"
      faq={[
        {
          question: "Who is this checklist for?",
          answer:
            "Founders, engineering leads, and IT teams preparing a web application for production — especially apps built with AI tools like Cursor, Claude Code, Lovable, Replit, or Bolt, which reliably skip the operational layer. It applies equally to conventionally-built apps.",
        },
        {
          question: "How many items should pass before launching?",
          answer:
            "All items marked Critical are non-negotiable before real users and real data arrive — they cover exposed secrets, missing authorization, absent backups, and untested recovery. The remaining items can be closed in the first weeks after launch, in the order listed.",
        },
        {
          question: "Is this checklist really free to use?",
          answer:
            "Yes — use it, share it, and adapt it for your team, no signup required. It's the same standard we implement in paid engagements; publishing it costs us nothing and earns trust with the teams who eventually want the implementation done for them.",
        },
        {
          question: "How is this different from the AI App Security Checklist?",
          answer:
            "This checklist covers full production readiness: security plus infrastructure, delivery pipeline, observability, and resilience. The AI App Security Checklist goes deeper on security alone, including LLM-specific risks. Security-critical apps should work through both.",
        },
      ]}
    />
  );
}
