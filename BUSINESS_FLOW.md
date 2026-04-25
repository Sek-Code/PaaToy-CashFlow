# ป้าต้อย (PaaToy) — Business Flow

> อ้างอิง + วิเคราะห์จาก **ป้านวล (PaaNuan)** — https://parnuan.com

---

## 1. User Journey Overview

```mermaid
flowchart TD
    A[👤 User เปิด LINE] --> B[เพิ่มเพื่อน @paatoy]
    B --> C[LINE OA ส่ง Welcome Message]
    C --> D[กดปุ่ม #quot;เริ่มใช้งาน#quot;]
    D --> E[เปิด LIFF App / Web App]
    E --> F{ผู้ใช้ใหม่?}
    F -->|ใช่| G[LINE LIFF Login + สร้าง Profile]
    F -->|ไม่| H[เข้า Dashboard]
    G --> H
    H --> I[📊 Dashboard สรุปรายรับ-รายจ่าย]

    I --> J[💬 จดรายการผ่าน Chat]
    I --> K[📱 จดรายการผ่าน LIFF Form]
    I --> L[📈 ดูรายงาน/กราฟ]
    I --> M[⚙️ ตั้งค่า]

    J --> N[🤖 AI วิเคราะห์ข้อความ]
    N --> O[AI จัดหมวดอัคโนมัติ]
    O --> P[✅ บันทึกสำเร็จ #8594; ส่ง Confirm Message]

    K --> O
```

---

## 2. Core Business Flows

### 2.1 🔐 Authentication Flow

```mermaid
sequenceDiagram
    autonumber
    participant LINE as LINE Platform
    participant LIFF as Frontend (LIFF)
    participant API as Backend Server
    participant DB as Database (PostgreSQL)

    Note over LINE, DB: 1. ขั้นตอนแลกเปลี่ยน Token (Login & Authentication)
    LIFF->>LINE: liff.init() & liff.login()
    LINE-->>LIFF: ส่งคืน LINE ID Token
    
    LIFF->>API: POST /auth/line (ส่ง ID Token ใน Header)
    API->>LINE: Verify ID Token (ตรวจสอบความถูกต้อง)
    LINE-->>API: ยืนยันข้อมูลผู้ใช้ (UID, Name, Profile)

    API->>DB: SELECT/INSERT User ด้วย line_user_id
    DB-->>API: คืนค่าข้อมูล User Object
    
    Note right of API: ออก App JWT เพื่อใช้ในระบบตัวเอง
    API->>API: Generate App JWT (Signed with Secret)
    API-->>LIFF: ส่งกลับ { accessToken: "JWT", isSetup: false }

    Note over LINE, DB: 2. ขั้นตอนการตั้งค่าครั้งแรก (Setup Phase)
    LIFF->>API: POST /setup (ส่งข้อมูลหมวดหมู่ + Bearer JWT)
    API->>API: Validate App JWT (ตรวจสอบเอง ไม่ผ่าน LINE)
    API->>DB: UPDATE user_settings (บันทึกหมวดหมู่)
    
    Note right of API: เปลี่ยนเมนูเป็นหน้าจอมือโปร (รูปที่ 4)
    API->>LINE: Messaging API: Link Rich Menu to User
    API-->>LIFF: Setup Success!

    Note over LINE, DB: 3. การใช้งานปกติ (Authorized Requests)
    LIFF->>API: GET /transactions (Bearer JWT)
    API->>API: Validate App JWT
    API->>DB: SELECT transactions FROM db
    API-->>LIFF: คืนค่าข้อมูลรายรับ/รายจ่าย
```

---

### 2.2 💸 Transaction Recording Flow (Core Feature)

มี **2 ช่องทาง** ในการจดบันทึก:

#### ช่องทางที่ 1: จดผ่าน Chat (แบบป้านวล)

