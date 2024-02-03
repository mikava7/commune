"use client";
import { timeAgo } from "@/lib/utils";
import { Product } from "@/lib/definitions";
import ImageContainer from "./Image-container";
const ProductCard = ({ product }: { product: Product }) => {
  // console.log("product", product);
  return (
    <div className="w-[300px] mx-auto bg-gray-200 rounded-xl overflow-hidden shadow-lg py-2 mb-6">
      {/* Image */}
      <ImageContainer images={product.images} />
      {/* Title */}
      <div className="p-2">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <div className="flex justify-between mt-2">
          {/* Location */}
          <p className="text-gray-500 mb-2">
            Location: <b>{product.location}</b>
          </p>

          <p className="text-green-600 font-bold text-lg mb-2">
            ${product.price}
          </p>
        </div>

        <p className="text-gray-500 mb-2">
          Condition: {product.condition || "N/A"}
        </p>

        <p className="text-gray-500 mb-2">
          added: {product.createdAt ? timeAgo(product.createdAt) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
