import { Product } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ItemPreview({ values }: { values: Product }) {
  // console.log("values in ItemPreview", values);

  return (
    <div className="itemContainer">
      <CardTitle className="py-1 ml-2">Preview</CardTitle>
      <div className=" w-full h-full my-2 mx-2 border rounded-lg">
        {values && (
          <div className="flex h-full w-full ">
            <div className="w-4/6 flex h-full overflow-hidden">
              {values?.images && values?.images?.length > 0 ? (
                <Card className="flex h-full bg-gray-100">
                  <Carousel>
                    <CarouselContent>
                      {values.images &&
                        values?.images?.map((i) => (
                          <CarouselItem key={i}>
                            <div className="h-full w-full overflow-hidden">
                              <img
                                src={i}
                                alt="Post preview"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </Card>
              ) : (
                <div className="flex flex-col w-full h-full bg-gray-100 items-center justify-center rounded-l-lg">
                  <h2 className="text-[1.35rem] text-gray-600 font-bold mb-1">
                    Your Listing Preview
                  </h2>
                  <CardDescription className=" text-xl tracking-normal text-center">
                    As you create your listing, you can preview
                    <br className="tracking-wider" />
                    it will appear to others on Marketplace.
                  </CardDescription>
                </div>
              )}
            </div>

            <div className="flex flex-col text-gray-500">
              <div className="w-full ml-2 pl-2 pt-2">
                <h1 className="text-xl text-black font-bold">
                  {values.title ? (
                    values.title
                  ) : (
                    <h1 className="text-2xl text-gray-500">Title</h1>
                  )}
                </h1>
                <h1>{values.price ? values.price : "Price "}</h1>

                <p className="text-xs">
                  Listed a few seconds ago in <span>Brussels</span>
                </p>
                <div className="flex flex-col my-4">
                  <div className="flex flex-col my-2">
                    <h1
                      className={`block font-bold mb-2 ${
                        values.condition ? "text-black" : "text-gray-500"
                      }`}
                    >
                      Details
                    </h1>
                    {values.condition && (
                      <div className="flex  gap-8 items-center">
                        <h2 className="text-black font-semibold">Condition</h2>
                        <p className="text-sm text-black capitalize">
                          {values.condition}
                        </p>
                      </div>
                    )}
                  </div>
                  <span className="text-sm py-2">
                    Description will appear here
                  </span>
                  <div className="div flex h-16 w-5/6 border-2 rounded-lg bg:gray-700"></div>

                  <div>
                    {values.location && (
                      <div className="flex flex-col my-1">
                        <span className="text-black font-bold">Brussels</span>
                        <span className="text-sm">Loaction is approximate</span>
                      </div>
                    )}
                  </div>
                  {/* <h2>{values.condition ? values.condition : "Condition: "}</h2> */}
                  {/* <h2> {values.category ? values.category : "Category:"}</h2> */}
                  <CardDescription>{values.description}</CardDescription>
                </div>
              </div>
              <br className="border-b-4" />
              <div>
                <CardTitle className="py-5 px-5 ">Seller Information</CardTitle>

                <CardHeader className="h-[50] ">user profile info</CardHeader>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
