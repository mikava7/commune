"use client";
// import { Post } from "@/app/lib/definitions";
import { DeletePost, EditPost } from "./buttons";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Session } from "@/lib/definitions";
type Post = {
  [x: string]: any;
  title: string;
  description: string;
  image: string;
  authorId: string;
};

const PostContainer = ({
  posts,
  session,
}: {
  posts: Post;
  session: Session | null | undefined;
}) => {
  const { title, description, image } = posts;

  const userId = session?.user?.id;

  return (
    <div className="flex flex-col justify-center items-center">
      {" "}
      {posts?.map(
        (post: {
          id: string;
          title: string;
          description: string;
          image: string;
          authorId: string;
        }) => (
          <div
            className="max-w-md w-full mx-4 my-6 p-4 bg-white border rounded-md shadow-md"
            key={post.id}
          >
            {" "}
            <h1 className="text-xl font-semibold mb-2 text-center">
              {post.title}
            </h1>
            <p className="text-gray-600 mb-4">
              {post.description.split(" ").slice(0, 100).join(" ")}
              {post.description.split(" ").length > 100 && (
                <Link href={`/posts/${post.id}`}>
                  <a className="text-blue-500"> read more</a>
                </Link>
              )}
            </p>
            <div className="h-64 md:h-96 overflow-hidden rounded-md">
              {" "}
              {!!post.image && (
                <AspectRatio>
                  <img
                    src={post?.image}
                    alt="Post preview"
                    width={400}
                    height={400}
                  />
                </AspectRatio>
              )}
            </div>
            {post?.authorId == userId && (
              <div className="flex justify-center m-4 gap-3">
                <DeletePost id={post.id} />
                {/* <EditPost id={post.id} /> */}
              </div>
            )}
            <br />
          </div>
        )
      )}
    </div>
  );
};

export default PostContainer;
