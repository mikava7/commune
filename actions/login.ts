"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);

  if (validatedFields.success !== true || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalide credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    // Include this error, otherwise, it may not redirect correctly
    throw error;
  }
};
