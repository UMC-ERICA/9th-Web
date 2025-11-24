// src/pages/MyPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, updateMe, type Me } from "../apis/userApi";

export default function MyPage() {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const { data: me, isLoading, isError } = useQuery<Me>({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const updateMutation = useMutation({
    mutationFn: (input: {
      name?: string;
      bio?: string;
      profileImageUrl?: string;
    }) => updateMe(input),
    // 🔵 Optimistic Update
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });

      const prevMe = queryClient.getQueryData<Me>(["me"]);

      if (prevMe) {
        const nextMe: Me = {
          ...prevMe,
          name: input.name ?? prevMe.name,
          bio:
            input.bio !== undefined
              ? input.bio
              : prevMe.bio,
          profileImageUrl:
            input.profileImageUrl !== undefined
              ? input.profileImageUrl
              : prevMe.profileImageUrl,
        };
        queryClient.setQueryData(["me"], nextMe);
      }

      if (input.name) {
        localStorage.setItem("userName", input.name);
      }

      return { prevMe };
    },
    onError: (error: any, _input, context) => {
      if (context?.prevMe) {
        queryClient.setQueryData(["me"], context.prevMe);
      }
      alert(`프로필 수정 실패: ${error?.message ?? "오류"}`);
    },
    onSuccess: () => {
      alert("프로필이 수정되었습니다.");
      setEditOpen(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const handleOpenEdit = () => {
    if (!me) return;
    setName(me.name ?? "");
    setBio(me.bio ?? "");
    setProfileImageUrl(me.profileImageUrl ?? "");
    setEditOpen(true);
  };

  const handleSave = () => {
    updateMutation.mutate({
      name: name || undefined,
      bio: bio || undefined,
      profileImageUrl: profileImageUrl || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <p>내 정보 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !me) {
    return (
      <div className="p-4">
        <p>내 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        {me.profileImageUrl ? (
          <img
            src={me.profileImageUrl}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            No Image
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{me.name}</h2>
          <p className="text-gray-500 text-sm">{me.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">Bio</h3>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {me.bio || "소개가 없습니다."}
        </p>
      </div>

      <button
        onClick={handleOpenEdit}
        className="px-4 py-2 rounded bg-gray-800 text-white text-sm"
      >
        설정
      </button>

      {/* 설정 모달 */}
      {editOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="bg-white rounded-md p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">프로필 수정</h2>
              <button onClick={() => setEditOpen(false)}>X</button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-medium">이름</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Bio (선택)</label>
                <textarea
                  className="w-full border rounded px-2 py-1 min-h-[80px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  프로필 이미지 URL (선택)
                </label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={profileImageUrl}
                  onChange={(e) => setProfileImageUrl(e.target.value)}
                  placeholder="https://example.com/profile.png"
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
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:bg-gray-400"
                >
                  {updateMutation.isPending ? "저장 중..." : "저장"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
