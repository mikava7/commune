import React from "react";
import { CreateItem } from "@/components/ui/posts/forms/item-form";
import ItemPreview from "@/components/ui/posts/Item-preview";
export default function Page() {
  return (
    <div className="flex w-full h-screen  ">
      <div className="w-30 px-4">
        <CreateItem />
      </div>

      <div className="w-70 flex-1 w-70 bg-green-500">
        <ItemPreview />
      </div>
    </div>
  );
}
