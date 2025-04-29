import React, { useEffect, useState } from "react";

interface Profile {
  nickname: string;
  gender: string;
  ageGroup: string;
  bodyType: string;
  preferredStyles: string[];
  profileImage: string;
  bio: string;
}

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile[]>([]);

  // ✅ 마이페이지처럼 fetchProfile 함수로 분리
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8080/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("프로필 로딩 실패");

      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("❌ 프로필 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return null;


  //-----------------------------------------------

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch("http://localhost:8080/api/auth/profile/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData,
      });
  
      if (!res.ok) throw new Error("프로필 이미지 업로드 실패");
  
      // 업로드 성공 → 다시 프로필 로드
      fetchProfile();
    } catch (err) {
      console.error("❌ 이미지 업로드 중 오류:", err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px--10 mb-3 py-3" >
  <div className="flex flex-col items-center sm:items-start gap-4">
    {/* 프로필 상단 */}
    <div className="flex items-center gap-4">
          <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      {/* 이미지를 클릭하면 input 활성화됨 */}
      <label htmlFor="fileInput" className="cursor-pointer">
        <img
          src={`http://localhost:8080${profile.profileImage}`}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
      </label>

      <div>
        <div className="flex items-center gap-1">
          <h2 className="text-lg font-bold ">{profile.nickname}</h2>
          
        </div>
        <p className="text-sm text-gray-600">{profile.ageGroup}  {profile.bodyType} </p>
      </div>
    </div>

    {/* 하단 정보 */}
    <div className="w-full text-sm text-gray-700 space-y-1 mt-1 ">
      <p>💪 {profile.bodyType}</p>
      <p>
      👕 {profile.preferredStyles ? profile.preferredStyles.join(", ") : ""}
    </p>

      <p>💬  {profile.bio}</p>
    </div>

    
  </div>
</div>

  );
};

export default MyProfile;
