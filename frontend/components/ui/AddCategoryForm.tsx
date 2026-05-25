"use client";
import React from "react";
import Image from "next/image";
import { IconField } from "./IconField";
import InputField from "./InputField";
import RadioButtonField from "./RadioButtonField";
import { Controller, Control, UseFormRegister, FieldErrors, UseFormHandleSubmit, UseFormWatch } from "react-hook-form";
import * as z from "zod";
import { Box } from "./Box";

const formSchema = z.object({
  icon: z.string().min(1, "กรุณาเลือกไอคอน"),
  name: z.string().min(1, "กรุณากรอกชื่อประเภท"),
  type: z.enum(["รายจ่าย", "รายรับ"]),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "กรุณากรอกจำนวนเงินที่ถูกต้อง",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  onSubmit: (data: FormValues) => void;
}

export function AddCategoryForm({
  isOpen,
  onClose,
  control,
  register,
  handleSubmit,
  errors,
  watch,
  onSubmit,
}: AddCategoryFormProps) {
  if (!isOpen) return null;

  const selectedType = watch("type");
  const iconCategory = selectedType === "รายรับ" ? "income" : "expense";

  return (
    <div className="absolute pt-[53px] top-0 left-0 right-0 bottom-0 z-10 bg-neutral-bg flex flex-col gap-y-5">
      <div className="relative mx-9 ">
        <button className="align-middle" onClick={onClose}>
          <Image
            width={16}
            height={16}
            src="/ep_arrow-up-bold.svg"
            alt="back-arrow"
          ></Image>
        </button>
        <h1 className="absolute text-sub-1 inline top-[50%] translate-y-[-50%]  left-[50%] translate-x-[-50%] ">
          เพิ่มข้อมูล
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <IconField
              value={field.value}
              onChange={field.onChange}
              category={iconCategory}
              error={errors.icon?.message}
            />
          )}
        />

        <InputField
          title="ชื่อประเภท"
          placeholder="sample"
          error={errors.name?.message}
          {...register("name")}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <RadioButtonField
              title="เลือกประเภท"
              choice={["รายจ่าย", "รายรับ"]}
              value={field.value}
              onChange={field.onChange}
              error={errors.type?.message}
            />
          )}
        />

        <InputField
          title="จำนวนเงิน"
          prefix="฿"
          placeholder="0.00"
          error={errors.amount?.message}
          {...register("amount")}
        />

        <Box className="mx-9 px-9 py-[8.5px] bg-income-text text-center text-body font-medium text-white">
          <button type="submit">บันทึก</button>
        </Box>
      </form>
    </div>
  );
}

export { formSchema };
export type { FormValues };
