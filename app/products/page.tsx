import { Product } from "@/lib/definitions";
import Products from "@/components/ui/products/Products";
import { getProducts } from "@/actions/products";

export default async function page() {
  // console.log("session in post", session);
  const products: Product[] = await getProducts();
  console.log("products in server before passing to client", products);

  return (
    <div>
      <Products products={products} />
    </div>
  );
}
