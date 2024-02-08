"use clent";
import { Product } from "@/lib/definitions";
import ProductCard from "./Product-card";
import Link from "next/link";
export default function Products({ products }: { products: Product[] }) {
  // console.log("Products in Products", products);
  return (
    <div className="flex flex-wrap gap-3">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
