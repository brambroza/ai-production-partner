import type { Locale } from "@/lib/i18n";

/**
 * The four core services, each with its own page at /services/<slug>
 * (Thai at /th/services/<slug>). Copy is intentionally short: three
 * problems, six inclusions, a few steps, and four FAQs per page.
 */
export type ServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  label: string;
  name: string;
  title: string;
  sub: string;
  hook: string;
  bullets: [string, string, string];
  problems: { title: string; body: string }[];
  includes: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  pricing: { model: string; note: string };
  faq: { question: string; answer: string }[];
  cta: string;
};

export type Service = {
  slug: "security-audit" | "deployment" | "integration" | "care-plan";
  contactType: string;
  /** Existing English deep-dive pages to link from the service page. */
  related: { name: string; href: string }[];
  copy: Record<Locale, ServiceCopy>;
};

export const services: Service[] = [
  {
    slug: "security-audit",
    contactType: "security-audit",
    related: [
      { name: "AI Security Audit", href: "/ai-security-audit" },
      { name: "Production Readiness Assessment", href: "/production-readiness-assessment" },
      { name: "AI App Security Checklist", href: "/ai-app-security-checklist" },
    ],
    copy: {
      en: {
        metaTitle: "Security Audit for AI-Built Apps — Fixed Price, 48-Hour Findings",
        metaDescription:
          "Security audit for systems built with ChatGPT, Claude Code, Cursor, Lovable, or Bolt. 40+ checks, findings in 48 hours, fixed-price remediation plan. By GO Along Co., Ltd.",
        keywords: ["ai app security audit", "ai generated code security review", "vibe coding security", "owasp audit thailand"],
        label: "Security Audit",
        name: "Security",
        title: "Find the holes before someone else does",
        sub: "A security audit for systems built with AI. 40+ checks, findings in 48 hours, and a fixed-price plan to fix them.",
        hook: "Leaked keys, missing permission checks, and exposed data — found and fixed.",
        bullets: ["40+ checks, OWASP Top 10 included", "Findings report in 48 hours", "NDA signed before we see code"],
        problems: [
          { title: "Keys and passwords in the code", body: "AI tools often hardcode API keys, and they end up in the repository." },
          { title: "Anyone can read anyone's data", body: "The button is hidden on screen, but the API never checks permissions." },
          { title: "You'd never know you were breached", body: "No logs, no alerts — you find out when the data is already out." },
        ],
        includes: [
          { title: "Secrets and API keys", body: "Find exposed keys, rotate them, and move them to proper storage." },
          { title: "Access control", body: "Check every endpoint enforces who can see and change what." },
          { title: "Injection and input", body: "SQL injection, XSS, and unvalidated input — the OWASP Top 10." },
          { title: "Dependencies", body: "Libraries with known vulnerabilities, flagged and patched." },
          { title: "Personal data", body: "Where personal data is stored and who can reach it (PDPA risk areas)." },
          { title: "Fix and re-test", body: "If you hire us to fix it, we verify every finding is closed." },
        ],
        steps: [
          { title: "Share access", body: "Repository access under NDA." },
          { title: "Audit in 48 hours", body: "Every finding ranked by risk." },
          { title: "Walk-through and quote", body: "What to fix first, at a fixed price." },
          { title: "Fix and re-test", body: "Optional — we close the gaps and prove it." },
        ],
        pricing: { model: "Fixed price", note: "Free quote. Price depends on the size of the system and number of APIs." },
        faq: [
          { question: "Do you need full access to our code?", answer: "Read access to the repository is enough. We sign an NDA before looking at anything." },
          { question: "Will the audit break our live system?", answer: "No. We review code and configuration; any active testing is agreed with you first and run against a non-production environment where possible." },
          { question: "Do we have to hire you to fix the findings?", answer: "No. The report is yours, and your team can fix it. Many clients ask us to fix the critical items." },
          { question: "Is this a PDPA certification?", answer: "No. We point out where personal data is at risk in the system. Legal compliance sign-off is a separate matter for your legal advisor." },
        ],
        cta: "Request a security audit",
      },
      th: {
        metaTitle: "ตรวจความปลอดภัยระบบที่สร้างด้วย AI | ราคาเหมา รู้ผล 48 ชม.",
        metaDescription:
          "รับตรวจความปลอดภัย (security audit) ระบบที่สร้างด้วย ChatGPT, Claude Code, Cursor, Lovable, Bolt ตรวจ 40+ จุด รู้ผลภายใน 48 ชม. พร้อมแผนแก้ราคาเหมา โดย บริษัท โกอะลอง จำกัด",
        keywords: ["ตรวจความปลอดภัยระบบ", "ตรวจโค้ดที่ AI เขียน", "security audit ราคา", "ตรวจช่องโหว่เว็บแอป", "ตรวจระบบที่สร้างด้วย AI", "รับแก้ช่องโหว่เว็บ"],
        label: "Security Audit",
        name: "ตรวจความปลอดภัย",
        title: "หาช่องโหว่ ก่อนคนอื่นจะเจอ",
        sub: "ตรวจความปลอดภัยระบบที่สร้างด้วย AI 40+ จุด รู้ผลภายใน 48 ชม. พร้อมแผนแก้แบบราคาเหมา",
        hook: "API key หลุด สิทธิ์ผู้ใช้รั่ว ข้อมูลเปิดโล่ง หาให้เจอและปิดให้หมด",
        bullets: ["ตรวจ 40+ จุด ครอบคลุม OWASP Top 10", "รู้ผลภายใน 48 ชม.", "เซ็น NDA ก่อนเปิดดูโค้ด"],
        problems: [
          { title: "API key และรหัสผ่านอยู่ในโค้ด", body: "AI มักฝัง key ไว้ในโค้ด แล้วหลุดขึ้น GitHub ไปด้วย" },
          { title: "ใครก็เปิดดูข้อมูลคนอื่นได้", body: "หน้าจอซ่อนปุ่มไว้ แต่ API ไม่ได้เช็กสิทธิ์จริง" },
          { title: "โดนเจาะแล้วก็ไม่รู้", body: "ไม่มี log ไม่มีแจ้งเตือน รู้อีกทีตอนข้อมูลหลุดไปแล้ว" },
        ],
        includes: [
          { title: "Secrets และ API key", body: "หา key ที่หลุด เปลี่ยนใหม่ และย้ายไปเก็บในที่ปลอดภัย" },
          { title: "สิทธิ์การเข้าถึง", body: "ตรวจว่าทุก API เช็กจริงว่าใครดูหรือแก้อะไรได้" },
          { title: "Injection และ input", body: "SQL injection, XSS และ input ที่ไม่ถูกตรวจ ตาม OWASP Top 10" },
          { title: "Library ที่มีช่องโหว่", body: "หา dependency ที่มีช่องโหว่ที่รู้กันแล้ว และอัปเดตให้" },
          { title: "ข้อมูลส่วนบุคคล", body: "ชี้จุดที่เก็บข้อมูลส่วนบุคคล และใครเข้าถึงได้ (จุดเสี่ยงด้าน PDPA)" },
          { title: "แก้แล้วตรวจซ้ำ", body: "ถ้าจ้างเราแก้ เราตรวจซ้ำจนปิดครบทุกข้อ" },
        ],
        steps: [
          { title: "เปิดสิทธิ์ดูโค้ด", body: "เซ็น NDA ก่อนทุกครั้ง" },
          { title: "ตรวจภายใน 48 ชม.", body: "จุดเสี่ยงเรียงตามความรุนแรง" },
          { title: "สรุปผลและเสนอราคา", body: "อะไรต้องแก้ก่อน พร้อมราคาเหมา" },
          { title: "แก้และตรวจซ้ำ", body: "เลือกได้ เราปิดช่องโหว่และพิสูจน์ให้ดู" },
        ],
        pricing: { model: "ราคาเหมา", note: "ประเมินราคาฟรี ราคาขึ้นกับขนาดระบบและจำนวน API" },
        faq: [
          { question: "ต้องให้สิทธิ์เข้าถึงโค้ดทั้งหมดไหม?", answer: "สิทธิ์อ่าน repository อย่างเดียวก็พอ และเราเซ็น NDA ก่อนเปิดดูทุกครั้ง" },
          { question: "ตรวจแล้วระบบที่ใช้งานอยู่จะล่มไหม?", answer: "ไม่ เราตรวจจากโค้ดและการตั้งค่าเป็นหลัก ถ้าต้องทดสอบจริงจะตกลงกับคุณก่อน และทำบน environment ทดสอบเมื่อทำได้" },
          { question: "ต้องจ้างเราแก้ต่อไหม?", answer: "ไม่บังคับ รายงานเป็นของคุณ ทีมคุณแก้เองได้ ลูกค้าส่วนใหญ่ให้เราแก้เฉพาะข้อที่ร้ายแรง" },
          { question: "นี่คือการรับรอง PDPA หรือเปล่า?", answer: "ไม่ใช่ เราชี้จุดที่ข้อมูลส่วนบุคคลมีความเสี่ยงในระบบ การรับรองด้านกฎหมายต้องปรึกษาที่ปรึกษากฎหมายของคุณ" },
        ],
        cta: "ขอตรวจความปลอดภัย",
      },
    },
  },
  {
    slug: "deployment",
    contactType: "deployment",
    related: [
      { name: "Docker Deployment", href: "/docker-deployment" },
      { name: "Cloud Deployment Services", href: "/cloud-deployment-services" },
      { name: "CI/CD Pipeline Setup", href: "/ci-cd-pipeline-setup" },
    ],
    copy: {
      en: {
        metaTitle: "Deploy AI-Built Apps to Production — Cloud or On-Premise",
        metaDescription:
          "Take the app you built with AI from 'runs on my machine' to a stable production system: Docker, staging and production, CI/CD with rollback, domain and SSL. By GO Along Co., Ltd.",
        keywords: ["deploy ai generated app", "deploy app to production", "ci cd setup thailand", "docker deployment service"],
        label: "Deployment",
        name: "Deployment",
        title: "From “runs on my machine” to running for real",
        sub: "We put your AI-built system online — stable, repeatable, and easy to roll back — on cloud or your own server.",
        hook: "Online, stable, and updates that don't take the system down.",
        bullets: ["Cloud or on-premise server", "Staging + production, CI/CD", "One-click rollback"],
        problems: [
          { title: "It only runs on one laptop", body: "Nobody else knows how to start it, let alone put it online." },
          { title: "Every update breaks something", body: "Changes go straight to users with no way back." },
          { title: "Living on a free preview", body: "No backups, no SLA, and limits that hit at the worst time." },
        ],
        includes: [
          { title: "Where it runs", body: "Vercel, AWS, Google Cloud, Azure, DigitalOcean, or your own server." },
          { title: "Docker", body: "A clean, repeatable build that runs the same everywhere." },
          { title: "Staging and production", body: "Test changes safely before customers see them." },
          { title: "CI/CD", body: "Automatic deploys on every push, with one-click rollback." },
          { title: "Domain, SSL, secrets", body: "Proper environment settings — no keys in the code." },
          { title: "Handover", body: "Basic monitoring, backups, and a short runbook your team can follow." },
        ],
        steps: [
          { title: "Review the app", body: "Stack, data, and where it should live." },
          { title: "Fixed-price plan", body: "Scope, timeline, and price agreed upfront." },
          { title: "Deploy", body: "Usually one to two weeks." },
          { title: "Go live", body: "Monitored launch, then handover." },
        ],
        pricing: { model: "Fixed price", note: "Free quote. Usually one to two weeks of work." },
        faq: [
          { question: "Cloud or our own server?", answer: "Either. We recommend based on cost, data rules, and who will look after it. Many Thai SMEs keep data on-premise and that's fine." },
          { question: "Will we be locked in to you?", answer: "No. Everything runs in your accounts or on your server, and we hand over the setup and documentation." },
          { question: "Can we keep building with AI afterwards?", answer: "Yes — that's the point of CI/CD and staging: you keep shipping fast, and every change goes through checks first." },
          { question: "What if something goes wrong at launch?", answer: "We're on standby during go-live, and rollback is one click." },
        ],
        cta: "Plan a deployment",
      },
      th: {
        metaTitle: "รับ Deploy ระบบที่สร้างด้วย AI ขึ้นใช้งานจริง | Cloud หรือ Server ในองค์กร",
        metaDescription:
          "เอาระบบที่สร้างด้วย AI จาก 'รันได้แค่ในเครื่อง' ขึ้นใช้งานจริงอย่างเสถียร ทั้ง Docker, staging/production, CI/CD พร้อม rollback, domain และ SSL บน cloud หรือ server ของคุณ โดย บริษัท โกอะลอง จำกัด",
        keywords: ["deploy แอปที่สร้างด้วย AI", "รับ deploy ระบบ", "เอาเว็บขึ้น server", "ย้ายระบบขึ้น cloud", "ตั้งค่า CI/CD", "รับทำ docker"],
        label: "Deployment",
        name: "เอาระบบขึ้นใช้งานจริง",
        title: "จากรันได้ในเครื่อง สู่ระบบที่ใช้งานจริง",
        sub: "เอาระบบที่คุณสร้างด้วย AI ขึ้นออนไลน์ เสถียร อัปเดตได้ไม่ล่ม และย้อนกลับได้ บน cloud หรือ server ของคุณเอง",
        hook: "ขึ้นออนไลน์ได้จริง อัปเดตทีไรไม่ต้องลุ้นว่าจะล่ม",
        bullets: ["Cloud หรือ server ในองค์กร", "แยก staging / production พร้อม CI/CD", "ย้อนกลับเวอร์ชันได้ในคลิกเดียว"],
        problems: [
          { title: "รันได้แค่ในเครื่องเดียว", body: "คนอื่นเปิดไม่เป็น และไม่รู้จะเอาขึ้นออนไลน์ยังไง" },
          { title: "อัปเดตทีไรระบบพัง", body: "แก้แล้วขึ้นไปหาผู้ใช้ทันที ไม่มีทางย้อนกลับ" },
          { title: "ยังอยู่บน preview ฟรี", body: "ไม่มี backup ไม่มี SLA และชนลิมิตในเวลาที่แย่ที่สุด" },
        ],
        includes: [
          { title: "เลือกที่วางระบบ", body: "Vercel, AWS, Google Cloud, Azure, DigitalOcean หรือ server ของคุณ" },
          { title: "Docker", body: "build ระบบให้สะอาด รันที่ไหนก็ได้ผลเหมือนกัน" },
          { title: "แยก staging / production", body: "ทดสอบก่อนถึงมือลูกค้าทุกครั้ง" },
          { title: "CI/CD", body: "push แล้ว deploy อัตโนมัติ ย้อนกลับได้ในคลิกเดียว" },
          { title: "Domain, SSL, secrets", body: "ตั้งค่า environment ให้ถูก ไม่มี key อยู่ในโค้ด" },
          { title: "ส่งมอบ", body: "monitoring และ backup พื้นฐาน พร้อมคู่มือสั้น ๆ ให้ทีมคุณ" },
        ],
        steps: [
          { title: "ดูระบบ", body: "stack ข้อมูล และที่ที่ควรวางระบบ" },
          { title: "เสนอแผนราคาเหมา", body: "ขอบเขต ระยะเวลา และราคาชัดก่อนเริ่ม" },
          { title: "Deploy", body: "โดยทั่วไป 1-2 สัปดาห์" },
          { title: "ขึ้นใช้งานจริง", body: "มีทีมเฝ้าตอน go-live แล้วส่งมอบ" },
        ],
        pricing: { model: "ราคาเหมา", note: "ประเมินราคาฟรี งานทั่วไปใช้เวลา 1-2 สัปดาห์" },
        faq: [
          { question: "ใช้ cloud หรือ server ของบริษัทดี?", answer: "ได้ทั้งสองแบบ เราแนะนำตามค่าใช้จ่าย ข้อกำหนดเรื่องข้อมูล และคนที่จะดูแลต่อ SME หลายรายเก็บข้อมูลไว้ในองค์กร ก็ทำได้" },
          { question: "จะติดอยู่กับเราไหม?", answer: "ไม่ ระบบอยู่ในบัญชีหรือ server ของคุณ และเราส่งมอบการตั้งค่าพร้อมเอกสารให้ครบ" },
          { question: "หลังจากนี้ยังใช้ AI พัฒนาต่อได้ไหม?", answer: "ได้ นั่นคือเหตุผลที่มี CI/CD และ staging คุณพัฒนาต่อได้เร็วเหมือนเดิม และทุกการแก้ผ่านการตรวจก่อน" },
          { question: "ถ้ามีปัญหาตอนขึ้นระบบล่ะ?", answer: "เรามีทีมเฝ้าระหว่าง go-live และย้อนกลับเวอร์ชันเดิมได้ในคลิกเดียว" },
        ],
        cta: "วางแผน Deploy",
      },
    },
  },
  {
    slug: "integration",
    contactType: "integration",
    related: [
      { name: "Architecture Review", href: "/architecture-review" },
      { name: "Deploy .NET APIs", href: "/deploy-dotnet-apis" },
      { name: "Deploy Mobile Backends", href: "/deploy-mobile-backends" },
    ],
    copy: {
      en: {
        metaTitle: "System Integration — Connect AI-Built Apps to ERP, Databases & Devices",
        metaDescription:
          "Connect the system you built with AI to your existing ERP, accounting software, on-premise SQL Server, LINE OA, e-Tax Invoice, payment gateways, and shop-floor devices. By GO Along Co., Ltd.",
        keywords: ["erp integration thailand", "connect app to sql server", "line oa integration", "e-tax invoice integration", "system integration service"],
        label: "System Integration",
        name: "Integration",
        title: "Connect the new system to the one you already run",
        sub: "ERP, accounting, databases, and shop-floor devices — so data flows correctly and nobody types it twice.",
        hook: "The part AI can't reach: your servers, data, and devices.",
        bullets: ["ERP, accounting, SQL Server", "LINE OA, e-Tax Invoice, payments", "Scanners, handhelds, devices"],
        problems: [
          { title: "Typing the same data twice", body: "Orders go into the new app, then again into the ERP." },
          { title: "AI can't see inside your company", body: "It has no access to your servers, database, or devices." },
          { title: "Numbers that don't match", body: "Stock in one system, a different figure in the other." },
        ],
        includes: [
          { title: "ERP and accounting", body: "Through their API, the database, or import files — whatever is safe." },
          { title: "On-premise databases", body: "SQL Server, MySQL, PostgreSQL, reached through a secure API layer." },
          { title: "LINE OA", body: "Notifications, bookings, and status updates via the LINE Messaging API." },
          { title: "e-Tax Invoice and payments", body: "Connect invoicing and payment gateways into your flow." },
          { title: "Shop-floor devices", body: "Barcode scanners, handhelds, scales, and supplier APIs." },
          { title: "Migration and reconciliation", body: "Move data across and check the totals match." },
        ],
        steps: [
          { title: "Map the systems", body: "What talks to what, and which data is the source of truth." },
          { title: "Scoped quote", body: "Price and timeline per connection." },
          { title: "Build and test", body: "On test data first, then a controlled switch-over." },
          { title: "Monitor", body: "Alerts if a sync fails, so it never fails silently." },
        ],
        pricing: { model: "Scoped quote", note: "Free assessment. Price depends on the number of systems and how they can be reached." },
        faq: [
          { question: "Our ERP has no API. Can you still connect it?", answer: "Usually yes — through the database with read-only access, scheduled file exports, or a small connector service. We pick the safest route." },
          { question: "Will you touch our production database?", answer: "Only with your approval, with least-privilege accounts, and after testing on a copy." },
          { question: "Do you work on-site?", answer: "Yes. We're in Samut Prakan and can work on-site for network and device work." },
          { question: "Who looks after the integration later?", answer: "We can, under the monthly Care Plan — including alerts when a sync fails." },
        ],
        cta: "Discuss an integration",
      },
      th: {
        metaTitle: "รับเชื่อมต่อระบบ ERP ฐานข้อมูล และอุปกรณ์หน้างาน | System Integration",
        metaDescription:
          "รับเชื่อมระบบที่สร้างด้วย AI เข้ากับ ERP โปรแกรมบัญชี SQL Server ในองค์กร LINE OA, e-Tax Invoice, payment gateway และอุปกรณ์หน้างาน ให้ข้อมูลไหลถูกต้อง ไม่ต้องคีย์ซ้ำ โดย บริษัท โกอะลอง จำกัด",
        keywords: ["รับเชื่อมต่อระบบ ERP", "เชื่อม API กับ ERP", "เชื่อมระบบกับ SQL Server", "รับทำ system integration", "เชื่อม LINE OA กับระบบ", "เชื่อมระบบ e-Tax Invoice"],
        label: "System Integration",
        name: "เชื่อมต่อระบบเดิม",
        title: "เชื่อมระบบใหม่ เข้ากับระบบที่ใช้อยู่",
        sub: "ERP โปรแกรมบัญชี ฐานข้อมูล และอุปกรณ์หน้างาน ให้ข้อมูลไหลถูกต้อง ไม่ต้องคีย์ซ้ำสองรอบ",
        hook: "ส่วนที่ AI เข้าไม่ถึง: server ข้อมูล และอุปกรณ์ของคุณ",
        bullets: ["ERP โปรแกรมบัญชี SQL Server", "LINE OA, e-Tax Invoice, payment", "เครื่องสแกน handheld อุปกรณ์หน้างาน"],
        problems: [
          { title: "คีย์ข้อมูลซ้ำสองระบบ", body: "รับออเดอร์ในแอปใหม่ แล้วต้องคีย์ลง ERP อีกรอบ" },
          { title: "AI มองไม่เห็นข้างในบริษัท", body: "เข้าไม่ถึง server ฐานข้อมูล หรืออุปกรณ์ของคุณ" },
          { title: "ตัวเลขไม่ตรงกัน", body: "สต็อกในระบบหนึ่ง ไม่เท่ากับอีกระบบ" },
        ],
        includes: [
          { title: "ERP และโปรแกรมบัญชี", body: "ผ่าน API ฐานข้อมูล หรือไฟล์นำเข้า เลือกทางที่ปลอดภัยที่สุด" },
          { title: "ฐานข้อมูลในองค์กร", body: "SQL Server, MySQL, PostgreSQL ผ่าน API กลางที่ปลอดภัย" },
          { title: "LINE OA", body: "แจ้งเตือน จองคิว และอัปเดตสถานะผ่าน LINE Messaging API" },
          { title: "e-Tax Invoice และการชำระเงิน", body: "เชื่อมใบกำกับภาษีอิเล็กทรอนิกส์และ payment gateway" },
          { title: "อุปกรณ์หน้างาน", body: "เครื่องสแกนบาร์โค้ด handheld เครื่องชั่ง และ API ซัพพลายเออร์" },
          { title: "ย้ายและกระทบยอดข้อมูล", body: "ย้ายข้อมูลข้ามระบบ แล้วตรวจยอดให้ตรงกัน" },
        ],
        steps: [
          { title: "วาดภาพระบบ", body: "อะไรคุยกับอะไร ข้อมูลไหนคือตัวจริง" },
          { title: "เสนอราคาตามขอบเขต", body: "ราคาและเวลาแยกตามแต่ละจุดเชื่อม" },
          { title: "สร้างและทดสอบ", body: "ทดสอบกับข้อมูลจำลองก่อน แล้วค่อยสลับใช้จริง" },
          { title: "เฝ้าระวัง", body: "แจ้งเตือนทันทีเมื่อ sync ล้มเหลว" },
        ],
        pricing: { model: "ตามขอบเขตงาน", note: "ประเมินฟรี ราคาขึ้นกับจำนวนระบบและวิธีที่เชื่อมต่อได้" },
        faq: [
          { question: "ERP ของเราไม่มี API เชื่อมได้ไหม?", answer: "ส่วนใหญ่ได้ ผ่านฐานข้อมูลแบบอ่านอย่างเดียว ไฟล์ export ตามรอบ หรือ connector ตัวเล็ก ๆ เราเลือกทางที่ปลอดภัยที่สุด" },
          { question: "จะไปแตะฐานข้อมูลจริงของเราไหม?", answer: "เฉพาะเมื่อคุณอนุมัติ ใช้บัญชีที่สิทธิ์น้อยที่สุด และทดสอบกับสำเนาข้อมูลก่อนเสมอ" },
          { question: "เข้าไปทำงานที่บริษัทได้ไหม?", answer: "ได้ เราอยู่สมุทรปราการ เข้าหน้างานได้สำหรับงาน network และอุปกรณ์" },
          { question: "หลังเชื่อมเสร็จ ใครดูแลต่อ?", answer: "เราดูแลต่อได้ใน Care Plan รายเดือน รวมถึงแจ้งเตือนเมื่อ sync ล้มเหลว" },
        ],
        cta: "ปรึกษางานเชื่อมระบบ",
      },
    },
  },
  {
    slug: "care-plan",
    contactType: "support",
    related: [
      { name: "Ongoing Production Support", href: "/ongoing-production-support" },
      { name: "Monitoring & Logging Setup", href: "/monitoring-logging-setup" },
      { name: "Backup & Disaster Recovery", href: "/backup-disaster-recovery" },
    ],
    copy: {
      en: {
        metaTitle: "Managed Hosting + Care Plan — Monthly Maintenance for AI-Built Systems",
        metaDescription:
          "Monthly care plan for the systems you built: hosting on cloud or on-premise, monitoring with LINE alerts, tested backups, security patches, and a team that answers. By GO Along Co., Ltd.",
        keywords: ["managed hosting thailand", "monthly maintenance software", "website maintenance plan", "server maintenance thailand"],
        label: "Managed Hosting + Care Plan",
        name: "Long-term care",
        title: "A monthly plan that keeps your system running",
        sub: "Hosting, monitoring, backups, and security patches in one plan — with a team that answers when something breaks.",
        hook: "Hosting, monitoring, and backups that actually restore.",
        bullets: ["Cloud or your own server", "LINE alerts when it breaks", "Tested backups, monthly report"],
        problems: [
          { title: "The person who built it is gone", body: "Nobody else knows how it runs or how to fix it." },
          { title: "Backups nobody has tested", body: "You only find out they don't work on the worst day." },
          { title: "Customers notice first", body: "The system is down and the first alert is a phone call." },
        ],
        includes: [
          { title: "Hosting", body: "On cloud, or on your own server on-premise." },
          { title: "Monitoring", body: "Uptime and error alerts to LINE or email." },
          { title: "Backups", body: "Automated, and restores tested on a schedule." },
          { title: "Security upkeep", body: "Patches, dependency updates, firewall (Fortinet FortiGate), SSL." },
          { title: "Fixes and small changes", body: "Issues handled and small improvements within the plan." },
          { title: "Monthly report", body: "Uptime, incidents, and what we changed — in plain language." },
        ],
        steps: [
          { title: "Health check", body: "We review the system before taking it on." },
          { title: "Pick a plan", body: "Based on size and response time you need." },
          { title: "Onboard", body: "Monitoring and backups set up in week one." },
          { title: "Every month", body: "Report, patches, and a team on call." },
        ],
        pricing: { model: "Monthly", note: "Free health check. Price depends on system size and response time." },
        faq: [
          { question: "Can you look after a system someone else built?", answer: "Yes — that's the usual case. We start with a health check, then take it on." },
          { question: "Do you support on-premise servers?", answer: "Yes. GO Along already maintains network, security, server, and backup infrastructure for clients." },
          { question: "How fast do you respond?", answer: "Response time is agreed per plan, so you know exactly what to expect." },
          { question: "Can we cancel?", answer: "Yes. Everything stays in your accounts, and we hand over documentation when you leave." },
        ],
        cta: "Ask about the Care Plan",
      },
      th: {
        metaTitle: "รับดูแลระบบรายเดือน | Managed Hosting, Backup, Security Patch",
        metaDescription:
          "บริการดูแลระบบรายเดือน ทั้ง hosting บน cloud หรือ server ในองค์กร monitoring แจ้งเตือนผ่าน LINE, backup ที่ทดสอบกู้คืนจริง, security patch และทีมรับเรื่องเมื่อระบบมีปัญหา โดย บริษัท โกอะลอง จำกัด",
        keywords: ["รับดูแลระบบรายเดือน", "รับดูแลเว็บไซต์และ server รายเดือน", "MA ระบบ", "managed hosting ประเทศไทย", "บริการ backup ข้อมูลบริษัท", "สัญญาดูแลระบบ"],
        label: "Managed Hosting + Care Plan",
        name: "ดูแลระยะยาว",
        title: "ดูแลรายเดือน ให้ระบบรันได้ทุกวัน",
        sub: "Hosting, monitoring, backup และ security patch ในแพ็กเดียว มีทีมรับเรื่องเมื่อระบบมีปัญหา",
        hook: "มีที่วาง มีคนเฝ้า และมี backup ที่กู้คืนได้จริง",
        bullets: ["Cloud หรือ server ของคุณเอง", "แจ้งเตือนผ่าน LINE เมื่อมีปัญหา", "Backup ทดสอบกู้คืน รายงานรายเดือน"],
        problems: [
          { title: "คนทำระบบไม่อยู่แล้ว", body: "ไม่มีใครรู้ว่าระบบรันยังไง หรือแก้ตรงไหน" },
          { title: "Backup ที่ไม่เคยทดสอบ", body: "มารู้ว่ากู้คืนไม่ได้ ในวันที่แย่ที่สุด" },
          { title: "ลูกค้ารู้ก่อนเรา", body: "ระบบล่ม แล้วสัญญาณแรกคือโทรศัพท์จากลูกค้า" },
        ],
        includes: [
          { title: "Hosting", body: "บน cloud หรือ server ในองค์กรของคุณ" },
          { title: "Monitoring", body: "แจ้งเตือนระบบล่มหรือ error ผ่าน LINE หรืออีเมล" },
          { title: "Backup", body: "สำรองอัตโนมัติ และทดสอบกู้คืนตามรอบ" },
          { title: "ดูแลความปลอดภัย", body: "security patch, อัปเดต library, firewall (Fortinet FortiGate), SSL" },
          { title: "แก้ปัญหาและปรับเล็กน้อย", body: "รับแจ้งปัญหา และปรับปรุงเล็ก ๆ ตามแพ็กเกจ" },
          { title: "รายงานรายเดือน", body: "uptime เหตุขัดข้อง และสิ่งที่เราแก้ อ่านเข้าใจง่าย" },
        ],
        steps: [
          { title: "ตรวจสุขภาพระบบ", body: "เราดูระบบก่อนรับดูแล" },
          { title: "เลือกแพ็กเกจ", body: "ตามขนาดระบบและความเร็วตอบกลับที่ต้องการ" },
          { title: "เริ่มดูแล", body: "ตั้ง monitoring และ backup ในสัปดาห์แรก" },
          { title: "ทุกเดือน", body: "รายงาน อัปเดต และมีทีมคอยรับเรื่อง" },
        ],
        pricing: { model: "รายเดือน", note: "ตรวจสุขภาพระบบฟรี ราคาขึ้นกับขนาดระบบและเวลาตอบกลับที่ต้องการ" },
        faq: [
          { question: "ระบบที่คนอื่นทำ ดูแลได้ไหม?", answer: "ได้ และเป็นกรณีที่เจอบ่อยที่สุด เราเริ่มจากตรวจสุขภาพระบบ แล้วค่อยรับดูแล" },
          { question: "ดูแล server ในบริษัทได้ไหม?", answer: "ได้ โกอะลองดูแล network, security, server และ backup ให้ลูกค้าองค์กรอยู่แล้ว" },
          { question: "ตอบกลับเร็วแค่ไหน?", answer: "กำหนดเวลาตอบกลับตามแพ็กเกจ คุณรู้ล่วงหน้าว่าจะได้อะไร" },
          { question: "ยกเลิกได้ไหม?", answer: "ได้ ระบบอยู่ในบัญชีของคุณ และเราส่งมอบเอกสารให้ครบเมื่อยกเลิก" },
        ],
        cta: "สอบถาม Care Plan",
      },
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
