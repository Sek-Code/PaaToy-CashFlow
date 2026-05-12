"use client";
import React, { useState } from "react";
import { Box } from "./Box";
import { Divide } from "lucide-react";
import InputField from "./InputField";
import RadioButtonField from "./RadioButtonField";
import Image from "next/image";
import { IconField } from "./IconField";

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
    <div>
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
        <div className="absolute top-0 left-0 right-0 bottom-0 z-2 w-full max-w-5xl mx-auto bg-pink-400 flex flex-col gap-y-5">
          <div className="relative mx-9 mt-13 ">
            <button className="align-middle" onClick={() => setIsOpen(false)}>
              <Image
                width={16}
                height={16}
                src="/ep_arrow-up-bold.svg"
                alt="back-arrow"
              ></Image>
            </button>
            <h1 className="absolute text-sub-1 inline left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
              เพิ่มข้อมูล
            </h1>
          </div>
        <IconField/>

          <InputField title="ชื่อประเภท" placeholder="sample" />
          <RadioButtonField
            title="เลือกประเภท"
            choice={["รายจ่าย", "รายรับ"]}
          />
          <InputField title="จำนวนเงิน" placeholder="0.00" />
          <button>บันทึกข้อมูล</button>
        </div>
      )}
    </div>
  );
}
