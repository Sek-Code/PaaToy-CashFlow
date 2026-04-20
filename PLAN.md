# ป้าต้อย (PaaToy) - CashFlow App

> AI-Powered Personal Finance Tracker via LINE LIFF
> แอปจดรายรับ-รายจ่ายเหมือนป้านวล + มี AI ช่วยทุกอย่าง

---

## 📖 Project Overview

**ชื่อ:** ป้าต้อย (PaaToy)
**ประเภท:** LINE LIFF App + Web
**Target User:** คนไทยทั่วไป
**เป้าหมาย:** Portfolio project สำหรับหางาน Junior Developer

### Inspiration
Clone feature จาก [ป้านวล](https://app.parnuan.com) + เพิ่ม AI features ที่ป้านวลไม่มี

---

## ✨ Features

### Core Features (เหมือนป้านวล)
- [ ] Login ผ่าน LINE LIFF
- [ ] จดรายรับ / รายจ่าย
- [ ] จัดการหมวดหมู่
- [ ] ตั้งงบประมาณ (Budget)
- [ ] สรุป / วิเคราะห์รายเดือน
- [ ] รายการประจำ (Recurring)
- [ ] หลายสกุลเงิน
- [ ] หลายภาษา (ไทย / English)
- [ ] Streak (จดต่อเนื่อง)
- [ ] Referral program
- [ ] Free / Premium (Stripe)

### AI Features ⭐ (จุดเด่น)
- [ ] **AI Auto Categorize** — จดรายการ → AI เลือกหมวดให้อัตโนมัติ
- [ ] **AI Chat** — คุยกับข้อมูลการเงินตัวเองเป็นภาษาไทย
- [ ] **Anomaly Detection** — เตือนเมื่อใช้เงินผิดปกติ
- [ ] **Smart Budget Suggestion** — แนะนำงบจากพฤติกรรมย้อนหลัง
- [ ] **Monthly AI Summary** — ส่งสรุปรายเดือนผ่าน LINE

---

## 🛠 Tech Stack

| Layer | Technology | เหตุผล |
|-------|-----------|--------|
| Framework | Next.js 14+ App Router | มาตรฐานตลาดงาน |
| Language | TypeScript | type-safe, โชว์สกิล |
| Styling | Tailwind CSS | productive, มาตรฐาน |
| UI Components | shadcn/ui | สวย, customizable |
| Auth | `@line/liff@2.28.0` | relevant ตลาดไทย |
| Database | MongoDB + Mongoose | flexible |
| AI | Claude API (Haiku + Sonnet) | มาแรง 2025-26 |
| Payment | Stripe | production-ready |
| Hosting | Vercel | free + ง่าย |
| CDN | Cloudflare | free + เร็ว |
| Monitoring | Sentry | free tier |
| Analytics | Google Analytics + Microsoft Clarity | free |

---

## 📅 Roadmap (8 สัปดาห์)

### Phase 0: Setup (2-3 วัน) — ก่อนเริ่ม code

**สมัครบัญชี:**
- [ ] GitHub
- [ ] LINE Developer + สร้าง LIFF channel
- [ ] MongoDB Atlas (free tier)
- [ ] Vercel
- [ ] Anthropic Console (Claude API key)
- [ ] Stripe (test mode)

**ติดตั้งเครื่องมือ:**
- [ ] Node.js (LTS)
- [ ] pnpm
- [ ] VS Code + extensions (ESLint, Prettier, Tailwind)
- [ ] Git + GitHub CLI

---

### Phase 1: Foundation (สัปดาห์ 1-2)

**เป้าหมาย:** Login LINE ได้ + บันทึกรายการพื้นฐานได้

- [ ] สร้าง Next.js project
- [ ] Setup Tailwind + shadcn/ui
- [ ] Deploy empty project → Vercel → ได้ URL
- [ ] เอา URL ใส่ LIFF channel
- [ ] LIFF SDK integration
- [ ] MongoDB connection + User model
- [ ] หน้า login / logout
- [ ] หน้าจดรายรับ-รายจ่าย (basic form)
- [ ] Default categories

**สกิลที่โชว์:** Next.js, Auth, Database, Deployment

---

### Phase 2: Core Product (สัปดาห์ 3-4)

**เป้าหมาย:** ใช้งานได้จริง เหมือนป้านวลเวอร์ชัน minimal

- [ ] หน้าสรุปรายเดือน + กราฟ (Recharts / Chart.js)
- [ ] หน้า list รายการ + filter + search
- [ ] แก้ไข / ลบรายการ
- [ ] Bottom navigation 5 แท็บ
- [ ] หน้าตั้งค่าหมวด
- [ ] หน้าตั้งค่าสกุลเงิน + timezone

**สกิลที่โชว์:** UI/UX, Data visualization, CRUD

---

### Phase 3: AI Features (สัปดาห์ 5-6) ⭐

**เป้าหมาย:** AI ทำงานจริงในแอป

- [ ] Setup Claude API + rate limit
- [ ] AI Auto Categorize (ใช้ Haiku — ถูก)
- [ ] AI Chat page (ใช้ Sonnet — เก่งกว่า)
- [ ] LINE Messaging API setup
- [ ] Monthly AI Summary (cron job)
- [ ] Anomaly Detection (weekly check)
- [ ] Smart Budget Suggestion

**สกิลที่โชว์:** Claude API, Prompt Engineering, LINE Bot

---

### Phase 4: Monetize + Polish (สัปดาห์ 7-8)

- [ ] Stripe subscription setup
- [ ] Free / Premium tier logic
- [ ] Budget & Streak notifications
- [ ] Error handling + loading states
- [ ] Empty states
- [ ] README + screenshots
- [ ] Case study write-up
- [ ] Deploy production

---

## 🗄 Database Schema (Draft)

### `users`
```typescript
{
  _id: ObjectId,
  lineId: string,          // unique, indexed
  displayName: string,
  pictureUrl?: string,
  email?: string,
  plan: 'free' | 'premium',
  currency: string,        // default 'THB'
  timezone: string,        // default 'Asia/Bangkok'
  language: 'th' | 'en',
  streakCount: number,
  lastActiveAt: Date,
  createdAt: Date,
  updatedAt: Date,
}
```

### `transactions`
```typescript
{
  _id: ObjectId,
  userId: ObjectId,        // indexed
  type: 'income' | 'expense',
  amount: number,
  currency: string,
  categoryId: ObjectId,
  note?: string,
  date: Date,              // indexed
  isRecurring: boolean,
  aiCategorized: boolean,  // ถูกจัดหมวดด้วย AI หรือไม่
  createdAt: Date,
  updatedAt: Date,
}
```

### `categories`
```typescript
{
  _id: ObjectId,
  userId: ObjectId,        // indexed (null = default category)
  name: string,
  icon: string,
  color: string,
  type: 'income' | 'expense',
  isDefault: boolean,
}
```

### `budgets`
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  categoryId?: ObjectId,   // null = งบรวม
  amount: number,
  period: 'daily' | 'weekly' | 'monthly',
  startDate: Date,
}
```

### `subscriptions`
```typescript
{
  _id: ObjectId,
  userId: ObjectId,        // indexed
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  status: 'active' | 'cancelled' | 'past_due',
  plan: 'premium',
  currentPeriodEnd: Date,
}
```

### `ai_conversations`
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  messages: [
    { role: 'user' | 'assistant', content: string, timestamp: Date }
  ],
  createdAt: Date,
}
```

