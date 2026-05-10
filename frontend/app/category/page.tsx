'use client'
import React from "react";
import { RaiRab } from "@/components/ui/RaiRub";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Box } from "@/components/ui/Box";
import { Cat } from "lucide-react";
import {
  CategorySummaryBox,
  CategoryData,
} from "@/components/ui/CategorySummaryBox";
import { EditButton } from "@/components/ui/EditButton";

type Props = {};

//type expenseData = { categoryName: string; amount: number };

const expenseData: CategoryData[] = [
  { categoryName: "food", amount: 4897.0, categoryIconName: "food" },
  { categoryName: "shopping", amount: 2907.0, categoryIconName: "shopping" },
  { categoryName: "wifi", amount: 4625.0, categoryIconName: "wifi" },
  {
    categoryName: "transportation",
    amount: 3709.0,
    categoryIconName: "transportation",
  },
  { categoryName: "others", amount: 1463.0, categoryIconName: "other" },
];

const incomeData: CategoryData[] = [
  { categoryName: "salary", amount: 35000.0, categoryIconName: "income-money" },
  {
    categoryName: "commission",
    amount: 800.0,
    categoryIconName: "income-palette",
  },
  {
    categoryName: "dividend",
    amount: 2200.0,
    categoryIconName: "income-package",
  },
];

const balance: number =
  incomeData.reduce((sum, data) => sum + data.amount, 0) -
  expenseData.reduce((sum, data) => sum + data.amount, 0);
const balanceCategory: "income" | "expense" =
  balance >= 0 ? "income" : "expense";
  const balanceColor = `text-${balanceCategory}-text`;

export default function Category({}: Props) {
  return (
    <div className="max-w-[1024px] mx-auto">
      <h1 className="text-center text-sub-1 mt-13 mb-5 mx-19">
        รายรับ-รายจ่ายตามประเภท
      </h1>
      <EditButton> เพิ่มข้อมูล</EditButton>
      <CategorySummaryBox data={expenseData} category="expense" />
      <CategorySummaryBox data={incomeData} category="income" />
      <Box category={balanceCategory} className="m-5 p-4 text-center">
        <p className="text-sub-2 font-semibold">ยอดคงเหลือ</p>
        <p className={`text-2xl font-bold  ${balanceColor}`}>฿ {balance}</p>
      </Box>
    </div>
  );
}
