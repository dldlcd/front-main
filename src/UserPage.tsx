import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MyProfile from "./Profile";

interface Profile {
  nickname: string;
  gender: string;
  ageGroup: string;
  bodyType: string;
  preferredStyles: string[];
  profileImage: string;
  bio: string;
}

interface Outfit {
  id: number;
  imageUrl: string;
  description: string;
  liked: boolean;
  likes: number;
  userId: number;
  userNickname: string;
}

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    fetch("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyId(data.id.toString()));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/auth/profile/${userId}`)
      .then((res) => res.json())
      .then(setProfile);

    fetch(`http://localhost:8080/api/auth/User/${userId}`)
      .then((res) => res.json())
      .then(setOutfits);
  }, [userId]);

  if (!profile) return null;

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
        
          {userId === myId && (
          <Button
            onClick={() => navigate("/add")}
            className="shadow-md bg-black text-white px-6 py-5 rounded-full text-sm hover:bg-gray-800"
          >
            +
          </Button>
          )}
        </div>
      </div>
    </div>
  );
}
