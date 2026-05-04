# 🧩 PaaToy CashFlow — System Architecture & Database Schema

เอกสารนี้รวบรวมการออกแบบโครงสร้างของระบบและฐานข้อมูลที่ได้รับการปรับปรุงจาก `BUSINESS_FLOW.md` และ `PLAN.md` เพื่อให้เป็นสถาปัตยกรรมที่พร้อมสำหรับการพัฒนา

---

## 1. System Modules (8 โมดูลหลัก)

เพื่อให้ Backend (NestJS) มีความเป็นระเบียบ (Clean Architecture) และดูแลรักษาง่าย เราแบ่งระบบออกเป็น 8 โมดูลหลัก ดังนี้:

1. **🔐 Auth & User Module:** ตรวจสอบ LINE Login, จัดการ App JWT, จัดการโปรไฟล์และระดับสิทธิ์ผู้ใช้ (Free vs Premium)
2. **💸 Transaction Module:** ระบบหลักจัดการบันทึกรายรับ-รายจ่าย ค้นหา และคำนวณยอดรวม (Aggregation) ส่งให้ Dashboard
3. **🏷️ Category Module:** บริหารหมวดหมู่ ทั้งหมวดหมู่พื้นฐานของระบบ (System Default) และหมวดหมู่ที่ผู้ใช้สร้างเอง
4. **💰 Budget Module:** ระบบตั้งค่างบประมาณและการแจ้งเตือน (Alert) เมื่อใช้เงินถึงเกณฑ์ที่กำหนด (เช่น 80%, 100%)
5. **🤖 AI Processing Module:** จัดการเชื่อมต่อกับ AI API (Claude/Gemini) สำหรับแยกแยะเจตนา (จดบัญชี vs พูดคุย), แยกแยะหมวดหมู่, และเป็น Chatbot 
6. **💬 LINE Integration Module:** คอยรับ Webhook Event จากผู้ใช้ และดูแลการส่ง Reply / Push Message ตลอดจนปรับเปลี่ยน Rich Menu
7. **⏱️ Cron & Automation Module:** จัดการ Job อัตโนมัติเบื้องหลัง เช่น AI สรุปยอดทุกสิ้นเดือน, ตรวจจับพฤติกรรมผิดปกติ, และระบบจดประจำ (Recurring)
8. **💳 Subscription Module:** รองรับการเชื่อมต่อกับ Stripe เพื่ออัปเกรดเป็นระดับพรีเมียม (หลานโปร) 

---

## 2. Entity Relationship Diagram (ERD)

ปรับปรุงจากโครงสร้างเดิมโดยเปลี่ยนมาใช้ `UUID` และเพิ่มตารางสำหรับฟีเจอร์ Subscription, ประวัติแชท AI และการจดรายการอัตโนมัติ

```mermaid
erDiagram
    %% Relationships
    USERS ||--o{ CATEGORIES : "has custom"
    USERS ||--o{ TRANSACTIONS : "records"
    USERS ||--o{ BUDGETS : "sets"
    USERS ||--o| SUBSCRIPTIONS : "subscribes"
    USERS ||--o{ AI_CONVERSATIONS : "chats with"
    USERS ||--o{ RECURRING_TXNS : "creates"
    
    CATEGORIES ||--o{ TRANSACTIONS : "classifies"
    CATEGORIES ||--o{ RECURRING_TXNS : "classifies"
    CATEGORIES ||--o| BUDGETS : "limits"

    %% User Module
    USERS {
        uuid id PK
        varchar line_user_id UK "UNIQUE NOT NULL"
        varchar display_name
        varchar line_picture_url "Nullable"
        varchar role "free | premium"
        varchar default_currency "default THB"
        varchar timezone "default Asia/Bangkok"
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at "Soft Delete"
    }

    %% Category Module
    CATEGORIES {
        uuid id PK
        uuid user_id FK "Nullable (Null = System Default)"
        varchar name "e.g. ค่าอาหาร"
        varchar type "income | expense"
        varchar icon "emoji or icon class"
        varchar color "hex code"
        boolean is_active
        timestamptz created_at
    }

    %% Transaction Module
    TRANSACTIONS {
        uuid id PK
        uuid user_id FK
        uuid category_id FK
        varchar type "income | expense"
        numeric amount "NUMERIC(15,2)"
        varchar currency_code "e.g. THB, USD"
        text note "Nullable"
        timestamptz date "Transaction Date"
        boolean ai_categorized "Flag if AI guessed it"
        timestamptz created_at
        timestamptz updated_at
    }

    %% Budget Module
    BUDGETS {
        uuid id PK
        uuid user_id FK
        uuid category_id FK "Nullable (Null = Total Budget)"
        numeric amount "NUMERIC(15,2)"
        varchar period "monthly | weekly"
        date start_date "Start of budget cycle"
        timestamptz created_at
        timestamptz updated_at
    }

    %% Subscription Module (Premium)
    SUBSCRIPTIONS {
        uuid id PK
        uuid user_id FK "UNIQUE"
        varchar stripe_customer_id "UK"
        varchar stripe_subscription_id "UK"
        varchar status "active | past_due | cancelled"
        varchar plan_name "e.g. หลานโปรรายปี"
        timestamptz current_period_end
        timestamptz created_at
    }

    %% AI Module
    AI_CONVERSATIONS {
        uuid id PK
        uuid user_id FK
        jsonb messages "Array of chat histories"
        timestamptz created_at
        timestamptz updated_at
    }

    %% Automation Module (Recurring)
    RECURRING_TXNS {
        uuid id PK
        uuid user_id FK
        uuid category_id FK
        varchar type "income | expense"
        numeric amount
        varchar currency_code "e.g. THB, USD"
        text note
        varchar frequency "daily | weekly | monthly"
        date next_run_date
        boolean is_active
        timestamptz created_at
    }
```
