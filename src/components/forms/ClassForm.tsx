"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../InputField";
import {
  ClassSchema,
  classSchema,
  subjectSchema,
} from "@/libs/formValidationSchema";
import {
  createClass,
  createSubject,
  updateClass,
  updateSubject,
} from "@/libs/action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
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
    resolver: zodResolver(classSchema),
  });

  const [state, formAction] = React.useActionState(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
    }
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `Class has been ${
          type === "create" ? "created" : "updated"
        } successfully!`
      );
      router.refresh();
      setOpen(false);
    }
  }, [state]);

  const { teachers, grades } = relatedData || {};
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("capacity", data.capacity.toString());
    formData.append("gradeId", data.gradeId.toString());
    if (data.supervisorId) {
      formData.append("supervisorId", data.supervisorId);
    }
    // Add ID for updates
    if (type === "update" && data?.id) {
      formData.append("id", data.id.toString());
    }

    // Wrap the action call in startTransition
    startTransition(() => {
      formAction(formData);
    });
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>
      {type === "update" && data?.id && (
        <input type="hidden" {...register("id")} value={data.id} />
      )}
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        <InputField
          label="Class Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            {...register("supervisorId")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.teachers}
          >
            {teachers?.map(
              (teacher: { id: string; name: string; surname: string }) => {
                return (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} {teacher.surname}
                  </option>
                );
              }
            )}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Grade</label>
        <select
          {...register("gradeId")}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          defaultValue={data?.gradeId}
        >
          {grades?.map((grade: { id: number; level: number }) => {
            return (
              <option key={grade.id} value={grade.id}>
                {grade.level}
              </option>
            );
          })}
        </select>
        {errors.supervisorId?.message && (
          <p className="text-xs text-red-400">
            {errors.supervisorId.message.toString()}
          </p>
        )}
      </div>
      {state.error && <span>Something went wrong!</span>}

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

export default ClassForm;
