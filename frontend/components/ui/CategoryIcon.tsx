import Image from "next/image";
import React from "react";

type Props = {
  icon: string;
  category: "income" | "expense";
  className?: string;
};

export function CategoryIcon({ icon, category, className = "" }: Props) {
    const categoryColor = `bg-${category}-icon`;
    //category === "income" ? "bg-income-icon" : "bg-expense-icon";
  return (
    <div>
      <div
        className={`rounded-full w-[33px] h-[33px] flex justify-center items-center ${className} ${categoryColor}`}
      >
        <Image src={icon} alt={icon} className="w-fit h-fit" width={20} height={20} />
      </div>
    </div>
  );
}
