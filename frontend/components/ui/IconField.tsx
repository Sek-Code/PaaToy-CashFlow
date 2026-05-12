import React from "react";
import { Box } from "./Box";
import { CategoryIcon } from "./CategoryIcon";
import iconNames from "@/utils/icon-names.json";


type Props = {};

export function IconField({}: Props) {
  return (
    <Box className="mx-9 px-9 py-4">
      <div>เลือกไอคอน</div>
      <div className="grid grid-cols-5 gap-5">
        {iconNames.map((name) => (
          <CategoryIcon icon={name} category="expense" />
        ))}
      </div>
    </Box>
  );
}
