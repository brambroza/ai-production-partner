import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import { ui } from "@/dictionaries/ui";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Plan = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  cta: string;
  href: string;
  featured?: boolean;
  includes: string[];
  bestFor: string;
};

const pricingCopy: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    breadcrumb: string;
    title: string;
    intro: string;
    note: string;
    plans: Plan[];
    comparisonTitle: string;
    comparisonRows: { label: string; value: string }[];
    faqTitle: string;
    faqs: { question: string; answer: string }[];
    ctaHeading: string;
    ctaBody: string;
  }
> = {
  en: {
    metaTitle: "Pricing — AI App Production Packages",
    metaDescription:
      "Transparent pricing for AI app production readiness assessments, launch sprints, security hardening, deployment, and ongoing production support.",
    keywords: ["ai app production pricing", "production readiness pricing", "deploy ai app cost"],
    breadcrumb: "Pricing",
    title: "Pricing",
    intro:
      "Start with a free production assessment, then choose the level of engineering help you need to make your AI-built app secure, deployable, observable, and supportable.",
    note: "Final scope is confirmed after we review your stack, repository access model, infrastructure target, and current production risks.",
    plans: [
      {
        name: "Free Assessment",
        price: "$0",
        cadence: "one-time",
        description: "A focused review that tells you what is blocking production.",
        cta: "Book Free Assessment",
        href: "/book-assessment",
        includes: [
          "Repository and deployment-readiness intake",
          "Security, delivery, and operations risk scan",
          "Production score with prioritized findings",
          "Recommended next steps within 48 hours",
        ],
        bestFor: "Founders who need a clear production gap list before spending money.",
      },
      {
        name: "Readiness Review",
        price: "$750+",
        cadence: "fixed-scope review",
        description: "A deeper technical review with a concrete launch plan.",
        cta: "Request Review",
        href: "/contact?type=readiness-review",
        featured: true,
        includes: [
          "Architecture, auth, secrets, data, and dependency review",
          "Deployment and rollback readiness assessment",
          "Monitoring, backup, and incident-response gaps",
          "Written remediation roadmap and handoff call",
        ],
        bestFor: "Teams close to launch that need engineering clarity before go-live.",
      },
      {
        name: "Launch Sprint",
        price: "$2,500+",
        cadence: "5-10 day sprint",
        description: "Hands-on production work to get the app deployed correctly.",
        cta: "Plan Launch Sprint",
        href: "/contact?type=deployment",
        includes: [
          "Production deployment setup",
          "Environment, secrets, CI/CD, and rollback workflow",
          "Monitoring, logging, backups, and basic alerts",
          "Security hardening for launch-critical risks",
        ],
        bestFor: "AI-built apps that need an engineer to take the system live.",
      },
      {
        name: "Production Partner",
        price: "$1,000+",
        cadence: "per month",
        description: "Ongoing production support after your app is live.",
        cta: "Discuss Support",
        href: "/contact?type=support",
        includes: [
          "Production monitoring and operational guidance",
          "Security and dependency maintenance",
          "Incident support and reliability improvements",
          "Monthly production health review",
        ],
        bestFor: "Teams that want continued engineering coverage without hiring full-time.",
      },
    ],
    comparisonTitle: "What affects price",
    comparisonRows: [
      { label: "Stack complexity", value: "Single-service apps cost less than multi-service systems with queues, workers, and AI pipelines." },
      { label: "Security surface", value: "Payments, user data, admin access, file uploads, and LLM features require deeper review." },
      { label: "Infrastructure target", value: "Vercel-style hosting is faster than custom cloud, Docker, Kubernetes, or regulated environments." },
      { label: "Current state", value: "Clean repos with basic tests and environment separation move faster than prototypes with hidden production debt." },
    ],
    faqTitle: "Pricing questions",
    faqs: [
      {
        question: "Do you charge before looking at the app?",
        answer: "No. The first assessment is free so we can understand the app and recommend the right scope.",
      },
      {
        question: "Can you work with a fixed budget?",
        answer: "Usually. We will separate must-fix production risks from improvements that can wait.",
      },
      {
        question: "Do you take equity or revenue share?",
        answer: "No. We price engineering work directly so ownership and incentives stay simple.",
      },
    ],
    ctaHeading: "Not sure which plan fits?",
    ctaBody:
      "Send the app context first. We will tell you whether you need a review, a launch sprint, or only a short fix list.",
  },
  th: {
    metaTitle: "ราคาแพ็กเกจ — พาแอป AI ขึ้น Production",
    metaDescription:
      "ราคาแพ็กเกจสำหรับประเมินความพร้อม Production, launch sprint, เสริมความปลอดภัย, deploy ระบบ และดูแล Production ต่อเนื่องสำหรับแอปที่สร้างด้วย AI",
    keywords: ["ราคา deploy แอป ai", "ราคา production readiness", "พาแอปขึ้น production"],
    breadcrumb: "ราคาแพ็กเกจ",
    title: "ราคาแพ็กเกจ",
    intro:
      "เริ่มจากการประเมิน Production ฟรี แล้วเลือกระดับความช่วยเหลือที่เหมาะกับแอปของคุณ ตั้งแต่รีวิวเชิงเทคนิค ไปจนถึงช่วย deploy และดูแลระบบหลังขึ้นจริง",
    note: "ราคาสุดท้ายยืนยันหลังจากเราดู stack, วิธีเข้าถึง repository, เป้าหมาย infrastructure และความเสี่ยง Production ปัจจุบัน",
    plans: [
      {
        name: "ประเมินฟรี",
        price: "$0",
        cadence: "ครั้งเดียว",
        description: "รีวิวแบบโฟกัสเพื่อบอกว่าอะไรยังขวางการขึ้น Production",
        cta: "ขอรับการประเมินฟรี",
        href: "/book-assessment",
        includes: [
          "รับข้อมูล repository และความพร้อม deploy",
          "สแกนความเสี่ยงด้าน security, delivery และ operations",
          "ให้ Production score พร้อมรายการปัญหาตามลำดับความสำคัญ",
          "ส่งขั้นตอนถัดไปภายใน 48 ชั่วโมง",
        ],
        bestFor: "เหมาะกับ founder ที่อยากรู้ช่องว่างก่อนเริ่มจ่ายเงินแก้ระบบ",
      },
      {
        name: "Readiness Review",
        price: "$750+",
        cadence: "รีวิวแบบ fixed scope",
        description: "รีวิวเชิงเทคนิคละเอียดขึ้น พร้อมแผน launch ที่ลงมือทำได้",
        cta: "ขอ Review",
        href: "/contact?type=readiness-review",
        featured: true,
        includes: [
          "รีวิว architecture, auth, secrets, data และ dependencies",
          "ประเมินความพร้อม deploy และ rollback",
          "ตรวจช่องว่างด้าน monitoring, backup และ incident response",
          "ส่ง remediation roadmap พร้อมคุยสรุปผล",
        ],
        bestFor: "เหมาะกับทีมที่ใกล้ launch และต้องการความมั่นใจก่อน go-live",
      },
      {
        name: "Launch Sprint",
        price: "$2,500+",
        cadence: "5-10 วัน",
        description: "ลงมือทำงาน Production เพื่อพาแอป deploy อย่างถูกต้อง",
        cta: "วางแผน Launch Sprint",
        href: "/contact?type=deployment",
        includes: [
          "ตั้งค่า production deployment",
          "จัดการ environment, secrets, CI/CD และ rollback workflow",
          "ตั้ง monitoring, logging, backups และ alert พื้นฐาน",
          "เสริมความปลอดภัยในจุดเสี่ยงสำคัญก่อน launch",
        ],
        bestFor: "เหมาะกับแอปที่สร้างด้วย AI แล้วต้องการวิศวกรช่วยพาขึ้นระบบจริง",
      },
      {
        name: "Production Partner",
        price: "$1,000+",
        cadence: "ต่อเดือน",
        description: "ดูแล Production ต่อเนื่องหลังแอปเปิดใช้งานจริง",
        cta: "คุยเรื่อง Support",
        href: "/contact?type=support",
        includes: [
          "ติดตาม Production และให้คำแนะนำด้าน operations",
          "ดูแล security และ dependency maintenance",
          "ช่วย incident support และปรับปรุง reliability",
          "รีวิวสุขภาพ Production รายเดือน",
        ],
        bestFor: "เหมาะกับทีมที่ต้องการคนดูแลระบบต่อเนื่องโดยไม่ต้องจ้าง full-time",
      },
    ],
    comparisonTitle: "ปัจจัยที่มีผลต่อราคา",
    comparisonRows: [
      { label: "ความซับซ้อนของ stack", value: "แอป service เดียวจะถูกกว่าระบบที่มีหลาย service, queue, worker หรือ AI pipeline" },
      { label: "พื้นที่เสี่ยงด้าน security", value: "ระบบจ่ายเงิน ข้อมูลผู้ใช้ admin access file upload และ LLM feature ต้องรีวิวลึกขึ้น" },
      { label: "เป้าหมาย infrastructure", value: "Hosting แบบ Vercel ใช้เวลาน้อยกว่า cloud custom, Docker, Kubernetes หรือ environment ที่มีข้อกำกับสูง" },
      { label: "สภาพระบบตอนนี้", value: "Repo ที่จัดระเบียบดี มี test และแยก environment แล้ว จะเดินเร็วกว่า prototype ที่มี production debt ซ่อนอยู่" },
    ],
    faqTitle: "คำถามเรื่องราคา",
    faqs: [
      {
        question: "ต้องจ่ายก่อนให้ดูแอปไหม?",
        answer: "ไม่ต้อง การประเมินครั้งแรกฟรี เพื่อให้เราเข้าใจแอปและแนะนำ scope ที่เหมาะสม",
      },
      {
        question: "ทำงานตามงบ fixed budget ได้ไหม?",
        answer: "ส่วนใหญ่ได้ เราจะแยกสิ่งที่ต้องแก้ก่อนขึ้น Production ออกจากสิ่งที่รอได้",
      },
      {
        question: "รับ equity หรือ revenue share ไหม?",
        answer: "ไม่รับ เราคิดค่าบริการงานวิศวกรรมโดยตรง เพื่อให้ ownership และ incentive ชัดเจน",
      },
    ],
    ctaHeading: "ยังไม่แน่ใจว่าเหมาะกับแพ็กเกจไหน?",
    ctaBody:
      "ส่งบริบทของแอปมาก่อน เราจะบอกให้ตรง ๆ ว่าคุณต้องการ review, launch sprint หรือแค่รายการแก้สั้น ๆ",
  },
};

