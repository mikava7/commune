"use client";
import { auth, signOut } from "@/auth";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { PostSchema } from "@/schemas";
import { PostSchema2 } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
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
import { post } from "@/actions/post";
import { UploadButton, OurFileRouter } from "@uploadthing/react";
const availableTags = [
  "post",
  "service",
  "announcement",
  "event",
  "thought",
  "product",
];
import LocationComponent from "../LocationComponent";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

import { usePathname, useRouter } from "next/navigation";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
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
      // tags: ["post"],
      // category: "default",
      // location: "default",
      // price: 0,
      image: undefined,
    },
  });

  const image = form.watch("image");

  const onSubmit = (values: z.infer<typeof PostSchema2>) => {
    setError("");
    setSuccess("");

    console.log("Form values:", values);
    startTransition(() => {
      post(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Dialog open={isCreatePage} onOpenChange={(open) => !open && router.back}>
        <DialogContent>
          <DialogTitle>Create new post</DialogTitle>

          <Form {...form}>
            <form
              action=""
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {!!image ? (
                <div className="h-96 md:h-[450] overflow-hidden rounded-md">
                  <AspectRatio>
                    <Image
                      src={image}
                      alt="Post preview"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <>
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
                              // Do something with the response
                              console.log("Files: ", res);
                              alert("Upload Completed");
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </>
              )}
              <Button
                // className="w-full"
                type="submit"
                // disabled={isPending}
                onClick={() => console.log("Clicked")}
              >
                Post
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* <Form {...form}>
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
            <FormField
              control={form.control}
              name="image"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">upload</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="image"
                      type="file"
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
      </Form> */}
    </div>
  );
};
