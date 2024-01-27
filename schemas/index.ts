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
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must not be longer than 1000 characters.",
    })
    .optional(),
  image: z.string().url(),
  images: z.array(z.string().url()), 
});

export const ProductShema = PostSchema2.merge(
  z.object({
    // Add additional properties specific to ProductShema
    price: z
      .number()
      .min(0, { message: "Price must be a non-negative number." }),
    condition: z.string().optional(),
    category: z.string().optional(),
    location: z.string().optional(),
  })
);