```mermaid
sequenceDiagram
    participant U as User
    participant LINE as LINE Chat
    participant WH as Webhook (NestJS)
    participant AI as Claude AI (Haiku)
    participant DB as PostgreSQL

    U->>LINE: "ข้าวกระเพรา 50 บาท"
    LINE->>WH: Webhook Event (text message)
    WH->>AI: วิเคราะห์ข้อความ
    Note over AI: Prompt: แยก amount, type,<br/>category, note จากข้อความ
    AI->>WH: {amount: 50, type: "expense",<br/>category: "อาหาร", note: "ข้าวกระเพรา"}
    WH->>DB: INSERT transaction
    WH->>LINE: Reply: "บันทึกค่าอาหาร 50 บาท ✓<br/>หมวดหมู่: 🍔 อาหาร"
    LINE->>U: แสดงข้อความยืนยัน
```

#### ช่องทางที่ 2: จดผ่าน LIFF Web App

```mermaid
sequenceDiagram
    participant U as User
    participant F as LIFF Web App
    participant B as Backend (NestJS)
    participant AI as Claude AI (Haiku)
    participant DB as PostgreSQL

    U->>F: กดปุ่ม "จดรายจ่าย"
    F->>U: แสดง Form (จำนวน, หมายเหตุ)
    U->>F: กรอก "ข้าวกระเพรา 50"
    F->>B: POST /api/transactions
    B->>AI: Auto categorize (ถ้าไม่ได้เลือกหมวด)
    AI->>B: category: "อาหาร"
    B->>DB: INSERT transaction
    B->>F: 201 Created + transaction data
    F->>U: แสดง ✅ บันทึกสำเร็จ (animation)
```

---

### 2.3 📊 Dashboard & Report Flow

```mermaid
flowchart LR
    subgraph Dashboard
        A[ยอดรวมเดือนนี้]
        B[รายรับ vs รายจ่าย]
        C[งบประมาณคงเหลือ]
        D[Streak จดต่อเนื่อง 🔥]
    end

    subgraph Reports
        E[📊 กราฟรายจ่ายตามหมวด - Pie Chart]
        F[📈 แนวโน้มรายเดือน - Line Chart]
        G[📋 รายการล่าสุด]
        H[🏷️ Top 5 หมวดที่ใช้เยอะ]
    end

    Dashboard --> Reports
```

**API Endpoints:**
```
GET /api/transactions/summary?month=2026-04    → ยอดรวมรายเดือน
GET /api/transactions?page=1&limit=20          → รายการทั้งหมด (pagination)
GET /api/transactions/by-category?month=2026-04 → แยกตามหมวดหมู่
GET /api/budgets/status?month=2026-04          → สถานะงบประมาณ
```

---

### 2.4 🏷️ Category Management Flow

```mermaid
flowchart TD
    A[หน้าตั้งค่าหมวดหมู่] --> B{มี Default Categories}
    B --> C[🍔 อาหาร]
    B --> D[🚗 เดินทาง]
    B --> E[🏠 ที่อยู่อาศัย]
    B --> F[🎮 บันเทิง]
    B --> G[💊 สุขภาพ]
    B --> H[👕 เสื้อผ้า]
    B --> I[📱 โทรศัพท์/อินเทอร์เน็ต]
    B --> J[📚 การศึกษา]
    B --> K[💰 เงินเดือน #40;รายรับ#41;]
    B --> L[🎁 รายได้อื่นๆ #40;รายรับ#41;]

    A --> M[➕ สร้างหมวดใหม่]
    M --> N[ใส่ชื่อ + เลือก Icon + เลือกสี]
    N --> O[เลือก type#colon; รายรับ/รายจ่าย]
    O --> P[บันทึก]
```

---

### 2.5 💰 Budget Management Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as LIFF Web App
    participant B as Backend
    participant DB as PostgreSQL
    participant LINE as LINE Notify

    U->>F: ตั้งงบ "อาหาร 3,000/เดือน"
    F->>B: POST /api/budgets
    B->>DB: INSERT budget

    Note over B: ทุกครั้งที่มีการจดรายจ่าย...
    B->>DB: SELECT SUM(amount) WHERE category=อาหาร
    alt ใช้เกิน 80% ของงบ
        B->>LINE: Push Message: "⚠️ หลานจ๋า<br/>ใช้เงินหมวดอาหารไปแล้ว 80%<br/>เหลืออีก 600 บาท"
        LINE->>U: แจ้งเตือน
    end
    alt ใช้เกิน 100%
        B->>LINE: Push Message: "🚨 งบอาหารหมดแล้ว!<br/>ใช้เกินไป 200 บาท"
        LINE->>U: แจ้งเตือน
    end
