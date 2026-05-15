import React from 'react'
import { RaiRab } from '@/components/ui/RaiRub';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Box } from '@/components/ui/Box';
import { Cat } from 'lucide-react';

type Props = {}

type expenseData = {categoryName: string, amount: number}

const expenseData: expenseData[] = [
  { categoryName: "food", amount: 4897.0 },
  { categoryName: "shopping", amount: 2907.0 },
  { categoryName: "wifi", amount: 4625.0 },
  { categoryName: "transportation", amount: 3709.00 },
  { categoryName: "others", amount: 1463.00 },
];

export default function Category({}: Props) {
    return (
      <div className='max-w-[1024px] mx-auto bg-amber-600'>
        <h1 className="text-center mt-13 mb-5 mx-19">รายรับ-รายจ่ายตามประเภท</h1>
        <Box className="mx-5">
          <p className="font-medium underline text-center pt-5 text-sub-2">
            รายจ่าย
          </p>
          <div
            id="expenseData"
            className="grid grid-cols-2 justify-items-center"
          >
            {expenseData.map((data: expenseData) => (
              <div key={data.categoryName} className="flex items-center m-5">
                <CategoryIcon
                  icon={`/category-icon/${data.categoryName}.svg`}
                  category="expense"
                  className="mr-6"
                />
                <p className="text-body font-medium">฿ {data.amount}</p>
              </div>
            ))}
          </div>
        </Box>
        <div id="รายรับ">
          <div>รายรับ</div>
        </div>
        <div>ยอดคงเหลือ</div>
        <CategoryIcon icon="/category-icon/food.svg" category="expense" />
      </div>
    );
}

