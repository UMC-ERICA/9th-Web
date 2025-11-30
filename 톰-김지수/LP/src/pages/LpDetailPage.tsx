// src/pages/LpDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getLpDetail } from "../apis/lpDetailApi";
import {
  getCommentsPage,
  createComment,
  type CommentPage,
} from "../apis/commentApi";
import {
  updateLp,
  deleteLp,
  toggleLpLike,
  type Lp,
} from "../apis/lpApi";
import CommentCard from "../components/comments/CommentCard";
import CommentCardSkeleton from "../components/comments/CommentCardSkeleton";
import CommentInput from "../components/comments/CommentInput";
import LpDetailSkeleton from "../components/cards/LpDetailSkeleton";
import ErrorState from "../components/common/ErrorState";

export default function LpDetailPage() {
  const { lpId } = useParams();
  const id = Number(lpId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [order, setOrder] = useState<"latest" | "oldest">("latest");

  // LP 상세
  const {
    data: lp,
    isLoading,
    isError,
    refetch,
  } = useQuery<Lp>({
    queryKey: ["lp", id],
    queryFn: () => getLpDetail(id),
    enabled: !Number.isNaN(id),
  });

  // 좋아요 상태 (Optimistic)
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!lp) return;
    const baseLiked =
      (lp as any).likedByMe ??
      false;
    const baseCount =
      (lp as any).likesCount ??
      (Array.isArray((lp as any).likes) ? (lp as any).likes.length : 0) ??
      0;

    setLiked(!!baseLiked);
    setLikeCount(baseCount || 0);
  }, [lp?.id]);

  const likeMutation = useMutation({
    mutationFn: (nextLiked: boolean) => toggleLpLike(id, nextLiked),
    onError: (err: any, nextLiked) => {
      alert(`좋아요 처리 실패: ${err?.message ?? "오류"}`);
      // 롤백
      setLiked((prev) => !nextLiked);
      setLikeCount((prev) =>
        Math.max(0, prev + (nextLiked ? -1 : 1))
      );
    },
    onSettled: () => {
      // 서버 값과 최종 동기화하고 싶다면 (선택)
      queryClient.invalidateQueries({ queryKey: ["lp", id] });
    },
  });

  const handleToggleLike = () => {
    const nextLiked = !liked;
    // Optimistic UI 먼저 적용
    setLiked(nextLiked);
    setLikeCount((prev) =>
      Math.max(0, prev + (nextLiked ? 1 : -1))
    );
    likeMutation.mutate(nextLiked);
  };

  // 댓글 목록 (무한 스크롤)
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery<CommentPage>({
    queryKey: ["lpComments", id, order],
    queryFn: ({ pageParam }) =>
      getCommentsPage(id, order, pageParam as number | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !Number.isNaN(id),
  });

  const commentCreateMutation = useMutation({
    mutationFn: (content: string) => createComment(id, content),
    onSuccess: () => {
      // 새 댓글 즉시 반영
      queryClient.invalidateQueries({
        queryKey: ["lpComments", id, order],
      });
    },
    onError: (err: any) => {
      alert(`댓글 작성 실패: ${err?.message ?? "오류"}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLp(id),
    onSuccess: () => {
      alert("LP가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      navigate("/lps");
    },
    onError: (err: any) => {
      alert(`삭제 실패: ${err?.message ?? "오류"}`);
    },
  });

  // 수정 모달
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState<string>("");

  const editMutation = useMutation({
    mutationFn: () =>
      updateLp(id, {
        title: editTitle,
        content: editContent,
        tags: editTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      alert("LP가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["lp", id] });
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      setEditOpen(false);
    },
    onError: (err: any) => {
      alert(`수정 실패: ${err?.message ?? "오류"}`);
    },
  });

  const handleOpenEdit = () => {
    if (!lp) return;
    setEditTitle(lp.title);
    setEditContent(lp.content);
    setEditTags((lp.tags ?? []).join(", "));
    setEditOpen(true);
  };

  if (isLoading) return <LpDetailSkeleton />;
  if (isError || !lp) return <ErrorState onRetry={refetch} />;

  const allComments =
    commentsData?.pages.flatMap((page) => page.items) ?? [];

  const isMine = (lp as any).isMine ?? true; // 없으면 임시 true

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 상단: 제목 + 액션 버튼 */}
      <div className="flex justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{lp.title}</h1>
          <p className="text-xs text-gray-400">
            {new Date(lp.createdAt).toLocaleString()}
          </p>
          {lp.tags && lp.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {lp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 text-sm">
          <button
            type="button"
            className="px-3 py-1 rounded border text-gray-700 flex items-center gap-1"
            onClick={handleToggleLike}
            disabled={likeMutation.isPending}
          >
            {liked ? "❤️ 좋아요" : "🤍 좋아요"}
            <span className="text-xs text-gray-500">
              {likeCount}
            </span>
          </button>

          {isMine && (
            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded border text-gray-700"
                onClick={handleOpenEdit}
              >
                수정
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded bg-red-500 text-white"
                onClick={() => {
                  if (!window.confirm("이 LP를 삭제할까요?")) return;
                  deleteMutation.mutate();
                }}
                disabled={deleteMutation.isPending}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 썸네일 + 본문 */}
      <div className="mb-8">
        {lp.thumbnail && (
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full max-h-[400px] object-cover rounded mb-4"
          />
        )}
        <p className="whitespace-pre-wrap text-sm leading-relaxed bg-white p-4 rounded">
          {lp.content}
        </p>
      </div>

      {/* 댓글 영역 */}
      <section className="border-t pt-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">댓글</h2>
          <button
            className="px-3 py-1 rounded border text-xs"
            onClick={() =>
              setOrder((prev) => (prev === "latest" ? "oldest" : "latest"))
            }
          >
            {order === "latest" ? "오래된순" : "최신순"}
          </button>
        </div>

        {/* 댓글 작성 */}
        <CommentInput
          onSubmit={(value) => commentCreateMutation.mutate(value)}
          isLoading={commentCreateMutation.isPending}
        />

        {/* 댓글 목록 */}
        {commentsLoading && (
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <CommentCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {commentsError && (
          <div className="mt-4">
            <ErrorState onRetry={refetchComments} />
          </div>
        )}

        {!commentsLoading && !commentsError && (
          <div className="mt-4 space-y-2">
            {allComments.map((c) => (
              <CommentCard
                key={c.id}
                comment={c}
                lpId={id}
                order={order}
              />
            ))}

            {isFetchingNextPage &&
              Array.from({ length: 2 }).map((_, idx) => (
                <CommentCardSkeleton key={`more-${idx}`} />
              ))}

            <div className="flex justify-center mt-3">
              {hasNextPage ? (
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-4 py-1 rounded border text-xs disabled:bg-gray-100"
                >
                  {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
                </button>
              ) : (
                <p className="text-xs text-gray-400">
                  더 이상 댓글이 없습니다.
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 수정 모달 */}
      {editOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="bg-white rounded-md p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">LP 수정</h2>
              <button onClick={() => setEditOpen(false)}>X</button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                  className="w-full border rounded px-2 py-1 min-h-[120px]"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Tags (쉼표로 구분)
                </label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  placeholder="typescript, nestjs, programming"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 text-sm"
                >
                  취소
                </button>
                <button
                  onClick={() => editMutation.mutate()}
                  disabled={editMutation.isPending}
                  className="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:bg-gray-400"
                >
                  {editMutation.isPending ? "저장 중..." : "저장"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
