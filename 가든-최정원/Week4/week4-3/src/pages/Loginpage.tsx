import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Loginpage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 간단한 클라이언트 유효성 검사
  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!form.email) newErrors.email = "이메일을 입력해주세요.";
    else if (!form.email.includes("@")) newErrors.email = "올바른 이메일 형식이 아닙니다.";

    if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
    else if (form.password.length < 6) newErrors.password = "비밀번호는 6자 이상이어야 합니다.";

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // 로그인 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await api("/v1/auth/signin", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
        },
      });

      console.log("✅ 로그인 응답:", data);

      const { accessToken, refreshToken, name } = data.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        alert(`${name}님, 로그인 성공!`);
        navigate("/");
      }

    } catch (err: any) {
      alert(`로그인 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-[320px]"
      >
        <h1 className="text-xl font-bold text-center mb-2">로그인</h1>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          }`}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          계정이 없으신가요?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            회원가입
          </button>
        </p>
      </form>
    </div>
  );
}
