'use client'
import React from 'react'
import { Box } from './Box'

type Props = { children?: React.ReactNode };

export function EditButton({children}: Props) {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      alert("Button clicked!");
    };

    return (
      <Box
        className=" m-5 py-2.5 flex justify-center cursor-pointer rounded-[5px] border border-expense-text"
        onClick={handleClick}
        category="expense"
      >
        <img src="/editPencil.svg" alt="pencil" className="mr-2.5" />
        <span className="text-body font-medium text-expense-text">
          {children}
        </span>
      </Box>
    );
}