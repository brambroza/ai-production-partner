# SEO keyword plan (TH) — 3 core services

Service of GO Along Co., Ltd. (บริษัท โกอะลอง จำกัด). Keywords are chosen by
search intent, not measured volume — check impressions in Google Search Console
after 4–6 weeks and move budget/content to the terms that actually show up.

## 1. AI App Rescue / ตรวจระบบก่อนใช้งานจริง (entry offer, fixed price)

| Keyword | Intent | Target page |
|---|---|---|
| ตรวจระบบที่สร้างด้วย AI | buy | /th (section #rescue) |
| ตรวจโค้ดที่ AI เขียน | buy | /th |
| แก้ระบบที่ทำด้วย AI | buy | /th |
| รับแก้โปรแกรมที่ ChatGPT เขียน | buy | /th |
| audit ระบบ ก่อนใช้งานจริง | buy | /th/production-readiness-assessment |
| ตรวจสอบความปลอดภัยเว็บแอปพลิเคชัน | buy | /th/ai-security-audit |
| deploy แอปที่สร้างด้วย AI | buy | /th |
| vibe coding ขึ้น production | learn → buy | blog |

Blog / long-tail ideas (pull traffic, link to #rescue):
- ใช้ ChatGPT เขียนโปรแกรมใช้ในบริษัท ปลอดภัยไหม
- 10 จุดที่ต้องเช็กก่อนเอาระบบที่ AI สร้างไปใช้จริง
- เอาแอปที่ทำจาก Lovable / Bolt ขึ้นใช้งานจริงต้องทำอะไรบ้าง
- API key หลุดจากโค้ดที่ AI เขียน — เกิดได้อย่างไร และป้องกันอย่างไร

## 2. เชื่อมต่อระบบ (System Integration)

| Keyword | Intent | Target page |
|---|---|---|
| รับเชื่อมต่อระบบ ERP | buy | /th (section #integration) |
| เชื่อม API กับ ERP | buy | /th |
| เชื่อมระบบกับ SQL Server | buy | /th |
| รับทำ system integration | buy | /th |
| เชื่อม LINE OA กับระบบ | buy | /th |
| เชื่อมระบบ e-Tax Invoice | buy | /th |
| ย้ายข้อมูลจากระบบเก่า | buy | /th |

Blog ideas:
- เชื่อมแอปที่สร้างเองกับ ERP เดิม ทำได้ 3 วิธี
- ดึงข้อมูลจาก SQL Server ในโรงงานขึ้นเว็บอย่างปลอดภัย
- ต่อเครื่องสแกนบาร์โค้ด / handheld กับระบบคลังที่ทำเอง

## 3. Managed Hosting + Care Plan รายเดือน (recurring)

| Keyword | Intent | Target page |
|---|---|---|
| รับดูแลระบบรายเดือน | buy | /th (section #care-plan) |
| รับดูแลเว็บไซต์และ server รายเดือน | buy | /th/ongoing-production-support |
| managed hosting ประเทศไทย | buy | /th |
| บริการ backup ข้อมูลบริษัท | buy | /th/backup-disaster-recovery |
| MA ระบบ / สัญญาดูแลระบบ | buy | /th |

Blog ideas:
- ระบบที่สร้างเองล่มตีสอง ใครแก้? เช็กลิสต์ก่อนไม่มีคนดูแล
- backup แล้วกู้คืนไม่ได้ — ทำไมต้องทดสอบ restore ทุกเดือน

## Brand / local

- โกอะลอง, GO Along, บริษัท โกอะลอง จำกัด
- software house สมุทรปราการ, รับทำระบบโรงงาน สมุทรปราการ

## Where these keywords live in code

- `/th` metadata title, description, keywords → `src/app/page.tsx` (`homeTh.metadata`)
- English keywords → `src/app/page.tsx` (`enMetadata`)
- Service copy (headings carry the keywords) → `src/data/homepage.ts` (`coreOffers`, `coreOffersTh`)
- Organization + parent company + `knowsAbout` → `src/lib/schema.ts`

## Next steps worth doing

1. Dedicated Thai pages per service (one URL per keyword cluster) — today the
   service landing pages are English-only, so `/th/<slug>` serves English copy.
2. Link from goalong.co.th's services page to this site (and back) with the
   anchor text "ตรวจและดูแลระบบที่สร้างด้วย AI".
3. Submit the sitemap in Google Search Console for both `/` and `/th`.
