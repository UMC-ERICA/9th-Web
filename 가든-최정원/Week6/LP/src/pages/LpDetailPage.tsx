// src/pages/LpDetailPage.tsx
import { useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLpDetail, type LpDetail } from "../apis/lpDetailApi";
import {
  getComments,
  type CommentPage,
} from "../apis/commentApi";
import LpDetailSkeleton from "../components/cards/LpDetailSkeleton";
import CommentCard from "../components/comments/CommentCard";
import CommentCardSkeleton from "../components/comments/CommentCardSkeleton";
import CommentInput from "../components/comments/CommentInput";
import ErrorState from "../components/common/ErrorState";

export default function LpDetailPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const numericId = Number(lpId);
  const [order, setOrder] = useState<"latest" | "oldest">("latest");

  const {
    data: lp,
    isLoading: isLpLoading,
    isError: isLpError,
    refetch: refetchLp,
  } = useQuery<LpDetail>({
    queryKey: ["lp", numericId],
    queryFn: () => getLpDetail(numericId),
    enabled: !!numericId,
  });

  const {
    data: commentPages,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery<CommentPage>({
    queryKey: ["lpComments", numericId, order],
    queryFn: ({ pageParam }) =>
      getComments(numericId, order, pageParam as number | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!numericId,
  });

  const comments =
    commentPages?.pages.flatMap((page) => page.items) ?? [];

  if (!numericId) {
    return <div>잘못된 접근입니다.</div>;
  }

  if (isLpLoading) {
    return <LpDetailSkeleton />;
  }

  if (isLpError || !lp) {
    return <ErrorState onRetry={refetchLp} />;
  }

  const created = new Date(lp.createdAt).toLocaleString("ko-KR");
  const likesCount = lp.likesCount ?? (lp.likes ? lp.likes.length : 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 상단 기본 정보 */}
      <section>
        <h1 className="text-2xl font-bold mb-2">{lp.title}</h1>
        <div className="text-sm text-gray-500 mb-4 flex gap-3">
          <span>업로드일: {created}</span>
          <span>좋아요: {likesCount}</span>
        </div>

        <div className="w-full max-h-[400px] overflow-hidden rounded-lg mb-6">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover"
          />
        </div>

        <article className="prose max-w-none whitespace-pre-wrap">
          {lp.content}
        </article>

        <div className="flex gap-2 mt-6">
          <button className="px-3 py-1.5 text-sm rounded border">
            수정
          </button>
          <button className="px-3 py-1.5 text-sm rounded border">
            삭제
          </button>
          <button className="px-3 py-1.5 text-sm rounded bg-pink-500 text-white">
            좋아요
          </button>
        </div>
      </section>

      {/* 댓글 섹션 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">댓글</h2>
          <button
            className="px-3 py-1.5 rounded border text-sm"
            onClick={() =>
              setOrder((prev) => (prev === "latest" ? "oldest" : "latest"))
            }
          >
            {order === "latest" ? "오래된순" : "최신순"}
          </button>
        </div>

        {/* 댓글 입력 UI (UI만) */}
        <CommentInput />

        {/* 댓글 목록 */}
        <div className="border rounded p-3 mt-3">
          {isCommentsLoading && (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <CommentCardSkeleton key={idx} />
              ))}
            </div>
          )}

          {isCommentsError && <ErrorState onRetry={refetchComments} />}

          {!isCommentsLoading && !isCommentsError && (
            <>
              {comments.length === 0 ? (
                <p className="text-sm text-gray-500">
                  아직 댓글이 없습니다.
                </p>
              ) : (
                <div className="space-y-1">
                  {comments.map((c) => (
                    <CommentCard key={c.id} comment={c} />
                  ))}
                </div>
              )}

              {/* 추가 로딩 스켈레톤 */}
              {isFetchingNextPage &&
                Array.from({ length: 2 }).map((_, idx) => (
                  <CommentCardSkeleton key={`more-${idx}`} />
                ))}

              <div className="flex justify-center mt-3">
                {hasNextPage ? (
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-4 py-1.5 rounded bg-gray-800 text-white text-sm disabled:bg-gray-400"
                  >
                    {isFetchingNextPage ? "더 불러오는 중..." : "더 보기"}
                  </button>
                ) : (
                  <p className="text-xs text-gray-400">
                    더 이상 댓글이 없습니다.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
