import { CreateForm } from "@/components/ui/posts/create-post";
import { CreateProduct } from "@/components/ui/posts/create-product";
import FormLinks from "@/components/ui/posts/form-links";
import Postypes from "../../../components/ui/posts/post-types";

export default async function Page() {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <h1>Choose listing type</h1>
      <Postypes />
      {/* <FormLinks />
      <CreateForm />
      <CreateProduct /> */}
    </main>
  );
}
