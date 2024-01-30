"use server";

import * as z from "zod";
import { ProductSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  const session = await auth();
  const userId: string | undefined = session?.user?.id;

  const validatedFields = ProductSchema.safeParse(values);
  console.log("values in backend", values);
  if (validatedFields.success !== true || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const {
    title,
    price,
    condition,
    description,
    image,
    images,
    category,
    location,
  } = validatedFields.data;
  console.log({
    title,
    price,
    condition,
    description,
    images,
    category,
    location,
  });
  try {
    await db.product.create({
      data: {
        images: {
          create: values.images.map((url: string) => ({
            title: "Image Title",
            url,
          })),
        },
        title,
        price,
        description,
        location,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log("Product listed successfully");
    return { success: "Product listed successfully" };
  } catch (error) {
    console.error("Error listing product:", error);
    return { error: "Failed to list product." };
  } finally {
    await db.$disconnect();
    // Commenting out revalidatePath and redirect for now
    revalidatePath("/posts");
    redirect("/posts");
  }
};
