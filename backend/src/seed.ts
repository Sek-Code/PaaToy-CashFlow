import { Client } from 'pg';
import * as crypto from 'crypto';

const DATABASE_URL =
  'postgresql://neondb_owner:npg_wF8Leg0nQiuA@ep-quiet-truth-ao4z3bs3.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function seed() {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log('✅ Connected to Neon DB');

  try {
    // --- 1. User ---
    const userId = crypto.randomUUID();
    await client.query(
      `INSERT INTO users (id, line_user_id, display_name, line_picture_url, role, default_currency, timezone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, 'Utest123456', 'ป้าตอย', 'https://i.pravatar.cc/150?img=47', 'free', 'THB', 'Asia/Bangkok'],
    );
    console.log('👤 Inserted User: ป้าตอย');

    // --- 2. Categories (expense) ---
    const catFood    = crypto.randomUUID();
    const catTransport = crypto.randomUUID();
    const catShopping  = crypto.randomUUID();
    const catBill    = crypto.randomUUID();
    const catHealth  = crypto.randomUUID();
    // Categories (income)
    const catSalary  = crypto.randomUUID();
    const catFreelance = crypto.randomUUID();

    const categories = [
      [catFood,      userId, 'อาหาร & เครื่องดื่ม', 'expense', '🍔', '#FF6B6B'],
      [catTransport, userId, 'เดินทาง',             'expense', '🚗', '#FFA94D'],
      [catShopping,  userId, 'ช้อปปิ้ง',            'expense', '🛍️', '#CC5DE8'],
      [catBill,      userId, 'ค่าบิล & ค่าน้ำไฟ',   'expense', '📋', '#4DABF7'],
      [catHealth,    userId, 'สุขภาพ',              'expense', '💊', '#69DB7C'],
      [catSalary,    userId, 'เงินเดือน',           'income',  '💰', '#51CF66'],
      [catFreelance, userId, 'รับงาน Freelance',    'income',  '💻', '#339AF0'],
    ];

    for (const [id, uid, name, type, icon, color] of categories) {
      await client.query(
        `INSERT INTO categories (id, user_id, name, type, icon, color) VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, uid, name, type, icon, color],
      );
    }
    console.log('📂 Inserted 7 Categories');

    // --- 3. Transactions ---
    const now = new Date();
    const d = (daysAgo: number) => {
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      return date;
    };

    const transactions = [
      // income
      [userId, catSalary,    'income',  50000.00, 'เงินเดือนเดือนพฤษภาคม',  d(1)],
      [userId, catFreelance, 'income',   8500.00, 'ค่าทำเว็บไซต์ลูกค้า',     d(3)],
      // expense
      [userId, catFood,      'expense',   150.00, 'ข้าวผัดกะเพราหมูกรอบ',   d(0)],
      [userId, catFood,      'expense',    65.00, 'กาแฟเย็น',               d(0)],
      [userId, catTransport, 'expense',   180.00, 'แท็กซี่ไปออฟฟิศ',        d(1)],
      [userId, catShopping,  'expense',  1290.00, 'เสื้อผ้าออนไลน์',         d(2)],
      [userId, catFood,      'expense',   320.00, 'ซูชิกับเพื่อน',           d(2)],
      [userId, catBill,      'expense',   750.00, 'ค่าไฟเดือนนี้',           d(3)],
      [userId, catBill,      'expense',   450.00, 'ค่าน้ำประปา',             d(3)],
      [userId, catHealth,    'expense',   890.00, 'ซื้อยาที่ร้านขายยา',      d(4)],
      [userId, catTransport, 'expense',    35.00, 'รถไฟฟ้า BTS',            d(5)],
      [userId, catFood,      'expense',   240.00, 'ส้มตำ + ไก่ย่าง',         d(5)],
      [userId, catShopping,  'expense',  2500.00, 'AirPods',                d(6)],
      [userId, catFood,      'expense',    89.00, 'เซเว่น',                  d(7)],
      [userId, catTransport, 'expense',   400.00, 'ค่าน้ำมัน',               d(7)],
    ];

    for (const [uid, catId, type, amount, note, date] of transactions) {
      const txId = crypto.randomUUID();
      await client.query(
        `INSERT INTO transactions (id, user_id, category_id, type, amount, note, date)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [txId, uid, catId, type, amount, note, date],
      );
    }
    console.log('💳 Inserted 15 Transactions');

    console.log('\n🎉 Seed สำเร็จ! ข้อมูลทดสอบพร้อมใช้งานแล้ว');
    console.log(`   User ID: ${userId}`);
  } catch (err) {
    console.error('❌ Seed Error:', err);
    throw err;
  } finally {
    await client.end();
    console.log('🔌 DB connection closed');
  }
}

seed();
