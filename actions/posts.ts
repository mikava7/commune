"use server";

import * as z from "zod";
import { PostSchema, PostSchema2 } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

type PostCreateInput = {
  title: string;
  description: string;
  image: string;
  user: {
    id: string | undefined;
  };
};

export const post = async (values: z.infer<typeof PostSchema2>) => {
  const session = await auth();
  const userId: string | undefined = session?.user?.id;
  console.log("session", session);

  console.log(values);
  const validatedFields = PostSchema2.safeParse(values);

  console.log("validatedFields", validatedFields);

  if (validatedFields.success !== true || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const { title, description, image } = validatedFields.data;
  console.log("imageimage", image);

  try {
    await db.post.create({
      data: {
        title,
        description,
        image,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log("Post created successfully");
    return { success: "Post created successfully" };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post." };
  } finally {
    await db.$disconnect();
    // Commenting out revalidatePath and redirect for now
    revalidatePath("/posts");
    redirect("/posts");
  }
};

export async function getPosts() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc", // Sorting by the createdAt field in descending order
      },
    });
    return posts;
  } catch (error: any) {
    throw new Error("Failed to fetch posts: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await db.$disconnect();
  }
}

export async function deletePost(id: string) {
  console.log("id in deletePost", id);

  try {
    await db.post.delete({
      where: {
        id,
      },
    });
    return { message: "Post deleted successfully" };
  } catch (error) {
    return { errors: { message: "Failed to delete post." } };
  } finally {
    // Disconnect from Prisma and trigger revalidation and redirection
    await prisma.$disconnect();
    revalidatePath("/posts/");
    redirect("/posts/");
  }
}
