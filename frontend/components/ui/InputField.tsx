import React from 'react'
import { Box } from './Box';

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  title?: string;
    error?: string;
    className?: string;
}

export default function InputField({title = '', error="", className ="",...props}: Props) {
    return (
      <Box className={`mx-9 px-9 py-4 flex flex-col ${className}`}>
        {title && (
          <label className="mb-3 text-sub-2 font-medium">{title}</label>
        )}
        <div>
          <input
            {...props}
            className="w-full border-b border-input-line focus:border-primary outline-none"
            // type={inputType}
            // placeholder="sample"
          />
        </div>

        {error && (
          <span className="text-xs text-expense-text mt-1">{error}</span>
        )}
      </Box>
    );
}