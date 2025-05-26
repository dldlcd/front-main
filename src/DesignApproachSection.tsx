import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart, HeartOff } from "lucide-react";
import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";

interface Outfit {
  id: number;
  imageUrl: string; 
  description: string;
  likes: number;
  type: string;
  liked: boolean;
  
}

interface CollectionSectionProps {
  className?: string;
}



export default function DesignApproachSection(): React.JSX.Element {
  // Product data for "NEW THIS WEEK" section

  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const itemsPerPage = 4
  

  const fetchOutfits = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const res = await fetch("http://localhost:8080/api/outfits/this-week", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // ✅ 토큰 있으면 Authorization 추가
        },
        credentials: "include",
      });
  
      if (!res.ok) throw new Error("불러오기 실패");
  
      const data = await res.json();
      setOutfits(data);
    } catch (error) {
      console.error("outfits 불러오는 중 오류 발생:", error);
    }
  };
  

  const toggleLike = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/auth/like/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("좋아요 토글 실패");

      await res.json(); 
      fetchOutfits();   
    } catch (error) {
      console.error("좋아요 토글 에러:", error);
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, []);




  const currentOutfits = outfits.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  // 다음 페이지 이동
  const handleNext = () => {
    if ((page + 1) * itemsPerPage >= outfits.length) {
      // 마지막 페이지면 다시 처음으로
      setPage(0);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  // 이전 페이지 이동
  const handlePrev = () => {
    if (page === 0) {
      // 첫 페이지면 마지막으로
      setPage(Math.floor((outfits.length - 1) / itemsPerPage));
    } else {
      setPage((prev) => prev - 1);
    }
  };
  

  const xivCollectionsProducts = [
    {
      id: 1017,
      image: "/image-17.png", // Using placeholder paths as per original
      type: "V-Neck T-Shirt",
      name: "Embroidered Seersucker Shirt",
    },
    {
      id: 1018,
      image: "/image-9.png",
      type: "Cotton T Shirt",
      name: "Basic Slim Fit T-shirt",
      variants: 5,
    },
    {
      id: 1019,
      image: "/image-10.png",
      type: "Henley T-Shirt",
      name: "Blurred Print T-Shirt",
    },
    {
      id: 1020,
      image: "/image-11.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 1021,
      image: "/image-30.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 1022,
      image: "/image-32.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 1023,
      image: "/image-33.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
    {
      id: 1024,
      image: "/image-34.png",
      type: "Crewneck T-Shirt",
      name: "Full Sleeve Zipper",
    },
  ];
  

  return (
    <section className={'w-full max-w-[1321px] mx-auto py-12 ${className || ""}'}>
      <div className="flex justify-between items-start mb-8">
        <div className="font-extrabold text-5xl tracking-[2.00px] leading-10 ">
          NEW
          <br />
          THIS MONTH
        </div>
        <div className="font-extrabold text-[#000d8a] text-xl tracking-[2.00px] leading-10 whitespace-nowrap">
          
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
      {outfits.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((outfit) => (
          <Card
            key={outfit.id}
            className="border border-solid border-[#d6d6d6] rounded-none"
          >
            <CardContent className="p-0 relative">
              <div className="relative">
                
                <img
                  onClick={() => navigate(`/outfit/${outfit.id}`)}
                  src={outfit.imageUrl}
                  alt={outfit.description}
                  className="w-full h-[313px] object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[34px] h-[34px] bg-[#dbdbdb70] opacity-[0.66] rounded-none"
                >
                  
                </Button>
              </div>
              <div className="p-3">
                <div className="font-medium text-[#000000a8] text-xs">
                  {outfit.type}
                  
                </div>
                <div className="flex font-medium text-black text-sm mt-1 items-center justify-between">
                <button
                  onClick={() => toggleLike(outfit.id)}
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:scale-110 transition-all"
                  >
                  {outfit.liked ? (
                    <Heart className="text-red-500 fill-red-500 w-5 h-5" />
                  ) : (
                    <HeartOff className="text-gray-400 w-5 h-5" />
                  )}
                </button>
                </div>
                <div className="p-3 text-sm text-gray-700 font-light border-t border-gray-200 flex justify-between items-center">
                  <span>{outfit.description}</span>
                  <span className="text-xs text-gray-500 ml-2">❤️ {outfit.likes}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-3 mb-12" >
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
           className="w-10 h-10 border border-solid border-[#a2a2a2] rounded-none active:scale-90 transition-transform duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
           className="w-10 h-10 border border-solid border-[#a2a2a2] rounded-none active:scale-90 transition-transform duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* IV COLLECTIONS Section */}
<div className="mb-8">
  <div className="font-extrabold text-5xl tracking-[2.00px] leading-10 ">
    IV
    <br />
    COLLECTIONS
  </div>
  <div className="  font-extrabold text-[#000d8a] text-xl tracking-[2.00px] leading-10 whitespace-nowrap">
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
