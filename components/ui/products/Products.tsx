"use clent";
import { Product } from "@/lib/definitions";
import ProductCard from "./Product-card";

export default function Products({ products }: { products: Product }) {
  // console.log("Products in Products", products);
  return (
    <div className="flex flex-wrap gap-3">
      {" "}
      {products.map((product: { id: String }): any => (
        <ProductCard key={product.id} product={product} />
        // <div className="w-400 h-400 border-4 ">sss</div>
      ))}
    </div>
  );
}
