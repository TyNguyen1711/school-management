"use server";

import {
  classSchema,
  subjectSchema,
  teacherSchema,
} from "@/libs/formValidationSchema";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { teachersData } from "./data";
import { clerkClient } from "@clerk/nextjs/server";
import { checkCurrentId } from "./utils";
import { success } from "zod";
import { error } from "console";

export async function createSubject(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    const parsed = subjectSchema.parse({
      name: formData.get("name"),
      teachers: formData.getAll("teachers") as string[],
    });

    await prisma.subject.create({
      data: {
        name: parsed.name,
        teachers: {
          connect: parsed.teachers?.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}

export async function updateSubject(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    // console.log("test: ", formData)
    const parsed = subjectSchema.parse({
      name: formData.get("name"),
      id: formData.get("id"),
      teachers: formData.getAll("teachers") as string[],
    });
    await prisma.subject.update({
      where: {
        id: parsed.id,
      },
      data: {
        name: parsed.name,
        teachers: {
          set: parsed.teachers?.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}

export async function deleteSubject(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    const id = formData.get("id") as string;

    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}

// const formDataToObject = (formData: FormData, arrayFields: string[] = []) => {
//   const result: Record<string, any> = {};

//   // Get all unique keys
//   const keys = Array.from(formData.keys());

//   for (const key of keys) {
//     if (arrayFields.includes(key)) {
//       // Handle array fields
//       result[key] = formData.getAll(key);
//     } else {
//       // Handle single value fields
//       result[key] = formData.get(key);
//     }
//   }

//   return result;
// };

const formDataToObject = (formData: FormData) => {
  return Object.fromEntries(formData.entries());
};

export async function createClass(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    const parsed = classSchema.parse(formDataToObject(formData));

    await prisma.class.create({
      data: parsed,
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}

export async function updateClass(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    const parsed = classSchema.parse(formDataToObject(formData));

    await prisma.class.update({
      where: {
        id: parsed.id,
      },
      data: parsed,
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}

export async function deleteClass(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    const id = formData.get("id") as string;

    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}

export async function createTeacher(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    const userId = await checkCurrentId();
    const rawData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      img: formData.get("img") as string,
      bloodType: formData.get("bloodType") as string,
      birthday: formData.get("birthday") as string,
      sex: (formData.get("sex") as string)?.toUpperCase(),
      subjects: formData.getAll("subjects") as string[], // Use getAll for multiple select
    };
    const parsed = teacherSchema.parse(rawData);

    const client = await clerkClient();

    const user = await client.users.createUser({
      username: parsed.username,
      password: parsed.password,
      firstName: parsed.name,
      lastName: parsed.surname,
      publicMetadata: { role: "teacher" },
    });
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: parsed.username,
        name: parsed.name,
        surname: parsed.surname,
        email: parsed.email || null,
        phone: parsed.phone || null,
        address: parsed.address,
        img: parsed.img || null,
        bloodType: parsed.bloodType,
        sex: parsed.sex,
        birthday: parsed.birthday,
        subjects: {
          connect: parsed.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);

    return { success: false, error: true };
  }
}

export async function updateTeacher(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    if (!formData.get("id")) {
      return { success: false, error: true };
    }
    const rawData = {
      id: formData.get("id") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      img: formData.get("img") as string,
      bloodType: formData.get("bloodType") as string,
      birthday: formData.get("birthday") as string,
      sex: (formData.get("sex") as string)?.toUpperCase(),
      subjects: formData.getAll("subjects") as string[], // Use getAll for multiple select
    };
    const parsed = teacherSchema.parse(rawData);

    const client = await clerkClient();
    if (parsed.id) {
      const user = await client.users.updateUser(parsed.id, {
        username: parsed.username,
        ...(parsed.password !== "" && {password: parsed.password}),
        firstName: parsed.name,
        lastName: parsed.surname,
        publicMetadata: { role: "teacher" },
      });
    }

    await prisma.teacher.update({
      where: {
        id: parsed.id,
      },
      data: {
        ...(parsed.password !== "" && {password: parsed.password}),
        username: parsed.username,
        name: parsed.name,
        surname: parsed.surname,
        email: parsed.email || null,
        phone: parsed.phone || null,
        address: parsed.address,
        img: parsed.img || null,
        bloodType: parsed.bloodType,
        sex: parsed.sex,
        birthday: parsed.birthday,
        subjects: {
          set: parsed.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}

export async function deleteTeacher(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    const id = formData.get("id") as string;
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}
