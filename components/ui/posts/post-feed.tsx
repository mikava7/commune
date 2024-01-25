"use client";
import PostContainer from "./post-container";
import Link from "next/link";
import { Post, CustomSession } from "@/lib/definitions";

export default function PostFeed({
  posts,
  session,
}: {
  posts: Post[];
  session: CustomSession;
}) {
  return (
    <>
      <Link href="/auth/login">login</Link>
      <PostContainer posts={posts} session={session} />
    </>
  );
}
