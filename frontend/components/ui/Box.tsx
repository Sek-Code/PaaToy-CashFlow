import React from "react";

interface BoxProps extends React.ComponentPropsWithoutRef<"div"> {
  category?: "income" | "expense" | "";
}

export function Box({
  category = "",
  children,
  className = "",
  ...props
}: BoxProps) {
  const color =
    category === "income"
      ? "bg-income-bg"
      : category === "expense"
        ? "bg-expense-bg"
        : "bg-neutral-bg";

  return (
    <div
      {...props}
      className={`shadow-box rounded-[5px] ${className} ${color}`}
    >
      {children}
    </div>
  );
}
