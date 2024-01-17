"use client";
import { auth, signOut } from "@/auth";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
// import { PostSchema } from "@/schemas";
import { PostSchema2 } from "@/schemas";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "../button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../textarea";
import { post } from "@/actions/post";
const availableTags = [
  "post",
  "service",
  "announcement",
  "event",
  "thought",
  "product",
];
import LocationComponent from "../LocationComponent";

export const CreateForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PostSchema2>>({
    resolver: zodResolver(PostSchema2),
    defaultValues: {
      title: "",
      description: "",
      // tags: ["post"],
      // category: "default",
      // location: "default",
      // price: 0,
      // image: "default",
    },
  });

  const onSubmit = (values: z.infer<typeof PostSchema2>) => {
    setError("");
    setSuccess("");
    console.log("Check if this function invokes or not.");
    // post(values);
    console.log("Form values:", values);
    startTransition(() => {
      post(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="space-y-4 w-[400px]">
              {availableTags.map((tag) => (
                <Button key={tag} className="mx-4">
                  {tag}
                </Button>
              ))}
            </div>
            <LocationComponent />
            <FormField
              control={form.control}
              name="title"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="Title"
                      type="title"
                      className="space-y-4 w-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      // disabled={isPending}
                      placeholder="Description new"
                      className="space-y-4 w-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button
            // className="w-full"
            type="submit"
            // disabled={isPending}
            onClick={() => console.log("Clicked")}
          >
            Post
          </button>
        </form>
      </Form>
    </CardWrapper>
  );
};
