import type { Metadata } from "next";
import ChecklistPage from "@/components/ChecklistPage";
import { pageMetadata } from "@/lib/metadata";
import { aiSecurityChecklist } from "@/data/checklists";

export const metadata: Metadata = pageMetadata({
  title: "AI App Security Checklist — Free Security Checklist for AI-Generated Code",
  description:
    "The security checklist built for AI-generated applications: secrets, authentication, input handling, dependencies, abuse protection, and OWASP LLM Top 10 risks — free to use.",
  path: "/ai-app-security-checklist",
  keywords: [
    "ai app security checklist",
    "ai generated code security",
    "vibe coding security checklist",
    "llm security checklist",
    "owasp ai checklist",
  ],
});

export default function AiSecurityChecklistPage() {
  return (
    <ChecklistPage
      path="/ai-app-security-checklist"
      title="AI App Security Checklist"
      intro="AI coding tools fail security in predictable ways — the same five categories of flaw appear in nearly every generated codebase we audit. This checklist covers all of them, plus the LLM-specific risks that classical security reviews miss. Every item includes how to verify it, not just what to believe."
      groups={aiSecurityChecklist}
      serviceHref="/ai-app-security-checklist-service"
      serviceLabel="Have Us Harden It"
      faq={[
        {
          question: "Why does AI-generated code need its own security checklist?",
          answer:
            "Because its failure pattern is distinctive: AI tools implement features correctly and security inconsistently — secrets pasted into prompts end up in git history, authentication works while authorization is missing, and validation exists on some boundaries but not others. This checklist targets exactly those patterns, plus the new attack surface (prompt injection, insecure output handling) that apps with LLM features acquire.",
        },
        {
          question: "In what order should we work through it?",
          answer:
            "Top to bottom — groups are ordered by exploitation likelihood. Secrets first (scanning history takes an hour and the findings are urgent), then authorization, then input handling. The Critical-flagged items across all groups are the pre-launch minimum.",
        },
        {
          question: "Can we verify these items without security expertise?",
          answer:
            "Most of them, yes — each item's description says what to check, and tools like secret scanners and dependency auditors automate the mechanical parts. The honest exceptions are authorization testing and LLM-feature review, which benefit from an adversarial mindset. That's what our AI Security Audit provides if you want expert verification.",
        },
        {
          question: "Does passing this checklist make our app secure?",
          answer:
            "It eliminates the failure modes that account for the large majority of real-world AI-app breaches — a dramatic risk reduction, honestly stated. What a checklist can't cover is business-logic abuse specific to your domain; that requires human review, which is the difference between this free resource and a full audit.",
        },
      ]}
    />
  );
}
