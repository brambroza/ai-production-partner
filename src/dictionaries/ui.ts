import type { Locale } from "@/lib/i18n";

/**
 * UI chrome dictionary — every interface string that isn't page content.
 * Page-body content lives in src/data (with .th variants); this file covers
 * navigation, buttons, labels, and shared section headings.
 */
export type UiDict = {
  nav: {
    services: string;
    solutions: string;
    framework: string;
    checklist: string;
    scoreTool: string;
    resources: string;
    blog: string;
    bookShort: string;
    toggleMenu: string;
    switchLabel: string;
    switchTarget: string;
  };
  cta: {
    primary: string;
    secondary: string;
    heading: string;
    body: string;
    trustLine: string;
    freeScore: string;
  };
  footer: {
    deployColumn: string;
    servicesColumn: string;
    resourcesColumn: string;
    companyColumn: string;
    tagline: string;
    rights: string;
    positioning: string;
    contact: string;
    bookFree: string;
    allSolutions: string;
    resourceCenter: string;
    blog: string;
    readinessChecklist: string;
    securityChecklist: string;
    freeScore: string;
  };
  common: {
    home: string;
    solutions: string;
    blog: string;
    resources: string;
    faqHeading: string;
    relatedServices: string;
    relatedArticles: string;
    problemsWeSolve: string;
    whatsIncluded: string;
    howItWorks: string;
    minRead: string;
    by: string;
    articlesCount: (n: number) => string;
    allCategory: string;
    articleInCategory: (n: number) => string;
    englishNotice: string;
    wantHandled: string;
    wantHandledBody: string;
    items: string;
    critical: string;
    freeToUse: string;
    resourcesFound: (n: number) => string;
    searchPlaceholder: (n: number) => string;
    filterByType: string;
    noResults: string;
    notFoundTitle: string;
    notFoundBody: string;
  };
  form: {
    name: string;
    company: string;
    needWhat: string;
    builtWith: string;
    builtWithPlaceholder: string;
    situation: string;
    situationPlaceholder: string;
    send: string;
    mailtoNote1: string;
    mailtoNote2: string;
    types: {
      freeAssessment: string;
      readinessReview: string;
      securityAudit: string;
      deployment: string;
      support: string;
      other: string;
    };
  };
};

