# Outreach Kit — AI Production Partner

เป้าหมาย: หา **10–15 free assessment แรก** ภายใน 90 วัน เพื่อปิด 3–4 ดีล + เก็บ case study
กลไกหลัก: **ให้ค่าก่อน (free Production Score / free assessment) → ค่อยเสนอ** — ห้าม pitch เย็นๆ ห้ามสแปมลิงก์

ICP (ลูกค้าในฝัน): founder / solo dev / CTO ที่ **สร้างแอปด้วย AI เสร็จแล้ว** (Cursor, Claude Code, Lovable, Replit, Bolt, v0) แต่ยังไม่กล้าเปิดใช้จริง — กลัว security, ไม่มี monitoring, อยู่บน preview URL

---

## 1. ที่ที่ ICP อยู่ (เรียงตามความคุ้ม)

### Tier 1 — ตรงกลุ่มสุด, pain สดๆ (เริ่มที่นี่)
| ช่องทาง | ทำไม | วิธีเข้า |
|---------|------|---------|
| **Lovable Discord / community** | คนเพิ่ง vibe-code เสร็จ ถามเรื่อง deploy/security ทุกวัน | ตอบคำถามจริง 2–3 ข้อ/วัน แบบ helpful ไม่ขาย |
| **Replit / Bolt (StackBlitz) community** | เดียวกัน — คนติดปัญหา "จาก prototype ไป production" | เดียวกัน |
| **r/SaaS, r/indiehackers, r/vibecoding** | โพสต์ "just shipped my MVP" / "how do I deploy" เยอะ | comment ช่วยจริง + ปักลิงก์ free tool เฉพาะเมื่อเกี่ยวจริง |
| **X/Twitter #buildinpublic #vibecoding** | reply คนที่เพิ่ง launch หรือบ่นเรื่อง downtime/security | reply 5/วัน |
| **Indie Hackers forum** | กลุ่ม founder ที่จริงจังเรื่องทำเงิน | ตอบ thread + โพสต์ "I audited N AI-built apps, here's what breaks" |

### Tier 2 — ดีลใหญ่กว่า, cycle ยาวกว่า
| ช่องทาง | ทำไม |
|---------|------|
| **LinkedIn** | founder/CTO สาย fintech/health โพสต์ว่าใช้ AI ทำ MVP → ticket สูง, hardening ขายง่าย |
| **Product Hunt (makers)** | คนเพิ่ง launch แอป AI-built = pain "ของจริงเข้าแล้ว scale ไหวไหม" |
| **Hacker News** | "Show HN" / "Ask HN: deploy/security" — comment ที่มีสาระได้ traffic ดี |

### Tier 3 — traffic ก้อน (ยิงเป็น event)
- **ปล่อย Production Score tool บน Product Hunt / Show HN / r/SideProject** (1 ครั้ง, สัปดาห์ 3)
- **Thai communities** (secondary): กลุ่ม FB no-code/SaaS ไทย, Creatorsgarten, ThaiJS — ถ้าจะจับตลาดไทยด้วย

---

## 2. Templates (copy ไปใช้ได้เลย — ปรับให้เป็นเสียงตัวเอง)

> ภาษาอังกฤษเพราะ ICP ส่วนใหญ่เป็น global indie hacker ที่ใช้ Cursor/Lovable

### A) Community reply — value-first (Discord/Reddit)
ใช้เมื่อมีคนถามเรื่อง deploy/security/production

```
The gap between "it works in the preview" and "real users can hit it" usually
comes down to 4 things AI tools never prompt for:

1. Secrets — check for hardcoded API keys (grep your repo for "sk-", "key=")
2. Authz — every endpoint should verify *who* is calling, not just that they're logged in
3. Backups — if your DB is on a free tier, you have no restore path today
4. Monitoring — right now your users find outages before you do

If you want, I run a free production readiness scan on repos like this —
happy to point out what's actually risky vs. fine. No pitch, just the list.
```

