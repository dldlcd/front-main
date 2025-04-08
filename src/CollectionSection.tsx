import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Product {
  id: number;
  image: string;
  category: string;
  name: string;
}

interface CollectionSectionProps {
  className?: string;
}

export default function CollectionSection({ className }: CollectionSectionProps): React.JSX.Element {
  const topProducts: Product[] = [
    { id: 1, image: "/image-41.png", category: "Cotton Jacket", name: "Wool Blend Puffer Jacket" },
    { id: 2, image: "/image-40.png", category: "Blazer", name: "Slim-Fit Suit Jacket" },
    { id: 3, image: "/image-15.png", category: "Beach Shirt", name: "Relaxed Fit Linen T-Shirt" },
    { id: 4, image: "/image-16.png", category: "Casual Shirt", name: "Oversized Fit Shirt" },
    { id: 5, image: "/image-17.png", category: "Leather Jacket", name: "Classic Leather Jacket" },
    { id: 6, image: "/image-34.png", category: "Leather Jacket", name: "Classic Leather Jacket" },
    { id: 7, image: "/image-35.png", category: "Casual Shirt", name: "Oversized Fit Shirt" },
    { id: 8, image: "/image-36.png", category: "Leather Jacket", name: "Classic Leather Jacket" },
    { id: 9, image: "/image-38.png", category: "Leather Jacket", name: "Classic Leather Jacket" },

  ];
  

  return (
    <section className={`w-full max-w-[1600px] mx-auto py-8 ${className || ""}`}>
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {topProducts.map((product) => (
            <div key={product.id} className="min-w-[18rem] border rounded-lg shadow-md overflow-hidden">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-100 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs text-[#000000a8] font-medium">{product.category}</p>
                    <p className="text-sm text-black font-medium">{product.name}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
