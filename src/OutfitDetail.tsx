import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {  Heart, HeartOff } from "lucide-react";

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
  userProfileImage: string;
}

export default function OutfitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState<Outfit | null>(null);

  // 댓글 관련 코드 //
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");




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
  
      const data = await res.json(); // ✅ liked, likes 정보 받아오기
      console.log("서버 응답:", data);
  
      // ✅ 현재 outfit 상태 업데이트
      setOutfit((prev) =>
        prev ? { ...prev, liked: data.liked, likes: data.likes } : prev
      );
    } catch (error) {
      console.error("좋아요 토글 에러:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
  
    const url = token
      ? `http://localhost:8080/api/outfits/auth/${id}`
      : `http://localhost:8080/api/outfits/${id}`;
  
    fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then(setOutfit);
  }, [id]);

  
  

  if (!outfit) return <div className="text-center mt-10">불러오는 중...</div>;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center pt-0.1 pb-20">
      <div className=" mx-auto bg-white border-t shadow-md px-10 py-4 z-50 max-w-[650px] flex justify-between items-center px-4 py-2 w-full fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 ">
      {/* 뒤로가기 */}
      <button onClick={() => navigate(-1)} className="text-xl">
        ←
      </button>

      

      {/* 알림 아이콘 */}
      <button className="text-xl">
        🔔
      </button>
    </div>
    
      
      
      <div className="w-full max-w-[650px] bg-white px-0">

        <div
          className="flex items-center gap-3 px-4 pt-[80px] pb-3 cursor-pointer"
          onClick={() => navigate(`/user/${outfit.userId}`)}
        >
          <img
            src={`http://localhost:8080${outfit.userProfileImage}`}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <span className="text-sm font-semibold">{outfit.userNickname}</span>
      </div>
      
        {/* 상단 이미지 */}

        
        <div className="w-full aspect-[3.9/4] bg-black overflow-hidden mt-[10px]" >
          <img
            src={`http://localhost:8080${outfit.imageUrl}`}
            alt="Outfit"
            className="w-full h-full object-cover object-center"
          />
        </div>

       

        <div className="px-5 pt-6 pb-2 space-y-2 text-sm mb-[20px]">
  {/* 아이콘 줄 */}
        
        <div className="flex justify-between items-center">
            <div className="flex gap-4 text-xl">
            <button
                  onClick={() => toggleLike(outfit.id)}
                  
                  >
                  {outfit.liked ? (
                    <Heart className="text-red-500 fill-red-500 w-5 h-5" />
                  ) : (
                    <HeartOff className="text-gray-400 w-5 h-5" />
                  )}
                
                </button>
                
            <button onClick={() => setIsCommentOpen(true)}>💬</button>
            <button>📤</button>
            </div>
            <button className="text-xl">🔖</button>
        </div>

        

        {/* 날짜 */}
        <div className="text-xs text-gray-500">2025.04.29</div>

        {/* 닉네임 + 설명 */}
        <div>
            <span className="font-semibold">l.stylestep </span>
            꾸안꾸 🖤
        </div>

        {/* 태그 */}
        <div className="flex gap-2 flex-wrap">
            {["#소프트", "#바다", "#여행", "#데이트"].map(tag => (
            <span
                key={tag}
                className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-md"
            >
                {tag.replace("#", "")}
            </span>
            ))}
        </div>
      </div>


      {/* 댓 */}
      <div
          className={`fixed bottom-0 left-0 right-0 max-w-[650px] mx-auto bg-white shadow-md transition-transform duration-300 ease-in-out ${
            isCommentOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: "400px", zIndex: 60 }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold">댓글</span>
            <button onClick={() => setIsCommentOpen(false)}>✕</button>
          </div>

          <div className="p-4 overflow-y-auto h-[200px]">
            {comments.length === 0 ? (
              <p className="text-gray-400 text-sm">아직 댓글이 없습니다.</p>
            ) : (
              comments.map((c, i) => (
                <p key={i} className="text-sm py-1 border-b">{c}</p>
              ))
            )}
        </div>

          <div className="p-2 border-t flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow px-3 py-2 border rounded text-sm"
              placeholder="댓글을 입력하세요..."
            />
            <button
              onClick={() => {
                if (!newComment.trim()) return;
                setComments([...comments, newComment]); // 임시로 추가
                setNewComment("");
              }}
              className="ml-2 text-sm text-blue-500 font-semibold"
            >
              등록
            </button>
          </div>
        </div>

        

        {/* 하단 버튼 바 */}
        <div className="shadow-[0_-4px_12px_rgba(0,0,0,0.20)] fixed bottom-0 left-0 right-0 w-full flex justify-between items-center max-w-[650px] mx-auto bg-white border-t shadow-md px-10 py-5 z-50">
          <Button
            onClick={() => navigate("/mypage")}
            className="shadow-md bg-black text-white px-6 py-5 rounded-full text-sm hover:bg-gray-800"
          >
            마이페이지
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="shadow-md bg-black text-white px-6 py-5 rounded-full text-sm hover:bg-gray-800"
          >
            홈
          </Button>
        </div>
      </div>
    </div>
  );
}