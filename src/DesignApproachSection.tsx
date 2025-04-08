import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import React from "react";

export default function DesignApproachSection(): React.JSX.Element {
  // Product data for "NEW THIS WEEK" section
  const newThisWeekProducts = [
    {
      id: 1,
      image: "/image-19.png", // Using placeholder paths as per original
      type: "V-Neck T-Shirt",
      name: "Embroidered Seersucker Shirt",
    },
    {
      id: 2,
      image: "/image-20.png",
      type: "Cotton T Shirt",
      name: "Basic Slim Fit T-shirt",
      variants: 5,
    },
    {
      id: 3,
      image: "/image-22.png",
      type: "Henley T-Shirt",
      name: "Blurred Print T-Shirt",
    },
    {
      id: 4,
      image: "/image-21.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 5,
      image: "/image-25.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 6,
      image: "/image-27.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 7,
      image: "/image-28.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 8,
      image: "/image-29.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
  ];

  const xivCollectionsProducts = [
    {
      id: 1,
      image: "/image-17.png", // Using placeholder paths as per original
      type: "V-Neck T-Shirt",
      name: "Embroidered Seersucker Shirt",
    },
    {
      id: 2,
      image: "/image-9.png",
      type: "Cotton T Shirt",
      name: "Basic Slim Fit T-shirt",
      variants: 5,
    },
    {
      id: 3,
      image: "/image-10.png",
      type: "Henley T-Shirt",
      name: "Blurred Print T-Shirt",
    },
    {
      id: 4,
      image: "/image-11.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 5,
      image: "/image-30.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 6,
      image: "/image-32.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 7,
      image: "/image-33.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 8,
      image: "/image-34.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
  ];
  

  return (
    <section className="w-full max-w-[1321px] mx-auto py-12">
      <div className="flex justify-between items-start mb-8">
        <div className="font-extrabold text-5xl tracking-[2.00px] leading-10">
          NEW
          <br />
          THIS WEEK
        </div>
        <div className="font-extrabold text-[#000d8a] text-xl tracking-[2.00px] leading-10 whitespace-nowrap">
          (50)
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {newThisWeekProducts.map((product) => (
          <Card
            key={product.id}
            className="border border-solid border-[#d6d6d6] rounded-none"
          >
            <CardContent className="p-0 relative">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[313px] object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[34px] h-[34px] bg-[#dbdbdb70] opacity-[0.66] rounded-none"
                >
                  <Heart className="w-[13px] h-[13px]" />
                </Button>
              </div>
              <div className="p-3">
                <div className="font-medium text-[#000000a8] text-xs">
                  {product.type}
                  {product.variants && (
                    <span className="ml-2 font-light text-[10px]">
                      +{product.variants}
                    </span>
                  )}
                </div>
                <div className="font-medium text-black text-sm mt-1">
                  {product.name}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-3 mb-12">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 border border-solid border-[#a2a2a2] opacity-[0.66] rounded-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 border border-solid border-[#a2a2a2] rounded-none"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* IV COLLECTIONS Section */}
<div className="mb-8">
  <div className="font-extrabold text-5xl tracking-[2.00px] leading-10">
    IV
    <br />
    COLLECTIONS
  </div>
  <div className="font-extrabold text-[#000d8a] text-xl tracking-[2.00px] leading-10 whitespace-nowrap">
    24-25
  </div>

  <div className="grid grid-cols-4 gap-6 mt-6">
    {xivCollectionsProducts.map((product) => (
      <Card
        key={product.id}
        className="border border-solid border-[#d6d6d6] rounded-none"
      >
        <CardContent className="p-0 relative">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[313px] object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[34px] h-[34px] bg-[#dbdbdb70] opacity-[0.66] rounded-none"
            >
              <Heart className="w-[13px] h-[13px]" />
            </Button>
          </div>
          <div className="p-3">
            <div className="font-medium text-[#000000a8] text-xs">
              {product.type}
              {product.variants && (
                <span className="ml-2 font-light text-[10px]">
                  +{product.variants}
                </span>
              )}
            </div>
            <div className="font-medium text-black text-sm mt-1">
              {product.name}
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>


      {/* This section would contain additional product cards similar to the above,
          but since they're not fully visible in the image, I've omitted them */}
    </section>
  );
}
