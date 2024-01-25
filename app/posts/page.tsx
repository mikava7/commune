import { getPosts } from "@/actions/posts";
import PostFeed from "@/components/ui/posts/post-feed";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/definitions";

interface User {
  id: string;
}
interface CustomSession {
  user?: User | null;
}

export default async function page() {
  const session: CustomSession = (await auth())!;

  const posts: Post[] = await getPosts();
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>
          <div>Sign Out</div>
        </Button>
      </form>
      <Link href={"/create"} className="flex items-center justify-center">
        <h1>Create New Post</h1>
      </Link>

      <PostFeed posts={posts} session={session} />
    </div>
  );
}
