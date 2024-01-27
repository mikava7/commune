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

export default function ItemPreview({ values }: { values: Product }) {
  console.log("values in ItemPreview", values);

  return (
    
    <div className="flex flex-col w-9/10 h-4/5 bg-white border border-red-900 mx-5 my-5 rounded-md  ">
    
      <CardTitle className="py-5 px-5 ">Preview</CardTitle>
      <div className="w-9/10 h-9/10 my-5 mx-5  border border-green-900 rounded-md">
        {values && (
          <div className="flex h-full ">
            <div className="w-3/4 flex h-full bg-gray-200">
              {values?.images && values?.images?.length > 0 ? (
                <Card className="flex h-full bg-slate-200">
                  <Carousel>
                    <CarouselContent>
                      {values.images &&
                        values?.images?.map((i) => (
                          <CarouselItem>
                            <div className="h-96 md:h-[450] overflow-hidden rounded-md">
                              <img
                                src={i}
                                alt="Post preview"
                                width={400}
                                height={400}
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
                <Card className="flex flex-col bg-gray-200 items-center justify-center py-5 px-5">
                  <CardTitle className="text-lg">
                    Your Listing Preview
                  </CardTitle>
                  <CardDescription>
                    As you create your listing, you can preview
                    <br />
                    it will appear to others on Marketplace
                  </CardDescription>
                </Card>
              )}
            </div>

            <div className="flex flex-col">
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
