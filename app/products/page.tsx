import { Post, CustomSession } from "@/lib/definitions";
import Products from "@/components/ui/products/Products";
import { getProducts } from "@/actions/products";

export default async function page() {
  // console.log("session in post", session);
  const products: Post[] = await getProducts();
  console.log("products", products);
  return (
    <div>
      <Products products={products} />
    </div>
  );
}
