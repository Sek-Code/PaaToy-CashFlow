import React from 'react'

type Props = {
  category?: "income" | "expense" | "";
  children: React.ReactNode;
  className?: string;
};

export function Box({ category = "", children, className = "" }: Props) {

    const color =
      category === "income"
        ? "bg-income-bg"
        : category === "expense"
          ? "bg-expense-bg"
          : "bg-neutral-bg";

    return (
      <div className={`shadow-box rounded-[5px] ${className} ${color}`}>
        {children}
      </div>
    );
}