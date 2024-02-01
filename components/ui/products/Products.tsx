"use client";

import ProductCard from "./Product-card";

export default function Products({ products }: any) {
  console.log("Products in Products", products);
  return (
    <div>
      {" "}
      {products.map((product: { id: any }): any => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
