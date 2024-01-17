import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Minimum 6 required",
  }),
  name: z.string().min(1, {
    message: "Name 6 required",
  }),
});

export const PostSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  image: z.string().url({
    message: "Image must be a valid URL",
  }),
  tags: z.array(z.string()).min(1, {
    message: "At least one tag is required",
  }),
  category: z.string().optional(), // Optional field for post category
  location: z.string().optional(), // Optional field for post location
  price: z.number().min(0, {
    message: "Price must be a non-negative number",
  }),
});
export const PostSchema2 = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});
