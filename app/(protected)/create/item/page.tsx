import React from "react";
import { CreateItem } from "@/components/ui/posts/forms/item-form";
import ItemPreview from "@/components/ui/posts/Item-preview";
export default function Page() {
  return (
    <div className="bg-gray-100">
      <CreateItem />
    </div>
  );
}
