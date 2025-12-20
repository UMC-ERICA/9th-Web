import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepSchemas } from "../schemas/signupSchemas";
import type { SignupFormValues } from "../utils/user";
import { api } from "../lib/api";

const INITIAL: SignupFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const resolver = useMemo(() => zodResolver(stepSchemas[step]), [step]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    defaultValues: INITIAL,
    resolver,
    mode: "onChange",
    shouldUnregister: false, // ✅ 핵심 추가 (값 유지)
  });

  const onNext = () => {
    if (isValid) setStep((s) => (s + 1) as 0 | 1 | 2);
  };

  const onPrev = () => {
    if (step > 0) setStep((s) => (s - 1) as 0 | 1 | 2);
    else navigate(-1);
  };

  const onSubmit = async (all: SignupFormValues) => {
    console.log("🚀 서버로 보낼 데이터:", all);

    try {
      await api("/v1/auth/signup", {
        method: "POST",
        body: {
          name: all.name,
          email: all.email,
          password: all.password,
        },
      });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (e: any) {
      alert(`회원가입 실패: ${e.message}`);
    }
  };

  const btn = "w-full py-2 rounded-md font-semibold transition disabled:cursor-not-allowed";
  const btnPrimary = "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400";
  const inputBase =
    "border w-[320px] p-[10px] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400";
  const errorText = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onPrev}
            className="text-2xl text-gray-600 hover:text-black"
            aria-label="뒤로가기"
          >
            ←
          </button>
          <div className="text-sm text-gray-500">{step + 1} / 3</div>
        </div>

        <h1 className="text-xl font-bold mb-2">
          {step === 0 ? "이메일 입력" : step === 1 ? "비밀번호 설정" : "이름 입력"}
        </h1>

        <form
          onSubmit={
            step === 2
              ? handleSubmit(onSubmit)
              : (e) => {
                  e.preventDefault();
                  onNext();
                }
          }
          className="flex flex-col gap-3"
        >
          {/* STEP 1: 이메일 */}
          <div className={`${step === 0 ? "block" : "hidden"}`}>
            <input
              type="email"
              placeholder="이메일"
              className={`${inputBase} ${errors.email ? "border-red-500" : "border-gray-300"}`}
              {...register("email")}
            />
            {errors.email && <p className={errorText}>{errors.email.message}</p>}
          </div>

          {/* STEP 2: 비밀번호 */}
          <div className={`${step === 1 ? "block" : "hidden"}`}>
            <div className="relative mb-2">
              <input
                type={showPw ? "text" : "password"}
                placeholder="비밀번호 (6자 이상)"
                className={`${inputBase} ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } pr-10`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              >
                {showPw ? "숨기기" : "보기"}
              </button>
            </div>
            {errors.password && <p className={errorText}>{errors.password.message}</p>}

            <div className="relative">
              <input
                type={showPw2 ? "text" : "password"}
                placeholder="비밀번호 재확인"
                className={`${inputBase} ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } pr-10`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              >
                {showPw2 ? "숨기기" : "보기"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={errorText}>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* STEP 3: 이름 */}
          <div className={`${step === 2 ? "block" : "hidden"}`}>
            <input
              type="text"
              placeholder="이름 (2~20자)"
              className={`${inputBase} ${errors.name ? "border-red-500" : "border-gray-300"}`}
              {...register("name")}
            />
            {errors.name && <p className={errorText}>{errors.name.message}</p>}
          </div>

          <div className="mt-3 flex gap-2">
            {step > 0 && (
              <button type="button" onClick={onPrev} className={`${btn} bg-gray-200`}>
                이전
              </button>
            )}
            <button type="submit" disabled={!isValid} className={`${btn} ${btnPrimary}`}>
              {step === 2 ? "회원가입 완료" : "다음"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
