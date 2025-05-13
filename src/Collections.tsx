import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Outfit {
  id: number;
  imageUrl: string;
  title: string;
  likes: number;
  items: number;
  userId: number;
  userNickname: string;
  style: string;
}

const FILTER_OPTIONS = [
  { id: 'all', label: '전체' },
  { id: 'casual', label: '캐주얼' },
  { id: 'sporty', label: '스포티' },
  { id: 'formal', label: '포멀' },
  { id: 'minimal', label: '미니멀' },
  { id: 'office', label: '오피스' },
  { id: 'street', label: '스트릿' },
  { id: 'date', label: '데이트' },
  { id: 'amercaji', label: '아메카지' },
  { id: 'unique', label: '유니크' },
  { id: 'vintage', label: '빈티지' },
  { id: 'lovely', label: '러블리' },

];

export default function Collections() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const styleFilter = searchParams.get("style") ?? "";

  useEffect(() => {
    const raw = searchParams.get('filter');
    if (!raw) return;
  
    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      
      fetch('http://localhost:8080/api/outfits/filter', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      })
        .then((res) => res.json())
        .then(setOutfits)
        .catch((err) => console.error('필터 불러오기 실패:', err));
    } catch (e) {
      console.error('파싱 실패', e);
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/outfits')
      .then((res) => res.json())
      .then(setOutfits)
      .catch((err) => console.error('데이터 로딩 실패:', err));
  }, []);

  const filtered =
    !styleFilter || styleFilter === 'all'
      ? outfits
      : outfits.filter((o) => {
          if (!o.style) return false;
          const tags = o.style.split(',').map((tag) => tag.trim().toLowerCase());
          return tags.includes(styleFilter.toLowerCase());
        });

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 바 */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">컬렉션</h1>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="rounded-full"
            >
              홈으로
            </Button>
          </div>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-6 py-4 overflow-x-auto no-scrollbar">
            {FILTER_OPTIONS.map((filter) => (
              <div key={filter.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
                <button
                  onClick={() =>
                    filter.id === 'all'
                      ? setSearchParams({})
                      : setSearchParams({ style: filter.id })
                  }
                  className={`w-16 h-16 rounded-full flex items-center justify-center p-0.5 ${
                    styleFilter === filter.id || (filter.id === 'all' && !styleFilter)
                      ? 'bg-gradient-to-tr from-yellow-400 to-pink-500'
                      : 'bg-gradient-to-tr from-gray-200 to-gray-300'
                  }`}
                >
                  <div className="bg-white rounded-full p-0.5 w-full h-full flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-xs">
                      {filter.label.slice(0, 2)}
                    </div>
                  </div>
                </button>
                <span className="text-xs text-center">{filter.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 스크롤바 숨기기 */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 아웃핏 그리드 */}
      <div className="max-w-4xl mx-auto p-4">
        {filtered.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-16 text-center text-gray-400">
            <svg
              className="h-16 w-16 mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7l9 6 9-6M4 19h16M4 15h16"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-500 mb-2">게시물이 없습니다</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((outfit) => (
              <div
                key={outfit.id}
                className="relative group cursor-pointer"
                onClick={() => navigate(`/outfit/${outfit.id}`)}
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={`http://localhost:8080${outfit.imageUrl}`}
                    alt={outfit.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent text-white rounded-b-lg">
                  <h3 className="font-semibold text-sm">{outfit.title}</h3>
                  <div className="flex items-center text-xs text-gray-200">
                    <span>❤️ {typeof outfit.likes === 'number' ? outfit.likes.toLocaleString() : 0}</span>
                    <span className="mx-1">•</span>
                    <span>{outfit.items} items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
