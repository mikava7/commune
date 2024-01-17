import { CreateForm } from "@/components/ui/posts/create-post";

export default async function Page() {
  const authorId: Number = 41;
  return (
    <main>
      <h1>Create new post</h1>
      <CreateForm />
    </main>
  );
}
