import Link from "next/link";
import type { Metadata } from "next";
import CaseStudies from "@/components/CaseStudies";
import CtaBanner from "@/components/CtaBanner";
import FaqList from "@/components/FaqList";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { ui } from "@/dictionaries/ui";
import {
  beforeAfter,
  frameworkPillars,
  homeFaq,
  industries,
  painPoints,
  services,
  techStack,
  trustSignals,
  whyAiAppsFail,
  workflow,
} from "@/data/homepage";
import { blogArticles } from "@/data/blog";

const enMetadata: Metadata = pageMetadata({
  title: "AI Production Partner — Turn AI-Generated Apps into Production-Ready Systems",
  description: site.description,
  path: "/",
  keywords: [
    "ai app production",
    "deploy ai generated app",
    "production readiness",
    "ai app security audit",
    "cursor app deployment",
    "claude code deployment",
    "lovable app production",
  ],
});

/** Shared section heading block. */
function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {lede && <p className="mt-4 text-lg leading-8 text-slate-300">{lede}</p>}
    </div>
  );
}

const homeTh = {
  metadata: {
    title: "AI Production Partner — เปลี่ยนแอปที่สร้างด้วย AI ให้พร้อมใช้งานจริง",
    description:
      "เราช่วยตรวจสอบ เสริมความปลอดภัย deploy และดูแลแอปที่สร้างด้วย AI ให้พร้อมใช้งานจริงบน Production",
  },
  hero: {
    pill: "สำหรับทีมที่สร้างด้วย Cursor · Claude Code · Lovable · Replit · Bolt",
    titleA: "เปลี่ยนแอปที่สร้างด้วย AI ให้เป็น",
    titleB: "ระบบพร้อมใช้งานจริง",
    body:
      "คุณสร้างแอปได้เร็วด้วย AI เราช่วยทำให้ปลอดภัย ขยายระบบได้ และพร้อมใช้งานระดับองค์กร: security audit, Docker & Kubernetes, CI/CD, monitoring และ support พร้อม SLA",
  },
  sections: {
    pain: {
      eyebrow: "คุ้นกับปัญหานี้ไหม?",
      title: "แอปที่ AI สร้างใช้งานได้ แต่คุณยังไม่กล้าไว้ใจ",
      lede:
        "ทุกทีมที่ใช้ AI ทำแอปจะเจอช่องว่างเดียวกัน ระหว่าง “มันรันได้” กับ “มันพร้อมให้ลูกค้าใช้จริง”",
    },
    root: {
      eyebrow: "ต้นตอของปัญหา",
      title: "ทำไมแอปจาก AI ถึงพังบน Production",
      lede:
        "ไม่ใช่เพราะ AI เขียนโค้ดแย่ แต่เพราะ production readiness ไม่เคยอยู่ใน prompt ตั้งแต่แรก",
    },
    framework: {
      eyebrow: "วิธีทำงานของเรา",
      title: "Production Readiness Framework",
      lede:
        "6 เสาหลักที่พาแอปที่สร้างด้วย AI จาก prototype ไปสู่ production แบบวัดผลได้",
    },
    services: {
      eyebrow: "สิ่งที่เราทำ",
      title: "บริการ Production ครบวงจร",
      lede:
        "ทุกอย่างระหว่าง “AI สร้างแอปให้แล้ว” กับ “ลูกค้าใช้งานจริงได้อย่างมั่นใจ”",
    },
    workflow: {
      eyebrow: "ขั้นตอน",
      title: "จากการคุยครั้งแรกสู่ Production ที่เสถียร",
      lede:
        "ขอบเขตชัดเจน เดโมทุกสัปดาห์ ไม่มีบิลรายชั่วโมงที่คาดเดาไม่ได้",
    },
    beforeAfter: {
      eyebrow: "ผลลัพธ์",
      title: "ก่อนและหลังทำ Production Readiness",
    },
    stack: {
      eyebrow: "เทคโนโลยี",
      title: "Stack ที่เรา deploy และดูแล",
      lede: "เลือกใช้เทคโนโลยีที่พิสูจน์แล้ว พกพาได้ และคุณเป็นเจ้าของทั้งหมด",
    },
    industries: {
      eyebrow: "ลูกค้าที่เหมาะกับเรา",
      title: "ธุรกิจที่เราพาขึ้น Production",
    },
    blog: {
      eyebrow: "จากบทความ",
      title: "Production engineering แบบอ่านเข้าใจง่าย",
      lede: "คู่มือเรื่อง deployment, security และ operations สำหรับแอปที่สร้างด้วย AI",
      browse: "ดูบทความทั้งหมด",
    },
    contact: {
      eyebrow: "ติดต่อเรา",
      title: "คุยกับ production engineer ไม่ใช่ฝ่ายขาย",
      body:
        "เล่าให้เราฟังว่าคุณสร้างอะไรไว้และต้องการให้รันที่ไหน เราจะตอบกลับเชิงเทคนิคภายใน 1 วันทำการ พร้อมประเมิน production readiness ฟรีถ้าคุณต้องการ",
      response: "เวลาตอบกลับ",
      responseBody: "ภายใน 1 วันทำการ และมักเร็วกว่านั้น",
      cardTitle: "เริ่มจากการประเมินฟรี",
      bullets: [
        "Production Readiness Score จาก 40+ checkpoints",
        "รายงาน findings ที่จัดลำดับความเสี่ยงภายใน 48 ชั่วโมง",
        "ข้อเสนอแบบ fixed-price ไม่มีบิลรายชั่วโมง ไม่มีข้อผูกมัด",
      ],
    },
  },
  painPoints: [
    {
      title: "เดโมรันได้ แต่ยังไม่กล้าให้คนใช้จริง",
      body:
        "แอปทำงานตามที่สั่ง AI แล้ว แต่ยังไม่มีใครตรวจว่าเมื่อมีผู้ใช้จริง ข้อมูลจริง หรือ attacker จริง ระบบจะรับมือได้ไหม",
    },
    {
      title: "ความปลอดภัยยังเป็นเครื่องหมายคำถาม",
      body:
        "API key ฝังในโค้ด authorization ไม่ครบ input ไม่ถูก validate เป็นปัญหาที่ AI สร้างซ้ำบ่อยและมองไม่เห็นจนกว่าจะถูกโจมตี",
    },
    {
      title: "ยังอยู่บน hosting สำหรับ prototype",
      body:
        "Preview URL, workspace host และ database free-tier ไม่ได้ออกแบบมารองรับลูกค้าที่จ่ายเงิน ไม่มี SLA ไม่มี backup ที่คุณควบคุม และ scale ยาก",
    },
    {
      title: "ไม่มีใคร operate ระบบได้จริง",
      body:
        "ไม่มี monitoring, logs, deployment pipeline หรือ recovery plan เหตุผลของโค้ดกระจัดกระจายใน chat history และความจำของคนคนเดียว",
    },
  ],
  whyAiAppsFail: [
    {
      title: "Security ไม่เคยอยู่ใน prompt",
      body:
        "AI tools มัก optimize ให้ “ทำงานได้” มากกว่า “ปลอดภัย” จึงเกิด exposed secrets, injection paths และ broken access control ได้ง่าย",
    },
    {
      title: "Architecture โตแบบสะสม",
      body:
        "แต่ละ session ของ AI เลือกวิธีที่ดูสมเหตุสมผลเฉพาะหน้า แต่รวมกันแล้วกลายเป็นระบบเปราะ เช่น N+1 queries, service boundary ไม่ชัด และ state กระจัดกระจาย",
    },
    {
      title: "ส่วนที่มองไม่เห็นหายไป",
      body:
        "Environments, pipelines, observability, backups และ recovery มักไม่ถูกสร้าง เพราะเดโมไม่ต้องใช้ แต่ production ต้องมี",
    },
    {
      title: "ไม่มีใครเฝ้าระบบ",
      body:
        "ถ้าไม่มี monitoring และ alerting outage แรกมักถูกเจอโดยลูกค้า และถ้า backup ไม่เคยทดสอบ incident ด้านข้อมูลอาจแก้กลับไม่ได้",
    },
  ],
  frameworkPillars: [
    ["01", "Assess", "รีวิว 40+ checkpoints ด้าน security, architecture, infrastructure และ operations พร้อม score และรายงานภายใน 48 ชั่วโมง"],
    ["02", "Harden", "แก้ security: rotate secrets, enforce authorization, validate input, patch dependencies และใส่ rate limit"],
    ["03", "Deploy", "ทำ container, infrastructure-as-code, staging/production และ CI/CD พร้อม rollback"],
    ["04", "Observe", "ติดตั้ง error tracking, structured logs, metrics, uptime checks และ alert ที่มีคนรับผิดชอบ"],
    ["05", "Protect", "ตั้ง backup อัตโนมัติ ทดสอบ restore และทำ disaster recovery runbook"],
    ["06", "Support", "ดูแล production พร้อม SLA: monitoring response, security patch, cost review และรายงานรายเดือน"],
  ].map(([number, title, body]) => ({ number, title, body })),
  services: [
    ["Production Readiness Assessment", "/production-readiness-assessment", "รีวิว 40+ checkpoints พร้อม score และรายงานภายใน 48 ชั่วโมง"],
    ["Architecture Review", "/architecture-review", "ทำแผนที่สิ่งที่ AI สร้างจริง หาเพดานของระบบ และวางทางวิวัฒน์ต่อ"],
    ["Production Checklist", "/production-readiness-checklist-service", "ลงมือทำและ verify readiness items ไม่ใช่แค่ส่ง checklist"],
    ["Security Audit", "/ai-security-audit", "ตรวจ OWASP Top 10 + LLM Top 10 สำหรับโค้ดที่สร้างด้วย AI พร้อม verified fixes"],
    ["Docker & Containerization", "/docker-deployment", "ทำ image ที่ปลอดภัย เบา และ build ซ้ำได้สำหรับทุก stack"],
    ["Cloud Deployment", "/cloud-deployment-services", "วาง AWS, Azure, GCP หรือ DigitalOcean infrastructure ที่เหมาะกับ workload"],
    ["Kubernetes Deployment", "/kubernetes-deployment", "Production cluster พร้อม GitOps และ autoscaling เมื่อคุณต้องใช้จริง"],
    ["CI/CD Pipeline", "/ci-cd-pipeline-setup", "ทดสอบ build deploy และ rollback อัตโนมัติ"],
    ["Monitoring & Logging", "/monitoring-logging-setup", "รู้ปัญหาก่อนผู้ใช้ ด้วย errors, uptime, metrics และ alerts ที่ไม่รบกวนเกินจำเป็น"],
    ["Backup & Disaster Recovery", "/backup-disaster-recovery", "backup อัตโนมัติ ทดสอบ restore และ runbook สำหรับวันที่แย่ที่สุด"],
    ["Performance Optimization", "/performance-optimization", "profile, fix และพิสูจน์ผล ทั้ง queries, caching และ Core Web Vitals"],
    ["Cloud Cost Optimization", "/cloud-cost-optimization", "ลดค่า cloud โดยไม่แลกกับ reliability"],
    ["Documentation & Handover", "/documentation-handover", "runbooks, architecture docs และแพ็กเกจส่งมอบที่พร้อมตรวจสอบ"],
    ["Ongoing Production Support", "/ongoing-production-support", "ดูแล production ต่อเนื่องแบบมี SLA ในราคาเหมาจ่ายรายเดือน"],
  ].map(([name, href, blurb]) => ({ name, href, blurb })),
  workflow: [
    ["1", "ประเมินฟรี", "แชร์ repository access ได้พร้อม NDA ภายใน 48 ชั่วโมงคุณจะได้ score และ findings แบบจัดลำดับความสำคัญ"],
    ["2", "ข้อเสนอ Fixed-Scope", "แผนงานชัดเจนว่าแก้อะไร สร้างอะไร ตรวจอะไร ใช้เวลาเท่าไหร่ และราคาเท่าไหร่"],
    ["3", "Harden & Deploy", "แก้ security, containerization, infrastructure และ CI/CD โดยปกติใช้ 2-6 สัปดาห์พร้อมเดโมทุกสัปดาห์"],
    ["4", "Launch & Operate", "go-live พร้อม monitoring จากนั้นส่งมอบเอกสารและดูแลต่อเนื่องแบบมี SLA ได้"],
  ].map(([step, title, body]) => ({ step, title, body })),
  beforeAfter: [
    ["Security", "Secrets อยู่ในโค้ด ไม่มี authorization checks", "Secrets อยู่ใน vault, access control ครบ, CI scan security"],
    ["Hosting", "Preview URL หรือ workspace host", "Cloud infrastructure ที่คุณเป็นเจ้าของ พร้อม staging + production"],
    ["Deployment", "Manual และ rollback ยาก", "Automated pipeline, zero-downtime, rollback ได้"],
    ["Visibility", "ลูกค้ารู้ก่อนเมื่อระบบล่ม", "มี error tracking, uptime alerts และ dashboard"],
    ["Data safety", "ไม่มี backup หรือไม่เคยทดสอบ restore", "backup อัตโนมัติ ทดสอบ restore และมี recovery runbook"],
    ["Operations", "Founder ต้องตอบตอนตีสอง", "มี SLA support, runbooks และรายงานรายเดือน"],
  ].map(([dimension, before, after]) => ({ dimension, before, after })),
  industries: [
    ["SaaS & Startups", "จาก AI-built MVP สู่แพลตฟอร์มที่นักลงทุนและลูกค้าองค์กรไว้ใจ"],
    ["E-commerce", "ความเสถียร performance และ payment flow ที่ downtime คือรายได้ที่หายไป"],
    ["Fintech", "security hardening, audit trail และ data protection ตามความคาดหวังด้าน compliance"],
    ["Healthcare", "infrastructure และ access control ที่ใส่ privacy ก่อนสำหรับข้อมูลอ่อนไหว"],
    ["Internal Tools & IT", "เปลี่ยนแอปที่แต่ละแผนกสร้างด้วย AI ให้ IT รับช่วงดูแลได้อย่างปลอดภัย"],
    ["Agencies & Software Houses", "ทีม production engineering แบบ white-label หลังบ้านให้การส่งมอบลูกค้า"],
  ].map(([name, body]) => ({ name, body })),
  faq: [
    ["AI Production Partner ทำอะไร?", "เราทำให้แอปที่สร้างด้วย AI พร้อมใช้งานจริง: audit, hardening, containerization, cloud/Kubernetes deployment, CI/CD, monitoring, backup, documentation และ support"],
    ["แอปที่สร้างด้วย AI ใช้ Production ได้จริงไหม?", "ได้ โค้ดทำงานจริงอยู่แล้ว ช่องว่างคือ production layer รอบ ๆ เช่น security, infrastructure, observability และ recovery"],
    ["ค่าใช้จ่ายประมาณเท่าไหร่?", "เริ่มจากประเมินฟรีภายใน 48 ชั่วโมง จากนั้นให้ fixed-price proposal ตาม gap จริง งานทั่วไปใช้ 2-6 สัปดาห์"],
    ["Production Readiness Assessment คืออะไร?", "การรีวิว 40+ checkpoints ด้าน security, architecture, infrastructure, delivery และ operations พร้อม score และ roadmap"],
    ["คุณมาแทน developer หรือ AI tools ของเราไหม?", "ไม่ใช่ ทีมคุณยังสร้าง product ต่อได้เร็วเหมือนเดิม เรารับผิดชอบ production layer ให้ปลอดภัยและดูแลได้"],
    ["รองรับ stack อะไรบ้าง?", "รองรับ Cursor, Claude Code, Lovable, Replit, Bolt, v0, Windsurf และ stack เช่น Next.js, React, Node.js, Python, .NET, Go, Vue, SvelteKit"],
  ].map(([question, answer]) => ({ question, answer })),
  trustSignals: [
    ["40+", "checkpoints ในทุก production assessment"],
    ["48h", "จาก repository access ถึงรายงาน findings"],
    ["30-60%", "ลด cloud cost ได้บ่อยหลัง optimization"],
    ["100%", "infrastructure ยังเป็นของคุณ ไม่มี lock-in"],
  ].map(([metric, label]) => ({ metric, label })),
};

