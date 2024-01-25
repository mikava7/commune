"use client";
import { auth, signOut } from "@/auth";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductShema } from "@/schemas";
import { Button } from "../../button";
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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "../../textarea";
import { createProduct } from "@/actions/product";
import { UploadButton, OurFileRouter } from "@uploadthing/react";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { categories, conditions } from "@/lib/listing-type";

export const CreateItem = () => {
  const pathname = usePathname();
  const isCreatePage = pathname === "/create";
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductShema>>({
    resolver: zodResolver(ProductShema),
    defaultValues: {
      title: "",
      description: "",
      condition: "",
      category: "",
      location: "",
      price: 0,
      image: undefined,
    },
  });
  const image = form.watch("image");

  const onSubmit = (values: z.infer<typeof ProductShema>) => {
    setError("");
    setSuccess("");

    console.log("Form values:", values);
    startTransition(() => {
      createProduct(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="h-full flex flex-col ">
      <div className="my-2">
        <CardTitle>Required</CardTitle>
        <CardDescription>Be as descriptive as possible.</CardDescription>
      </div>

      <Form {...form}>
        <form
          action=""
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card className="h-54">
            <FormField
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FormItem>
                  <CardDescription className="pl-4 px-2">
                    Photos · 0 / 10 - You can add up to 10 photos.
                  </CardDescription>{" "}
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
          </Card>

          <FormField
            control={form.control}
            name="title"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title"
                    type="text"
                    className="space-y-4 w-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Price"
                    type="number"
                    defaultValue=""
                    className="space-y-4 w-[400px] "
                    onChange={(event) =>
                      field.onChange(parseFloat(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem
                        value={item.category}
                        className="flex items-center space-x-2"
                        key={item.category}
                      >
                        <div className="flex items-center space-x-2 cursor-pointer">
                          {item.icon && (
                            <span className="w-25">{item.icon}</span>
                          )}
                          <span className="w-75">{item.category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condition"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {conditions.map((condition, index) => (
                      <SelectItem
                        value={condition}
                        className="flex items-center space-x-2"
                        key={index}
                      >
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Card
            onClick={() => setShowMore((prevState) => !prevState)}
            className="py-2 px-2 cursor-pointer hover:bg-grey-800"
          >
            <CardTitle className="my-2">More Details</CardTitle>
            <div className="flex justify-between">
              <CardDescription>
                Attract more interest by including more details.
              </CardDescription>
              <ChevronDownIcon className="h-6 w-6" />
            </div>
          </Card>
          {showMore && (
            <>
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
                name="location"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="location"
                        type="text"
                        className="space-y-4 w-[400px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
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
