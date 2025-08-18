// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import InputField from "../InputField";
// import Image from "next/image";
// import { subjectSchema } from "@/libs/formValidationSchema";
// import { createSubject } from "@/libs/action";
// import { useFormState } from "react-dom";
// import ReactDOM from "react-dom";
// const SubjectForm = ({
//   type,
//   data,
// }: {
//   type: "create" | "update";
//   data?: any;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(subjectSchema),
//   });
//   const [state, formAction] = ReactDOM.useFormState(createSubject, {
//     success: false,
//     error: false,
//   });
//   const onSubmit = handleSubmit((data) => {
//     // createSubject(data);
//     formAction(data);
//     console.log(data);
//   });
//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create a new subject" : "Update the subject"}
//       </h1>

//       <div className="flex justify-between gap-3 flex-col md:flex-row">
//         <InputField
//           label="Name Subject"
//           name="name"
//           defaultValue={data?.subject}
//           register={register}
//           error={errors.name}
//         />
//       </div>
//       {state.error && <span>Something wrong!!!</span>}
//       <button className="bg-blue-500 p-2 text-white rounded-md">
//         {type === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default SubjectForm;
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction, isPending] = React.useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );
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
  return (
    <form className="flex flex-col gap-8" action={formAction}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>
      {type === "update" && data?.id && (
        <input type="hidden" name="id" value={data.id} />
      )}
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        <InputField
          label="Name Subject"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
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
