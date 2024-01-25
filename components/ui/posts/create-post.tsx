"use client";
import { auth, signOut } from "@/auth";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { PostSchema2 } from "@/schemas";
import { Button } from "../button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../textarea";
import { UploadButton, OurFileRouter } from "@uploadthing/react";

import LocationComponent from "../LocationComponent";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

import { usePathname, useRouter } from "next/navigation";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import FormLinks from "./form-links";

import { createPost } from "@/actions/posts";

export const CreateForm = () => {
  const pathname = usePathname();
  const isCreatePage = pathname === "/create";
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PostSchema2>>({
    resolver: zodResolver(PostSchema2),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });
  // console.log("form", form);
  const image = form.watch("image");
  // console.log("image", image);

  const onSubmit = (values: z.infer<typeof PostSchema2>) => {
    setError("");
    setSuccess("");

    console.log("Form values:", values);
    startTransition(() => {
      createPost(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* <FormLinks/> */}
      <Form {...form}>
        <form
          action=""
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Render text fields (title and description) */}
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Description"
                    className="space-y-4 w-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="picture">Picture</FormLabel>
                <FormControl>
                  <UploadButton<OurFileRouter, "imageUploader">
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      form.setValue("image", res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* {!!image && (
            <div className="h-96 md:h-[450] overflow-hidden rounded-md">
              <img src={image} alt="Post preview" width={400} height={400} />
            </div>
          )} */}

          <Button type="submit" onClick={() => console.log("Clicked")}>
            Post
          </Button>
          {}
        </form>
      </Form>
    </div>
  );
};
