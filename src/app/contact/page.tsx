import type { Metadata } from "next";
import { headers } from "next/headers";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { ui } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Props = { searchParams: Promise<{ type?: string }> };

const metadataCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  en: {
    title: "Contact — Talk to a Production Engineer",
    description:
      "Contact AI Production Partner: free production assessments, readiness reviews, security audits, and deployment inquiries. Straight technical answers within one business day.",
    keywords: ["contact ai production partner", "production assessment inquiry"],
  },
  th: {
    title: "ติดต่อเรา — คุยกับวิศวกร Production",
    description:
      "ติดต่อ AI Production Partner เพื่อขอรับการประเมิน Production ฟรี, Production Readiness Review, ตรวจสอบความปลอดภัย และปรึกษาการ deploy ระบบ พร้อมคำตอบเชิงเทคนิคภายใน 1 วันทำการ",
    keywords: ["ติดต่อ ai production partner", "ประเมิน production ฟรี"],
  },
};

const pageCopy: Record<
  Locale,
  {
    title: string;
    intro: string;
    email: string;
    nextHeading: string;
    nextBody: string;
  }
> = {
  en: {
    title: "Contact",
    intro:
      "Tell us what you built and where it needs to run. A production engineer — not a salesperson — reads every inquiry and replies within one business day.",
    email: "Email",
    nextHeading: "What happens next",
    nextBody:
      "We reply with either a straight answer or a short list of questions. If you want the free assessment, we'll send the access checklist (NDA first if you prefer) — and you get your scored findings report within 48 hours of repository access.",
  },
  th: {
    title: "ติดต่อเรา",
    intro:
      "เล่าให้เราฟังว่าคุณสร้างแอปอะไรไว้ และต้องการให้รันที่ไหน วิศวกร Production จะอ่านทุกข้อความด้วยตัวเอง ไม่ใช่ฝ่ายขาย และตอบกลับภายใน 1 วันทำการ",
    email: "อีเมล",
    nextHeading: "ขั้นตอนถัดไป",
    nextBody:
      "เราจะตอบกลับด้วยคำตอบตรงประเด็น หรือรายการคำถามสั้น ๆ หากคุณต้องการรับการประเมินฟรี เราจะส่งเช็คลิสต์สำหรับการเข้าถึงระบบให้ (ทำ NDA ก่อนก็ได้) และคุณจะได้รับรายงานผลประเมินพร้อมคะแนนภายใน 48 ชั่วโมงหลังจากเราเข้าถึง repository ได้",
  },
};

async function currentLocale(): Promise<Locale> {
  return (await headers()).get("x-locale") === "th" ? "th" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  return pageMetadata({
    ...metadataCopy[locale],
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const locale = await currentLocale();
  const dict = ui(locale);
  const copy = pageCopy[locale];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          crumbs={[
            { name: dict.common.home, path: "/" },
            { name: copy.title, path: "/contact" },
          ]}
        />
        <div className="mt-10 grid gap-14 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {copy.intro}
            </p>
            <dl className="mt-10 space-y-6 text-slate-300">
              <div>
                <dt className="text-sm font-semibold text-slate-400">
                  {copy.email}
                </dt>
                <dd className="mt-1">
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
                  {copy.nextHeading}
                </dt>
                <dd className="mt-1 leading-7">
                  {copy.nextBody}
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-xl border border-ink-700/60 bg-ink-900 p-8">
            <ContactForm defaultType={type} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
