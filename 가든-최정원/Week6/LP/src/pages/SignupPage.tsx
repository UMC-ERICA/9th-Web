// src/pages/SignupPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api("/v1/auth/signup", {
        method: "POST",
        body: {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        withAuth: false,
      });
      alert("회원가입 성공! 로그인해주세요.");
      navigate("/login");
    } catch (err: any) {
      alert(`회원가입 실패: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[320px] border p-5 rounded bg-white"
      >
        <h1 className="text-xl font-bold text-center">회원가입</h1>

        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          className="border p-2 rounded border-gray-300"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className="border p-2 rounded border-gray-300"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="border p-2 rounded border-gray-300"
        />

        <button
          type="submit"
          className="w-full py-2 rounded text-white bg-blue-600"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
