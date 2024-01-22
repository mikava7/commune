"use client";
import { Post } from "@/components/definitions";
import PostContainer from "./post-container";
export default function PostFeed({ posts }: { posts: Post }) {
  return (
    <>
      <PostContainer posts={posts} />
    </>
  );
}
