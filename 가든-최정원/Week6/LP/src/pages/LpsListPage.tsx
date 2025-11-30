// src/pages/LpsListPage.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLpsPage, type LpPage } from "../apis/lpApi";
import LpCard from "../components/cards/LpCard";
import LpCardSkeleton from "../components/cards/LpCardSkeleton";
import ErrorState from "../components/common/ErrorState";

export default function LpsListPage() {
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<LpPage>({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam }) =>
      getLpsPage(sort, pageParam as number | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 10_000,
    gcTime: 60_000,
  });

  const list = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">LP 목록</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <LpCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">LP 목록</h2>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded text-sm"
          onClick={() =>
            setSort((prev) => (prev === "latest" ? "oldest" : "latest"))
          }
        >
          {sort === "latest" ? "오래된순" : "최신순"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}

        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, idx) => (
            <LpCardSkeleton key={`more-${idx}`} />
          ))}
      </div>

      <div className="flex justify-center mt-6">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
          </button>
        ) : (
          <p className="text-gray-500 text-sm">
            더 이상 불러올 데이터가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
