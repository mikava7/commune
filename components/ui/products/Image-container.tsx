"use client"; // 'use client' is not necessary for importing styles
import React from "react";
import "./images.css"; // Import your styles here

const ImageContainer = ({ images }) => {
  const imageCount = images.length;

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

  const getImageClass = (index) => {
    switch (imageCount) {
      case 1:
        return "full";
      case 2:
        return index === 0 ? "half" : "half";
      case 3:
        return index === 0 ? "left-half" : "right-half";
      case 4:
        return `grid-${index + 1}`;
      default:
        return "";
    }
  };

  return (
    <div className={`image-container ${getImageContainerClass()}`}>
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.url}
          alt={image.title}
          className={`image ${getImageClass(index)}`}
          style={{ border: '1px solid blue', width: '100px', height: '100px' }} // Adjust styles as needed

          />
      ))}
    </div>
  );
};

export default ImageContainer;
