import React from "react";

type Props = {
  icon: string;
  category: "income" | "expense";
  className?: string;
};

export function CategoryIcon({ icon, category, className = "" }: Props) {

  const categoryColor =
    category === "income" ? "bg-income-icon" : "bg-expense-icon";

  return (
    <div>
      <div
        className={`rounded-full w-[33px] h-[33px] flex justify-center items-center ${className} ${categoryColor}`}
      >
        <svg className="w-5 h-5 text-white">
          <use xlinkHref={`/category-sprite.svg#${icon}`} />
        </svg>
      </div>
    </div>
  );
}
