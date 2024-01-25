import { CreateForm } from "@/components/ui/posts/create-post";
import FormLinks from "@/components/ui/posts/form-links";
import Postypes from "../../../components/ui/posts/post-types";

export default async function Page() {
  return (
    <main className="h-full flex flex-col items-center justify-evenly">
      <h1 className="my-10">Choose listing type</h1>
      <Postypes />
    </main>
  );
}
