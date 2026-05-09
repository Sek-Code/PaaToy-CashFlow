import React from 'react'
import { Box } from './Box';
import { CategoryIcon } from './CategoryIcon';

export type CategoryData = {
  categoryName: string;
  amount: number;
};

type Props = {
  data: CategoryData[];
}

//type expenseDatas = { categoryName: string; amount: number };

// const expenseDatas: expenseDatas[] = [
//   { categoryName: "food", amount: 4897.0 },
//   { categoryName: "shopping", amount: 2907.0 },
//   { categoryName: "wifi", amount: 4625.0 },
//   { categoryName: "transportation", amount: 3709.0 },
//   { categoryName: "others", amount: 1463.0 },
// ];

export function CategorySummaryBox({data}: Props) {
  return (
            <Box className="mx-5">
              <p className="font-medium underline text-center pt-5 text-sub-2">
                รายจ่าย
              </p>
              <div
                id="expenseData"
                className="grid grid-cols-2 justify-items-center"
              >
                {data.map((data) => (
                  <div className="flex items-center m-5">
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
  )
}