export function generateMetadata(): Metadata {
  return enMetadata;
}

export function HomeContent({ locale = "en" }: { locale?: Locale }) {
  const dict = ui(locale);
  const path = (href: string) => localePath(locale, href);
  const localized = locale === "th";
  const copy = localized ? homeTh : null;
  const latestArticles = blogArticles.slice(0, 3);
  const pagePainPoints = copy?.painPoints ?? painPoints;
  const pageWhyAiAppsFail = copy?.whyAiAppsFail ?? whyAiAppsFail;
  const pageFrameworkPillars = copy?.frameworkPillars ?? frameworkPillars;
  const pageServices = copy?.services ?? services;
  const pageWorkflow = copy?.workflow ?? workflow;
  const pageBeforeAfter = copy?.beforeAfter ?? beforeAfter;
  const pageIndustries = copy?.industries ?? industries;
  const pageFaq = copy?.faq ?? homeFaq;
  const pageTrustSignals = copy?.trustSignals ?? trustSignals;
  const pageSections = copy?.sections;
  const pageHero = copy?.hero;

  return (
    <>
      {/* 1. Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-ink-700/60"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.12),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900 px-4 py-1.5 text-sm text-slate-300">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-400" />
              {pageHero?.pill ??
                "For teams building with Cursor · Claude Code · Lovable · Replit · Bolt"}
            </p>
            <h1
              id="hero-heading"
              className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              {pageHero?.titleA ?? "Turn AI-generated applications into"}{" "}
              <span className="text-accent-400">
                {pageHero?.titleB ?? "production-ready systems"}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {pageHero?.body ??
                "You built it fast with AI. We make it secure, scalable, and enterprise-grade: security audits, Docker & Kubernetes, CI/CD, monitoring, and SLA-backed support. Not a software house — your production engineering partner."}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={path(site.primaryCta.href)}
                className="w-full rounded-md bg-accent-500 px-8 py-4 text-base font-semibold text-ink-950 transition-colors hover:bg-accent-400 sm:w-auto"
              >
                {dict.cta.primary}
              </Link>
              <Link
                href={path("/tools/production-score")}
                className="w-full rounded-md border border-slate-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-accent-400 hover:text-accent-300 sm:w-auto"
              >
                {dict.cta.freeScore}
              </Link>
            </div>
          </div>

          {/* Trust bar */}
          <dl className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
            {pageTrustSignals.map((signal) => (
              <div key={signal.label} className="text-center">
                <dt className="order-2 mt-2 block text-sm leading-6 text-slate-400">
                  {signal.label}
                </dt>
                <dd className="text-3xl font-bold text-white">{signal.metric}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2. Pain points */}
      <section aria-labelledby="pain-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.pain.eyebrow ?? "Sound familiar?"}
            title={
              pageSections?.pain.title ??
              "Your AI-built app works. You just can't trust it yet."
            }
            lede={
              pageSections?.pain.lede ??
              "Every team that ships with AI tools hits the same wall between “it works” and “it's ready”."
            }
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
            {pagePainPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-ink-700/60 bg-ink-900 p-6"
              >
                <h3 className="font-semibold text-white">{point.title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why AI apps fail */}
      <section
        aria-labelledby="why-fail-heading"
        className="border-y border-ink-700/60 bg-ink-900/50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.root.eyebrow ?? "The root causes"}
            title={pageSections?.root.title ?? "Why AI apps fail in production"}
            lede={
              pageSections?.root.lede ??
              "Not because AI writes bad code — because production readiness was never in the prompt. The failures are systematic, which means prevention is too."
            }
          />
          <ol className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
            {pageWhyAiAppsFail.map((reason, index) => (
              <li
                key={reason.title}
                className="rounded-xl border border-ink-700/60 bg-ink-950 p-6"
              >
                <span className="font-mono text-sm text-accent-400">
                  {localized ? "สาเหตุ" : "Cause"} {index + 1}
                </span>
                <h3 className="mt-2 font-semibold text-white">{reason.title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{reason.body}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-3xl text-center text-slate-400">
            Deep dive:{" "}
            <Link
              href={path("/blog/why-ai-generated-apps-fail-in-production")}
              className="text-accent-300 underline-offset-4 hover:underline"
            >
              Why AI-Generated Apps Fail in Production (and How to Prevent It)
            </Link>
          </p>
        </div>
      </section>

      {/* 4. Framework */}
      <section aria-labelledby="framework-heading" id="framework" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.framework.eyebrow ?? "Our method"}
            title={
              pageSections?.framework.title ??
              "The Production Readiness Framework"
            }
            lede={
              pageSections?.framework.lede ??
              "Six pillars, applied in order, that take any AI-built application from prototype to production — measurably."
            }
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pageFrameworkPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-xl border border-ink-700/60 bg-ink-900 p-6 transition-colors hover:border-accent-600"
              >
                <span className="font-mono text-2xl font-bold text-accent-400">
                  {pillar.number}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-300">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services */}
      <section
        aria-labelledby="services-heading"
        id="services"
        className="border-y border-ink-700/60 bg-ink-900/50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.services.eyebrow ?? "What we do"}
            title={pageSections?.services.title ?? "Production services, end to end"}
            lede={
              pageSections?.services.lede ??
              "Everything between “the AI built it” and “customers rely on it” — as individual engagements or one package."
            }
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageServices.map((service) => (
              <Link
                key={service.href}
                href={path(service.href)}
                className="group rounded-xl border border-ink-700/60 bg-ink-950 p-5 transition-colors hover:border-accent-600"
              >
                <h3 className="font-semibold text-white group-hover:text-accent-300">
                  {service.name}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  {service.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Workflow */}
      <section aria-labelledby="workflow-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.workflow.eyebrow ?? "How it works"}
            title={
              pageSections?.workflow.title ??
              "From first contact to stable production"
            }
            lede={
              pageSections?.workflow.lede ??
              "Fixed scope, weekly demos, no surprises — a workflow designed for founders and engineering leads who've been burned before."
            }
          />
          <ol className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pageWorkflow.map((phase) => (
              <li
                key={phase.step}
                className="relative rounded-xl border border-ink-700/60 bg-ink-900 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 font-mono font-bold text-ink-950">
                  {phase.step}
                </span>
                <h3 className="mt-4 font-semibold text-white">{phase.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {phase.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Before vs After */}
      <section
        aria-labelledby="before-after-heading"
        className="border-y border-ink-700/60 bg-ink-900/50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.beforeAfter.eyebrow ?? "The transformation"}
            title={
              pageSections?.beforeAfter.title ??
              "Before vs. after production readiness"
            }
          />
          <div className="mx-auto mt-14 max-w-5xl overflow-x-auto rounded-xl border border-ink-700/60">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">
                {localized
                  ? "ตารางเปรียบเทียบแอปที่สร้างด้วย AI ก่อนและหลังทำ production readiness"
                  : "Comparison of an AI-built app before and after production readiness work"}
              </caption>
              <thead>
                <tr className="border-b border-ink-700/60 bg-ink-900 text-white">
                  <th scope="col" className="px-6 py-4 font-semibold">
                    {localized ? "มิติ" : "Dimension"}
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-red-300">
                    {localized ? "ก่อน" : "Before"}
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-accent-300">
                    {localized ? "หลัง" : "After"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-700/60 bg-ink-950">
                {pageBeforeAfter.map((row) => (
                  <tr key={row.dimension}>
                    <th scope="row" className="px-6 py-4 font-medium text-white">
                      {row.dimension}
                    </th>
                    <td className="px-6 py-4 text-slate-400">{row.before}</td>
                    <td className="px-6 py-4 text-slate-200">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7b. Case studies (renders only when a case study is published) */}
      <CaseStudies locale={locale} />

      {/* 8. Technology stack */}
      <section aria-labelledby="stack-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.stack.eyebrow ?? "Technology"}
            title={pageSections?.stack.title ?? "The stack we deploy and operate"}
            lede={
              pageSections?.stack.lede ??
              "Boring, proven, and portable — chosen for your workload, owned by you."
            }
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-ink-700/60 bg-ink-900 p-6"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {group.category}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-ink-600 bg-ink-950 px-2.5 py-1 text-sm text-slate-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Industries */}
      <section
        aria-labelledby="industries-heading"
        className="border-y border-ink-700/60 bg-ink-900/50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.industries.eyebrow ?? "Who we serve"}
            title={
              pageSections?.industries.title ??
              "Industries we take to production"
            }
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageIndustries.map((industry) => (
              <div
                key={industry.name}
                className="rounded-xl border border-ink-700/60 bg-ink-950 p-6"
              >
                <h3 className="font-semibold text-white">{industry.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {industry.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section aria-labelledby="faq-heading" className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQ"
            title={dict.common.faqHeading}
          />
          <div className="mt-14">
            <FaqList items={pageFaq} />
          </div>
        </div>
      </section>

      {/* 11. Blog preview */}
      <section
        aria-labelledby="blog-heading"
        className="border-y border-ink-700/60 bg-ink-900/50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pageSections?.blog.eyebrow ?? "From the blog"}
            title={
              pageSections?.blog.title ??
              "Production engineering, written down"
            }
            lede={
              pageSections?.blog.lede ??
              "Guides on deploying, securing, and operating AI-built applications."
            }
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col rounded-xl border border-ink-700/60 bg-ink-950 p-6"
              >
                <p className="text-sm text-accent-400">{article.category}</p>
                <h3 className="mt-2 font-semibold text-white">
                  <Link
                    href={path(`/blog/${article.slug}`)}
                    className="hover:text-accent-300"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                  {article.description}
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  <time dateTime={article.date}>{article.date}</time> ·{" "}
                  {article.readingMinutes} {dict.common.minRead}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link
              href={path("/blog")}
              className="font-semibold text-accent-300 underline-offset-4 hover:underline"
            >
              {pageSections?.blog.browse ?? "Browse all"} {blogArticles.length}{" "}
              {localized ? "บทความ" : "articles"} →
            </Link>
          </p>
        </div>
      </section>

      {/* 12. CTA */}
      <CtaBanner locale={locale} />

      {/* 13. Contact */}
      <section
        aria-labelledby="contact-heading"
        id="contact"
        className="border-t border-ink-700/60 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
                {pageSections?.contact.eyebrow ?? "Contact"}
              </p>
              <h2
                id="contact-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                {pageSections?.contact.title ??
                  "Talk to a production engineer — not a salesperson"}
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                {pageSections?.contact.body ??
                  "Tell us what you built and where it needs to run. You'll get a straight technical answer within one business day, and a free production assessment if you want one. NDA available before any code is shared."}
              </p>
              <dl className="mt-8 space-y-4 text-slate-300">
                <div>
                  <dt className="text-sm font-semibold text-slate-400">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-accent-300 hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-400">
                    {pageSections?.contact.response ?? "Response time"}
                  </dt>
                  <dd>
                    {pageSections?.contact.responseBody ??
                      "Within one business day — usually much faster."}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-xl border border-ink-700/60 bg-ink-900 p-8">
              <h3 className="text-xl font-semibold text-white">
                {pageSections?.contact.cardTitle ?? "Start with the free assessment"}
              </h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                {(pageSections?.contact.bullets ?? [
                  "Production Readiness Score across 40+ checkpoints",
                  "Prioritized findings report within 48 hours",
                  "Fixed-price proposal — no hourly billing, no obligation",
                ]).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent-400">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={path(site.primaryCta.href)}
                className="mt-8 block rounded-md bg-accent-500 px-6 py-3 text-center font-semibold text-ink-950 transition-colors hover:bg-accent-400"
              >
                {dict.cta.primary}
              </Link>
              <Link
                href={path(site.secondaryCta.href)}
                className="mt-3 block rounded-md border border-slate-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:border-accent-400 hover:text-accent-300"
              >
                {dict.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return <HomeContent locale="en" />;
}

export function thaiHomeMetadata(): Metadata {
  return pageMetadata({
    title: homeTh.metadata.title,
    description: homeTh.metadata.description,
    path: "/",
    locale: "th",
  });
}