### B) X reply — คนเพิ่ง ship
```
Congrats on shipping 🚀 One thing that bites AI-built apps right after launch:
hardcoded secrets + no backups. Takes 20 min to check.

Built a free scanner for exactly this (runs in your browser, code never leaves
your machine): [link]. Curious what it flags for yours.
```

### C) X reply — คนบ่นเรื่อง downtime/security/incident
```
Been there. The pattern with AI-built apps is the "invisible 40%" — envs,
monitoring, backups — never gets generated because the demo didn't need it.

Wrote up why this happens + how to fix in order: [blog link]. Happy to look
at your specific setup if useful.
```

### D) LinkedIn DM — founder/CTO (ticket สูง)
```
Hi {name} — saw you built {product} with {AI tool}. Nice.

I help founders take AI-built apps from "works in demo" to "survives real
users + a security review" — hardening, deployment, monitoring, backups.

Not selling anything here: I do a free 48h production readiness assessment
(scored, with a prioritized findings list). If it's useful before your next
raise / enterprise deal, happy to run it. If not, no worries.
```

### E) Cold email (สำหรับ lead ที่หามาเอง)
```
Subject: quick production risk on {product}?

Hi {name},

{product} looks great — I noticed it's built with {AI tool}. The apps I see
built that way almost always ship with 2–3 silent production risks (exposed
secrets, missing authz, no backups) that don't show up until a real user or
attacker finds them.

I run a free, no-obligation production readiness scan: 40+ checkpoints, scored,
delivered in 48h. You keep the report either way.

Want me to run it on {product}?

— {you}, AI Production Partner
{site link}
```

### F) Follow-up หลังส่ง free assessment (โมเมนต์ปิดเงิน) ★
```
Here's your production readiness report — score {X}/100, findings ranked by risk.

The 3 things I'd fix before real traffic: {1}, {2}, {3}.

Two ways forward:
• You fix the quick wins in-house — the report has everything you need, no cost.
• I do it: fixed-price Launch Sprint, {N} days, secrets + authz + deploy +
  monitoring + backups. Fixed scope, no hourly billing.

Want the fixed-price proposal? I can have it to you today.
```

### G) โพสต์สร้าง audience (X / LinkedIn / IH) — โพสต์ 2–3 ครั้ง/สัปดาห์
```
I keep seeing the same 5 things break when AI-built apps meet real users:

1. API keys hardcoded in the repo
2. Endpoints with auth but no *authorization*
3. Database on a free tier with zero backups
4. No error tracking → users report outages, not your dashboard
5. One person knows how to deploy, and it's manual

None of these are "AI writes bad code." They're the 40% nobody prompts for.
Thread on fixing each 👇
```

---

## 3. Cadence รายวัน (~45–60 นาที/วัน)
- **5** X replies (Tier 1 targets) + **1** original post (3×/สัปดาห์)
- **3** community answers (Lovable/Replit/Reddit) — helpful ก่อน, ลิงก์เมื่อเกี่ยวจริง
- **5** LinkedIn/cold DM ไป ICP ที่ research มา
- Log ทุก touch ลง sheet: ชื่อ / ช่อง / วันที่ / สถานะ (replied / assessment / proposal / closed)

**เป้ารายสัปดาห์:** 3–5 คนตอบรับ → 2–3 free assessment

## 4. ห้ามทำ (โดนแบน/เสียเครดิต)
- ❌ วางลิงก์ในโพสต์แรกก่อนช่วยอะไรเลย
- ❌ ก็อป template เป๊ะๆ ส่งหว่าน (personalize ชื่อ + product ทุกครั้ง)
- ❌ อ้าง case study/ตัวเลขที่ยังไม่มีจริง
- ❌ DM ขายตรงใน Discord (community เกลียด) — ช่วยในห้อง public ก่อน แล้วเขา DM มาเอง

## 5. วัดผล (ใช้ Plausible ที่เพิ่งติด)
ดู: referrer มาจากช่องไหน → กด `/tools/production-score` หรือ `/book-assessment` กี่ % → กรอกฟอร์มกี่ %
ทุ่มเวลาไปช่องที่ conversion สูงสุด ทิ้งช่องที่เงียบ
