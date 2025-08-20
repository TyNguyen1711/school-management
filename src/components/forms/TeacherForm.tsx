"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import InputField from "../InputField";
import Image from "next/image";
import { teacherSchema } from "@/libs/formValidationSchema";
import { createTeacher, updateTeacher } from "@/libs/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "create" | "update";
  data?: any;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teacherSchema),
  });

  const [state, formAction] = React.useActionState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );
  const [img, setImage] = useState<any>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(
        `Subject has been ${
          type === "create" ? "created" : "updated"
        } successfully!`
      );
      router.refresh();
      setOpen(false);
    }
  }, [state]);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    // Required fields
    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("address", data.address);
    formData.append("bloodType", data.bloodType);
    formData.append("sex", data.sex);

    // Date field - convert to ISO string
    if (data.birthday) {
      formData.append("birthday", data.birthday.toISOString());
    }

    // if (data.password && data.password.trim() !== "") {
    //   formData.append("password", data.password);
    // }

    // if (data.email && data.email.trim() !== "") {
    //   formData.append("email", data.email);
    // }

    // if (data.phone && data.phone.trim() !== "") {
    //   formData.append("phone", data.phone);
    // }

    // if (data.img && data.img.trim() !== "") {
    //   formData.append("img", data.img);
    // }

    // if (data.subjects && Array.isArray(data.subjects)) {
    //   data.subjects.forEach((subjectId) => {
    //     formData.append("subjects", subjectId);
    //   });
    // }

    formData.append("password", data.password || "");

    formData.append("email", data.email || "");

    formData.append("phone", data.phone || "");

    formData.append("img", data.img || "");

    if (data.subjects && Array.isArray(data.subjects)) {
      data.subjects.forEach((subjectId) => {
        formData.append("subjects", subjectId);
      });
    }

    if (type === "update" && data?.id) {
      formData.append("id", data.id.toString());
    }

    startTransition(() => {
      formAction(formData);
    });
  });
  const { subjects } = relatedData;
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update a teacher"}
      </h1>
      <div className="text-xs text-gray-500 font-medium">
        Authentication Infomation
      </div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        {type === "update" && data?.id && (
          <input type="hidden" value={data.id} {...register("id")} />
        )}
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
        <InputField
          label="First Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
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
          defaultValue={data?.birthday.toISOString().split("T")[0]}
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
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            {...register("subjects")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => {
              return (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              );
            })}
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <input
          type="hidden"
          name="img"
          value={img?.secure_url || img?.url || ""}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center mt-4 md:mt-0 items-center">
          <CldUploadWidget
            uploadPreset="school"
            onSuccess={(result, { widget }) => {
              setImage(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  onClick={() => open()}
                  className="text-xs text-gray-500 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Image src="/upload.png" alt="" height={28} width={28} />
                  <span>Upload a photo</span>
                </div>
              );
            }}
          </CldUploadWidget>
          {img && (
            <Image
              src={img?.secure_url || img?.url || ""}
              alt="Teacher profile picture"
              width={100}
              height={100}
              className="rounded-md"
            />
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button
        type="submit"
        className="bg-blue-500 p-2 text-white rounded-md"
        disabled={isPending}
      >
        {isPending ? "Processing..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
