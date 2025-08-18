"use server";

import { subjectSchema } from "@/libs/formValidationSchema";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function createSubject(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    // Parse formData into your schema
    const parsed = subjectSchema.parse({
      name: formData.get("name"),
    });

    await prisma.subject.create({
      data: {
        name: parsed.name,
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
    });
    await prisma.subject.update({
      where: {
        id: parsed.id,
      },
      data: {
        name: parsed.name,
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
    console.log("Deleting subject with ID:", id);
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