```

---

### 2.6 🤖 AI Chat Flow (จุดเด่นของป้าต้อย)

```mermaid
sequenceDiagram
    autonumber
    participant LINE as LINE Platform
    participant LIFF as Frontend (LIFF)
    participant API as Backend Server
    participant DB as Database (PostgreSQL)
    participant AI as AI Service (e.g. Gemini API)

    Note over LINE, AI: ขั้นตอนการจดบันทึกและจำแนกด้วย AI
    User->>LINE: พิมพ์ข้อความ "ข้าวเหนียวหมูปิ้ง 30"
    LINE->>API: Webhook: Message Event (text, userId)

    API->>DB: SELECT categories FROM user_categories WHERE line_user_id = '...'
    DB-->>API: คืนค่ารายการหมวดหมู่ (อาหาร, ค่าไฟ, ช็อปปิ้ง, ฯลฯ)

    rect rgb(230, 245, 230)
    Note right of API: เตรียม Prompt พร้อมข้อกำหนดหมวดหมู่
    API->>AI: ส่งข้อความ + รายชื่อหมวดหมู่ที่อนุญาต (Strict Rules)
    AI->>AI: ประมวลผลและเลือกหมวดหมู่ที่ใกล้เคียงที่สุด
    AI-->>API: คืนค่า JSON (type: "expense", category: "อาหาร", amount: 30)
    end

    API->>DB: INSERT INTO transactions (user_id, type, category, amount, description)
    DB-->>API: Success

    API->>LINE: Messaging API: Reply Message "บันทึก 'อาหาร' ให้แล้วค่ะ 30 บาท"
    LINE->>User: แสดงข้อความยืนยันในห้องแชท
