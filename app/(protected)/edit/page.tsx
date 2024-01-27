"use client";
import React, { useState } from "react";

export default function Page() {
  const [alignment, setAlignment] = useState("items-start");

  const toggleAlignment = () => {
    setAlignment((prevAlignment) =>
      prevAlignment === "items-start" ? "items-end" : "items-start"
    );
  };

  return (
    <div className="size-54 border border-green-900 py-4 px-4 leading-none overflow-hidden">
      <div className="border border-red-900 p-4 m-4  stransform hover:scale-105 transition-transform">
        So I started to walk into the water. I won't lie to you boys, I was
        terrified. But I pressed on, and as I made my way past the breakers a
        strange calm came over me. I don't know if it was divine intervention or
        the kinship of all living things but I tell you Jerry at that moment, I
        was a marine biologist.
      </div>

      <div className=" size-16 self-start justify-self-start border border-blue-900 py-4 px-4">
        02
      </div>
      <div className=" size-16 border border-green-900 py-4 px-4">03</div>
    </div>
  );
}
