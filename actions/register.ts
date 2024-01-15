"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { PrismaClient } from "@/prisma/generated/client";
import { db } from "@/lib/db";
const prisma = new PrismaClient();

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log("register values", values);

  const validatedFields = RegisterSchema.safeParse(values);

  if (validatedFields.success !== true || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email
  return { success: "User created!" };
};