import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lock, Camera, RotateCcw, User, Menu } from "lucide-react";

export default function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mainImage, setMainImage] = useState("/thumb-1.png");
  const navigate = useNavigate();

  

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: id, password }),
      });

      if (!response.ok) throw new Error("로그인 실패");

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setSuccess("로그인 성공!");
      alert( id + "님 로그인 되었습니다!");
      navigate("/");
    } catch (err) {
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 네비게이션 바 */}
      <header className="w-full px-6 py-3 flex justify-between items-center border-b border-gray-200 bg-white shadow-sm h-[72px]">
        {/* 왼쪽 메뉴 */}
        <div className="flex items-center gap-6">
          <Menu className="w-6 h-6 md:w-8 md:h-8" />
          <nav className="flex gap-6 md:gap-8 text-sm md:text-base font-semibold tracking-wide">
            <button onClick={() => navigate("/")} className="hover:underline">Home</button>
            <button onClick={() => navigate("/collections")} className="hover:underline">Collections</button>
            <a href="#" className="hover:underline">Deals</a>
          </nav>
        </div>

        {/* 로고 (크기 조절 가능, 상단바 고정) */}
        <div className="flex-shrink-0" style={{ height: "500%" }}>
          <img
            src="/icon-1.png"
            alt="Logo"
            className="h-full object-contain"
            style={{ maxHeight: "400px" }}
          />
        </div>

        {/* 오른쪽 아이콘 */}
        <div className="flex items-center gap-4 md:gap-6">
          {[RotateCcw, Camera, User].map((Icon, i) => (
            <div key={i} className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center">
              <Icon className="w-7 h-7" />
            </div>
          ))}
        </div>
      </header>

      {/* 로그인 섹션 */}
      <div className="flex justify-center items-center flex-1 min-h-[calc(100vh-72px)]">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-10 px-6">
          {/* 이미지 섹션 */}
          <div className="flex gap-6 items-center">
            <img
              src={mainImage}
              alt="Main"
              className="w-[520px] h-[600px] object-cover rounded-md shadow-md"
            />
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`/thumb-${i}.png`}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(`/thumb-${i}.png`)}
                  className={`w-[95px] h-[95px] object-cover rounded-md cursor-pointer shadow-sm transition hover:opacity-80 ${
                    mainImage === `/thumb-${i}.png` ? "ring-2 ring-black" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 로그인 폼 */}
          <div className="w-full max-w-lg border border-gray-300 p-10 bg-white shadow-md rounded-md">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold">Welcome Back</h2>
              <p className="text-sm text-gray-500">Please sign in to continue</p>
            </div>

            <Input
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mb-4 text-base"
              icon={<User />}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 text-base"
              icon={<Lock />}
            />

            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
            {success && <p className="text-sm text-green-600 mb-3">{success}</p>}

            <Button
              onClick={handleLogin}
              className="w-full bg-black text-white hover:bg-gray-800 mb-4"
            >
              Sign In →
            </Button>

            <Separator className="my-5" />

            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              Continue with Kakao
            </Button>

            <div className="mt-6 text-sm text-center text-gray-500">
              <a href="#" className="underline mr-4">
                비밀번호 찾기
              </a>
              <span
                onClick={() => navigate("/signup")}
                className="underline cursor-pointer"
              >
                회원가입
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
