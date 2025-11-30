// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await api("/v1/auth/signin", {
        method: "POST",
        body: payload,
      });
      return (res as any).data; // ← data 안에 id, name, token 들어있음
    },

    onSuccess: (data) => {
      if (!data) return;

      // 백엔드 응답 구조에 맞춤
      const { id, name, accessToken, refreshToken } = data;

      // user 정보 저장
      localStorage.setItem("userId", String(id));
      localStorage.setItem("userName", name);

      // access / refresh token 저장
      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      alert(`${name}님, 로그인 성공!`);

      const from =
        (location.state as any)?.from?.pathname ??
        (location.state as any)?.from ??
        "/";

      navigate(from, { replace: true });
    },

    onError: (err: any) => {
      alert(`로그인 실패: ${err?.message ?? "오류가 발생했습니다."}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!form.email) newErrors.email = "이메일을 입력해주세요.";
    else if (!form.email.includes("@"))
      newErrors.email = "올바른 이메일 형식이 아닙니다.";

    if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
    else if (form.password.length < 6)
      newErrors.password = "비밀번호는 6자 이상이어야 합니다.";

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    loginMutation.mutate({ email: form.email, password: form.password });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[320px] border p-5 rounded"
      >
        <h1 className="text-xl font-bold text-center">로그인</h1>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className={`border p-2 rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className={`border p-2 rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className={`w-full py-2 rounded text-white ${
            loginMutation.isPending ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-sm text-center">
          계정이 없으신가요?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 underline"
          >
            회원가입
          </button>
        </p>
      </form>

      {/* 구글 로그인 버튼 — 여기 유지됨 */}
      <button
        onClick={handleGoogleLogin}
        className="mt-4 flex items-center gap-2 border px-4 py-2 rounded"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5"
        />
        Google 계정으로 로그인
      </button>
    </div>
  );
}
