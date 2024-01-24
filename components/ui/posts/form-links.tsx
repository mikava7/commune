"use client";
import Link from "next/link";
import { formTags } from "@/lib/menu-items";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function FormLinks() {
  const pathname = usePathname();

  return (
    <>
      <h1>What kind of post do you want to create?</h1>
      <div className="flex items-center justify-center gap-2">
        {formTags.map((tag) => (
          <Link href={tag.href} key={tag.href}>
            <button
              onClick={() => console.log("clicked")}
              className={`${
                pathname === tag.href
                  ? "bg-white text-black border border-black cursor-pointer"
                  : "bg-black text-white my-2 mx-2 cursor-pointer hover:bg-white hover:text-black"
              } p-2 transition rounded-sm duration-300 focus:outline-none`}
            >
              {tag.label}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}
