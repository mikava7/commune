import React from "react";
import { getProductById } from "@/actions/products";
import { headers } from "next/headers";
import ProductPage from "@/components/ui/products/product";
const productPage = async () => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const id:String = fullUrl.split("/").pop();

  // console.log("fullUrl", id);
  const product = await getProductById(id);
  // console.log("product", product);
  // console.log("headersList", headersList);

  return (
    <div>
      <ProductPage product={product} />
    </div>
  );
};

export default productPage;
