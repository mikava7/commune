import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deletePost } from "@/actions/posts";

export function EditPost({ id }: { id: string }) {
  return (
    <Link
      href={`posts/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePost({
  id,
  userId,
}: {
  id: string;
  userId: string | undefined;
}) {
  const deletePostWithId = deletePost.bind(null, id, userId);
  console.log("id in deletePost", id);

  return (
    <form action={deletePostWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-700">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
