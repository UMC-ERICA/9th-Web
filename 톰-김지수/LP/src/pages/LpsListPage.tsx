// src/pages/LpsListPage.tsx
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpsPage, type Lp, type LpPage } from "../apis/lpApi";
import LpCard from "../components/cards/LpCard";
import LpCardSkeleton from "../components/cards/LpCardSkeleton";
import ErrorState from "../components/common/ErrorState";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle";

export default function LpsListPage() {
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [query, setQuery] = useState("");

  // 입력값 → 300ms 디바운싱된 검색어
  const debouncedQuery = useDebounce(query, 300);

  // 무한 스크롤을 위해 현재 스크롤 위치 관리
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 1000); // 1초에 한 번만 반영

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<LpPage>({
    queryKey: ["lps", sort, debouncedQuery],
    queryFn: ({ pageParam }) =>
      getLpsPage(
        sort,
        pageParam as number | undefined,
        debouncedQuery.trim() || undefined
      ),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    // 검색어가 공백만 있을 때는 요청 안 나가도록 해도 되지만,
    // 여기선 "전체 목록"도 보여야 하니까 항상 enabled: true 로 두고
    // debouncedQuery 를 API에서 적절히 처리.
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });

  const allLps: Lp[] =
    data?.pages.flatMap((page) => page.items) ?? [];

  // 스크롤 이벤트 감지 → scrollY 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const current =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      setScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 스로틀된 scrollY 에 따라 "바닥 근처"에서만 다음 페이지 요청
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const scrollPosition =
      window.innerHeight + throttledScrollY;
    const threshold =
      document.documentElement.scrollHeight - 200;

    if (scrollPosition >= threshold) {
      fetchNextPage();
    }
  }, [throttledScrollY, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* 상단: 검색 + 정렬 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="LP 제목 검색..."
          className="w-full sm:w-1/2 border rounded px-3 py-2 text-sm"
        />

        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setSort("latest")}
            className={`px-3 py-1 rounded border ${
              sort === "latest"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700"
            }`}
          >
            최신순
          </button>
          <button
            type="button"
            onClick={() => setSort("oldest")}
            className={`px-3 py-1 rounded border ${
              sort === "oldest"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700"
            }`}
          >
            오래된순
          </button>
        </div>
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <LpCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* 에러 상태 */}
      {isError && !isLoading && (
        <div className="mt-6">
          <ErrorState onRetry={refetch} />
        </div>
      )}

      {/* 실제 목록 */}
      {!isLoading && !isError && (
        <>
          {allLps.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">
              표시할 LP가 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allLps.map((lp) => (
                <LpCard key={lp.id} lp={lp} />
              ))}
            </div>
          )}

          {/* 추가 로딩 상태 */}
          {isFetchingNextPage && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <LpCardSkeleton key={`more-${idx}`} />
              ))}
            </div>
          )}

          {/* 수동 더보기 버튼 (혹시나 필요할 때) */}
          <div className="flex justify-center mt-6">
            {hasNextPage ? (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 rounded border text-sm disabled:bg-gray-100"
              >
                {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
              </button>
            ) : (
              <p className="text-xs text-gray-400">
                더 이상 LP가 없습니다.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
