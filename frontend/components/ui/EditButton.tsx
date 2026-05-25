"use client";
import React, { useState } from "react";
import { Box } from "./Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCategoryForm, formSchema, FormValues } from "./AddCategoryForm";

type Props = { children?: React.ReactNode };

export function EditButton({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "รายจ่าย",
      amount: "",
      icon: "",
      name: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    setIsOpen(false);
    reset();
  };

  return (
    <div>
      <Box
        className=" m-5 py-2.5 flex justify-center cursor-pointer rounded-[5px] border border-expense-text"
        onClick={() => setIsOpen(true)}
        category="expense"
      >
        <img src="/editPencil.svg" alt="pencil" className="mr-2.5" />
        <span className="text-body font-medium text-expense-text">
          {children}
        </span>
      </Box>

      <AddCategoryForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        control={control}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
      />
    </div>
  );
}
