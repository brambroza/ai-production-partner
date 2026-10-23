# SEO keyword plan (TH) — 4 core services

Service of GO Along Co., Ltd. (บริษัท โกอะลอง จำกัด). Keywords are chosen by
search intent, not measured volume — check impressions in Google Search Console
after 4–6 weeks and move budget/content to the terms that actually show up.

## 1. ตรวจความปลอดภัย / Security Audit — /th/services/security-audit

| Keyword | Intent | Target page |
|---|---|---|
| ตรวจระบบที่สร้างด้วย AI | buy | /th/services/security-audit |
| ตรวจโค้ดที่ AI เขียน | buy | /th |
| แก้ระบบที่ทำด้วย AI | buy | /th |
| รับแก้โปรแกรมที่ ChatGPT เขียน | buy | /th |
| audit ระบบ ก่อนใช้งานจริง | buy | /th/production-readiness-assessment |
| ตรวจสอบความปลอดภัยเว็บแอปพลิเคชัน | buy | /th/ai-security-audit |
| deploy แอปที่สร้างด้วย AI | buy | /th/services/deployment |
| vibe coding ขึ้น production | learn → buy | blog |

Blog / long-tail ideas (pull traffic, link to the service page):
- ใช้ ChatGPT เขียนโปรแกรมใช้ในบริษัท ปลอดภัยไหม
- 10 จุดที่ต้องเช็กก่อนเอาระบบที่ AI สร้างไปใช้จริง
- เอาแอปที่ทำจาก Lovable / Bolt ขึ้นใช้งานจริงต้องทำอะไรบ้าง
- API key หลุดจากโค้ดที่ AI เขียน — เกิดได้อย่างไร และป้องกันอย่างไร

## 2. เอาระบบขึ้นใช้งานจริง / Deployment — /th/services/deployment

| Keyword | Intent | Target page |
|---|---|---|
| รับ deploy ระบบ | buy | /th/services/deployment |
| เอาเว็บขึ้น server | buy | /th/services/deployment |
| ย้ายระบบขึ้น cloud | buy | /th/services/deployment |
| ตั้งค่า CI/CD | buy | /th/services/deployment |
| รับทำ docker | buy | /th/services/deployment |

Blog ideas:
- แอปที่ทำด้วย AI รันได้ในเครื่อง แต่เอาขึ้นจริงไม่ได้ เพราะอะไร
- Cloud หรือ server ในบริษัท แบบไหนเหมาะกับ SME

## 3. เชื่อมต่อระบบเดิม / Integration — /th/services/integration

| Keyword | Intent | Target page |
|---|---|---|
| รับเชื่อมต่อระบบ ERP | buy | /th/services/integration |
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

## 4. ดูแลระยะยาว / Care Plan — /th/services/care-plan

| Keyword | Intent | Target page |
|---|---|---|
| รับดูแลระบบรายเดือน | buy | /th/services/care-plan |
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

- `/th` metadata title, description, keywords → `src/app/page.tsx` (`homeThMetadata`)
- Per-service Thai/English metadata, copy, FAQ → `src/data/services.ts` (pages at `/services/<slug>`, Thai at `/th/services/<slug>`)
- English keywords → `src/app/page.tsx` (`enMetadata`)
- Organization + parent company + `knowsAbout` → `src/lib/schema.ts`

## Next steps worth doing

1. Dedicated Thai service pages now exist for the 4 core services; the older
   technical landing pages (e.g. /docker-deployment) are still English-only.
2. Link from goalong.co.th's services page to this site (and back) with the
   anchor text "ตรวจและดูแลระบบที่สร้างด้วย AI".
3. Submit the sitemap in Google Search Console for both `/` and `/th`.
