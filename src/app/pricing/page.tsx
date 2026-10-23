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
    metaTitle: "Pricing — Security, Deployment, Integration & Care Plan",
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
        name: "Security Audit",
        price: "$750+",
        cadence: "fixed price",
        description: "Find and close the security holes before go-live.",
        cta: "Request an audit",
        href: "/services/security-audit",
        featured: true,
        includes: [
          "40+ checks incl. OWASP Top 10",
          "Secrets, access control, dependencies",
          "Findings report in 48 hours",
          "Optional fix and re-test",
        ],
        bestFor: "Best for: any AI-built system about to meet real users or real data.",
      },
      {
        name: "Deployment",
        price: "$2,500+",
        cadence: "1–2 weeks",
        description: "From running locally to a stable production system.",
        cta: "Plan a deployment",
        href: "/services/deployment",
        includes: [
          "Cloud or on-premise server",
          "Docker, staging and production",
          "CI/CD with one-click rollback",
          "Domain, SSL, secrets, handover",
        ],
        bestFor: "Best for: apps that work on a laptop but aren't properly online yet.",
      },
      {
        name: "Integration",
        price: "Custom",
        cadence: "scoped quote",
        description: "Connect the new system to the ones you already run.",
        cta: "Discuss an integration",
        href: "/services/integration",
        includes: [
          "ERP, accounting, SQL Server",
          "LINE OA, e-Tax Invoice, payments",
          "Scanners, handhelds, devices",
          "Migration with reconciliation",
        ],
        bestFor: "Best for: teams typing the same data into two systems.",
      },
      {
        name: "Care Plan",
        price: "$1,000+",
        cadence: "per month",
        description: "Hosting, monitoring, backups, and a team on call.",
        cta: "Ask about the Care Plan",
        href: "/services/care-plan",
        includes: [
          "Cloud or on-premise hosting",
          "Alerts to LINE or email",
          "Tested backups, security patches",
          "Monthly report",
        ],
        bestFor: "Best for: systems your business relies on every day.",
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
    metaTitle: "ราคาบริการ — ตรวจความปลอดภัย, Deploy, เชื่อมระบบ, ดูแลรายเดือน",
    metaDescription:
      "ราคาบริการสำหรับระบบที่สร้างด้วย AI: ตรวจความปลอดภัยราคาเหมา, deploy ขึ้นใช้งานจริง, เชื่อมต่อ ERP และระบบเดิม, ดูแลระบบรายเดือน ประเมินราคาฟรี โดย บริษัท โกอะลอง จำกัด",
    keywords: ["ราคาตรวจความปลอดภัยระบบ", "ราคา deploy ระบบ", "ราคาเชื่อมต่อระบบ ERP", "ค่าดูแลระบบรายเดือน", "ราคา MA ระบบ"],
    breadcrumb: "ราคาบริการ",
    title: "ราคาบริการ",
    intro:
      "4 บริการ เลือกใช้เฉพาะที่ต้องการ ทุกบริการเริ่มจากประเมินราคาฟรี ไม่มีข้อผูกมัด",
    note: "ราคาสุดท้ายยืนยันหลังจากเราดู stack, วิธีเข้าถึง repository, เป้าหมาย infrastructure และความเสี่ยง Production ปัจจุบัน",
    plans: [
      {
        name: "ตรวจความปลอดภัย",
        price: "ราคาเหมา",
        cadence: "ประเมินราคาฟรี",
        description: "หาช่องโหว่และปิดให้หมดก่อนใช้งานจริง",
        cta: "ขอตรวจความปลอดภัย",
        href: "/services/security-audit",
        featured: true,
        includes: [
          "ตรวจ 40+ จุด ครอบคลุม OWASP Top 10",
          "Secrets สิทธิ์ผู้ใช้ และ library",
          "รายงานภายใน 48 ชม.",
          "แก้และตรวจซ้ำ (เลือกได้)",
        ],
        bestFor: "เหมาะกับ: ระบบที่สร้างด้วย AI และกำลังจะให้คนใช้จริงหรือเก็บข้อมูลจริง",
      },
      {
        name: "เอาระบบขึ้นใช้งานจริง",
        price: "ราคาเหมา",
        cadence: "1-2 สัปดาห์",
        description: "จากรันได้ในเครื่อง สู่ระบบที่ออนไลน์และเสถียร",
        cta: "วางแผน Deploy",
        href: "/services/deployment",
        includes: [
          "Cloud หรือ server ในองค์กร",
          "Docker, staging และ production",
          "CI/CD ย้อนกลับได้ในคลิกเดียว",
          "Domain, SSL และส่งมอบเอกสาร",
        ],
        bestFor: "เหมาะกับ: ระบบที่รันได้ในเครื่อง แต่ยังไม่ได้ขึ้นออนไลน์อย่างถูกต้อง",
      },
      {
        name: "เชื่อมต่อระบบเดิม",
        price: "ตามขอบเขต",
        cadence: "ประเมินฟรี",
        description: "เชื่อมระบบใหม่เข้ากับระบบที่ใช้อยู่",
        cta: "ปรึกษางานเชื่อมระบบ",
        href: "/services/integration",
        includes: [
          "ERP โปรแกรมบัญชี SQL Server",
          "LINE OA, e-Tax Invoice, payment",
          "เครื่องสแกน handheld อุปกรณ์หน้างาน",
          "ย้ายข้อมูลพร้อมกระทบยอด",
        ],
        bestFor: "เหมาะกับ: ทีมที่ต้องคีย์ข้อมูลเดียวกันลงสองระบบ",
      },
      {
        name: "ดูแลระยะยาว",
        price: "รายเดือน",
        cadence: "ตรวจสุขภาพระบบฟรี",
        description: "Hosting, monitoring, backup และทีมรับเรื่อง",
        cta: "สอบถาม Care Plan",
        href: "/services/care-plan",
        includes: [
          "Hosting บน cloud หรือ server ของคุณ",
          "แจ้งเตือนผ่าน LINE หรืออีเมล",
          "Backup ทดสอบกู้คืน, security patch",
          "รายงานรายเดือน",
        ],
        bestFor: "เหมาะกับ: ระบบที่ธุรกิจต้องใช้ทุกวัน",
      },
    ],
    comparisonTitle: "ปัจจัยที่มีผลต่อราคา",
    comparisonRows: [
      { label: "ความซับซ้อนของ stack", value: "แอป service เดียวจะถูกกว่าระบบที่มีหลาย service, queue, worker หรือ AI pipeline" },
      { label: "พื้นที่เสี่ยงด้าน security", value: "ระบบจ่ายเงิน ข้อมูลผู้ใช้ admin access file upload และ LLM feature ต้องรีวิวลึกขึ้น" },
      { label: "เป้าหมาย infrastructure", value: "Hosting แบบ Vercel ใช้เวลาน้อยกว่า cloud custom, Docker, Kubernetes หรือ environment ที่มีข้อกำกับสูง" },
      { label: "จำนวนระบบที่ต้องเชื่อม", value: "ยิ่งเชื่อมหลายระบบ หรือระบบเดิมไม่มี API ยิ่งใช้เวลามากขึ้น" },
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
      "เล่าให้เราฟังว่าระบบของคุณทำอะไร เราจะบอกตรง ๆ ว่าควรเริ่มจากบริการไหน",
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
      <section className="border-b border-mint-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: dict.common.home, path: localePath(locale, "/") },
              { name: copy.breadcrumb, path: localePath(locale, "/pricing") },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{copy.intro}</p>
            <p className="mt-4 text-sm leading-6 text-slate-500">{copy.note}</p>
          </div>
        </div>
      </section>

      <section aria-label={copy.title} className="border-b border-mint-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-4">
            {copy.plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex rounded-xl border p-6 ${
                  plan.featured
                    ? "border-accent-500 bg-mint-50 shadow-[0_0_0_1px_rgba(52,169,111,0.25)]"
                    : "border-mint-200 bg-mint-50/80"
                }`}
              >
                <div className="flex w-full flex-col">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                      {plan.name}
                    </h2>
                    <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span
                        className={`whitespace-nowrap font-bold tracking-tight text-slate-900 ${
                          /^[$\d]/.test(plan.price) ? "text-4xl" : "text-3xl"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-sm text-slate-500">{plan.cadence}</span>
                    </div>
                    <p className="mt-4 min-h-16 text-sm leading-6 text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  <Link
                    href={localePath(locale, plan.href)}
                    className={`mt-6 rounded-md px-4 py-3 text-center text-sm font-semibold transition-colors ${
                      plan.featured
                        ? "bg-accent-500 text-accent-950 hover:bg-accent-300"
                        : "border border-mint-300 text-slate-900 hover:border-accent-400 hover:text-accent-700"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-mint-200 pt-4 text-xs leading-5 text-slate-500">
                    {plan.bestFor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-mint-200 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {copy.comparisonTitle}
            </h2>
          </div>
          <div className="divide-y divide-mint-200 border-y border-mint-200">
            {copy.comparisonRows.map((row) => (
              <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[0.35fr_0.65fr]">
                <h3 className="font-semibold text-slate-900">{row.label}</h3>
                <p className="leading-7 text-slate-500">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {copy.faqTitle}
          </h2>
          <div className="mt-8 divide-y divide-mint-200 border-y border-mint-200">
            {copy.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner locale={locale} heading={copy.ctaHeading} body={copy.ctaBody} />
    </>
  );
}
