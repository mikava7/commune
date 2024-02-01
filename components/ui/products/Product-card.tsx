"use client";
import ImageContainer from "./Image-container";
const ProductCard = ({ product }: any) => {
  console.log("product", product);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg p-6 mb-6">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

      {/* Description */}
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* Image */}

        <ImageContainer images={product.images} />
     

      {/* Price */}
      <p className="text-green-600 font-bold text-lg mb-2">${product.price}</p>

      {/* Location */}
      <p className="text-gray-500 mb-2">Location: {product.location}</p>

      {/* Condition */}
      <p className="text-gray-500 mb-2">
        Condition: {product.conditionId || "N/A"}
      </p>

      {/* Category */}
      <p className="text-gray-500 mb-2">
        Category: {product.categoryId || "N/A"}
      </p>

      {/* Author ID */}
      <p className="text-gray-500 mb-2">
        Author ID: {product.authorId || "N/A"}
      </p>

      {/* Created At */}
      <p className="text-gray-500 mb-2">
        Created At: {product.createdAt.toString() || "N/A"}
      </p>

      {/* Updated At */}
      <p className="text-gray-500 mb-2">
        Updated At: {product.updatedAt.toString() || "N/A"}
      </p>

      {/* ID */}
      <p className="text-gray-500 mb-2">ID: {product.id || "N/A"}</p>
    </div>
  );
};

export default ProductCard;