const en: UiDict = {
  nav: {
    services: "Services",
    solutions: "Solutions",
    framework: "Framework",
    checklist: "Checklist",
    scoreTool: "Free Score Tool",
    resources: "Resources",
    blog: "Blog",
    bookShort: "Book Free Assessment",
    toggleMenu: "Toggle navigation menu",
    switchLabel: "เปลี่ยนเป็นภาษาไทย",
    switchTarget: "ไทย",
  },
  cta: {
    primary: "Book a Free Production Assessment",
    secondary: "Request a Production Readiness Review",
    heading: "Ready to take your AI-built app to production?",
    body: "Get a free, no-obligation production assessment. We review your architecture, security posture, and deployment readiness — and give you a concrete roadmap within 48 hours.",
    trustLine: "Response within one business day · NDA available · No lock-in",
    freeScore: "Get Your Free Production Score",
  },
  footer: {
    deployColumn: "Deploy AI-Built Apps",
    servicesColumn: "Services",
    resourcesColumn: "Resources",
    companyColumn: "Company",
    tagline:
      "Turn AI-generated applications into production-ready systems. We take applications built with Cursor, Claude Code, Lovable, Replit, and Bolt from prototype to secure, scalable, monitored production.",
    rights: "All rights reserved.",
    positioning:
      "Not a software house. Not a web agency. We make AI-built apps production-ready.",
    contact: "Contact",
    bookFree: "Book a Free Assessment",
    allSolutions: "All Solutions",
    resourceCenter: "Resource Center",
    blog: "Blog",
    readinessChecklist: "Production Readiness Checklist",
    securityChecklist: "AI App Security Checklist",
    freeScore: "Free AI Production Score",
  },
  common: {
    home: "Home",
    solutions: "Solutions",
    blog: "Blog",
    resources: "Resources",
    faqHeading: "Frequently asked questions",
    relatedServices: "Related services",
    relatedArticles: "Related articles",
    problemsWeSolve: "The problems we solve",
    whatsIncluded: "What's included",
    howItWorks: "How it works",
    minRead: "min read",
    by: "By",
    articlesCount: (n) =>
      `${n} technical guides on taking AI-built applications to production — deployment, security, performance, and operations.`,
    allCategory: "All",
    articleInCategory: (n) => `${n} article${n === 1 ? "" : "s"} in this category.`,
    englishNotice: "",
    wantHandled: "Want this handled for you?",
    wantHandledBody:
      "We take AI-built applications to production every week — assessment, hardening, deployment, and support. The initial production readiness assessment is free.",
    items: "items",
    critical: "marked critical",
    freeToUse: "Free to use — no signup required",
    resourcesFound: (n) => `${n} resource${n === 1 ? "" : "s"} found`,
    searchPlaceholder: (n) =>
      `Search ${n} resources — try "docker", "security", "lovable"…`,
    filterByType: "Filter by type",
    noResults:
      "Nothing matched. Try a broader term like “deploy”, “security”, or “monitoring”.",
    notFoundTitle: "This page isn't in production",
    notFoundBody:
      "The URL you followed doesn't exist (or was never deployed). Here's where to go instead:",
  },
  form: {
    name: "Your name",
    company: "Company (optional)",
    needWhat: "What do you need?",
    builtWith: "What was the app built with? (optional)",
    builtWithPlaceholder: "e.g. Cursor + Next.js + Supabase, currently on Replit",
    situation: "Tell us about your situation",
    situationPlaceholder:
      "What you built, where it runs today, and what's worrying you.",
    send: "Send inquiry",
    mailtoNote1: "Opens your email client with the message pre-filled — or write to us directly at",
    mailtoNote2: "Response within one business day. NDA available.",
    types: {
      freeAssessment: "Book a Free Production Assessment",
      readinessReview: "Request a Production Readiness Review",
      securityAudit: "AI Security Audit",
      deployment: "Deployment / Migration",
      support: "Ongoing Production Support",
      other: "Something else",
    },
  },
};

