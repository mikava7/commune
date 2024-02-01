"use client";

import ProductCard from "./Product-card";

export default function Products({ products }: any) {
  return (
    <div>
      {" "}
      {products.map((product): any => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
