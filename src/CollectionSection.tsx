import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Outfit {
  id: number;
  imageUrl: string; 
  description: string;
  likes: number;
}

interface CollectionSectionProps {
  className?: string;
}

const topProducts: Outfit[] = [
  { id: 1000, imageUrl: "/image-41.png", description: "Wool Blend Puffer Jacket", likes: 1},
  { id: 1001, imageUrl: "/image-40.png", description: "Slim-Fit Suit Jacket" , likes: 100},
  { id: 1002, imageUrl: "/image-15.png", description: "Relaxed Fit Linen T-Shirt" , likes: 3},
  { id: 1003, imageUrl: "/image-16.png", description: "Oversized Fit Shirt" , likes: 0},
  { id: 1004, imageUrl: "/image-17.png", description: "Classic Leather Jacket" , likes: 0},
  { id: 1005, imageUrl: "/image-34.png", description: "Classic Leather Jacket" , likes: 0},
  { id: 1006, imageUrl: "/image-35.png", description: "Oversized Fit Shirt" , likes: 0},
  { id: 1007, imageUrl: "/image-36.png", description: "Classic Leather Jacket" , likes: 0},
  { id: 1008, imageUrl: "/image-38.png", description: "Classic Leather Jacket" , likes: 0},
];

export default function CollectionSection({ className }: CollectionSectionProps) {
  const [outfits, setOutfits] = useState<Outfit[]>(topProducts);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("🔵 비로그인 상태: 기본 이미지 보여줌");
      return; // 로그인 안 되어 있으면 fetch 시도 안 함
    }

    fetch("http://localhost:8080/api/auth/mypage", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("불러오기 실패");
        return res.json();
      })
      .then((data) => {
        console.log("✅ 로그인 상태: outfits 데이터 수신", data);
        if (data.length > 0) {
          setOutfits(data); // 서버에 데이터 있으면 교체
        } else {
          setOutfits(topProducts); // 데이터 없으면 기본 이미지로
        }
      })
      .catch((err) => {
        console.error("추천 데이터 불러오는 중 오류 발생:", err);
        // 실패 시 기본 이미지 유지
      });
  }, []);

  return (
    <section className={`w-full max-w-[1600px] mx-auto py-8 ${className || ""}`}>
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="min-w-[18rem] border rounded-lg shadow-md overflow-hidden">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                <img
                    src={
                      `http://localhost:8080${outfit.imageUrl}`
                    }
                    alt="Outfit"
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-3 text-sm text-gray-700 font-light border-t border-gray-200 flex justify-between items-center">
                    <span>{outfit.description}</span>
                    <span className="text-xs text-gray-500 ml-2"> </span>
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