---

## 📁 Folder Structure (Planned)

```
PaaToy-CashFlow/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── (main)/
│   │   │   ├── summary/
│   │   │   ├── analysis/
│   │   │   ├── categories/
│   │   │   ├── transactions/
│   │   │   ├── settings/
│   │   │   └── chat/          # AI Chat
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   ├── stripe/
│   │   │   └── webhook/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   └── features/          # business components
│   ├── lib/
│   │   ├── mongodb.ts
│   │   ├── liff.ts
│   │   ├── claude.ts
│   │   └── stripe.ts
│   ├── models/                # Mongoose schemas
│   ├── services/              # business logic
│   ├── types/                 # TypeScript types
│   └── hooks/                 # React hooks
├── public/
├── .env.local                 # ❌ อย่า commit!
├── .env.example               # template
└── README.md
```

---

## 💰 AI Cost Management

Claude API ไม่ฟรี — ต้องวางแผนค่าใช้จ่าย

### กลยุทธ์
- **ใช้ Haiku สำหรับงานง่าย** (auto categorize) — ถูกกว่า 10x
- **ใช้ Sonnet สำหรับ Chat** — ต้องการคุณภาพสูง
- **Cache ผล categorize** — ถ้าเจอคำเดิม ใช้ผลเดิม
- **Rate limit** — Free 5 AI chat/day, Premium ไม่จำกัด
- **Budget alert** ใน Anthropic Console — $10/month threshold

