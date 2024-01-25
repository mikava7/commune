"use server";

import * as z from "zod";
import { ProductShema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

export const createProduct = async (values: z.infer<typeof ProductShema>) => {
  const session = await auth();
  const userId: string | undefined = session?.user?.id;

  const validatedFields = ProductShema.safeParse(values);

  if (validatedFields.success !== true || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const { title, price, condition, description, image, category, location } =
    validatedFields.data;
  console.log({
    title,
    price,
    condition,
    description,
    image,
    category,
    location,
  });
  try {
    await db.product.create({
      data: {
        image,
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
