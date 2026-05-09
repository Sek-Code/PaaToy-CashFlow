import React from "react";
import { RaiRab } from "@/components/ui/RaiRub";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Box } from "@/components/ui/Box";
import { Cat } from "lucide-react";
import { CategorySummaryBox,CategoryData } from "@/components/ui/CategorySummaryBox";

type Props = {};

//type expenseData = { categoryName: string; amount: number };

const expenseData: CategoryData[] = [
  { categoryName: "food", amount: 4897.0 },
  { categoryName: "shopping", amount: 2907.0 },
  { categoryName: "wifi", amount: 4625.0 },
  { categoryName: "transportation", amount: 3709.0 },
  { categoryName: "others", amount: 1463.0 },
];

export default function Category({}: Props) {
  return (
    <div className="max-w-[1024px] mx-auto">
      <h1 className="text-center mt-13 mb-5 mx-19">รายรับ-รายจ่ายตามประเภท</h1>
      <CategorySummaryBox data={expenseData} />
      <div id="รายรับ">
        <div>รายรับ</div>
      </div>
      <div>ยอดคงเหลือ</div>
      <CategoryIcon icon="/category-icon/food.svg" category="expense" />
    </div>
  );
}
