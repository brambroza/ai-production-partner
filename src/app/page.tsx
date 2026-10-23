import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";
import FaqList from "@/components/FaqList";
import HomeMotion from "@/components/HomeMotion";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { aiBuilders, coreOffers, coreOffersTh, homeFaq } from "@/data/homepage";

const enMetadata: Metadata = pageMetadata({
  title: "AI Production Partner — Audit, Integrate & Maintain AI-Built Systems",
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
    "ai app rescue",
    "ai generated code audit",
    "vibe coding production",
    "system integration erp",
    "managed hosting and maintenance",
    "software house thailand",
    "GO Along",
  ],
});

type HomeCopy = {
  hero: {
    pill: string;
    titleA: string;
    titleB: string;
    sub: string;
    primary: string;
    secondary: string;
    builtWith: string;
    stats: { count: number; suffix: string; label: string }[];
  };
  why: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  offers: { eyebrow: string; title: string; lede: string; more: string };
  steps: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  cta: { title: string; body: string; button: string; callLabel: string };
};

const en: HomeCopy = {
  hero: {
    pill: "A service of GO Along Co., Ltd.",
    titleA: "AI builds the system.",
    titleB: "We make it work for real.",
    sub: "Audit, integrate, and look after what you built with AI — so it's safe and running every day.",
    primary: "Request an audit",
    secondary: "See the 3 services",
    builtWith: "For systems built with",
    stats: [
      { count: 40, suffix: "+", label: "checks per audit" },
      { count: 48, suffix: " hrs", label: "to your findings report" },
      { count: 100, suffix: "%", label: "code and data stay yours" },
    ],
  },
  why: {
    eyebrow: "The gap",
    title: "Built with AI. Not ready for real users yet.",
    items: [
      { title: "Security", body: "Leaked API keys and missing permission checks stay invisible until someone exploits them." },
      { title: "Your existing systems", body: "AI can't reach your servers, database, or shop-floor devices." },
      { title: "Nobody looking after it", body: "No backups, no monitoring — when it breaks at 2 a.m., no one fixes it." },
    ],
  },
  offers: {
    eyebrow: "3 core services",
    title: "Audit. Integrate. Maintain.",
    lede: "Take one, or all three.",
    more: "See every service in detail",
  },
  steps: {
    eyebrow: "How it works",
    title: "Three steps to a system you can trust",
    items: [
      { title: "Send us your system", body: "Repository access under NDA." },
      { title: "Get the report", body: "Findings ranked by risk, plus a fixed price." },
      { title: "We fix, connect, and maintain", body: "Pick what you need. We stay on call." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    items: [0, 1, 3, 5, 8].map((i) => homeFaq[i]),
  },
  cta: {
    title: "Tell us what you built",
    body: "We reply within one business day with a straight technical answer.",
    button: "Request an audit",
    callLabel: "Call",
  },
};

const th: HomeCopy = {
  hero: {
    pill: "บริการจาก บริษัท โกอะลอง จำกัด",
    titleA: "AI สร้างระบบได้",
    titleB: "เราทำให้ใช้งานจริงได้",
    sub: "ตรวจ เชื่อม และดูแลระบบที่คุณสร้างด้วย AI ให้ปลอดภัย และรันได้ทุกวัน",
    primary: "ขอตรวจระบบ",
    secondary: "ดู 3 บริการ",
    builtWith: "รองรับระบบที่สร้างจาก",
    stats: [
      { count: 40, suffix: "+", label: "จุดที่เราตรวจ" },
      { count: 48, suffix: " ชม.", label: "รู้ผลการตรวจ" },
      { count: 100, suffix: "%", label: "โค้ดและข้อมูลเป็นของคุณ" },
    ],
  },
  why: {
    eyebrow: "ปัญหาที่เจอบ่อย",
    title: "สร้างด้วย AI ได้ แต่ยังไม่พร้อมให้คนใช้จริง",
    items: [
      { title: "ความปลอดภัย", body: "API key หลุด สิทธิ์ผู้ใช้ไม่ครบ มองไม่เห็นจนกว่าจะโดนโจมตี" },
      { title: "เชื่อมของเดิมไม่ได้", body: "AI เข้าไม่ถึง server ฐานข้อมูล และอุปกรณ์หน้างานของคุณ" },
      { title: "ไม่มีคนดูแล", body: "ไม่มี backup ไม่มี monitoring ล่มตอนตีสองก็ไม่มีใครแก้" },
    ],
  },
  offers: {
    eyebrow: "3 บริการหลัก",
    title: "ตรวจ เชื่อม ดูแล",
    lede: "เลือกบริการเดียว หรือใช้ครบทั้งสามก็ได้",
    more: "ดูรายละเอียดบริการทั้งหมด",
  },
  steps: {
    eyebrow: "ขั้นตอน",
    title: "3 ขั้นตอน สู่ระบบที่ไว้ใจได้",
    items: [
      { title: "ส่งระบบมาให้ตรวจ", body: "เปิดสิทธิ์ดูโค้ด พร้อมเซ็น NDA" },
      { title: "รับรายงานและราคา", body: "จุดเสี่ยงเรียงตามความสำคัญ พร้อมราคาเหมา" },
      { title: "แก้ เชื่อม และดูแลต่อ", body: "เลือกเฉพาะที่ต้องการ มีทีมคอยรับเรื่อง" },
    ],
  },
  faq: {
    eyebrow: "คำถามที่พบบ่อย",
    title: "คำถามที่พบบ่อย",
    items: [
      {
        question: "ใช้ AI สร้างระบบเองได้แล้ว ทำไมต้องจ้างเรา?",
        answer: "สร้างด้วย AI ต่อไปได้เลย เพราะเร็วจริง สิ่งที่ AI ไม่ได้ให้คือความรับผิดชอบ ทั้งการตรวจว่าปลอดภัย การเชื่อมกับระบบเดิม และคนที่คอยดูแลให้ระบบรันได้ทุกวัน",
      },
      {
        question: "AI Production Partner คือใคร?",
        answer: "เป็นบริการของ บริษัท โกอะลอง จำกัด software house ในสมุทรปราการ ที่ทำระบบ เว็บ แอป และดูแล network, server, backup ให้ธุรกิจไทย",
      },
      {
        question: "การตรวจระบบได้อะไรบ้าง?",
        answer: "รายงานจุดเสี่ยงจากการตรวจ 40+ จุด พร้อมคะแนนความพร้อม และแผนแก้แบบราคาเหมา รู้ผลภายใน 48 ชั่วโมง",
      },
      {
        question: "เชื่อมกับ ERP หรือฐานข้อมูลเดิมได้ไหม?",
        answer: "ได้ ทั้ง ERP โปรแกรมบัญชี SQL Server, MySQL, PostgreSQL, LINE OA, e-Tax Invoice และอุปกรณ์หน้างาน",
      },
      {
        question: "Care Plan รายเดือนดูแลอะไรบ้าง?",
        answer: "Hosting, monitoring แจ้งเตือนผ่าน LINE, backup พร้อมทดสอบกู้คืน, security patch และรายงานรายเดือน",
      },
    ],
  },
  cta: {
    title: "เล่าให้เราฟังว่าคุณสร้างอะไรไว้",
    body: "ตอบกลับภายใน 1 วันทำการ ด้วยคำตอบเชิงเทคนิคที่ตรงประเด็น",
    button: "ขอตรวจระบบ",
    callLabel: "โทร",
  },
};

const homeThMetadata = {
  title: "ตรวจ เชื่อม และดูแลระบบที่สร้างด้วย AI | AI Production Partner by โกอะลอง",
  description:
    "รับตรวจระบบที่สร้างด้วย ChatGPT, Claude, Cursor ก่อนใช้งานจริง (ราคาเหมา รู้ผล 48 ชม.) เชื่อมต่อ ERP ฐานข้อมูล อุปกรณ์หน้างาน และดูแล hosting, backup, security รายเดือน โดย บริษัท โกอะลอง จำกัด",
  keywords: [
    "ตรวจระบบที่สร้างด้วย AI",
    "ตรวจโค้ดที่ AI เขียน",
    "แก้ระบบที่ทำด้วย AI",
    "รับแก้โปรแกรมที่ ChatGPT เขียน",
    "audit ระบบ ก่อนใช้งานจริง",
    "ตรวจสอบความปลอดภัยเว็บแอปพลิเคชัน",
    "รับเชื่อมต่อระบบ ERP",
    "เชื่อม API กับ ERP",
    "เชื่อมระบบกับ SQL Server",
    "รับทำ system integration",
    "เชื่อม LINE OA กับระบบ",
    "รับดูแลระบบรายเดือน",
    "รับดูแลเว็บไซต์และ server รายเดือน",
    "managed hosting ประเทศไทย",
    "บริการ backup ข้อมูลบริษัท",
    "deploy แอปที่สร้างด้วย AI",
    "vibe coding ขึ้น production",
    "software house สมุทรปราการ",
    "โกอะลอง",
    "GO Along",
  ],
};

/** Small centered heading used by every section. */
function Heading({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div data-reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-wide text-accent-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {lede && <p className="mt-4 text-lg text-slate-600">{lede}</p>}
    </div>
  );
}

export function generateMetadata(): Metadata {
  return enMetadata;
}

export function HomeContent({ locale = "en" }: { locale?: Locale }) {
  const t = locale === "th" ? th : en;
  const offers = locale === "th" ? coreOffersTh : coreOffers;
  const path = (href: string) => localePath(locale, href);

  return (
    <HomeMotion>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-b from-mint-50 via-white to-white"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            data-blob
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent-200/60 blur-3xl sm:h-[28rem] sm:w-[28rem]"
          />
          <div
            data-blob
            className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-mint-300/50 blur-3xl sm:h-96 sm:w-96"
          />
          <div
            data-blob
            className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-accent-100 blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <p
            data-hero
            className="inline-flex items-center gap-2 rounded-full border border-mint-300 bg-white/80 px-4 py-1.5 text-sm font-medium text-accent-700 backdrop-blur"
          >
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent-500" />
            {t.hero.pill}
          </p>
          <h1
            id="hero-heading"
            className="mt-8 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl sm:leading-tight"
          >
            <span data-hero className="block">
              {t.hero.titleA}
            </span>
            <span data-hero className="block text-accent-600">
              {t.hero.titleB}
            </span>
          </h1>
          <p data-hero className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            {t.hero.sub}
          </p>
          <div
            data-hero
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href={path(site.primaryCta.href)}
              className="w-full rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-accent-950 shadow-[0_8px_24px_-10px_rgba(35,137,90,0.6)] transition hover:-translate-y-0.5 hover:bg-accent-400 sm:w-auto"
            >
              {t.hero.primary}
            </Link>
            <a
              href="#services"
              className="w-full rounded-full border border-mint-300 bg-white px-8 py-3.5 font-semibold text-slate-800 transition hover:border-accent-400 hover:text-accent-700 sm:w-auto"
            >
              {t.hero.secondary} ↓
            </a>
          </div>

          <dl data-hero className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-slate-500">{stat.label}</dt>
                <dd className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  <span data-count={stat.count}>{stat.count}</span>
                  <span className="text-accent-600">{stat.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="relative border-t border-mint-200 bg-white/60 py-8">
          <p className="text-center text-xs font-semibold tracking-wide text-slate-500">
            {t.hero.builtWith}
          </p>
          <ul className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4">
            {aiBuilders.map((tool) => (
              <li key={tool.slug} className="flex items-center gap-2 text-slate-500">
                <BrandLogo slug={tool.slug} label={tool.name} className="h-5 w-5" />
                <span className="text-sm font-medium">{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The gap */}
      <section aria-labelledby="why-heading" className="bg-mint-50/70 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Heading eyebrow={t.why.eyebrow} title={t.why.title} />
          <ol data-stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {t.why.items.map((item, index) => (
              <li key={item.title} className="rounded-2xl border border-mint-200 bg-white p-6">
                <span className="font-mono text-sm font-semibold text-accent-600">
                  0{index + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core offers */}
      <section aria-labelledby="services-heading" id="services" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Heading eyebrow={t.offers.eyebrow} title={t.offers.title} lede={t.offers.lede} />
          <ol data-stagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <li
                key={offer.id}
                id={offer.id}
                className="group flex flex-col rounded-3xl border border-mint-200 bg-white p-7 shadow-[0_1px_2px_rgba(10,42,28,0.04),0_12px_32px_-18px_rgba(27,110,72,0.25)] transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-[0_20px_40px_-20px_rgba(27,110,72,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-100 font-mono text-lg font-bold text-accent-800 transition group-hover:bg-accent-200">
                    {index + 1}
                  </span>
                  <span className="rounded-full bg-mint-50 px-3 py-1 text-xs font-semibold text-accent-700 ring-1 ring-mint-200">
                    {offer.tag}
                  </span>
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {offer.label}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{offer.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{offer.hook}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-mint-200 pt-6 text-sm leading-6 text-slate-700">
                  {offer.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-[11px] text-accent-700"
                      >
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path(offer.cta.href)}
                  className="mt-8 block rounded-full bg-mint-50 px-5 py-3 text-center font-semibold text-accent-800 ring-1 ring-mint-300 transition group-hover:bg-accent-500 group-hover:text-accent-950 group-hover:ring-accent-500"
                >
                  {offer.cta.label} →
                </Link>
              </li>
            ))}
          </ol>
          <p data-reveal className="mt-10 text-center">
            <Link
              href={path("/solutions")}
              className="text-sm font-semibold text-accent-700 underline-offset-4 hover:underline"
            >
              {t.offers.more} →
            </Link>
          </p>
        </div>
      </section>

      {/* Steps */}
      <section aria-labelledby="steps-heading" className="bg-mint-50/70 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Heading eyebrow={t.steps.eyebrow} title={t.steps.title} />
          <div className="relative mt-14">
            <div
              aria-hidden="true"
              className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-0.5 rounded bg-mint-200 md:block"
            >
              <div data-progress className="h-full origin-left rounded bg-accent-400" />
            </div>
            <ol data-stagger className="relative grid gap-8 md:grid-cols-3">
              {t.steps.items.map((step, index) => (
                <li key={step.title} className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-mint-50 bg-accent-500 font-mono text-lg font-bold text-accent-950">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs leading-7 text-slate-600">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Heading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div data-reveal className="mt-12">
            <FaqList items={t.faq.items} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-heading" id="contact" className="px-4 pb-24 sm:px-6">
        <div
          data-reveal
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-accent-100 via-mint-100 to-white px-6 py-14 text-center ring-1 ring-mint-300 sm:px-12"
        >
          <div
            aria-hidden="true"
            data-blob
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-200/70 blur-3xl"
          />
          <h2
            id="cta-heading"
            className="relative text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t.cta.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-600">{t.cta.body}</p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={path(site.primaryCta.href)}
              className="w-full rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-accent-950 transition hover:-translate-y-0.5 hover:bg-accent-400 sm:w-auto"
            >
              {t.cta.button}
            </Link>
            <a
              href={site.phoneHref}
              className="w-full rounded-full border border-mint-300 bg-white px-8 py-3.5 font-semibold text-slate-800 transition hover:border-accent-400 sm:w-auto"
            >
              {t.cta.callLabel} {site.phone}
            </a>
          </div>
          <p className="relative mt-6 text-sm text-slate-600">
            <a href={`mailto:${site.email}`} className="font-medium text-accent-700 hover:underline">
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </HomeMotion>
  );
}

export default function HomePage() {
  return <HomeContent locale="en" />;
}

export function thaiHomeMetadata(): Metadata {
  return pageMetadata({
    title: homeThMetadata.title,
    description: homeThMetadata.description,
    path: "/",
    locale: "th",
    keywords: homeThMetadata.keywords,
  });
}
