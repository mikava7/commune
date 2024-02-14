"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductSchema } from "@/schemas";
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
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { categories, conditions } from "@/lib/listing-type";
import ItemPreview from "../Item-preview";

export const CreateItem = () => {
  const pathname = usePathname();
  const isCreatePage = pathname === "/create";
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      condition: "",
      category: "",
      location: "",
      price: 0,
      images: [],
      image: undefined,
    },
  });
  const images = form.watch("image");
  // console.log("image", images);
  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
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
    <div className="h-full flex bg-white border border-black">
      <div className={`container`}>
        <Form {...form}>
          <div className="my-2">
            <CardTitle>Required</CardTitle>
            <CardDescription>Be as descriptive as possible.</CardDescription>
          </div>
          <form
            action=""
            className="space-y-4 flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Card className="h-54">
              <FormField
                control={form.control}
                name="images"
                render={({ field, fieldState }) => (
                  <FormItem className="bg-gray-200 ">
                    <CardDescription className="py-4 px-2 text-black">
                      Photos · 0 / 4 - You can add up to 10 photos.
                    </CardDescription>{" "}
                    <FormControl>
                      <UploadButton<OurFileRouter, "imageUploader">
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          console.log("res", res);
                          const newImages = res.map((item) => item.url);
                          // console.log("newImages", newImages);

                          form.setValue("images", newImages);
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
                      className="space-y-8 h-14 py-4 border border-gray-300 transition-all duration-300 hover:border-black focus:border-blue-500 focus:border-2 focus:border-solid "
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
                      className="space-y-8 h-14 py-4 border border-gray-300 transition-all duration-300 hover:border-black focus:border-blue-500 focus:border-2 focus:border-solid "
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
                    <FormControl className="h-14 text-[20px] text-gray-600 border border-gray-300 transition-all duration-300 hover:border-black focus:border-blue-500 focus:border-2 focus:border-solid">
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem
                          value={item.category}
                          className="flex h-14 items-center space-x-2 "
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
                    <FormControl className="h-14 text-[20px] text-gray-600 border border-gray-300 transition-all duration-300 hover:border-black focus:border-blue-500 focus:border-2 focus:border-solid">
                      <SelectTrigger>
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conditions.map((condition, index) => (
                        <SelectItem
                          value={condition}
                          className="flex items-center space-x-2 h-14 "
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

            <div
              onClick={() => setShowMore((prevState) => !prevState)}
              className="py-2 px-2 cursor-pointer hover:bg-red"
            >
              <CardTitle className="my-2">More Details</CardTitle>
              <div className="flex justify-between">
                <CardDescription>
                  Attract more interest by including more details.
                </CardDescription>
                <ChevronDownIcon className="h-6 w-6" />
              </div>
            </div>
            <div>
              {showMore && (
                <div className='w-full '>
                  <FormField
                    control={form.control}
                    name="description"
                    disabled={isPending}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl className="h-14 w-full text-[20px] text-gray-600 w-full border border-gray-300 transition-all duration-300 hover:border-black focus:border-blue-500 focus:border-2 focus:border-solid">
                          <Textarea
                            {...field}
                            placeholder="Description"
                            className="space-y-4 "
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
                        <FormControl className="h-14 w-full text-[20px] my-4 text-gray-600 border border-gray-300 transition-all duration-300 hover:border-black focus:border-blue-500 focus:border-2 focus:border-solid">
                          <Input
                            {...field}
                            placeholder="location"
                            type="text"
                            className="space-y-4 "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

           
            <Button type="submit" className='m-auto'>
              Post
            </Button>
            {}
          </form>
        </Form>
      </div>
      <div className="flex flex-1 justify-center w-full bg-gray-200 border-9 border-red-900">
        <ItemPreview values={form.getValues()} />
      </div>
    </div>
  );
};
