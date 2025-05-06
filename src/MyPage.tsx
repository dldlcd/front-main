import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import MyProfile from "./Profile";




interface Outfit {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  season: string;
  situation: string;
  style: string;
  likes: number;
  liked: boolean;
  userId: number;
  userNickname: string;
  userProfileImage: string; // 백엔드에서 포함되도록 수정 필요
}


export default function MyPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const navigate = useNavigate();

  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const openModal = (outfit: Outfit) => setSelectedOutfit(outfit);
  const closeModal = () => setSelectedOutfit(null);


  

  // 🟦 피드 불러오기
  const fetchOutfits = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8080/api/auth/mypage", {
        headers: {
          Authorization: `Bearer ${token}`,
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
    if (!token) return;

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

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center pt-0.1 pb-20">
      <div className="w-full max-w-[650px] bg-white px-0">
        {/* 프로필 섹션 */}
        <div className="px-4 pb-4">
          <MyProfile />
        </div>
        
        {/* 탭 버튼 */}
        <div className="flex justify-around items-center py-3 border-t border-b">
          <button className="flex flex-col items-center text-gray-700">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
            </svg>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
            </svg>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 4v16l7-5 7 5V4H5z" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-screen-xl py-0.5">


        {/* 🟦 피드 카드 */}
        <div className="grid grid-cols-3 gap-[1px]">
          {outfits.map((outfit) => (
            <div
              key={outfit.id}
              onClick={() => navigate(`/outfit/${outfit.id}`)}
              className="aspect-[3.6/4] overflow-hidden relative bg-black cursor-pointer"
            >
              <img
                src={`http://localhost:8080${outfit.imageUrl}`}
                alt="Outfit"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>


        
          
        </div>

        
        {/* 하단 버튼 바 */}
        <div className="shadow-[0_-4px_12px_rgba(0,0,0,0.20)] fixed bottom-0 left-0 right-0 w-full flex justify-between items-center max-w-[650px] mx-auto bg-white border-t shadow-md px-10 py-5 z-50">



          <Button
            onClick={() => navigate("/")}
            className="shadow-md bg-black text-white px-6 py-5 rounded-full text-sm hover:bg-gray-800"
          >
            홈
          </Button>

          <Button
            onClick={() => navigate("/add")}
            className="shadow-md bg-black text-white px-6 py-5 rounded-full text-sm hover:bg-gray-800"
          >
            +
          </Button>
        </div>
      </div>
    </div>
    
    
  );
}
