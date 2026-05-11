import React from 'react'
import { Box } from './Box';
import { CategoryIcon } from './CategoryIcon';

export type CategoryData = {
  categoryName: string;
  amount: number;
  categoryIconName?: string;
};

type Props = {
  data: CategoryData[];
  category: "income" | "expense";
}

//type data = { categoryName: string; amount: number };

// const data: expenseDatas[] = [
//   { categoryName: "food", amount: 4897.0 },
//   { categoryName: "shopping", amount: 2907.0 },
//   { categoryName: "wifi", amount: 4625.0 },
//   { categoryName: "transportation", amount: 3709.0 },
//   { categoryName: "others", amount: 1463.0 },
// ];

export function CategorySummaryBox({data, category}: Props) {
  return (
    <Box className="m-5">
      <p className="font-medium underline text-center pt-5 text-sub-2">
        {category === "income" ? "รายรับ" : "รายจ่าย"}
      </p>
      <div
        id="CategoryData"
        className="grid grid-cols-2 gap-y-5 pt-5 pb-10 px-10 gap-x-10"
      >
        {data.map((data) => (
          <div
            className="flex items-center justify-between"
            key={data.categoryName}
          >
            <CategoryIcon
              icon={`/category-icon/${data.categoryIconName}.svg`}
              category={category}
              className="mr-1"
            />
            <p className="text-body font-medium">฿ {data.amount}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}