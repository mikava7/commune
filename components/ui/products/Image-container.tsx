// ImageContainer.tsx
"use client";
import React from "react";
import "./images.css"; // Import your styles here
import { Image } from "@/lib/definitions";
const ImageContainer = ({ images }: { images: Image[] }) => {
  const imageCount: number = images.length;
  console.log("images", images);

  const getImageContainerClass = () => {
    switch (imageCount) {
      case 1:
        return "single-image";
      case 2:
        return "two-images";
      case 3:
        return "three-images";
      case 4:
        return "four-images";
      default:
        return "";
    }
  };

  const getImageClass = (index: number) => {
    switch (imageCount) {
      case 1:
        return "full";
      case 2:
        return index === 0 ? "half" : "half";
      case 3:
        // Render only 2 images for the case of 3 images
        return index < 2 ? "top-half" : null;
      case 4:
        return index < 2 ? "top-half" : "bottom-half";
      default:
        return "";
    }
  };

  const imageContainerClass = getImageContainerClass();
  console.log("imageContainerClass", imageContainerClass);

  return (
    <div className={`image-container ${imageContainerClass}`}>
      {images.map((image, index) => {
        const imageClass = getImageClass(index);
        if (imageClass) {
          return (
            <img
              key={image.id}
              src={image.url}
              alt={image.title}
              className={`image ${imageClass}`}
            />
          );
        }
        return null; // Skip rendering when imageClass is null
      })}
    </div>
  );
};

export default ImageContainer;
