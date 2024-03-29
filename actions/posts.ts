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

export const createPost = async (values: z.infer<typeof PostSchema2>) => {
  const session = await auth();
  const userId: string | undefined = session?.user?.id;

  const validatedFields = PostSchema2.safeParse(values);

  if (validatedFields.success !== true || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const { title, description, image } = validatedFields.data;

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
  const session = await auth();
  const userId = session?.user?.id;

  try {
    // Fetch the post details
    const post = await db.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return { errors: { message: "Post not found." } };
    }
    // console.log("post", post);

    // console.log("authorId before condition:", post?.authorId);
    // console.log("userId before condition:", userId);

    // Check if the logged-in user is the author of the post
    if (post.authorId !== userId) {
      throw new Error("You do not have permission to delete this post.");
    }

    // Delete the post if the checks pass
    await db.post.delete({
      where: {
        id,
      },
    });

    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { errors: { message: "Failed to delete post." } };
  } finally {
    // Disconnect from Prisma and trigger revalidation and redirection
    await db.$disconnect();
    revalidatePath("/posts/");
    redirect("/posts/");
  }
}
