import React from "react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Box } from "@/components/ui/Box";
import { X, Plus } from "lucide-react";

type expenseData = { categoryName: string; amount: number };
type incomeData = { categoryName: string; amount: number };

const expenseData: expenseData[] = [
  { categoryName: "food", amount: 4897.0 },
  { categoryName: "shopping", amount: 2907.0 },
  { categoryName: "wifi", amount: 4625.0 },
  { categoryName: "transportation", amount: 3709.0 },
  { categoryName: "other", amount: 1463.0 },
];

const incomeData: incomeData[] = [
  { categoryName: "income-money", amount: 15000.0 },
  { categoryName: "income-package", amount: 2000.0 },
  { categoryName: "income-palette", amount: 1000.0 },
];

export default function Category() {
  const totalExpense = expenseData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-24 relative">
      <div className="flex items-center justify-between mt-13 mb-5 mx-8">
        <div className="w-6"></div> {/* Spacer for centering */}
        <h1 className="text-center text-head font-bold">
          รายรับ-รายจ่ายตามประเภท
        </h1>
        <X className="w-6 h-6 cursor-pointer" />
      </div>
      
      {/* รายจ่าย Section */}
      <Box className="mx-5 mb-5 shadow-sm border border-neutral-sub/20 rounded-xl bg-neutral-bg">
        <div className="text-center pt-5 pb-2">
          <p className="font-medium underline text-sub-2 text-neutral-main">
            รายจ่าย
          </p>
          <p className="font-bold text-sub-1 text-expense-text mt-1">
            ฿ {totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-4 pb-5 pl-8">
          {expenseData.map((data) => (
            <div key={data.categoryName} className="flex items-center gap-4">
              <CategoryIcon
                icon={`/category-icon/${data.categoryName}.svg`}
                category="expense"
              />
              <p className="text-body font-medium">฿ {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </Box>

      {/* รายรับ Section */}
      <Box className="mx-5 mb-5 shadow-sm border border-neutral-sub/20 rounded-xl bg-neutral-bg">
        <div className="text-center pt-5 pb-2">
          <p className="font-medium underline text-sub-2 text-neutral-main">
            รายรับ
          </p>
          <p className="font-bold text-sub-1 text-income-text mt-1">
            ฿ {totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-4 pb-5 pl-8">
          {incomeData.map((data) => (
            <div key={data.categoryName} className="flex items-center gap-4">
              <CategoryIcon
                icon={`/category-icon/${data.categoryName}.svg`}
                category="income"
              />
              <p className="text-body font-medium">฿ {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </Box>

      {/* ยอดคงเหลือ Section */}
      <div className="mx-5 mb-8 rounded-[5px] p-6 bg-income-bg shadow-box">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold text-sub-2 text-income-text">ยอดคงเหลือ</p>
          <p className="font-bold text-head text-income-text">
            ฿ {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Add Category Button (Block) */}
      <div className="mx-5 mb-8">
        <button className="w-full h-[40px] flex items-center justify-center gap-2 text-sub-2 font-medium bg-expense-bg text-expense-text border border-expense-text rounded-md shadow-sm hover:opacity-80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>
          เพิ่มข้อมูล
        </button>
      </div>
    </div>
  );
}

