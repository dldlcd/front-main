import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, RotateCcw, Camera, User } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [inch, setInch] = useState("");
  const [pound, setPound] = useState("");

  const [mainImage, setMainImage] = useState("/image-59.png");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: `${lastName} ${firstName}`, // 이름 조합
        }),
      });
  
      if (!response.ok) {
        alert("회원가입 실패");
        return;
      }
  
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/signin");
    } catch (error) {
      alert("서버 오류로 회원가입 실패!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black font-sans relative overflow-hidden">
      {/* 🔹 좌우 배경 장식 */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#f5f5f5] via-transparent to-transparent opacity-30 z-0" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#f5f5f5] via-transparent to-transparent opacity-30 z-0" />

      {/* 🔹 상단 네비게이션 */}
      <header className="relative z-10 w-full px-8 py-4 flex justify-between items-center border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          <Menu className="w-8 h-8" />
          <nav className="flex gap-6 text-lg font-semibold tracking-wide">
            <button onClick={() => navigate("/")} className="hover:underline">Home</button>
            <button onClick={() => navigate("/collection")} className="hover:underline">Collections</button>
            <button className="hover:underline">Deals</button>
          </nav>
        </div>

        {/* 로고 이미지 */}
        <div className="relative flex items-center justify-center h-[60px] w-[160px]">
          <img
            src="/icon-1.png"
            alt="Site Logo"
            className="h-[300px] w-auto object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* 오른쪽 아이콘 */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* 🔹 본문 */}
      <main className="relative z-10 flex justify-center px-6 py-14">
        <div className="w-full max-w-[1300px] bg-white shadow-2xl rounded-2xl p-10 flex flex-col md:flex-row gap-12">
          {/* 왼쪽: 회원가입 폼 */}
          <div className="w-full max-w-lg">
            <h1 className="text-3xl font-bold mb-2">CHECKOUT</h1>
            <div className="flex gap-6 text-sm mb-6">
              <span className="font-semibold">INFORMATION</span>
              <span className="text-gray-400">SHIPPING</span>
              <span className="text-gray-400">PAYMENT</span>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold">CONTACT INFO</p>
              <Input placeholder="ID (Email)" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <p className="text-sm font-semibold pt-6">SHIPPING ADDRESS</p>
              <div className="flex gap-4">
                <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
              <Input placeholder="State/Region" value={state} onChange={(e) => setState(e.target.value)} />
              <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <div className="flex gap-4">
                <Input placeholder="Inch" value={inch} onChange={(e) => setInch(e.target.value)} />
                <Input placeholder="Pound" value={pound} onChange={(e) => setPound(e.target.value)} />
              </div>

              <Button onClick={handleSubmit} className="w-full bg-black text-white hover:bg-gray-800 mt-4">
                Sign up →
              </Button>
            </div>
          </div>

          {/* 오른쪽: 메인 이미지 + 썸네일 */}
          <div className="hidden md:flex w-full max-w-[650px] gap-6">
            <div className="flex-1">
              <img
                src={mainImage}
                alt="Main visual"
                className="w-full h-full max-h-[620px] object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="flex flex-col gap-4">
              {["thumb-1.png", "thumb-2.png", "thumb-3.png", "thumb-4.png", "thumb-5.png"].map((src, i) => (
                <img
                  key={i}
                  src={`/${src}`}
                  alt={`thumb-${i + 1}`}
                  onClick={() => setMainImage(`/${src}`)}
                  className={`w-[100px] h-[100px] object-cover rounded shadow-md cursor-pointer hover:opacity-80 transition ${
                    mainImage === `/${src}` ? "ring-2 ring-black" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
