"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 charaters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(1, { message: "Phone is required !" }),
  address: z.string().min(1, { message: "Address is required !" }),
});
const ParentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new parent" : "Update a parent"}
      </h1>
      <div className="text-xs text-gray-500 font-medium">
        Authentication Infomation
      </div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        {" "}
        <InputField
          label="Name"
          name="username"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />{" "}
      </div>

      <div className="text-xs text-gray-500">Personal infomation</div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
      </div>

      <button className="bg-blue-500 p-2 text-white rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ParentForm;
