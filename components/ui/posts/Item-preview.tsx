import { Product } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ItemPreview({ values }: { values: Product }) {
  console.log("values in ItemPreview", values);

  return (
    <div className="w-full h-full border border-red-900 mx-5 my-5 rounded-md  ">
      <CardTitle className="py-5 px-5 ">Preview</CardTitle>
      <div className="w-3/4 my-5 mx-5  border border-green-900 rounded-md">
        {values && (
          <div className="flex ">
            <Card className="flex h-full  border border-black bg-slate-200">
              <div className="h-96 md:h-[450] overflow-hidden rounded-md">
                <img
                  src={values.image}
                  alt="Post preview"
                  width={400}
                  height={400}
                />
              </div>
            </Card>
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
        )}
      </div>
    </div>
  );
}
