"use clent";
import { Product } from "@/lib/definitions";
import ProductCard from "./Product-card";
import Link from "next/link";
export default function Products({ products }: { products: Product }) {
  // console.log("Products in Products", products);
  return (
    <div className="flex flex-wrap gap-3">
      {" "}
      {products.map((product: { id: String }): any => (
        <Link href={`/products/${product.id}`}>
          <ProductCard key={product.id} product={product} />
        </Link>
        // <div className="w-400 h-400 border-4 ">sss</div>
      ))}
    </div>
  );
}
