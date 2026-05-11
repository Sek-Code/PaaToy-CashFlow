"use client";
import React, { useState } from "react";
import { Box } from "./Box";
import { Divide } from "lucide-react";
import InputField from "./InputField";
import RadioButtonField from "./RadioButtonField";

type Props = { children?: React.ReactNode };

export function EditButton({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Button clicked!");
    console.log("Button clicked!");
    setIsOpen(true);
  };

  return (
    <>
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

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-amber-400 flex flex-col max-w-5xl">
          <button onClick={() => setIsOpen(false)}>Close</button>
          <RadioButtonField
            title="เลือกประเภท"
            choice={["รายรับ", "รายจ่าย"]}
          />
          <div>เพิ่มข้อมูล</div>
          <Box className="mx-9 my-5 px-9 py-4">
            <div>เลือกไอคอน</div>
            <div>list of icon</div>
          </Box>

          <InputField title="ชื่อประเภท" placeholder="sample" />
          <InputField title="จำนวนเงิน" placeholder="0.00" />
        </div>
      )}
    </>
  );
}
