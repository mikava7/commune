import { getPosts } from "@/actions/posts";
// import { Post } from "../lib/definitions";
import PostFeed from "@/components/ui/posts/post-feed";
import Link from "next/link";

export default async function page() {
  const posts = await getPosts();
  console.log("posts", posts);
  return (
    <div>
      <Link href={"/create"} className="flex items-center justify-center">
        <h1>Create New Post</h1>
      </Link>

      <PostFeed posts={posts} />
    </div>
  );
}
