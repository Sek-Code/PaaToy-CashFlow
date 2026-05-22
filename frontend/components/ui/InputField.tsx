import React from 'react'
import { Box } from './Box';

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  title?: string;
  error?: string;
  className?: string;
  prefix?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function InputField({ 
  title = '', 
  error = "", 
  className = "", 
  prefix,
  ref, 
  ...props 
}: Props) {
  return (
    <Box className={`mx-9 px-9 py-4 flex flex-col ${className}`}>
      {title && <label className="mb-3 text-sub-2 font-medium">{title}</label>}
      <div className="flex items-center border-b py-1 border-input-line focus-within:border-primary">
        {prefix && <span className="mr-1 text-sub-2">{prefix}</span>}
        <input {...props} ref={ref} className="w-full outline-none" />
      </div>

      {error && <span className="text-xs text-expense-text mt-1">{error}</span>}
    </Box>
  );
}