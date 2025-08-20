"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../InputField";
import { subjectSchema } from "@/libs/formValidationSchema";
import { createSubject, updateSubject } from "@/libs/action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
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
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(subjectSchema),
  });
  console.log("Data: ", data);
  const [state, formAction] = React.useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    // Handle teachers array
    if (data.teachers && Array.isArray(data.teachers)) {
      data.teachers.forEach((teacherId) => {
        formData.append("teachers", teacherId);
      });
    }

    // Add ID for updates

    console.log("Data2: ", data);
    if (type === "update" && data?.id) {
      formData.append("id", data.id.toString());
    }

    // Wrap the action call in startTransition
    startTransition(() => {
      formAction(formData);
    });
  });

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

  const { teachers } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      {/* Rest of your form JSX remains the same */}
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>

      {type === "update" && data?.id && (
        <input type="hidden" value={data.id} {...register("id")} />
      )}

      <div className="flex justify-between gap-3 flex-col md:flex-row">
        <InputField
          label="Name Subject"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            multiple
            {...register("teachers")}
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
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
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

export default SubjectForm;
