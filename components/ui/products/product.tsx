"use client";

import { Product } from "@/lib/definitions";
import { useState } from "react";
import { timeAgo } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const ProductPage = ({ product }: { product: Product }) => {
  // console.log("product", product);
  const [activeIndex, setActiveIndex] = useState(0);
  console.log("activeIndex",activeIndex)
  const handleSlideChange: FormEventHandler<HTMLDivElement> = (event:any) => {
    // Extract the newIndex from the event
    console.log("event", event)

    setActiveIndex(event);
  };
  return (
    <div className="flex w-full h-full bg-red-900 border-7 border-blue-700 rounded-xl overflow-hidden shadow-lg py-2 mb-6">
      {/* Product Image */}
      <div className="relative w-full bg-gray-200 px-20 border-7 border-yellow-700">
        {/* Background Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${product.images[0].url})`,
            filter: "blur(20px)", // Adjust blur intensity as needed
          }}
        ></div>

        {/* Container with space on sides */}
        <div className="h-5/6 outline-dashed flex justify-center m-6 gap-3">
          <Carousel className="h-100vw ">
            <CarouselContent className="relative h-[600px]" onClick={()=>console.log('clicked')}>
              {product.images.map((image, index) => (
                <CarouselItem key={image.id} onChange={handleSlideChange}>
                  <Image
                    src={image.url}
                    alt={`${product.title}'s image`}
                    width={576}
                    height={500}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "80%",
                      width: "auto",
                      height: "auto",
                      margin: "auto",
                      display: "block",
                    }}
                  />
             
                </CarouselItem>
              ))}
            </CarouselContent>

                   <div className="absolute bottom-0 outline-dashed left-0 w-full flex justify-center gap-1">
              {product.images.map((img, index) => (
                <Image
                  src={img.url}
                  alt={`${product.title}'s image`}
                  width={50}
                  height={50}
                  id={index.toString()}
                  onClick={() => handleSlideChange(index)}
                  className={index === activeIndex ? "border-2 border-black" : ""}
                />
              ))}
            </div>              
            <CarouselPrevious className="bg-blue-700 hover:bg-blue-800" 
                   
                    />
            <CarouselNext className="bg-blue-700 hover:bg-blue-800"/>
          </Carousel>
        </div>
      </div>

      {/* Product Information */}
      <div className="bg-white border-7 border-red-700 w-1/3 p-2">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

        {/* Location */}
        <p className="text-gray-500 mb-2">
          Location: <b>{product.location}</b>
        </p>

        {/* Price */}
        <p className="text-green-600 font-bold text-lg mb-2">
          ${product.price}
        </p>

        {/* Condition */}
        <p className="text-gray-500 mb-2">
          Condition: {product?.condition || "N/A"}
        </p>

        {/* Added */}
        <p className="text-gray-500 mb-2">
          Added: {product.createdAt ? timeAgo(product.createdAt) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