```

---

### 2.7 📱 LINE Messaging Flow (Webhook)

```mermaid
flowchart TD
    A[User ส่งข้อความใน LINE Chat] --> B[LINE Platform]
    B --> C[Webhook #8594; NestJS Backend]
    C --> D{ประเภทข้อความ}

    D -->|Text| E[AI วิเคราะห์ข้อความ]
    E --> F{เป็นรายการเงิน?}
    F -->|ใช่| G[บันทึก Transaction]
    F -->|ไม่ใช่| H{เป็นคำถาม?}
    H -->|ใช่| I[AI Chat ตอบคำถาม]
    H -->|ไม่ใช่| J[ตอบ#colon; ป้าไม่เข้าใจ ลองพิมพ์ใหม่นะ]

    D -->|Image| K{หลานโปร?}
    K -->|ใช่| L[AI อ่านใบเสร็จ/สลิป]
    K -->|ไม่| M[ตอบ#colon; ฟีเจอร์นี้สำหรับหลานโปร]

    D -->|Audio| N{หลานโปร?}
    N -->|ใช่| O[Speech-to-text #8594; บันทึก]
    N -->|ไม่| M

    G --> P[Reply#colon; บันทึกสำเร็จ ✅]
```

---

## 3. Subscription & Payment Flow

### 3.1 Free vs Premium (หลานโปร) Tiers

| Feature | Free (หลาน) | Premium (หลานโปร) |
|---------|:-----------:|:-----------------:|
| จดด้วยข้อความ | ✅ | ✅ |
| จัดหมวดอัตโนมัติ | ✅ | ✅ |
| ตั้งงบประมาณ | ✅ | ✅ |
| Dashboard สรุป | ✅ | ✅ |
| AI Chat | 5 ครั้ง/วัน | ไม่จำกัด |
| จดด้วยรูป (สลิป/ใบเสร็จ) | ❌ | ✅ |
| จดด้วยเสียง | ❌ | ✅ |
| ส่งออก Excel | ❌ | ✅ |
| ตั้งวันเริ่มงบของเดือน | ❌ | ✅ |
| รายงานสรุปอัตโนมัติ (LINE) | ❌ | ✅ |
| รายการจดประจำอัตโนมัติ | ❌ | ✅ |
| AI Anomaly Detection | ❌ | ✅ |
| AI Smart Budget Suggestion | ❌ | ✅ |
| กราฟวิเคราะห์ขั้นสูง | ❌ | ✅ |
| เตือนจดประจำวัน | ❌ | ✅ |

### 3.2 ราคา (อ้างอิง ป้านวล)

| แผน | ราคา | หมายเหตุ |
|-----|------|----------|
| รายเดือน | 65 บาท | - |
| รายปี | 365 บาท | เฉลี่ยวันละ 1 บาท 🚨 |

### 3.3 Payment Flow (Stripe)

```mermaid
sequenceDiagram
    participant U as User
    participant F as LIFF Web App
    participant B as Backend (NestJS)
    participant S as Stripe
    participant DB as PostgreSQL

    U->>F: กดปุ่ม "อัพเกรดเป็นหลานโปร"
    F->>B: POST /api/stripe/checkout
    B->>S: Create Checkout Session
    S->>B: Checkout URL
    B->>F: Redirect URL
    F->>U: Redirect to Stripe Checkout
    U->>S: กรอกข้อมูลบัตร + ชำระเงิน
    S->>B: Webhook: checkout.session.completed
    B->>DB: UPDATE user SET plan='premium'
    B->>DB: INSERT subscription record
    B->>F: Plan updated
    F->>U: 🎉 ยินดีต้อนรับหลานโปร!
```

---

## 4. Automated Flows (Cron Jobs)

### 4.1 Monthly AI Summary

```mermaid
flowchart LR
    A[⏰ Cron#colon; ทุกวันที่ 1 เวลา 08:00] --> B[ดึงข้อมูลเดือนที่แล้ว]
    B --> C[ส่งให้ Claude AI สรุป]
    C --> D[สร้างข้อความสรุป]
    D --> E[ส่ง LINE Push Message]
    E --> F[👤 User ได้รับสรุปรายเดือน]
```

**ตัวอย่างข้อความ:**
```
📊 สรุปเดือน มีนาคม 2569

💰 รายรับ: 30,000 บาท
💸 รายจ่าย: 22,450 บาท
💵 เหลือ: 7,550 บาท

🏷️ Top 3 หมวดที่ใช้เยอะ:
1. 🍔 อาหาร - 8,200 บาท (36%)
2. 🚗 เดินทาง - 4,500 บาท (20%)
3. 🏠 ที่อยู่อาศัย - 3,800 บาท (17%)

💡 ป้าต้อยว่า: เดือนนี้หลานประหยัดกว่าเดือนที่แล้ว 15% เก่งมาก!
```

### 4.2 Anomaly Detection (Weekly)

```mermaid
flowchart LR
    A[⏰ Cron#colon; ทุกวันจันทร์ 09:00] --> B[ดึงข้อมูล 7 วันที่ผ่านมา]
    B --> C[เปรียบเทียบกับค่าเฉลี่ย 3 เดือน]
    C --> D{มีรายจ่ายผิดปกติ?}
    D -->|ใช่| E[ส่ง LINE แจ้งเตือน]
    D -->|ไม่| F[ไม่ต้องทำอะไร]
```

### 4.3 Daily Reminder

```mermaid
flowchart LR
    A[⏰ Cron#colon; ทุกวัน 20:00] --> B{วันนี้ user จดหรือยัง?}
    B -->|ยัง| C[ส่ง LINE#colon; อย่าลืมจดนะหลาน 📝]
    B -->|จดแล้ว| D[ไม่ต้องเตือน]
```

### 4.4 Recurring Transactions

```mermaid
flowchart LR
    A[⏰ Cron#colon; ทุกวัน 00:01] --> B[ค้นหา recurring ที่ถึงกำหนด]
    B --> C[สร้าง transaction อัตโนมัติ]
    C --> D[ส่ง LINE แจ้ง#colon; บันทึกค่าเน็ต 599 อัตโนมัติ ✅]
```

---

## 5. Screen Map (LIFF Web App)

```mermaid
flowchart TD
    subgraph Bottom Navigation
        NAV1[🏠 สรุป]
        NAV2[📋 รายการ]
        NAV3[➕ จดรายการ]
        NAV4[💬 AI Chat]
        NAV5[⚙️ ตั้งค่า]
    end

    NAV1 --> S1[Dashboard]
    S1 --> S1a[ยอดรวมเดือน]
    S1 --> S1b[Pie Chart หมวดหมู่]
    S1 --> S1c[Line Chart แนวโน้ม]
    S1 --> S1d[Streak Counter]

    NAV2 --> S2[Transaction List]
    S2 --> S2a[Filter#colon; วันที่ / หมวด / ประเภท]
    S2 --> S2b[Search]
    S2 --> S2c[แก้ไข / ลบ]

    NAV3 --> S3[Add Transaction Form]
    S3 --> S3a[จำนวนเงิน]
    S3 --> S3b[ประเภท#colon; รายรับ/รายจ่าย]
    S3 --> S3c[หมวดหมู่ หรือพิมพ์ให้ AI เลือก]
    S3 --> S3d[วันที่]
    S3 --> S3e[หมายเหตุ]

    NAV4 --> S4[AI Chat Page]
    S4 --> S4a[Chat Interface]
    S4 --> S4b[คำถามแนะนำ]

    NAV5 --> S5[Settings]
    S5 --> S5a[หมวดหมู่]
    S5 --> S5b[งบประมาณ]
    S5 --> S5c[สกุลเงิน / Timezone]
    S5 --> S5d[ภาษา]
    S5 --> S5e[อัพเกรดหลานโปร]
    S5 --> S5f[รายการจดประจำ Recurring]
```

---

## 6. API Endpoints Summary

### Auth & User
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | LINE LIFF Login |
| GET | `/api/users/me` | Get current user |
| PATCH | `/api/users/me` | Fix profile or setting |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | List (pagination, filter) |
| POST | `/api/transactions` | Create |
| PATCH | `/api/transactions/:id` | Update |
| DELETE | `/api/transactions/:id` | Delete |
<!-- | GET | `/api/transactions/summary` | Monthly summary |
| GET | `/api/transactions/by-category` | Group by category | -->

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all |
| POST | `/api/categories` | Create custom |
| PUT | `/api/categories/:id` | Update |
| DELETE | `/api/categories/:id` | Delete |

### Budgets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/budgets` | List all |
| POST | `/api/budgets` | Create |
| PUT | `/api/budgets/:id` | Update |
| DELETE | `/api/budgets/:id` | Delete |
<!-- | GET | `/api/budgets/status` | Check budget usage | -->

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/chat` | AI Chat (Sonnet) |
| GET | `/api/ai/history` | Chat history |

<!-- ### Stripe
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stripe/checkout` | Create checkout session |
| POST | `/api/stripe/webhook` | Handle Stripe events |
| POST | `/api/stripe/portal` | Customer portal | -->

<!-- ### LINE Webhook
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhook/line` | Receive LINE events | -->

---

## 7. จุดแตกต่างจากป้านวล (Competitive Advantage)

| Feature | ป้านวล | ป้าต้อย (PaaToy) |
|---------|--------|----------------|
| AI Chat คุยกับข้อมูล | ❌ | ✅ Claude Sonnet |
| Anomaly Detection | ❌ | ✅ เตือนเมื่อใช้ผิดปกติ |
| Smart Budget Suggestion | ❌ | ✅ แนะนำงบจาก AI |
| Web App (LIFF) | ✅ Dashboard only | ✅ Full CRUD + AI Chat |
| Open Source | ❌ | ✅ Portfolio project |

---

_Last updated: 2026-04-20_
