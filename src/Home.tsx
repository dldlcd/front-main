// src/Home.tsx
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User, LogIn, LogOut, Home as HomeIcon, Heart, MessageCircle, Bookmark, PlusSquare, Compass } from "lucide-react";
import CollectionSection from "./CollectionSection";
import DesignApproachSection from "./DesignApproachSection";
import FooterSection from "./FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import "./index.css";
import { useNavigate, useLocation } from 'react-router-dom';

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "New", href: "#" },
];

const categoryLinks = [
  { name: "MEN", href: "#" },
  { name: "WOMEN", href: "#" },
  { name: "KIDS", href: "#" },
];

const colorOptions = [
  { color: "white", border: true },
  { color: "#dbdcce", border: true, label: "+3" },
  { color: "#eae8d9", border: true, label: "+2" },
];


export default function Home() {

  const [myId, setMyId] = useState<number | null>(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const fetchUserId = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMyId(data.id); // 로그인한 사용자 ID 저장
    } catch (err) {
      console.error("사용자 ID 조회 실패:", err);
    }
  };

  fetchUserId();
}, []);


  const navigate = useNavigate();
  const location = useLocation(); // 👈 URL에서 ?token=... 감지
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const goCart = () => navigate('/cart');
  const goUserPage = () => {
    if (myId) {
      navigate(`/user/${myId}`);
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  const goSignIn = () => navigate('/signin');
  const handleReadMore = () => navigate('/collection');
  const token = localStorage.getItem("token");


  useEffect(() => {
    // ✅ 1. URL에서 token 쿼리 파라미터 추출
    const params = new URLSearchParams(location.search);
    const tokenFromURL = params.get("token");

    // ✅ 2. token 있으면 저장 + 로그인 상태 true
    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      setIsLoggedIn(true);
      // ✅ 3. 주소 깔끔하게 정리
      window.history.replaceState({}, document.title, "/");
    } else {
      const tokenFromStorage = localStorage.getItem("token");
      setIsLoggedIn(!!tokenFromStorage);
    }
  }, [location]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다!");
    navigate("/signin");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 효과
    });
  };

  // 기존의 홈 버튼 클릭 핸들러 수정
  const handleHomeClick = () => {
    navigate("/");
    // 페이지가 전환된 후 스크롤을 맨 위로 이동
    setTimeout(scrollToTop, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center h-14">
          {/* 로고 */}
          <div className="text-xl font-semibold">AI 코디 추천</div>

          {/* 검색 바 */}
          <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 py-1.5 w-64">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="검색"
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>

          {/* 네비게이션 아이콘들 */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" className="flex-col h-auto p-2 min-w-[60px]" onClick={handleHomeClick}>
              <HomeIcon className="h-5 w-5" />
              <span className="text-xs mt-1">홈</span>
            </Button>
            
            {isLoggedIn && (
              <Button variant="ghost" className="flex-col h-auto p-2 min-w-[60px]" onClick={goUserPage}>
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">마이페이지</span>
              </Button>
            )}
            
            <Button variant="ghost" className="flex-col h-auto p-2 min-w-[60px]" onClick={() => navigate("/collections")}>
              <Compass className="h-5 w-5" />
              <span className="text-xs mt-1">탐색</span>
            </Button>
            
            {isLoggedIn ? (
              <Button variant="ghost" className="flex-col h-auto p-2 min-w-[60px]" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="text-xs mt-1">로그아웃</span>
              </Button>
            ) : (
              <Button variant="ghost" className="flex-col h-auto p-2 min-w-[60px]" onClick={goSignIn}>
                <LogIn className="h-5 w-5" />
                <span className="text-xs mt-1">로그인</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16 pb-16">
        {/* 기존 컨텐츠를 유지하면서 스타일만 조정 */}
        <div className="max-w-5xl mx-auto px-4">
          {/* 스토리 섹션 */}
          
          

          {/* 기존 컨텐츠 */}
          <section className="mb-8">
            <DesignApproachSection />
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">My COLLECTION</h2>
            <CollectionSection />
          </section>

          {/* 기타 섹션들... */}
        </div>
      </main>

      {/* 모바일 하단 네비게이션 바 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <Button variant="ghost" className="flex-col h-auto p-2" onClick={() => navigate("/")}>
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] mt-0.5">홈</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto p-2">
          <Search className="h-6 w-6" />
          <span className="text-[10px] mt-0.5">검색</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto p-2">
          <PlusSquare className="h-6 w-6" />
          <span className="text-[10px] mt-0.5">추가</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto p-2" onClick={goCart}>
          <ShoppingBag className="h-6 w-6" />
          <span className="text-[10px] mt-0.5">장바구니</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex-col h-auto p-2" 
          onClick={isLoggedIn ? goUserPage : goSignIn}
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] mt-0.5">{isLoggedIn ? "마이페이지" : "로그인"}</span>
        </Button>
      </div>
    </div>
  );
}