async function currentLocale(): Promise<Locale> {
  return (await headers()).get("x-locale") === "th" ? "th" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const copy = pricingCopy[locale];
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/pricing",
    locale,
    keywords: copy.keywords,
  });
}

export default async function PricingPage() {
  const locale = await currentLocale();
  const dict = ui(locale);
  const copy = pricingCopy[locale];

  return (
    <>
      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: dict.common.home, path: localePath(locale, "/") },
              { name: copy.breadcrumb, path: localePath(locale, "/pricing") },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">{copy.intro}</p>
            <p className="mt-4 text-sm leading-6 text-slate-500">{copy.note}</p>
          </div>
        </div>
      </section>

      <section aria-label={copy.title} className="border-b border-ink-700/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-4">
            {copy.plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex rounded-xl border p-6 ${
                  plan.featured
                    ? "border-accent-500 bg-ink-900 shadow-[0_0_0_1px_rgba(34,211,238,0.18)]"
                    : "border-ink-700/60 bg-ink-900/70"
                }`}
              >
                <div className="flex w-full flex-col">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white">
                      {plan.name}
                    </h2>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight text-white">
                        {plan.price}
                      </span>
                      <span className="text-sm text-slate-500">{plan.cadence}</span>
                    </div>
                    <p className="mt-4 min-h-16 text-sm leading-6 text-slate-400">
                      {plan.description}
                    </p>
                  </div>

                  <Link
                    href={localePath(locale, plan.href)}
                    className={`mt-6 rounded-md px-4 py-3 text-center text-sm font-semibold transition-colors ${
                      plan.featured
                        ? "bg-accent-500 text-ink-950 hover:bg-accent-400"
                        : "border border-slate-600 text-white hover:border-accent-400 hover:text-accent-300"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-ink-700/60 pt-4 text-xs leading-5 text-slate-500">
                    {plan.bestFor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-700/60 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              {copy.comparisonTitle}
            </h2>
          </div>
          <div className="divide-y divide-ink-700/60 border-y border-ink-700/60">
            {copy.comparisonRows.map((row) => (
              <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[0.35fr_0.65fr]">
                <h3 className="font-semibold text-white">{row.label}</h3>
                <p className="leading-7 text-slate-400">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {copy.faqTitle}
          </h2>
          <div className="mt-8 divide-y divide-ink-700/60 border-y border-ink-700/60">
            {copy.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner locale={locale} heading={copy.ctaHeading} body={copy.ctaBody} />
    </>
  );
}
