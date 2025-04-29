import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AddOutfit() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [season, setSeason] = useState("");
  const [situation, setSituation] = useState("");
  const [style, setStyle] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("season", season);
    formData.append("situation", situation);
    formData.append("style", style);

    const now = new Date().toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
formData.append("upload_time", now);


    // 📡 백엔드에 전송
    fetch("http://localhost:8080/api/auth/mypage/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("업로드 실패");
        alert("코디가 등록되었습니다!");
        navigate("/mypage");
      })
      .catch((err) => {
        console.error("업로드 중 오류:", err);
        alert("업로드 실패");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">코디 추가하기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 사진 업로드 */}
        <div>
          <label className="block font-medium mb-1">사진</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        {/* 제목 */}
        <div>
          <label className="block font-medium mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="block font-medium mb-1">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        {/* 색상 */}
        <div>
          <label className="block font-medium mb-1">색상</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="ex) black, red..."
          />
        </div>

        {/* 계절 */}
        <div>
          <label className="block font-medium mb-1">계절</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">선택</option>
            <option value="spring">봄</option>
            <option value="summer">여름</option>
            <option value="fall">가을</option>
            <option value="winter">겨울</option>
          </select>
        </div>

        {/* 상황 */}
        <div>
          <label className="block font-medium mb-1">상황</label>
          <select
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">선택</option>
            <option value="daily">데일리</option>
            <option value="date">데이트</option>
            <option value="office">출근</option>
            <option value="travel">여행</option>
          </select>
        </div>

        {/* 스타일 */}
        <div>
          <label className="block font-medium mb-1">스타일</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="ex) 캐주얼, 스트릿, 포멀"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="text-center">
          <Button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