---

## 🔒 Security Checklist

- [ ] `.env.local` อยู่ใน `.gitignore`
- [ ] Validate input ด้วย Zod ทุก API
- [ ] ตรวจสอบ LIFF token ฝั่ง server เสมอ
- [ ] Rate limit API routes (ใช้ Upstash)
- [ ] ตรวจ userId ทุก database query
- [ ] ใช้ HTTPS only
- [ ] Sanitize user input ก่อนบันทึก

---

## 🚀 Launch Plan

**หลัง MVP เสร็จ:**
1. ให้เพื่อน/ครอบครัว 5-10 คนทดลองใช้
2. เก็บ feedback → ปรับปรุง
3. โพสต์ใน Facebook Group / Pantip
4. บันทึก metrics (users, transactions) → ใส่ใน portfolio
5. เขียน blog post บน Medium / Dev.to

---

## 📝 Portfolio Story

### ต้องเตรียมสำหรับ interview
- [ ] README สวยๆ พร้อม screenshots
- [ ] Demo video 1-2 นาที
- [ ] Case study: ทำไมเลือก stack นี้, challenges, solutions
- [ ] Metrics จริง: จำนวน user, AI calls, uptime
- [ ] Deploy link + GitHub repo link

### Talking Points
- ใช้ Claude API แก้ปัญหาอะไร
- Trade-off ที่เจอ (เช่น Haiku vs Sonnet)
- Challenge ที่เจอและแก้ยังไง
- ถ้ามีเวลาเพิ่ม จะทำอะไรต่อ

---

## 🎯 MVP Scope (ทำให้เสร็จก่อน)

**MUST HAVE:**
- LIFF Login
- CRUD รายรับ-รายจ่าย
- หมวดหมู่พื้นฐาน
- สรุปรายเดือน
- AI Chat (แค่อันเดียวก็พอ)

**ทิ้งไว้หลัง MVP:**
- Stripe / Premium
- Recurring transactions
- Multi-language
- Multi-currency
- Streak / Referral

---

## ⚠️ Rules สำหรับ Junior Dev

1. **อย่า over-engineer** — ทำให้ work ก่อน แล้วค่อย refactor
2. **commit บ่อยๆ** — เวลา recruiter ดู จะเห็น progress
3. **เขียน commit message ดีๆ** — `feat: add LIFF login` ดีกว่า `update`
4. **แยก branch** — `feature/xxx`, `fix/xxx`
5. **ลงมือทำเรียนรู้ระหว่างทาง** — ไม่ต้องวางแผน 100%

---

## 📌 Next Actions

1. [ ] สมัครบัญชีทั้งหมดใน Phase 0
2. [ ] ออกแบบ wireframe ด้วย Figma / กระดาษ
3. [ ] สร้าง Next.js project + push ขึ้น GitHub
4. [ ] Deploy เปล่าๆ ไป Vercel
5. [ ] เริ่ม Phase 1!

---

_Last updated: 2026-04-19_
