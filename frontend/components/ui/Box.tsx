import React from "react";

interface BoxProps extends React.ComponentPropsWithoutRef<"div"> {
  category?: "income" | "expense" | "neutral" ;
}

export function Box({
  category,
  children,
  className = "",
  ...props
}: BoxProps) {
  
  const color = {
    "income": "bg-income-bg",
    "expense": "bg-expense-bg",
    "neutral": "bg-neutral-bg"
  };

  const categoryColor =
    category && color[category] ? color[category] : "";

  return (
    <div
      {...props}
      className={`shadow-box rounded-[5px] ${categoryColor} ${className}`}
    >
      {children}
    </div>
  );
}
