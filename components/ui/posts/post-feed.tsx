"use client";
import PostContainer from "./post-container";
import Link from "next/link";
import { Session } from "@/lib/definitions";
type Post = {
  [x: string]: any;
  title: string;
  description: string;
  image: string;
  authorId: string;
};
export default function PostFeed({
  posts,
  session,
}: {
  posts: Post;
  session: Session | null;
}) {
  return (
    <>
      <Link href="/auth/login">login</Link>
      <PostContainer posts={posts} session={session} />
    </>
  );
}
