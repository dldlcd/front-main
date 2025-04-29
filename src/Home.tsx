// src/Home.tsx
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User, LogIn, LogOut } from "lucide-react";
import CollectionSection from "./CollectionSection";
import DesignApproachSection from "./DesignApproachSection";
import FooterSection from "./FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import "./index.css";
import { useNavigate, useLocation } from 'react-router-dom';

interface Outfit { 
  id: number;
  imageUrl: string;
  description: string;
  likes: number;
  liked: boolean;
  type?: string; // DesignApproach용
}

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collection" },
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
  const navigate = useNavigate();
  const location = useLocation(); // 👈 URL에서 ?token=... 감지
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const goCart = () => navigate('/cart');
  const goMyPage = () => navigate('/mypage');
  const goSignIn = () => navigate('/signin');
  const handleReadMore = () => navigate('/collection');
  const token = localStorage.getItem("token");

  const [outfits, setOutfits] = useState<Outfit[]>([]);


  const fetchOutfits = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:8080/api/auth/mypage", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setOutfits(data);
    }
  };

  const toggleLike = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`http://localhost:8080/api/auth/like/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setOutfits((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                liked: !item.liked,
                likes: item.liked ? item.likes - 1 : item.likes + 1,
              }
            : item
        )
      );
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, []);

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

  return (
    <div className="bg-white flex flex-row justify-center w-full font-sans">
      <div className="bg-white overflow-hidden w-full max-w-[1920px] relative">
        {/* Header and Navigation */}
        <header className="w-full pt-1 px-[69px] relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/icon-1.png" alt="Logo" className="w-52 h-52" />

              <div className="ml-14 flex space-x-[87px] text-lg font-semibold">
                {navigationLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-black hover:underline tracking-wide"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-[42px]">
              <Button
                onClick={goCart}
                variant="default"
                size="icon"
                className="w-[50px] h-[50px] rounded-[25px] bg-black"
              >
                <ShoppingBag className="h-[28px] w-[28px] text-white" />
              </Button>

              <Button
                onClick={goMyPage}
                variant="default"
                size="icon"
                className="w-[50px] h-[50px] rounded-[25px] bg-black"
              >
                <div className="relative w-[40px] h-[40px] bg-white rounded-[18.52px] flex items-center justify-center">
                  <User className="h-7 w-7 text-black" />
                </div>
              </Button>

              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  variant="default"
                  size="icon"
                  className="w-[50px] h-[50px] rounded-[25px] bg-black"
                >
                  <LogOut className="h-[30px] w-[30px] text-white" />
                </Button>
              ) : (
                <Button
                  onClick={goSignIn}
                  variant="default"
                  size="icon"
                  className="w-[50px] h-[50px] rounded-[25px] bg-black"
                >
                  <LogIn className="h-[30px] w-[30px] text-white" />
                </Button>
              )}
            </div>
          </div>

          {/* NEW COLLECTION 섹션 */}
          <section className="flex flex-col lg:flex-row justify-center items-start mt-[200px] max-w-[1400px] mx-auto gap-16 px-4">
            <div className="flex flex-col space-y-8 max-w-[400px]">
              <div className="w-full">
                <div className="relative w-full">
                  <Input
                    className="h-[60px] bg-[#d9d9d9] rounded-sm pl-12 pr-4 text-sm tracking-wide"
                    placeholder="Search"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                </div>
              </div>

              <div className="text-base font-medium text-black tracking-wide space-y-1">
                {categoryLinks.map((link, index) => (
                  <div key={index}>
                    <a href={link.href}>{link.name}</a>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-5xl font-bold leading-[75px] text-black tracking-wide ">
                  NEW<br />COLLECTION
                </h2>
                <p className="mt-10 text-lg text-black tracking-wide">
                  Spring 2025
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleReadMore}
                  className="w-[225px] h-12 bg-black text-white text-base rounded-none"
                >
                  Read More
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12 border border-[#a2a2a2]">
                  &lt;
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12 border border-[#a2a2a2]">
                  &gt;
                </Button>
              </div>
            </div>

            <div className="flex space-x-8">
              <img
                src="/image-36.png"
                alt="Fashion model"
                className="w-[500px] h-[500px] object-cover"
              />
              <img
                src="/image-35.png"
                alt="Fashion model"
                className="w-[500px] h-[500px] object-cover"
              />
            </div>
          </section>
        </header>

        <main className="w-full">
          <section className="mt-[100px] ">
          <DesignApproachSection outfits={outfits} onToggleLike={toggleLike} />
          </section>

          <section className="mt-[100px]">
          <h2 className="text-5xl font-bold leading-[75px] text-black tracking-wide ml-8">
                My<br /> COLLECTION
                </h2>
                <CollectionSection outfits={outfits} />
          </section>

          <section className="px-[69px] mt-[50px]">
            <div className="flex justify-center items-center gap-6">
              {["55", "56", "2", "57", "5"].map((img, idx) => (
                <img
                  key={idx}
                  src={`/image-${img}.png`}
                  alt={`Fashion model ${idx}`}
                  className="w-[250px] h-[350px] object-cover shadow-lg"
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold uppercase tracking-[2px]">OUR APPROACH TO FASHION DESIGN</h2>
              <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
                at elegant vogue, we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time. each design is meticulously crafted, ensuring the highest quality exquisite finish
              </p>
            </div>
          </section>
        </main>

        <footer className="mt-[100px] w-full">
          <FooterSection />
        </footer>
      </div>
    </div>
  );
}