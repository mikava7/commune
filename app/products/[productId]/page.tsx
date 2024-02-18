import React from "react";
import { getProductById } from "@/actions/products";
import { headers } from "next/headers";
import ProductPage from "@/components/ui/products/product";
import { Product } from "@/lib/definitions";
interface Props {
  productId: string;
}

const productPage = async ({ params }: { params: Props }) => {
  const id: string = params.productId;
// console.log(params)
  // const headersList = headers();
  // const domain = headersList.get("host") || "";
  // const fullUrl = headersList.get("referer") || "";
  // const id: string = (fullUrl.split("/").pop() as string) || "";

  const product: Product = await getProductById(id);

  return(

    
    <div className="h-screen">
      <ProductPage product={product} />;
    </div>
    ) 
};

export default productPage;
