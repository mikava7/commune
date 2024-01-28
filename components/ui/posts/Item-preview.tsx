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
      <div className=" w-9/10 h-full my-2 mx-2 bg-slate-100 rounded-tl rounded-bl">
        {values && (
        <div className="flex h-full w-full rounded-lg">
        <div className="w-4/6 flex h-full rounded-tl rounded-bl overflow-hidden">
          {values?.images && values?.images?.length > 0 ? (
            <Card className="flex h-full bg-slate-200 ">
              <Carousel>
                <CarouselContent>
                  {values.images &&
                    values?.images?.map((i) => (
                      <CarouselItem key={i}>
                        <div className="h-full w-full overflow-hidden rounded-md">
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
                <Card className="flex flex-col w-full h-full bg-gray-200 items-center justify-center py-5 px-5 ">
                  <CardTitle className="text-2xl font-bold mb-2">
                    Your Listing Preview
                  </CardTitle>
                  <CardDescription className="indent-1 text-xl tracking-normal">
                    As you create your listing,you can preview
                    <br className="tracking-wider" />
                    it will appear to others on Marketplace.
                  </CardDescription>
                </Card>
              )}
            </div>

            <div className="flex flex-col ">
              <div className="w-2/4  border border-red-900">
                <h2 className="text-blue ml-2">
                  {values.price ? values.price : "Price: "}
                </h2>
                <CardTitle className="text-lg	">
                  {values.title ? values.title : "Title"}
                </CardTitle>
                <div className="ml-2">
                  <div className="flex my-2">
                    <CardTitle>Condition:</CardTitle>
                    <p className="text-sm	">{values.condition}</p>
                  </div>
                  {/* <h2>{values.condition ? values.condition : "Condition: "}</h2> */}
                  <h2> {values.category ? values.category : "Category:"}</h2>
                  <CardDescription>{values.description}</CardDescription>
                  <h2>Location: {values.location}</h2>
                </div>
              </div>

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