const th: UiDict = {
  nav: {
    services: "บริการ",
    solutions: "โซลูชัน",
    framework: "เฟรมเวิร์ก",
    checklist: "เช็คลิสต์",
    scoreTool: "เครื่องมือฟรี",
    resources: "คลังความรู้",
    blog: "บทความ",
    bookShort: "ขอรับการประเมินฟรี",
    toggleMenu: "เปิด/ปิดเมนู",
    switchLabel: "Switch to English",
    switchTarget: "EN",
  },
  cta: {
    primary: "ขอรับการประเมิน Production ฟรี",
    secondary: "ขอรับ Production Readiness Review",
    heading: "พร้อมพาแอปที่สร้างด้วย AI ขึ้น Production หรือยัง?",
    body: "รับการประเมินความพร้อม Production ฟรี ไม่มีข้อผูกมัด — เราตรวจสอบสถาปัตยกรรม ความปลอดภัย และความพร้อมในการ deploy พร้อมส่ง roadmap ที่ลงมือทำได้จริงภายใน 48 ชั่วโมง",
    trustLine: "ตอบกลับภายใน 1 วันทำการ · มี NDA ให้ · ไม่มี lock-in",
    freeScore: "เช็ค Production Score ฟรี",
  },
  footer: {
    deployColumn: "Deploy แอปที่สร้างด้วย AI",
    servicesColumn: "บริการ",
    resourcesColumn: "คลังความรู้",
    companyColumn: "บริษัท",
    tagline:
      "เปลี่ยนแอปพลิเคชันที่สร้างด้วย AI ให้เป็นระบบระดับ Production — เรารับช่วงต่อแอปที่สร้างด้วย Cursor, Claude Code, Lovable, Replit และ Bolt จาก prototype สู่ระบบที่ปลอดภัย ขยายตัวได้ และมี monitoring ครบ",
    rights: "สงวนลิขสิทธิ์",
    positioning:
      "เราไม่ใช่ software house ไม่ใช่ web agency — เราทำให้แอปที่สร้างด้วย AI พร้อมใช้งานจริงบน Production",
    contact: "ติดต่อเรา",
    bookFree: "ขอรับการประเมินฟรี",
    allSolutions: "โซลูชันทั้งหมด",
    resourceCenter: "คลังความรู้",
    blog: "บทความ",
    readinessChecklist: "เช็คลิสต์ความพร้อม Production",
    securityChecklist: "เช็คลิสต์ความปลอดภัยแอป AI",
    freeScore: "AI Production Score ฟรี",
  },
  common: {
    home: "หน้าแรก",
    solutions: "โซลูชัน",
    blog: "บทความ",
    resources: "คลังความรู้",
    faqHeading: "คำถามที่พบบ่อย",
    relatedServices: "บริการที่เกี่ยวข้อง",
    relatedArticles: "บทความที่เกี่ยวข้อง",
    problemsWeSolve: "ปัญหาที่เราแก้ให้",
    whatsIncluded: "สิ่งที่คุณจะได้รับ",
    howItWorks: "ขั้นตอนการทำงาน",
    minRead: "นาที",
    by: "โดย",
    articlesCount: (n) =>
      `${n} บทความเชิงเทคนิคเกี่ยวกับการพาแอปที่สร้างด้วย AI ขึ้น Production — ทั้ง deployment, security, performance และ operations`,
    allCategory: "ทั้งหมด",
    articleInCategory: (n) => `${n} บทความในหมวดนี้`,
    englishNotice:
      "บทความเชิงเทคนิคของเราเผยแพร่เป็นภาษาอังกฤษ — หากต้องการคำปรึกษาภาษาไทย ติดต่อทีมงานได้โดยตรง",
    wantHandled: "อยากให้เราจัดการเรื่องนี้ให้?",
    wantHandledBody:
      "เราพาแอปที่สร้างด้วย AI ขึ้น Production ทุกสัปดาห์ — ประเมิน เสริมความปลอดภัย deploy และดูแลต่อเนื่อง การประเมินความพร้อมครั้งแรกฟรี",
    items: "รายการ",
    critical: "รายการวิกฤต (Critical)",
    freeToUse: "ใช้ฟรี — ไม่ต้องสมัครสมาชิก",
    resourcesFound: (n) => `พบ ${n} รายการ`,
    searchPlaceholder: (n) =>
      `ค้นหาจาก ${n} รายการ — ลองพิมพ์ "docker", "security", "lovable"…`,
    filterByType: "กรองตามประเภท",
    noResults: "ไม่พบผลลัพธ์ ลองคำที่กว้างขึ้น เช่น “deploy”, “security” หรือ “monitoring”",
    notFoundTitle: "หน้านี้ยังไม่ถูก deploy ขึ้น Production",
    notFoundBody: "URL ที่คุณเปิดไม่มีอยู่จริง ลองไปที่หน้าเหล่านี้แทน:",
  },
  form: {
    name: "ชื่อของคุณ",
    company: "บริษัท (ไม่บังคับ)",
    needWhat: "ต้องการบริการอะไร?",
    builtWith: "แอปสร้างด้วยอะไร? (ไม่บังคับ)",
    builtWithPlaceholder: "เช่น Cursor + Next.js + Supabase ตอนนี้รันบน Replit",
    situation: "เล่าสถานการณ์ของคุณ",
    situationPlaceholder: "สร้างอะไรไว้ ตอนนี้รันอยู่ที่ไหน และกังวลเรื่องอะไร",
    send: "ส่งข้อความ",
    mailtoNote1: "ระบบจะเปิดโปรแกรมอีเมลพร้อมข้อความที่กรอกไว้ — หรือเขียนถึงเราโดยตรงที่",
    mailtoNote2: "ตอบกลับภายใน 1 วันทำการ มี NDA ให้",
    types: {
      freeAssessment: "ขอรับการประเมิน Production ฟรี",
      readinessReview: "ขอรับ Production Readiness Review",
      securityAudit: "ตรวจสอบความปลอดภัย (AI Security Audit)",
      deployment: "Deployment / ย้ายระบบ",
      support: "ดูแลระบบ Production ต่อเนื่อง",
      other: "เรื่องอื่น ๆ",
    },
  },
};

const dictionaries: Record<Locale, UiDict> = { en, th };

/** Returns the UI dictionary for a locale. */
export function ui(locale: Locale): UiDict {
  return dictionaries[locale];
}
