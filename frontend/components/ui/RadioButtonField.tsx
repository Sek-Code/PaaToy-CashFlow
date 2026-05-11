import React from "react";
import { Box } from "./Box";
import { Divide } from "lucide-react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  title: string;
  error?: string;
  className?: string;
  choice: string[];
}

export default function RadioButtonField({
  title,
  error = "",
  className = "",
  choice,
  ...props
}: Props) {
  return (
    <Box className={`mx-9 my-5 px-9 pt-4 pb-6 flex flex-col ${className}`}>
      <label className="mb-3 text-sub-2 font-medium">{title}</label>

      <div className="grid grid-flow-col">
        {choice.map((option, index) => (
          <label
            htmlFor={option}
            className="flex items-center gap-x-2.5 cursor-pointer"
          >
            <input
              type="radio"
              id={option}
              name={title}
              value={option}
              defaultChecked={index === 0}
              className="sr-only peer "
            />
            <div className="w-[15px] h-[15px] rounded-full shrink-0 bg-white outline-[0.5px] outline-neutral-sub peer-checked:bg-neutral-sub peer-checked:border-[2.25px] peer-checked:border-white peer-focus-visible:shadow-focus peer-focus-visible:outline-offset-1"></div>
            {option}
          </label>
        ))}
      </div>
      {error && <span className="text-xs text-expense-text mt-1">{error}</span>}
    </Box>
  );
}

//className="w-full border-b border-input-line focus:border-primary outline-none"
