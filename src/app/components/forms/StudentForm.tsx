"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 charaters long!" })
    .max(20, { message: "Username must be at most 20 charters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstname: z.string().min(1, { message: "Firstname is required !" }),
  lastname: z.string().min(1, { message: "Lastname is required !" }),
  phone: z.string().min(1, { message: "Phone is required !" }),
  address: z.string().min(1, { message: "Address is required !" }),
  bloodType: z.string().min(1, { message: "Blood type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male, female"], { message: "Sex is required!" }),
  photo: z.instanceof(File, { message: "Image is required!" }),
});
const StudentForm = ({
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
        {type === "create" ? "Create a new student" : "Update a student"}
      </h1>
      <div className="text-xs text-gray-500 font-medium">
        Authentication Infomation
      </div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        {" "}
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>

      <div className="text-xs text-gray-500">Personal infomation</div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        {" "}
        <InputField
          label="First Name"
          name="firstname"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstname}
        />
        <InputField
          label="Last Name"
          name="lastname"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
      </div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        {" "}
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          type="date"
          name="birthday"
          defaultValue={data?.dateOfBirth}
          register={register}
          error={errors.birthday}
        />
      </div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        {" "}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center mt-4 md:mt-0">
          <label
            className="text-xs text-gray-500 flex items-center justify-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" height={28} width={28} />
            <span>Upload a photo</span>
          </label>
          <input
            id="img"
            className="hidden"
            type="file"
            {...register("photo")}
            // defaultValue={data?.img}
          />
          {errors.photo?.message && (
            <p className="text-xs text-red-400">
              {errors.photo.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button className="bg-blue-500 p-2 text-white rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
