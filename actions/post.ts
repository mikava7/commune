"use server";

import * as z from "zod";
import { PostSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

type PostCreateInput = {
  title: string;
  description: string;
  category?: string | null;
  location?: string | null;
  price?: number | null;
  image?: string; // Add the missing 'image' property
};

export const post = async (values: z.infer<typeof PostSchema>) => {
  const session = await auth();
  console.log("session", session);

  console.log(values);
  const validatedFields = PostSchema.safeParse(values);
  console.log("validatedFields", validatedFields);

  if (validatedFields.success !== true || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const { title, description, category, location, price, ...tags } =
    validatedFields.data;

  const createInput: PostCreateInput = {
    title,
    description,
    category,
    location,
    price,
    image,
  };

  try {
    await db.post.create({
      data: createInput,
    });
    console.log("Post created successfully");
    return { success: "Post created successfully" };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post." };
  } finally {
    await db.$disconnect();
    // Commenting out revalidatePath and redirect for now
    // revalidatePath("/");
    // redirect("/");
  }
};
