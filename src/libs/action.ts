"use server";

import { classSchema, subjectSchema } from "@/libs/formValidationSchema";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { teachersData } from "./data";

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
          connect: parsed.teachers?.map(teacherId => ({ id: teacherId}))
        }
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
          set: parsed.teachers?.map(teacherId => ({ id: teacherId })),
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
      }
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}




const  formDataToObject = (formData: FormData) => {
  return Object.fromEntries(formData.entries());
}




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
      data: parsed
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
      }
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.error("createSubject error:", error);
    return { success: false, error: true };
  }
}