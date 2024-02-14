import { Product } from "@/lib/definitions";
import Products from "@/components/ui/products/Products";
import { getProducts } from "@/actions/products";

export default async function page() {
  // console.log("session in post", session);
  const products = (await getProducts()) as Product[];
  // console.log("products in server before passing to client", products);

  return (
    <div className="bg-blue-500">
      <Products products={products} />
    </div>
  );
}
