import React, { useEffect } from "react";
import { Box } from "./Box";
import { CategoryIcon } from "./CategoryIcon";
import iconNames from "@/utils/icon-names.json";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  category?: "income" | "expense";
  error?: string;
};

export function IconField({
  value,
  onChange,
  category = "expense",
  error,
}: Props) {
  useEffect(() => {
    if (!value && iconNames.length > 0) {
      onChange?.(iconNames[0]);
    }
  }, [value, onChange]);

  const selectedIcon = category === "income" ? "outline-income-chart" : "outline-expense-chart";

  return (
    <Box className="mx-9 px-9 py-4">
      <div className="mb-3 text-sub-2 font-medium">เลือกไอคอน</div>
      <div className="grid grid-cols-5 gap-5">
        {iconNames.map((name) => (
          <div
            key={name}
            onClick={() => onChange?.(name)}
            className="cursor-pointer rounded-full flex justify-center items-center aspect-square"
          >
            <CategoryIcon
              icon={name}
              category={category}
              className={value === name ? `outline-[3px] ${selectedIcon}` : ""}
            />
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-expense-text mt-2">{error}</p>}
    </Box>
  );
}
